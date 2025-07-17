
// @from(Start 9909909, End 9911638)
sS2 = {
  type: "prompt",
  name: "pr-comments",
  description: "Get comments from a GitHub pull request",
  progressMessage: "fetching PR comments",
  isEnabled: () => !0,
  isHidden: !1,
  userFacingName() {
    return "pr-comments"
  },
  async getPromptForCommand(A) {
    return [{
      type: "text",
      text: `You are an AI assistant integrated into a git-based version control system. Your task is to fetch and display comments from a GitHub pull request.

Follow these steps:

1. Use \`gh pr view --json number,headRepository\` to get the PR number and repository info
2. Use \`gh api /repos/{owner}/{repo}/issues/{number}/comments\` to get PR-level comments
3. Use \`gh api /repos/{owner}/{repo}/pulls/{number}/comments\` to get review comments. Pay particular attention to the following fields: \`body\`, \`diff_hunk\`, \`path\`, \`line\`, etc. If the comment references some code, consider fetching it using eg \`gh api /repos/{owner}/{repo}/contents/{path}?ref={branch} | jq .content -r | base64 -d\`
4. Parse and format all comments in a readable way
5. Return ONLY the formatted comments, with no additional text

Format the comments as:

## Comments

[For each comment thread:]
- @author file.ts#line:
  \`\`\`diff
  [diff_hunk from the API response]
  \`\`\`
  > quoted comment text
  
  [any replies indented]

If there are no comments, return "No comments found."

Remember:
1. Only show the actual comments, no explanatory text
2. Include both PR-level and code review comments
3. Preserve the threading/nesting of comment replies
4. Show the file and line number context for code review comments
5. Use jq to parse the JSON responses from the GitHub API

${A?"Additional user input: "+A:""}
`
    }]
  }
}
// @from(Start 9911644, End 9911660)
VT = I1(gj(), 1)
// @from(Start 9911666, End 9911673)
aE5 = 5
// @from(Start 9911677, End 9911749)
rS2 = "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
// @from(Start 9911753, End 9911846)
sE5 = "https://raw.githubusercontent.com/anthropics/claude-code/refs/heads/main/CHANGELOG.md"
// @from(Start 9911848, End 9912047)
async function u0A() {
  let A = await P4.get(sE5);
  if (A.status === 200) {
    let B = ZA();
    j0({
      ...B,
      cachedChangelog: A.data,
      changelogLastFetched: Date.now()
    })
  }
}
// @from(Start 9912049, End 9912103)
function sA1() {
  return ZA().cachedChangelog ?? ""
}
// @from(Start 9912105, End 9912697)
function oS2(A) {
  try {
    if (!A) return {};
    let B = {},
      Q = A.split(/^## /gm).slice(1);
    for (let I of Q) {
      let G = I.trim().split(`
`);
      if (G.length === 0) continue;
      let Z = G[0];
      if (!Z) continue;
      let D = Z.split(" - ")[0]?.trim() || "";
      if (!D) continue;
      let Y = G.slice(1).filter((W) => W.trim().startsWith("- ")).map((W) => W.trim().substring(2).trim()).filter(Boolean);
      if (Y.length > 0) B[D] = Y
    }
    return B
  } catch (B) {
    return b1(B instanceof Error ? B : new Error("Failed to parse changelog")), {}
  }
}
// @from(Start 9912699, End 9913201)
function rE5(A, B, Q = sA1()) {
  try {
    let I = oS2(Q),
      G = VT.coerce(A),
      Z = B ? VT.coerce(B) : null;
    if (!Z || G && VT.gt(G, Z, {
        loose: !0
      })) return Object.entries(I).filter(([D]) => !Z || VT.gt(D, Z, {
      loose: !0
    })).sort(([D], [Y]) => VT.gt(D, Y, {
      loose: !0
    }) ? -1 : 1).flatMap(([D, Y]) => Y).filter(Boolean).slice(0, aE5)
  } catch (I) {
    return b1(I instanceof Error ? I : new Error("Failed to get release notes")), []
  }
  return []
}
// @from(Start 9913203, End 9913654)
function p0A(A = sA1()) {
  try {
    let B = oS2(A);
    return Object.keys(B).sort((I, G) => VT.gt(I, G, {
      loose: !0
    }) ? 1 : -1).map((I) => {
      let G = B[I];
      if (!G || G.length === 0) return null;
      let Z = G.filter(Boolean);
      if (Z.length === 0) return null;
      return [I, Z]
    }).filter((I) => I !== null)
  } catch (B) {
    return b1(B instanceof Error ? B : new Error("Failed to get release notes")), []
  }
}
// @from(Start 9913656, End 9914111)
function yw1(A, B = {
  ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
  PACKAGE_URL: "@anthropic-ai/claude-code",
  README_URL: "https://docs.anthropic.com/s/claude-code",
  VERSION: "1.0.34"
}.VERSION) {
  if (A !== B || !sA1()) u0A().catch((G) => b1(G instanceof Error ? G : new Error("Failed to fetch changelog")));
  let Q = rE5(B, A);
  return {
    hasReleaseNotes: Q.length > 0,
    releaseNotes: Q
  }
}
// @from(Start 9914113, End 9914273)
function tS2(A) {
  return A.map(([B, Q]) => {
    let I = `Version ${B}:`,
      G = Q.map((Z) => `• ${Z}`).join(`
`);
    return `${I}
${G}`
  }).join(`

`)
}
// @from(Start 9914278, End 9914860)
oE5 = {
    description: "View release notes",
    isEnabled: () => !0,
    isHidden: !1,
    name: "release-notes",
    userFacingName() {
      return "release-notes"
    },
    type: "local",
    async call() {
      let A = [];
      try {
        let Q = new Promise((I, G) => {
          setTimeout(() => G(new Error("Timeout")), 500)
        });
        await Promise.race([u0A(), Q]), A = p0A(sA1())
      } catch {}
      if (A.length > 0) return tS2(A);
      let B = p0A();
      if (B.length > 0) return tS2(B);
      return `See the full changelog at: ${rS2}`
    }
  }
// @from(Start 9914864, End 9914873)
eS2 = oE5
// @from(Start 9914879, End 9914895)
PE = I1(U1(), 1)
// @from(Start 9914901, End 9914917)
WF = I1(U1(), 1)
// @from(Start 9914920, End 9916481)
function rA1({
  logs: A,
  maxHeight: B = 1 / 0,
  onCancel: Q,
  onSelect: I
}) {
  let {
    columns: G
  } = c9();
  if (A.length === 0) return null;
  let Z = B - 3,
    D = Math.max(0, A.length - Z),
    Y = 12,
    W = 12,
    J = 10,
    F = A.map((V) => {
      let C = lf1(V.modified).padEnd(Y),
        K = lf1(V.created).padEnd(W),
        E = `${V.messageCount}`.padStart(J),
        N = V.summary || V.firstPrompt,
        q = V.isSidechain ? " (sidechain)" : "",
        O = `${C}${K}${E} ${N}${q}`;
      return {
        label: O.length > G - 2 ? `${O.slice(0,G-5)}...` : O,
        value: V.value.toString()
      }
    }),
    X = A.length.toString().length;
  return WF.default.createElement(h, {
    flexDirection: "column",
    height: B - 1
  }, WF.default.createElement(h, {
    paddingLeft: 3 + X
  }, WF.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "Modified"), WF.default.createElement(P, null, "    "), WF.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "Created"), WF.default.createElement(P, null, "     "), WF.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "# Messages"), WF.default.createElement(P, null, " "), WF.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "Summary")), WF.default.createElement(p0, {
    options: F,
    onChange: (V) => I(parseInt(V, 10)),
    visibleOptionCount: Z,
    onCancel: Q
  }), D > 0 && WF.default.createElement(h, {
    paddingLeft: 2
  }, WF.default.createElement(P, {
    color: "secondaryText"
  }, "and ", D, " more…")))
}
// @from(Start 9916483, End 9917347)
function tE5({
  onDone: A,
  onResume: B
}) {
  let [Q, I] = PE.useState([]), [G, Z] = PE.useState(!0);
  PE.useEffect(() => {
    async function J() {
      try {
        let F = await Hg();
        if (F.length === 0) A("No conversations found to resume");
        else I(F)
      } catch (F) {
        A("Failed to load conversations")
      } finally {
        Z(!1)
      }
    }
    J()
  }, [A]);
  async function D(J) {
    let F = Q[J];
    if (!F) {
      A("Failed to load selected conversation");
      return
    }
    let X = fC(F.messages.find((V) => V.sessionId)?.sessionId);
    if (!X) {
      A("Failed to resume conversation");
      return
    }
    B(X, F)
  }

  function Y() {
    A()
  }
  if (G) return null;
  let W = Q.filter((J) => !J.isSidechain);
  return PE.createElement(rA1, {
    logs: W,
    onCancel: Y,
    onSelect: D
  })
}
// @from(Start 9917352, End 9917758)
eE5 = {
    type: "local-jsx",
    name: "resume",
    description: "Resume a conversation",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, B) {
      return PE.createElement(tE5, {
        onDone: A,
        onResume: (I, G) => {
          B.resume?.(I, G), A(void 0, {
            skipMessage: !0
          })
        }
      })
    },
    userFacingName() {
      return "resume"
    }
  }
// @from(Start 9917762, End 9917771)
A_2 = eE5
// @from(Start 9917777, End 9918957)
kw1 = {
  type: "prompt",
  name: "review",
  description: "Review a pull request",
  isEnabled: () => !0,
  isHidden: !1,
  progressMessage: "reviewing pull request",
  userFacingName() {
    return "review"
  },
  async getPromptForCommand(A) {
    return [{
      type: "text",
      text: `
      You are an expert code reviewer. Follow these steps:

      1. If no PR number is provided in the args, use ${E4.name}("gh pr list") to show open PRs
      2. If a PR number is provided, use ${E4.name}("gh pr view <number>") to get PR details
      3. Use ${E4.name}("gh pr diff <number>") to get the diff
      4. Analyze the changes and provide a thorough code review that includes:
         - Overview of what the PR does
         - Analysis of code quality and style
         - Specific suggestions for improvements
         - Any potential issues or risks
      
      Keep your review concise but thorough. Focus on:
      - Code correctness
      - Following project conventions
      - Performance implications
      - Test coverage
      - Security considerations

      Format your review with clear sections and bullet points.

      PR number: ${A}
    `
    }]
  }
}
// @from(Start 9918963, End 9918980)
fU5 = I1(U1(), 1)
// @from(Start 9918986, End 9919003)
s0A = I1(U1(), 1)
// @from(Start 9919009, End 9919019)
DHB = x1()
// @from(Start 9919025, End 9919041)
a$ = I1(U1(), 1)
// @from(Start 9919047, End 9919090)
AU5 = Math.pow(10, 8) * 24 * 60 * 60 * 1000
// @from(Start 9919094, End 9919104)
WHB = -AU5
// @from(Start 9919110, End 9919121)
oA1 = 43200
// @from(Start 9919125, End 9919135)
c0A = 1440
// @from(Start 9919141, End 9919178)
l0A = Symbol.for("constructDateFrom")
// @from(Start 9919181, End 9919385)
function zp(A, B) {
  if (typeof A === "function") return A(B);
  if (A && typeof A === "object" && l0A in A) return A[l0A](B);
  if (A instanceof Date) return new A.constructor(B);
  return new Date(B)
}
// @from(Start 9919387, End 9919431)
function OW(A, B) {
  return zp(B || A, A)
}
// @from(Start 9919436, End 9919444)
BU5 = {}
// @from(Start 9919447, End 9919478)
function B_2() {
  return BU5
}
// @from(Start 9919480, End 9919707)
function i0A(A) {
  let B = OW(A),
    Q = new Date(Date.UTC(B.getFullYear(), B.getMonth(), B.getDate(), B.getHours(), B.getMinutes(), B.getSeconds(), B.getMilliseconds()));
  return Q.setUTCFullYear(B.getFullYear()), +A - +Q
}
// @from(Start 9919709, End 9919819)
function wp(A, ...B) {
  let Q = zp.bind(null, A || B.find((I) => typeof I === "object"));
  return B.map(Q)
}
// @from(Start 9919821, End 9919932)
function Ep(A, B) {
  let Q = +OW(A) - +OW(B);
  if (Q < 0) return -1;
  else if (Q > 0) return 1;
  return Q
}
// @from(Start 9919934, End 9919980)
function Q_2(A) {
  return zp(A, Date.now())
}
// @from(Start 9919982, End 9920131)
function I_2(A, B, Q) {
  let [I, G] = wp(Q?.in, A, B), Z = I.getFullYear() - G.getFullYear(), D = I.getMonth() - G.getMonth();
  return Z * 12 + D
}
// @from(Start 9920133, End 9920244)
function G_2(A) {
  return (B) => {
    let I = (A ? Math[A] : Math.trunc)(B);
    return I === 0 ? 0 : I
  }
}
// @from(Start 9920246, End 9920293)
function Z_2(A, B) {
  return +OW(A) - +OW(B)
}
// @from(Start 9920295, End 9920381)
function D_2(A, B) {
  let Q = OW(A, B?.in);
  return Q.setHours(23, 59, 59, 999), Q
}
// @from(Start 9920383, End 9920533)
function Y_2(A, B) {
  let Q = OW(A, B?.in),
    I = Q.getMonth();
  return Q.setFullYear(Q.getFullYear(), I + 1, 0), Q.setHours(23, 59, 59, 999), Q
}
// @from(Start 9920535, End 9920616)
function W_2(A, B) {
  let Q = OW(A, B?.in);
  return +D_2(Q, B) === +Y_2(Q, B)
}
// @from(Start 9920618, End 9920967)
function J_2(A, B, Q) {
  let [I, G, Z] = wp(Q?.in, A, A, B), D = Ep(G, Z), Y = Math.abs(I_2(G, Z));
  if (Y < 1) return 0;
  if (G.getMonth() === 1 && G.getDate() > 27) G.setDate(30);
  G.setMonth(G.getMonth() - D * Y);
  let W = Ep(G, Z) === -D;
  if (W_2(I) && Y === 1 && Ep(I, Z) === 1) W = !1;
  let J = D * (Y - +W);
  return J === 0 ? 0 : J
}
// @from(Start 9920969, End 9921057)
function F_2(A, B, Q) {
  let I = Z_2(A, B) / 1000;
  return G_2(Q?.roundingMethod)(I)
}
// @from(Start 9921062, End 9922386)
QU5 = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  }
// @from(Start 9922390, End 9922692)
X_2 = (A, B, Q) => {
    let I, G = QU5[A];
    if (typeof G === "string") I = G;
    else if (B === 1) I = G.one;
    else I = G.other.replace("{{count}}", B.toString());
    if (Q?.addSuffix)
      if (Q.comparison && Q.comparison > 0) return "in " + I;
      else return I + " ago";
    return I
  }
// @from(Start 9922695, End 9922850)
function xw1(A) {
  return (B = {}) => {
    let Q = B.width ? String(B.width) : A.defaultWidth;
    return A.formats[Q] || A.formats[A.defaultWidth]
  }
}
// @from(Start 9922855, End 9922968)
IU5 = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }
// @from(Start 9922972, End 9923081)
GU5 = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }
// @from(Start 9923085, End 9923234)
ZU5 = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }
// @from(Start 9923238, End 9923465)
V_2 = {
    date: xw1({
      formats: IU5,
      defaultWidth: "full"
    }),
    time: xw1({
      formats: GU5,
      defaultWidth: "full"
    }),
    dateTime: xw1({
      formats: ZU5,
      defaultWidth: "full"
    })
  }
// @from(Start 9923471, End 9923657)
DU5 = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }
// @from(Start 9923661, End 9923689)
C_2 = (A, B, Q, I) => DU5[A]
// @from(Start 9923692, End 9924233)
function Up(A) {
  return (B, Q) => {
    let I = Q?.context ? String(Q.context) : "standalone",
      G;
    if (I === "formatting" && A.formattingValues) {
      let D = A.defaultFormattingWidth || A.defaultWidth,
        Y = Q?.width ? String(Q.width) : D;
      G = A.formattingValues[Y] || A.formattingValues[D]
    } else {
      let D = A.defaultWidth,
        Y = Q?.width ? String(Q.width) : A.defaultWidth;
      G = A.values[Y] || A.values[D]
    }
    let Z = A.argumentCallback ? A.argumentCallback(B) : B;
    return G[Z]
  }
}
// @from(Start 9924238, End 9924347)
YU5 = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }
// @from(Start 9924351, End 9924510)
WU5 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }
// @from(Start 9924514, End 9924835)
JU5 = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }
// @from(Start 9924839, End 9925111)
FU5 = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }
// @from(Start 9925115, End 9925733)
XU5 = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  }
// @from(Start 9925737, End 9926427)
VU5 = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  }
// @from(Start 9926431, End 9926680)
CU5 = (A, B) => {
    let Q = Number(A),
      I = Q % 100;
    if (I > 20 || I < 10) switch (I % 10) {
      case 1:
        return Q + "st";
      case 2:
        return Q + "nd";
      case 3:
        return Q + "rd"
    }
    return Q + "th"
  }
// @from(Start 9926684, End 9927175)
K_2 = {
    ordinalNumber: CU5,
    era: Up({
      values: YU5,
      defaultWidth: "wide"
    }),
    quarter: Up({
      values: WU5,
      defaultWidth: "wide",
      argumentCallback: (A) => A - 1
    }),
    month: Up({
      values: JU5,
      defaultWidth: "wide"
    }),
    day: Up({
      values: FU5,
      defaultWidth: "wide"
    }),
    dayPeriod: Up({
      values: XU5,
      defaultWidth: "wide",
      formattingValues: VU5,
      defaultFormattingWidth: "wide"
    })
  }
// @from(Start 9927178, End 9927729)
function Np(A) {
  return (B, Q = {}) => {
    let I = Q.width,
      G = I && A.matchPatterns[I] || A.matchPatterns[A.defaultMatchWidth],
      Z = B.match(G);
    if (!Z) return null;
    let D = Z[0],
      Y = I && A.parsePatterns[I] || A.parsePatterns[A.defaultParseWidth],
      W = Array.isArray(Y) ? HU5(Y, (X) => X.test(D)) : KU5(Y, (X) => X.test(D)),
      J;
    J = A.valueCallback ? A.valueCallback(W) : W, J = Q.valueCallback ? Q.valueCallback(J) : J;
    let F = B.slice(D.length);
    return {
      value: J,
      rest: F
    }
  }
}
// @from(Start 9927731, End 9927854)
function KU5(A, B) {
  for (let Q in A)
    if (Object.prototype.hasOwnProperty.call(A, Q) && B(A[Q])) return Q;
  return
}
// @from(Start 9927856, End 9927951)
function HU5(A, B) {
  for (let Q = 0; Q < A.length; Q++)
    if (B(A[Q])) return Q;
  return
}
// @from(Start 9927953, End 9928332)
function H_2(A) {
  return (B, Q = {}) => {
    let I = B.match(A.matchPattern);
    if (!I) return null;
    let G = I[0],
      Z = B.match(A.parsePattern);
    if (!Z) return null;
    let D = A.valueCallback ? A.valueCallback(Z[0]) : Z[0];
    D = Q.valueCallback ? Q.valueCallback(D) : D;
    let Y = B.slice(G.length);
    return {
      value: D,
      rest: Y
    }
  }
}
// @from(Start 9928337, End 9928366)
zU5 = /^(\d+)(th|st|nd|rd)?/i
// @from(Start 9928370, End 9928382)
wU5 = /\d+/i
// @from(Start 9928386, End 9928570)
EU5 = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }
// @from(Start 9928574, End 9928613)
UU5 = {
    any: [/^b/i, /^(a|c)/i]
  }
// @from(Start 9928617, End 9928725)
NU5 = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }
// @from(Start 9928729, End 9928774)
$U5 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }
// @from(Start 9928778, End 9928991)
qU5 = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }
// @from(Start 9928995, End 9929209)
MU5 = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  }
// @from(Start 9929213, End 9929413)
LU5 = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }
// @from(Start 9929417, End 9929554)
RU5 = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }
// @from(Start 9929558, End 9929733)
OU5 = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }
// @from(Start 9929737, End 9929950)
TU5 = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  }
// @from(Start 9929954, End 9930827)
z_2 = {
    ordinalNumber: H_2({
      matchPattern: zU5,
      parsePattern: wU5,
      valueCallback: (A) => parseInt(A, 10)
    }),
    era: Np({
      matchPatterns: EU5,
      defaultMatchWidth: "wide",
      parsePatterns: UU5,
      defaultParseWidth: "any"
    }),
    quarter: Np({
      matchPatterns: NU5,
      defaultMatchWidth: "wide",
      parsePatterns: $U5,
      defaultParseWidth: "any",
      valueCallback: (A) => A + 1
    }),
    month: Np({
      matchPatterns: qU5,
      defaultMatchWidth: "wide",
      parsePatterns: MU5,
      defaultParseWidth: "any"
    }),
    day: Np({
      matchPatterns: LU5,
      defaultMatchWidth: "wide",
      parsePatterns: RU5,
      defaultParseWidth: "any"
    }),
    dayPeriod: Np({
      matchPatterns: OU5,
      defaultMatchWidth: "any",
      parsePatterns: TU5,
      defaultParseWidth: "any"
    })
  }
// @from(Start 9930833, End 9931022)
n0A = {
  code: "en-US",
  formatDistance: X_2,
  formatLong: V_2,
  formatRelative: C_2,
  localize: K_2,
  match: z_2,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}
// @from(Start 9931025, End 9932843)
function w_2(A, B, Q) {
  let I = B_2(),
    G = Q?.locale ?? I.locale ?? n0A,
    Z = 2520,
    D = Ep(A, B);
  if (isNaN(D)) throw new RangeError("Invalid time value");
  let Y = Object.assign({}, Q, {
      addSuffix: Q?.addSuffix,
      comparison: D
    }),
    [W, J] = wp(Q?.in, ...D > 0 ? [B, A] : [A, B]),
    F = F_2(J, W),
    X = (i0A(J) - i0A(W)) / 1000,
    V = Math.round((F - X) / 60),
    C;
  if (V < 2)
    if (Q?.includeSeconds)
      if (F < 5) return G.formatDistance("lessThanXSeconds", 5, Y);
      else if (F < 10) return G.formatDistance("lessThanXSeconds", 10, Y);
  else if (F < 20) return G.formatDistance("lessThanXSeconds", 20, Y);
  else if (F < 40) return G.formatDistance("halfAMinute", 0, Y);
  else if (F < 60) return G.formatDistance("lessThanXMinutes", 1, Y);
  else return G.formatDistance("xMinutes", 1, Y);
  else if (V === 0) return G.formatDistance("lessThanXMinutes", 1, Y);
  else return G.formatDistance("xMinutes", V, Y);
  else if (V < 45) return G.formatDistance("xMinutes", V, Y);
  else if (V < 90) return G.formatDistance("aboutXHours", 1, Y);
  else if (V < c0A) {
    let K = Math.round(V / 60);
    return G.formatDistance("aboutXHours", K, Y)
  } else if (V < 2520) return G.formatDistance("xDays", 1, Y);
  else if (V < oA1) {
    let K = Math.round(V / c0A);
    return G.formatDistance("xDays", K, Y)
  } else if (V < oA1 * 2) return C = Math.round(V / oA1), G.formatDistance("aboutXMonths", C, Y);
  if (C = J_2(J, W), C < 12) {
    let K = Math.round(V / oA1);
    return G.formatDistance("xMonths", K, Y)
  } else {
    let K = C % 12,
      E = Math.trunc(C / 12);
    if (K < 3) return G.formatDistance("aboutXYears", E, Y);
    else if (K < 9) return G.formatDistance("overXYears", E, Y);
    else return G.formatDistance("almostXYears", E + 1, Y)
  }
}
// @from(Start 9932845, End 9932894)
function E_2(A, B) {
  return w_2(A, Q_2(A), B)
}
// @from(Start 9932899, End 9933521)
OzB = a$.default.memo(function A({
  session: B,
  isSelected: Q,
  index: I
}) {
  let G = PU5(B.status),
    Z = SU5(B.status);
  return a$.default.createElement(h, null, a$.default.createElement(P, {
    inverse: Q
  }, a$.default.createElement(P, {
    color: Q ? "text" : "secondaryText"
  }, "[", I + 1, "]"), " ", a$.default.createElement(P, {
    color: G
  }, Z), " ", a$.default.createElement(P, {
    bold: Q
  }, B.name), " ", a$.default.createElement(P, {
    dimColor: !Q
  }, "(", B.status, ")"), " ", a$.default.createElement(P, {
    dimColor: !Q
  }, "- ", E_2(B.updatedAt, {
    addSuffix: !0
  }))))
})
// @from(Start 9933524, End 9933897)
function PU5(A) {
  switch (A) {
    case "pending":
    case "queued":
      return "warning";
    case "in_progress":
      return "permission";
    case "completed":
      return "success";
    case "failed":
      return "error";
    case "cancelled":
      return "secondaryText";
    case "timed_out":
      return "autoAccept";
    default:
      return "text"
  }
}
// @from(Start 9933899, End 9934317)
function SU5(A) {
  switch (A) {
    case "pending":
      return A0.circle;
    case "queued":
      return A0.circleDotted;
    case "in_progress":
      return A0.circleFilled;
    case "completed":
      return A0.tick;
    case "failed":
      return A0.cross;
    case "cancelled":
      return A0.circleCircle;
    case "timed_out":
      return A0.warning;
    default:
      return A0.questionMarkPrefix
  }
}
// @from(Start 9934322, End 9934339)
a0A = I1(U1(), 1)
// @from(Start 9934345, End 9934362)
U_2 = I1(U1(), 1)
// @from(Start 9934368, End 9934384)
by = I1(U1(), 1)
// @from(Start 9934387, End 9934865)
function yU5({
  width: A = "auto",
  dividerChar: B,
  dividerColor: Q = "secondaryText",
  boxProps: I
}) {
  return by.default.createElement(h, {
    width: A,
    borderStyle: {
      topLeft: "",
      top: "",
      topRight: "",
      right: "",
      bottomRight: "",
      bottom: B || "─",
      bottomLeft: "",
      left: ""
    },
    borderColor: Q,
    flexGrow: 1,
    borderBottom: !0,
    borderTop: !1,
    borderLeft: !1,
    borderRight: !1,
    ...I
  })
}
// @from(Start 9934867, End 9935467)
function kU5({
  title: A,
  width: B = "auto",
  padding: Q = 0,
  titlePadding: I = 1,
  titleColor: G = "text",
  dividerChar: Z = "─",
  dividerColor: D = "secondaryText",
  boxProps: Y
}) {
  let W = by.default.createElement(yU5, {
    dividerChar: Z,
    dividerColor: D,
    boxProps: Y
  });
  if (!A) return by.default.createElement(h, {
    paddingLeft: Q,
    paddingRight: Q
  }, W);
  return by.default.createElement(h, {
    width: B,
    paddingLeft: Q,
    paddingRight: Q,
    gap: I
  }, W, by.default.createElement(h, null, by.default.createElement(P, {
    color: G
  }, A)), W)
}
// @from(Start 9935472, End 9935480)
$p = kU5
// @from(Start 9935486, End 9935502)
rK = I1(U1(), 1)
// @from(Start 9935508, End 9935524)
s4 = I1(U1(), 1)
// @from(Start 9935527, End 9935870)
function vU5(A, B, Q) {
  let I = z_(A);
  if (A === null && T9()) {
    let G = NG1();
    if (B) {
      let Z = Q ? ` · Resets at ${zg(Q,!0)}` : "";
      I = `${UA.bold("Default")} ${G} (currently Sonnet${Z})`
    } else if (qZ()) I = `${UA.bold("Default")} ${G} (currently Opus)`;
    else I = `${UA.bold("Sonnet")} ${G}`
  }
  return I
}
// @from(Start 9935872, End 9937538)
function N_2({
  sections: A,
  version: B,
  onClose: Q
}) {
  Z0((W, J) => {
    if (J.return || J.escape) Q()
  });
  let I = Y2(Q),
    [{
      mainLoopModel: G,
      maxRateLimitFallbackActive: Z
    }] = d5(),
    D = Hu(),
    Y = vU5(G, Z, D.resetsAt);
  return A = [...A, {
    title: "Model",
    command: "/model",
    items: [{
      label: Y,
      type: "info"
    }]
  }], s4.createElement(h, {
    flexDirection: "column",
    width: "100%",
    padding: 1
  }, s4.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, s4.createElement(h, null, s4.createElement(P, {
    bold: !0
  }, "Claude Code Status "), s4.createElement(P, {
    color: "secondaryText"
  }, "v", B)), s4.createElement(h, null, s4.createElement(P, {
    color: "secondaryText"
  }, " L "), s4.createElement(P, null, "Session ID: ", y9())), A.map((W, J) => (W.items && W.items.length > 0 || W.content) && s4.createElement(h, {
    key: J,
    flexDirection: "column",
    gap: 0
  }, s4.createElement(h, null, s4.createElement(P, {
    bold: !0
  }, W.title, " "), W.command && s4.createElement(P, {
    color: "secondaryText"
  }, "• ", W.command)), W.items?.map((F, X) => s4.createElement(h, {
    key: X
  }, F.type === "check" ? s4.createElement(P, {
    color: "success"
  }, A0.tick, " ") : F.type === "error" ? s4.createElement(P, {
    color: "error"
  }, A0.warning, " ") : s4.createElement(P, {
    color: "secondaryText"
  }, " L "), s4.createElement(P, null, F.label))), W.content)), s4.createElement(h, {
    marginTop: 1
  }, I.pending ? s4.createElement(P, {
    dimColor: !0
  }, "Press ", I.keyName, " again to exit") : s4.createElement(bw, null))))
}
// @from(Start 9937540, End 9938937)
function bU5(A, B = null) {
  if (!KK() || !mA.terminal) return null;
  let Q = A?.find((Z) => Z.name === "ide"),
    I = ft(mA.terminal),
    G = [];
  if (Q)
    if (Q.type === "connected") G.push({
      label: `Connected to ${I} extension`,
      type: "check"
    });
    else G.push({
      label: `Not connected to ${I}`,
      type: "error"
    });
  if (B && B.installed)
    if (B && Q && Q.type === "connected" && B.installedVersion !== Q.serverInfo?.version) G.push({
      label: `Installed ${I} extension version ${B.installedVersion} (server version: ${Q.serverInfo?.version})`,
      type: "info"
    });
    else if (hZ && Q?.type !== "connected") G.push({
    label: `Installed ${I} plugin but connection is not established.
Please restart your IDE or try installing from https://docs.anthropic.com/s/claude-code-jetbrains`,
    type: "info"
  });
  else G.push({
    label: `Installed ${I} extension`,
    type: "check"
  });
  if (B && B.error)
    if (hZ) G.push({
      label: `Error installing ${I} plugin: ${B.error}
Please restart your IDE or try installing from https://docs.anthropic.com/s/claude-code-jetbrains`,
      type: "error"
    });
    else G.push({
      label: `Error installing ${I} extension: ${B.error}
Please restart your IDE and try again.`,
      type: "error"
    });
  return {
    title: "IDE Integration",
    command: "/config",
    items: G
  }
}
// @from(Start 9938939, End 9939279)
function gU5(A = []) {
  let B = [];
  if (A.filter((I) => I.name !== "ide").forEach((I) => {
      B.push({
        label: I.name,
        type: I.type === "failed" ? "error" : I.type === "pending" ? "info" : "check"
      })
    }), B.length === 0) return null;
  return {
    title: "MCP servers",
    command: "/mcp",
    items: B
  }
}
// @from(Start 9939281, End 9939913)
function hU5(A) {
  let B = NH1(),
    Q = dG(),
    I = lO();
  if (Q.length === 0 && B.length === 0 && !I) return null;
  let G = [];
  if (B.forEach((Z) => {
      let D = p81(Z.path);
      G.push({
        label: `Large ${D} will impact performance (${_G(Z.content.length)} chars > ${_G(k11)})`,
        type: "error"
      })
    }), I && I.content.length > Uu) G.push({
    label: `ULTRACLAUDE.md file exceeds ${_G(Uu)} characters (${_G(I.content.length)} chars)`,
    type: "error"
  });
  return {
    title: "Memory",
    command: "/memory",
    items: G,
    content: rK.createElement(Mw1, {
      context: A
    })
  }
}
// @from(Start 9939915, End 9940084)
function mU5() {
  let A = [],
    B = dA();
  return A.push({
    label: B,
    type: "info"
  }), {
    title: "Working Directory",
    command: "",
    items: A
  }
}
// @from(Start 9940085, End 9940295)
async function dU5() {
  let A = await Jp();
  if (A.length === 0) return null;
  return {
    title: "Installation",
    command: "",
    items: A.map((Q) => ({
      label: Q,
      type: "info"
    }))
  }
}
// @from(Start 9940297, End 9941324)
function uU5() {
  if (MQ() !== "firstParty") return null;
  let B = [],
    {
      source: Q
    } = h31();
  if (T9()) B.push({
    label: `Login Method: ${m31()} Account`,
    type: "info"
  });
  else B.push({
    label: `Auth Token: ${Q}`,
    type: "info"
  });
  let {
    key: I,
    source: G
  } = GX(!1);
  if (I) B.push({
    label: `API Key: ${G}`,
    type: "info"
  });
  if (Q === "claude.ai" || G === "/login managed key") {
    let D = ZA().oauthAccount?.organizationName;
    if (D) B.push({
      label: `Organization: ${D}`,
      type: "info"
    })
  }
  if (Q !== "claude.ai") {
    if (j11()) B.push({
      label: "Development Partner Program • sharing session with Anthropic",
      type: "info"
    })
  }
  let Z = ZA().oauthAccount?.emailAddress;
  if ((Q === "claude.ai" || G === "/login managed key") && Z) B.push({
    label: `Email: ${Z}`,
    type: "info"
  });
  return {
    title: "Account",
    command: Q === "claude.ai" || G === "/login managed key" ? "/login" : "",
    items: B
  }
}
// @from(Start 9941326, End 9941358)
function pU5() {
  return null
}
// @from(Start 9941360, End 9942806)
function cU5() {
  let A = MQ(),
    B = [];
  if (A !== "firstParty") {
    let I = {
      bedrock: "AWS Bedrock",
      vertex: "Google Vertex AI"
    } [A];
    B.push({
      label: `API Provider: ${I}`,
      type: "info"
    })
  }
  if (A === "firstParty") {
    let I = process.env.ANTHROPIC_BASE_URL;
    if (I) B.push({
      label: `Anthropic Base URL: ${I}`,
      type: "info"
    })
  } else if (A === "bedrock") {
    let I = process.env.BEDROCK_BASE_URL;
    if (I) B.push({
      label: `Bedrock Base URL: ${I}`,
      type: "info"
    });
    if (B.push({
        label: `AWS Region: ${Xg()}`,
        type: "info"
      }), process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH) B.push({
      label: "AWS auth skipped",
      type: "info"
    })
  } else if (A === "vertex") {
    let I = process.env.VERTEX_BASE_URL;
    if (I) B.push({
      label: `Vertex Base URL: ${I}`,
      type: "info"
    });
    let G = process.env.ANTHROPIC_VERTEX_PROJECT_ID;
    if (G) B.push({
      label: `GCP Project: ${G}`,
      type: "info"
    });
    if (B.push({
        label: `Default region: ${sL()}`,
        type: "info"
      }), process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH) B.push({
      label: "GCP auth skipped",
      type: "info"
    })
  }
  let Q = zm();
  if (Q) B.push({
    label: `Proxy: ${Q}`,
    type: "info"
  });
  if (B.length === 0) return null;
  return {
    title: "API Configuration",
    command: "",
    items: B
  }
}
// @from(Start 9942808, End 9943815)
function lU5({
  onClose: A,
  ideInstallationStatus: B,
  context: Q
}) {
  let [I] = d5(), [G, Z] = rK.useState([]), D = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.34"
  }.VERSION;
  return rK.useEffect(() => {
    async function Y() {
      let W = await ZF(),
        J = [],
        F = mU5();
      if (F) J.push(F);
      if (W) {
        let q = await dU5();
        if (q) J.push(q)
      }
      let X = bU5(I.mcp.clients, B);
      if (X) J.push(X);
      let V = gU5(I.mcp.clients);
      if (V) J.push(V);
      let C = uU5(),
        K = cU5();
      if (C) J.push(C);
      if (K) J.push(K);
      let E = hU5(Q);
      if (E) J.push(E);
      let N = pU5();
      if (N) J.push(N);
      Z(J)
    }
    Y()
  }, [I.mcp.clients, B, Q]), rK.createElement(N_2, {
    sections: G,
    version: D,
    onClose: A
  })
}
// @from(Start 9943820, End 9944262)
iU5 = {
    type: "local-jsx",
    name: "status",
    description: "Show Claude Code status including version, model, account, API connectivity, and tool statuses",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, B) {
      return rK.createElement(lU5, {
        onClose: A,
        ideInstallationStatus: B.options.ideInstallationStatus,
        context: B
      })
    },
    userFacingName() {
      return "status"
    }
  }
// @from(Start 9944266, End 9944275)
$_2 = iU5
// @from(Start 9944281, End 9944298)
r0A = I1(U1(), 1)
// @from(Start 9944304, End 9944320)
aG = I1(U1(), 1)
// @from(Start 9944324, End 9944341)
fw1 = I1(U1(), 1)
// @from(Start 9944347, End 9944363)
qp = I1(U1(), 1)
// @from(Start 9944366, End 9944672)
function Mp() {
  let [A, B] = qp.useState([]), Q = qp.useCallback(() => {
    B(XE.getAllShells())
  }, []);
  return qp.useEffect(() => {
    Q();
    let I = XE.subscribe(() => {
      Q()
    });
    return () => {
      I()
    }
  }, [Q]), {
    shells: A,
    killShell: (I) => XE.killShell(I)
  }
}
// @from(Start 9944677, End 9944693)
l6 = I1(U1(), 1)
// @from(Start 9944697, End 9944714)
tA1 = I1(U1(), 1)
// @from(Start 9944717, End 9949229)
function q_2({
  shell: A,
  onDone: B,
  onKillShell: Q
}) {
  let [I, G] = tA1.useState(0), [Z, D] = tA1.useState({
    stdout: "",
    stderr: "",
    stdoutLines: 0,
    stderrLines: 0
  });
  Z0((F, X) => {
    if (X.escape) B();
    else if (F === "k" && A.status === "running" && Q) Q()
  });
  let Y = Y2(),
    W = (F) => {
      let X = Math.floor((Date.now() - F) / 1000),
        V = Math.floor(X / 3600),
        C = Math.floor((X - V * 3600) / 60),
        K = X - V * 3600 - C * 60;
      return `${V>0?`${V}h `:""}${C>0||V>0?`${C}m `:""}${K}s`
    };
  tA1.useEffect(() => {
    let F = XE.getShellOutput(A.id),
      X = (O, R, T = 10) => {
        if (!R) return O;
        let L = O.split(`
`),
          _ = R.split(`
`);
        return [...L, ..._].slice(-T).join(`
`)
      },
      V = X(Z.stdout, F.stdout),
      C = X(Z.stderr, F.stderr),
      {
        totalLines: K,
        truncatedContent: E
      } = bO(V),
      {
        totalLines: N,
        truncatedContent: q
      } = bO(C);
    if (D({
        stdout: E,
        stderr: q,
        stdoutLines: K,
        stderrLines: N
      }), A.status === "running") {
      let O = setTimeout(() => {
        G((R) => R + 1)
      }, 1000);
      return () => clearTimeout(O)
    }
  }, [A.id, A.status, I, Z.stdout, Z.stderr]);
  let J = A.command.length > 70 ? A.command.substring(0, 67) + "..." : A.command;
  return l6.default.createElement(h, {
    width: "100%",
    flexDirection: "column"
  }, l6.default.createElement(h, {
    width: "100%"
  }, l6.default.createElement(h, {
    borderStyle: "round",
    borderColor: "permission",
    flexDirection: "column",
    padding: 1,
    width: "100%"
  }, l6.default.createElement(h, null, l6.default.createElement(P, {
    color: "permission",
    bold: !0
  }, "Bash Details")), l6.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, l6.default.createElement(P, null, l6.default.createElement(P, {
    bold: !0
  }, "ID:"), " ", A.id), l6.default.createElement(P, null, l6.default.createElement(P, {
    bold: !0
  }, "Status:"), " ", A.status === "running" ? l6.default.createElement(P, {
    color: "permission"
  }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`) : A.status === "completed" ? l6.default.createElement(P, {
    color: "success"
  }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`) : l6.default.createElement(P, {
    color: "error"
  }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`)), l6.default.createElement(P, null, l6.default.createElement(P, {
    bold: !0
  }, "Runtime:"), " ", W(A.startTime)), l6.default.createElement(P, {
    wrap: "truncate-end"
  }, l6.default.createElement(P, {
    bold: !0
  }, "Command:"), " ", J)), l6.default.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, l6.default.createElement(P, {
    bold: !0
  }, "STDOUT:"), Z.stdout ? l6.default.createElement(l6.default.Fragment, null, l6.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1,
    flexDirection: "column",
    height: 7
  }, Z.stdout.split(`
`).slice(-5).map((F, X) => l6.default.createElement(P, {
    key: X,
    wrap: "truncate-end"
  }, F))), l6.default.createElement(P, {
    dimColor: !0,
    italic: !0
  }, Z.stdoutLines > 5 ? `Showing last 5 lines of ${Z.stdoutLines} total lines` : `Showing ${Z.stdoutLines} lines`)) : l6.default.createElement(P, {
    dimColor: !0
  }, "No stdout output available")), Z.stderr && l6.default.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, l6.default.createElement(P, {
    bold: !0,
    color: "error"
  }, "STDERR:"), l6.default.createElement(h, {
    borderStyle: "round",
    borderColor: "error",
    paddingX: 1,
    flexDirection: "column",
    height: 3
  }, Z.stderr.split(`
`).slice(-1).map((F, X) => l6.default.createElement(P, {
    key: X,
    color: "error",
    wrap: "truncate-end"
  }, F))), l6.default.createElement(P, {
    dimColor: !0,
    italic: !0,
    color: "error"
  }, Z.stderrLines > 1 ? `Showing last line of ${Z.stderrLines} total lines` : `Showing ${Z.stderrLines} line`)))), l6.default.createElement(h, null, Y.pending ? l6.default.createElement(P, {
    dimColor: !0
  }, "Press ", Y.keyName, " again to exit") : l6.default.createElement(P, {
    dimColor: !0
  }, "Press esc to close", A.status === "running" && Q ? l6.default.createElement(P, null, " · k to kill shell") : null)))
}
// @from(Start 9949231, End 9951078)
function M_2({
  onDone: A
}) {
  let {
    shells: B,
    killShell: Q
  } = Mp(), [I, G] = fw1.useState(null);
  fw1.useEffect(() => {
    if (I && !B.some((J) => J.id === I)) G(null)
  }, [I, B]);
  let Z = (J) => {
      G(J)
    },
    D = (J) => {
      Q(J)
    };
  Z0((J, F) => {
    if (!I && F.escape) A()
  });
  let Y = Y2();
  if (I) {
    let J = B.find((F) => F.id === I);
    if (!J) return null;
    return aG.default.createElement(q_2, {
      shell: J,
      onDone: A,
      onKillShell: () => D(J.id),
      key: `shell-${J.id}`
    })
  }
  let W = B.map((J) => ({
    label: `Shell ${J.id}: ${J.command.length>40?J.command.substring(0,37)+"...":J.command} (${J.status})`,
    value: J.id
  }));
  return aG.default.createElement(h, {
    width: "100%",
    flexDirection: "column"
  }, aG.default.createElement(h, {
    borderStyle: "round",
    borderColor: "permission",
    flexDirection: "column",
    padding: 1,
    width: "100%"
  }, aG.default.createElement(h, null, aG.default.createElement(P, {
    color: "permission",
    bold: !0
  }, "Background Bash Shells")), B.length === 0 ? aG.default.createElement(h, {
    marginY: 1
  }, aG.default.createElement(P, null, "No background shells currently running")) : aG.default.createElement(aG.default.Fragment, null, aG.default.createElement(h, null, aG.default.createElement(P, {
    dimColor: !0
  }, "Select a shell to view details:")), aG.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1,
    marginBottom: 1
  }, aG.default.createElement(p0, {
    options: W,
    onChange: Z,
    onCancel: A
  })))), aG.default.createElement(h, {
    marginLeft: 2
  }, Y.pending ? aG.default.createElement(P, {
    dimColor: !0
  }, "Press ", Y.keyName, " again to exit") : aG.default.createElement(P, {
    dimColor: !0
  }, "Press esc to close")))
}
// @from(Start 9951083, End 9951382)
nU5 = {
    type: "local-jsx",
    name: "bashes",
    description: "List and manage background bash shells",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A) {
      return r0A.createElement(M_2, {
        onDone: A
      })
    },
    userFacingName() {
      return "bashes"
    }
  }
// @from(Start 9951386, End 9951395)
L_2 = nU5
// @from(Start 9951401, End 9951418)
vw1 = I1(U1(), 1)
// @from(Start 9951421, End 9951856)
function aU5() {
  let A = ZA(),
    B = A.editorMode || "normal";
  if (B === "emacs") B = "normal";
  let Q = B === "normal" ? "vim" : "normal";
  return j0({
    ...A,
    editorMode: Q
  }), E1("tengu_editor_mode_changed", {
    mode: Q,
    source: "command"
  }), Promise.resolve(`Editor mode set to ${Q}. ${Q==="vim"?"Use Escape key to toggle between INSERT and NORMAL modes.":"Using standard (readline) keyboard bindings."}`)
}
// @from(Start 9951861, End 9952062)
sU5 = {
    name: "vim",
    description: "Toggle between Vim and Normal editing modes",
    isEnabled: () => !0,
    isHidden: !1,
    type: "local",
    userFacingName: () => "vim",
    call: aU5
  }
// @from(Start 9952066, End 9952075)
R_2 = sU5
// @from(Start 9952081, End 9952098)
t0A = I1(U1(), 1)
// @from(Start 9952104, End 9952120)
R2 = I1(U1(), 1)
// @from(Start 9952126, End 9952142)
$7 = I1(U1(), 1)
// @from(Start 9952148, End 9952164)
eD = I1(U1(), 1)
// @from(Start 9952167, End 9953008)
function bw1({
  ruleValue: A
}) {
  switch (A.toolName) {
    case E4.name:
      if (A.ruleContent)
        if (A.ruleContent.endsWith(":*")) return eD.createElement(P, {
          color: "secondaryText"
        }, "Any Bash command starting with", " ", eD.createElement(P, {
          bold: !0
        }, A.ruleContent.slice(0, -2)));
        else return eD.createElement(P, {
          color: "secondaryText"
        }, "The Bash command ", eD.createElement(P, {
          bold: !0
        }, A.ruleContent));
      else return eD.createElement(P, {
        color: "secondaryText"
      }, "Any Bash command");
    default:
      if (!A.ruleContent) return eD.createElement(P, {
        color: "secondaryText"
      }, "Any use of the ", eD.createElement(P, {
        bold: !0
      }, A.toolName), " tool");
      else return null
  }
}
// @from(Start 9953013, End 9953029)
S5 = I1(U1(), 1)
// @from(Start 9953035, End 9953052)
O_2 = I1(U1(), 1)
// @from(Start 9953055, End 9953535)
function T_2(A) {
  switch (A) {
    case "localSettings":
      return {
        label: "Project settings (local)", description: `Saved in ${fn("localSettings")}`, value: A
      };
    case "projectSettings":
      return {
        label: "Project settings", description: `Checked in at ${fn("projectSettings")}`, value: A
      };
    case "userSettings":
      return {
        label: "User settings", description: "Saved in at ~/.claude/settings.json", value: A
      }
  }
}
// @from(Start 9953540, End 9953598)
gw1 = ["localSettings", "projectSettings", "userSettings"]
// @from(Start 9953601, End 9955379)
function P_2({
  onAddRules: A,
  onCancel: B,
  ruleValues: Q,
  ruleBehavior: I,
  initialContext: G,
  setToolPermissionContext: Z
}) {
  let D = gw1.map(T_2),
    Y = Y2();
  Z0((J, F) => {
    if (F.escape) B()
  });
  let W = O_2.useCallback((J) => {
    if (J === "cancel") {
      B();
      return
    } else if (gw1.includes(J)) {
      let F = J;
      ni({
        ruleValues: Q,
        ruleBehavior: I,
        destination: F,
        initialContext: G,
        setToolPermissionContext: Z
      });
      let X = Q.map((V) => ({
        ruleValue: V,
        ruleBehavior: I,
        source: F
      }));
      A(X)
    }
  }, [A, B, Q, I, G, Z]);
  return S5.createElement(S5.Fragment, null, S5.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    paddingLeft: 1,
    paddingRight: 1,
    borderColor: "permission"
  }, S5.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Add ", I, " permission rule", Q.length === 1 ? "" : "s", S5.createElement(UI, null)), S5.createElement(h, {
    flexDirection: "column",
    paddingX: 2
  }, Q.map((J) => S5.createElement(h, {
    flexDirection: "column",
    key: m8(J)
  }, S5.createElement(P, {
    bold: !0
  }, m8(J)), S5.createElement(bw1, {
    ruleValue: J
  })))), S5.createElement(h, {
    flexDirection: "column",
    marginY: 1
  }, S5.createElement(P, null, Q.length === 1 ? "Where should this rule be saved?" : "Where should these rules be saved?"), S5.createElement(p0, {
    options: D,
    onChange: W,
    onCancel: B
  }))), S5.createElement(h, {
    marginLeft: 3
  }, Y.pending ? S5.createElement(P, {
    dimColor: !0
  }, "Press ", Y.keyName, " again to exit") : S5.createElement(P, {
    dimColor: !0
  }, "↑/↓ to select · Enter to confirm · Esc to cancel")))
}
// @from(Start 9955384, End 9955400)
_5 = I1(U1(), 1)
// @from(Start 9955406, End 9955423)
S_2 = I1(U1(), 1)
// @from(Start 9955426, End 9957079)
function __2({
  onCancel: A,
  onSubmit: B,
  ruleBehavior: Q
}) {
  let [I, G] = S_2.useState(""), Z = Y2();
  Z0((J, F) => {
    if (F.escape) A()
  });
  let {
    columns: D
  } = c9(), Y = D - 6, W = (J) => {
    let F = J.trim();
    if (F.length === 0) return;
    let X = aM(F);
    B(X, Q)
  };
  return _5.createElement(_5.Fragment, null, _5.createElement(h, {
    flexDirection: "column",
    gap: 1,
    borderStyle: "round",
    paddingLeft: 1,
    paddingRight: 1,
    borderColor: "permission"
  }, _5.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Add ", Q, " permission rule"), _5.createElement(h, {
    flexDirection: "column"
  }, _5.createElement(P, null, "Permission rules are a tool name, optionally followed by a specifier in parentheses.", _5.createElement(UI, null), "e.g.,", " ", _5.createElement(P, {
    bold: !0
  }, m8({
    toolName: $W.name
  })), _5.createElement(P, {
    bold: !1
  }, " or "), _5.createElement(P, {
    bold: !0
  }, m8({
    toolName: E4.name,
    ruleContent: "ls:*"
  }))), _5.createElement(h, {
    borderColor: "secondaryBorder",
    borderDimColor: !0,
    borderStyle: "round",
    marginY: 1,
    paddingLeft: 1
  }, _5.createElement(j3, {
    showCursor: !0,
    value: I,
    onChange: G,
    onSubmit: W,
    placeholder: `Enter permission rule${A0.ellipsis}`,
    columns: Y,
    cursorOffset: I.length,
    onChangeCursorOffset: () => {}
  })))), _5.createElement(h, {
    marginLeft: 3
  }, Z.pending ? _5.createElement(P, {
    dimColor: !0
  }, "Press ", Z.keyName, " again to exit") : _5.createElement(P, {
    dimColor: !0
  }, "Enter to submit · Esc to cancel")))
}
// @from(Start 9957084, End 9957100)
TW = I1(U1(), 1)
// @from(Start 9957106, End 9957123)
j_2 = I1(U1(), 1)
// @from(Start 9957126, End 9958359)
function y_2({
  onExit: A,
  getToolPermissionContext: B,
  onRequestAddDirectory: Q,
  onRequestRemoveDirectory: I
}) {
  let G = B(),
    Z = TW.useMemo(() => {
      return Array.from(G.additionalWorkingDirectories).map((W) => ({
        path: W,
        isCurrent: !1,
        isDeletable: !0
      }))
    }, [G.additionalWorkingDirectories]),
    D = j_2.useCallback((W) => {
      if (W === "add-directory") {
        Q();
        return
      }
      let J = Z.find((F) => F.path === W);
      if (J && J.isDeletable) I(J.path)
    }, [Z, Q, I]),
    Y = TW.useMemo(() => {
      let W = Z.map((J) => ({
        label: J.path,
        value: J.path
      }));
      return W.push({
        label: `Add directory${A0.ellipsis}`,
        value: "add-directory"
      }), W
    }, [Z]);
  return TW.createElement(h, {
    flexDirection: "column",
    marginBottom: 1
  }, TW.createElement(h, {
    flexDirection: "row",
    marginTop: 1,
    marginLeft: 2,
    gap: 1
  }, TW.createElement(P, null, `-  ${e9()}`), TW.createElement(P, {
    dimColor: !0
  }, "(Original working directory)")), TW.createElement(p0, {
    options: Y,
    onChange: D,
    onCancel: () => A(),
    visibleOptionCount: Math.min(10, Y.length)
  }))
}
// @from(Start 9958364, End 9958380)
gy = I1(U1(), 1)
// @from(Start 9958383, End 9958546)
function rU5(A) {
  switch (A) {
    case "allow":
      return "Allow";
    case "deny":
      return "Deny";
    case "workspace":
      return "Workspace"
  }
}
// @from(Start 9958548, End 9958873)
function oU5(A) {
  switch (A) {
    case "allow":
      return `${m0} won't ask before using allowed tools.`;
    case "deny":
      return `${m0} will always reject requests to use denied tools.`;
    case "workspace":
      return `${m0} can read files in the workspace, and make edits when auto-accept edits is on.`
  }
}
// @from(Start 9958875, End 9959424)
function k_2({
  selectedTab: A
}) {
  return gy.default.createElement(gy.default.Fragment, null, gy.default.createElement(h, {
    flexDirection: "row",
    gap: 1,
    marginBottom: 1
  }, gy.default.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Permissions:"), ["allow", "deny", "workspace"].map((Q) => gy.default.createElement(P, {
    key: Q,
    backgroundColor: A === Q ? "permission" : void 0,
    color: A === Q ? "inverseText" : void 0,
    bold: A === Q
  }, ` ${rU5(Q)} `))), gy.default.createElement(P, null, oU5(A)))
}
// @from(Start 9959429, End 9959445)
B8 = I1(U1(), 1)
// @from(Start 9959451, End 9959468)
eA1 = I1(U1(), 1)
// @from(Start 9959471, End 9961094)
function x_2({
  onAddDirectory: A,
  onCancel: B,
  permissionContext: Q,
  setPermissionContext: I
}) {
  let [G, Z] = eA1.useState(""), [D, Y] = eA1.useState(null), W = Y2();
  Z0((F, X) => {
    if (X.escape) B()
  });
  let J = eA1.useCallback((F) => {
    let X = xA1(F, Q);
    if (X.resultType === "success") I(X.updatedPermissionContext), A(F);
    else Y(fA1(X))
  }, [Q, I, A]);
  return B8.createElement(B8.Fragment, null, B8.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    paddingLeft: 1,
    paddingRight: 1,
    borderColor: "permission"
  }, B8.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Add directory to workspace"), B8.createElement(h, {
    marginY: 1
  }, B8.createElement(P, null, m0, " will be able to read files in this directory and make edits when auto-accept edits is on.")), B8.createElement(h, {
    flexDirection: "column"
  }, B8.createElement(P, null, "Enter the path to the directory:"), B8.createElement(h, {
    borderColor: "secondaryBorder",
    borderDimColor: !0,
    borderStyle: "round",
    marginY: 1,
    paddingLeft: 1
  }, B8.createElement(j3, {
    showCursor: !0,
    placeholder: `Directory path${A0.ellipsis}`,
    value: G,
    onChange: Z,
    onSubmit: J,
    columns: 80,
    cursorOffset: G.length,
    onChangeCursorOffset: () => {}
  })), D && B8.createElement(P, {
    color: "error"
  }, D))), B8.createElement(h, {
    marginLeft: 3
  }, W.pending ? B8.createElement(P, {
    dimColor: !0
  }, "Press ", W.keyName, " again to exit") : B8.createElement(P, {
    dimColor: !0
  }, "Enter to add · Esc to cancel")))
}
// @from(Start 9961099, End 9961115)
CB = I1(U1(), 1)
// @from(Start 9961121, End 9961138)
o0A = I1(U1(), 1)
// @from(Start 9961141, End 9962607)
function f_2({
  directoryPath: A,
  onRemove: B,
  onCancel: Q,
  permissionContext: I,
  setPermissionContext: G
}) {
  let Z = Y2();
  Z0((W, J) => {
    if (J.escape) Q()
  });
  let D = o0A.useCallback(() => {
      let W = new Set(I.additionalWorkingDirectories);
      W.delete(A);
      let J = {
        ...I,
        additionalWorkingDirectories: W
      };
      G(J), B()
    }, [A, I, G, B]),
    Y = o0A.useCallback((W) => {
      if (W === "yes") D();
      else Q()
    }, [D, Q]);
  return CB.createElement(CB.Fragment, null, CB.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    paddingLeft: 1,
    paddingRight: 1,
    borderColor: "error"
  }, CB.createElement(P, {
    bold: !0,
    color: "error"
  }, "Remove directory from workspace?"), CB.createElement(h, {
    marginY: 1,
    marginX: 2,
    flexDirection: "column"
  }, CB.createElement(P, {
    bold: !0
  }, A)), CB.createElement(P, null, m0, " will no longer have access to files in this directory."), CB.createElement(h, {
    marginY: 1
  }, CB.createElement(p0, {
    onChange: Y,
    onCancel: Q,
    options: [{
      label: "Yes",
      value: "yes"
    }, {
      label: "No",
      value: "no"
    }]
  }))), CB.createElement(h, {
    marginLeft: 3
  }, Z.pending ? CB.createElement(P, {
    dimColor: !0
  }, "Press ", Z.keyName, " again to exit") : CB.createElement(P, {
    dimColor: !0
  }, "↑/↓ to select · Enter to confirm · Esc to cancel")))
}
// @from(Start 9962609, End 9962728)
function tU5({
  rule: A
}) {
  return R2.createElement(P, {
    color: "secondaryText"
  }, `From ${pfA(A.source)}`)
}
// @from(Start 9962730, End 9962849)
function eU5(A) {
  switch (A) {
    case "allow":
      return "allowed";
    case "deny":
      return "denied"
  }
}
// @from(Start 9962851, End 9964601)
function AN5({
  rule: A,
  onDelete: B,
  onCancel: Q
}) {
  let I = Y2();
  Z0((D, Y) => {
    if (Y.escape) Q()
  });
  let G = R2.createElement(h, {
      flexDirection: "column",
      marginX: 2
    }, R2.createElement(P, {
      bold: !0
    }, m8(A.ruleValue)), R2.createElement(bw1, {
      ruleValue: A.ruleValue
    }), R2.createElement(tU5, {
      rule: A
    })),
    Z = R2.createElement(h, {
      marginLeft: 3
    }, I.pending ? R2.createElement(P, {
      dimColor: !0
    }, "Press ", I.keyName, " again to exit") : R2.createElement(P, {
      dimColor: !0
    }, "Esc to cancel"));
  if (A.source === "policySettings") return R2.createElement(R2.Fragment, null, R2.createElement(h, {
    flexDirection: "column",
    gap: 1,
    borderStyle: "round",
    paddingLeft: 1,
    paddingRight: 1,
    borderColor: "permission"
  }, R2.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Rule details"), G, R2.createElement(P, {
    italic: !0
  }, "This rule is configured by managed settings and cannot be modified.", `
`, "Contact your system administrator for more information.")), Z);
  return R2.createElement(R2.Fragment, null, R2.createElement(h, {
    flexDirection: "column",
    gap: 1,
    borderStyle: "round",
    paddingLeft: 1,
    paddingRight: 1,
    borderColor: "error"
  }, R2.createElement(P, {
    bold: !0,
    color: "error"
  }, "Delete ", eU5(A.ruleBehavior), " tool?"), G, R2.createElement(P, null, "If deleted, you will have to confirm the next time ", m0, " ", "tries to use this tool."), R2.createElement(p0, {
    onChange: (D) => D === "yes" ? B() : Q(),
    onCancel: Q,
    options: [{
      label: "Yes",
      value: "yes"
    }, {
      label: "No",
      value: "no"
    }]
  })), Z)
}
// @from(Start 9964603, End 9969332)
function v_2({
  onExit: A,
  getToolPermissionContext: B,
  setToolPermissionContext: Q
}) {
  let [I, G] = $7.useState([]), [Z, D] = $7.useState(B()), Y = $7.useCallback((N1) => {
    D(N1), Q(N1)
  }, [Q, D]), [W, J] = $7.useState("allow"), [F, X] = $7.useState(), [V, C] = $7.useState(!1), [K, E] = $7.useState(null), [N, q] = $7.useState(!1), [O, R] = $7.useState(null), T = $7.useMemo(() => {
    let N1 = new Map;
    return x81(Z).forEach((u1) => {
      N1.set(JSON.stringify(u1), u1)
    }), N1
  }, [Z]), L = $7.useMemo(() => {
    let N1 = new Map;
    return Pv(Z).forEach((u1) => {
      N1.set(JSON.stringify(u1), u1)
    }), N1
  }, [Z]), _ = (() => {
    switch (W) {
      case "allow":
        return T;
      case "deny":
        return L;
      case "workspace":
        return new Map
    }
  })(), k = $7.useMemo(() => {
    let N1 = [];
    if (W !== "workspace") N1.push({
      label: `Add a new rule${A0.ellipsis}`,
      value: "add-new-rule"
    });
    let u1 = Array.from(_.keys()).sort((d1, YA) => {
      let bA = _.get(d1),
        e1 = _.get(YA);
      if (bA && e1) {
        let k1 = m8(bA.ruleValue).toLowerCase(),
          Q1 = m8(e1.ruleValue).toLowerCase();
        return k1.localeCompare(Q1)
      }
      return 0
    });
    for (let d1 of u1) {
      let YA = _.get(d1);
      if (YA) N1.push({
        label: m8(YA.ruleValue),
        value: d1
      })
    }
    return N1
  }, [_, W]), i = Y2();
  Z0((N1, u1) => {
    if (F || V || K || N || O) return;
    if (u1.tab || u1.rightArrow) J((d1) => {
      switch (d1) {
        case "allow":
          return "deny";
        case "deny":
          return "workspace";
        case "workspace":
          return "allow"
      }
    });
    else if (u1.leftArrow) J((d1) => {
      switch (d1) {
        case "allow":
          return "workspace";
        case "deny":
          return "allow";
        case "workspace":
          return "deny"
      }
    })
  });
  let x = $7.useCallback((N1) => {
      if (N1 === "add-new-rule") {
        C(!0);
        return
      } else {
        X(_.get(N1));
        return
      }
    }, [X, _]),
    s = $7.useCallback(() => {
      C(!1)
    }, []),
    d = $7.useCallback((N1, u1) => {
      E({
        ruleValue: N1,
        ruleBehavior: u1
      }), C(!1)
    }, []),
    F1 = $7.useCallback((N1) => {
      E(null);
      for (let u1 of N1) G((d1) => [...d1, `Added ${u1.ruleBehavior} rule ${UA.bold(m8(u1.ruleValue))}`])
    }, []),
    X1 = $7.useCallback(() => {
      E(null)
    }, []),
    v = () => {
      if (!F) return;
      ifA({
        rule: F,
        initialContext: Z,
        setToolPermissionContext: Y
      }), G((N1) => [...N1, `Deleted ${F.ruleBehavior} rule ${UA.bold(m8(F.ruleValue))}`]), X(void 0)
    };
  if (F) return R2.createElement(AN5, {
    rule: F,
    onDelete: v,
    onCancel: () => X(void 0)
  });
  if (V) return R2.createElement(__2, {
    onCancel: s,
    onSubmit: d,
    ruleBehavior: W === "allow" ? "allow" : "deny"
  });
  if (K) return R2.createElement(P_2, {
    onAddRules: F1,
    onCancel: X1,
    ruleValues: [K.ruleValue],
    ruleBehavior: K.ruleBehavior,
    initialContext: Z,
    setToolPermissionContext: Y
  });
  if (N) return R2.createElement(x_2, {
    onAddDirectory: (N1) => {
      G((u1) => [...u1, `Added directory ${UA.bold(N1)} to workspace`]), q(!1)
    },
    onCancel: () => q(!1),
    permissionContext: Z,
    setPermissionContext: Y
  });
  if (O) return R2.createElement(f_2, {
    directoryPath: O,
    onRemove: () => {
      G((N1) => [...N1, `Removed directory ${UA.bold(O)} from workspace`]), R(null)
    },
    onCancel: () => R(null),
    permissionContext: Z,
    setPermissionContext: Y
  });

  function D1() {
    if (W === "workspace") return R2.createElement(y_2, {
      onExit: A,
      getToolPermissionContext: () => Z,
      onRequestAddDirectory: () => q(!0),
      onRequestRemoveDirectory: (N1) => R(N1)
    });
    return R2.createElement(h, {
      marginY: 1
    }, R2.createElement(p0, {
      options: k,
      onChange: x,
      onCancel: () => {
        if (I.length > 0) A(I.join(`
`));
        else A()
      },
      visibleOptionCount: Math.min(10, k.length)
    }))
  }
  return R2.createElement(R2.Fragment, null, R2.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    paddingLeft: 1,
    paddingRight: 1,
    borderColor: "permission"
  }, R2.createElement(k_2, {
    selectedTab: W
  }), D1()), R2.createElement(h, {
    marginLeft: 3
  }, i.pending ? R2.createElement(P, {
    dimColor: !0
  }, "Press ", i.keyName, " again to exit") : R2.createElement(P, {
    dimColor: !0
  }, "Tab to select tab · Enter to confirm · Esc to cancel")))
}
// @from(Start 9969337, End 9969808)
BN5 = {
    type: "local-jsx",
    name: "permissions",
    aliases: ["allowed-tools"],
    description: "Manage allow & deny tool permission rules",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, B) {
      return t0A.createElement(v_2, {
        onExit: A,
        getToolPermissionContext: B.getToolPermissionContext,
        setToolPermissionContext: B.setToolPermissionContext
      })
    },
    userFacingName() {
      return "permissions"
    }
  }
// @from(Start 9969812, End 9969821)
b_2 = BN5
// @from(Start 9969827, End 9969844)
$N5 = I1(U1(), 1)
// @from(Start 9969850, End 9969867)
DN5 = I1(U1(), 1)
// @from(Start 9969873, End 9969890)
hw1 = I1(U1(), 1)
// @from(Start 9969896, End 9969913)
IN5 = I1(U1(), 1)
// @from(Start 9969919, End 9969936)
GN5 = I1(U1(), 1)
// @from(Start 9969942, End 9969959)
g_2 = I1(U1(), 1)
// @from(Start 9969965, End 9969982)
e0A = I1(U1(), 1)
// @from(Start 9969988, End 9970005)
A2A = I1(U1(), 1)
// @from(Start 9970011, End 9970028)
B2A = I1(U1(), 1)
// @from(Start 9970034, End 9970051)
h_2 = I1(U1(), 1)
// @from(Start 9970057, End 9970074)
m_2 = I1(U1(), 1)
// @from(Start 9970080, End 9970097)
d_2 = I1(U1(), 1)
// @from(Start 9970103, End 9971292)
ZN5 = L0(function(A) {
  return {
    PreToolUse: {
      summary: "Before tool execution",
      description: `Input to command is JSON of tool call arguments.
Exit code 0 - Stdout/stderr not shown
Exit code 2 - show stderr to model and block tool call
Other exit codes - show stderr to user only but continue with tool call`,
      matcherMetadata: {
        fieldToMatch: "tool_name",
        values: A
      }
    },
    PostToolUse: {
      summary: "After tool execution",
      description: `Input to command is JSON with fields "inputs" (tool call arguments) and "response" (tool call response).
Exit code 0 - Stdout shown in transcript mode (Ctrl-R)
Exit code 2 - show stderr to model immediately
Other exit codes - show stderr to user only`,
      matcherMetadata: {
        fieldToMatch: "tool_name",
        values: A
      }
    },
    Notification: {
      summary: "When notifications are sent",
      description: ""
    },
    Stop: {
      summary: "Right before Claude concludes its response",
      description: `Exit code 0 - Stdout/stderr not shown
Exit code 2 - show stderr to model and continue conversation
Other exit codes - show stderr to user only`
    }
  }
})
// @from(Start 9971298, End 9971314)
X4 = I1(U1(), 1)
// @from(Start 9971320, End 9971397)
mw1 = {
    HIGHEST: 31999,
    MIDDLE: 1e4,
    BASIC: 4000,
    NONE: 0
  }
// @from(Start 9971401, End 9976104)
YN5 = {
    english: {
      HIGHEST: [{
        pattern: "think harder",
        needsWordBoundary: !0
      }, {
        pattern: "think intensely",
        needsWordBoundary: !0
      }, {
        pattern: "think longer",
        needsWordBoundary: !0
      }, {
        pattern: "think really hard",
        needsWordBoundary: !0
      }, {
        pattern: "think super hard",
        needsWordBoundary: !0
      }, {
        pattern: "think very hard",
        needsWordBoundary: !0
      }, {
        pattern: "ultrathink",
        needsWordBoundary: !0
      }],
      MIDDLE: [{
        pattern: "think about it",
        needsWordBoundary: !0
      }, {
        pattern: "think a lot",
        needsWordBoundary: !0
      }, {
        pattern: "think deeply",
        needsWordBoundary: !0
      }, {
        pattern: "think hard",
        needsWordBoundary: !0
      }, {
        pattern: "think more",
        needsWordBoundary: !0
      }, {
        pattern: "megathink",
        needsWordBoundary: !0
      }],
      BASIC: [{
        pattern: "think",
        needsWordBoundary: !0
      }],
      NONE: []
    },
    japanese: {
      HIGHEST: [{
        pattern: "熟考"
      }, {
        pattern: "深く考えて"
      }, {
        pattern: "しっかり考えて"
      }],
      MIDDLE: [{
        pattern: "もっと考えて"
      }, {
        pattern: "たくさん考えて"
      }, {
        pattern: "よく考えて"
      }, {
        pattern: "長考"
      }],
      BASIC: [{
        pattern: "考えて"
      }],
      NONE: []
    },
    chinese: {
      HIGHEST: [{
        pattern: "多想一会"
      }, {
        pattern: "深思"
      }, {
        pattern: "仔细思考"
      }],
      MIDDLE: [{
        pattern: "多想想"
      }, {
        pattern: "好好想"
      }],
      BASIC: [{
        pattern: "想"
      }, {
        pattern: "思考"
      }],
      NONE: []
    },
    spanish: {
      HIGHEST: [{
        pattern: "piensa más",
        needsWordBoundary: !0
      }, {
        pattern: "piensa mucho",
        needsWordBoundary: !0
      }, {
        pattern: "piensa profundamente",
        needsWordBoundary: !0
      }],
      MIDDLE: [{
        pattern: "piensa",
        needsWordBoundary: !0
      }],
      BASIC: [{
        pattern: "pienso",
        needsWordBoundary: !0
      }, {
        pattern: "pensando",
        needsWordBoundary: !0
      }],
      NONE: []
    },
    french: {
      HIGHEST: [{
        pattern: "réfléchis plus",
        needsWordBoundary: !0
      }, {
        pattern: "réfléchis beaucoup",
        needsWordBoundary: !0
      }, {
        pattern: "réfléchis profondément",
        needsWordBoundary: !0
      }],
      MIDDLE: [{
        pattern: "réfléchis",
        needsWordBoundary: !0
      }],
      BASIC: [{
        pattern: "pense",
        needsWordBoundary: !0
      }, {
        pattern: "réfléchir",
        needsWordBoundary: !0
      }],
      NONE: []
    },
    german: {
      HIGHEST: [{
        pattern: "denk mehr",
        needsWordBoundary: !0
      }, {
        pattern: "denk gründlich",
        needsWordBoundary: !0
      }, {
        pattern: "denk tief",
        needsWordBoundary: !0
      }],
      MIDDLE: [{
        pattern: "denk nach",
        needsWordBoundary: !0
      }, {
        pattern: "denk",
        needsWordBoundary: !0
      }],
      BASIC: [{
        pattern: "denke",
        needsWordBoundary: !0
      }, {
        pattern: "nachdenken",
        needsWordBoundary: !0
      }],
      NONE: []
    },
    korean: {
      HIGHEST: [{
        pattern: "더 오래 생각"
      }, {
        pattern: "깊이 생각"
      }, {
        pattern: "심사숙고"
      }, {
        pattern: "곰곰이 생각"
      }],
      MIDDLE: [{
        pattern: "많이 생각"
      }, {
        pattern: "더 생각"
      }, {
        pattern: "잘 생각"
      }],
      BASIC: [{
        pattern: "생각"
      }],
      NONE: []
    },
    italian: {
      HIGHEST: [{
        pattern: "pensa di più",
        needsWordBoundary: !0
      }, {
        pattern: "pensa a lungo",
        needsWordBoundary: !0
      }, {
        pattern: "pensa profondamente",
        needsWordBoundary: !0
      }, {
        pattern: "rifletti a fondo",
        needsWordBoundary: !0
      }],
      MIDDLE: [{
        pattern: "pensa",
        needsWordBoundary: !0
      }, {
        pattern: "pensa molto",
        needsWordBoundary: !0
      }, {
        pattern: "rifletti",
        needsWordBoundary: !0
      }],
      BASIC: [{
        pattern: "penso",
        needsWordBoundary: !0
      }, {
        pattern: "pensare",
        needsWordBoundary: !0
      }, {
        pattern: "pensando",
        needsWordBoundary: !0
      }, {
        pattern: "riflettere",
        needsWordBoundary: !0
      }],
      NONE: []
    }
  }
// @from(Start 9976107, End 9976420)
function s$(A, B) {
  if (process.env.MAX_THINKING_TOKENS) {
    let Q = parseInt(process.env.MAX_THINKING_TOKENS, 10);
    if (Q > 0) E1("tengu_thinking", {
      provider: Wz(),
      tokenCount: Q
    });
    return Q
  }
  return Math.max(...A.filter((Q) => Q.type === "user" && !Q.isMeta).map(WN5), B ?? 0)
}
// @from(Start 9976422, End 9976606)
function WN5(A) {
  if (A.isMeta) return 0;
  let B = JN5(A).toLowerCase(),
    Q = FN5(B);
  if (Q > 0) E1("tengu_thinking", {
    provider: Wz(),
    tokenCount: Q
  });
  return Q
}
// @from(Start 9976608, End 9976778)
function JN5(A) {
  if (typeof A.message.content === "string") return A.message.content;
  return A.message.content.map((B) => B.type === "text" ? B.text : "").join("")
}
// @from(Start 9976780, End 9976970)
function FN5(A) {
  let B = [
    ["HIGHEST", mw1.HIGHEST],
    ["MIDDLE", mw1.MIDDLE],
    ["BASIC", mw1.BASIC]
  ];
  for (let [Q, I] of B)
    if (XN5(A, Q)) return I;
  return mw1.NONE
}
// @from(Start 9976972, End 9977226)
function XN5(A, B) {
  for (let Q of Object.values(YN5)) {
    let I = Q[B];
    for (let {
        pattern: G,
        needsWordBoundary: Z
      }
      of I)
      if ((Z ? new RegExp(`\\b${G}\\b`) : new RegExp(G)).test(A)) return !0
  }
  return !1
}
// @from(Start 9977227, End 9979376)
async function u_2(A) {
  return `Launch a new agent that has access to the following tools: ${A.filter((Q)=>Q.name!==cX).map((Q)=>Q.name).join(", ")}. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries, use the Agent tool to perform the search for you.

When to use the Agent tool:
- If you are searching for a keyword like "config" or "logger", or for questions like "which file does X?", the Agent tool is strongly recommended

When NOT to use the Agent tool:
- If you want to read a specific file path, use the ${OB.name} or ${g$.name} tool instead of the Agent tool, to find the match more quickly
- If you are searching for a specific class definition like "class Foo", use the ${g$.name} tool instead, to find the match more quickly
- If you are searching for code within a specific file or set of 2-3 files, use the ${OB.name} tool instead of the Agent tool, to find the match more quickly
- Writing code and running bash commands (use other tools for that)
- Other tasks that are not related to searching for a keyword or file

Usage notes:
1. Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses
2. When the agent is done, it will return a single message back to you. The result returned by the agent is not visible to the user. To show the user the result, you should send a text message back to the user with a concise summary of the result.
3. Each agent invocation is stateless. You will not be able to send additional messages to the agent, nor will the agent be able to communicate with you outside of its final report. Therefore, your prompt should contain a highly detailed task description for the agent to perform autonomously and you should specify exactly what information the agent should return back to you in its final and only message to you.
4. The agent's outputs should generally be trusted
5. Clearly tell the agent whether you expect it to write code or just to do research (search, file reads, web fetches, etc.), since it is not aware of the user's intent`
}
// @from(Start 9979427, End 9979434)
Q2A = 3
// @from(Start 9979438, End 9979612)
CN5 = n.object({
    description: n.string().describe("A short (3-5 word) description of the task"),
    prompt: n.string().describe("The task for the agent to perform")
  })
// @from(Start 9979615, End 9980473)
function KN5(A, B) {
  let Q = B.sort((I, G) => I.agentIndex - G.agentIndex).map((I, G) => {
    let Z = I.content.filter((D) => D.type === "text").map((D) => D.text).join(`

`);
    return `== AGENT ${G+1} RESPONSE ==
${Z}
`
  }).join(`

`);
  return `Original task: ${A}

I've assigned multiple agents to tackle this task. Each agent has analyzed the problem and provided their findings.

${Q}

Based on all the information provided by these agents, synthesize a comprehensive and cohesive response that:
1. Combines the key insights from all agents
2. Resolves any contradictions between agent findings
3. Presents a unified solution that addresses the original task
4. Includes all important details and code examples from the individual responses
5. Is well-structured and complete

Your synthesis should be thorough but focused on the original task.`
}
// @from(Start 9980474, End 9983061)
async function* I2A(A, B, Q, I, G, Z = {}) {
  let {
    abortController: D,
    options: {
      debug: Y,
      verbose: W,
      isNonInteractiveSession: J
    },
    getToolPermissionContext: F,
    readFileState: X,
    setInProgressToolUseIDs: V,
    tools: C
  } = Q, {
    isSynthesis: K = !1,
    systemPrompt: E,
    model: N
  } = Z, q = VN5(), O = [K2({
    content: A
  })], [R, T, L] = await Promise.all([qW(), RE(), N ?? J7()]), _ = await (E ?? ma0(L, Array.from(Q.getToolPermissionContext().additionalWorkingDirectories))), k = [], i = 0, x = void 0;
  for await (let X1 of nO(O, _, R, T, G, {
    abortController: D,
    options: {
      isNonInteractiveSession: J ?? !1,
      tools: C,
      commands: [],
      debug: Y,
      verbose: W,
      mainLoopModel: L,
      maxThinkingTokens: s$(O),
      mcpClients: [],
      mcpResources: {}
    },
    getToolPermissionContext: F,
    readFileState: X,
    getQueuedCommands: () => [],
    removeQueuedCommands: () => {},
    setInProgressToolUseIDs: V,
    agentId: q
  })) {
    if (X1.type !== "assistant" && X1.type !== "user" && X1.type !== "progress") continue;
    if (k.push(X1), X1.type !== "assistant" && X1.type !== "user") continue;
    let v = AQ(k);
    for (let D1 of AQ([X1]))
      for (let N1 of D1.message.content) {
        if (N1.type !== "tool_use" && N1.type !== "tool_result") continue;
        if (N1.type === "tool_use") {
          if (i++, N1.name === "exit_plan_mode" && N1.input) {
            let u1 = hO.inputSchema.safeParse(N1.input);
            if (u1.success) x = {
              plan: u1.data.plan
            }
          }
        }
        yield {
          type: "progress",
          toolUseID: K ? `synthesis_${I.message.id}` : `agent_${B}_${I.message.id}`,
          data: {
            message: D1,
            normalizedMessages: v,
            type: "agent_progress"
          }
        }
      }
  }
  let s = UD(k);
  if (s && oK1(s)) throw new NG;
  if (s?.type !== "assistant") throw new Error(K ? "Synthesis: Last message was not an assistant message" : `Agent ${B+1}: Last message was not an assistant message`);
  let d = (s.message.usage.cache_creation_input_tokens ?? 0) + (s.message.usage.cache_read_input_tokens ?? 0) + s.message.usage.input_tokens + s.message.usage.output_tokens,
    F1 = s.message.content.filter((X1) => X1.type === "text");
  await CZ0([...O, ...k]), yield {
    type: "result",
    data: {
      agentIndex: B,
      content: F1,
      toolUseCount: i,
      tokens: d,
      usage: s.message.usage,
      exitPlanModeInput: x
    }
  }
}
// @from(Start 9983066, End 9991727)
p_2 = {
  async prompt({
    tools: A
  }) {
    return await u_2(A)
  },
  name: cX,
  async description() {
    return "Launch a new task"
  },
  inputSchema: CN5,
  async * call({
    prompt: A
  }, {
    abortController: B,
    options: {
      debug: Q,
      tools: I,
      verbose: G,
      isNonInteractiveSession: Z
    },
    getToolPermissionContext: D,
    readFileState: Y,
    setInProgressToolUseIDs: W
  }, J, F) {
    let X = Date.now(),
      V = ZA(),
      C = {
        abortController: B,
        options: {
          debug: Q,
          verbose: G,
          isNonInteractiveSession: Z ?? !1
        },
        getToolPermissionContext: D,
        readFileState: Y,
        setInProgressToolUseIDs: W,
        tools: I.filter((K) => K.name !== cX)
      };
    if (V.parallelTasksCount > 1) {
      let K = 0,
        E = 0,
        q = Array(V.parallelTasksCount).fill(`${A}

Provide a thorough and complete analysis.`).map((k, i) => I2A(k, i, C, F, J)),
        O = [];
      for await (let k of UH1(q, 10)) if (k.type === "progress") yield k;
      else if (k.type === "result") O.push(k.data), K += k.data.toolUseCount, E += k.data.tokens;
      if (B.signal.aborted) throw new NG;
      let R = KN5(A, O),
        T = I2A(R, 0, C, F, J, {
          isSynthesis: !0
        }),
        L = null;
      for await (let k of T) if (k.type === "progress") K++, yield k;
      else if (k.type === "result") L = k.data, E += L.tokens;
      if (!L) throw new Error("Synthesis agent did not return a result");
      if (B.signal.aborted) throw new NG;
      let _ = O.find((k) => k.exitPlanModeInput)?.exitPlanModeInput;
      yield {
        type: "result",
        data: {
          content: L.content,
          totalDurationMs: Date.now() - X,
          totalTokens: E,
          totalToolUseCount: K,
          usage: L.usage,
          wasInterrupted: B.signal.aborted,
          exitPlanModeInput: _
        }
      }
    } else {
      let K = I2A(A, 0, C, F, J),
        E = 0,
        N = null;
      for await (let q of K) if (q.type === "progress") yield q;
      else if (q.type === "result") N = q.data, E = N.toolUseCount;
      if (B.signal.aborted) throw new NG;
      if (!N) throw new Error("Agent did not return a result");
      yield {
        type: "result",
        data: {
          content: N.content,
          totalDurationMs: Date.now() - X,
          totalTokens: N.tokens,
          totalToolUseCount: E,
          usage: N.usage,
          wasInterrupted: B.signal.aborted,
          exitPlanModeInput: N.exitPlanModeInput
        }
      }
    }
  },
  isReadOnly() {
    return !0
  },
  isConcurrencySafe() {
    return !0
  },
  isEnabled() {
    return !0
  },
  userFacingName() {
    return "Task"
  },
  async checkPermissions(A) {
    return {
      behavior: "allow",
      updatedInput: A
    }
  },
  mapToolResultToToolResultBlockParam(A, B) {
    if (A.exitPlanModeInput) return {
      tool_use_id: B,
      type: "tool_result",
      content: [{
        type: "text",
        text: `The agent created a new plan that was approved by the user. Please go ahead and start implementing this plan and use the todo tool if applicable. We are no longer in plan mode and you do not need to use the exit_plan_mode tool.

User-approved plan:` + A.exitPlanModeInput.plan
      }]
    };
    return {
      tool_use_id: B,
      type: "tool_result",
      content: A.content
    }
  },
  renderToolResultMessage({
    totalDurationMs: A,
    totalToolUseCount: B,
    totalTokens: Q,
    usage: I
  }, G, {
    tools: Z,
    verbose: D
  }) {
    let Y = ZA(),
      W = [B === 1 ? "1 tool use" : `${B} tool uses`, _G(Q) + " tokens", U_(A)],
      J = Y.parallelTasksCount > 1 ? `Done with ${Y.parallelTasksCount} parallel agents (${W.join(" · ")})` : `Done (${W.join(" · ")})`,
      F = xK({
        content: J,
        usage: I
      });
    return X4.createElement(h, {
      flexDirection: "column"
    }, D ? G.map((X) => X4.createElement(w0, {
      height: 1,
      key: X.uuid
    }, X4.createElement(wE, {
      message: X.data.message,
      messages: X.data.normalizedMessages,
      addMargin: !1,
      tools: Z,
      verbose: D,
      erroredToolUseIDs: new Set,
      inProgressToolUseIDs: new Set,
      resolvedToolUseIDs: new Set,
      progressMessagesForMessage: G,
      shouldAnimate: !1,
      shouldShowDot: !1
    }))) : null, X4.createElement(w0, {
      height: 1
    }, X4.createElement(wE, {
      message: F,
      messages: AQ([F]),
      addMargin: !1,
      tools: Z,
      verbose: D,
      erroredToolUseIDs: new Set,
      inProgressToolUseIDs: new Set,
      resolvedToolUseIDs: new Set,
      progressMessagesForMessage: [],
      shouldAnimate: !1,
      shouldShowDot: !1
    })))
  },
  renderToolUseMessage({
    description: A,
    prompt: B
  }, {
    theme: Q,
    verbose: I
  }) {
    if (!A || !B) return null;
    if (I) return `Task: ${A}

Prompt: ${kK(B,Q)}`;
    return A
  },
  renderToolUseProgressMessage(A, {
    tools: B,
    verbose: Q
  }) {
    let I = ZA();
    if (!A.length) return X4.createElement(w0, {
      height: 1
    }, X4.createElement(P, {
      color: "secondaryText"
    }, I.parallelTasksCount > 1 ? `Initializing ${I.parallelTasksCount} parallel agents…` : "Initializing…"));
    let G = I.parallelTasksCount > 1 && A.some((W) => W.toolUseID.startsWith("agent_") && W.toolUseID.includes("_")),
      Z = I.parallelTasksCount > 1 && A.some((W) => W.toolUseID.startsWith("synthesis_")),
      D = new Map;
    if (G)
      for (let W of A) {
        let J = "main";
        if (W.toolUseID.startsWith("agent_") && W.toolUseID.includes("_")) {
          let F = W.toolUseID.match(/^agent_(\d+)_/);
          if (F && F[1]) J = `Agent ${parseInt(F[1])+1}`
        } else if (W.toolUseID.startsWith("synthesis_")) J = "Synthesis";
        if (!D.has(J)) D.set(J, []);
        D.get(J).push(W)
      }
    let Y = A.filter((W) => {
      return W.data.message.message.content.some((F) => F.type === "tool_use")
    }).length;
    if (G && D.size > 1) {
      let W = [];
      for (let [J, F] of D.entries())
        if (F.length > 0) {
          let X = F[F.length - 1];
          if (X) W.push(X4.createElement(h, {
            key: J,
            flexDirection: "column",
            marginY: 1
          }, X4.createElement(P, {
            color: "success",
            bold: !0
          }, J, Z && J === "Synthesis" ? " (combining results)" : "", ":"), X4.createElement(wE, {
            key: X.uuid,
            message: X.data.message,
            messages: X.data.normalizedMessages,
            addMargin: !1,
            tools: B,
            verbose: Q,
            erroredToolUseIDs: new Set,
            inProgressToolUseIDs: new Set,
            resolvedToolUseIDs: tK1(F),
            progressMessagesForMessage: F,
            shouldAnimate: !1,
            shouldShowDot: !1
          })))
        } return X4.createElement(w0, null, X4.createElement(h, {
        flexDirection: "column"
      }, X4.createElement(P, {
        color: "secondaryText"
      }, Y, " total tool uses across ", D.size, " agents"), W))
    } else {
      let W = Q ? A : A.slice(-Q2A),
        J = W.filter((X) => {
          return X.data.message.message.content.some((C) => C.type === "tool_use")
        }).length,
        F = Y - J;
      if (!Q && A.length > Q2A) W = A.slice(-Q2A + 1);
      return X4.createElement(w0, null, X4.createElement(h, {
        flexDirection: "column"
      }, W.map((X) => X4.createElement(wE, {
        key: X.uuid,
        message: X.data.message,
        messages: X.data.normalizedMessages,
        addMargin: !1,
        tools: B,
        verbose: Q,
        erroredToolUseIDs: new Set,
        inProgressToolUseIDs: new Set,
        resolvedToolUseIDs: tK1(A),
        progressMessagesForMessage: A,
        shouldAnimate: !1,
        shouldShowDot: !1,
        style: "condensed"
      })), F > 0 && X4.createElement(P, {
        color: "secondaryText"
      }, "+", F, " more tool ", F === 1 ? "use" : "uses")))
    }
  },
  renderToolUseRejectedMessage(A, {
    progressMessagesForMessage: B,
    tools: Q,
    verbose: I
  }) {
    return X4.createElement(X4.Fragment, null, this.renderToolUseProgressMessage(B, {
      tools: Q,
      verbose: I
    }), X4.createElement(C5, null))
  },
  renderToolUseErrorMessage(A, {
    progressMessagesForMessage: B,
    tools: Q,
    verbose: I
  }) {
    return X4.createElement(X4.Fragment, null, this.renderToolUseProgressMessage(B, {
      tools: Q,
      verbose: I
    }), X4.createElement(K6, {
      result: A,
      verbose: I
    }))
  }
}
// @from(Start 9991733, End 9991750)
HN5 = I1(U1(), 1)
// @from(Start 9991756, End 9991855)
z$B = n.strictObject({
  shell_id: n.string().describe("The ID of the background shell to kill")
})
// @from(Start 9991861, End 9991878)
zN5 = I1(U1(), 1)
// @from(Start 9991884, End 9991999)
j$B = n.strictObject({
  shell_id: n.string().describe("The ID of the background shell to retrieve output from")
})
// @from(Start 9992005, End 9992021)
SE = I1(U1(), 1)
// @from(Start 9992027, End 9992044)
c_2 = "WebSearch"
// @from(Start 9992048, End 9992538)
l_2 = `
- Allows Claude to search the web and use the results to inform responses
- Provides up-to-date information for current events and recent data
- Returns search result information formatted as search result blocks
- Use this tool for accessing information beyond Claude's knowledge cutoff
- Searches are performed automatically within a single API call

Usage notes:
  - Domain filtering is supported to include or block specific websites
  - Web search is only available in the US
`
// @from(Start 9992541, End 9992721)
function wN5(A) {
  let B = 0,
    Q = 0;
  for (let I of A)
    if (typeof I !== "string") B++, Q += I.content.length;
  return {
    searchCount: B,
    totalResultCount: Q
  }
}
// @from(Start 9992726, End 9993043)
EN5 = n.strictObject({
    query: n.string().min(2).describe("The search query to use"),
    allowed_domains: n.array(n.string()).optional().describe("Only include search results from these domains"),
    blocked_domains: n.array(n.string()).optional().describe("Never include search results from these domains")
  })
// @from(Start 9993047, End 9993247)
UN5 = (A) => {
    return {
      type: "web_search_20250305",
      name: "web_search",
      allowed_domains: A.allowed_domains,
      blocked_domains: A.blocked_domains,
      max_uses: 8
    }
  }
// @from(Start 9993250, End 9994067)
function NN5(A, B, Q) {
  let I = [],
    G = "",
    Z = !0;
  for (let D of A) {
    if (D.type === "server_tool_use") {
      if (Z) {
        if (Z = !1, G.trim().length > 0) I.push(G.trim());
        G = ""
      }
      continue
    }
    if (D.type === "web_search_tool_result") {
      if (!Array.isArray(D.content)) {
        let W = `Web search error: ${D.content.error_code}`;
        b1(new Error(W)), I.push(W);
        continue
      }
      let Y = D.content.map((W) => ({
        title: W.title,
        url: W.url
      }));
      I.push({
        tool_use_id: D.tool_use_id,
        content: Y
      })
    }
    if (D.type === "text")
      if (Z) G += D.text;
      else Z = !0, G = D.text
  }
  if (G.length) I.push(G.trim());
  return {
    query: B,
    results: I,
    durationSeconds: Q
  }
}
// @from(Start 9994072, End 9999473)
i_2 = {
  name: c_2,
  async description(A) {
    return `Claude wants to search the web for: ${A.query}`
  },
  userFacingName() {
    return "Web Search"
  },
  isEnabled() {
    return MQ() === "firstParty"
  },
  inputSchema: EN5,
  isConcurrencySafe() {
    return !0
  },
  isReadOnly() {
    return !0
  },
  async checkPermissions(A) {
    return {
      behavior: "allow",
      updatedInput: A
    }
  },
  async prompt() {
    return l_2
  },
  renderToolUseMessage({
    query: A,
    allowed_domains: B,
    blocked_domains: Q
  }, {
    verbose: I
  }) {
    if (!A) return null;
    let G = "";
    if (A) G += `"${A}"`;
    if (I) {
      if (B && B.length > 0) G += `, only allowing domains: ${B.join(", ")}`;
      if (Q && Q.length > 0) G += `, blocking domains: ${Q.join(", ")}`
    }
    return G
  },
  renderToolUseRejectedMessage() {
    return SE.default.createElement(C5, null)
  },
  renderToolUseErrorMessage(A, {
    verbose: B
  }) {
    return SE.default.createElement(K6, {
      result: A,
      verbose: B
    })
  },
  renderToolUseProgressMessage(A) {
    if (A.length === 0) return null;
    let B = A[A.length - 1];
    if (!B?.data) return null;
    let Q = B.data;
    switch (Q.type) {
      case "query_update":
        return SE.default.createElement(w0, null, SE.default.createElement(P, {
          dimColor: !0
        }, "Searching: ", Q.query));
      case "search_results_received":
        return SE.default.createElement(w0, null, SE.default.createElement(P, {
          dimColor: !0
        }, "Found ", Q.resultCount, ' results for "', Q.query, '"'));
      default:
        return null
    }
  },
  renderToolResultMessage(A) {
    let {
      searchCount: B
    } = wN5(A.results), Q = A.durationSeconds >= 1 ? `${Math.round(A.durationSeconds)}s` : `${Math.round(A.durationSeconds*1000)}ms`;
    return SE.default.createElement(h, {
      justifyContent: "space-between",
      width: "100%"
    }, SE.default.createElement(w0, {
      height: 1
    }, SE.default.createElement(P, null, "Did ", B, " search", B !== 1 ? "es" : "", " in ", Q)))
  },
  async validateInput(A) {
    let {
      query: B,
      allowed_domains: Q,
      blocked_domains: I
    } = A;
    if (!B.length) return {
      result: !1,
      message: "Error: Missing query",
      errorCode: 1
    };
    if (Q && I) return {
      result: !1,
      message: "Error: Cannot specify both allowed_domains and blocked_domains in the same request",
      errorCode: 2
    };
    return {
      result: !0
    }
  },
  async * call(A, B) {
    let Q = performance.now(),
      {
        query: I
      } = A,
      G = K2({
        content: "Perform a web search for the query: " + I
      }),
      Z = UN5(A),
      D = wu([G], ["You are an assistant for performing a web search tool use"], B.options.maxThinkingTokens, [], B.abortController.signal, {
        getToolPermissionContext: B.getToolPermissionContext,
        model: J7(),
        prependCLISysprompt: !0,
        toolChoice: void 0,
        isNonInteractiveSession: B.options.isNonInteractiveSession,
        extraToolSchemas: [Z]
      }),
      Y = [],
      W = null,
      J = "",
      F = 0,
      X = new Map;
    for await (let q of D) {
      if (Y.push(q), q.type === "stream_event" && q.event?.type === "content_block_start") {
        let O = q.event.content_block;
        if (O && O.type === "server_tool_use") {
          W = O.id, J = "";
          continue
        }
      }
      if (W && q.type === "stream_event" && q.event?.type === "content_block_delta") {
        let O = q.event.delta;
        if (O?.type === "input_json_delta" && O.partial_json) {
          J += O.partial_json;
          try {
            let R = J.match(/"query"\s*:\s*"((?:[^"\\]|\\.)*)"/);
            if (R && R[1]) {
              let T = JSON.parse('"' + R[1] + '"');
              if (!X.has(W) || X.get(W) !== T) X.set(W, T), F++, yield {
                type: "progress",
                toolUseID: `search-progress-${F}`,
                data: {
                  type: "query_update",
                  query: T
                }
              }
            }
          } catch {}
        }
      }
      if (q.type === "stream_event" && q.event?.type === "content_block_start") {
        let O = q.event.content_block;
        if (O && O.type === "web_search_tool_result") {
          let R = O.tool_use_id,
            T = X.get(R) || I,
            L = O.content;
          F++, yield {
            type: "progress",
            toolUseID: R || `search-progress-${F}`,
            data: {
              type: "search_results_received",
              resultCount: Array.isArray(L) ? L.length : 0,
              query: T
            }
          }
        }
      }
    }
    let C = Y.filter((q) => q.type === "assistant").flatMap((q) => q.message.content),
      E = (performance.now() - Q) / 1000;
    yield {
      type: "result",
      data: NN5(C, I, E)
    }
  },
  mapToolResultToToolResultBlockParam(A, B) {
    let {
      query: Q,
      results: I
    } = A, G = `Web search results for query: "${Q}"

`;
    return I.forEach((Z) => {
      if (typeof Z === "string") G += Z + `

`;
      else if (Z.content.length > 0) G += `Links: ${JSON.stringify(Z.content)}

`;
      else G += `No links found.

`
    }), {
      tool_use_id: B,
      type: "tool_result",
      content: G.trim()
    }
  }
}
// @from(Start 9999479, End 9999503)
n$B = n.strictObject({})
// @from(Start 9999509, End 9999914)
CT = (A, B) => {
  let Q = [p_2, E4, g$, qy, WE, hO, OB, gI, S$, nJ, ...process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL ? [] : [J11], iO, $W, ...B ? [oN, yG] : [], i_2, ...[], ...[]],
    I = Pv(A),
    G = Q.filter((D) => {
      return !I.some((Y) => Y.ruleValue.toolName === D.name && Y.ruleValue.ruleContent === void 0)
    }),
    Z = G.map((D) => D.isEnabled());
  return G.filter((D, Y) => Z[Y])
}
// @from(Start 9999962, End 10000383)
MN5 = {
    type: "local",
    name: "files",
    description: "List all files currently in context",
    isEnabled: () => !1,
    isHidden: !1,
    async call(A, B) {
      let Q = B.readFileState ? Object.keys(B.readFileState) : [];
      if (Q.length === 0) return "No files in context";
      return `Files in context:
${Q.map((G)=>qN5(dA(),G)).join(`
`)}`
    },
    userFacingName() {
      return "files"
    }
  }
// @from(Start 10000387, End 10000396)
n_2 = MN5
// @from(Start 10000459, End 10000975)
function a_2(A) {
  let B = /^---\s*\n([\s\S]*?)---\s*\n?/,
    Q = A.match(B);
  if (!Q) return {
    frontmatter: {},
    content: A
  };
  let I = Q[1] || "",
    G = A.slice(Q[0].length),
    Z = {},
    D = I.split(`
`);
  for (let Y of D) {
    let W = Y.indexOf(":");
    if (W > 0) {
      let J = Y.slice(0, W).trim(),
        F = Y.slice(W + 1).trim();
      if (J && F) {
        let X = F.replace(/^["']|["']$/g, "");
        Z[J] = X
      }
    }
  }
  return {
    frontmatter: Z,
    content: G
  }
}
// @from(Start 10000977, End 10001457)
function s_2({
  permissionModeCli: A,
  dangerouslySkipPermissions: B
}) {
  let Q = m6(),
    I = Q.permissions?.disableBypassPermissionsMode === "disable",
    G = [];
  if (B) G.push("bypassPermissions");
  if (A) G.push(_fA(A));
  if (Q.permissions?.defaultMode) G.push(Q.permissions.defaultMode);
  for (let Z of G)
    if (Z === "bypassPermissions" && I) {
      M6("bypassPermissions mode is disabled by settings");
      continue
    } else return Z;
  return "default"
}
// @from(Start 10001459, End 10002072)
function Lp(A) {
  if (A.length === 0) return [];
  let B = [];
  for (let Q of A) {
    if (!Q) continue;
    let I = "",
      G = !1;
    for (let Z of Q) switch (Z) {
      case "(":
        G = !0, I += Z;
        break;
      case ")":
        G = !1, I += Z;
        break;
      case ",":
        if (G) I += Z;
        else {
          if (I.trim()) B.push(I.trim());
          I = ""
        }
        break;
      case " ":
        if (G) I += Z;
        else if (I.trim()) B.push(I.trim()), I = "";
        break;
      default:
        I += Z
    }
    if (I.trim()) B.push(I.trim())
  }
  return B
}
// @from(Start 10002074, End 10002868)
function r_2({
  allowedToolsCli: A,
  disallowedToolsCli: B,
  permissionMode: Q,
  addDirs: I
}) {
  let G = Lp(A),
    Z = Lp(B),
    D = [],
    Y = new Set,
    W = process.env.PWD;
  if (W && W !== e9()) Y.add(W);
  let J = nfA({
      mode: Q,
      additionalWorkingDirectories: Y,
      alwaysAllowRules: {
        cliArg: G
      },
      alwaysDenyRules: {
        cliArg: Z
      },
      isBypassPermissionsModeAvailable: Q === "bypassPermissions"
    }, mfA()),
    X = [...m6().permissions?.additionalDirectories || [], ...I];
  for (let V of X) {
    let C = xA1(V, J);
    if (C.resultType === "success") J = C.updatedPermissionContext;
    else if (C.resultType !== "alreadyInWorkingDirectory") D.push(fA1(C))
  }
  return {
    toolPermissionContext: J,
    warnings: D
  }
}
// @from(Start 10002873, End 10002908)
LN5 = /```!\s*\n?([\s\S]*?)\n?```/g
// @from(Start 10002912, End 10002931)
RN5 = /!`([^`]+)`/g