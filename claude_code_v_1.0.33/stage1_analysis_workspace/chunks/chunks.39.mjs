
// @from(Start 3848481, End 4024171)
rG0 = z((GD8, sG0) => {
  var {
    defineProperty: CG1,
    getOwnPropertyDescriptor: jS4,
    getOwnPropertyNames: yS4
  } = Object, kS4 = Object.prototype.hasOwnProperty, u = (A, B) => CG1(A, "name", {
    value: B,
    configurable: !0
  }), xS4 = (A, B) => {
    for (var Q in B) CG1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, fS4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of yS4(B))
        if (!kS4.call(A, G) && G !== Q) CG1(A, G, {
          get: () => B[G],
          enumerable: !(I = jS4(B, G)) || I.enumerable
        })
    }
    return A
  }, vS4 = (A) => fS4(CG1({}, "__esModule", {
    value: !0
  }), A), M70 = {};
  xS4(M70, {
    AccessDeniedException: () => L70,
    ApplicationType: () => aS4,
    AutomatedEvaluationConfigFilterSensitiveLog: () => m70,
    AutomatedEvaluationCustomMetricConfigFilterSensitiveLog: () => g70,
    AutomatedEvaluationCustomMetricSource: () => DG1,
    AutomatedEvaluationCustomMetricSourceFilterSensitiveLog: () => b70,
    BatchDeleteEvaluationJobCommand: () => BG0,
    BatchDeleteEvaluationJobErrorFilterSensitiveLog: () => x70,
    BatchDeleteEvaluationJobItemFilterSensitiveLog: () => f70,
    BatchDeleteEvaluationJobRequestFilterSensitiveLog: () => k70,
    BatchDeleteEvaluationJobResponseFilterSensitiveLog: () => v70,
    Bedrock: () => aG0,
    BedrockClient: () => hY,
    BedrockServiceException: () => jC,
    ByteContentDocFilterSensitiveLog: () => n70,
    CommitmentDuration: () => j_4,
    ConflictException: () => R70,
    CreateEvaluationJobCommand: () => QG0,
    CreateEvaluationJobRequestFilterSensitiveLog: () => dI0,
    CreateGuardrailCommand: () => IG0,
    CreateGuardrailRequestFilterSensitiveLog: () => GI0,
    CreateGuardrailVersionCommand: () => GG0,
    CreateGuardrailVersionRequestFilterSensitiveLog: () => ZI0,
    CreateInferenceProfileCommand: () => ZG0,
    CreateInferenceProfileRequestFilterSensitiveLog: () => UI0,
    CreateMarketplaceModelEndpointCommand: () => DG0,
    CreateModelCopyJobCommand: () => YG0,
    CreateModelCustomizationJobCommand: () => WG0,
    CreateModelCustomizationJobRequestFilterSensitiveLog: () => kI0,
    CreateModelImportJobCommand: () => JG0,
    CreateModelInvocationJobCommand: () => FG0,
    CreatePromptRouterCommand: () => XG0,
    CreatePromptRouterRequestFilterSensitiveLog: () => SI0,
    CreateProvisionedModelThroughputCommand: () => VG0,
    CustomMetricDefinitionFilterSensitiveLog: () => v_4,
    CustomizationConfig: () => Ff1,
    CustomizationType: () => L_4,
    DeleteCustomModelCommand: () => CG0,
    DeleteGuardrailCommand: () => KG0,
    DeleteImportedModelCommand: () => HG0,
    DeleteInferenceProfileCommand: () => zG0,
    DeleteMarketplaceModelEndpointCommand: () => wG0,
    DeleteModelInvocationLoggingConfigurationCommand: () => EG0,
    DeletePromptRouterCommand: () => UG0,
    DeleteProvisionedModelThroughputCommand: () => NG0,
    DeregisterMarketplaceModelEndpointCommand: () => $G0,
    EndpointConfig: () => Bf1,
    EvaluationBedrockModelFilterSensitiveLog: () => c70,
    EvaluationConfig: () => YG1,
    EvaluationConfigFilterSensitiveLog: () => zf1,
    EvaluationDatasetFilterSensitiveLog: () => h70,
    EvaluationDatasetLocation: () => Qf1,
    EvaluationDatasetMetricConfigFilterSensitiveLog: () => Hf1,
    EvaluationInferenceConfig: () => XG1,
    EvaluationInferenceConfigFilterSensitiveLog: () => Mf1,
    EvaluationJobStatus: () => nS4,
    EvaluationJobType: () => B_4,
    EvaluationModelConfig: () => Gf1,
    EvaluationModelConfigFilterSensitiveLog: () => l70,
    EvaluationPrecomputedRagSourceConfig: () => Zf1,
    EvaluationTaskType: () => sS4,
    EvaluatorModelConfig: () => If1,
    ExternalSourceFilterSensitiveLog: () => a70,
    ExternalSourceType: () => oS4,
    ExternalSourcesGenerationConfigurationFilterSensitiveLog: () => i70,
    ExternalSourcesRetrieveAndGenerateConfigurationFilterSensitiveLog: () => s70,
    FineTuningJobStatus: () => f_4,
    FoundationModelLifecycleStatus: () => P_4,
    GenerationConfigurationFilterSensitiveLog: () => r70,
    GetCustomModelCommand: () => qG0,
    GetCustomModelResponseFilterSensitiveLog: () => PI0,
    GetEvaluationJobCommand: () => MG0,
    GetEvaluationJobRequestFilterSensitiveLog: () => o70,
    GetEvaluationJobResponseFilterSensitiveLog: () => uI0,
    GetFoundationModelCommand: () => LG0,
    GetGuardrailCommand: () => RG0,
    GetGuardrailResponseFilterSensitiveLog: () => HI0,
    GetImportedModelCommand: () => OG0,
    GetInferenceProfileCommand: () => TG0,
    GetInferenceProfileResponseFilterSensitiveLog: () => NI0,
    GetMarketplaceModelEndpointCommand: () => PG0,
    GetModelCopyJobCommand: () => SG0,
    GetModelCustomizationJobCommand: () => _G0,
    GetModelCustomizationJobResponseFilterSensitiveLog: () => xI0,
    GetModelImportJobCommand: () => jG0,
    GetModelInvocationJobCommand: () => yG0,
    GetModelInvocationJobResponseFilterSensitiveLog: () => MI0,
    GetModelInvocationLoggingConfigurationCommand: () => kG0,
    GetPromptRouterCommand: () => xG0,
    GetPromptRouterResponseFilterSensitiveLog: () => _I0,
    GetProvisionedModelThroughputCommand: () => fG0,
    GuardrailContentFilterAction: () => G_4,
    GuardrailContentFilterConfigFilterSensitiveLog: () => e70,
    GuardrailContentFilterFilterSensitiveLog: () => DI0,
    GuardrailContentFilterType: () => Y_4,
    GuardrailContentPolicyConfigFilterSensitiveLog: () => Ef1,
    GuardrailContentPolicyFilterSensitiveLog: () => YI0,
    GuardrailContextualGroundingAction: () => W_4,
    GuardrailContextualGroundingFilterConfigFilterSensitiveLog: () => AI0,
    GuardrailContextualGroundingFilterFilterSensitiveLog: () => WI0,
    GuardrailContextualGroundingFilterType: () => J_4,
    GuardrailContextualGroundingPolicyConfigFilterSensitiveLog: () => Uf1,
    GuardrailContextualGroundingPolicyFilterSensitiveLog: () => JI0,
    GuardrailFilterStrength: () => D_4,
    GuardrailManagedWordsConfigFilterSensitiveLog: () => QI0,
    GuardrailManagedWordsFilterSensitiveLog: () => VI0,
    GuardrailManagedWordsType: () => H_4,
    GuardrailModality: () => Z_4,
    GuardrailPiiEntityType: () => X_4,
    GuardrailSensitiveInformationAction: () => F_4,
    GuardrailStatus: () => z_4,
    GuardrailSummaryFilterSensitiveLog: () => zI0,
    GuardrailTopicAction: () => V_4,
    GuardrailTopicConfigFilterSensitiveLog: () => BI0,
    GuardrailTopicFilterSensitiveLog: () => FI0,
    GuardrailTopicPolicyConfigFilterSensitiveLog: () => Nf1,
    GuardrailTopicPolicyFilterSensitiveLog: () => XI0,
    GuardrailTopicType: () => C_4,
    GuardrailWordAction: () => K_4,
    GuardrailWordConfigFilterSensitiveLog: () => II0,
    GuardrailWordFilterSensitiveLog: () => CI0,
    GuardrailWordPolicyConfigFilterSensitiveLog: () => $f1,
    GuardrailWordPolicyFilterSensitiveLog: () => KI0,
    HumanEvaluationConfigFilterSensitiveLog: () => p70,
    HumanEvaluationCustomMetricFilterSensitiveLog: () => d70,
    HumanWorkflowConfigFilterSensitiveLog: () => u70,
    InferenceProfileModelSource: () => Df1,
    InferenceProfileStatus: () => w_4,
    InferenceProfileSummaryFilterSensitiveLog: () => $I0,
    InferenceProfileType: () => E_4,
    InferenceType: () => O_4,
    InternalServerException: () => O70,
    InvocationLogSource: () => Xf1,
    InvocationLogsConfigFilterSensitiveLog: () => TI0,
    KnowledgeBaseConfig: () => JG1,
    KnowledgeBaseConfigFilterSensitiveLog: () => hI0,
    KnowledgeBaseRetrievalConfigurationFilterSensitiveLog: () => qf1,
    KnowledgeBaseRetrieveAndGenerateConfigurationFilterSensitiveLog: () => vI0,
    KnowledgeBaseVectorSearchConfigurationFilterSensitiveLog: () => fI0,
    ListCustomModelsCommand: () => Lf1,
    ListEvaluationJobsCommand: () => Rf1,
    ListFoundationModelsCommand: () => vG0,
    ListGuardrailsCommand: () => Of1,
    ListGuardrailsResponseFilterSensitiveLog: () => wI0,
    ListImportedModelsCommand: () => Tf1,
    ListInferenceProfilesCommand: () => Pf1,
    ListInferenceProfilesResponseFilterSensitiveLog: () => qI0,
    ListMarketplaceModelEndpointsCommand: () => Sf1,
    ListModelCopyJobsCommand: () => _f1,
    ListModelCustomizationJobsCommand: () => jf1,
    ListModelImportJobsCommand: () => yf1,
    ListModelInvocationJobsCommand: () => kf1,
    ListModelInvocationJobsResponseFilterSensitiveLog: () => RI0,
    ListPromptRoutersCommand: () => xf1,
    ListPromptRoutersResponseFilterSensitiveLog: () => yI0,
    ListProvisionedModelThroughputsCommand: () => ff1,
    ListTagsForResourceCommand: () => bG0,
    ModelCopyJobStatus: () => U_4,
    ModelCustomization: () => R_4,
    ModelCustomizationJobStatus: () => x_4,
    ModelDataSource: () => Yf1,
    ModelImportJobStatus: () => N_4,
    ModelInvocationJobInputDataConfig: () => Wf1,
    ModelInvocationJobOutputDataConfig: () => Jf1,
    ModelInvocationJobStatus: () => M_4,
    ModelInvocationJobSummaryFilterSensitiveLog: () => LI0,
    ModelModality: () => T_4,
    PerformanceConfigLatency: () => rS4,
    PromptRouterStatus: () => S_4,
    PromptRouterSummaryFilterSensitiveLog: () => jI0,
    PromptRouterType: () => __4,
    PromptTemplateFilterSensitiveLog: () => wf1,
    ProvisionedModelStatus: () => y_4,
    PutModelInvocationLoggingConfigurationCommand: () => gG0,
    QueryTransformationType: () => tS4,
    RAGConfig: () => FG1,
    RAGConfigFilterSensitiveLog: () => mI0,
    RatingScaleItemValue: () => ZG1,
    RegisterMarketplaceModelEndpointCommand: () => hG0,
    RequestMetadataBaseFiltersFilterSensitiveLog: () => Cf1,
    RequestMetadataFilters: () => Vf1,
    RequestMetadataFiltersFilterSensitiveLog: () => OI0,
    ResourceNotFoundException: () => T70,
    RetrievalFilter: () => WG1,
    RetrievalFilterFilterSensitiveLog: () => b_4,
    RetrieveAndGenerateConfigurationFilterSensitiveLog: () => gI0,
    RetrieveAndGenerateType: () => A_4,
    RetrieveConfigFilterSensitiveLog: () => bI0,
    S3InputFormat: () => q_4,
    SearchType: () => eS4,
    ServiceQuotaExceededException: () => P70,
    ServiceUnavailableException: () => j70,
    SortByProvisionedModels: () => k_4,
    SortJobsBy: () => Q_4,
    SortModelsBy: () => $_4,
    SortOrder: () => I_4,
    Status: () => iS4,
    StopEvaluationJobCommand: () => mG0,
    StopEvaluationJobRequestFilterSensitiveLog: () => t70,
    StopModelCustomizationJobCommand: () => dG0,
    StopModelInvocationJobCommand: () => uG0,
    TagResourceCommand: () => pG0,
    ThrottlingException: () => S70,
    TooManyTagsException: () => y70,
    TrainingDataConfigFilterSensitiveLog: () => KG1,
    UntagResourceCommand: () => cG0,
    UpdateGuardrailCommand: () => lG0,
    UpdateGuardrailRequestFilterSensitiveLog: () => EI0,
    UpdateMarketplaceModelEndpointCommand: () => iG0,
    UpdateProvisionedModelThroughputCommand: () => nG0,
    ValidationException: () => _70,
    __Client: () => j.Client,
    paginateListCustomModels: () => hx4,
    paginateListEvaluationJobs: () => mx4,
    paginateListGuardrails: () => dx4,
    paginateListImportedModels: () => ux4,
    paginateListInferenceProfiles: () => px4,
    paginateListMarketplaceModelEndpoints: () => cx4,
    paginateListModelCopyJobs: () => lx4,
    paginateListModelCustomizationJobs: () => ix4,
    paginateListModelImportJobs: () => nx4,
    paginateListModelInvocationJobs: () => ax4,
    paginateListPromptRouters: () => sx4,
    paginateListProvisionedModelThroughputs: () => rx4
  });
  sG0.exports = vS4(M70);
  var B70 = cS(),
    bS4 = lS(),
    gS4 = iS(),
    Q70 = jL(),
    hS4 = _D(),
    C2 = NI(),
    mS4 = tS(),
    I9 = hz(),
    I70 = KJ(),
    G70 = Ky1(),
    dS4 = u((A) => {
      return Object.assign(A, {
        useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
        useFipsEndpoint: A.useFipsEndpoint ?? !1,
        defaultSigningName: "bedrock"
      })
    }, "resolveClientEndpointParameters"),
    Y9 = {
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
    uS4 = AQ0(),
    Z70 = W_(),
    D70 = DQ0(),
    j = ca(),
    pS4 = u((A) => {
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
    cS4 = u((A) => {
      return {
        httpAuthSchemes: A.httpAuthSchemes(),
        httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
        credentials: A.credentials()
      }
    }, "resolveHttpAuthRuntimeConfig"),
    lS4 = u((A, B) => {
      let Q = Object.assign(Z70.getAwsRegionExtensionConfiguration(A), j.getDefaultExtensionConfiguration(A), D70.getHttpHandlerExtensionConfiguration(A), pS4(A));
      return B.forEach((I) => I.configure(Q)), Object.assign(A, Z70.resolveAwsRegionExtensionConfiguration(Q), j.resolveDefaultRuntimeConfig(Q), D70.resolveHttpHandlerRuntimeConfig(Q), cS4(Q))
    }, "resolveRuntimeExtensions"),
    hY = class extends j.Client {
      static {
        u(this, "BedrockClient")
      }
      config;
      constructor(...[A]) {
        let B = uS4.getRuntimeConfig(A || {});
        super(B);
        this.initConfig = B;
        let Q = dS4(B),
          I = Q70.resolveUserAgentConfig(Q),
          G = I70.resolveRetryConfig(I),
          Z = hS4.resolveRegionConfig(G),
          D = B70.resolveHostHeaderConfig(Z),
          Y = I9.resolveEndpointConfig(D),
          W = G70.resolveHttpAuthSchemeConfig(Y),
          J = lS4(W, A?.extensions || []);
        this.config = J, this.middlewareStack.use(Q70.getUserAgentPlugin(this.config)), this.middlewareStack.use(I70.getRetryPlugin(this.config)), this.middlewareStack.use(mS4.getContentLengthPlugin(this.config)), this.middlewareStack.use(B70.getHostHeaderPlugin(this.config)), this.middlewareStack.use(bS4.getLoggerPlugin(this.config)), this.middlewareStack.use(gS4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(C2.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: G70.defaultBedrockHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: u(async (F) => new C2.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": F.credentials
          }), "identityProviderConfigProvider")
        })), this.middlewareStack.use(C2.getHttpSigningPlugin(this.config))
      }
      destroy() {
        super.destroy()
      }
    },
    W9 = yz(),
    jC = class A extends j.ServiceException {
      static {
        u(this, "BedrockServiceException")
      }
      constructor(B) {
        super(B);
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    L70 = class A extends jC {
      static {
        u(this, "AccessDeniedException")
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
    R70 = class A extends jC {
      static {
        u(this, "ConflictException")
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
    Bf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.sageMaker !== void 0) return Q.sageMaker(B.sageMaker);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Bf1 || (Bf1 = {}));
  var iS4 = {
      INCOMPATIBLE_ENDPOINT: "INCOMPATIBLE_ENDPOINT",
      REGISTERED: "REGISTERED"
    },
    O70 = class A extends jC {
      static {
        u(this, "InternalServerException")
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
    T70 = class A extends jC {
      static {
        u(this, "ResourceNotFoundException")
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
    P70 = class A extends jC {
      static {
        u(this, "ServiceQuotaExceededException")
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
    S70 = class A extends jC {
      static {
        u(this, "ThrottlingException")
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
    _70 = class A extends jC {
      static {
        u(this, "ValidationException")
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
    j70 = class A extends jC {
      static {
        u(this, "ServiceUnavailableException")
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
    nS4 = {
      COMPLETED: "Completed",
      DELETING: "Deleting",
      FAILED: "Failed",
      IN_PROGRESS: "InProgress",
      STOPPED: "Stopped",
      STOPPING: "Stopping"
    },
    aS4 = {
      MODEL_EVALUATION: "ModelEvaluation",
      RAG_EVALUATION: "RagEvaluation"
    },
    ZG1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.stringValue !== void 0) return Q.stringValue(B.stringValue);
      if (B.floatValue !== void 0) return Q.floatValue(B.floatValue);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(ZG1 || (ZG1 = {}));
  var DG1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.customMetricDefinition !== void 0) return Q.customMetricDefinition(B.customMetricDefinition);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(DG1 || (DG1 = {}));
  var Qf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.s3Uri !== void 0) return Q.s3Uri(B.s3Uri);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Qf1 || (Qf1 = {}));
  var sS4 = {
      CLASSIFICATION: "Classification",
      CUSTOM: "Custom",
      GENERATION: "Generation",
      QUESTION_AND_ANSWER: "QuestionAndAnswer",
      SUMMARIZATION: "Summarization"
    },
    If1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.bedrockEvaluatorModels !== void 0) return Q.bedrockEvaluatorModels(B.bedrockEvaluatorModels);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(If1 || (If1 = {}));
  var YG1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.automated !== void 0) return Q.automated(B.automated);
      if (B.human !== void 0) return Q.human(B.human);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(YG1 || (YG1 = {}));
  var rS4 = {
      OPTIMIZED: "optimized",
      STANDARD: "standard"
    },
    Gf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.bedrockModel !== void 0) return Q.bedrockModel(B.bedrockModel);
      if (B.precomputedInferenceSource !== void 0) return Q.precomputedInferenceSource(B.precomputedInferenceSource);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Gf1 || (Gf1 = {}));
  var oS4 = {
      BYTE_CONTENT: "BYTE_CONTENT",
      S3: "S3"
    },
    tS4 = {
      QUERY_DECOMPOSITION: "QUERY_DECOMPOSITION"
    },
    eS4 = {
      HYBRID: "HYBRID",
      SEMANTIC: "SEMANTIC"
    },
    A_4 = {
      EXTERNAL_SOURCES: "EXTERNAL_SOURCES",
      KNOWLEDGE_BASE: "KNOWLEDGE_BASE"
    },
    Zf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.retrieveSourceConfig !== void 0) return Q.retrieveSourceConfig(B.retrieveSourceConfig);
      if (B.retrieveAndGenerateSourceConfig !== void 0) return Q.retrieveAndGenerateSourceConfig(B.retrieveAndGenerateSourceConfig);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Zf1 || (Zf1 = {}));
  var B_4 = {
      AUTOMATED: "Automated",
      HUMAN: "Human"
    },
    Q_4 = {
      CREATION_TIME: "CreationTime"
    },
    I_4 = {
      ASCENDING: "Ascending",
      DESCENDING: "Descending"
    },
    G_4 = {
      BLOCK: "BLOCK",
      NONE: "NONE"
    },
    Z_4 = {
      IMAGE: "IMAGE",
      TEXT: "TEXT"
    },
    D_4 = {
      HIGH: "HIGH",
      LOW: "LOW",
      MEDIUM: "MEDIUM",
      NONE: "NONE"
    },
    Y_4 = {
      HATE: "HATE",
      INSULTS: "INSULTS",
      MISCONDUCT: "MISCONDUCT",
      PROMPT_ATTACK: "PROMPT_ATTACK",
      SEXUAL: "SEXUAL",
      VIOLENCE: "VIOLENCE"
    },
    W_4 = {
      BLOCK: "BLOCK",
      NONE: "NONE"
    },
    J_4 = {
      GROUNDING: "GROUNDING",
      RELEVANCE: "RELEVANCE"
    },
    F_4 = {
      ANONYMIZE: "ANONYMIZE",
      BLOCK: "BLOCK",
      NONE: "NONE"
    },
    X_4 = {
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
    V_4 = {
      BLOCK: "BLOCK",
      NONE: "NONE"
    },
    C_4 = {
      DENY: "DENY"
    },
    K_4 = {
      BLOCK: "BLOCK",
      NONE: "NONE"
    },
    H_4 = {
      PROFANITY: "PROFANITY"
    },
    y70 = class A extends jC {
      static {
        u(this, "TooManyTagsException")
      }
      name = "TooManyTagsException";
      $fault = "client";
      resourceName;
      constructor(B) {
        super({
          name: "TooManyTagsException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.resourceName = B.resourceName
      }
    },
    z_4 = {
      CREATING: "CREATING",
      DELETING: "DELETING",
      FAILED: "FAILED",
      READY: "READY",
      UPDATING: "UPDATING",
      VERSIONING: "VERSIONING"
    },
    Df1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.copyFrom !== void 0) return Q.copyFrom(B.copyFrom);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Df1 || (Df1 = {}));
  var w_4 = {
      ACTIVE: "ACTIVE"
    },
    E_4 = {
      APPLICATION: "APPLICATION",
      SYSTEM_DEFINED: "SYSTEM_DEFINED"
    },
    U_4 = {
      COMPLETED: "Completed",
      FAILED: "Failed",
      IN_PROGRESS: "InProgress"
    },
    Yf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.s3DataSource !== void 0) return Q.s3DataSource(B.s3DataSource);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Yf1 || (Yf1 = {}));
  var N_4 = {
      COMPLETED: "Completed",
      FAILED: "Failed",
      IN_PROGRESS: "InProgress"
    },
    $_4 = {
      CREATION_TIME: "CreationTime"
    },
    q_4 = {
      JSONL: "JSONL"
    },
    Wf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.s3InputDataConfig !== void 0) return Q.s3InputDataConfig(B.s3InputDataConfig);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Wf1 || (Wf1 = {}));
  var Jf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.s3OutputDataConfig !== void 0) return Q.s3OutputDataConfig(B.s3OutputDataConfig);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Jf1 || (Jf1 = {}));
  var M_4 = {
      COMPLETED: "Completed",
      EXPIRED: "Expired",
      FAILED: "Failed",
      IN_PROGRESS: "InProgress",
      PARTIALLY_COMPLETED: "PartiallyCompleted",
      SCHEDULED: "Scheduled",
      STOPPED: "Stopped",
      STOPPING: "Stopping",
      SUBMITTED: "Submitted",
      VALIDATING: "Validating"
    },
    Ff1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.distillationConfig !== void 0) return Q.distillationConfig(B.distillationConfig);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Ff1 || (Ff1 = {}));
  var L_4 = {
      CONTINUED_PRE_TRAINING: "CONTINUED_PRE_TRAINING",
      DISTILLATION: "DISTILLATION",
      FINE_TUNING: "FINE_TUNING"
    },
    Xf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.s3Uri !== void 0) return Q.s3Uri(B.s3Uri);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Xf1 || (Xf1 = {}));
  var Vf1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.equals !== void 0) return Q.equals(B.equals);
      if (B.notEquals !== void 0) return Q.notEquals(B.notEquals);
      if (B.andAll !== void 0) return Q.andAll(B.andAll);
      if (B.orAll !== void 0) return Q.orAll(B.orAll);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(Vf1 || (Vf1 = {}));
  var R_4 = {
      CONTINUED_PRE_TRAINING: "CONTINUED_PRE_TRAINING",
      DISTILLATION: "DISTILLATION",
      FINE_TUNING: "FINE_TUNING"
    },
    O_4 = {
      ON_DEMAND: "ON_DEMAND",
      PROVISIONED: "PROVISIONED"
    },
    T_4 = {
      EMBEDDING: "EMBEDDING",
      IMAGE: "IMAGE",
      TEXT: "TEXT"
    },
    P_4 = {
      ACTIVE: "ACTIVE",
      LEGACY: "LEGACY"
    },
    S_4 = {
      AVAILABLE: "AVAILABLE"
    },
    __4 = {
      CUSTOM: "custom",
      DEFAULT: "default"
    },
    j_4 = {
      ONE_MONTH: "OneMonth",
      SIX_MONTHS: "SixMonths"
    },
    y_4 = {
      CREATING: "Creating",
      FAILED: "Failed",
      IN_SERVICE: "InService",
      UPDATING: "Updating"
    },
    k_4 = {
      CREATION_TIME: "CreationTime"
    },
    x_4 = {
      COMPLETED: "Completed",
      FAILED: "Failed",
      IN_PROGRESS: "InProgress",
      STOPPED: "Stopped",
      STOPPING: "Stopping"
    },
    f_4 = {
      COMPLETED: "Completed",
      FAILED: "Failed",
      IN_PROGRESS: "InProgress",
      STOPPED: "Stopped",
      STOPPING: "Stopping"
    },
    WG1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.equals !== void 0) return Q.equals(B.equals);
      if (B.notEquals !== void 0) return Q.notEquals(B.notEquals);
      if (B.greaterThan !== void 0) return Q.greaterThan(B.greaterThan);
      if (B.greaterThanOrEquals !== void 0) return Q.greaterThanOrEquals(B.greaterThanOrEquals);
      if (B.lessThan !== void 0) return Q.lessThan(B.lessThan);
      if (B.lessThanOrEquals !== void 0) return Q.lessThanOrEquals(B.lessThanOrEquals);
      if (B.in !== void 0) return Q.in(B.in);
      if (B.notIn !== void 0) return Q.notIn(B.notIn);
      if (B.startsWith !== void 0) return Q.startsWith(B.startsWith);
      if (B.listContains !== void 0) return Q.listContains(B.listContains);
      if (B.stringContains !== void 0) return Q.stringContains(B.stringContains);
      if (B.andAll !== void 0) return Q.andAll(B.andAll);
      if (B.orAll !== void 0) return Q.orAll(B.orAll);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(WG1 || (WG1 = {}));
  var JG1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.retrieveConfig !== void 0) return Q.retrieveConfig(B.retrieveConfig);
      if (B.retrieveAndGenerateConfig !== void 0) return Q.retrieveAndGenerateConfig(B.retrieveAndGenerateConfig);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(JG1 || (JG1 = {}));
  var FG1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.knowledgeBaseConfig !== void 0) return Q.knowledgeBaseConfig(B.knowledgeBaseConfig);
      if (B.precomputedRagSourceConfig !== void 0) return Q.precomputedRagSourceConfig(B.precomputedRagSourceConfig);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(FG1 || (FG1 = {}));
  var XG1;
  ((A) => {
    A.visit = u((B, Q) => {
      if (B.models !== void 0) return Q.models(B.models);
      if (B.ragConfigs !== void 0) return Q.ragConfigs(B.ragConfigs);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(XG1 || (XG1 = {}));
  var k70 = u((A) => ({
      ...A,
      ...A.jobIdentifiers && {
        jobIdentifiers: j.SENSITIVE_STRING
      }
    }), "BatchDeleteEvaluationJobRequestFilterSensitiveLog"),
    x70 = u((A) => ({
      ...A,
      ...A.jobIdentifier && {
        jobIdentifier: j.SENSITIVE_STRING
      }
    }), "BatchDeleteEvaluationJobErrorFilterSensitiveLog"),
    f70 = u((A) => ({
      ...A,
      ...A.jobIdentifier && {
        jobIdentifier: j.SENSITIVE_STRING
      }
    }), "BatchDeleteEvaluationJobItemFilterSensitiveLog"),
    v70 = u((A) => ({
      ...A,
      ...A.errors && {
        errors: A.errors.map((B) => x70(B))
      },
      ...A.evaluationJobs && {
        evaluationJobs: A.evaluationJobs.map((B) => f70(B))
      }
    }), "BatchDeleteEvaluationJobResponseFilterSensitiveLog"),
    v_4 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.ratingScale && {
        ratingScale: A.ratingScale.map((B) => B)
      }
    }), "CustomMetricDefinitionFilterSensitiveLog"),
    b70 = u((A) => {
      if (A.customMetricDefinition !== void 0) return {
        customMetricDefinition: j.SENSITIVE_STRING
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "AutomatedEvaluationCustomMetricSourceFilterSensitiveLog"),
    g70 = u((A) => ({
      ...A,
      ...A.customMetrics && {
        customMetrics: A.customMetrics.map((B) => b70(B))
      }
    }), "AutomatedEvaluationCustomMetricConfigFilterSensitiveLog"),
    h70 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.datasetLocation && {
        datasetLocation: A.datasetLocation
      }
    }), "EvaluationDatasetFilterSensitiveLog"),
    Hf1 = u((A) => ({
      ...A,
      ...A.dataset && {
        dataset: h70(A.dataset)
      },
      ...A.metricNames && {
        metricNames: j.SENSITIVE_STRING
      }
    }), "EvaluationDatasetMetricConfigFilterSensitiveLog"),
    m70 = u((A) => ({
      ...A,
      ...A.datasetMetricConfigs && {
        datasetMetricConfigs: A.datasetMetricConfigs.map((B) => Hf1(B))
      },
      ...A.evaluatorModelConfig && {
        evaluatorModelConfig: A.evaluatorModelConfig
      },
      ...A.customMetricConfig && {
        customMetricConfig: g70(A.customMetricConfig)
      }
    }), "AutomatedEvaluationConfigFilterSensitiveLog"),
    d70 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "HumanEvaluationCustomMetricFilterSensitiveLog"),
    u70 = u((A) => ({
      ...A,
      ...A.instructions && {
        instructions: j.SENSITIVE_STRING
      }
    }), "HumanWorkflowConfigFilterSensitiveLog"),
    p70 = u((A) => ({
      ...A,
      ...A.humanWorkflowConfig && {
        humanWorkflowConfig: u70(A.humanWorkflowConfig)
      },
      ...A.customMetrics && {
        customMetrics: A.customMetrics.map((B) => d70(B))
      },
      ...A.datasetMetricConfigs && {
        datasetMetricConfigs: A.datasetMetricConfigs.map((B) => Hf1(B))
      }
    }), "HumanEvaluationConfigFilterSensitiveLog"),
    zf1 = u((A) => {
      if (A.automated !== void 0) return {
        automated: m70(A.automated)
      };
      if (A.human !== void 0) return {
        human: p70(A.human)
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "EvaluationConfigFilterSensitiveLog"),
    c70 = u((A) => ({
      ...A,
      ...A.inferenceParams && {
        inferenceParams: j.SENSITIVE_STRING
      }
    }), "EvaluationBedrockModelFilterSensitiveLog"),
    l70 = u((A) => {
      if (A.bedrockModel !== void 0) return {
        bedrockModel: c70(A.bedrockModel)
      };
      if (A.precomputedInferenceSource !== void 0) return {
        precomputedInferenceSource: A.precomputedInferenceSource
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "EvaluationModelConfigFilterSensitiveLog"),
    wf1 = u((A) => ({
      ...A,
      ...A.textPromptTemplate && {
        textPromptTemplate: j.SENSITIVE_STRING
      }
    }), "PromptTemplateFilterSensitiveLog"),
    i70 = u((A) => ({
      ...A,
      ...A.promptTemplate && {
        promptTemplate: wf1(A.promptTemplate)
      }
    }), "ExternalSourcesGenerationConfigurationFilterSensitiveLog"),
    n70 = u((A) => ({
      ...A,
      ...A.identifier && {
        identifier: j.SENSITIVE_STRING
      },
      ...A.data && {
        data: j.SENSITIVE_STRING
      }
    }), "ByteContentDocFilterSensitiveLog"),
    a70 = u((A) => ({
      ...A,
      ...A.byteContent && {
        byteContent: n70(A.byteContent)
      }
    }), "ExternalSourceFilterSensitiveLog"),
    s70 = u((A) => ({
      ...A,
      ...A.sources && {
        sources: A.sources.map((B) => a70(B))
      },
      ...A.generationConfiguration && {
        generationConfiguration: i70(A.generationConfiguration)
      }
    }), "ExternalSourcesRetrieveAndGenerateConfigurationFilterSensitiveLog"),
    r70 = u((A) => ({
      ...A,
      ...A.promptTemplate && {
        promptTemplate: wf1(A.promptTemplate)
      }
    }), "GenerationConfigurationFilterSensitiveLog"),
    o70 = u((A) => ({
      ...A,
      ...A.jobIdentifier && {
        jobIdentifier: j.SENSITIVE_STRING
      }
    }), "GetEvaluationJobRequestFilterSensitiveLog"),
    t70 = u((A) => ({
      ...A,
      ...A.jobIdentifier && {
        jobIdentifier: j.SENSITIVE_STRING
      }
    }), "StopEvaluationJobRequestFilterSensitiveLog"),
    e70 = u((A) => ({
      ...A,
      ...A.inputModalities && {
        inputModalities: j.SENSITIVE_STRING
      },
      ...A.outputModalities && {
        outputModalities: j.SENSITIVE_STRING
      },
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailContentFilterConfigFilterSensitiveLog"),
    Ef1 = u((A) => ({
      ...A,
      ...A.filtersConfig && {
        filtersConfig: A.filtersConfig.map((B) => e70(B))
      }
    }), "GuardrailContentPolicyConfigFilterSensitiveLog"),
    AI0 = u((A) => ({
      ...A,
      ...A.action && {
        action: j.SENSITIVE_STRING
      }
    }), "GuardrailContextualGroundingFilterConfigFilterSensitiveLog"),
    Uf1 = u((A) => ({
      ...A,
      ...A.filtersConfig && {
        filtersConfig: A.filtersConfig.map((B) => AI0(B))
      }
    }), "GuardrailContextualGroundingPolicyConfigFilterSensitiveLog"),
    BI0 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.definition && {
        definition: j.SENSITIVE_STRING
      },
      ...A.examples && {
        examples: j.SENSITIVE_STRING
      },
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailTopicConfigFilterSensitiveLog"),
    Nf1 = u((A) => ({
      ...A,
      ...A.topicsConfig && {
        topicsConfig: A.topicsConfig.map((B) => BI0(B))
      }
    }), "GuardrailTopicPolicyConfigFilterSensitiveLog"),
    QI0 = u((A) => ({
      ...A,
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailManagedWordsConfigFilterSensitiveLog"),
    II0 = u((A) => ({
      ...A,
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailWordConfigFilterSensitiveLog"),
    $f1 = u((A) => ({
      ...A,
      ...A.wordsConfig && {
        wordsConfig: A.wordsConfig.map((B) => II0(B))
      },
      ...A.managedWordListsConfig && {
        managedWordListsConfig: A.managedWordListsConfig.map((B) => QI0(B))
      }
    }), "GuardrailWordPolicyConfigFilterSensitiveLog"),
    GI0 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.description && {
        description: j.SENSITIVE_STRING
      },
      ...A.topicPolicyConfig && {
        topicPolicyConfig: Nf1(A.topicPolicyConfig)
      },
      ...A.contentPolicyConfig && {
        contentPolicyConfig: Ef1(A.contentPolicyConfig)
      },
      ...A.wordPolicyConfig && {
        wordPolicyConfig: $f1(A.wordPolicyConfig)
      },
      ...A.contextualGroundingPolicyConfig && {
        contextualGroundingPolicyConfig: Uf1(A.contextualGroundingPolicyConfig)
      },
      ...A.blockedInputMessaging && {
        blockedInputMessaging: j.SENSITIVE_STRING
      },
      ...A.blockedOutputsMessaging && {
        blockedOutputsMessaging: j.SENSITIVE_STRING
      }
    }), "CreateGuardrailRequestFilterSensitiveLog"),
    ZI0 = u((A) => ({
      ...A,
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "CreateGuardrailVersionRequestFilterSensitiveLog"),
    DI0 = u((A) => ({
      ...A,
      ...A.inputModalities && {
        inputModalities: j.SENSITIVE_STRING
      },
      ...A.outputModalities && {
        outputModalities: j.SENSITIVE_STRING
      },
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailContentFilterFilterSensitiveLog"),
    YI0 = u((A) => ({
      ...A,
      ...A.filters && {
        filters: A.filters.map((B) => DI0(B))
      }
    }), "GuardrailContentPolicyFilterSensitiveLog"),
    WI0 = u((A) => ({
      ...A,
      ...A.action && {
        action: j.SENSITIVE_STRING
      }
    }), "GuardrailContextualGroundingFilterFilterSensitiveLog"),
    JI0 = u((A) => ({
      ...A,
      ...A.filters && {
        filters: A.filters.map((B) => WI0(B))
      }
    }), "GuardrailContextualGroundingPolicyFilterSensitiveLog"),
    FI0 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.definition && {
        definition: j.SENSITIVE_STRING
      },
      ...A.examples && {
        examples: j.SENSITIVE_STRING
      },
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailTopicFilterSensitiveLog"),
    XI0 = u((A) => ({
      ...A,
      ...A.topics && {
        topics: A.topics.map((B) => FI0(B))
      }
    }), "GuardrailTopicPolicyFilterSensitiveLog"),
    VI0 = u((A) => ({
      ...A,
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailManagedWordsFilterSensitiveLog"),
    CI0 = u((A) => ({
      ...A,
      ...A.inputAction && {
        inputAction: j.SENSITIVE_STRING
      },
      ...A.outputAction && {
        outputAction: j.SENSITIVE_STRING
      }
    }), "GuardrailWordFilterSensitiveLog"),
    KI0 = u((A) => ({
      ...A,
      ...A.words && {
        words: A.words.map((B) => CI0(B))
      },
      ...A.managedWordLists && {
        managedWordLists: A.managedWordLists.map((B) => VI0(B))
      }
    }), "GuardrailWordPolicyFilterSensitiveLog"),
    HI0 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.description && {
        description: j.SENSITIVE_STRING
      },
      ...A.topicPolicy && {
        topicPolicy: XI0(A.topicPolicy)
      },
      ...A.contentPolicy && {
        contentPolicy: YI0(A.contentPolicy)
      },
      ...A.wordPolicy && {
        wordPolicy: KI0(A.wordPolicy)
      },
      ...A.contextualGroundingPolicy && {
        contextualGroundingPolicy: JI0(A.contextualGroundingPolicy)
      },
      ...A.statusReasons && {
        statusReasons: j.SENSITIVE_STRING
      },
      ...A.failureRecommendations && {
        failureRecommendations: j.SENSITIVE_STRING
      },
      ...A.blockedInputMessaging && {
        blockedInputMessaging: j.SENSITIVE_STRING
      },
      ...A.blockedOutputsMessaging && {
        blockedOutputsMessaging: j.SENSITIVE_STRING
      }
    }), "GetGuardrailResponseFilterSensitiveLog"),
    zI0 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "GuardrailSummaryFilterSensitiveLog"),
    wI0 = u((A) => ({
      ...A,
      ...A.guardrails && {
        guardrails: A.guardrails.map((B) => zI0(B))
      }
    }), "ListGuardrailsResponseFilterSensitiveLog"),
    EI0 = u((A) => ({
      ...A,
      ...A.name && {
        name: j.SENSITIVE_STRING
      },
      ...A.description && {
        description: j.SENSITIVE_STRING
      },
      ...A.topicPolicyConfig && {
        topicPolicyConfig: Nf1(A.topicPolicyConfig)
      },
      ...A.contentPolicyConfig && {
        contentPolicyConfig: Ef1(A.contentPolicyConfig)
      },
      ...A.wordPolicyConfig && {
        wordPolicyConfig: $f1(A.wordPolicyConfig)
      },
      ...A.contextualGroundingPolicyConfig && {
        contextualGroundingPolicyConfig: Uf1(A.contextualGroundingPolicyConfig)
      },
      ...A.blockedInputMessaging && {
        blockedInputMessaging: j.SENSITIVE_STRING
      },
      ...A.blockedOutputsMessaging && {
        blockedOutputsMessaging: j.SENSITIVE_STRING
      }
    }), "UpdateGuardrailRequestFilterSensitiveLog"),
    UI0 = u((A) => ({
      ...A,
      ...A.description && {
        description: j.SENSITIVE_STRING
      },
      ...A.modelSource && {
        modelSource: A.modelSource
      }
    }), "CreateInferenceProfileRequestFilterSensitiveLog"),
    NI0 = u((A) => ({
      ...A,
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "GetInferenceProfileResponseFilterSensitiveLog"),
    $I0 = u((A) => ({
      ...A,
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "InferenceProfileSummaryFilterSensitiveLog"),
    qI0 = u((A) => ({
      ...A,
      ...A.inferenceProfileSummaries && {
        inferenceProfileSummaries: A.inferenceProfileSummaries.map((B) => $I0(B))
      }
    }), "ListInferenceProfilesResponseFilterSensitiveLog"),
    MI0 = u((A) => ({
      ...A,
      ...A.message && {
        message: j.SENSITIVE_STRING
      },
      ...A.inputDataConfig && {
        inputDataConfig: A.inputDataConfig
      },
      ...A.outputDataConfig && {
        outputDataConfig: A.outputDataConfig
      }
    }), "GetModelInvocationJobResponseFilterSensitiveLog"),
    LI0 = u((A) => ({
      ...A,
      ...A.message && {
        message: j.SENSITIVE_STRING
      },
      ...A.inputDataConfig && {
        inputDataConfig: A.inputDataConfig
      },
      ...A.outputDataConfig && {
        outputDataConfig: A.outputDataConfig
      }
    }), "ModelInvocationJobSummaryFilterSensitiveLog"),
    RI0 = u((A) => ({
      ...A,
      ...A.invocationJobSummaries && {
        invocationJobSummaries: A.invocationJobSummaries.map((B) => LI0(B))
      }
    }), "ListModelInvocationJobsResponseFilterSensitiveLog"),
    Cf1 = u((A) => ({
      ...A,
      ...A.equals && {
        equals: j.SENSITIVE_STRING
      },
      ...A.notEquals && {
        notEquals: j.SENSITIVE_STRING
      }
    }), "RequestMetadataBaseFiltersFilterSensitiveLog"),
    OI0 = u((A) => {
      if (A.equals !== void 0) return {
        equals: j.SENSITIVE_STRING
      };
      if (A.notEquals !== void 0) return {
        notEquals: j.SENSITIVE_STRING
      };
      if (A.andAll !== void 0) return {
        andAll: A.andAll.map((B) => Cf1(B))
      };
      if (A.orAll !== void 0) return {
        orAll: A.orAll.map((B) => Cf1(B))
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "RequestMetadataFiltersFilterSensitiveLog"),
    TI0 = u((A) => ({
      ...A,
      ...A.invocationLogSource && {
        invocationLogSource: A.invocationLogSource
      },
      ...A.requestMetadataFilters && {
        requestMetadataFilters: OI0(A.requestMetadataFilters)
      }
    }), "InvocationLogsConfigFilterSensitiveLog"),
    KG1 = u((A) => ({
      ...A,
      ...A.invocationLogsConfig && {
        invocationLogsConfig: TI0(A.invocationLogsConfig)
      }
    }), "TrainingDataConfigFilterSensitiveLog"),
    PI0 = u((A) => ({
      ...A,
      ...A.trainingDataConfig && {
        trainingDataConfig: KG1(A.trainingDataConfig)
      },
      ...A.customizationConfig && {
        customizationConfig: A.customizationConfig
      }
    }), "GetCustomModelResponseFilterSensitiveLog"),
    SI0 = u((A) => ({
      ...A,
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "CreatePromptRouterRequestFilterSensitiveLog"),
    _I0 = u((A) => ({
      ...A,
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "GetPromptRouterResponseFilterSensitiveLog"),
    jI0 = u((A) => ({
      ...A,
      ...A.description && {
        description: j.SENSITIVE_STRING
      }
    }), "PromptRouterSummaryFilterSensitiveLog"),
    yI0 = u((A) => ({
      ...A,
      ...A.promptRouterSummaries && {
        promptRouterSummaries: A.promptRouterSummaries.map((B) => jI0(B))
      }
    }), "ListPromptRoutersResponseFilterSensitiveLog"),
    kI0 = u((A) => ({
      ...A,
      ...A.trainingDataConfig && {
        trainingDataConfig: KG1(A.trainingDataConfig)
      },
      ...A.customizationConfig && {
        customizationConfig: A.customizationConfig
      }
    }), "CreateModelCustomizationJobRequestFilterSensitiveLog"),
    xI0 = u((A) => ({
      ...A,
      ...A.trainingDataConfig && {
        trainingDataConfig: KG1(A.trainingDataConfig)
      },
      ...A.customizationConfig && {
        customizationConfig: A.customizationConfig
      }
    }), "GetModelCustomizationJobResponseFilterSensitiveLog"),
    b_4 = u((A) => {
      if (A.equals !== void 0) return {
        equals: A.equals
      };
      if (A.notEquals !== void 0) return {
        notEquals: A.notEquals
      };
      if (A.greaterThan !== void 0) return {
        greaterThan: A.greaterThan
      };
      if (A.greaterThanOrEquals !== void 0) return {
        greaterThanOrEquals: A.greaterThanOrEquals
      };
      if (A.lessThan !== void 0) return {
        lessThan: A.lessThan
      };
      if (A.lessThanOrEquals !== void 0) return {
        lessThanOrEquals: A.lessThanOrEquals
      };
      if (A.in !== void 0) return {
        in: A.in
      };
      if (A.notIn !== void 0) return {
        notIn: A.notIn
      };
      if (A.startsWith !== void 0) return {
        startsWith: A.startsWith
      };
      if (A.listContains !== void 0) return {
        listContains: A.listContains
      };
      if (A.stringContains !== void 0) return {
        stringContains: A.stringContains
      };
      if (A.andAll !== void 0) return {
        andAll: j.SENSITIVE_STRING
      };
      if (A.orAll !== void 0) return {
        orAll: j.SENSITIVE_STRING
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "RetrievalFilterFilterSensitiveLog"),
    fI0 = u((A) => ({
      ...A,
      ...A.filter && {
        filter: j.SENSITIVE_STRING
      }
    }), "KnowledgeBaseVectorSearchConfigurationFilterSensitiveLog"),
    qf1 = u((A) => ({
      ...A,
      ...A.vectorSearchConfiguration && {
        vectorSearchConfiguration: fI0(A.vectorSearchConfiguration)
      }
    }), "KnowledgeBaseRetrievalConfigurationFilterSensitiveLog"),
    vI0 = u((A) => ({
      ...A,
      ...A.retrievalConfiguration && {
        retrievalConfiguration: qf1(A.retrievalConfiguration)
      },
      ...A.generationConfiguration && {
        generationConfiguration: r70(A.generationConfiguration)
      }
    }), "KnowledgeBaseRetrieveAndGenerateConfigurationFilterSensitiveLog"),
    bI0 = u((A) => ({
      ...A,
      ...A.knowledgeBaseRetrievalConfiguration && {
        knowledgeBaseRetrievalConfiguration: qf1(A.knowledgeBaseRetrievalConfiguration)
      }
    }), "RetrieveConfigFilterSensitiveLog"),
    gI0 = u((A) => ({
      ...A,
      ...A.knowledgeBaseConfiguration && {
        knowledgeBaseConfiguration: vI0(A.knowledgeBaseConfiguration)
      },
      ...A.externalSourcesConfiguration && {
        externalSourcesConfiguration: s70(A.externalSourcesConfiguration)
      }
    }), "RetrieveAndGenerateConfigurationFilterSensitiveLog"),
    hI0 = u((A) => {
      if (A.retrieveConfig !== void 0) return {
        retrieveConfig: bI0(A.retrieveConfig)
      };
      if (A.retrieveAndGenerateConfig !== void 0) return {
        retrieveAndGenerateConfig: gI0(A.retrieveAndGenerateConfig)
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "KnowledgeBaseConfigFilterSensitiveLog"),
    mI0 = u((A) => {
      if (A.knowledgeBaseConfig !== void 0) return {
        knowledgeBaseConfig: hI0(A.knowledgeBaseConfig)
      };
      if (A.precomputedRagSourceConfig !== void 0) return {
        precomputedRagSourceConfig: A.precomputedRagSourceConfig
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "RAGConfigFilterSensitiveLog"),
    Mf1 = u((A) => {
      if (A.models !== void 0) return {
        models: A.models.map((B) => l70(B))
      };
      if (A.ragConfigs !== void 0) return {
        ragConfigs: A.ragConfigs.map((B) => mI0(B))
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "EvaluationInferenceConfigFilterSensitiveLog"),
    dI0 = u((A) => ({
      ...A,
      ...A.jobDescription && {
        jobDescription: j.SENSITIVE_STRING
      },
      ...A.evaluationConfig && {
        evaluationConfig: zf1(A.evaluationConfig)
      },
      ...A.inferenceConfig && {
        inferenceConfig: Mf1(A.inferenceConfig)
      }
    }), "CreateEvaluationJobRequestFilterSensitiveLog"),
    uI0 = u((A) => ({
      ...A,
      ...A.jobDescription && {
        jobDescription: j.SENSITIVE_STRING
      },
      ...A.evaluationConfig && {
        evaluationConfig: zf1(A.evaluationConfig)
      },
      ...A.inferenceConfig && {
        inferenceConfig: Mf1(A.inferenceConfig)
      }
    }), "GetEvaluationJobResponseFilterSensitiveLog"),
    u2 = IB(),
    yC = A70(),
    g_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/evaluation-jobs/batch-delete");
      let G;
      return G = JSON.stringify(j.take(A, {
        jobIdentifiers: u((Z) => j._json(Z), "jobIdentifiers")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_BatchDeleteEvaluationJobCommand"),
    h_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/evaluation-jobs");
      let G;
      return G = JSON.stringify(j.take(A, {
        applicationType: [],
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        customerEncryptionKeyId: [],
        evaluationConfig: u((Z) => Xk4(Z, B), "evaluationConfig"),
        inferenceConfig: u((Z) => Vk4(Z, B), "inferenceConfig"),
        jobDescription: [],
        jobName: [],
        jobTags: u((Z) => j._json(Z), "jobTags"),
        outputDataConfig: u((Z) => j._json(Z), "outputDataConfig"),
        roleArn: []
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateEvaluationJobCommand"),
    m_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/guardrails");
      let G;
      return G = JSON.stringify(j.take(A, {
        blockedInputMessaging: [],
        blockedOutputsMessaging: [],
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        contentPolicyConfig: u((Z) => j._json(Z), "contentPolicyConfig"),
        contextualGroundingPolicyConfig: u((Z) => cI0(Z, B), "contextualGroundingPolicyConfig"),
        description: [],
        kmsKeyId: [],
        name: [],
        sensitiveInformationPolicyConfig: u((Z) => j._json(Z), "sensitiveInformationPolicyConfig"),
        tags: u((Z) => j._json(Z), "tags"),
        topicPolicyConfig: u((Z) => j._json(Z), "topicPolicyConfig"),
        wordPolicyConfig: u((Z) => j._json(Z), "wordPolicyConfig")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateGuardrailCommand"),
    d_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        description: []
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateGuardrailVersionCommand"),
    u_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/inference-profiles");
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        description: [],
        inferenceProfileName: [],
        modelSource: u((Z) => j._json(Z), "modelSource"),
        tags: u((Z) => j._json(Z), "tags")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateInferenceProfileCommand"),
    p_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/marketplace-model/endpoints");
      let G;
      return G = JSON.stringify(j.take(A, {
        acceptEula: [],
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        endpointConfig: u((Z) => j._json(Z), "endpointConfig"),
        endpointName: [],
        modelSourceIdentifier: [],
        tags: u((Z) => j._json(Z), "tags")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateMarketplaceModelEndpointCommand"),
    c_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/model-copy-jobs");
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        modelKmsKeyId: [],
        sourceModelArn: [],
        targetModelName: [],
        targetModelTags: u((Z) => j._json(Z), "targetModelTags")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateModelCopyJobCommand"),
    l_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/model-customization-jobs");
      let G;
      return G = JSON.stringify(j.take(A, {
        baseModelIdentifier: [],
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        customModelKmsKeyId: [],
        customModelName: [],
        customModelTags: u((Z) => j._json(Z), "customModelTags"),
        customizationConfig: u((Z) => j._json(Z), "customizationConfig"),
        customizationType: [],
        hyperParameters: u((Z) => j._json(Z), "hyperParameters"),
        jobName: [],
        jobTags: u((Z) => j._json(Z), "jobTags"),
        outputDataConfig: u((Z) => j._json(Z), "outputDataConfig"),
        roleArn: [],
        trainingDataConfig: u((Z) => j._json(Z), "trainingDataConfig"),
        validationDataConfig: u((Z) => j._json(Z), "validationDataConfig"),
        vpcConfig: u((Z) => j._json(Z), "vpcConfig")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateModelCustomizationJobCommand"),
    i_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/model-import-jobs");
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [],
        importedModelKmsKeyId: [],
        importedModelName: [],
        importedModelTags: u((Z) => j._json(Z), "importedModelTags"),
        jobName: [],
        jobTags: u((Z) => j._json(Z), "jobTags"),
        modelDataSource: u((Z) => j._json(Z), "modelDataSource"),
        roleArn: [],
        vpcConfig: u((Z) => j._json(Z), "vpcConfig")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateModelImportJobCommand"),
    n_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/model-invocation-job");
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        inputDataConfig: u((Z) => j._json(Z), "inputDataConfig"),
        jobName: [],
        modelId: [],
        outputDataConfig: u((Z) => j._json(Z), "outputDataConfig"),
        roleArn: [],
        tags: u((Z) => j._json(Z), "tags"),
        timeoutDurationInHours: [],
        vpcConfig: u((Z) => j._json(Z), "vpcConfig")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateModelInvocationJobCommand"),
    a_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/prompt-routers");
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        description: [],
        fallbackModel: u((Z) => j._json(Z), "fallbackModel"),
        models: u((Z) => j._json(Z), "models"),
        promptRouterName: [],
        routingCriteria: u((Z) => jk4(Z, B), "routingCriteria"),
        tags: u((Z) => j._json(Z), "tags")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreatePromptRouterCommand"),
    s_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/provisioned-model-throughput");
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        commitmentDuration: [],
        modelId: [],
        modelUnits: [],
        provisionedModelName: [],
        tags: u((Z) => j._json(Z), "tags")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateProvisionedModelThroughputCommand"),
    r_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/custom-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeleteCustomModelCommand"),
    o_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
      let G = j.map({
          [VG1]: [, A[VG1]]
        }),
        Z;
      return Q.m("DELETE").h(I).q(G).b(Z), Q.build()
    }, "se_DeleteGuardrailCommand"),
    t_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/imported-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeleteImportedModelCommand"),
    e_4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/inference-profiles/{inferenceProfileIdentifier}"), Q.p("inferenceProfileIdentifier", () => A.inferenceProfileIdentifier, "{inferenceProfileIdentifier}", !1);
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeleteInferenceProfileCommand"),
    Aj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/marketplace-model/endpoints/{endpointArn}"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeleteMarketplaceModelEndpointCommand"),
    Bj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/logging/modelinvocations");
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeleteModelInvocationLoggingConfigurationCommand"),
    Qj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/prompt-routers/{promptRouterArn}"), Q.p("promptRouterArn", () => A.promptRouterArn, "{promptRouterArn}", !1);
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeletePromptRouterCommand"),
    Ij4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/provisioned-model-throughput/{provisionedModelId}"), Q.p("provisionedModelId", () => A.provisionedModelId, "{provisionedModelId}", !1);
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeleteProvisionedModelThroughputCommand"),
    Gj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/marketplace-model/endpoints/{endpointArn}/registration"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
      let G;
      return Q.m("DELETE").h(I).b(G), Q.build()
    }, "se_DeregisterMarketplaceModelEndpointCommand"),
    Zj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/custom-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetCustomModelCommand"),
    Dj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/evaluation-jobs/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetEvaluationJobCommand"),
    Yj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/foundation-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetFoundationModelCommand"),
    Wj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
      let G = j.map({
          [VG1]: [, A[VG1]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_GetGuardrailCommand"),
    Jj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/imported-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetImportedModelCommand"),
    Fj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/inference-profiles/{inferenceProfileIdentifier}"), Q.p("inferenceProfileIdentifier", () => A.inferenceProfileIdentifier, "{inferenceProfileIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetInferenceProfileCommand"),
    Xj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/marketplace-model/endpoints/{endpointArn}"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetMarketplaceModelEndpointCommand"),
    Vj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-copy-jobs/{jobArn}"), Q.p("jobArn", () => A.jobArn, "{jobArn}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetModelCopyJobCommand"),
    Cj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-customization-jobs/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetModelCustomizationJobCommand"),
    Kj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-import-jobs/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetModelImportJobCommand"),
    Hj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-invocation-job/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetModelInvocationJobCommand"),
    zj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/logging/modelinvocations");
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetModelInvocationLoggingConfigurationCommand"),
    wj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/prompt-routers/{promptRouterArn}"), Q.p("promptRouterArn", () => A.promptRouterArn, "{promptRouterArn}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetPromptRouterCommand"),
    Ej4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/provisioned-model-throughput/{provisionedModelId}"), Q.p("provisionedModelId", () => A.provisionedModelId, "{provisionedModelId}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetProvisionedModelThroughputCommand"),
    Uj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/custom-models");
      let G = j.map({
          [bY]: [() => A.creationTimeBefore !== void 0, () => j.serializeDateTime(A[bY]).toString()],
          [vY]: [() => A.creationTimeAfter !== void 0, () => j.serializeDateTime(A[vY]).toString()],
          [gY]: [, A[gY]],
          [V70]: [, A[V70]],
          [H70]: [, A[H70]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]],
          [w70]: [() => A.isOwned !== void 0, () => A[w70].toString()]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListCustomModelsCommand"),
    Nj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/evaluation-jobs");
      let G = j.map({
          [vY]: [() => A.creationTimeAfter !== void 0, () => j.serializeDateTime(A[vY]).toString()],
          [bY]: [() => A.creationTimeBefore !== void 0, () => j.serializeDateTime(A[bY]).toString()],
          [HX]: [, A[HX]],
          [J70]: [, A[J70]],
          [gY]: [, A[gY]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListEvaluationJobsCommand"),
    $j4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/foundation-models");
      let G = j.map({
          [K70]: [, A[K70]],
          [F70]: [, A[F70]],
          [C70]: [, A[C70]],
          [X70]: [, A[X70]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListFoundationModelsCommand"),
    qj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/guardrails");
      let G = j.map({
          [z70]: [, A[z70]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListGuardrailsCommand"),
    Mj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/imported-models");
      let G = j.map({
          [bY]: [() => A.creationTimeBefore !== void 0, () => j.serializeDateTime(A[bY]).toString()],
          [vY]: [() => A.creationTimeAfter !== void 0, () => j.serializeDateTime(A[vY]).toString()],
          [gY]: [, A[gY]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListImportedModelsCommand"),
    Lj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/inference-profiles");
      let G = j.map({
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [Kf1]: [, A[vx4]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListInferenceProfilesCommand"),
    Rj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/marketplace-model/endpoints");
      let G = j.map({
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [xx4]: [, A[kx4]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListMarketplaceModelEndpointsCommand"),
    Oj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-copy-jobs");
      let G = j.map({
          [vY]: [() => A.creationTimeAfter !== void 0, () => j.serializeDateTime(A[vY]).toString()],
          [bY]: [() => A.creationTimeBefore !== void 0, () => j.serializeDateTime(A[bY]).toString()],
          [HX]: [, A[HX]],
          [U70]: [, A[U70]],
          [N70]: [, A[N70]],
          [fx4]: [, A[bx4]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListModelCopyJobsCommand"),
    Tj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-customization-jobs");
      let G = j.map({
          [vY]: [() => A.creationTimeAfter !== void 0, () => j.serializeDateTime(A[vY]).toString()],
          [bY]: [() => A.creationTimeBefore !== void 0, () => j.serializeDateTime(A[bY]).toString()],
          [HX]: [, A[HX]],
          [gY]: [, A[gY]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListModelCustomizationJobsCommand"),
    Pj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-import-jobs");
      let G = j.map({
          [vY]: [() => A.creationTimeAfter !== void 0, () => j.serializeDateTime(A[vY]).toString()],
          [bY]: [() => A.creationTimeBefore !== void 0, () => j.serializeDateTime(A[bY]).toString()],
          [HX]: [, A[HX]],
          [gY]: [, A[gY]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListModelImportJobsCommand"),
    Sj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-invocation-jobs");
      let G = j.map({
          [$70]: [() => A.submitTimeAfter !== void 0, () => j.serializeDateTime(A[$70]).toString()],
          [q70]: [() => A.submitTimeBefore !== void 0, () => j.serializeDateTime(A[q70]).toString()],
          [HX]: [, A[HX]],
          [gY]: [, A[gY]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListModelInvocationJobsCommand"),
    _j4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/prompt-routers");
      let G = j.map({
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [Kf1]: [, A[Kf1]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListPromptRoutersCommand"),
    jj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/provisioned-model-throughputs");
      let G = j.map({
          [vY]: [() => A.creationTimeAfter !== void 0, () => j.serializeDateTime(A[vY]).toString()],
          [bY]: [() => A.creationTimeBefore !== void 0, () => j.serializeDateTime(A[bY]).toString()],
          [HX]: [, A[HX]],
          [E70]: [, A[E70]],
          [gY]: [, A[gY]],
          [tB]: [() => A.maxResults !== void 0, () => A[tB].toString()],
          [eB]: [, A[eB]],
          [RZ]: [, A[RZ]],
          [OZ]: [, A[OZ]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListProvisionedModelThroughputsCommand"),
    yj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/listTagsForResource");
      let G;
      return G = JSON.stringify(j.take(A, {
        resourceARN: []
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_ListTagsForResourceCommand"),
    kj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/logging/modelinvocations");
      let G;
      return G = JSON.stringify(j.take(A, {
        loggingConfig: u((Z) => j._json(Z), "loggingConfig")
      })), Q.m("PUT").h(I).b(G), Q.build()
    }, "se_PutModelInvocationLoggingConfigurationCommand"),
    xj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/marketplace-model/endpoints/{endpointIdentifier}/registration"), Q.p("endpointIdentifier", () => A.endpointIdentifier, "{endpointIdentifier}", !1);
      let G;
      return G = JSON.stringify(j.take(A, {
        modelSourceIdentifier: []
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_RegisterMarketplaceModelEndpointCommand"),
    fj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/evaluation-job/{jobIdentifier}/stop"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
      let G;
      return Q.m("POST").h(I).b(G), Q.build()
    }, "se_StopEvaluationJobCommand"),
    vj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-customization-jobs/{jobIdentifier}/stop"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
      let G;
      return Q.m("POST").h(I).b(G), Q.build()
    }, "se_StopModelCustomizationJobCommand"),
    bj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {};
      Q.bp("/model-invocation-job/{jobIdentifier}/stop"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
      let G;
      return Q.m("POST").h(I).b(G), Q.build()
    }, "se_StopModelInvocationJobCommand"),
    gj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/tagResource");
      let G;
      return G = JSON.stringify(j.take(A, {
        resourceARN: [],
        tags: u((Z) => j._json(Z), "tags")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_TagResourceCommand"),
    hj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/untagResource");
      let G;
      return G = JSON.stringify(j.take(A, {
        resourceARN: [],
        tagKeys: u((Z) => j._json(Z), "tagKeys")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_UntagResourceCommand"),
    mj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
      let G;
      return G = JSON.stringify(j.take(A, {
        blockedInputMessaging: [],
        blockedOutputsMessaging: [],
        contentPolicyConfig: u((Z) => j._json(Z), "contentPolicyConfig"),
        contextualGroundingPolicyConfig: u((Z) => cI0(Z, B), "contextualGroundingPolicyConfig"),
        description: [],
        kmsKeyId: [],
        name: [],
        sensitiveInformationPolicyConfig: u((Z) => j._json(Z), "sensitiveInformationPolicyConfig"),
        topicPolicyConfig: u((Z) => j._json(Z), "topicPolicyConfig"),
        wordPolicyConfig: u((Z) => j._json(Z), "wordPolicyConfig")
      })), Q.m("PUT").h(I).b(G), Q.build()
    }, "se_UpdateGuardrailCommand"),
    dj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/marketplace-model/endpoints/{endpointArn}"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
      let G;
      return G = JSON.stringify(j.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? yC.v4()],
        endpointConfig: u((Z) => j._json(Z), "endpointConfig")
      })), Q.m("PATCH").h(I).b(G), Q.build()
    }, "se_UpdateMarketplaceModelEndpointCommand"),
    uj4 = u(async (A, B) => {
      let Q = C2.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/provisioned-model-throughput/{provisionedModelId}"), Q.p("provisionedModelId", () => A.provisionedModelId, "{provisionedModelId}", !1);
      let G;
      return G = JSON.stringify(j.take(A, {
        desiredModelId: [],
        desiredProvisionedModelName: []
      })), Q.m("PATCH").h(I).b(G), Q.build()
    }, "se_UpdateProvisionedModelThroughputCommand"),
    pj4 = u(async (A, B) => {
      if (A.statusCode !== 202 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          errors: j._json,
          evaluationJobs: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_BatchDeleteEvaluationJobCommand"),
    cj4 = u(async (A, B) => {
      if (A.statusCode !== 202 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          jobArn: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateEvaluationJobCommand"),
    lj4 = u(async (A, B) => {
      if (A.statusCode !== 202 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          createdAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "createdAt"),
          guardrailArn: j.expectString,
          guardrailId: j.expectString,
          version: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateGuardrailCommand"),
    ij4 = u(async (A, B) => {
      if (A.statusCode !== 202 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          guardrailId: j.expectString,
          version: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateGuardrailVersionCommand"),
    nj4 = u(async (A, B) => {
      if (A.statusCode !== 201 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          inferenceProfileArn: j.expectString,
          status: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateInferenceProfileCommand"),
    aj4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          marketplaceModelEndpoint: u((Z) => HG1(Z, B), "marketplaceModelEndpoint")
        });
      return Object.assign(Q, G), Q
    }, "de_CreateMarketplaceModelEndpointCommand"),
    sj4 = u(async (A, B) => {
      if (A.statusCode !== 201 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          jobArn: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateModelCopyJobCommand"),
    rj4 = u(async (A, B) => {
      if (A.statusCode !== 201 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          jobArn: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateModelCustomizationJobCommand"),
    oj4 = u(async (A, B) => {
      if (A.statusCode !== 201 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          jobArn: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateModelImportJobCommand"),
    tj4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          jobArn: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateModelInvocationJobCommand"),
    ej4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          promptRouterArn: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreatePromptRouterCommand"),
    Ay4 = u(async (A, B) => {
      if (A.statusCode !== 201 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          provisionedModelArn: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateProvisionedModelThroughputCommand"),
    By4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeleteCustomModelCommand"),
    Qy4 = u(async (A, B) => {
      if (A.statusCode !== 202 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeleteGuardrailCommand"),
    Iy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeleteImportedModelCommand"),
    Gy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeleteInferenceProfileCommand"),
    Zy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeleteMarketplaceModelEndpointCommand"),
    Dy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeleteModelInvocationLoggingConfigurationCommand"),
    Yy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeletePromptRouterCommand"),
    Wy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeleteProvisionedModelThroughputCommand"),
    Jy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_DeregisterMarketplaceModelEndpointCommand"),
    Fy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          baseModelArn: j.expectString,
          creationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "creationTime"),
          customizationConfig: u((Z) => j._json(u2.awsExpectUnion(Z)), "customizationConfig"),
          customizationType: j.expectString,
          hyperParameters: j._json,
          jobArn: j.expectString,
          jobName: j.expectString,
          modelArn: j.expectString,
          modelKmsKeyArn: j.expectString,
          modelName: j.expectString,
          outputDataConfig: j._json,
          trainingDataConfig: j._json,
          trainingMetrics: u((Z) => eI0(Z, B), "trainingMetrics"),
          validationDataConfig: j._json,
          validationMetrics: u((Z) => AG0(Z, B), "validationMetrics")
        });
      return Object.assign(Q, G), Q
    }, "de_GetCustomModelCommand"),
    Xy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          applicationType: j.expectString,
          creationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "creationTime"),
          customerEncryptionKeyId: j.expectString,
          evaluationConfig: u((Z) => uk4(u2.awsExpectUnion(Z), B), "evaluationConfig"),
          failureMessages: j._json,
          inferenceConfig: u((Z) => pk4(u2.awsExpectUnion(Z), B), "inferenceConfig"),
          jobArn: j.expectString,
          jobDescription: j.expectString,
          jobName: j.expectString,
          jobType: j.expectString,
          lastModifiedTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "lastModifiedTime"),
          outputDataConfig: j._json,
          roleArn: j.expectString,
          status: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_GetEvaluationJobCommand"),
    Vy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          modelDetails: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetFoundationModelCommand"),
    Cy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          blockedInputMessaging: j.expectString,
          blockedOutputsMessaging: j.expectString,
          contentPolicy: j._json,
          contextualGroundingPolicy: u((Z) => Ax4(Z, B), "contextualGroundingPolicy"),
          createdAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "createdAt"),
          description: j.expectString,
          failureRecommendations: j._json,
          guardrailArn: j.expectString,
          guardrailId: j.expectString,
          kmsKeyArn: j.expectString,
          name: j.expectString,
          sensitiveInformationPolicy: j._json,
          status: j.expectString,
          statusReasons: j._json,
          topicPolicy: j._json,
          updatedAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "updatedAt"),
          version: j.expectString,
          wordPolicy: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetGuardrailCommand"),
    Ky4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          creationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "creationTime"),
          customModelUnits: j._json,
          instructSupported: j.expectBoolean,
          jobArn: j.expectString,
          jobName: j.expectString,
          modelArchitecture: j.expectString,
          modelArn: j.expectString,
          modelDataSource: u((Z) => j._json(u2.awsExpectUnion(Z)), "modelDataSource"),
          modelKmsKeyArn: j.expectString,
          modelName: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_GetImportedModelCommand"),
    Hy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          createdAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "createdAt"),
          description: j.expectString,
          inferenceProfileArn: j.expectString,
          inferenceProfileId: j.expectString,
          inferenceProfileName: j.expectString,
          models: j._json,
          status: j.expectString,
          type: j.expectString,
          updatedAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "updatedAt")
        });
      return Object.assign(Q, G), Q
    }, "de_GetInferenceProfileCommand"),
    zy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          marketplaceModelEndpoint: u((Z) => HG1(Z, B), "marketplaceModelEndpoint")
        });
      return Object.assign(Q, G), Q
    }, "de_GetMarketplaceModelEndpointCommand"),
    wy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          creationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "creationTime"),
          failureMessage: j.expectString,
          jobArn: j.expectString,
          sourceAccountId: j.expectString,
          sourceModelArn: j.expectString,
          sourceModelName: j.expectString,
          status: j.expectString,
          targetModelArn: j.expectString,
          targetModelKmsKeyArn: j.expectString,
          targetModelName: j.expectString,
          targetModelTags: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetModelCopyJobCommand"),
    Ey4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          baseModelArn: j.expectString,
          clientRequestToken: j.expectString,
          creationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "creationTime"),
          customizationConfig: u((Z) => j._json(u2.awsExpectUnion(Z)), "customizationConfig"),
          customizationType: j.expectString,
          endTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "endTime"),
          failureMessage: j.expectString,
          hyperParameters: j._json,
          jobArn: j.expectString,
          jobName: j.expectString,
          lastModifiedTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "lastModifiedTime"),
          outputDataConfig: j._json,
          outputModelArn: j.expectString,
          outputModelKmsKeyArn: j.expectString,
          outputModelName: j.expectString,
          roleArn: j.expectString,
          status: j.expectString,
          trainingDataConfig: j._json,
          trainingMetrics: u((Z) => eI0(Z, B), "trainingMetrics"),
          validationDataConfig: j._json,
          validationMetrics: u((Z) => AG0(Z, B), "validationMetrics"),
          vpcConfig: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetModelCustomizationJobCommand"),
    Uy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          creationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "creationTime"),
          endTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "endTime"),
          failureMessage: j.expectString,
          importedModelArn: j.expectString,
          importedModelKmsKeyArn: j.expectString,
          importedModelName: j.expectString,
          jobArn: j.expectString,
          jobName: j.expectString,
          lastModifiedTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "lastModifiedTime"),
          modelDataSource: u((Z) => j._json(u2.awsExpectUnion(Z)), "modelDataSource"),
          roleArn: j.expectString,
          status: j.expectString,
          vpcConfig: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetModelImportJobCommand"),
    Ny4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          clientRequestToken: j.expectString,
          endTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "endTime"),
          inputDataConfig: u((Z) => j._json(u2.awsExpectUnion(Z)), "inputDataConfig"),
          jobArn: j.expectString,
          jobExpirationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "jobExpirationTime"),
          jobName: j.expectString,
          lastModifiedTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "lastModifiedTime"),
          message: j.expectString,
          modelId: j.expectString,
          outputDataConfig: u((Z) => j._json(u2.awsExpectUnion(Z)), "outputDataConfig"),
          roleArn: j.expectString,
          status: j.expectString,
          submitTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "submitTime"),
          timeoutDurationInHours: j.expectInt32,
          vpcConfig: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetModelInvocationJobCommand"),
    $y4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          loggingConfig: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetModelInvocationLoggingConfigurationCommand"),
    qy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          createdAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "createdAt"),
          description: j.expectString,
          fallbackModel: j._json,
          models: j._json,
          promptRouterArn: j.expectString,
          promptRouterName: j.expectString,
          routingCriteria: u((Z) => tI0(Z, B), "routingCriteria"),
          status: j.expectString,
          type: j.expectString,
          updatedAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "updatedAt")
        });
      return Object.assign(Q, G), Q
    }, "de_GetPromptRouterCommand"),
    My4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          commitmentDuration: j.expectString,
          commitmentExpirationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "commitmentExpirationTime"),
          creationTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "creationTime"),
          desiredModelArn: j.expectString,
          desiredModelUnits: j.expectInt32,
          failureMessage: j.expectString,
          foundationModelArn: j.expectString,
          lastModifiedTime: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "lastModifiedTime"),
          modelArn: j.expectString,
          modelUnits: j.expectInt32,
          provisionedModelArn: j.expectString,
          provisionedModelName: j.expectString,
          status: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_GetProvisionedModelThroughputCommand"),
    Ly4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          modelSummaries: u((Z) => dk4(Z, B), "modelSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListCustomModelsCommand"),
    Ry4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          jobSummaries: u((Z) => ck4(Z, B), "jobSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListEvaluationJobsCommand"),
    Oy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          modelSummaries: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_ListFoundationModelsCommand"),
    Ty4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          guardrails: u((Z) => Bx4(Z, B), "guardrails"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListGuardrailsCommand"),
    Py4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          modelSummaries: u((Z) => Gx4(Z, B), "modelSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListImportedModelsCommand"),
    Sy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          inferenceProfileSummaries: u((Z) => Zx4(Z, B), "inferenceProfileSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListInferenceProfilesCommand"),
    _y4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          marketplaceModelEndpoints: u((Z) => Fx4(Z, B), "marketplaceModelEndpoints"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListMarketplaceModelEndpointsCommand"),
    jy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          modelCopyJobSummaries: u((Z) => Vx4(Z, B), "modelCopyJobSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListModelCopyJobsCommand"),
    yy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          modelCustomizationJobSummaries: u((Z) => Kx4(Z, B), "modelCustomizationJobSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListModelCustomizationJobsCommand"),
    ky4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          modelImportJobSummaries: u((Z) => zx4(Z, B), "modelImportJobSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListModelImportJobsCommand"),
    xy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          invocationJobSummaries: u((Z) => Ex4(Z, B), "invocationJobSummaries"),
          nextToken: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListModelInvocationJobsCommand"),
    fy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          nextToken: j.expectString,
          promptRouterSummaries: u((Z) => Nx4(Z, B), "promptRouterSummaries")
        });
      return Object.assign(Q, G), Q
    }, "de_ListPromptRoutersCommand"),
    vy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          nextToken: j.expectString,
          provisionedModelSummaries: u((Z) => qx4(Z, B), "provisionedModelSummaries")
        });
      return Object.assign(Q, G), Q
    }, "de_ListProvisionedModelThroughputsCommand"),
    by4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          tags: j._json
        });
      return Object.assign(Q, G), Q
    }, "de_ListTagsForResourceCommand"),
    gy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_PutModelInvocationLoggingConfigurationCommand"),
    hy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          marketplaceModelEndpoint: u((Z) => HG1(Z, B), "marketplaceModelEndpoint")
        });
      return Object.assign(Q, G), Q
    }, "de_RegisterMarketplaceModelEndpointCommand"),
    my4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_StopEvaluationJobCommand"),
    dy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_StopModelCustomizationJobCommand"),
    uy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_StopModelInvocationJobCommand"),
    py4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_TagResourceCommand"),
    cy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_UntagResourceCommand"),
    ly4 = u(async (A, B) => {
      if (A.statusCode !== 202 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          guardrailArn: j.expectString,
          guardrailId: j.expectString,
          updatedAt: u((Z) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Z)), "updatedAt"),
          version: j.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_UpdateGuardrailCommand"),
    iy4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
          $metadata: P2(A)
        }),
        I = j.expectNonNull(j.expectObject(await u2.parseJsonBody(A.body, B)), "body"),
        G = j.take(I, {
          marketplaceModelEndpoint: u((Z) => HG1(Z, B), "marketplaceModelEndpoint")
        });
      return Object.assign(Q, G), Q
    }, "de_UpdateMarketplaceModelEndpointCommand"),
    ny4 = u(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return J9(A, B);
      let Q = j.map({
        $metadata: P2(A)
      });
      return await j.collectBody(A.body, B), Q
    }, "de_UpdateProvisionedModelThroughputCommand"),
    J9 = u(async (A, B) => {
      let Q = {
          ...A,
          body: await u2.parseJsonErrorBody(A.body, B)
        },
        I = u2.loadRestJsonErrorCode(A, Q.body);
      switch (I) {
        case "AccessDeniedException":
        case "com.amazonaws.bedrock#AccessDeniedException":
          throw await sy4(Q, B);
        case "ConflictException":
        case "com.amazonaws.bedrock#ConflictException":
          throw await ry4(Q, B);
        case "InternalServerException":
        case "com.amazonaws.bedrock#InternalServerException":
          throw await oy4(Q, B);
        case "ResourceNotFoundException":
        case "com.amazonaws.bedrock#ResourceNotFoundException":
          throw await ty4(Q, B);
        case "ThrottlingException":
        case "com.amazonaws.bedrock#ThrottlingException":
          throw await Bk4(Q, B);
        case "ValidationException":
        case "com.amazonaws.bedrock#ValidationException":
          throw await Ik4(Q, B);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.bedrock#ServiceQuotaExceededException":
          throw await ey4(Q, B);
        case "TooManyTagsException":
        case "com.amazonaws.bedrock#TooManyTagsException":
          throw await Qk4(Q, B);
        case "ServiceUnavailableException":
        case "com.amazonaws.bedrock#ServiceUnavailableException":
          throw await Ak4(Q, B);
        default:
          let G = Q.body;
          return ay4({
            output: A,
            parsedBody: G,
            errorCode: I
          })
      }
    }, "de_CommandError"),
    ay4 = j.withBaseException(jC),
    sy4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new L70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_AccessDeniedExceptionRes"),
    ry4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new R70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_ConflictExceptionRes"),
    oy4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new O70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_InternalServerExceptionRes"),
    ty4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new T70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_ResourceNotFoundExceptionRes"),
    ey4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new P70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_ServiceQuotaExceededExceptionRes"),
    Ak4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new j70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_ServiceUnavailableExceptionRes"),
    Bk4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new S70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_ThrottlingExceptionRes"),
    Qk4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString,
          resourceName: j.expectString
        });
      Object.assign(Q, G);
      let Z = new y70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_TooManyTagsExceptionRes"),
    Ik4 = u(async (A, B) => {
      let Q = j.map({}),
        I = A.body,
        G = j.take(I, {
          message: j.expectString
        });
      Object.assign(Q, G);
      let Z = new _70({
        $metadata: P2(A),
        ...Q
      });
      return j.decorateServiceException(Z, A.body)
    }, "de_ValidationExceptionRes"),
    pI0 = u((A, B) => {
      return Object.entries(A).reduce((Q, [I, G]) => {
        if (G === null) return Q;
        return Q[I] = Gk4(G, B), Q
      }, {})
    }, "se_AdditionalModelRequestFields"),
    Gk4 = u((A, B) => {
      return A
    }, "se_AdditionalModelRequestFieldsValue"),
    Zk4 = u((A, B) => {
      return j.take(A, {
        customMetricConfig: u((Q) => Dk4(Q, B), "customMetricConfig"),
        datasetMetricConfigs: j._json,
        evaluatorModelConfig: j._json
      })
    }, "se_AutomatedEvaluationConfig"),
    Dk4 = u((A, B) => {
      return j.take(A, {
        customMetrics: u((Q) => Yk4(Q, B), "customMetrics"),
        evaluatorModelConfig: j._json
      })
    }, "se_AutomatedEvaluationCustomMetricConfig"),
    Yk4 = u((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Wk4(Q, B)
      })
    }, "se_AutomatedEvaluationCustomMetrics"),
    Wk4 = u((A, B) => {
      return DG1.visit(A, {
        customMetricDefinition: u((Q) => ({
          customMetricDefinition: Fk4(Q, B)
        }), "customMetricDefinition"),
        _: u((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_AutomatedEvaluationCustomMetricSource"),
    Jk4 = u((A, B) => {
      return j.take(A, {
        contentType: [],
        data: B.base64Encoder,
        identifier: []
      })
    }, "se_ByteContentDoc"),
    Fk4 = u((A, B) => {
      return j.take(A, {
        instructions: [],
        name: [],
        ratingScale: u((Q) => Ok4(Q, B), "ratingScale")
      })
    }, "se_CustomMetricDefinition"),
    Xk4 = u((A, B) => {
      return YG1.visit(A, {
        automated: u((Q) => ({
          automated: Zk4(Q, B)
        }), "automated"),
        human: u((Q) => ({
          human: j._json(Q)
        }), "human"),
        _: u((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_EvaluationConfig"),
    Vk4 = u((A, B) => {
      return XG1.visit(A, {
        models: u((Q) => ({
          models: j._json(Q)
        }), "models"),
        ragConfigs: u((Q) => ({
          ragConfigs: Rk4(Q, B)
        }), "ragConfigs"),
        _: u((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_EvaluationInferenceConfig"),
    Ck4 = u((A, B) => {
      return j.take(A, {
        byteContent: u((Q) => Jk4(Q, B), "byteContent"),
        s3Location: j._json,
        sourceType: []
      })
    }, "se_ExternalSource"),
    Kk4 = u((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Ck4(Q, B)
      })
    }, "se_ExternalSources"),
    Hk4 = u((A, B) => {
      return j.take(A, {
        additionalModelRequestFields: u((Q) => pI0(Q, B), "additionalModelRequestFields"),
        guardrailConfiguration: j._json,
        kbInferenceConfig: u((Q) => lI0(Q, B), "kbInferenceConfig"),
        promptTemplate: j._json
      })
    }, "se_ExternalSourcesGenerationConfiguration"),
    zk4 = u((A, B) => {
      return j.take(A, {
        generationConfiguration: u((Q) => Hk4(Q, B), "generationConfiguration"),
        modelArn: [],
        sources: u((Q) => Kk4(Q, B), "sources")
      })
    }, "se_ExternalSourcesRetrieveAndGenerateConfiguration"),
    SC = u((A, B) => {
      return j.take(A, {
        key: [],
        value: u((Q) => wk4(Q, B), "value")
      })
    }, "se_FilterAttribute"),
    wk4 = u((A, B) => {
      return A
    }, "se_FilterValue"),
    Ek4 = u((A, B) => {
      return j.take(A, {
        additionalModelRequestFields: u((Q) => pI0(Q, B), "additionalModelRequestFields"),
        guardrailConfiguration: j._json,
        kbInferenceConfig: u((Q) => lI0(Q, B), "kbInferenceConfig"),
        promptTemplate: j._json
      })
    }, "se_GenerationConfiguration"),
    Uk4 = u((A, B) => {
      return j.take(A, {
        action: [],
        enabled: [],
        threshold: j.serializeFloat,
        type: []
      })
    }, "se_GuardrailContextualGroundingFilterConfig"),
    Nk4 = u((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Uk4(Q, B)
      })
    }, "se_GuardrailContextualGroundingFiltersConfig"),
    cI0 = u((A, B) => {
      return j.take(A, {
        filtersConfig: u((Q) => Nk4(Q, B), "filtersConfig")
      })
    }, "se_GuardrailContextualGroundingPolicyConfig"),
    lI0 = u((A, B) => {
      return j.take(A, {
        textInferenceConfig: u((Q) => yk4(Q, B), "textInferenceConfig")
      })
    }, "se_KbInferenceConfig"),
    $k4 = u((A, B) => {
      return JG1.visit(A, {
        retrieveAndGenerateConfig: u((Q) => ({
          retrieveAndGenerateConfig: Sk4(Q, B)
        }), "retrieveAndGenerateConfig"),
        retrieveConfig: u((Q) => ({
          retrieveConfig: _k4(Q, B)
        }), "retrieveConfig"),
        _: u((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_KnowledgeBaseConfig"),
    iI0 = u((A, B) => {
      return j.take(A, {
        vectorSearchConfiguration: u((Q) => Mk4(Q, B), "vectorSearchConfiguration")
      })
    }, "se_KnowledgeBaseRetrievalConfiguration"),
    qk4 = u((A, B) => {
      return j.take(A, {
        generationConfiguration: u((Q) => Ek4(Q, B), "generationConfiguration"),
        knowledgeBaseId: [],
        modelArn: [],
        orchestrationConfiguration: j._json,
        retrievalConfiguration: u((Q) => iI0(Q, B), "retrievalConfiguration")
      })
    }, "se_KnowledgeBaseRetrieveAndGenerateConfiguration"),
    Mk4 = u((A, B) => {
      return j.take(A, {
        filter: u((Q) => nI0(Q, B), "filter"),
        numberOfResults: [],
        overrideSearchType: []
      })
    }, "se_KnowledgeBaseVectorSearchConfiguration"),
    Lk4 = u((A, B) => {
      return FG1.visit(A, {
        knowledgeBaseConfig: u((Q) => ({
          knowledgeBaseConfig: $k4(Q, B)
        }), "knowledgeBaseConfig"),
        precomputedRagSourceConfig: u((Q) => ({
          precomputedRagSourceConfig: j._json(Q)
        }), "precomputedRagSourceConfig"),
        _: u((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_RAGConfig"),
    Rk4 = u((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Lk4(Q, B)
      })
    }, "se_RagConfigs"),
    Ok4 = u((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Tk4(Q, B)
      })
    }, "se_RatingScale"),
    Tk4 = u((A, B) => {
      return j.take(A, {
        definition: [],
        value: u((Q) => Pk4(Q, B), "value")
      })
    }, "se_RatingScaleItem"),
    Pk4 = u((A, B) => {
      return ZG1.visit(A, {
        floatValue: u((Q) => ({
          floatValue: j.serializeFloat(Q)
        }), "floatValue"),
        stringValue: u((Q) => ({
          stringValue: Q
        }), "stringValue"),
        _: u((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_RatingScaleItemValue"),
    nI0 = u((A, B) => {
      return WG1.visit(A, {
        andAll: u((Q) => ({
          andAll: Y70(Q, B)
        }), "andAll"),
        equals: u((Q) => ({
          equals: SC(Q, B)
        }), "equals"),
        greaterThan: u((Q) => ({
          greaterThan: SC(Q, B)
        }), "greaterThan"),
        greaterThanOrEquals: u((Q) => ({
          greaterThanOrEquals: SC(Q, B)
        }), "greaterThanOrEquals"),
        in: u((Q) => ({
          in: SC(Q, B)
        }), "in"),
        lessThan: u((Q) => ({
          lessThan: SC(Q, B)
        }), "lessThan"),
        lessThanOrEquals: u((Q) => ({
          lessThanOrEquals: SC(Q, B)
        }), "lessThanOrEquals"),
        listContains: u((Q) => ({
          listContains: SC(Q, B)
        }), "listContains"),
        notEquals: u((Q) => ({
          notEquals: SC(Q, B)
        }), "notEquals"),
        notIn: u((Q) => ({
          notIn: SC(Q, B)
        }), "notIn"),
        orAll: u((Q) => ({
          orAll: Y70(Q, B)
        }), "orAll"),
        startsWith: u((Q) => ({
          startsWith: SC(Q, B)
        }), "startsWith"),
        stringContains: u((Q) => ({
          stringContains: SC(Q, B)
        }), "stringContains"),
        _: u((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_RetrievalFilter"),
    Y70 = u((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return nI0(Q, B)
      })
    }, "se_RetrievalFilterList"),
    Sk4 = u((A, B) => {
      return j.take(A, {
        externalSourcesConfiguration: u((Q) => zk4(Q, B), "externalSourcesConfiguration"),
        knowledgeBaseConfiguration: u((Q) => qk4(Q, B), "knowledgeBaseConfiguration"),
        type: []
      })
    }, "se_RetrieveAndGenerateConfiguration"),
    _k4 = u((A, B) => {
      return j.take(A, {
        knowledgeBaseId: [],
        knowledgeBaseRetrievalConfiguration: u((Q) => iI0(Q, B), "knowledgeBaseRetrievalConfiguration")
      })
    }, "se_RetrieveConfig"),
    jk4 = u((A, B) => {
      return j.take(A, {
        responseQualityDifference: j.serializeFloat
      })
    }, "se_RoutingCriteria"),
    yk4 = u((A, B) => {
      return j.take(A, {
        maxTokens: [],
        stopSequences: j._json,
        temperature: j.serializeFloat,
        topP: j.serializeFloat
      })
    }, "se_TextInferenceConfig"),
    aI0 = u((A, B) => {
      return Object.entries(A).reduce((Q, [I, G]) => {
        if (G === null) return Q;
        return Q[I] = kk4(G, B), Q
      }, {})
    }, "de_AdditionalModelRequestFields"),
    kk4 = u((A, B) => {
      return A
    }, "de_AdditionalModelRequestFieldsValue"),
    xk4 = u((A, B) => {
      return j.take(A, {
        customMetricConfig: u((Q) => fk4(Q, B), "customMetricConfig"),
        datasetMetricConfigs: j._json,
        evaluatorModelConfig: u((Q) => j._json(u2.awsExpectUnion(Q)), "evaluatorModelConfig")
      })
    }, "de_AutomatedEvaluationConfig"),
    fk4 = u((A, B) => {
      return j.take(A, {
        customMetrics: u((Q) => vk4(Q, B), "customMetrics"),
        evaluatorModelConfig: j._json
      })
    }, "de_AutomatedEvaluationCustomMetricConfig"),
    vk4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return bk4(u2.awsExpectUnion(I), B)
      })
    }, "de_AutomatedEvaluationCustomMetrics"),
    bk4 = u((A, B) => {
      if (A.customMetricDefinition != null) return {
        customMetricDefinition: hk4(A.customMetricDefinition, B)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_AutomatedEvaluationCustomMetricSource"),
    gk4 = u((A, B) => {
      return j.take(A, {
        contentType: j.expectString,
        data: B.base64Decoder,
        identifier: j.expectString
      })
    }, "de_ByteContentDoc"),
    hk4 = u((A, B) => {
      return j.take(A, {
        instructions: j.expectString,
        name: j.expectString,
        ratingScale: u((Q) => Ox4(Q, B), "ratingScale")
      })
    }, "de_CustomMetricDefinition"),
    mk4 = u((A, B) => {
      return j.take(A, {
        baseModelArn: j.expectString,
        baseModelName: j.expectString,
        creationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
        customizationType: j.expectString,
        modelArn: j.expectString,
        modelName: j.expectString,
        ownerAccountId: j.expectString
      })
    }, "de_CustomModelSummary"),
    dk4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return mk4(I, B)
      })
    }, "de_CustomModelSummaryList"),
    uk4 = u((A, B) => {
      if (A.automated != null) return {
        automated: xk4(A.automated, B)
      };
      if (A.human != null) return {
        human: j._json(A.human)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_EvaluationConfig"),
    pk4 = u((A, B) => {
      if (A.models != null) return {
        models: j._json(A.models)
      };
      if (A.ragConfigs != null) return {
        ragConfigs: Rx4(A.ragConfigs, B)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_EvaluationInferenceConfig"),
    ck4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return lk4(I, B)
      })
    }, "de_EvaluationSummaries"),
    lk4 = u((A, B) => {
      return j.take(A, {
        applicationType: j.expectString,
        creationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
        customMetricsEvaluatorModelIdentifiers: j._json,
        evaluationTaskTypes: j._json,
        evaluatorModelIdentifiers: j._json,
        inferenceConfigSummary: j._json,
        jobArn: j.expectString,
        jobName: j.expectString,
        jobType: j.expectString,
        modelIdentifiers: j._json,
        ragIdentifiers: j._json,
        status: j.expectString
      })
    }, "de_EvaluationSummary"),
    ik4 = u((A, B) => {
      return j.take(A, {
        byteContent: u((Q) => gk4(Q, B), "byteContent"),
        s3Location: j._json,
        sourceType: j.expectString
      })
    }, "de_ExternalSource"),
    nk4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return ik4(I, B)
      })
    }, "de_ExternalSources"),
    ak4 = u((A, B) => {
      return j.take(A, {
        additionalModelRequestFields: u((Q) => aI0(Q, B), "additionalModelRequestFields"),
        guardrailConfiguration: j._json,
        kbInferenceConfig: u((Q) => sI0(Q, B), "kbInferenceConfig"),
        promptTemplate: j._json
      })
    }, "de_ExternalSourcesGenerationConfiguration"),
    sk4 = u((A, B) => {
      return j.take(A, {
        generationConfiguration: u((Q) => ak4(Q, B), "generationConfiguration"),
        modelArn: j.expectString,
        sources: u((Q) => nk4(Q, B), "sources")
      })
    }, "de_ExternalSourcesRetrieveAndGenerateConfiguration"),
    _C = u((A, B) => {
      return j.take(A, {
        key: j.expectString,
        value: u((Q) => rk4(Q, B), "value")
      })
    }, "de_FilterAttribute"),
    rk4 = u((A, B) => {
      return A
    }, "de_FilterValue"),
    ok4 = u((A, B) => {
      return j.take(A, {
        additionalModelRequestFields: u((Q) => aI0(Q, B), "additionalModelRequestFields"),
        guardrailConfiguration: j._json,
        kbInferenceConfig: u((Q) => sI0(Q, B), "kbInferenceConfig"),
        promptTemplate: j._json
      })
    }, "de_GenerationConfiguration"),
    tk4 = u((A, B) => {
      return j.take(A, {
        action: j.expectString,
        enabled: j.expectBoolean,
        threshold: j.limitedParseDouble,
        type: j.expectString
      })
    }, "de_GuardrailContextualGroundingFilter"),
    ek4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return tk4(I, B)
      })
    }, "de_GuardrailContextualGroundingFilters"),
    Ax4 = u((A, B) => {
      return j.take(A, {
        filters: u((Q) => ek4(Q, B), "filters")
      })
    }, "de_GuardrailContextualGroundingPolicy"),
    Bx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Qx4(I, B)
      })
    }, "de_GuardrailSummaries"),
    Qx4 = u((A, B) => {
      return j.take(A, {
        arn: j.expectString,
        createdAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
        description: j.expectString,
        id: j.expectString,
        name: j.expectString,
        status: j.expectString,
        updatedAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "updatedAt"),
        version: j.expectString
      })
    }, "de_GuardrailSummary"),
    Ix4 = u((A, B) => {
      return j.take(A, {
        creationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
        instructSupported: j.expectBoolean,
        modelArchitecture: j.expectString,
        modelArn: j.expectString,
        modelName: j.expectString
      })
    }, "de_ImportedModelSummary"),
    Gx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Ix4(I, B)
      })
    }, "de_ImportedModelSummaryList"),
    Zx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Dx4(I, B)
      })
    }, "de_InferenceProfileSummaries"),
    Dx4 = u((A, B) => {
      return j.take(A, {
        createdAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
        description: j.expectString,
        inferenceProfileArn: j.expectString,
        inferenceProfileId: j.expectString,
        inferenceProfileName: j.expectString,
        models: j._json,
        status: j.expectString,
        type: j.expectString,
        updatedAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
      })
    }, "de_InferenceProfileSummary"),
    sI0 = u((A, B) => {
      return j.take(A, {
        textInferenceConfig: u((Q) => jx4(Q, B), "textInferenceConfig")
      })
    }, "de_KbInferenceConfig"),
    Yx4 = u((A, B) => {
      if (A.retrieveAndGenerateConfig != null) return {
        retrieveAndGenerateConfig: Sx4(A.retrieveAndGenerateConfig, B)
      };
      if (A.retrieveConfig != null) return {
        retrieveConfig: _x4(A.retrieveConfig, B)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_KnowledgeBaseConfig"),
    rI0 = u((A, B) => {
      return j.take(A, {
        vectorSearchConfiguration: u((Q) => Jx4(Q, B), "vectorSearchConfiguration")
      })
    }, "de_KnowledgeBaseRetrievalConfiguration"),
    Wx4 = u((A, B) => {
      return j.take(A, {
        generationConfiguration: u((Q) => ok4(Q, B), "generationConfiguration"),
        knowledgeBaseId: j.expectString,
        modelArn: j.expectString,
        orchestrationConfiguration: j._json,
        retrievalConfiguration: u((Q) => rI0(Q, B), "retrievalConfiguration")
      })
    }, "de_KnowledgeBaseRetrieveAndGenerateConfiguration"),
    Jx4 = u((A, B) => {
      return j.take(A, {
        filter: u((Q) => oI0(u2.awsExpectUnion(Q), B), "filter"),
        numberOfResults: j.expectInt32,
        overrideSearchType: j.expectString
      })
    }, "de_KnowledgeBaseVectorSearchConfiguration"),
    HG1 = u((A, B) => {
      return j.take(A, {
        createdAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
        endpointArn: j.expectString,
        endpointConfig: u((Q) => j._json(u2.awsExpectUnion(Q)), "endpointConfig"),
        endpointStatus: j.expectString,
        endpointStatusMessage: j.expectString,
        modelSourceIdentifier: j.expectString,
        status: j.expectString,
        statusMessage: j.expectString,
        updatedAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
      })
    }, "de_MarketplaceModelEndpoint"),
    Fx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Xx4(I, B)
      })
    }, "de_MarketplaceModelEndpointSummaries"),
    Xx4 = u((A, B) => {
      return j.take(A, {
        createdAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
        endpointArn: j.expectString,
        modelSourceIdentifier: j.expectString,
        status: j.expectString,
        statusMessage: j.expectString,
        updatedAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
      })
    }, "de_MarketplaceModelEndpointSummary"),
    Vx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Cx4(I, B)
      })
    }, "de_ModelCopyJobSummaries"),
    Cx4 = u((A, B) => {
      return j.take(A, {
        creationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
        failureMessage: j.expectString,
        jobArn: j.expectString,
        sourceAccountId: j.expectString,
        sourceModelArn: j.expectString,
        sourceModelName: j.expectString,
        status: j.expectString,
        targetModelArn: j.expectString,
        targetModelKmsKeyArn: j.expectString,
        targetModelName: j.expectString,
        targetModelTags: j._json
      })
    }, "de_ModelCopyJobSummary"),
    Kx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Hx4(I, B)
      })
    }, "de_ModelCustomizationJobSummaries"),
    Hx4 = u((A, B) => {
      return j.take(A, {
        baseModelArn: j.expectString,
        creationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
        customModelArn: j.expectString,
        customModelName: j.expectString,
        customizationType: j.expectString,
        endTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
        jobArn: j.expectString,
        jobName: j.expectString,
        lastModifiedTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
        status: j.expectString
      })
    }, "de_ModelCustomizationJobSummary"),
    zx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return wx4(I, B)
      })
    }, "de_ModelImportJobSummaries"),
    wx4 = u((A, B) => {
      return j.take(A, {
        creationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
        endTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
        importedModelArn: j.expectString,
        importedModelName: j.expectString,
        jobArn: j.expectString,
        jobName: j.expectString,
        lastModifiedTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
        status: j.expectString
      })
    }, "de_ModelImportJobSummary"),
    Ex4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Ux4(I, B)
      })
    }, "de_ModelInvocationJobSummaries"),
    Ux4 = u((A, B) => {
      return j.take(A, {
        clientRequestToken: j.expectString,
        endTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
        inputDataConfig: u((Q) => j._json(u2.awsExpectUnion(Q)), "inputDataConfig"),
        jobArn: j.expectString,
        jobExpirationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "jobExpirationTime"),
        jobName: j.expectString,
        lastModifiedTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
        message: j.expectString,
        modelId: j.expectString,
        outputDataConfig: u((Q) => j._json(u2.awsExpectUnion(Q)), "outputDataConfig"),
        roleArn: j.expectString,
        status: j.expectString,
        submitTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "submitTime"),
        timeoutDurationInHours: j.expectInt32,
        vpcConfig: j._json
      })
    }, "de_ModelInvocationJobSummary"),
    Nx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return $x4(I, B)
      })
    }, "de_PromptRouterSummaries"),
    $x4 = u((A, B) => {
      return j.take(A, {
        createdAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
        description: j.expectString,
        fallbackModel: j._json,
        models: j._json,
        promptRouterArn: j.expectString,
        promptRouterName: j.expectString,
        routingCriteria: u((Q) => tI0(Q, B), "routingCriteria"),
        status: j.expectString,
        type: j.expectString,
        updatedAt: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
      })
    }, "de_PromptRouterSummary"),
    qx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Mx4(I, B)
      })
    }, "de_ProvisionedModelSummaries"),
    Mx4 = u((A, B) => {
      return j.take(A, {
        commitmentDuration: j.expectString,
        commitmentExpirationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "commitmentExpirationTime"),
        creationTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
        desiredModelArn: j.expectString,
        desiredModelUnits: j.expectInt32,
        foundationModelArn: j.expectString,
        lastModifiedTime: u((Q) => j.expectNonNull(j.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
        modelArn: j.expectString,
        modelUnits: j.expectInt32,
        provisionedModelArn: j.expectString,
        provisionedModelName: j.expectString,
        status: j.expectString
      })
    }, "de_ProvisionedModelSummary"),
    Lx4 = u((A, B) => {
      if (A.knowledgeBaseConfig != null) return {
        knowledgeBaseConfig: Yx4(u2.awsExpectUnion(A.knowledgeBaseConfig), B)
      };
      if (A.precomputedRagSourceConfig != null) return {
        precomputedRagSourceConfig: j._json(u2.awsExpectUnion(A.precomputedRagSourceConfig))
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_RAGConfig"),
    Rx4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Lx4(u2.awsExpectUnion(I), B)
      })
    }, "de_RagConfigs"),
    Ox4 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Tx4(I, B)
      })
    }, "de_RatingScale"),
    Tx4 = u((A, B) => {
      return j.take(A, {
        definition: j.expectString,
        value: u((Q) => Px4(u2.awsExpectUnion(Q), B), "value")
      })
    }, "de_RatingScaleItem"),
    Px4 = u((A, B) => {
      if (j.limitedParseFloat32(A.floatValue) !== void 0) return {
        floatValue: j.limitedParseFloat32(A.floatValue)
      };
      if (j.expectString(A.stringValue) !== void 0) return {
        stringValue: j.expectString(A.stringValue)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_RatingScaleItemValue"),
    oI0 = u((A, B) => {
      if (A.andAll != null) return {
        andAll: W70(A.andAll, B)
      };
      if (A.equals != null) return {
        equals: _C(A.equals, B)
      };
      if (A.greaterThan != null) return {
        greaterThan: _C(A.greaterThan, B)
      };
      if (A.greaterThanOrEquals != null) return {
        greaterThanOrEquals: _C(A.greaterThanOrEquals, B)
      };
      if (A.in != null) return {
        in: _C(A.in, B)
      };
      if (A.lessThan != null) return {
        lessThan: _C(A.lessThan, B)
      };
      if (A.lessThanOrEquals != null) return {
        lessThanOrEquals: _C(A.lessThanOrEquals, B)
      };
      if (A.listContains != null) return {
        listContains: _C(A.listContains, B)
      };
      if (A.notEquals != null) return {
        notEquals: _C(A.notEquals, B)
      };
      if (A.notIn != null) return {
        notIn: _C(A.notIn, B)
      };
      if (A.orAll != null) return {
        orAll: W70(A.orAll, B)
      };
      if (A.startsWith != null) return {
        startsWith: _C(A.startsWith, B)
      };
      if (A.stringContains != null) return {
        stringContains: _C(A.stringContains, B)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_RetrievalFilter"),
    W70 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return oI0(u2.awsExpectUnion(I), B)
      })
    }, "de_RetrievalFilterList"),
    Sx4 = u((A, B) => {
      return j.take(A, {
        externalSourcesConfiguration: u((Q) => sk4(Q, B), "externalSourcesConfiguration"),
        knowledgeBaseConfiguration: u((Q) => Wx4(Q, B), "knowledgeBaseConfiguration"),
        type: j.expectString
      })
    }, "de_RetrieveAndGenerateConfiguration"),
    _x4 = u((A, B) => {
      return j.take(A, {
        knowledgeBaseId: j.expectString,
        knowledgeBaseRetrievalConfiguration: u((Q) => rI0(Q, B), "knowledgeBaseRetrievalConfiguration")
      })
    }, "de_RetrieveConfig"),
    tI0 = u((A, B) => {
      return j.take(A, {
        responseQualityDifference: j.limitedParseDouble
      })
    }, "de_RoutingCriteria"),
    jx4 = u((A, B) => {
      return j.take(A, {
        maxTokens: j.expectInt32,
        stopSequences: j._json,
        temperature: j.limitedParseFloat32,
        topP: j.limitedParseFloat32
      })
    }, "de_TextInferenceConfig"),
    eI0 = u((A, B) => {
      return j.take(A, {
        trainingLoss: j.limitedParseFloat32
      })
    }, "de_TrainingMetrics"),
    AG0 = u((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return yx4(I, B)
      })
    }, "de_ValidationMetrics"),
    yx4 = u((A, B) => {
      return j.take(A, {
        validationLoss: j.limitedParseFloat32
      })
    }, "de_ValidatorMetric"),
    P2 = u((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    J70 = "applicationTypeEquals",
    F70 = "byCustomizationType",
    X70 = "byInferenceType",
    V70 = "baseModelArnEquals",
    C70 = "byOutputModality",
    K70 = "byProvider",
    vY = "creationTimeAfter",
    bY = "creationTimeBefore",
    H70 = "foundationModelArnEquals",
    z70 = "guardrailIdentifier",
    VG1 = "guardrailVersion",
    w70 = "isOwned",
    E70 = "modelArnEquals",
    tB = "maxResults",
    kx4 = "modelSourceEquals",
    xx4 = "modelSourceIdentifier",
    gY = "nameContains",
    eB = "nextToken",
    fx4 = "outputModelNameContains",
    U70 = "sourceAccountEquals",
    RZ = "sortBy",
    HX = "statusEquals",
    N70 = "sourceModelArnEquals",
    OZ = "sortOrder",
    $70 = "submitTimeAfter",
    q70 = "submitTimeBefore",
    Kf1 = "type",
    vx4 = "typeEquals",
    bx4 = "targetModelNameContains",
    BG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "BatchDeleteEvaluationJob", {}).n("BedrockClient", "BatchDeleteEvaluationJobCommand").f(k70, v70).ser(g_4).de(pj4).build() {
      static {
        u(this, "BatchDeleteEvaluationJobCommand")
      }
    },
    QG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateEvaluationJob", {}).n("BedrockClient", "CreateEvaluationJobCommand").f(dI0, void 0).ser(h_4).de(cj4).build() {
      static {
        u(this, "CreateEvaluationJobCommand")
      }
    },
    IG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateGuardrail", {}).n("BedrockClient", "CreateGuardrailCommand").f(GI0, void 0).ser(m_4).de(lj4).build() {
      static {
        u(this, "CreateGuardrailCommand")
      }
    },
    GG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateGuardrailVersion", {}).n("BedrockClient", "CreateGuardrailVersionCommand").f(ZI0, void 0).ser(d_4).de(ij4).build() {
      static {
        u(this, "CreateGuardrailVersionCommand")
      }
    },
    ZG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateInferenceProfile", {}).n("BedrockClient", "CreateInferenceProfileCommand").f(UI0, void 0).ser(u_4).de(nj4).build() {
      static {
        u(this, "CreateInferenceProfileCommand")
      }
    },
    DG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateMarketplaceModelEndpoint", {}).n("BedrockClient", "CreateMarketplaceModelEndpointCommand").f(void 0, void 0).ser(p_4).de(aj4).build() {
      static {
        u(this, "CreateMarketplaceModelEndpointCommand")
      }
    },
    YG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateModelCopyJob", {}).n("BedrockClient", "CreateModelCopyJobCommand").f(void 0, void 0).ser(c_4).de(sj4).build() {
      static {
        u(this, "CreateModelCopyJobCommand")
      }
    },
    WG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateModelCustomizationJob", {}).n("BedrockClient", "CreateModelCustomizationJobCommand").f(kI0, void 0).ser(l_4).de(rj4).build() {
      static {
        u(this, "CreateModelCustomizationJobCommand")
      }
    },
    JG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateModelImportJob", {}).n("BedrockClient", "CreateModelImportJobCommand").f(void 0, void 0).ser(i_4).de(oj4).build() {
      static {
        u(this, "CreateModelImportJobCommand")
      }
    },
    FG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateModelInvocationJob", {}).n("BedrockClient", "CreateModelInvocationJobCommand").f(void 0, void 0).ser(n_4).de(tj4).build() {
      static {
        u(this, "CreateModelInvocationJobCommand")
      }
    },
    XG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreatePromptRouter", {}).n("BedrockClient", "CreatePromptRouterCommand").f(SI0, void 0).ser(a_4).de(ej4).build() {
      static {
        u(this, "CreatePromptRouterCommand")
      }
    },
    VG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "CreateProvisionedModelThroughput", {}).n("BedrockClient", "CreateProvisionedModelThroughputCommand").f(void 0, void 0).ser(s_4).de(Ay4).build() {
      static {
        u(this, "CreateProvisionedModelThroughputCommand")
      }
    },
    CG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeleteCustomModel", {}).n("BedrockClient", "DeleteCustomModelCommand").f(void 0, void 0).ser(r_4).de(By4).build() {
      static {
        u(this, "DeleteCustomModelCommand")
      }
    },
    KG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeleteGuardrail", {}).n("BedrockClient", "DeleteGuardrailCommand").f(void 0, void 0).ser(o_4).de(Qy4).build() {
      static {
        u(this, "DeleteGuardrailCommand")
      }
    },
    HG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeleteImportedModel", {}).n("BedrockClient", "DeleteImportedModelCommand").f(void 0, void 0).ser(t_4).de(Iy4).build() {
      static {
        u(this, "DeleteImportedModelCommand")
      }
    },
    zG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeleteInferenceProfile", {}).n("BedrockClient", "DeleteInferenceProfileCommand").f(void 0, void 0).ser(e_4).de(Gy4).build() {
      static {
        u(this, "DeleteInferenceProfileCommand")
      }
    },
    wG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeleteMarketplaceModelEndpoint", {}).n("BedrockClient", "DeleteMarketplaceModelEndpointCommand").f(void 0, void 0).ser(Aj4).de(Zy4).build() {
      static {
        u(this, "DeleteMarketplaceModelEndpointCommand")
      }
    },
    EG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeleteModelInvocationLoggingConfiguration", {}).n("BedrockClient", "DeleteModelInvocationLoggingConfigurationCommand").f(void 0, void 0).ser(Bj4).de(Dy4).build() {
      static {
        u(this, "DeleteModelInvocationLoggingConfigurationCommand")
      }
    },
    UG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeletePromptRouter", {}).n("BedrockClient", "DeletePromptRouterCommand").f(void 0, void 0).ser(Qj4).de(Yy4).build() {
      static {
        u(this, "DeletePromptRouterCommand")
      }
    },
    NG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeleteProvisionedModelThroughput", {}).n("BedrockClient", "DeleteProvisionedModelThroughputCommand").f(void 0, void 0).ser(Ij4).de(Wy4).build() {
      static {
        u(this, "DeleteProvisionedModelThroughputCommand")
      }
    },
    $G0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "DeregisterMarketplaceModelEndpoint", {}).n("BedrockClient", "DeregisterMarketplaceModelEndpointCommand").f(void 0, void 0).ser(Gj4).de(Jy4).build() {
      static {
        u(this, "DeregisterMarketplaceModelEndpointCommand")
      }
    },
    qG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetCustomModel", {}).n("BedrockClient", "GetCustomModelCommand").f(void 0, PI0).ser(Zj4).de(Fy4).build() {
      static {
        u(this, "GetCustomModelCommand")
      }
    },
    MG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetEvaluationJob", {}).n("BedrockClient", "GetEvaluationJobCommand").f(o70, uI0).ser(Dj4).de(Xy4).build() {
      static {
        u(this, "GetEvaluationJobCommand")
      }
    },
    LG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetFoundationModel", {}).n("BedrockClient", "GetFoundationModelCommand").f(void 0, void 0).ser(Yj4).de(Vy4).build() {
      static {
        u(this, "GetFoundationModelCommand")
      }
    },
    RG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetGuardrail", {}).n("BedrockClient", "GetGuardrailCommand").f(void 0, HI0).ser(Wj4).de(Cy4).build() {
      static {
        u(this, "GetGuardrailCommand")
      }
    },
    OG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetImportedModel", {}).n("BedrockClient", "GetImportedModelCommand").f(void 0, void 0).ser(Jj4).de(Ky4).build() {
      static {
        u(this, "GetImportedModelCommand")
      }
    },
    TG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetInferenceProfile", {}).n("BedrockClient", "GetInferenceProfileCommand").f(void 0, NI0).ser(Fj4).de(Hy4).build() {
      static {
        u(this, "GetInferenceProfileCommand")
      }
    },
    PG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetMarketplaceModelEndpoint", {}).n("BedrockClient", "GetMarketplaceModelEndpointCommand").f(void 0, void 0).ser(Xj4).de(zy4).build() {
      static {
        u(this, "GetMarketplaceModelEndpointCommand")
      }
    },
    SG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetModelCopyJob", {}).n("BedrockClient", "GetModelCopyJobCommand").f(void 0, void 0).ser(Vj4).de(wy4).build() {
      static {
        u(this, "GetModelCopyJobCommand")
      }
    },
    _G0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetModelCustomizationJob", {}).n("BedrockClient", "GetModelCustomizationJobCommand").f(void 0, xI0).ser(Cj4).de(Ey4).build() {
      static {
        u(this, "GetModelCustomizationJobCommand")
      }
    },
    jG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetModelImportJob", {}).n("BedrockClient", "GetModelImportJobCommand").f(void 0, void 0).ser(Kj4).de(Uy4).build() {
      static {
        u(this, "GetModelImportJobCommand")
      }
    },
    yG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetModelInvocationJob", {}).n("BedrockClient", "GetModelInvocationJobCommand").f(void 0, MI0).ser(Hj4).de(Ny4).build() {
      static {
        u(this, "GetModelInvocationJobCommand")
      }
    },
    kG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetModelInvocationLoggingConfiguration", {}).n("BedrockClient", "GetModelInvocationLoggingConfigurationCommand").f(void 0, void 0).ser(zj4).de($y4).build() {
      static {
        u(this, "GetModelInvocationLoggingConfigurationCommand")
      }
    },
    xG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetPromptRouter", {}).n("BedrockClient", "GetPromptRouterCommand").f(void 0, _I0).ser(wj4).de(qy4).build() {
      static {
        u(this, "GetPromptRouterCommand")
      }
    },
    fG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "GetProvisionedModelThroughput", {}).n("BedrockClient", "GetProvisionedModelThroughputCommand").f(void 0, void 0).ser(Ej4).de(My4).build() {
      static {
        u(this, "GetProvisionedModelThroughputCommand")
      }
    },
    Lf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListCustomModels", {}).n("BedrockClient", "ListCustomModelsCommand").f(void 0, void 0).ser(Uj4).de(Ly4).build() {
      static {
        u(this, "ListCustomModelsCommand")
      }
    },
    Rf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListEvaluationJobs", {}).n("BedrockClient", "ListEvaluationJobsCommand").f(void 0, void 0).ser(Nj4).de(Ry4).build() {
      static {
        u(this, "ListEvaluationJobsCommand")
      }
    },
    vG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListFoundationModels", {}).n("BedrockClient", "ListFoundationModelsCommand").f(void 0, void 0).ser($j4).de(Oy4).build() {
      static {
        u(this, "ListFoundationModelsCommand")
      }
    },
    Of1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListGuardrails", {}).n("BedrockClient", "ListGuardrailsCommand").f(void 0, wI0).ser(qj4).de(Ty4).build() {
      static {
        u(this, "ListGuardrailsCommand")
      }
    },
    Tf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListImportedModels", {}).n("BedrockClient", "ListImportedModelsCommand").f(void 0, void 0).ser(Mj4).de(Py4).build() {
      static {
        u(this, "ListImportedModelsCommand")
      }
    },
    Pf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListInferenceProfiles", {}).n("BedrockClient", "ListInferenceProfilesCommand").f(void 0, qI0).ser(Lj4).de(Sy4).build() {
      static {
        u(this, "ListInferenceProfilesCommand")
      }
    },
    Sf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListMarketplaceModelEndpoints", {}).n("BedrockClient", "ListMarketplaceModelEndpointsCommand").f(void 0, void 0).ser(Rj4).de(_y4).build() {
      static {
        u(this, "ListMarketplaceModelEndpointsCommand")
      }
    },
    _f1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListModelCopyJobs", {}).n("BedrockClient", "ListModelCopyJobsCommand").f(void 0, void 0).ser(Oj4).de(jy4).build() {
      static {
        u(this, "ListModelCopyJobsCommand")
      }
    },
    jf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListModelCustomizationJobs", {}).n("BedrockClient", "ListModelCustomizationJobsCommand").f(void 0, void 0).ser(Tj4).de(yy4).build() {
      static {
        u(this, "ListModelCustomizationJobsCommand")
      }
    },
    yf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListModelImportJobs", {}).n("BedrockClient", "ListModelImportJobsCommand").f(void 0, void 0).ser(Pj4).de(ky4).build() {
      static {
        u(this, "ListModelImportJobsCommand")
      }
    },
    kf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListModelInvocationJobs", {}).n("BedrockClient", "ListModelInvocationJobsCommand").f(void 0, RI0).ser(Sj4).de(xy4).build() {
      static {
        u(this, "ListModelInvocationJobsCommand")
      }
    },
    xf1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListPromptRouters", {}).n("BedrockClient", "ListPromptRoutersCommand").f(void 0, yI0).ser(_j4).de(fy4).build() {
      static {
        u(this, "ListPromptRoutersCommand")
      }
    },
    ff1 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListProvisionedModelThroughputs", {}).n("BedrockClient", "ListProvisionedModelThroughputsCommand").f(void 0, void 0).ser(jj4).de(vy4).build() {
      static {
        u(this, "ListProvisionedModelThroughputsCommand")
      }
    },
    bG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "ListTagsForResource", {}).n("BedrockClient", "ListTagsForResourceCommand").f(void 0, void 0).ser(yj4).de(by4).build() {
      static {
        u(this, "ListTagsForResourceCommand")
      }
    },
    gG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "PutModelInvocationLoggingConfiguration", {}).n("BedrockClient", "PutModelInvocationLoggingConfigurationCommand").f(void 0, void 0).ser(kj4).de(gy4).build() {
      static {
        u(this, "PutModelInvocationLoggingConfigurationCommand")
      }
    },
    hG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "RegisterMarketplaceModelEndpoint", {}).n("BedrockClient", "RegisterMarketplaceModelEndpointCommand").f(void 0, void 0).ser(xj4).de(hy4).build() {
      static {
        u(this, "RegisterMarketplaceModelEndpointCommand")
      }
    },
    mG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "StopEvaluationJob", {}).n("BedrockClient", "StopEvaluationJobCommand").f(t70, void 0).ser(fj4).de(my4).build() {
      static {
        u(this, "StopEvaluationJobCommand")
      }
    },
    dG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "StopModelCustomizationJob", {}).n("BedrockClient", "StopModelCustomizationJobCommand").f(void 0, void 0).ser(vj4).de(dy4).build() {
      static {
        u(this, "StopModelCustomizationJobCommand")
      }
    },
    uG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "StopModelInvocationJob", {}).n("BedrockClient", "StopModelInvocationJobCommand").f(void 0, void 0).ser(bj4).de(uy4).build() {
      static {
        u(this, "StopModelInvocationJobCommand")
      }
    },
    pG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "TagResource", {}).n("BedrockClient", "TagResourceCommand").f(void 0, void 0).ser(gj4).de(py4).build() {
      static {
        u(this, "TagResourceCommand")
      }
    },
    cG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "UntagResource", {}).n("BedrockClient", "UntagResourceCommand").f(void 0, void 0).ser(hj4).de(cy4).build() {
      static {
        u(this, "UntagResourceCommand")
      }
    },
    lG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "UpdateGuardrail", {}).n("BedrockClient", "UpdateGuardrailCommand").f(EI0, void 0).ser(mj4).de(ly4).build() {
      static {
        u(this, "UpdateGuardrailCommand")
      }
    },
    iG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "UpdateMarketplaceModelEndpoint", {}).n("BedrockClient", "UpdateMarketplaceModelEndpointCommand").f(void 0, void 0).ser(dj4).de(iy4).build() {
      static {
        u(this, "UpdateMarketplaceModelEndpointCommand")
      }
    },
    nG0 = class extends j.Command.classBuilder().ep(Y9).m(function(A, B, Q, I) {
      return [W9.getSerdePlugin(Q, this.serialize, this.deserialize), I9.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockControlPlaneService", "UpdateProvisionedModelThroughput", {}).n("BedrockClient", "UpdateProvisionedModelThroughputCommand").f(void 0, void 0).ser(uj4).de(ny4).build() {
      static {
        u(this, "UpdateProvisionedModelThroughputCommand")
      }
    },
    gx4 = {
      BatchDeleteEvaluationJobCommand: BG0,
      CreateEvaluationJobCommand: QG0,
      CreateGuardrailCommand: IG0,
      CreateGuardrailVersionCommand: GG0,
      CreateInferenceProfileCommand: ZG0,
      CreateMarketplaceModelEndpointCommand: DG0,
      CreateModelCopyJobCommand: YG0,
      CreateModelCustomizationJobCommand: WG0,
      CreateModelImportJobCommand: JG0,
      CreateModelInvocationJobCommand: FG0,
      CreatePromptRouterCommand: XG0,
      CreateProvisionedModelThroughputCommand: VG0,
      DeleteCustomModelCommand: CG0,
      DeleteGuardrailCommand: KG0,
      DeleteImportedModelCommand: HG0,
      DeleteInferenceProfileCommand: zG0,
      DeleteMarketplaceModelEndpointCommand: wG0,
      DeleteModelInvocationLoggingConfigurationCommand: EG0,
      DeletePromptRouterCommand: UG0,
      DeleteProvisionedModelThroughputCommand: NG0,
      DeregisterMarketplaceModelEndpointCommand: $G0,
      GetCustomModelCommand: qG0,
      GetEvaluationJobCommand: MG0,
      GetFoundationModelCommand: LG0,
      GetGuardrailCommand: RG0,
      GetImportedModelCommand: OG0,
      GetInferenceProfileCommand: TG0,
      GetMarketplaceModelEndpointCommand: PG0,
      GetModelCopyJobCommand: SG0,
      GetModelCustomizationJobCommand: _G0,
      GetModelImportJobCommand: jG0,
      GetModelInvocationJobCommand: yG0,
      GetModelInvocationLoggingConfigurationCommand: kG0,
      GetPromptRouterCommand: xG0,
      GetProvisionedModelThroughputCommand: fG0,
      ListCustomModelsCommand: Lf1,
      ListEvaluationJobsCommand: Rf1,
      ListFoundationModelsCommand: vG0,
      ListGuardrailsCommand: Of1,
      ListImportedModelsCommand: Tf1,
      ListInferenceProfilesCommand: Pf1,
      ListMarketplaceModelEndpointsCommand: Sf1,
      ListModelCopyJobsCommand: _f1,
      ListModelCustomizationJobsCommand: jf1,
      ListModelImportJobsCommand: yf1,
      ListModelInvocationJobsCommand: kf1,
      ListPromptRoutersCommand: xf1,
      ListProvisionedModelThroughputsCommand: ff1,
      ListTagsForResourceCommand: bG0,
      PutModelInvocationLoggingConfigurationCommand: gG0,
      RegisterMarketplaceModelEndpointCommand: hG0,
      StopEvaluationJobCommand: mG0,
      StopModelCustomizationJobCommand: dG0,
      StopModelInvocationJobCommand: uG0,
      TagResourceCommand: pG0,
      UntagResourceCommand: cG0,
      UpdateGuardrailCommand: lG0,
      UpdateMarketplaceModelEndpointCommand: iG0,
      UpdateProvisionedModelThroughputCommand: nG0
    },
    aG0 = class extends hY {
      static {
        u(this, "Bedrock")
      }
    };
  j.createAggregatedClient(gx4, aG0);
  var hx4 = C2.createPaginator(hY, Lf1, "nextToken", "nextToken", "maxResults"),
    mx4 = C2.createPaginator(hY, Rf1, "nextToken", "nextToken", "maxResults"),
    dx4 = C2.createPaginator(hY, Of1, "nextToken", "nextToken", "maxResults"),
    ux4 = C2.createPaginator(hY, Tf1, "nextToken", "nextToken", "maxResults"),
    px4 = C2.createPaginator(hY, Pf1, "nextToken", "nextToken", "maxResults"),
    cx4 = C2.createPaginator(hY, Sf1, "nextToken", "nextToken", "maxResults"),
    lx4 = C2.createPaginator(hY, _f1, "nextToken", "nextToken", "maxResults"),
    ix4 = C2.createPaginator(hY, jf1, "nextToken", "nextToken", "maxResults"),
    nx4 = C2.createPaginator(hY, yf1, "nextToken", "nextToken", "maxResults"),
    ax4 = C2.createPaginator(hY, kf1, "nextToken", "nextToken", "maxResults"),
    sx4 = C2.createPaginator(hY, xf1, "nextToken", "nextToken", "maxResults"),
    rx4 = C2.createPaginator(hY, ff1, "nextToken", "nextToken", "maxResults")
})