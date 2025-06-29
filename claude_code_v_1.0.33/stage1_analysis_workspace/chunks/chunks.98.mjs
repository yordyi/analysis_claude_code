
// @from(Start 9813399, End 9814212)
function xE5({
  mode: A
}) {
  switch (A) {
    case "tool-input":
      return F9.createElement(fE5, null);
    case "tool-use":
      return F9.createElement(h, {
        flexWrap: "wrap",
        flexGrow: 0,
        height: 1,
        width: 2
      }, F9.createElement(P, {
        color: "secondaryText"
      }, "⚒"));
    case "responding":
      return F9.createElement(h, {
        width: 2
      }, F9.createElement(P, {
        color: "secondaryText"
      }, A0.arrowDown));
    case "thinking":
      return F9.createElement(h, {
        width: 2
      }, F9.createElement(P, {
        color: "secondaryText"
      }, A0.arrowDown));
    case "requesting":
      return F9.createElement(h, {
        width: 2
      }, F9.createElement(P, {
        color: "secondaryText"
      }, A0.arrowUp))
  }
}
// @from(Start 9814214, End 9814476)
function fE5() {
  let [A, B] = DF.useState(!0);
  return CV(() => {
    B((Q) => !Q)
  }, 500), F9.createElement(h, {
    flexWrap: "wrap",
    flexGrow: 0,
    height: 1,
    width: 2
  }, F9.createElement(P, {
    color: "secondaryText"
  }, A ? "⚒" : " "))
}
// @from(Start 9814478, End 9814786)
function oD() {
  let [A, B] = DF.useState(0), {
    isConnected: Q
  } = _0A();
  return CV(() => {
    B((G) => (G + 1) % Rw1.length)
  }, 120), F9.createElement(h, {
    flexWrap: "wrap",
    height: 1,
    width: 2
  }, F9.createElement(P, {
    color: Q === !1 ? "secondaryText" : "text"
  }, Rw1[A]))
}
// @from(Start 9814791, End 9816258)
vE5 = new Set(["Analyzing", "Blocking", "Buffering", "Capturing", "Connecting", "Crashing", "Debugging", "Diagnosing", "Disconnecting", "Erroring", "Failing", "Fixing", "Freezing", "Hanging", "Investigating", "Lagging", "Loading", "Logging", "Monitoring", "Patching", "Rebooting", "Recording", "Recovering", "Repairing", "Resetting", "Restarting", "Restoring", "Retrying", "Stalling", "Tracking", "Troubleshooting", "Waiting", "Aborting", "Canceling", "Deleting", "Destroying", "Erasing", "Exiting", "Killing", "Obliterating", "Purging", "Removing", "Stopping", "Terminating", "Wiping", "Breaching", "Infiltrating", "Invading", "Penetrating", "Violating", "Authenticating", "Authorizing", "Backing", "Bootstrapping", "Branching", "Building", "Bundling", "Caching", "Clearing", "Cloning", "Clustering", "Committing", "Compiling", "Configuring", "Containerizing", "Demoting", "Deploying", "Dockerizing", "Downgrading", "Draining", "Executing", "Fetching", "Flushing", "Formatting", "Indexing", "Initializing", "Installing", "Launching", "Linting", "Merging", "Migrating", "Minifying", "Optimizing", "Orchestrating", "Packaging", "Promoting", "Provisioning", "Publishing", "Pulling", "Pushing", "Rebuilding", "Redeploying", "Refactoring", "Releasing", "Reverting", "Rolling", "Running", "Scaffolding", "Scaling", "Shipping", "Staging", "Starting", "Synchronizing", "Syncing", "Testing", "Transpiling", "Uninstalling", "Updating", "Upgrading", "Validating", "Verifying"])
// @from(Start 9816261, End 9817953)
function $S2(A) {
  let [B, Q] = DF.useState([]), I = sH1(async (G) => {
    if (tZ0()) return;
    try {
      let Z = await cZ({
        systemPrompt: ["Analyze this message and come up with a single positive, cheerful and delightful verb in gerund form that's related to the message. Only include the word with no other text or punctuation. The word should have the first letter capitalized. Add some whimsy and surprise to entertain the user. Ensure the word is highly relevant to the user's message. Synonyms are welcome, including obscure words. Be careful to avoid words that might look alarming or concerning to the software engineer seeing it as a status notification, such as Connecting, Disconnecting, Retrying, Lagging, Freezing, etc. NEVER use a destructive word, such as Terminating, Killing, Deleting, Destroying, Stopping, Exiting, or similar. NEVER use a word that may be derogatory, offensive, or inappropriate in a non-coding context, such as Penetrating."],
        userPrompt: G,
        enablePromptCaching: !0,
        isNonInteractiveSession: !1,
        temperature: 1,
        promptCategory: "spinner"
      });
      if (Z?.message?.content) {
        let Y = (Array.isArray(Z.message.content) ? Z.message.content.filter((W) => W.type === "text").map((W) => W.text).join("") : Z.message.content).trim().replace(/[^\w]/g, "");
        if (Y.length <= 20 && !Y.includes(" ") && !vE5.has(Y)) Q((W) => [Y, ...W.slice(0, 9)])
      }
    } catch (Z) {
      b1(Z instanceof Error ? Z : new Error(`Error generating haiku word: ${String(Z)}`))
    }
  }, 600);
  return DF.useEffect(() => {
    if (!A) Q([])
  }, [A]), {
    haikuWords: B,
    generateHaikuWord: I
  }
}
// @from(Start 9817958, End 9817974)
U4 = I1(U1(), 1)
// @from(Start 9817980, End 9817996)
tZ = I1(U1(), 1)
// @from(Start 9817999, End 9819772)
function Ow1({
  customApiKeyTruncated: A,
  onDone: B
}) {
  function Q(G) {
    let Z = ZA();
    switch (G) {
      case "yes": {
        j0({
          ...Z,
          customApiKeyResponses: {
            ...Z.customApiKeyResponses,
            approved: [...Z.customApiKeyResponses?.approved ?? [], A]
          }
        }), B();
        break
      }
      case "no": {
        j0({
          ...Z,
          customApiKeyResponses: {
            ...Z.customApiKeyResponses,
            rejected: [...Z.customApiKeyResponses?.rejected ?? [], A]
          }
        }), B();
        break
      }
    }
  }
  let I = Y2();
  return tZ.default.createElement(tZ.default.Fragment, null, tZ.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "warning"
  }, tZ.default.createElement(P, {
    bold: !0,
    color: "warning"
  }, "Detected a custom API key in your environment"), tZ.default.createElement(P, null, tZ.default.createElement(P, {
    bold: !0
  }, "ANTHROPIC_API_KEY"), tZ.default.createElement(P, null, ": sk-ant-...", A)), tZ.default.createElement(P, null, "Do you want to use this API key?"), tZ.default.createElement(p0, {
    defaultValue: "no",
    focusValue: "no",
    options: [{
      label: "Yes",
      value: "yes"
    }, {
      label: `No (${UA.bold("recommended")})`,
      value: "no"
    }],
    onChange: (G) => Q(G),
    onCancel: () => Q("no")
  })), tZ.default.createElement(h, {
    marginLeft: 3
  }, tZ.default.createElement(P, {
    dimColor: !0
  }, I.pending ? tZ.default.createElement(tZ.default.Fragment, null, "Press ", I.keyName, " again to exit") : tZ.default.createElement(tZ.default.Fragment, null, "Enter to confirm ", A0.dot, " Esc to cancel"))))
}
// @from(Start 9819777, End 9819793)
pI = I1(U1(), 1)
// @from(Start 9819799, End 9819816)
Tw1 = I1(U1(), 1)
// @from(Start 9819819, End 9820002)
function qS2(A) {
  let [B, Q] = Tw1.useState(!1);
  return Tw1.useEffect(() => {
    let I = setTimeout(() => {
      Q(!0)
    }, A);
    return () => clearTimeout(I)
  }, [A]), B
}
// @from(Start 9820003, End 9821179)
async function bE5() {
  try {
    let A = ["https://api.anthropic.com/api/hello", "https://console.anthropic.com/v1/oauth/hello"],
      B = async (G) => {
        try {
          let Z = await P4.get(G, {
            headers: {
              "User-Agent": MR()
            }
          });
          if (Z.status !== 200) return {
            success: !1,
            error: `Failed to connect to ${new URL(G).hostname}: Status ${Z.status}`
          };
          return {
            success: !0
          }
        } catch (Z) {
          return {
            success: !1,
            error: `Failed to connect to ${new URL(G).hostname}: ${Z instanceof Error?Z.code||Z.message:String(Z)}`
          }
        }
      }, I = (await Promise.all(A.map(B))).find((G) => !G.success);
    if (I) E1("tengu_preflight_check_failed", {
      isConnectivityError: !1,
      hasErrorMessage: !!I.error
    });
    return I || {
      success: !0
    }
  } catch (A) {
    return b1(A), E1("tengu_preflight_check_failed", {
      isConnectivityError: !0
    }), {
      success: !1,
      error: `Connectivity check error: ${A instanceof Error?A.code||A.message:String(A)}`
    }
  }
}
// @from(Start 9821181, End 9822533)
function MS2({
  onSuccess: A
}) {
  let [B, Q] = pI.useState(null), [I, G] = pI.useState(!0), Z = qS2(1000) && I;
  return pI.useEffect(() => {
    async function D() {
      let Y = await bE5();
      Q(Y), G(!1)
    }
    D()
  }, []), pI.useEffect(() => {
    if (B?.success) A();
    else if (B && !B.success) {
      let D = setTimeout(() => process.exit(1), 100);
      return () => clearTimeout(D)
    }
  }, [B, A]), pI.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1
  }, I && Z ? pI.default.createElement(h, {
    paddingLeft: 1
  }, pI.default.createElement(oD, null), pI.default.createElement(P, null, "Checking connectivity...")) : !B?.success && !I && pI.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, pI.default.createElement(P, {
    color: "error"
  }, "Unable to connect to Anthropic services"), pI.default.createElement(P, {
    color: "error"
  }, B?.error), pI.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, pI.default.createElement(P, null, "Please check your internet connection and network settings."), pI.default.createElement(P, null, "Note: ", m0, " might not be available in your country. Check supported countries at", " ", pI.default.createElement(P, {
    color: "suggestion"
  }, "https://anthropic.com/supported-countries")))))
}
// @from(Start 9822535, End 9826920)
function j0A({
  onDone: A
}) {
  let [B, Q] = U4.useState(0), I = mS(), [G, Z] = q9();
  U4.useEffect(() => {
    E1("tengu_began_setup", {
      oauthEnabled: I
    })
  }, [I]);

  function D() {
    if (B < C.length - 1) {
      let K = B + 1;
      Q(K), E1("tengu_onboarding_step", {
        oauthEnabled: I,
        stepId: C[K]?.id
      })
    } else A()
  }

  function Y(K) {
    Z(K), D()
  }
  let W = Y2();
  Z0(async (K, E) => {
    let N = C[B];
    if (E.return && N && ["security"].includes(N.id))
      if (B === C.length - 1) {
        A();
        return
      } else {
        if (N.id === "security") await D3();
        D()
      }
    else if (E.escape && N?.id === "terminal-setup") D()
  });
  let J = U4.default.createElement(Zw1, {
      initialTheme: G,
      onThemeSelect: Y,
      showIntroText: !0,
      helpText: "To change this later, run /theme",
      hideEscToCancel: !0,
      skipExitHandling: !0
    }),
    F = U4.default.createElement(h, {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1
    }, U4.default.createElement(P, {
      bold: !0
    }, "Security notes:"), U4.default.createElement(h, {
      flexDirection: "column",
      width: 70
    }, U4.default.createElement(rL, null, U4.default.createElement(rL.Item, null, U4.default.createElement(P, null, "Claude can make mistakes"), U4.default.createElement(P, {
      color: "secondaryText",
      wrap: "wrap"
    }, "You should always review Claude's responses, especially when", U4.default.createElement(UI, null), "running code.", U4.default.createElement(UI, null))), U4.default.createElement(rL.Item, null, U4.default.createElement(P, null, "Due to prompt injection risks, only use it with code you trust"), U4.default.createElement(P, {
      color: "secondaryText",
      wrap: "wrap"
    }, "For more details see:", U4.default.createElement(UI, null), U4.default.createElement(kQ, {
      url: "https://docs.anthropic.com/s/claude-code-security"
    }))))), U4.default.createElement(bw, null)),
    X = U4.default.createElement(MS2, {
      onSuccess: D
    }),
    V = U4.useMemo(() => {
      if (!process.env.ANTHROPIC_API_KEY) return "";
      let K = CJ(process.env.ANTHROPIC_API_KEY);
      if (jG1(K) === "new") return K
    }, []),
    C = [];
  if (I) C.push({
    id: "preflight",
    component: X
  });
  if (C.push({
      id: "theme",
      component: J
    }), I) C.push({
    id: "oauth",
    component: U4.default.createElement(Pw1, {
      onDone: D
    })
  });
  if (V) C.push({
    id: "api-key",
    component: U4.default.createElement(Ow1, {
      customApiKeyTruncated: V,
      onDone: D
    })
  });
  if (C.push({
      id: "security",
      component: F
    }), gA1()) C.push({
    id: "terminal-setup",
    component: U4.default.createElement(h, {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1
    }, U4.default.createElement(P, {
      bold: !0
    }, "Use ", m0, "'s terminal setup?"), U4.default.createElement(h, {
      flexDirection: "column",
      width: 70,
      gap: 1
    }, U4.default.createElement(P, null, "For the optimal coding experience, enable the recommended settings", U4.default.createElement(UI, null), "for your terminal:", " ", mA.terminal === "Apple_Terminal" ? "Option+Enter for newlines and visual bell" : "Shift+Enter for newlines"), U4.default.createElement(p0, {
      options: [{
        label: "Yes, use recommended settings",
        value: "install"
      }, {
        label: "No, maybe later with /terminal-setup",
        value: "no"
      }],
      onChange: (K) => {
        if (K === "install") oAA(G).then(() => {
          D()
        });
        else D()
      },
      onCancel: () => D()
    }), U4.default.createElement(P, {
      dimColor: !0
    }, W.pending ? U4.default.createElement(U4.default.Fragment, null, "Press ", W.keyName, " again to exit") : U4.default.createElement(U4.default.Fragment, null, "Enter to confirm · Esc to skip"))))
  });
  return U4.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, C[B]?.id !== "oauth" && U4.default.createElement(y0A, null), U4.default.createElement(h, {
    flexDirection: "column",
    padding: 0,
    gap: 0
  }, C[B]?.component, W.pending && U4.default.createElement(h, {
    padding: 1
  }, U4.default.createElement(P, {
    dimColor: !0
  }, "Press ", W.keyName, " again to exit"))))
}
// @from(Start 9826925, End 9826933)
LS2 = 28
// @from(Start 9826936, End 9827328)
function y0A() {
  let {
    columns: A
  } = c9(), B = A < LS2;
  return U4.default.createElement(h, {
    ...B ? {} : {
      borderColor: "claude",
      borderStyle: "round"
    },
    paddingX: 1,
    width: LS2
  }, U4.default.createElement(P, null, U4.default.createElement(P, {
    color: "claude"
  }, "✻"), " Welcome to", " ", U4.default.createElement(P, {
    bold: !0
  }, m0)))
}
// @from(Start 9827377, End 9827652)
function hE5(A) {
  return new Promise((B) => {
    let Q = "",
      I = new gE5;
    I.on("data", (Z) => {
      Q += Z.toString()
    });
    let G = n5(A, {
      stdout: I,
      patchConsole: !1
    });
    process.nextTick(() => {
      G.unmount(), B(Q)
    })
  })
}
// @from(Start 9827653, End 9827754)
async function aA1(A) {
  let B = await hE5(A);
  console.log(B), process.stdout.write("\x1B[?25l")
}
// @from(Start 9827755, End 9827979)
class k0A {
  alreadyRendered = {};
  async renderStatic(A) {
    for (let B in A)
      if (!this.alreadyRendered[B] && A[B]) await aA1(A[B]), this.alreadyRendered[B] = !0
  }
  reset() {
    this.alreadyRendered = {}
  }
}
// @from(Start 9827984, End 9828022)
RS2 = "Paste code here if prompted > "
// @from(Start 9828025, End 9836887)
function Pw1({
  onDone: A,
  startingMessage: B
}) {
  let I = m6().forceLoginMethod,
    G = I === "claudeai" ? "Login method pre-selected: Subscription Plan (Claude Pro/Max)" : I === "console" ? "Login method pre-selected: API Usage Billing (Anthropic Console)" : null,
    [Z, D] = G9.useState(() => {
      if (I === "claudeai" || I === "console") return {
        state: "ready_to_start"
      };
      return {
        state: "idle"
      }
    }),
    [Y, W] = G9.useState(""),
    [J, F] = G9.useState(0),
    [X] = G9.useState(() => new P0A),
    [V, C] = G9.useState(() => {
      return I === "claudeai"
    }),
    [K, E] = G9.useState(!1),
    [N] = G9.useState(() => new k0A),
    q = c9().columns - RS2.length - 1;
  G9.useEffect(() => {
    if (I === "claudeai") E1("tengu_oauth_claudeai_forced", {});
    else if (I === "console") E1("tengu_oauth_console_forced", {})
  }, [I]), G9.useEffect(() => {
    if (Z.state === "about_to_retry") D3(), N.reset(), setTimeout(() => {
      D(Z.nextState)
    }, 1000)
  }, [Z, N]), Z0(async (_, k) => {
    if (k.return) {
      if (Z.state === "success") E1("tengu_oauth_success", {
        loginWithClaudeAi: V
      }), await D3(), A();
      else if (Z.state === "error" && Z.toRetry) W(""), D({
        state: "about_to_retry",
        nextState: Z.toRetry
      })
    }
  });
  async function O(_, k) {
    try {
      let [i, x] = _.split("#");
      if (!i || !x) {
        D({
          state: "error",
          message: "Invalid code. Please make sure the full code was copied",
          toRetry: {
            state: "waiting_for_login",
            url: k
          }
        });
        return
      }
      E1("tengu_oauth_manual_entry", {}), X.handleManualAuthCodeInput({
        authorizationCode: i,
        state: x
      })
    } catch (i) {
      b1(i instanceof Error ? i : new Error(String(i))), D({
        state: "error",
        message: i.message,
        toRetry: {
          state: "waiting_for_login",
          url: k
        }
      })
    }
  }
  let R = G9.useCallback(async () => {
      try {
        let _ = await X.startOAuthFlow(async (x) => {
            D({
              state: "waiting_for_login",
              url: x
            }), setTimeout(() => E(!0), 3000)
          }, {
            loginWithClaudeAi: V
          }).catch((x) => {
            let s = x.message.includes("Token exchange failed");
            throw D({
              state: "error",
              message: s ? "Failed to exchange authorization code for access token. Please try again." : x.message,
              toRetry: {
                state: "idle"
              }
            }), E1("tengu_oauth_token_exchange_error", {
              error: x.message
            }), x
          }),
          k = J_1(_);
        if (k.warning) E1("tengu_oauth_storage_warning", {
          warning: k.warning
        });
        if (D({
            state: "creating_api_key"
          }), await hmA(_.accessToken).catch((x) => {
            throw D({
              state: "error",
              message: "Failed to fetch user roles: " + x.message,
              toRetry: {
                state: "idle"
              }
            }), E1("tengu_oauth_user_roles_error", {
              error: x.message
            }), x
          }), CL(_.scopes) ? !0 : await mmA(_.accessToken).catch((x) => {
            throw D({
              state: "error",
              message: "Failed to create API key: " + x.message,
              toRetry: {
                state: "idle"
              }
            }), E1("tengu_oauth_api_key_error", {
              error: x.message
            }), x
          })) await zH1(), T0A(), D({
          state: "success"
        }), _u({
          message: "Claude Code login successful"
        });
        else D({
          state: "error",
          message: "Unable to create API key. The server accepted the request but didn't return a key.",
          toRetry: {
            state: "idle"
          }
        }), E1("tengu_oauth_api_key_error", {
          error: "server_returned_no_key"
        })
      } catch (_) {
        let k = _.message;
        E1("tengu_oauth_error", {
          error: k
        })
      }
    }, [X, E, V]),
    T = G9.useRef(!1);
  G9.useEffect(() => {
    if (Z.state === "ready_to_start" && !T.current) T.current = !0, process.nextTick(() => {
      R(), T.current = !1
    })
  }, [Z.state, R]);

  function L() {
    switch (Z.state) {
      case "idle":
        return G9.default.createElement(h, {
          flexDirection: "column",
          gap: 1
        }, G9.default.createElement(P, {
          bold: !0
        }, B ? B : `${m0} can now be used with your Claude subscription or billed based on API usage through your Console account.`), G9.default.createElement(h, {
          marginTop: 1
        }, G9.default.createElement(P, {
          bold: !0
        }, "Select login method:")), G9.default.createElement(h, null, G9.default.createElement(p0, {
          options: [{
            label: `Claude account with subscription
 ${UA.dim("Starting at $20/mo for Pro, $100/mo for Max - Best value, predictable pricing")}
`,
            value: "claudeai"
          }, {
            label: `Anthropic Console account
 ${UA.dim("API usage billing")}
`,
            value: "console"
          }],
          onCancel: () => {},
          onChange: (_) => {
            if (D({
                state: "ready_to_start"
              }), _ === "claudeai") E1("tengu_oauth_claudeai_selected", {}), C(!0);
            else E1("tengu_oauth_console_selected", {}), C(!1)
          }
        })));
      case "waiting_for_login":
        return G9.default.createElement(h, {
          flexDirection: "column",
          gap: 1
        }, G && G9.default.createElement(h, null, G9.default.createElement(P, {
          dimColor: !0
        }, G)), !K && G9.default.createElement(h, null, G9.default.createElement(oD, null), G9.default.createElement(P, null, "Opening browser to sign in…")), K && G9.default.createElement(h, null, G9.default.createElement(P, null, RS2), G9.default.createElement(j3, {
          value: Y,
          onChange: W,
          onSubmit: (_) => O(_, Z.url),
          cursorOffset: J,
          onChangeCursorOffset: F,
          columns: q
        })));
      case "creating_api_key":
        return G9.default.createElement(h, {
          flexDirection: "column",
          gap: 1
        }, G9.default.createElement(h, null, G9.default.createElement(oD, null), G9.default.createElement(P, null, "Creating API key for Claude Code…")));
      case "about_to_retry":
        return G9.default.createElement(h, {
          flexDirection: "column",
          gap: 1
        }, G9.default.createElement(P, {
          color: "permission"
        }, "Retrying…"));
      case "success":
        return G9.default.createElement(h, {
          flexDirection: "column",
          gap: 2
        }, ZA().oauthAccount?.emailAddress ? G9.default.createElement(P, {
          dimColor: !0
        }, "Logged in as", " ", G9.default.createElement(P, null, ZA().oauthAccount?.emailAddress)) : null, G9.default.createElement(P, {
          color: "success"
        }, "Login successful. Press ", G9.default.createElement(P, {
          bold: !0
        }, "Enter"), " to continue…"));
      case "error":
        return G9.default.createElement(h, {
          flexDirection: "column",
          gap: 1
        }, G9.default.createElement(P, {
          color: "error"
        }, "OAuth error: ", Z.message), Z.toRetry && G9.default.createElement(h, {
          marginTop: 1
        }, G9.default.createElement(P, {
          color: "permission"
        }, "Press ", G9.default.createElement(P, {
          bold: !0
        }, "Enter"), " to retry.")));
      default:
        return null
    }
  }
  return G9.useEffect(() => {
    let _ = {};
    if (_.header = G9.default.createElement(h, {
        key: "header",
        flexDirection: "column",
        gap: 1
      }, G9.default.createElement(y0A, null), G9.default.createElement(h, {
        paddingBottom: 1,
        paddingLeft: 1
      }, G9.default.createElement(ES2, null))), Z.state === "waiting_for_login" && K) _.urlToCopy = G9.default.createElement(h, {
      flexDirection: "column",
      key: "urlToCopy",
      gap: 1,
      paddingBottom: 1
    }, G9.default.createElement(h, {
      paddingX: 1
    }, G9.default.createElement(P, {
      dimColor: !0
    }, "Browser didn't open? Use the url below to sign in:")), G9.default.createElement(h, {
      width: 1000
    }, G9.default.createElement(P, {
      dimColor: !0
    }, Z.url)));
    N.renderStatic(_)
  }, [N, Z, K]), G9.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, G9.default.createElement(h, {
    paddingLeft: 1,
    flexDirection: "column",
    gap: 1
  }, L()))
}
// @from(Start 9836892, End 9836908)
J4 = I1(U1(), 1)
// @from(Start 9836914, End 9836922)
mE5 = 53
// @from(Start 9836925, End 9839466)
function Vp({
  model: A
}) {
  let B = yY(process.env.IS_DEMO) ? 29 : Math.max(mE5, dA().length + 12),
    Q = qG(!1),
    {
      columns: I
    } = c9(),
    G = I < B,
    Z = Boolean(process.env.ANTHROPIC_API_KEY && HdA(process.env.ANTHROPIC_API_KEY)),
    D = yY(process.env.DISABLE_PROMPT_CACHING),
    Y = IZ0(A),
    W = null,
    J = Boolean(Z || D || process.env.API_TIMEOUT_MS || process.env.MAX_THINKING_TOKENS || process.env.ANTHROPIC_BASE_URL);
  return J4.createElement(h, {
    flexDirection: "column"
  }, J4.createElement(h, {
    ...G ? {} : {
      borderColor: "claude",
      borderStyle: "round"
    },
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1,
    width: B
  }, J4.createElement(P, null, J4.createElement(P, {
    color: "claude"
  }, "✻"), " Welcome to", " ", J4.createElement(P, {
    bold: !0
  }, m0), "!"), process.env.IS_DEMO ? null : J4.createElement(J4.Fragment, null, J4.createElement(h, {
    paddingLeft: 2,
    flexDirection: "column",
    gap: 1
  }, J4.createElement(P, {
    color: "secondaryText",
    italic: !0
  }, "/help for help, /status for your current setup"), J4.createElement(P, {
    color: "secondaryText"
  }, "cwd: ", dA()), !1, !1), J && J4.createElement(h, {
    borderColor: "secondaryBorder",
    borderStyle: "single",
    borderBottom: !1,
    borderLeft: !1,
    borderRight: !1,
    borderTop: !0,
    flexDirection: "column",
    marginLeft: 2,
    marginRight: 1,
    paddingTop: 1
  }, J4.createElement(h, {
    marginBottom: 1
  }, J4.createElement(P, {
    color: "secondaryText"
  }, "Overrides (via env):")), Z && Q ? J4.createElement(P, {
    color: "secondaryText"
  }, "• API Key:", " ", J4.createElement(P, {
    bold: !0
  }, Q.length < 25 ? `${Q.slice(0,3)}…` : `sk-ant-…${Q.slice(-B+25)}`)) : null, D ? J4.createElement(P, {
    color: "secondaryText"
  }, "• Prompt caching:", " ", J4.createElement(P, {
    color: "error",
    bold: !0
  }, "off")) : null, process.env.API_TIMEOUT_MS ? J4.createElement(P, {
    color: "secondaryText"
  }, "• API timeout:", " ", J4.createElement(P, {
    bold: !0
  }, process.env.API_TIMEOUT_MS, "ms")) : null, process.env.MAX_THINKING_TOKENS ? J4.createElement(P, {
    color: "secondaryText"
  }, "• Max thinking tokens:", " ", J4.createElement(P, {
    bold: !0
  }, process.env.MAX_THINKING_TOKENS)) : null, process.env.ANTHROPIC_BASE_URL ? J4.createElement(P, {
    color: "secondaryText"
  }, "• API Base URL:", " ", J4.createElement(P, {
    bold: !0
  }, process.env.ANTHROPIC_BASE_URL)) : null))))
}
// @from(Start 9839471, End 9839488)
OS2 = I1(U1(), 1)
// @from(Start 9839491, End 9839717)
function Cp() {
  let [{
    mainLoopModel: A,
    maxRateLimitFallbackActive: B
  }] = d5();
  return OS2.useMemo(() => {
    if (A === null) {
      if (B) return wX();
      return sa()
    }
    return Cg(A)
  }, [A, B])
}
// @from(Start 9839722, End 9840208)
TS2 = () => ({
  type: "local-jsx",
  name: "login",
  description: qG(!1) ? "Switch Anthropic accounts" : "Sign in with your Anthropic account",
  isEnabled: () => !0,
  isHidden: !1,
  async call(A, B) {
    return await D3(), cI.createElement(x0A, {
      onDone: async (Q, I) => {
        aA1(cI.createElement(Vp, {
          model: I
        })), B.onChangeAPIKey(), A(Q ? "Login successful" : "Login interrupted")
      }
    })
  },
  userFacingName() {
    return "login"
  }
})
// @from(Start 9840211, End 9840633)
function x0A(A) {
  let B = Cp(),
    Q = Y2(() => A.onDone(!1, B));
  return cI.createElement(h, {
    flexDirection: "column"
  }, cI.createElement(Pw1, {
    onDone: () => A.onDone(!0, B),
    startingMessage: A.startingMessage
  }), cI.createElement(h, {
    marginLeft: 3
  }, cI.createElement(P, {
    dimColor: !0
  }, Q.pending ? cI.createElement(cI.Fragment, null, "Press ", Q.keyName, " again to exit") : "")))
}
// @from(Start 9840638, End 9840654)
N7 = I1(U1(), 1)
// @from(Start 9840711, End 9840728)
PS2 = I1(U1(), 1)
// @from(Start 9840731, End 9840830)
function SS2() {
  return PS2.default.createElement(P, null, "Checking GitHub CLI installation…")
}
// @from(Start 9840835, End 9840851)
nG = I1(U1(), 1)
// @from(Start 9840854, End 9842473)
function _S2({
  currentRepo: A,
  useCurrentRepo: B,
  repoUrl: Q,
  onRepoUrlChange: I,
  onSubmit: G,
  onToggleUseCurrentRepo: Z
}) {
  let [D, Y] = nG.useState(0), J = c9().columns;
  return Z0((F, X) => {
    if (X.upArrow) Z(!0);
    else if (X.downArrow) Z(!1);
    else if (X.return) G()
  }), nG.default.createElement(nG.default.Fragment, null, nG.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, nG.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, nG.default.createElement(P, {
    bold: !0
  }, "Install GitHub App"), nG.default.createElement(P, {
    dimColor: !0
  }, "Select GitHub repository")), A && nG.default.createElement(h, {
    marginBottom: 1
  }, nG.default.createElement(P, {
    bold: B,
    color: B ? "permission" : void 0
  }, B ? "> " : "  ", "Use current repository: ", A)), nG.default.createElement(h, {
    marginBottom: 1
  }, nG.default.createElement(P, {
    bold: !B || !A,
    color: !B || !A ? "permission" : void 0
  }, !B || !A ? "> " : "  ", "Enter a different repository")), (!B || !A) && nG.default.createElement(h, {
    marginBottom: 1
  }, nG.default.createElement(j3, {
    value: Q,
    onChange: I,
    onSubmit: G,
    focus: !0,
    placeholder: "owner/repo or https://github.com/owner/repo",
    columns: J,
    cursorOffset: D,
    onChangeCursorOffset: Y,
    showCursor: !0
  }))), nG.default.createElement(h, {
    marginLeft: 3
  }, nG.default.createElement(P, {
    dimColor: !0
  }, A ? "↑/↓ to select · " : "", "Enter to continue")))
}
// @from(Start 9842478, End 9842494)
YF = I1(U1(), 1)
// @from(Start 9842497, End 9843581)
function jS2({
  repoUrl: A,
  onSubmit: B
}) {
  return Z0((Q, I) => {
    if (I.return) B()
  }), YF.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, YF.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, YF.default.createElement(P, {
    bold: !0
  }, "Install the Claude GitHub App")), YF.default.createElement(h, {
    marginBottom: 1
  }, YF.default.createElement(P, null, "Opening browser to install the Claude GitHub App…")), YF.default.createElement(h, {
    marginBottom: 1
  }, YF.default.createElement(P, null, "Please install the app for repository: ", YF.default.createElement(P, {
    bold: !0
  }, A))), YF.default.createElement(h, {
    marginBottom: 1
  }, YF.default.createElement(P, {
    dimColor: !0
  }, "Important: Make sure to grant access to this specific repository")), YF.default.createElement(h, null, YF.default.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Press Enter once you've installed the app", A0.ellipsis)))
}
// @from(Start 9843586, End 9843602)
Y3 = I1(U1(), 1)
// @from(Start 9843605, End 9845532)
function yS2({
  useExistingSecret: A,
  secretName: B,
  onToggleUseExistingSecret: Q,
  onSecretNameChange: I,
  onSubmit: G
}) {
  let [Z, D] = Y3.useState(0), Y = c9(), [W] = q9();
  return Z0((J, F) => {
    if (F.upArrow) Q(!0);
    else if (F.downArrow) Q(!1);
    else if (F.return) G()
  }), Y3.default.createElement(Y3.default.Fragment, null, Y3.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, Y3.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, Y3.default.createElement(P, {
    bold: !0
  }, "Install GitHub App"), Y3.default.createElement(P, {
    dimColor: !0
  }, "Setup API key secret")), Y3.default.createElement(h, {
    marginBottom: 1
  }, Y3.default.createElement(P, {
    color: "warning"
  }, "ANTHROPIC_API_KEY already exists in repository secrets!")), Y3.default.createElement(h, {
    marginBottom: 1
  }, Y3.default.createElement(P, null, "Would you like to:")), Y3.default.createElement(h, {
    marginBottom: 1
  }, Y3.default.createElement(P, null, A ? V9("success", W)("> ") : "  ", "Use the existing API key")), Y3.default.createElement(h, {
    marginBottom: 1
  }, Y3.default.createElement(P, null, !A ? V9("success", W)("> ") : "  ", "Create a new secret with a different name")), !A && Y3.default.createElement(Y3.default.Fragment, null, Y3.default.createElement(h, {
    marginBottom: 1
  }, Y3.default.createElement(P, null, "Enter new secret name (alphanumeric with underscores):")), Y3.default.createElement(j3, {
    value: B,
    onChange: I,
    onSubmit: G,
    focus: !0,
    placeholder: "e.g., CLAUDE_API_KEY",
    columns: Y.columns,
    cursorOffset: Z,
    onChangeCursorOffset: D,
    showCursor: !0
  }))), Y3.default.createElement(h, {
    marginLeft: 3
  }, Y3.default.createElement(P, {
    dimColor: !0
  }, "↑/↓ to select · Enter to continue")))
}
// @from(Start 9845537, End 9845553)
eZ = I1(U1(), 1)
// @from(Start 9845556, End 9847121)
function kS2({
  existingApiKey: A,
  useExistingKey: B,
  apiKey: Q,
  onApiKeyChange: I,
  onSubmit: G,
  onToggleUseExistingKey: Z
}) {
  let [D, Y] = eZ.useState(0), W = c9(), [J] = q9();
  return Z0((F, X) => {
    if (A) {
      if (X.upArrow) Z(!0);
      else if (X.downArrow) Z(!1)
    }
    if (X.return) G()
  }), eZ.default.createElement(eZ.default.Fragment, null, eZ.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, eZ.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, eZ.default.createElement(P, {
    bold: !0
  }, "Install GitHub App"), eZ.default.createElement(P, {
    dimColor: !0
  }, "Choose API key")), A && eZ.default.createElement(h, {
    marginBottom: 1
  }, eZ.default.createElement(P, null, B ? V9("success", J)("> ") : "  ", "Use your existing Claude Code API key")), eZ.default.createElement(h, {
    marginBottom: 1
  }, eZ.default.createElement(P, null, !B || !A ? V9("success", J)("> ") : "  ", "Enter a new API key")), (!B || !A) && eZ.default.createElement(j3, {
    value: Q,
    onChange: I,
    onSubmit: G,
    onPaste: I,
    focus: !0,
    placeholder: "sk-ant… (Create a new key at https://console.anthropic.com/settings/keys)",
    mask: "*",
    columns: W.columns,
    cursorOffset: D,
    onChangeCursorOffset: Y,
    showCursor: !0
  })), eZ.default.createElement(h, {
    marginLeft: 3
  }, eZ.default.createElement(P, {
    dimColor: !0
  }, A ? "↑/↓ to select · " : "", "Enter to continue")))
}
// @from(Start 9847126, End 9847142)
n$ = I1(U1(), 1)
// @from(Start 9847145, End 9848466)
function xS2({
  currentWorkflowInstallStep: A,
  secretExists: B,
  useExistingSecret: Q,
  secretName: I,
  skipWorkflow: G = !1,
  selectedWorkflows: Z
}) {
  let D = G ? ["Getting repository information", B && Q ? "Using existing API key secret" : `Setting up ${I} secret`] : ["Getting repository information", "Creating branch", Z.length > 1 ? "Creating workflow files" : "Creating workflow file", B && Q ? "Using existing API key secret" : `Setting up ${I} secret`, "Opening pull request page"];
  return n$.default.createElement(n$.default.Fragment, null, n$.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, n$.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, n$.default.createElement(P, {
    bold: !0
  }, "Install GitHub App"), n$.default.createElement(P, {
    dimColor: !0
  }, "Create GitHub Actions workflow")), D.map((Y, W) => {
    let J = "pending";
    if (W < A) J = "completed";
    else if (W === A) J = "in-progress";
    return n$.default.createElement(h, {
      key: W
    }, n$.default.createElement(P, {
      color: J === "completed" ? "success" : J === "in-progress" ? "warning" : void 0
    }, J === "completed" ? "✓ " : "", Y, J === "in-progress" ? "…" : ""))
  })))
}
// @from(Start 9848471, End 9848487)
VB = I1(U1(), 1)
// @from(Start 9848490, End 9850302)
function fS2({
  secretExists: A,
  useExistingSecret: B,
  secretName: Q,
  skipWorkflow: I = !1
}) {
  return VB.default.createElement(VB.default.Fragment, null, VB.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, VB.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, VB.default.createElement(P, {
    bold: !0
  }, "Install GitHub App"), VB.default.createElement(P, {
    dimColor: !0
  }, "Success")), !I && VB.default.createElement(P, {
    color: "success"
  }, "✓ GitHub Actions workflow created!"), A && B && VB.default.createElement(h, {
    marginTop: 1
  }, VB.default.createElement(P, {
    color: "success"
  }, "✓ Using existing ANTHROPIC_API_KEY secret")), (!A || !B) && VB.default.createElement(h, {
    marginTop: 1
  }, VB.default.createElement(P, {
    color: "success"
  }, "✓ API key saved as ", Q, " secret")), VB.default.createElement(h, {
    marginTop: 1
  }, VB.default.createElement(P, null, "Next steps:")), I ? VB.default.createElement(VB.default.Fragment, null, VB.default.createElement(P, null, "1. Install the Claude GitHub App if you haven't already"), VB.default.createElement(P, null, "2. Your workflow file was kept unchanged"), VB.default.createElement(P, null, "3. API key is configured and ready to use")) : VB.default.createElement(VB.default.Fragment, null, VB.default.createElement(P, null, "1. A pre-filled PR page has been created"), VB.default.createElement(P, null, "2. Install the Claude GitHub App if you haven't already"), VB.default.createElement(P, null, "3. Merge the PR to enable Claude PR assistance"))), VB.default.createElement(h, {
    marginLeft: 3
  }, VB.default.createElement(P, {
    dimColor: !0
  }, "Press any key to exit")))
}
// @from(Start 9850307, End 9850323)
U7 = I1(U1(), 1)
// @from(Start 9850326, End 9851783)
function vS2({
  error: A,
  errorReason: B,
  errorInstructions: Q
}) {
  return U7.default.createElement(U7.default.Fragment, null, U7.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, U7.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, U7.default.createElement(P, {
    bold: !0
  }, "Install GitHub App"), U7.default.createElement(P, {
    dimColor: !0
  }, "Error")), U7.default.createElement(P, {
    color: "error"
  }, "Error: ", A), B && U7.default.createElement(h, {
    marginTop: 1
  }, U7.default.createElement(P, {
    dimColor: !0
  }, "Reason: ", B)), Q && Q.length > 0 && U7.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, U7.default.createElement(P, {
    dimColor: !0
  }, "How to fix:"), Q.map((I, G) => U7.default.createElement(h, {
    key: G,
    marginLeft: 2
  }, U7.default.createElement(P, {
    dimColor: !0
  }, "• "), U7.default.createElement(P, null, I)))), U7.default.createElement(h, {
    marginTop: 1
  }, U7.default.createElement(P, {
    dimColor: !0
  }, "For manual setup instructions, see:", " ", U7.default.createElement(P, {
    color: "claude"
  }, "https://github.com/anthropics/claude-code-action/#manual-setup-direct-api")))), U7.default.createElement(h, {
    marginLeft: 3
  }, U7.default.createElement(P, {
    dimColor: !0
  }, "Press any key to exit")))
}
// @from(Start 9851788, End 9851804)
MW = I1(U1(), 1)
// @from(Start 9851807, End 9853330)
function bS2({
  repoName: A,
  onSelectAction: B
}) {
  return MW.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, MW.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, MW.default.createElement(P, {
    bold: !0
  }, "Existing Workflow Found"), MW.default.createElement(P, {
    dimColor: !0
  }, "Repository: ", A)), MW.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, MW.default.createElement(P, null, "A Claude workflow file already exists at", " ", MW.default.createElement(P, {
    color: "claude"
  }, ".github/workflows/claude.yml")), MW.default.createElement(P, {
    dimColor: !0
  }, "What would you like to do?")), MW.default.createElement(h, {
    flexDirection: "column"
  }, MW.default.createElement(p0, {
    options: [{
      label: "Update workflow file with latest version",
      value: "update"
    }, {
      label: "Skip workflow update (configure secrets only)",
      value: "skip"
    }, {
      label: "Exit without making changes",
      value: "exit"
    }],
    onChange: (Z) => {
      B(Z)
    },
    onCancel: () => {
      B("exit")
    }
  })), MW.default.createElement(h, {
    marginTop: 1
  }, MW.default.createElement(P, {
    dimColor: !0
  }, "View the latest workflow template at:", " ", MW.default.createElement(P, {
    color: "claude"
  }, "https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml"))))
}
// @from(Start 9853335, End 9853351)
LW = I1(U1(), 1)
// @from(Start 9853354, End 9854603)
function gS2({
  warnings: A,
  onContinue: B
}) {
  return Z0((Q, I) => {
    if (I.return) B()
  }), LW.default.createElement(LW.default.Fragment, null, LW.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1
  }, LW.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, LW.default.createElement(P, {
    bold: !0
  }, A0.warning, " Setup Warnings"), LW.default.createElement(P, {
    dimColor: !0
  }, "We found some potential issues, but you can continue anyway")), A.map((Q, I) => LW.default.createElement(h, {
    key: I,
    flexDirection: "column",
    marginBottom: 1
  }, LW.default.createElement(P, {
    color: "warning",
    bold: !0
  }, Q.title), LW.default.createElement(P, null, Q.message), Q.instructions.length > 0 && LW.default.createElement(h, {
    flexDirection: "column",
    marginLeft: 2,
    marginTop: 1
  }, Q.instructions.map((G, Z) => LW.default.createElement(P, {
    key: Z,
    dimColor: !0
  }, "• ", G))))), LW.default.createElement(h, {
    marginTop: 1
  }, LW.default.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Press Enter to continue anyway, or Ctrl+C to exit and fix issues"))))
}
// @from(Start 9854608, End 9854624)
ZQ = I1(U1(), 1)
// @from(Start 9854627, End 9856937)
function hS2({
  onSubmit: A,
  defaultSelections: B
}) {
  let [Q, I] = ZQ.useState(new Set(B)), [G, Z] = ZQ.useState(0), [D, Y] = ZQ.useState(!1), W = [{
    value: "claude",
    label: "@Claude Code",
    description: "Tag @claude in issues and PR comments"
  }, {
    value: "claude-review",
    label: "Claude Code Review",
    description: "Automated code review on new PRs"
  }];
  return Z0((J, F) => {
    if (F.upArrow) Z((X) => X > 0 ? X - 1 : W.length - 1), Y(!1);
    else if (F.downArrow) Z((X) => X < W.length - 1 ? X + 1 : 0), Y(!1);
    else if (J === " ") {
      let X = W[G]?.value;
      if (X) I((V) => {
        let C = new Set(V);
        if (C.has(X)) C.delete(X);
        else C.add(X);
        return C
      })
    } else if (F.return)
      if (Q.size === 0) Y(!0);
      else A(Array.from(Q))
  }), ZQ.default.createElement(ZQ.default.Fragment, null, ZQ.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1,
    width: "100%"
  }, ZQ.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, ZQ.default.createElement(P, {
    bold: !0
  }, "Select GitHub workflows to install"), ZQ.default.createElement(P, {
    dimColor: !0
  }, "We'll create a workflow file in your repository for each one you select.")), ZQ.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1
  }, W.map((J, F) => {
    let X = Q.has(J.value),
      V = F === G;
    return ZQ.default.createElement(h, {
      key: J.value,
      flexDirection: "row",
      marginBottom: F < W.length - 1 ? 1 : 0
    }, ZQ.default.createElement(h, {
      marginRight: 1,
      minWidth: 2
    }, ZQ.default.createElement(P, {
      bold: V
    }, X ? "✓" : " ")), ZQ.default.createElement(h, {
      flexDirection: "column"
    }, ZQ.default.createElement(P, {
      bold: V
    }, J.label), ZQ.default.createElement(P, {
      dimColor: !0
    }, J.description)))
  }))), ZQ.default.createElement(h, {
    marginLeft: 2
  }, ZQ.default.createElement(P, {
    dimColor: !0
  }, "↑↓ Navigate · Space to toggle · Enter to confirm")), D && ZQ.default.createElement(h, {
    marginLeft: 1
  }, ZQ.default.createElement(P, {
    color: "error"
  }, "You must select at least one workflow to continue")))
}
// @from(Start 9856942, End 9856981)
mS2 = "Add Claude Code GitHub Workflow"
// @from(Start 9856985, End 9859075)
dS2 = `name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request_review:
    types: [submitted]

jobs:
  claude:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review' && contains(github.event.review.body, '@claude')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@claude') || contains(github.event.issue.title, '@claude')))
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claude Code
        id: claude
        uses: anthropics/claude-code-action@beta
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          
          # Optional: Specify model (defaults to Claude Sonnet 4, uncomment for Claude Opus 4)
          # model: "claude-opus-4-20250514"
          
          # Optional: Customize the trigger phrase (default: @claude)
          # trigger_phrase: "/claude"
          
          # Optional: Trigger when specific user is assigned to an issue
          # assignee_trigger: "claude-bot"
          
          # Optional: Allow Claude to run specific commands
          # allowed_tools: "Bash(npm install),Bash(npm run build),Bash(npm run test:*),Bash(npm run lint:*)"
          
          # Optional: Add custom instructions for Claude to customize its behavior for your project
          # custom_instructions: |
          #   Follow our coding standards
          #   Ensure all new code has tests
          #   Use TypeScript for new files
          
          # Optional: Custom environment variables for Claude
          # claude_env: |
          #   NODE_ENV: test

`
// @from(Start 9859079, End 9860845)
uS2 = `## \uD83E\uDD16 Installing Claude Code GitHub App

This PR adds a GitHub Actions workflow that enables Claude Code integration in our repository.

### What is Claude Code?

[Claude Code](https://claude.ai/code) is an AI coding agent that can help with:
- Bug fixes and improvements  
- Documentation updates
- Implementing new features
- Code reviews and suggestions
- Writing tests
- And more!

### How it works

Once this PR is merged, we'll be able to interact with Claude by mentioning @claude in a pull request or issue comment.
Once the workflow is triggered, Claude will analyze the comment and surrounding context, and execute on the request in a GitHub action.

### Important Notes

- **This workflow won't take effect until this PR is merged**
- **@claude mentions won't work until after the merge is complete**
- The workflow runs automatically whenever Claude is mentioned in PR or issue comments
- Claude gets access to the entire PR or issue context including files, diffs, and previous comments

### Security

- Our Anthropic API key is securely stored as a GitHub Actions secret
- Only users with write access to the repository can trigger the workflow
- All Claude runs are stored in the GitHub Actions run history
- Claude's default tools are limited to reading/writing files and interacting with our repo by creating comments, branches, and commits.
- We can add more allowed tools by adding them to the workflow file like:

\`\`\`
allowed_tools: Bash(npm install),Bash(npm run build),Bash(npm run lint),Bash(npm run test)
\`\`\`

There's more information in the [Claude Code documentation](http://docs.anthropic.com/s/claude-code-github-actions).

After merging this PR, let's try mentioning @claude in a comment on any PR to get started!`
// @from(Start 9860849, End 9863742)
pS2 = `name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]
    # Optional: Only run on specific file changes
    # paths:
    #   - "src/**/*.ts"
    #   - "src/**/*.tsx"
    #   - "src/**/*.js"
    #   - "src/**/*.jsx"

jobs:
  claude-review:
    # Optional: Filter by PR author
    # if: |
    #   github.event.pull_request.user.login == 'external-contributor' ||
    #   github.event.pull_request.user.login == 'new-developer' ||
    #   github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'
    
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claude Code Review
        id: claude-review
        uses: anthropics/claude-code-action@beta
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          
          # Optional: Specify model (defaults to Claude Sonnet 4, uncomment for Claude Opus 4)
          # model: "claude-opus-4-20250514"
          
          # Direct prompt for automated review (no @claude mention needed)
          direct_prompt: |
            Please review this pull request and provide feedback on:
            - Code quality and best practices
            - Potential bugs or issues
            - Performance considerations
            - Security concerns
            - Test coverage
            
            Be constructive and helpful in your feedback.
          
          # Optional: Customize review based on file types
          # direct_prompt: |
          #   Review this PR focusing on:
          #   - For TypeScript files: Type safety and proper interface usage
          #   - For API endpoints: Security, input validation, and error handling
          #   - For React components: Performance, accessibility, and best practices
          #   - For tests: Coverage, edge cases, and test quality
          
          # Optional: Different prompts for different authors
          # direct_prompt: |
          #   \${{ github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR' && 
          #   'Welcome! Please review this PR from a first-time contributor. Be encouraging and provide detailed explanations for any suggestions.' ||
          #   'Please provide a thorough code review focusing on our coding standards and best practices.' }}
          
          # Optional: Add specific tools for running tests or linting
          # allowed_tools: "Bash(npm run test),Bash(npm run lint),Bash(npm run typecheck)"
          
          # Optional: Skip review for certain conditions
          # if: |
          #   !contains(github.event.pull_request.title, '[skip-review]') &&
          #   !contains(github.event.pull_request.title, '[WIP]')

`
// @from(Start 9863744, End 9865225)
async function dE5(A, B, Q, I, G, Z, D) {
  let Y = await u0("gh", ["api", `repos/${A}/contents/${Q}`, "--jq", ".sha"]),
    W = null;
  if (Y.code === 0) W = Y.stdout.trim();
  let J = I;
  if (G !== "ANTHROPIC_API_KEY") J = I.replace(/anthropic_api_key: \$\{\{ secrets\.ANTHROPIC_API_KEY \}\}/g, `anthropic_api_key: \${{ secrets.${G} }}`);
  let F = Buffer.from(J).toString("base64"),
    X = ["api", "--method", "PUT", `repos/${A}/contents/${Q}`, "-f", W ? `message=Update ${Z}` : `message=${Z}`, "-f", `content=${F}`, "-f", `branch=${B}`];
  if (W) X.push("-f", `sha=${W}`);
  let V = await u0("gh", X);
  if (V.code !== 0) {
    if (V.stderr.includes("422") && V.stderr.includes("sha")) throw E1("tengu_setup_github_actions_failed", {
      reason: "failed_to_create_workflow_file",
      exit_code: V.code,
      ...D
    }), new Error(`Failed to create workflow file ${Q}: A Claude workflow file already exists in this repository. Please remove it first or update it manually.`);
    E1("tengu_setup_github_actions_failed", {
      reason: "failed_to_create_workflow_file",
      exit_code: V.code,
      ...D
    });
    let C = `

Need help? Common issues:
` + `• Permission denied → Run: gh auth refresh -h github.com -s repo,workflow
` + `• Not authorized → Ensure you have admin access to the repository
` + "• For manual setup → Visit: https://github.com/anthropics/claude-code-action";
    throw new Error(`Failed to create workflow file ${Q}: ${V.stderr}${C}`)
  }
}
// @from(Start 9865226, End 9869030)
async function f0A(A, B, Q, I, G = !1, Z, D) {
  try {
    E1("tengu_setup_github_actions_started", {
      skip_workflow: G,
      has_api_key: !!B,
      using_default_secret_name: Q === "ANTHROPIC_API_KEY",
      selected_claude_workflow: Z.includes("claude"),
      selected_claude_review_workflow: Z.includes("claude-review"),
      ...D
    });
    let Y = await u0("gh", ["api", `repos/${A}`, "--jq", ".id"]);
    if (Y.code !== 0) throw E1("tengu_setup_github_actions_failed", {
      reason: "repo_not_found",
      exit_code: Y.code,
      ...D
    }), new Error(`Failed to access repository ${A}`);
    let W = await u0("gh", ["api", `repos/${A}`, "--jq", ".default_branch"]);
    if (W.code !== 0) throw E1("tengu_setup_github_actions_failed", {
      reason: "failed_to_get_default_branch",
      exit_code: W.code,
      ...D
    }), new Error(`Failed to get default branch: ${W.stderr}`);
    let J = W.stdout.trim(),
      F = await u0("gh", ["api", `repos/${A}/git/ref/heads/${J}`, "--jq", ".object.sha"]);
    if (F.code !== 0) throw E1("tengu_setup_github_actions_failed", {
      reason: "failed_to_get_branch_sha",
      exit_code: F.code,
      ...D
    }), new Error(`Failed to get branch SHA: ${F.stderr}`);
    let X = F.stdout.trim(),
      V = null;
    if (!G) {
      I(), V = `add-claude-github-actions-${Date.now()}`;
      let C = await u0("gh", ["api", "--method", "POST", `repos/${A}/git/refs`, "-f", `ref=refs/heads/${V}`, "-f", `sha=${X}`]);
      if (C.code !== 0) throw E1("tengu_setup_github_actions_failed", {
        reason: "failed_to_create_branch",
        exit_code: C.code,
        ...D
      }), new Error(`Failed to create branch: ${C.stderr}`);
      I();
      let K = [];
      if (Z.includes("claude")) K.push({
        path: ".github/workflows/claude.yml",
        content: dS2,
        message: "Claude PR Assistant workflow"
      });
      if (Z.includes("claude-review")) K.push({
        path: ".github/workflows/claude-code-review.yml",
        content: pS2,
        message: "Claude Code Review workflow"
      });
      for (let E of K) await dE5(A, V, E.path, E.content, Q, E.message, D)
    }
    if (I(), B) {
      let C = await u0("gh", ["secret", "set", Q, "--body", B, "--repo", A]);
      if (C.code !== 0) {
        E1("tengu_setup_github_actions_failed", {
          reason: "failed_to_set_api_key_secret",
          exit_code: C.code,
          ...D
        });
        let K = `

Need help? Common issues:
` + `• Permission denied → Run: gh auth refresh -h github.com -s repo
` + `• Not authorized → Ensure you have admin access to the repository
` + "• For manual setup → Visit: https://github.com/anthropics/claude-code-action";
        throw new Error(`Failed to set API key secret: ${C.stderr||"Unknown error"}${K}`)
      }
    }
    if (!G && V) {
      I();
      let C = `https://github.com/${A}/compare/${J}...${V}?quick_pull=1&title=${encodeURIComponent(mS2)}&body=${encodeURIComponent(uS2)}`;
      if (process.platform === "darwin") await u0("open", [C]);
      else if (process.platform === "win32") await u0("cmd.exe", ["/c", "start", "", C]);
      else await u0("xdg-open", [C])
    }
    E1("tengu_setup_github_actions_completed", {
      skip_workflow: G,
      has_api_key: !!B,
      using_default_secret_name: Q === "ANTHROPIC_API_KEY",
      selected_claude_workflow: Z.includes("claude"),
      selected_claude_review_workflow: Z.includes("claude-review"),
      ...D
    }), j0({
      ...ZA(),
      githubActionSetupCount: (ZA().githubActionSetupCount ?? 0) + 1
    })
  } catch (Y) {
    if (!Y || !(Y instanceof Error) || !Y.message.includes("Failed to")) E1("tengu_setup_github_actions_failed", {
      reason: "unexpected_error",
      ...D
    });
    if (Y instanceof Error) b1(Y);
    throw Y
  }
}
// @from(Start 9869035, End 9869365)
uE5 = {
  step: "check-gh",
  selectedRepoName: "",
  currentRepo: "",
  useCurrentRepo: !0,
  apiKey: "",
  useExistingKey: !0,
  currentWorkflowInstallStep: 0,
  warnings: [],
  secretExists: !1,
  secretName: "ANTHROPIC_API_KEY",
  useExistingSecret: !0,
  workflowExists: !1,
  selectedWorkflows: ["claude", "claude-review"]
}
// @from(Start 9869368, End 9882876)
function pE5(A) {
  let [B] = N7.useState(() => qG(!1)), [Q, I] = N7.useState({
    ...uE5,
    useExistingKey: !!B
  });
  Y2(), N7.default.useEffect(() => {
    E1("tengu_install_github_app_started", {})
  }, []);
  let G = N7.useCallback(async () => {
    let q = [];
    try {
      Sw1("gh --version", {
        stdio: "ignore"
      })
    } catch {
      q.push({
        title: "GitHub CLI not found",
        message: "GitHub CLI (gh) does not appear to be installed or accessible.",
        instructions: ["Install GitHub CLI from https://cli.github.com/", "macOS: brew install gh", "Windows: winget install --id GitHub.cli", "Linux: See installation instructions at https://github.com/cli/cli#installation"]
      })
    }
    try {
      Sw1("gh auth status", {
        stdio: "ignore"
      })
    } catch {
      q.push({
        title: "GitHub CLI not authenticated",
        message: "GitHub CLI does not appear to be authenticated.",
        instructions: ["Run: gh auth login", "Follow the prompts to authenticate with GitHub", "Or set up authentication using environment variables or other methods"]
      })
    }
    let O = "";
    try {
      Sw1("git rev-parse --is-inside-work-tree", {
        stdio: "ignore"
      });
      let T = Sw1("git remote get-url origin", {
        encoding: "utf8"
      }).trim().match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
      if (T) O = T[1]?.replace(/\.git$/, "") || ""
    } catch {}
    I((R) => ({
      ...R,
      warnings: q,
      currentRepo: O,
      selectedRepoName: O,
      step: q.length > 0 ? "warnings" : "choose-repo"
    }))
  }, []);
  N7.default.useEffect(() => {
    if (Q.step === "check-gh") G()
  }, [Q.step, G]);
  async function Z() {
    if (process.platform === "darwin") await u0("open", ["https://github.com/apps/claude"]);
    else if (process.platform === "win32") await u0("cmd.exe", ["/c", "start", "", "https://github.com/apps/claude"]);
    else await u0("xdg-open", ["https://github.com/apps/claude"])
  }
  async function D(q) {
    try {
      let O = await u0("gh", ["api", `repos/${q}`, "--jq", ".permissions.admin"]);
      if (O.code === 0) return {
        hasAccess: O.stdout.trim() === "true"
      };
      if (O.stderr.includes("404") || O.stderr.includes("Not Found")) return {
        hasAccess: !1,
        error: "repository_not_found"
      };
      return {
        hasAccess: !1
      }
    } catch {
      return {
        hasAccess: !1
      }
    }
  }
  async function Y(q) {
    return (await u0("gh", ["api", `repos/${q}/contents/.github/workflows/claude.yml`, "--jq", ".sha"])).code === 0
  }
  async function W() {
    let q = await u0("gh", ["secret", "list", "--app", "actions", "--repo", Q.selectedRepoName]);
    if (q.code === 0)
      if (q.stdout.split(`
`).some((T) => {
          return /^ANTHROPIC_API_KEY\s+/.test(T)
        })) I((T) => ({
        ...T,
        secretExists: !0,
        step: "check-existing-secret"
      }));
      else I((T) => ({
        ...T,
        step: "api-key"
      }));
    else I((O) => ({
      ...O,
      step: "api-key"
    }))
  }
  let J = async () => {
    if (Q.step === "warnings") I((q) => ({
      ...q,
      step: "install-app"
    })), setTimeout(() => {
      Z()
    }, 0);
    else if (Q.step === "choose-repo") {
      let q = Q.useCurrentRepo ? Q.currentRepo : Q.selectedRepoName;
      if (!q.trim()) return;
      let O = [];
      if (q.includes("github.com")) {
        let L = q.match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
        if (!L) O.push({
          title: "Invalid GitHub URL format",
          message: "The repository URL format appears to be invalid.",
          instructions: ["Use format: owner/repo or https://github.com/owner/repo", "Example: anthropics/claude-cli"]
        });
        else q = L[1]?.replace(/\.git$/, "") || ""
      }
      if (!q.includes("/")) O.push({
        title: "Repository format warning",
        message: 'Repository should be in format "owner/repo"',
        instructions: ["Use format: owner/repo", "Example: anthropics/claude-cli"]
      });
      let R = await D(q);
      if (R.error === "repository_not_found") O.push({
        title: "Repository not found",
        message: `Repository ${q} was not found or you don't have access.`,
        instructions: [`Check that the repository name is correct: ${q}`, "Ensure you have access to this repository", 'For private repositories, make sure your GitHub token has the "repo" scope', "You can add the repo scope with: gh auth refresh -h github.com -s repo,workflow"]
      });
      else if (!R.hasAccess) O.push({
        title: "Admin permissions required",
        message: `You might need admin permissions on ${q} to set up GitHub Actions.`,
        instructions: ["Repository admins can install GitHub Apps and set secrets", "Ask a repository admin to run this command if setup fails", "Alternatively, you can use the manual setup instructions"]
      });
      let T = await Y(q);
      if (O.length > 0) {
        let L = [...Q.warnings, ...O];
        I((_) => ({
          ..._,
          selectedRepoName: q,
          workflowExists: T,
          warnings: L,
          step: "warnings"
        }))
      } else I((L) => ({
        ...L,
        selectedRepoName: q,
        workflowExists: T,
        step: "install-app"
      })), setTimeout(() => {
        Z()
      }, 0)
    } else if (Q.step === "install-app")
      if (Q.workflowExists) I((q) => ({
        ...q,
        step: "check-existing-workflow"
      }));
      else I((q) => ({
        ...q,
        step: "select-workflows"
      }));
    else if (Q.step === "check-existing-workflow") return;
    else if (Q.step === "select-workflows") return;
    else if (Q.step === "check-existing-secret")
      if (Q.useExistingSecret) {
        I((q) => ({
          ...q,
          step: "creating",
          currentWorkflowInstallStep: 0
        }));
        try {
          await f0A(Q.selectedRepoName, null, Q.secretName, () => {
            I((q) => ({
              ...q,
              currentWorkflowInstallStep: q.currentWorkflowInstallStep + 1
            }))
          }, Q.workflowAction === "skip", Q.selectedWorkflows, {
            useCurrentRepo: Q.useCurrentRepo,
            workflowExists: Q.workflowExists,
            secretExists: Q.secretExists
          }), I((q) => ({
            ...q,
            step: "success"
          }))
        } catch (q) {
          let O = q instanceof Error ? q.message : "Failed to set up GitHub Actions";
          if (O.includes("workflow file already exists")) E1("tengu_install_github_app_error", {
            reason: "workflow_file_exists"
          }), I((R) => ({
            ...R,
            step: "error",
            error: "A Claude workflow file already exists in this repository.",
            errorReason: "Workflow file conflict",
            errorInstructions: ["The file .github/workflows/claude.yml already exists", "You can either:", "  1. Delete the existing file and run this command again", "  2. Update the existing file manually using the template from:", "     https://github.com/anthropics/claude-code-action/#manual-setup-direct-api"]
          }));
          else E1("tengu_install_github_app_error", {
            reason: "setup_github_actions_failed"
          }), I((R) => ({
            ...R,
            step: "error",
            error: O,
            errorReason: "GitHub Actions setup failed",
            errorInstructions: []
          }))
        }
      } else I((q) => ({
        ...q,
        step: "api-key"
      }));
    else if (Q.step === "api-key") {
      let q = Q.useExistingKey ? B : Q.apiKey;
      if (!q) {
        E1("tengu_install_github_app_error", {
          reason: "api_key_missing"
        }), I((O) => ({
          ...O,
          step: "error",
          error: "API key is required"
        }));
        return
      }
      I((O) => ({
        ...O,
        apiKey: q,
        step: "creating",
        currentWorkflowInstallStep: 0
      }));
      try {
        await f0A(Q.selectedRepoName, q, Q.secretName, () => {
          I((O) => ({
            ...O,
            currentWorkflowInstallStep: O.currentWorkflowInstallStep + 1
          }))
        }, Q.workflowAction === "skip", Q.selectedWorkflows, {
          useCurrentRepo: Q.useCurrentRepo,
          workflowExists: Q.workflowExists,
          secretExists: Q.secretExists
        }), I((O) => ({
          ...O,
          step: "success"
        }))
      } catch (O) {
        let R = O instanceof Error ? O.message : "Failed to set up GitHub Actions";
        if (R.includes("workflow file already exists")) E1("tengu_install_github_app_error", {
          reason: "workflow_file_exists"
        }), I((T) => ({
          ...T,
          step: "error",
          error: "A Claude workflow file already exists in this repository.",
          errorReason: "Workflow file conflict",
          errorInstructions: ["The file .github/workflows/claude.yml already exists", "You can either:", "  1. Delete the existing file and run this command again", "  2. Update the existing file manually using the template from:", "     https://github.com/anthropics/claude-code-action/#manual-setup-direct-api"]
        }));
        else E1("tengu_install_github_app_error", {
          reason: "setup_github_actions_failed"
        }), I((T) => ({
          ...T,
          step: "error",
          error: R,
          errorReason: "GitHub Actions setup failed",
          errorInstructions: []
        }))
      }
    }
  }, F = (q) => {
    I((O) => ({
      ...O,
      selectedRepoName: q
    }))
  }, X = (q) => {
    I((O) => ({
      ...O,
      apiKey: q
    }))
  }, V = (q) => {
    if (q && !/^[a-zA-Z0-9_]+$/.test(q)) return;
    I((O) => ({
      ...O,
      secretName: q
    }))
  }, C = (q) => {
    I((O) => ({
      ...O,
      useCurrentRepo: q,
      selectedRepoName: q ? O.currentRepo : ""
    }))
  }, K = (q) => {
    I((O) => ({
      ...O,
      useExistingKey: q
    }))
  }, E = (q) => {
    I((O) => ({
      ...O,
      useExistingSecret: q,
      secretName: q ? "ANTHROPIC_API_KEY" : ""
    }))
  }, N = async (q) => {
    if (q === "exit") {
      A.onDone("Installation cancelled by user");
      return
    }
    if (I((O) => ({
        ...O,
        workflowAction: q
      })), q === "skip") I((O) => ({
      ...O,
      step: "check-existing-secret"
    })), await W();
    else if (q === "update") I((O) => ({
      ...O,
      step: "check-existing-secret"
    })), await W()
  };
  switch (Z0(() => {
      if (Q.step === "success" || Q.step === "error") {
        if (Q.step === "success") E1("tengu_install_github_app_completed", {});
        A.onDone(Q.step === "success" ? "GitHub Actions setup complete!" : Q.error ? `Couldn't install GitHub App: ${Q.error}
For manual setup instructions, see: https://github.com/anthropics/claude-code-action/#manual-setup-direct-api` : `GitHub App installation failed
For manual setup instructions, see: https://github.com/anthropics/claude-code-action/#manual-setup-direct-api`)
      }
    }), Q.step) {
    case "check-gh":
      return N7.default.createElement(SS2, null);
    case "warnings":
      return N7.default.createElement(gS2, {
        warnings: Q.warnings,
        onContinue: J
      });
    case "choose-repo":
      return N7.default.createElement(_S2, {
        currentRepo: Q.currentRepo,
        useCurrentRepo: Q.useCurrentRepo,
        repoUrl: Q.selectedRepoName,
        onRepoUrlChange: F,
        onToggleUseCurrentRepo: C,
        onSubmit: J
      });
    case "install-app":
      return N7.default.createElement(jS2, {
        repoUrl: Q.selectedRepoName,
        onSubmit: J
      });
    case "check-existing-workflow":
      return N7.default.createElement(bS2, {
        repoName: Q.selectedRepoName,
        onSelectAction: N
      });
    case "check-existing-secret":
      return N7.default.createElement(yS2, {
        useExistingSecret: Q.useExistingSecret,
        secretName: Q.secretName,
        onToggleUseExistingSecret: E,
        onSecretNameChange: V,
        onSubmit: J
      });
    case "api-key":
      return N7.default.createElement(kS2, {
        existingApiKey: B,
        useExistingKey: Q.useExistingKey,
        apiKey: Q.apiKey,
        onApiKeyChange: X,
        onToggleUseExistingKey: K,
        onSubmit: J
      });
    case "creating":
      return N7.default.createElement(xS2, {
        currentWorkflowInstallStep: Q.currentWorkflowInstallStep,
        secretExists: Q.secretExists,
        useExistingSecret: Q.useExistingSecret,
        secretName: Q.secretName,
        skipWorkflow: Q.workflowAction === "skip",
        selectedWorkflows: Q.selectedWorkflows
      });
    case "success":
      return N7.default.createElement(fS2, {
        secretExists: Q.secretExists,
        useExistingSecret: Q.useExistingSecret,
        secretName: Q.secretName,
        skipWorkflow: Q.workflowAction === "skip"
      });
    case "error":
      return N7.default.createElement(vS2, {
        error: Q.error,
        errorReason: Q.errorReason,
        errorInstructions: Q.errorInstructions
      });
    case "select-workflows":
      return N7.default.createElement(hS2, {
        defaultSelections: Q.selectedWorkflows,
        onSubmit: (q) => {
          I((O) => ({
            ...O,
            selectedWorkflows: q,
            step: "check-existing-secret"
          })), W()
        }
      })
  }
}
// @from(Start 9882881, End 9883221)
cE5 = {
    type: "local-jsx",
    name: "install-github-app",
    description: "Set up Claude GitHub Actions for a repository",
    isEnabled: () => !Yb(),
    isHidden: !1,
    async call(A) {
      return N7.default.createElement(pE5, {
        onDone: A
      })
    },
    userFacingName() {
      return "install-github-app"
    }
  }
// @from(Start 9883225, End 9883234)
cS2 = cE5
// @from(Start 9883240, End 9883257)
lS2 = I1(U1(), 1)
// @from(Start 9883263, End 9883279)
v2 = I1(U1(), 1)
// @from(Start 9883282, End 9883587)
function Kp({
  onPress: A
}) {
  return Z0((B, Q) => {
    if (Q.return) A();
    else if (Q.escape) MI(1)
  }), v2.default.createElement(P, null, "Press ", v2.default.createElement(P, {
    bold: !0
  }, "Enter"), " to continue or ", v2.default.createElement(P, {
    bold: !0
  }, "Esc"), " to exit")
}
// @from(Start 9883589, End 9889902)
function Hp() {
  let [A, B] = v2.useState("intro"), [Q, I] = v2.useState(""), [G, Z] = v2.useState("");
  if (Y2(() => {
      FT("canceled", "user_exit"), MI(1)
    }), v2.useEffect(() => {
      FT("start")
    }, []), v2.useEffect(() => {
      let D = async () => {
        try {
          if (!z0A()) I("Local package creation failed"), B("error"), FT("failure", "environement_setup");
          switch (await Yp()) {
            case "success": {
              B("success"), FT("success");
              break
            }
            case "in_progress":
              I("Update already in progress"), B("error"), FT("failure", "in_progress");
              break;
            case "install_failed":
              I(`Install of ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.PACKAGE_URL} failed`), B("error"), FT("failure", "other_failure");
              break
          }
        } catch (J) {
          I(String(J)), B("error"), FT("failure", "unexpected_error")
        }
      }, Y = async () => {
        try {
          let J = await uP2();
          Z(J), B("setup")
        } catch (J) {
          I(String(J)), B("error")
        }
      }, W = async () => {
        try {
          if (await pP2()) B("uninstall-success");
          else B("uninstall-failed")
        } catch (J) {
          I(String(J)), B("uninstall-failed")
        }
      };
      switch (A) {
        case "installing":
          D();
          break;
        case "setup-alias":
          Y();
          break;
        case "uninstall":
          W();
          break;
        default:
          break
      }
    }, [A]), A === "intro") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0
  }, m0, " Local Installer"), v2.default.createElement(h, {
    flexDirection: "column"
  }, v2.default.createElement(P, {
    color: "secondaryText"
  }, `This will install ${m0} to ~/.claude/local`), v2.default.createElement(P, {
    color: "secondaryText"
  }, "instead of using a global npm installation.")), v2.default.createElement(Kp, {
    onPress: () => B("installing")
  }));
  if (A === "installing") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0
  }, "Installing ", m0, " locally..."), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(oD, null), v2.default.createElement(P, null, " Installing to ", Dp)));
  if (A === "success") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0,
    color: "success"
  }, "✓ Local installation successful!"), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(P, null, "Next, let's add an alias for `claude`")), v2.default.createElement(Kp, {
    onPress: () => B("setup-alias")
  }));
  if (A === "setup-alias") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0
  }, "Setting up alias for claude..."), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(oD, null), v2.default.createElement(P, null, " Configuring shell environment")));
  if (A === "setup") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0
  }, "Alias setup complete"), v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, null, G), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(P, null, "Next, we'll remove the globally installed npm package"))), v2.default.createElement(Kp, {
    onPress: () => B("uninstall")
  }));
  if (A === "uninstall") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0
  }, "Uninstalling global ", m0, "..."), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(oD, null), v2.default.createElement(P, null, " Removing global npm installation")));
  if (A === "uninstall-success") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0,
    color: "success"
  }, "✓ Global installation removed successfully!"), v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, null, m0, " is now installed locally."), v2.default.createElement(P, null, "Please restart your shell, then run", " ", v2.default.createElement(P, {
    color: "claude"
  }, UA.bold("claude")), "."), v2.default.createElement(h, {
    flexDirection: "row",
    marginY: 1
  }, v2.default.createElement(oD, null), v2.default.createElement(P, null, " Happy Clauding!"))), v2.default.createElement(Kp, {
    onPress: () => MI(0)
  }));
  if (A === "uninstall-failed") return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0,
    color: "warning"
  }, "! Could not remove global installation"), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(P, null, "The local installation is installed, but we couldn't remove the global npm package automatically.")), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(P, null, "You can remove it manually later with:", `
`, UA.bold(`npm uninstall -g --force ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.PACKAGE_URL}`))), v2.default.createElement(Kp, {
    onPress: () => MI(0)
  }));
  return v2.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, v2.default.createElement(P, {
    bold: !0,
    color: "error"
  }, "✗ Installation failed"), v2.default.createElement(h, {
    marginY: 1
  }, v2.default.createElement(P, null, Q || "An unexpected error occurred during installation.")), v2.default.createElement(Kp, {
    onPress: () => MI(1)
  }))
}
// @from(Start 9889907, End 9890296)
lE5 = {
    type: "local",
    name: "migrate-installer",
    description: "Migrate from global npm installation to local installation",
    isEnabled: () => !JT(),
    isHidden: !1,
    async call() {
      let {
        waitUntilExit: A
      } = n5(lS2.default.createElement(Hp, null));
      return await A(), ""
    },
    userFacingName() {
      return "migrate-installer"
    }
  }
// @from(Start 9890300, End 9890309)
iS2 = lE5
// @from(Start 9890315, End 9890332)
nS2 = I1(U1(), 1)
// @from(Start 9890338, End 9890354)
NV = I1(U1(), 1)
// @from(Start 9890360, End 9890376)
RW = I1(U1(), 1)
// @from(Start 9890379, End 9892476)
function v0A({
  servers: A,
  onSelectServer: B,
  onComplete: Q
}) {
  let [I] = q9(), G = Y2();
  if (A.length === 0) return null;
  let Z = L31(),
    D = A.some((W) => W.client.type === "failed"),
    Y = A.map((W) => {
      let J = "",
        F = "",
        X = "";
      if (W.client.type === "connected") F = V9("success", I)(A0.tick), J = "connected · Enter to view details", X = `${F} ${J}`;
      else if (W.client.type === "pending") F = V9("secondaryText", I)(A0.radioOff), J = "connecting...", X = `${F} ${J}`;
      else if (W.client.type === "needs-auth") F = V9("warning", I)(A0.triangleUpOutline), J = "disconnected · Enter to login", X = `${F} ${J}`;
      else if (W.client.type === "failed") F = V9("error", I)(A0.cross), J = "failed · Enter to view details", X = `${F} ${J}`;
      else F = V9("error", I)(A0.cross), J = "failed", X = `${F} ${J}`;
      return {
        label: UA.bold(W.name),
        value: W.name,
        description: X,
        dimDescription: !1
      }
    });
  return RW.default.createElement(h, {
    flexDirection: "column"
  }, RW.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1,
    borderStyle: "round",
    borderColor: "secondaryBorder"
  }, RW.default.createElement(h, {
    marginBottom: 1
  }, RW.default.createElement(P, {
    bold: !0
  }, "Manage MCP servers")), RW.default.createElement(p0, {
    options: Y,
    onChange: (W) => {
      let J = A.find((F) => F.name === W);
      if (J) B(J)
    },
    onCancel: () => Q()
  }), D && RW.default.createElement(h, {
    marginTop: 1
  }, RW.default.createElement(P, {
    dimColor: !0
  }, "※ Tip:", " ", Z ? `Error logs will be shown inline. Log files are also saved in
  ${Mz.baseLogs()}` : `Run claude --debug to see logs inline, or view log files in
  ${Mz.baseLogs()}`))), RW.default.createElement(h, {
    marginLeft: 3
  }, RW.default.createElement(P, {
    dimColor: !0
  }, G.pending ? RW.default.createElement(RW.default.Fragment, null, "Press ", G.keyName, " again to exit") : RW.default.createElement(RW.default.Fragment, null, "Esc to exit"))))
}
// @from(Start 9892481, End 9892497)
A8 = I1(U1(), 1)
// @from(Start 9892503, End 9892520)
_w1 = I1(U1(), 1)
// @from(Start 9892523, End 9892934)
function jw1({
  serverToolsCount: A,
  serverPromptsCount: B,
  serverResourcesCount: Q
}) {
  let I = [];
  if (A > 0) I.push("tools");
  if (Q > 0) I.push("resources");
  if (B > 0) I.push("prompts");
  return _w1.default.createElement(h, null, _w1.default.createElement(P, {
    bold: !0
  }, "Capabilities: "), _w1.default.createElement(P, {
    color: "text"
  }, I.length > 0 ? I.join(" · ") : "none"))
}
// @from(Start 9892936, End 9895427)
function b0A({
  server: A,
  serverToolsCount: B,
  onViewTools: Q,
  onCancel: I
}) {
  let [G] = q9(), Z = Y2(), [D] = d5(), Y = A.name.charAt(0).toUpperCase() + A.name.slice(1), W = y81(D.mcp.commands, A.name).length, J = [];
  if (A.client.type === "connected" && B > 0) J.push({
    label: "View tools",
    value: "tools"
  });
  if (J.length === 0) J.push({
    label: "Back",
    value: "back"
  });
  return A8.default.createElement(A8.default.Fragment, null, A8.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1,
    borderStyle: "round"
  }, A8.default.createElement(h, {
    marginBottom: 1
  }, A8.default.createElement(P, {
    bold: !0
  }, Y, " MCP Server")), A8.default.createElement(h, {
    flexDirection: "column",
    gap: 0
  }, A8.default.createElement(h, null, A8.default.createElement(P, {
    bold: !0
  }, "Status: "), A.client.type === "connected" ? A8.default.createElement(P, null, V9("success", G)(A0.tick), " connected") : A.client.type === "pending" ? A8.default.createElement(P, null, V9("secondaryText", G)(A0.radioOff), " connecting…") : A8.default.createElement(P, null, V9("error", G)(A0.cross), " failed")), A8.default.createElement(h, null, A8.default.createElement(P, {
    bold: !0
  }, "Command: "), A8.default.createElement(P, {
    color: "secondaryText"
  }, A.config.command)), A.config.args && A.config.args.length > 0 && A8.default.createElement(h, null, A8.default.createElement(P, {
    bold: !0
  }, "Args: "), A8.default.createElement(P, {
    color: "secondaryText"
  }, A.config.args.join(" "))), A.client.type === "connected" && A8.default.createElement(jw1, {
    serverToolsCount: B,
    serverPromptsCount: W,
    serverResourcesCount: D.mcp.resources[A.name]?.length || 0
  }), A.client.type === "connected" && B > 0 && A8.default.createElement(h, null, A8.default.createElement(P, {
    bold: !0
  }, "Tools: "), A8.default.createElement(P, {
    color: "secondaryText"
  }, B, " tools"))), J.length > 0 && A8.default.createElement(h, {
    marginTop: 1
  }, A8.default.createElement(p0, {
    options: J,
    onChange: (F) => {
      if (F === "tools") Q();
      else if (F === "back") I()
    },
    onCancel: I
  }))), A8.default.createElement(h, {
    marginLeft: 3
  }, A8.default.createElement(P, {
    dimColor: !0
  }, Z.pending ? A8.default.createElement(A8.default.Fragment, null, "Press ", Z.keyName, " again to exit") : A8.default.createElement(A8.default.Fragment, null, "Esc to go back"))))
}
// @from(Start 9895432, End 9895448)
F4 = I1(U1(), 1)
// @from(Start 9895451, End 9901975)
function g0A({
  server: A,
  serverToolsCount: B,
  onViewTools: Q,
  onCancel: I,
  onComplete: G
}) {
  let [Z] = q9(), D = Y2(), [Y, W] = F4.default.useState(!1), [J, F] = F4.default.useState(null), [X, V] = d5(), [C, K] = F4.default.useState(null), E = A.name.charAt(0).toUpperCase() + A.name.slice(1), N = y81(X.mcp.commands, A.name).length, q = F4.default.useCallback(async (L, _) => {
    p2(L, "Starting server reconnection after auth"), await pe(L, _, ({
      client: k,
      tools: i,
      commands: x,
      resources: s
    }) => {
      V((d) => {
        let F1 = [...ci(d.mcp.tools, L), ...i],
          X1 = [...li(d.mcp.commands, L), ...x],
          v = {
            ...ii(d.mcp.resources, L)
          };
        if (s && s.length > 0) v[L] = s;
        let D1 = d.mcp.clients.map((N1) => N1.name === L ? k : N1);
        return p2(L, `Reconnected: ${i.length} tools, ${x.length} commands, ${s?.length||0} resources`), {
          ...d,
          mcp: {
            clients: D1,
            tools: F1,
            commands: X1,
            resources: v
          }
        }
      })
    })
  }, [V]), O = F4.default.useCallback(async () => {
    W(!0), F(null);
    try {
      if (A.isAuthenticated && A.config) await iC1(A.name, A.config);
      if (A.config) {
        await Ko1(A.name, A.config, K), E1("tengu_mcp_auth_config_authenticate", {
          wasAuthenticated: A.isAuthenticated
        });
        try {
          await q(A.name, {
            ...A.config,
            scope: A.scope
          });
          let L = A.isAuthenticated ? `Authentication successful. Reconnected to ${A.name}.` : `Authentication successful. Connected to ${A.name}.`;
          G?.(L)
        } catch (L) {
          p2(A.name, `Reconnection failed: ${L instanceof Error?L.message:String(L)}`), G?.("Authentication successful, but server reconnection failed. You may need to manually restart Claude Code for the changes to take effect.")
        }
      }
    } catch (L) {
      F(L instanceof Error ? L.message : String(L))
    } finally {
      W(!1)
    }
  }, [A.isAuthenticated, A.config, A.name, A.scope, G, q, K]), R = async () => {
    if (A.config) await iC1(A.name, A.config), E1("tengu_mcp_auth_config_clear", {}), await tC1(A.name, {
      ...A.config,
      scope: A.scope
    }), V((L) => {
      let _ = L.mcp.clients.map((s) => s.name === A.name ? {
          ...s,
          type: "failed"
        } : s),
        k = ci(L.mcp.tools, A.name),
        i = li(L.mcp.commands, A.name),
        x = ii(L.mcp.resources, A.name);
      return {
        ...L,
        mcp: {
          clients: _,
          tools: k,
          commands: i,
          resources: x
        }
      }
    }), G?.(`Authentication cleared for ${A.name}.`)
  };
  if (F4.default.useEffect(() => {
      if ((A.client.type === "needs-auth" || A.isAuthenticated === !1 && A.client.type !== "connected") && !Y && !J) O()
    }, [A.client.type, A.isAuthenticated, Y, J, O]), Y) return F4.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1
  }, F4.default.createElement(P, {
    color: "claude"
  }, "Authenticating with ", A.name, "…"), F4.default.createElement(h, null, F4.default.createElement(oD, null), F4.default.createElement(P, null, " A browser window will open for authentication")), C && F4.default.createElement(h, {
    flexDirection: "column"
  }, F4.default.createElement(P, {
    dimColor: !0
  }, "If your browser doesn't open automatically, copy this URL manually:"), F4.default.createElement(kQ, {
    url: C
  })), F4.default.createElement(P, {
    dimColor: !0
  }, "Return here after authenticating in your browser."));
  let T = [];
  if (A.client.type === "connected" && B > 0) T.push({
    label: "View tools",
    value: "tools"
  });
  if (A.isAuthenticated) T.push({
    label: "Re-authenticate",
    value: "reauth"
  }), T.push({
    label: "Clear authentication",
    value: "clear-auth"
  });
  if (T.length === 0) T.push({
    label: "Back",
    value: "back"
  });
  return F4.default.createElement(F4.default.Fragment, null, F4.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1,
    borderStyle: "round"
  }, F4.default.createElement(h, {
    marginBottom: 1
  }, F4.default.createElement(P, {
    bold: !0
  }, E, " MCP Server")), F4.default.createElement(h, {
    flexDirection: "column",
    gap: 0
  }, F4.default.createElement(h, null, F4.default.createElement(P, {
    bold: !0
  }, "Status: "), A.client.type === "connected" ? F4.default.createElement(F4.default.Fragment, null, F4.default.createElement(P, null, V9("success", Z)(A0.tick), " connected"), A.isAuthenticated && F4.default.createElement(P, null, "  ", V9("success", Z)(A0.tick), " authenticated")) : A.client.type === "pending" ? F4.default.createElement(P, null, V9("secondaryText", Z)(A0.radioOff), " connecting…") : A.client.type === "needs-auth" ? F4.default.createElement(P, null, V9("warning", Z)(A0.triangleUpOutline), " needs authentication") : F4.default.createElement(P, null, V9("error", Z)(A0.cross), " failed")), F4.default.createElement(h, null, F4.default.createElement(P, {
    bold: !0
  }, "URL: "), F4.default.createElement(P, {
    color: "secondaryText"
  }, A.config.url)), A.client.type === "connected" && F4.default.createElement(jw1, {
    serverToolsCount: B,
    serverPromptsCount: N,
    serverResourcesCount: X.mcp.resources[A.name]?.length || 0
  }), A.client.type === "connected" && B > 0 && F4.default.createElement(h, null, F4.default.createElement(P, {
    bold: !0
  }, "Tools: "), F4.default.createElement(P, {
    color: "secondaryText"
  }, B, " tools"))), J && F4.default.createElement(h, {
    marginTop: 1
  }, F4.default.createElement(P, {
    color: "error"
  }, "Error: ", J)), T.length > 0 && F4.default.createElement(h, {
    marginTop: 1
  }, F4.default.createElement(p0, {
    options: T,
    onChange: async (L) => {
      switch (L) {
        case "tools":
          Q();
          break;
        case "auth":
        case "reauth":
          await O();
          break;
        case "clear-auth":
          await R();
          break;
        case "back":
          I();
          break
      }
    },
    onCancel: I
  }))), F4.default.createElement(h, {
    marginLeft: 3
  }, F4.default.createElement(P, {
    dimColor: !0
  }, D.pending ? F4.default.createElement(F4.default.Fragment, null, "Press ", D.keyName, " again to exit") : F4.default.createElement(F4.default.Fragment, null, "Esc to go back"))))
}
// @from(Start 9901980, End 9901996)
tD = I1(U1(), 1)
// @from(Start 9901999, End 9903510)
function h0A({
  server: A,
  onSelectTool: B,
  onBack: Q
}) {
  let I = Y2(),
    [G] = d5(),
    Z = tD.default.useMemo(() => {
      if (A.client.type !== "connected") return [];
      return pi(G.mcp.tools, A.name)
    }, [A, G.mcp.tools]),
    D = Z.map((Y, W) => {
      let J = k81(Y.name, A.name),
        F = typeof Y.isConcurrencySafe === "function" && Y.isConcurrencySafe({});
      return {
        label: J,
        value: W.toString(),
        description: F ? "read-only" : void 0,
        descriptionColor: F ? "success" : void 0
      }
    });
  return tD.default.createElement(h, {
    flexDirection: "column"
  }, tD.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1,
    borderStyle: "round"
  }, tD.default.createElement(h, {
    marginBottom: 1
  }, tD.default.createElement(P, {
    bold: !0
  }, "Tools for ", A.name), tD.default.createElement(P, {
    color: "secondaryText"
  }, " (", Z.length, " tools)")), Z.length === 0 ? tD.default.createElement(P, {
    color: "secondaryText"
  }, "No tools available") : tD.default.createElement(p0, {
    options: D,
    onChange: (Y) => {
      let W = parseInt(Y),
        J = Z[W];
      if (J) B(J, W)
    },
    onCancel: Q
  })), tD.default.createElement(h, {
    marginLeft: 3
  }, tD.default.createElement(P, {
    dimColor: !0
  }, I.pending ? tD.default.createElement(tD.default.Fragment, null, "Press ", I.keyName, " again to exit") : tD.default.createElement(tD.default.Fragment, null, "Esc to go back"))))
}
// @from(Start 9903515, End 9903531)
H8 = I1(U1(), 1)
// @from(Start 9903534, End 9906427)
function m0A({
  tool: A,
  server: B,
  onBack: Q
}) {
  let I = Y2(),
    [G, Z] = H8.default.useState("");
  Z0((W, J) => {
    if (J.escape) Q()
  });
  let D = k81(A.name, B.name),
    Y = typeof A.isConcurrencySafe === "function" && A.isConcurrencySafe({});
  return H8.default.useEffect(() => {
    async function W() {
      try {
        let J = await A.description({}, {
          isNonInteractiveSession: !1,
          getToolPermissionContext: () => ({
            mode: "default",
            additionalWorkingDirectories: new Set,
            alwaysAllowRules: {},
            alwaysDenyRules: {},
            isBypassPermissionsModeAvailable: !1
          }),
          tools: []
        });
        Z(J)
      } catch {
        Z("Failed to load description")
      }
    }
    W()
  }, [A]), H8.default.createElement(h, {
    flexDirection: "column"
  }, H8.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1,
    borderStyle: "round"
  }, H8.default.createElement(h, {
    marginBottom: 1
  }, H8.default.createElement(P, {
    bold: !0
  }, D, H8.default.createElement(P, {
    color: "secondaryText"
  }, " (", B.name, ")"), Y && H8.default.createElement(P, {
    color: "success"
  }, " [read-only]"))), H8.default.createElement(h, {
    flexDirection: "column"
  }, H8.default.createElement(h, null, H8.default.createElement(P, {
    bold: !0
  }, "Full name: "), H8.default.createElement(P, {
    color: "secondaryText"
  }, A.name)), G && H8.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, H8.default.createElement(P, {
    bold: !0
  }, "Description:"), H8.default.createElement(P, {
    wrap: "wrap"
  }, G)), A.inputJSONSchema && A.inputJSONSchema.properties && Object.keys(A.inputJSONSchema.properties).length > 0 && H8.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, H8.default.createElement(P, {
    bold: !0
  }, "Parameters:"), H8.default.createElement(h, {
    marginLeft: 2,
    flexDirection: "column"
  }, Object.entries(A.inputJSONSchema.properties).map(([W, J]) => {
    let X = A.inputJSONSchema?.required?.includes(W);
    return H8.default.createElement(P, {
      key: W
    }, "• ", W, X && H8.default.createElement(P, {
      color: "secondaryText"
    }, " (required)"), ":", " ", H8.default.createElement(P, {
      color: "secondaryText"
    }, typeof J === "object" && J && "type" in J ? String(J.type) : "unknown"), typeof J === "object" && J && "description" in J && H8.default.createElement(P, {
      color: "secondaryText"
    }, " ", "- ", String(J.description)))
  }))))), H8.default.createElement(h, {
    marginLeft: 3
  }, H8.default.createElement(P, {
    dimColor: !0
  }, I.pending ? H8.default.createElement(H8.default.Fragment, null, "Press ", I.keyName, " again to exit") : H8.default.createElement(H8.default.Fragment, null, "Esc to go back"))))
}
// @from(Start 9906429, End 9909577)
function d0A({
  onComplete: A
}) {
  let [B] = d5(), Q = B.mcp.clients, [I, G] = NV.default.useState({
    type: "list"
  }), [Z, D] = NV.default.useState([]), Y = NV.default.useMemo(() => Q.filter((W) => W.name !== "ide").sort((W, J) => W.name.localeCompare(J.name)), [Q]);
  switch (NV.default.useEffect(() => {
      async function W() {
        let J = await Promise.all(Y.map(async (F) => {
          let X = F.config.scope,
            V = F.config.type === "sse",
            C = F.config.type === "http",
            K = void 0;
          if (V || C) {
            let q = await new MO(F.name, F.config).tokens();
            K = Boolean(q)
          }
          let E = {
            name: F.name,
            client: F,
            scope: X
          };
          if (V) return {
            ...E,
            transport: "sse",
            isAuthenticated: K,
            config: F.config
          };
          else if (C) return {
            ...E,
            transport: "http",
            isAuthenticated: K,
            config: F.config
          };
          else return {
            ...E,
            transport: "stdio",
            config: F.config
          }
        }));
        D(J)
      }
      W()
    }, [Y]), NV.useEffect(() => {
      if (Z.length === 0 && Y.length > 0) return;
      if (Z.length === 0) A("No MCP servers configured. Run `claude mcp` or visit https://docs.anthropic.com/en/docs/claude-code/mcp to learn more.")
    }, [Z.length, Y.length, A]), I.type) {
    case "list":
      return NV.default.createElement(v0A, {
        servers: Z,
        onSelectServer: (W) => G({
          type: "server-menu",
          server: W
        }),
        onComplete: A
      });
    case "server-menu": {
      let W = pi(B.mcp.tools, I.server.name);
      if (I.server.transport === "stdio") return NV.default.createElement(b0A, {
        server: I.server,
        serverToolsCount: W.length,
        onViewTools: () => G({
          type: "server-tools",
          server: I.server
        }),
        onCancel: () => G({
          type: "list"
        })
      });
      else return NV.default.createElement(g0A, {
        server: I.server,
        serverToolsCount: W.length,
        onViewTools: () => G({
          type: "server-tools",
          server: I.server
        }),
        onCancel: () => G({
          type: "list"
        }),
        onComplete: A
      })
    }
    case "server-tools":
      return NV.default.createElement(h0A, {
        server: I.server,
        onSelectTool: (W, J) => G({
          type: "server-tool-detail",
          server: I.server,
          toolIndex: J
        }),
        onBack: () => G({
          type: "server-menu",
          server: I.server
        })
      });
    case "server-tool-detail": {
      let J = pi(B.mcp.tools, I.server.name)[I.toolIndex];
      if (!J) return G({
        type: "server-tools",
        server: I.server
      }), null;
      return NV.default.createElement(m0A, {
        tool: J,
        server: I.server,
        onBack: () => G({
          type: "server-tools",
          server: I.server
        })
      })
    }
  }
}
// @from(Start 9909582, End 9909867)
iE5 = {
    type: "local-jsx",
    name: "mcp",
    description: "Manage MCP servers",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A) {
      return nS2.default.createElement(d0A, {
        onComplete: A
      })
    },
    userFacingName() {
      return "mcp"
    }
  }
// @from(Start 9909871, End 9909880)
aS2 = iE5
// @from(Start 9909886, End 9909903)
nE5 = I1(U1(), 1)