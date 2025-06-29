
// @from(Start 7371521, End 7374943)
GH2 = z((si8, IH2) => {
  var eK2 = (A, B) => (...Q) => {
      return `\x1B[${A(...Q)+B}m`
    },
    AH2 = (A, B) => (...Q) => {
      let I = A(...Q);
      return `\x1B[${38+B};5;${I}m`
    },
    BH2 = (A, B) => (...Q) => {
      let I = A(...Q);
      return `\x1B[${38+B};2;${I[0]};${I[1]};${I[2]}m`
    },
    KK1 = (A) => A,
    QH2 = (A, B, Q) => [A, B, Q],
    od = (A, B, Q) => {
      Object.defineProperty(A, B, {
        get: () => {
          let I = Q();
          return Object.defineProperty(A, B, {
            value: I,
            enumerable: !0,
            configurable: !0
          }), I
        },
        enumerable: !0,
        configurable: !0
      })
    },
    io1, td = (A, B, Q, I) => {
      if (io1 === void 0) io1 = lo1();
      let G = I ? 10 : 0,
        Z = {};
      for (let [D, Y] of Object.entries(io1)) {
        let W = D === "ansi16" ? "ansi" : D;
        if (D === B) Z[W] = A(Q, G);
        else if (typeof Y === "object") Z[W] = A(Y[B], G)
      }
      return Z
    };

  function RQ5() {
    let A = new Map,
      B = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
    B.color.gray = B.color.blackBright, B.bgColor.bgGray = B.bgColor.bgBlackBright, B.color.grey = B.color.blackBright, B.bgColor.bgGrey = B.bgColor.bgBlackBright;
    for (let [Q, I] of Object.entries(B)) {
      for (let [G, Z] of Object.entries(I)) B[G] = {
        open: `\x1B[${Z[0]}m`,
        close: `\x1B[${Z[1]}m`
      }, I[G] = B[G], A.set(Z[0], Z[1]);
      Object.defineProperty(B, Q, {
        value: I,
        enumerable: !1
      })
    }
    return Object.defineProperty(B, "codes", {
      value: A,
      enumerable: !1
    }), B.color.close = "\x1B[39m", B.bgColor.close = "\x1B[49m", od(B.color, "ansi", () => td(eK2, "ansi16", KK1, !1)), od(B.color, "ansi256", () => td(AH2, "ansi256", KK1, !1)), od(B.color, "ansi16m", () => td(BH2, "rgb", QH2, !1)), od(B.bgColor, "ansi", () => td(eK2, "ansi16", KK1, !0)), od(B.bgColor, "ansi256", () => td(AH2, "ansi256", KK1, !0)), od(B.bgColor, "ansi16m", () => td(BH2, "rgb", QH2, !0)), B
  }
  Object.defineProperty(IH2, "exports", {
    enumerable: !0,
    get: RQ5
  })
})
// @from(Start 7374949, End 7377099)
YH2 = z((ri8, DH2) => {
  var OQ5 = Z1("os"),
    ZH2 = Z1("tty"),
    JV = Sl(),
    {
      env: vI
    } = process,
    jO;
  if (JV("no-color") || JV("no-colors") || JV("color=false") || JV("color=never")) jO = 0;
  else if (JV("color") || JV("colors") || JV("color=true") || JV("color=always")) jO = 1;
  if ("FORCE_COLOR" in vI)
    if (vI.FORCE_COLOR === "true") jO = 1;
    else if (vI.FORCE_COLOR === "false") jO = 0;
  else jO = vI.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(vI.FORCE_COLOR, 10), 3);

  function no1(A) {
    if (A === 0) return !1;
    return {
      level: A,
      hasBasic: !0,
      has256: A >= 2,
      has16m: A >= 3
    }
  }

  function ao1(A, B) {
    if (jO === 0) return 0;
    if (JV("color=16m") || JV("color=full") || JV("color=truecolor")) return 3;
    if (JV("color=256")) return 2;
    if (A && !B && jO === void 0) return 0;
    let Q = jO || 0;
    if (vI.TERM === "dumb") return Q;
    if (process.platform === "win32") {
      let I = OQ5.release().split(".");
      if (Number(I[0]) >= 10 && Number(I[2]) >= 10586) return Number(I[2]) >= 14931 ? 3 : 2;
      return 1
    }
    if ("CI" in vI) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((I) => (I in vI)) || vI.CI_NAME === "codeship") return 1;
      return Q
    }
    if ("TEAMCITY_VERSION" in vI) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(vI.TEAMCITY_VERSION) ? 1 : 0;
    if (vI.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in vI) {
      let I = parseInt((vI.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (vI.TERM_PROGRAM) {
        case "iTerm.app":
          return I >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2
      }
    }
    if (/-256(color)?$/i.test(vI.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(vI.TERM)) return 1;
    if ("COLORTERM" in vI) return 1;
    return Q
  }

  function TQ5(A) {
    let B = ao1(A, A && A.isTTY);
    return no1(B)
  }
  DH2.exports = {
    supportsColor: TQ5,
    stdout: no1(ao1(!0, ZH2.isatty(1))),
    stderr: no1(ao1(!0, ZH2.isatty(2)))
  }
})
// @from(Start 7377105, End 7377773)
JH2 = z((oi8, WH2) => {
  var PQ5 = (A, B, Q) => {
      let I = A.indexOf(B);
      if (I === -1) return A;
      let G = B.length,
        Z = 0,
        D = "";
      do D += A.substr(Z, I - Z) + B + Q, Z = I + G, I = A.indexOf(B, Z); while (I !== -1);
      return D += A.substr(Z), D
    },
    SQ5 = (A, B, Q, I) => {
      let G = 0,
        Z = "";
      do {
        let D = A[I - 1] === "\r";
        Z += A.substr(G, (D ? I - 1 : I) - G) + B + (D ? `\r
` : `
`) + Q, G = I + 1, I = A.indexOf(`
`, G)
      } while (I !== -1);
      return Z += A.substr(G), Z
    };
  WH2.exports = {
    stringReplaceAll: PQ5,
    stringEncaseCRLFWithFirstIndex: SQ5
  }
})
// @from(Start 7377779, End 7380405)
KH2 = z((ti8, CH2) => {
  var _Q5 = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,
    FH2 = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,
    jQ5 = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
    yQ5 = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,
    kQ5 = new Map([
      ["n", `
`],
      ["r", "\r"],
      ["t", "\t"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\x00"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);

  function VH2(A) {
    let B = A[0] === "u",
      Q = A[1] === "{";
    if (B && !Q && A.length === 5 || A[0] === "x" && A.length === 3) return String.fromCharCode(parseInt(A.slice(1), 16));
    if (B && Q) return String.fromCodePoint(parseInt(A.slice(2, -1), 16));
    return kQ5.get(A) || A
  }

  function xQ5(A, B) {
    let Q = [],
      I = B.trim().split(/\s*,\s*/g),
      G;
    for (let Z of I) {
      let D = Number(Z);
      if (!Number.isNaN(D)) Q.push(D);
      else if (G = Z.match(jQ5)) Q.push(G[2].replace(yQ5, (Y, W, J) => W ? VH2(W) : J));
      else throw new Error(`Invalid Chalk template style argument: ${Z} (in style '${A}')`)
    }
    return Q
  }

  function fQ5(A) {
    FH2.lastIndex = 0;
    let B = [],
      Q;
    while ((Q = FH2.exec(A)) !== null) {
      let I = Q[1];
      if (Q[2]) {
        let G = xQ5(I, Q[2]);
        B.push([I].concat(G))
      } else B.push([I])
    }
    return B
  }

  function XH2(A, B) {
    let Q = {};
    for (let G of B)
      for (let Z of G.styles) Q[Z[0]] = G.inverse ? null : Z.slice(1);
    let I = A;
    for (let [G, Z] of Object.entries(Q)) {
      if (!Array.isArray(Z)) continue;
      if (!(G in I)) throw new Error(`Unknown Chalk style: ${G}`);
      I = Z.length > 0 ? I[G](...Z) : I[G]
    }
    return I
  }
  CH2.exports = (A, B) => {
    let Q = [],
      I = [],
      G = [];
    if (B.replace(_Q5, (Z, D, Y, W, J, F) => {
        if (D) G.push(VH2(D));
        else if (W) {
          let X = G.join("");
          G = [], I.push(Q.length === 0 ? X : XH2(A, Q)(X)), Q.push({
            inverse: Y,
            styles: fQ5(W)
          })
        } else if (J) {
          if (Q.length === 0) throw new Error("Found extraneous } in Chalk template literal");
          I.push(XH2(A, Q)(G.join(""))), G = [], Q.pop()
        } else G.push(F)
      }), I.push(G.join("")), Q.length > 0) {
      let Z = `Chalk template literal is missing ${Q.length} closing bracket${Q.length===1?"":"s"} (\`}\`)`;
      throw new Error(Z)
    }
    return I.join("")
  }
})
// @from(Start 7380411, End 7384301)
qH2 = z((ei8, $H2) => {
  var Q11 = GH2(),
    {
      stdout: ro1,
      stderr: oo1
    } = YH2(),
    {
      stringReplaceAll: vQ5,
      stringEncaseCRLFWithFirstIndex: bQ5
    } = JH2(),
    {
      isArray: HK1
    } = Array,
    zH2 = ["ansi", "ansi", "ansi256", "ansi16m"],
    ed = Object.create(null),
    gQ5 = (A, B = {}) => {
      if (B.level && !(Number.isInteger(B.level) && B.level >= 0 && B.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
      let Q = ro1 ? ro1.level : 0;
      A.level = B.level === void 0 ? Q : B.level
    };
  class wH2 {
    constructor(A) {
      return EH2(A)
    }
  }
  var EH2 = (A) => {
    let B = {};
    return gQ5(B, A), B.template = (...Q) => NH2(B.template, ...Q), Object.setPrototypeOf(B, zK1.prototype), Object.setPrototypeOf(B.template, B), B.template.constructor = () => {
      throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")
    }, B.template.Instance = wH2, B.template
  };

  function zK1(A) {
    return EH2(A)
  }
  for (let [A, B] of Object.entries(Q11)) ed[A] = {
    get() {
      let Q = wK1(this, to1(B.open, B.close, this._styler), this._isEmpty);
      return Object.defineProperty(this, A, {
        value: Q
      }), Q
    }
  };
  ed.visible = {
    get() {
      let A = wK1(this, this._styler, !0);
      return Object.defineProperty(this, "visible", {
        value: A
      }), A
    }
  };
  var UH2 = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
  for (let A of UH2) ed[A] = {
    get() {
      let {
        level: B
      } = this;
      return function(...Q) {
        let I = to1(Q11.color[zH2[B]][A](...Q), Q11.color.close, this._styler);
        return wK1(this, I, this._isEmpty)
      }
    }
  };
  for (let A of UH2) {
    let B = "bg" + A[0].toUpperCase() + A.slice(1);
    ed[B] = {
      get() {
        let {
          level: Q
        } = this;
        return function(...I) {
          let G = to1(Q11.bgColor[zH2[Q]][A](...I), Q11.bgColor.close, this._styler);
          return wK1(this, G, this._isEmpty)
        }
      }
    }
  }
  var hQ5 = Object.defineProperties(() => {}, {
      ...ed,
      level: {
        enumerable: !0,
        get() {
          return this._generator.level
        },
        set(A) {
          this._generator.level = A
        }
      }
    }),
    to1 = (A, B, Q) => {
      let I, G;
      if (Q === void 0) I = A, G = B;
      else I = Q.openAll + A, G = B + Q.closeAll;
      return {
        open: A,
        close: B,
        openAll: I,
        closeAll: G,
        parent: Q
      }
    },
    wK1 = (A, B, Q) => {
      let I = (...G) => {
        if (HK1(G[0]) && HK1(G[0].raw)) return HH2(I, NH2(I, ...G));
        return HH2(I, G.length === 1 ? "" + G[0] : G.join(" "))
      };
      return Object.setPrototypeOf(I, hQ5), I._generator = A, I._styler = B, I._isEmpty = Q, I
    },
    HH2 = (A, B) => {
      if (A.level <= 0 || !B) return A._isEmpty ? "" : B;
      let Q = A._styler;
      if (Q === void 0) return B;
      let {
        openAll: I,
        closeAll: G
      } = Q;
      if (B.indexOf("\x1B") !== -1)
        while (Q !== void 0) B = vQ5(B, Q.close, Q.open), Q = Q.parent;
      let Z = B.indexOf(`
`);
      if (Z !== -1) B = bQ5(B, G, I, Z);
      return I + B + G
    },
    so1, NH2 = (A, ...B) => {
      let [Q] = B;
      if (!HK1(Q) || !HK1(Q.raw)) return B.join(" ");
      let I = B.slice(1),
        G = [Q.raw[0]];
      for (let Z = 1; Z < Q.length; Z++) G.push(String(I[Z - 1]).replace(/[{}\\]/g, "\\$&"), String(Q.raw[Z]));
      if (so1 === void 0) so1 = KH2();
      return so1(A, G.join(""))
    };
  Object.defineProperties(zK1.prototype, ed);
  var EK1 = zK1();
  EK1.supportsColor = ro1;
  EK1.stderr = zK1({
    level: oo1 ? oo1.level : 0
  });
  EK1.stderr.supportsColor = oo1;
  $H2.exports = EK1
})
// @from(Start 7384307, End 7386581)
eo1 = z((I6) => {
  var mQ5 = I6 && I6.__importDefault || function(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  };
  Object.defineProperty(I6, "__esModule", {
    value: !0
  });
  I6.parse = I6.stringify = I6.toJson = I6.fromJson = I6.DEFAULT_THEME = I6.plain = void 0;
  var t3 = mQ5(qH2()),
    dQ5 = function(A) {
      return A
    };
  I6.plain = dQ5;
  I6.DEFAULT_THEME = {
    keyword: t3.default.blue,
    built_in: t3.default.cyan,
    type: t3.default.cyan.dim,
    literal: t3.default.blue,
    number: t3.default.green,
    regexp: t3.default.red,
    string: t3.default.red,
    subst: I6.plain,
    symbol: I6.plain,
    class: t3.default.blue,
    function: t3.default.yellow,
    title: I6.plain,
    params: I6.plain,
    comment: t3.default.green,
    doctag: t3.default.green,
    meta: t3.default.grey,
    "meta-keyword": I6.plain,
    "meta-string": I6.plain,
    section: I6.plain,
    tag: t3.default.grey,
    name: t3.default.blue,
    "builtin-name": I6.plain,
    attr: t3.default.cyan,
    attribute: I6.plain,
    variable: I6.plain,
    bullet: I6.plain,
    code: I6.plain,
    emphasis: t3.default.italic,
    strong: t3.default.bold,
    formula: I6.plain,
    link: t3.default.underline,
    quote: I6.plain,
    "selector-tag": I6.plain,
    "selector-id": I6.plain,
    "selector-class": I6.plain,
    "selector-attr": I6.plain,
    "selector-pseudo": I6.plain,
    "template-tag": I6.plain,
    "template-variable": I6.plain,
    addition: t3.default.green,
    deletion: t3.default.red,
    default: I6.plain
  };

  function MH2(A) {
    var B = {};
    for (var Q = 0, I = Object.keys(A); Q < I.length; Q++) {
      var G = I[Q],
        Z = A[G];
      if (Array.isArray(Z)) B[G] = Z.reduce(function(D, Y) {
        return Y === "plain" ? I6.plain : D[Y]
      }, t3.default);
      else B[G] = t3.default[Z]
    }
    return B
  }
  I6.fromJson = MH2;

  function LH2(A) {
    var B = {};
    for (var Q = 0, I = Object.keys(B); Q < I.length; Q++) {
      var G = I[Q],
        Z = B[G];
      B[G] = Z._styles
    }
    return B
  }
  I6.toJson = LH2;

  function uQ5(A) {
    return JSON.stringify(LH2(A))
  }
  I6.stringify = uQ5;

  function pQ5(A) {
    return MH2(JSON.parse(A))
  }
  I6.parse = pQ5
})
// @from(Start 7386587, End 7389364)
Bt1 = z((E7) => {
  var RH2 = E7 && E7.__createBinding || (Object.create ? function(A, B, Q, I) {
      if (I === void 0) I = Q;
      Object.defineProperty(A, I, {
        enumerable: !0,
        get: function() {
          return B[Q]
        }
      })
    } : function(A, B, Q, I) {
      if (I === void 0) I = Q;
      A[I] = B[Q]
    }),
    cQ5 = E7 && E7.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    OH2 = E7 && E7.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) RH2(B, A, Q)
      }
      return cQ5(B, A), B
    },
    lQ5 = E7 && E7.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) RH2(B, A, Q)
    },
    iQ5 = E7 && E7.__importDefault || function(A) {
      return A && A.__esModule ? A : {
        default: A
      }
    };
  Object.defineProperty(E7, "__esModule", {
    value: !0
  });
  E7.supportsLanguage = E7.listLanguages = E7.highlight = void 0;
  var NK1 = OH2(oT1()),
    nQ5 = OH2(bK2()),
    aQ5 = iQ5(iK2()),
    UK1 = eo1();

  function At1(A, B, Q) {
    if (B === void 0) B = {};
    switch (A.type) {
      case "text": {
        var I = A.data;
        if (Q === void 0) return (B.default || UK1.DEFAULT_THEME.default || UK1.plain)(I);
        return I
      }
      case "tag": {
        var G = /hljs-(\w+)/.exec(A.attribs.class);
        if (G) {
          var Z = G[1],
            D = A.childNodes.map(function(Y) {
              return At1(Y, B, Z)
            }).join("");
          return (B[Z] || UK1.DEFAULT_THEME[Z] || UK1.plain)(D)
        }
        return A.childNodes.map(function(Y) {
          return At1(Y, B)
        }).join("")
      }
    }
    throw new Error("Invalid node type " + A.type)
  }

  function sQ5(A, B) {
    if (B === void 0) B = {};
    var Q = nQ5.parseFragment(A, {
      treeAdapter: aQ5.default
    });
    return Q.childNodes.map(function(I) {
      return At1(I, B)
    }).join("")
  }

  function TH2(A, B) {
    if (B === void 0) B = {};
    var Q;
    if (B.language) Q = NK1.highlight(A, {
      language: B.language,
      ignoreIllegals: B.ignoreIllegals
    }).value;
    else Q = NK1.highlightAuto(A, B.languageSubset).value;
    return sQ5(Q, B.theme)
  }
  E7.highlight = TH2;

  function rQ5() {
    return NK1.listLanguages()
  }
  E7.listLanguages = rQ5;

  function oQ5(A) {
    return !!NK1.getLanguage(A)
  }
  E7.supportsLanguage = oQ5;
  E7.default = TH2;
  lQ5(eo1(), E7)
})
// @from(Start 7389370, End 7389378)
SH2 = {}
// @from(Start 7389485, End 7390261)
function PH2(A) {
  let B = null,
    Q = [];
  async function I() {
    if (!B) B = (async () => {
      let {
        processImage: Z
      } = eQ5("./image-processor.node"), D = await Z(A);
      for (let Y of Q) Y(D);
      return D
    })();
    return B
  }
  let G = {
    async metadata() {
      return (await I()).metadata()
    },
    resize(Z, D, Y) {
      return Q.push((W) => {
        W.resize(Z, D, Y)
      }), G
    },
    jpeg(Z) {
      return Q.push((D) => {
        D.jpeg(Z?.quality)
      }), G
    },
    png(Z) {
      return Q.push((D) => {
        D.png(Z)
      }), G
    },
    webp(Z) {
      return Q.push((D) => {
        D.webp(Z?.quality)
      }), G
    },
    async toBuffer() {
      return (await I()).toBuffer()
    }
  };
  return G
}
// @from(Start 7390266, End 7390269)
eQ5
// @from(Start 7390271, End 7390274)
A75
// @from(Start 7390280, End 7390342)
_H2 = J21(() => {
  eQ5 = tQ5(import.meta.url);
  A75 = PH2
})
// @from(Start 7390348, End 7392111)
GE = z((Yn8, yH2) => {
  var jH2 = function(A) {
      return typeof A !== "undefined" && A !== null
    },
    B75 = function(A) {
      return typeof A === "object"
    },
    Q75 = function(A) {
      return Object.prototype.toString.call(A) === "[object Object]"
    },
    I75 = function(A) {
      return typeof A === "function"
    },
    G75 = function(A) {
      return typeof A === "boolean"
    },
    Z75 = function(A) {
      return A instanceof Buffer
    },
    D75 = function(A) {
      if (jH2(A)) switch (A.constructor) {
        case Uint8Array:
        case Uint8ClampedArray:
        case Int8Array:
        case Uint16Array:
        case Int16Array:
        case Uint32Array:
        case Int32Array:
        case Float32Array:
        case Float64Array:
          return !0
      }
      return !1
    },
    Y75 = function(A) {
      return A instanceof ArrayBuffer
    },
    W75 = function(A) {
      return typeof A === "string" && A.length > 0
    },
    J75 = function(A) {
      return typeof A === "number" && !Number.isNaN(A)
    },
    F75 = function(A) {
      return Number.isInteger(A)
    },
    X75 = function(A, B, Q) {
      return A >= B && A <= Q
    },
    V75 = function(A, B) {
      return B.includes(A)
    },
    C75 = function(A, B, Q) {
      return new Error(`Expected ${B} for ${A} but received ${Q} of type ${typeof Q}`)
    },
    K75 = function(A, B) {
      return B.message = A.message, B
    };
  yH2.exports = {
    defined: jH2,
    object: B75,
    plainObject: Q75,
    fn: I75,
    bool: G75,
    buffer: Z75,
    typedArray: D75,
    arrayBuffer: Y75,
    string: W75,
    number: J75,
    integer: F75,
    inRange: X75,
    inArray: V75,
    invalidParameterError: C75,
    nativeError: K75
  }
})
// @from(Start 7392117, End 7392551)
fH2 = z((Wn8, xH2) => {
  var kH2 = () => process.platform === "linux",
    qK1 = null,
    H75 = () => {
      if (!qK1)
        if (kH2() && process.report) {
          let A = process.report.excludeNetwork;
          process.report.excludeNetwork = !0, qK1 = process.report.getReport(), process.report.excludeNetwork = A
        } else qK1 = {};
      return qK1
    };
  xH2.exports = {
    isLinux: kH2,
    getReport: H75
  }
})
// @from(Start 7392557, End 7392885)
gH2 = z((Jn8, bH2) => {
  var vH2 = Z1("fs"),
    z75 = (A) => vH2.readFileSync(A, "utf-8"),
    w75 = (A) => new Promise((B, Q) => {
      vH2.readFile(A, "utf-8", (I, G) => {
        if (I) Q(I);
        else B(G)
      })
    });
  bH2.exports = {
    LDD_PATH: "/usr/bin/ldd",
    readFileSync: z75,
    readFile: w75
  }
})
// @from(Start 7392891, End 7396457)
LK1 = z((Fn8, Az2) => {
  var mH2 = Z1("child_process"),
    {
      isLinux: Qu,
      getReport: dH2
    } = fH2(),
    {
      LDD_PATH: MK1,
      readFile: uH2,
      readFileSync: pH2
    } = gH2(),
    ZE, DE, yO = "",
    cH2 = () => {
      if (!yO) return new Promise((A) => {
        mH2.exec("getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true", (B, Q) => {
          yO = B ? " " : Q, A(yO)
        })
      });
      return yO
    },
    lH2 = () => {
      if (!yO) try {
        yO = mH2.execSync("getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true", {
          encoding: "utf8"
        })
      } catch (A) {
        yO = " "
      }
      return yO
    },
    kO = "glibc",
    iH2 = /LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i,
    Bu = "musl",
    E75 = (A) => A.includes("libc.musl-") || A.includes("ld-musl-"),
    nH2 = () => {
      let A = dH2();
      if (A.header && A.header.glibcVersionRuntime) return kO;
      if (Array.isArray(A.sharedObjects)) {
        if (A.sharedObjects.some(E75)) return Bu
      }
      return null
    },
    aH2 = (A) => {
      let [B, Q] = A.split(/[\r\n]+/);
      if (B && B.includes(kO)) return kO;
      if (Q && Q.includes(Bu)) return Bu;
      return null
    },
    sH2 = (A) => {
      if (A.includes("musl")) return Bu;
      if (A.includes("GNU C Library")) return kO;
      return null
    },
    U75 = async () => {
      if (ZE !== void 0) return ZE;
      ZE = null;
      try {
        let A = await uH2(MK1);
        ZE = sH2(A)
      } catch (A) {}
      return ZE
    }, N75 = () => {
      if (ZE !== void 0) return ZE;
      ZE = null;
      try {
        let A = pH2(MK1);
        ZE = sH2(A)
      } catch (A) {}
      return ZE
    }, rH2 = async () => {
      let A = null;
      if (Qu()) {
        if (A = await U75(), !A) A = nH2();
        if (!A) {
          let B = await cH2();
          A = aH2(B)
        }
      }
      return A
    }, oH2 = () => {
      let A = null;
      if (Qu()) {
        if (A = N75(), !A) A = nH2();
        if (!A) {
          let B = lH2();
          A = aH2(B)
        }
      }
      return A
    }, $75 = async () => Qu() && await rH2() !== kO, q75 = () => Qu() && oH2() !== kO, M75 = async () => {
      if (DE !== void 0) return DE;
      DE = null;
      try {
        let B = (await uH2(MK1)).match(iH2);
        if (B) DE = B[1]
      } catch (A) {}
      return DE
    }, L75 = () => {
      if (DE !== void 0) return DE;
      DE = null;
      try {
        let B = pH2(MK1).match(iH2);
        if (B) DE = B[1]
      } catch (A) {}
      return DE
    }, tH2 = () => {
      let A = dH2();
      if (A.header && A.header.glibcVersionRuntime) return A.header.glibcVersionRuntime;
      return null
    }, hH2 = (A) => A.trim().split(/\s+/)[1], eH2 = (A) => {
      let [B, Q, I] = A.split(/[\r\n]+/);
      if (B && B.includes(kO)) return hH2(B);
      if (Q && I && Q.includes(Bu)) return hH2(I);
      return null
    }, R75 = async () => {
      let A = null;
      if (Qu()) {
        if (A = await M75(), !A) A = tH2();
        if (!A) {
          let B = await cH2();
          A = eH2(B)
        }
      }
      return A
    }, O75 = () => {
      let A = null;
      if (Qu()) {
        if (A = L75(), !A) A = tH2();
        if (!A) {
          let B = lH2();
          A = eH2(B)
        }
      }
      return A
    };
  Az2.exports = {
    GLIBC: kO,
    MUSL: Bu,
    family: rH2,
    familySync: oH2,
    isNonGlibcLinux: $75,
    isNonGlibcLinuxSync: q75,
    version: R75,
    versionSync: O75
  }
})
// @from(Start 7396463, End 7403738)
Qt1 = z((Xn8, T75) => {
  T75.exports = {
    name: "sharp",
    description: "High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, GIF, AVIF and TIFF images",
    version: "0.33.5",
    author: "Lovell Fuller <npm@lovell.info>",
    homepage: "https://sharp.pixelplumbing.com",
    contributors: ["Pierre Inglebert <pierre.inglebert@gmail.com>", "Jonathan Ong <jonathanrichardong@gmail.com>", "Chanon Sajjamanochai <chanon.s@gmail.com>", "Juliano Julio <julianojulio@gmail.com>", "Daniel Gasienica <daniel@gasienica.ch>", "Julian Walker <julian@fiftythree.com>", "Amit Pitaru <pitaru.amit@gmail.com>", "Brandon Aaron <hello.brandon@aaron.sh>", "Andreas Lind <andreas@one.com>", "Maurus Cuelenaere <mcuelenaere@gmail.com>", "Linus Unnebäck <linus@folkdatorn.se>", "Victor Mateevitsi <mvictoras@gmail.com>", "Alaric Holloway <alaric.holloway@gmail.com>", "Bernhard K. Weisshuhn <bkw@codingforce.com>", "Chris Riley <criley@primedia.com>", "David Carley <dacarley@gmail.com>", "John Tobin <john@limelightmobileinc.com>", "Kenton Gray <kentongray@gmail.com>", "Felix Bünemann <Felix.Buenemann@gmail.com>", "Samy Al Zahrani <samyalzahrany@gmail.com>", "Chintan Thakkar <lemnisk8@gmail.com>", "F. Orlando Galashan <frulo@gmx.de>", "Kleis Auke Wolthuizen <info@kleisauke.nl>", "Matt Hirsch <mhirsch@media.mit.edu>", "Matthias Thoemmes <thoemmes@gmail.com>", "Patrick Paskaris <patrick@paskaris.gr>", "Jérémy Lal <kapouer@melix.org>", "Rahul Nanwani <r.nanwani@gmail.com>", "Alice Monday <alice0meta@gmail.com>", "Kristo Jorgenson <kristo.jorgenson@gmail.com>", "YvesBos <yves_bos@outlook.com>", "Guy Maliar <guy@tailorbrands.com>", "Nicolas Coden <nicolas@ncoden.fr>", "Matt Parrish <matt.r.parrish@gmail.com>", "Marcel Bretschneider <marcel.bretschneider@gmail.com>", "Matthew McEachen <matthew+github@mceachen.org>", "Jarda Kotěšovec <jarda.kotesovec@gmail.com>", "Kenric D'Souza <kenric.dsouza@gmail.com>", "Oleh Aleinyk <oleg.aleynik@gmail.com>", "Marcel Bretschneider <marcel.bretschneider@gmail.com>", "Andrea Bianco <andrea.bianco@unibas.ch>", "Rik Heywood <rik@rik.org>", "Thomas Parisot <hi@oncletom.io>", "Nathan Graves <nathanrgraves+github@gmail.com>", "Tom Lokhorst <tom@lokhorst.eu>", "Espen Hovlandsdal <espen@hovlandsdal.com>", "Sylvain Dumont <sylvain.dumont35@gmail.com>", "Alun Davies <alun.owain.davies@googlemail.com>", "Aidan Hoolachan <ajhoolachan21@gmail.com>", "Axel Eirola <axel.eirola@iki.fi>", "Freezy <freezy@xbmc.org>", "Daiz <taneli.vatanen@gmail.com>", "Julian Aubourg <j@ubourg.net>", "Keith Belovay <keith@picthrive.com>", "Michael B. Klein <mbklein@gmail.com>", "Jordan Prudhomme <jordan@raboland.fr>", "Ilya Ovdin <iovdin@gmail.com>", "Andargor <andargor@yahoo.com>", "Paul Neave <paul.neave@gmail.com>", "Brendan Kennedy <brenwken@gmail.com>", "Brychan Bennett-Odlum <git@brychan.io>", "Edward Silverton <e.silverton@gmail.com>", "Roman Malieiev <aromaleev@gmail.com>", "Tomas Szabo <tomas.szabo@deftomat.com>", "Robert O'Rourke <robert@o-rourke.org>", "Guillermo Alfonso Varela Chouciño <guillevch@gmail.com>", "Christian Flintrup <chr@gigahost.dk>", "Manan Jadhav <manan@motionden.com>", "Leon Radley <leon@radley.se>", "alza54 <alza54@thiocod.in>", "Jacob Smith <jacob@frende.me>", "Michael Nutt <michael@nutt.im>", "Brad Parham <baparham@gmail.com>", "Taneli Vatanen <taneli.vatanen@gmail.com>", "Joris Dugué <zaruike10@gmail.com>", "Chris Banks <christopher.bradley.banks@gmail.com>", "Ompal Singh <ompal.hitm09@gmail.com>", "Brodan <christopher.hranj@gmail.com>", "Ankur Parihar <ankur.github@gmail.com>", "Brahim Ait elhaj <brahima@gmail.com>", "Mart Jansink <m.jansink@gmail.com>", "Lachlan Newman <lachnewman007@gmail.com>", "Dennis Beatty <dennis@dcbeatty.com>", "Ingvar Stepanyan <me@rreverser.com>", "Don Denton <don@happycollision.com>"],
    scripts: {
      install: "node install/check",
      clean: "rm -rf src/build/ .nyc_output/ coverage/ test/fixtures/output.*",
      test: "npm run test-lint && npm run test-unit && npm run test-licensing && npm run test-types",
      "test-lint": "semistandard && cpplint",
      "test-unit": "nyc --reporter=lcov --reporter=text --check-coverage --branches=100 mocha",
      "test-licensing": 'license-checker --production --summary --onlyAllow="Apache-2.0;BSD;ISC;LGPL-3.0-or-later;MIT"',
      "test-leak": "./test/leak/leak.sh",
      "test-types": "tsd",
      "package-from-local-build": "node npm/from-local-build",
      "package-from-github-release": "node npm/from-github-release",
      "docs-build": "node docs/build && node docs/search-index/build",
      "docs-serve": "cd docs && npx serve",
      "docs-publish": "cd docs && npx firebase-tools deploy --project pixelplumbing --only hosting:pixelplumbing-sharp"
    },
    type: "commonjs",
    main: "lib/index.js",
    types: "lib/index.d.ts",
    files: ["install", "lib", "src/*.{cc,h,gyp}"],
    repository: {
      type: "git",
      url: "git://github.com/lovell/sharp.git"
    },
    keywords: ["jpeg", "png", "webp", "avif", "tiff", "gif", "svg", "jp2", "dzi", "image", "resize", "thumbnail", "crop", "embed", "libvips", "vips"],
    dependencies: {
      color: "^4.2.3",
      "detect-libc": "^2.0.3",
      semver: "^7.6.3"
    },
    optionalDependencies: {
      "@img/sharp-darwin-arm64": "0.33.5",
      "@img/sharp-darwin-x64": "0.33.5",
      "@img/sharp-libvips-darwin-arm64": "1.0.4",
      "@img/sharp-libvips-darwin-x64": "1.0.4",
      "@img/sharp-libvips-linux-arm": "1.0.5",
      "@img/sharp-libvips-linux-arm64": "1.0.4",
      "@img/sharp-libvips-linux-s390x": "1.0.4",
      "@img/sharp-libvips-linux-x64": "1.0.4",
      "@img/sharp-libvips-linuxmusl-arm64": "1.0.4",
      "@img/sharp-libvips-linuxmusl-x64": "1.0.4",
      "@img/sharp-linux-arm": "0.33.5",
      "@img/sharp-linux-arm64": "0.33.5",
      "@img/sharp-linux-s390x": "0.33.5",
      "@img/sharp-linux-x64": "0.33.5",
      "@img/sharp-linuxmusl-arm64": "0.33.5",
      "@img/sharp-linuxmusl-x64": "0.33.5",
      "@img/sharp-wasm32": "0.33.5",
      "@img/sharp-win32-ia32": "0.33.5",
      "@img/sharp-win32-x64": "0.33.5"
    },
    devDependencies: {
      "@emnapi/runtime": "^1.2.0",
      "@img/sharp-libvips-dev": "1.0.4",
      "@img/sharp-libvips-dev-wasm32": "1.0.5",
      "@img/sharp-libvips-win32-ia32": "1.0.4",
      "@img/sharp-libvips-win32-x64": "1.0.4",
      "@types/node": "*",
      async: "^3.2.5",
      cc: "^3.0.1",
      emnapi: "^1.2.0",
      "exif-reader": "^2.0.1",
      "extract-zip": "^2.0.1",
      icc: "^3.0.0",
      "jsdoc-to-markdown": "^8.0.3",
      "license-checker": "^25.0.1",
      mocha: "^10.7.3",
      "node-addon-api": "^8.1.0",
      nyc: "^17.0.0",
      prebuild: "^13.0.1",
      semistandard: "^17.0.0",
      "tar-fs": "^3.0.6",
      tsd: "^0.31.1"
    },
    license: "Apache-2.0",
    engines: {
      node: "^18.17.0 || ^20.3.0 || >=21.0.0"
    },
    config: {
      libvips: ">=8.15.3"
    },
    funding: {
      url: "https://opencollective.com/libvips"
    },
    binary: {
      napi_versions: [9]
    },
    semistandard: {
      env: ["mocha"]
    },
    cc: {
      linelength: "120",
      filter: ["build/include"]
    },
    nyc: {
      include: ["lib"]
    },
    tsd: {
      directory: "test/types/"
    }
  }
})
// @from(Start 7403744, End 7407910)
Gt1 = z((Vn8, Fz2) => {
  var {
    spawnSync: RK1
  } = Z1("node:child_process"), {
    createHash: P75
  } = Z1("node:crypto"), Gz2 = Zi1(), S75 = Ot(), _75 = dm(), Bz2 = LK1(), {
    config: j75,
    engines: Qz2,
    optionalDependencies: y75
  } = Qt1(), k75 = process.env.npm_package_config_libvips || j75.libvips, Zz2 = Gz2(k75).version, x75 = ["darwin-arm64", "darwin-x64", "linux-arm", "linux-arm64", "linux-s390x", "linux-x64", "linuxmusl-arm64", "linuxmusl-x64", "win32-ia32", "win32-x64"], OK1 = {
    encoding: "utf8",
    shell: !0
  }, f75 = (A) => {
    if (A instanceof Error) console.error(`sharp: Installation error: ${A.message}`);
    else console.log(`sharp: ${A}`)
  }, Dz2 = () => Bz2.isNonGlibcLinuxSync() ? Bz2.familySync() : "", v75 = () => `${process.platform}${Dz2()}-${process.arch}`, Iu = () => {
    if (Yz2()) return "wasm32";
    let {
      npm_config_arch: A,
      npm_config_platform: B,
      npm_config_libc: Q
    } = process.env, I = typeof Q === "string" ? Q : Dz2();
    return `${B||process.platform}${I}-${A||process.arch}`
  }, b75 = () => {
    try {
      return Z1(`@img/sharp-libvips-dev-${Iu()}/include`)
    } catch {
      try {
        return (() => {
          throw new Error("Cannot require module " + "@img/sharp-libvips-dev/include");
        })()
      } catch {}
    }
    return ""
  }, g75 = () => {
    try {
      return (() => {
        throw new Error("Cannot require module " + "@img/sharp-libvips-dev/cplusplus");
      })()
    } catch {}
    return ""
  }, h75 = () => {
    try {
      return Z1(`@img/sharp-libvips-dev-${Iu()}/lib`)
    } catch {
      try {
        return Z1(`@img/sharp-libvips-${Iu()}/lib`)
      } catch {}
    }
    return ""
  }, m75 = () => {
    if (process.release?.name === "node" && process.versions) {
      if (!_75(process.versions.node, Qz2.node)) return {
        found: process.versions.node,
        expected: Qz2.node
      }
    }
  }, Yz2 = () => {
    let {
      CC: A
    } = process.env;
    return Boolean(A && A.endsWith("/emcc"))
  }, d75 = () => {
    if (process.platform === "darwin" && process.arch === "x64") return (RK1("sysctl sysctl.proc_translated", OK1).stdout || "").trim() === "sysctl.proc_translated: 1";
    return !1
  }, Iz2 = (A) => P75("sha512").update(A).digest("hex"), u75 = () => {
    try {
      let A = Iz2(`imgsharp-libvips-${Iu()}`),
        B = Gz2(y75[`@img/sharp-libvips-${Iu()}`]).version;
      return Iz2(`${A}npm:${B}`).slice(0, 10)
    } catch {}
    return ""
  }, p75 = () => RK1(`node-gyp rebuild --directory=src ${Yz2()?"--nodedir=emscripten":""}`, {
    ...OK1,
    stdio: "inherit"
  }).status, Wz2 = () => {
    if (process.platform !== "win32") return (RK1("pkg-config --modversion vips-cpp", {
      ...OK1,
      env: {
        ...process.env,
        PKG_CONFIG_PATH: Jz2()
      }
    }).stdout || "").trim();
    else return ""
  }, Jz2 = () => {
    if (process.platform !== "win32") return [(RK1('which brew >/dev/null 2>&1 && brew environment --plain | grep PKG_CONFIG_LIBDIR | cut -d" " -f2', OK1).stdout || "").trim(), process.env.PKG_CONFIG_PATH, "/usr/local/lib/pkgconfig", "/usr/lib/pkgconfig", "/usr/local/libdata/pkgconfig", "/usr/libdata/pkgconfig"].filter(Boolean).join(":");
    else return ""
  }, It1 = (A, B, Q) => {
    if (Q) Q(`Detected ${B}, skipping search for globally-installed libvips`);
    return A
  }, c75 = (A) => {
    if (Boolean(process.env.SHARP_IGNORE_GLOBAL_LIBVIPS) === !0) return It1(!1, "SHARP_IGNORE_GLOBAL_LIBVIPS", A);
    if (Boolean(process.env.SHARP_FORCE_GLOBAL_LIBVIPS) === !0) return It1(!0, "SHARP_FORCE_GLOBAL_LIBVIPS", A);
    if (d75()) return It1(!1, "Rosetta", A);
    let B = Wz2();
    return !!B && S75(B, Zz2)
  };
  Fz2.exports = {
    minimumLibvipsVersion: Zz2,
    prebuiltPlatforms: x75,
    buildPlatformArch: Iu,
    buildSharpLibvipsIncludeDir: b75,
    buildSharpLibvipsCPlusPlusDir: g75,
    buildSharpLibvipsLibDir: h75,
    isUnsupportedNodeRuntime: m75,
    runtimePlatformArch: v75,
    log: f75,
    yarnLocator: u75,
    spawnRebuild: p75,
    globalLibvipsVersion: Wz2,
    pkgConfigPath: Jz2,
    useGlobalLibvips: c75
  }
})
// @from(Start 7407916, End 7410719)
I11 = z((Kn8, Vz2) => {
  var {
    familySync: l75,
    versionSync: i75
  } = LK1(), {
    runtimePlatformArch: n75,
    isUnsupportedNodeRuntime: Xz2,
    prebuiltPlatforms: a75,
    minimumLibvipsVersion: s75
  } = Gt1(), Yy = n75(), r75 = [`../src/build/Release/sharp-${Yy}.node`, "../src/build/Release/sharp-wasm32.node", `@img/sharp-${Yy}/sharp.node`, "@img/sharp-wasm32/sharp.node"], Zt1, TK1 = [];
  for (let A of r75) try {
    Zt1 = Z1(A);
    break
  } catch (B) {
    TK1.push(B)
  }
  if (Zt1) Vz2.exports = Zt1;
  else {
    let [A, B, Q] = ["linux", "darwin", "win32"].map((Z) => Yy.startsWith(Z)), I = [`Could not load the "sharp" module using the ${Yy} runtime`];
    TK1.forEach((Z) => {
      if (Z.code !== "MODULE_NOT_FOUND") I.push(`${Z.code}: ${Z.message}`)
    });
    let G = TK1.map((Z) => Z.message).join(" ");
    if (I.push("Possible solutions:"), Xz2()) {
      let {
        found: Z,
        expected: D
      } = Xz2();
      I.push("- Please upgrade Node.js:", `    Found ${Z}`, `    Requires ${D}`)
    } else if (a75.includes(Yy)) {
      let [Z, D] = Yy.split("-"), Y = Z.endsWith("musl") ? " --libc=musl" : "";
      I.push("- Ensure optional dependencies can be installed:", "    npm install --include=optional sharp", "- Ensure your package manager supports multi-platform installation:", "    See https://sharp.pixelplumbing.com/install#cross-platform", "- Add platform-specific dependencies:", `    npm install --os=${Z.replace("musl","")}${Y} --cpu=${D} sharp`)
    } else I.push(`- Manually install libvips >= ${s75}`, "- Add experimental WebAssembly-based dependencies:", "    npm install --cpu=wasm32 sharp", "    npm install @img/sharp-wasm32");
    if (A && /(symbol not found|CXXABI_)/i.test(G)) try {
      let {
        config: Z
      } = Z1(`@img/sharp-libvips-${Yy}/package`), D = `${l75()} ${i75()}`, Y = `${Z.musl?"musl":"glibc"} ${Z.musl||Z.glibc}`;
      I.push("- Update your OS:", `    Found ${D}`, `    Requires ${Y}`)
    } catch (Z) {}
    if (A && /\/snap\/core[0-9]{2}/.test(G)) I.push("- Remove the Node.js Snap, which does not support native modules", "    snap remove node");
    if (B && /Incompatible library version/.test(G)) I.push("- Update Homebrew:", "    brew update && brew upgrade vips");
    if (TK1.some((Z) => Z.code === "ERR_DLOPEN_DISABLED")) I.push("- Run Node.js without using the --no-addons flag");
    if (Q && /The specified procedure could not be found/.test(G)) I.push("- Using the canvas package on Windows?", "    See https://sharp.pixelplumbing.com/install#canvas-and-windows", "- Check for outdated versions of sharp in the dependency tree:", "    npm ls sharp");
    throw I.push("- Consult the installation documentation:", "    See https://sharp.pixelplumbing.com/install"), new Error(I.join(`
`))
  }
})
// @from(Start 7410725, End 7416430)
Kz2 = z((zn8, Cz2) => {
  var o75 = Z1("node:util"),
    Dt1 = Z1("node:stream"),
    t75 = GE();
  I11();
  var e75 = o75.debuglog("sharp"),
    Wy = function(A, B) {
      if (arguments.length === 1 && !t75.defined(A)) throw new Error("Invalid input");
      if (!(this instanceof Wy)) return new Wy(A, B);
      return Dt1.Duplex.call(this), this.options = {
        topOffsetPre: -1,
        leftOffsetPre: -1,
        widthPre: -1,
        heightPre: -1,
        topOffsetPost: -1,
        leftOffsetPost: -1,
        widthPost: -1,
        heightPost: -1,
        width: -1,
        height: -1,
        canvas: "crop",
        position: 0,
        resizeBackground: [0, 0, 0, 255],
        useExifOrientation: !1,
        angle: 0,
        rotationAngle: 0,
        rotationBackground: [0, 0, 0, 255],
        rotateBeforePreExtract: !1,
        flip: !1,
        flop: !1,
        extendTop: 0,
        extendBottom: 0,
        extendLeft: 0,
        extendRight: 0,
        extendBackground: [0, 0, 0, 255],
        extendWith: "background",
        withoutEnlargement: !1,
        withoutReduction: !1,
        affineMatrix: [],
        affineBackground: [0, 0, 0, 255],
        affineIdx: 0,
        affineIdy: 0,
        affineOdx: 0,
        affineOdy: 0,
        affineInterpolator: this.constructor.interpolators.bilinear,
        kernel: "lanczos3",
        fastShrinkOnLoad: !0,
        tint: [-1, 0, 0, 0],
        flatten: !1,
        flattenBackground: [0, 0, 0],
        unflatten: !1,
        negate: !1,
        negateAlpha: !0,
        medianSize: 0,
        blurSigma: 0,
        precision: "integer",
        minAmpl: 0.2,
        sharpenSigma: 0,
        sharpenM1: 1,
        sharpenM2: 2,
        sharpenX1: 2,
        sharpenY2: 10,
        sharpenY3: 20,
        threshold: 0,
        thresholdGrayscale: !0,
        trimBackground: [],
        trimThreshold: -1,
        trimLineArt: !1,
        gamma: 0,
        gammaOut: 0,
        greyscale: !1,
        normalise: !1,
        normaliseLower: 1,
        normaliseUpper: 99,
        claheWidth: 0,
        claheHeight: 0,
        claheMaxSlope: 3,
        brightness: 1,
        saturation: 1,
        hue: 0,
        lightness: 0,
        booleanBufferIn: null,
        booleanFileIn: "",
        joinChannelIn: [],
        extractChannel: -1,
        removeAlpha: !1,
        ensureAlpha: -1,
        colourspace: "srgb",
        colourspacePipeline: "last",
        composite: [],
        fileOut: "",
        formatOut: "input",
        streamOut: !1,
        keepMetadata: 0,
        withMetadataOrientation: -1,
        withMetadataDensity: 0,
        withIccProfile: "",
        withExif: {},
        withExifMerge: !0,
        resolveWithObject: !1,
        jpegQuality: 80,
        jpegProgressive: !1,
        jpegChromaSubsampling: "4:2:0",
        jpegTrellisQuantisation: !1,
        jpegOvershootDeringing: !1,
        jpegOptimiseScans: !1,
        jpegOptimiseCoding: !0,
        jpegQuantisationTable: 0,
        pngProgressive: !1,
        pngCompressionLevel: 6,
        pngAdaptiveFiltering: !1,
        pngPalette: !1,
        pngQuality: 100,
        pngEffort: 7,
        pngBitdepth: 8,
        pngDither: 1,
        jp2Quality: 80,
        jp2TileHeight: 512,
        jp2TileWidth: 512,
        jp2Lossless: !1,
        jp2ChromaSubsampling: "4:4:4",
        webpQuality: 80,
        webpAlphaQuality: 100,
        webpLossless: !1,
        webpNearLossless: !1,
        webpSmartSubsample: !1,
        webpPreset: "default",
        webpEffort: 4,
        webpMinSize: !1,
        webpMixed: !1,
        gifBitdepth: 8,
        gifEffort: 7,
        gifDither: 1,
        gifInterFrameMaxError: 0,
        gifInterPaletteMaxError: 3,
        gifReuse: !0,
        gifProgressive: !1,
        tiffQuality: 80,
        tiffCompression: "jpeg",
        tiffPredictor: "horizontal",
        tiffPyramid: !1,
        tiffMiniswhite: !1,
        tiffBitdepth: 8,
        tiffTile: !1,
        tiffTileHeight: 256,
        tiffTileWidth: 256,
        tiffXres: 1,
        tiffYres: 1,
        tiffResolutionUnit: "inch",
        heifQuality: 50,
        heifLossless: !1,
        heifCompression: "av1",
        heifEffort: 4,
        heifChromaSubsampling: "4:4:4",
        heifBitdepth: 8,
        jxlDistance: 1,
        jxlDecodingTier: 0,
        jxlEffort: 7,
        jxlLossless: !1,
        rawDepth: "uchar",
        tileSize: 256,
        tileOverlap: 0,
        tileContainer: "fs",
        tileLayout: "dz",
        tileFormat: "last",
        tileDepth: "last",
        tileAngle: 0,
        tileSkipBlanks: -1,
        tileBackground: [255, 255, 255, 255],
        tileCentre: !1,
        tileId: "https://example.com/iiif",
        tileBasename: "",
        timeoutSeconds: 0,
        linearA: [],
        linearB: [],
        debuglog: (Q) => {
          this.emit("warning", Q), e75(Q)
        },
        queueListener: function(Q) {
          Wy.queue.emit("change", Q)
        }
      }, this.options.input = this._createInputDescriptor(A, B, {
        allowStream: !0
      }), this
    };
  Object.setPrototypeOf(Wy.prototype, Dt1.Duplex.prototype);
  Object.setPrototypeOf(Wy, Dt1.Duplex);

  function AI5() {
    let A = this.constructor.call(),
      {
        debuglog: B,
        queueListener: Q,
        ...I
      } = this.options;
    if (A.options = structuredClone(I), A.options.debuglog = B, A.options.queueListener = Q, this._isStreamInput()) this.on("finish", () => {
      this._flattenBufferIn(), A.options.input.buffer = this.options.input.buffer, A.emit("finish")
    });
    return A
  }
  Object.assign(Wy.prototype, {
    clone: AI5
  });
  Cz2.exports = Wy
})
// @from(Start 7416436, End 7416734)
zz2 = z((wn8, Hz2) => {
  Hz2.exports = function A(B) {
    if (!B || typeof B === "string") return !1;
    return B instanceof Array || Array.isArray(B) || B.length >= 0 && (B.splice instanceof Function || Object.getOwnPropertyDescriptor(B, B.length - 1) && B.constructor.name !== "String")
  }
})
// @from(Start 7416740, End 7417177)
Uz2 = z((En8, Ez2) => {
  var BI5 = zz2(),
    QI5 = Array.prototype.concat,
    II5 = Array.prototype.slice,
    wz2 = Ez2.exports = function A(B) {
      var Q = [];
      for (var I = 0, G = B.length; I < G; I++) {
        var Z = B[I];
        if (BI5(Z)) Q = QI5.call(Q, II5.call(Z));
        else Q.push(Z)
      }
      return Q
    };
  wz2.wrap = function(A) {
    return function() {
      return A(wz2(arguments))
    }
  }
})
// @from(Start 7417183, End 7421872)
Mz2 = z((Un8, qz2) => {
  var Z11 = uo1(),
    D11 = Uz2(),
    Nz2 = Object.hasOwnProperty,
    $z2 = Object.create(null);
  for (G11 in Z11)
    if (Nz2.call(Z11, G11)) $z2[Z11[G11]] = G11;
  var G11, cJ = qz2.exports = {
    to: {},
    get: {}
  };
  cJ.get = function(A) {
    var B = A.substring(0, 3).toLowerCase(),
      Q, I;
    switch (B) {
      case "hsl":
        Q = cJ.get.hsl(A), I = "hsl";
        break;
      case "hwb":
        Q = cJ.get.hwb(A), I = "hwb";
        break;
      default:
        Q = cJ.get.rgb(A), I = "rgb";
        break
    }
    if (!Q) return null;
    return {
      model: I,
      value: Q
    }
  };
  cJ.get.rgb = function(A) {
    if (!A) return null;
    var B = /^#([a-f0-9]{3,4})$/i,
      Q = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i,
      I = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
      G = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
      Z = /^(\w+)$/,
      D = [0, 0, 0, 1],
      Y, W, J;
    if (Y = A.match(Q)) {
      J = Y[2], Y = Y[1];
      for (W = 0; W < 3; W++) {
        var F = W * 2;
        D[W] = parseInt(Y.slice(F, F + 2), 16)
      }
      if (J) D[3] = parseInt(J, 16) / 255
    } else if (Y = A.match(B)) {
      Y = Y[1], J = Y[3];
      for (W = 0; W < 3; W++) D[W] = parseInt(Y[W] + Y[W], 16);
      if (J) D[3] = parseInt(J + J, 16) / 255
    } else if (Y = A.match(I)) {
      for (W = 0; W < 3; W++) D[W] = parseInt(Y[W + 1], 0);
      if (Y[4])
        if (Y[5]) D[3] = parseFloat(Y[4]) * 0.01;
        else D[3] = parseFloat(Y[4])
    } else if (Y = A.match(G)) {
      for (W = 0; W < 3; W++) D[W] = Math.round(parseFloat(Y[W + 1]) * 2.55);
      if (Y[4])
        if (Y[5]) D[3] = parseFloat(Y[4]) * 0.01;
        else D[3] = parseFloat(Y[4])
    } else if (Y = A.match(Z)) {
      if (Y[1] === "transparent") return [0, 0, 0, 0];
      if (!Nz2.call(Z11, Y[1])) return null;
      return D = Z11[Y[1]], D[3] = 1, D
    } else return null;
    for (W = 0; W < 3; W++) D[W] = xO(D[W], 0, 255);
    return D[3] = xO(D[3], 0, 1), D
  };
  cJ.get.hsl = function(A) {
    if (!A) return null;
    var B = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
      Q = A.match(B);
    if (Q) {
      var I = parseFloat(Q[4]),
        G = (parseFloat(Q[1]) % 360 + 360) % 360,
        Z = xO(parseFloat(Q[2]), 0, 100),
        D = xO(parseFloat(Q[3]), 0, 100),
        Y = xO(isNaN(I) ? 1 : I, 0, 1);
      return [G, Z, D, Y]
    }
    return null
  };
  cJ.get.hwb = function(A) {
    if (!A) return null;
    var B = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
      Q = A.match(B);
    if (Q) {
      var I = parseFloat(Q[4]),
        G = (parseFloat(Q[1]) % 360 + 360) % 360,
        Z = xO(parseFloat(Q[2]), 0, 100),
        D = xO(parseFloat(Q[3]), 0, 100),
        Y = xO(isNaN(I) ? 1 : I, 0, 1);
      return [G, Z, D, Y]
    }
    return null
  };
  cJ.to.hex = function() {
    var A = D11(arguments);
    return "#" + PK1(A[0]) + PK1(A[1]) + PK1(A[2]) + (A[3] < 1 ? PK1(Math.round(A[3] * 255)) : "")
  };
  cJ.to.rgb = function() {
    var A = D11(arguments);
    return A.length < 4 || A[3] === 1 ? "rgb(" + Math.round(A[0]) + ", " + Math.round(A[1]) + ", " + Math.round(A[2]) + ")" : "rgba(" + Math.round(A[0]) + ", " + Math.round(A[1]) + ", " + Math.round(A[2]) + ", " + A[3] + ")"
  };
  cJ.to.rgb.percent = function() {
    var A = D11(arguments),
      B = Math.round(A[0] / 255 * 100),
      Q = Math.round(A[1] / 255 * 100),
      I = Math.round(A[2] / 255 * 100);
    return A.length < 4 || A[3] === 1 ? "rgb(" + B + "%, " + Q + "%, " + I + "%)" : "rgba(" + B + "%, " + Q + "%, " + I + "%, " + A[3] + ")"
  };
  cJ.to.hsl = function() {
    var A = D11(arguments);
    return A.length < 4 || A[3] === 1 ? "hsl(" + A[0] + ", " + A[1] + "%, " + A[2] + "%)" : "hsla(" + A[0] + ", " + A[1] + "%, " + A[2] + "%, " + A[3] + ")"
  };
  cJ.to.hwb = function() {
    var A = D11(arguments),
      B = "";
    if (A.length >= 4 && A[3] !== 1) B = ", " + A[3];
    return "hwb(" + A[0] + ", " + A[1] + "%, " + A[2] + "%" + B + ")"
  };
  cJ.to.keyword = function(A) {
    return $z2[A.slice(0, 3)]
  };

  function xO(A, B, Q) {
    return Math.min(Math.max(B, A), Q)
  }

  function PK1(A) {
    var B = Math.round(A).toString(16).toUpperCase();
    return B.length < 2 ? "0" + B : B
  }
})
// @from(Start 7421878, End 7430438)
_K1 = z((Nn8, Rz2) => {
  var Gu = Mz2(),
    lJ = lo1(),
    Lz2 = ["keyword", "gray", "hex"],
    Yt1 = {};
  for (let A of Object.keys(lJ)) Yt1[[...lJ[A].labels].sort().join("")] = A;
  var SK1 = {};

  function bI(A, B) {
    if (!(this instanceof bI)) return new bI(A, B);
    if (B && B in Lz2) B = null;
    if (B && !(B in lJ)) throw new Error("Unknown model: " + B);
    let Q, I;
    if (A == null) this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
    else if (A instanceof bI) this.model = A.model, this.color = [...A.color], this.valpha = A.valpha;
    else if (typeof A === "string") {
      let G = Gu.get(A);
      if (G === null) throw new Error("Unable to parse color from string: " + A);
      this.model = G.model, I = lJ[this.model].channels, this.color = G.value.slice(0, I), this.valpha = typeof G.value[I] === "number" ? G.value[I] : 1
    } else if (A.length > 0) {
      this.model = B || "rgb", I = lJ[this.model].channels;
      let G = Array.prototype.slice.call(A, 0, I);
      this.color = Wt1(G, I), this.valpha = typeof A[I] === "number" ? A[I] : 1
    } else if (typeof A === "number") this.model = "rgb", this.color = [A >> 16 & 255, A >> 8 & 255, A & 255], this.valpha = 1;
    else {
      this.valpha = 1;
      let G = Object.keys(A);
      if ("alpha" in A) G.splice(G.indexOf("alpha"), 1), this.valpha = typeof A.alpha === "number" ? A.alpha : 0;
      let Z = G.sort().join("");
      if (!(Z in Yt1)) throw new Error("Unable to parse color from object: " + JSON.stringify(A));
      this.model = Yt1[Z];
      let {
        labels: D
      } = lJ[this.model], Y = [];
      for (Q = 0; Q < D.length; Q++) Y.push(A[D[Q]]);
      this.color = Wt1(Y)
    }
    if (SK1[this.model]) {
      I = lJ[this.model].channels;
      for (Q = 0; Q < I; Q++) {
        let G = SK1[this.model][Q];
        if (G) this.color[Q] = G(this.color[Q])
      }
    }
    if (this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze) Object.freeze(this)
  }
  bI.prototype = {
    toString() {
      return this.string()
    },
    toJSON() {
      return this[this.model]()
    },
    string(A) {
      let B = this.model in Gu.to ? this : this.rgb();
      B = B.round(typeof A === "number" ? A : 1);
      let Q = B.valpha === 1 ? B.color : [...B.color, this.valpha];
      return Gu.to[B.model](Q)
    },
    percentString(A) {
      let B = this.rgb().round(typeof A === "number" ? A : 1),
        Q = B.valpha === 1 ? B.color : [...B.color, this.valpha];
      return Gu.to.rgb.percent(Q)
    },
    array() {
      return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha]
    },
    object() {
      let A = {},
        {
          channels: B
        } = lJ[this.model],
        {
          labels: Q
        } = lJ[this.model];
      for (let I = 0; I < B; I++) A[Q[I]] = this.color[I];
      if (this.valpha !== 1) A.alpha = this.valpha;
      return A
    },
    unitArray() {
      let A = this.rgb().color;
      if (A[0] /= 255, A[1] /= 255, A[2] /= 255, this.valpha !== 1) A.push(this.valpha);
      return A
    },
    unitObject() {
      let A = this.rgb().object();
      if (A.r /= 255, A.g /= 255, A.b /= 255, this.valpha !== 1) A.alpha = this.valpha;
      return A
    },
    round(A) {
      return A = Math.max(A || 0, 0), new bI([...this.color.map(ZI5(A)), this.valpha], this.model)
    },
    alpha(A) {
      if (A !== void 0) return new bI([...this.color, Math.max(0, Math.min(1, A))], this.model);
      return this.valpha
    },
    red: e3("rgb", 0, i7(255)),
    green: e3("rgb", 1, i7(255)),
    blue: e3("rgb", 2, i7(255)),
    hue: e3(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (A) => (A % 360 + 360) % 360),
    saturationl: e3("hsl", 1, i7(100)),
    lightness: e3("hsl", 2, i7(100)),
    saturationv: e3("hsv", 1, i7(100)),
    value: e3("hsv", 2, i7(100)),
    chroma: e3("hcg", 1, i7(100)),
    gray: e3("hcg", 2, i7(100)),
    white: e3("hwb", 1, i7(100)),
    wblack: e3("hwb", 2, i7(100)),
    cyan: e3("cmyk", 0, i7(100)),
    magenta: e3("cmyk", 1, i7(100)),
    yellow: e3("cmyk", 2, i7(100)),
    black: e3("cmyk", 3, i7(100)),
    x: e3("xyz", 0, i7(95.047)),
    y: e3("xyz", 1, i7(100)),
    z: e3("xyz", 2, i7(108.833)),
    l: e3("lab", 0, i7(100)),
    a: e3("lab", 1),
    b: e3("lab", 2),
    keyword(A) {
      if (A !== void 0) return new bI(A);
      return lJ[this.model].keyword(this.color)
    },
    hex(A) {
      if (A !== void 0) return new bI(A);
      return Gu.to.hex(this.rgb().round().color)
    },
    hexa(A) {
      if (A !== void 0) return new bI(A);
      let B = this.rgb().round().color,
        Q = Math.round(this.valpha * 255).toString(16).toUpperCase();
      if (Q.length === 1) Q = "0" + Q;
      return Gu.to.hex(B) + Q
    },
    rgbNumber() {
      let A = this.rgb().color;
      return (A[0] & 255) << 16 | (A[1] & 255) << 8 | A[2] & 255
    },
    luminosity() {
      let A = this.rgb().color,
        B = [];
      for (let [Q, I] of A.entries()) {
        let G = I / 255;
        B[Q] = G <= 0.04045 ? G / 12.92 : ((G + 0.055) / 1.055) ** 2.4
      }
      return 0.2126 * B[0] + 0.7152 * B[1] + 0.0722 * B[2]
    },
    contrast(A) {
      let B = this.luminosity(),
        Q = A.luminosity();
      if (B > Q) return (B + 0.05) / (Q + 0.05);
      return (Q + 0.05) / (B + 0.05)
    },
    level(A) {
      let B = this.contrast(A);
      if (B >= 7) return "AAA";
      return B >= 4.5 ? "AA" : ""
    },
    isDark() {
      let A = this.rgb().color;
      return (A[0] * 2126 + A[1] * 7152 + A[2] * 722) / 1e4 < 128
    },
    isLight() {
      return !this.isDark()
    },
    negate() {
      let A = this.rgb();
      for (let B = 0; B < 3; B++) A.color[B] = 255 - A.color[B];
      return A
    },
    lighten(A) {
      let B = this.hsl();
      return B.color[2] += B.color[2] * A, B
    },
    darken(A) {
      let B = this.hsl();
      return B.color[2] -= B.color[2] * A, B
    },
    saturate(A) {
      let B = this.hsl();
      return B.color[1] += B.color[1] * A, B
    },
    desaturate(A) {
      let B = this.hsl();
      return B.color[1] -= B.color[1] * A, B
    },
    whiten(A) {
      let B = this.hwb();
      return B.color[1] += B.color[1] * A, B
    },
    blacken(A) {
      let B = this.hwb();
      return B.color[2] += B.color[2] * A, B
    },
    grayscale() {
      let A = this.rgb().color,
        B = A[0] * 0.3 + A[1] * 0.59 + A[2] * 0.11;
      return bI.rgb(B, B, B)
    },
    fade(A) {
      return this.alpha(this.valpha - this.valpha * A)
    },
    opaquer(A) {
      return this.alpha(this.valpha + this.valpha * A)
    },
    rotate(A) {
      let B = this.hsl(),
        Q = B.color[0];
      return Q = (Q + A) % 360, Q = Q < 0 ? 360 + Q : Q, B.color[0] = Q, B
    },
    mix(A, B) {
      if (!A || !A.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof A);
      let Q = A.rgb(),
        I = this.rgb(),
        G = B === void 0 ? 0.5 : B,
        Z = 2 * G - 1,
        D = Q.alpha() - I.alpha(),
        Y = ((Z * D === -1 ? Z : (Z + D) / (1 + Z * D)) + 1) / 2,
        W = 1 - Y;
      return bI.rgb(Y * Q.red() + W * I.red(), Y * Q.green() + W * I.green(), Y * Q.blue() + W * I.blue(), Q.alpha() * G + I.alpha() * (1 - G))
    }
  };
  for (let A of Object.keys(lJ)) {
    if (Lz2.includes(A)) continue;
    let {
      channels: B
    } = lJ[A];
    bI.prototype[A] = function(...Q) {
      if (this.model === A) return new bI(this);
      if (Q.length > 0) return new bI(Q, A);
      return new bI([...DI5(lJ[this.model][A].raw(this.color)), this.valpha], A)
    }, bI[A] = function(...Q) {
      let I = Q[0];
      if (typeof I === "number") I = Wt1(Q, B);
      return new bI(I, A)
    }
  }

  function GI5(A, B) {
    return Number(A.toFixed(B))
  }

  function ZI5(A) {
    return function(B) {
      return GI5(B, A)
    }
  }

  function e3(A, B, Q) {
    A = Array.isArray(A) ? A : [A];
    for (let I of A)(SK1[I] || (SK1[I] = []))[B] = Q;
    return A = A[0],
      function(I) {
        let G;
        if (I !== void 0) {
          if (Q) I = Q(I);
          return G = this[A](), G.color[B] = I, G
        }
        if (G = this[A]().color[B], Q) G = Q(G);
        return G
      }
  }

  function i7(A) {
    return function(B) {
      return Math.max(0, Math.min(A, B))
    }
  }

  function DI5(A) {
    return Array.isArray(A) ? A : [A]
  }

  function Wt1(A, B) {
    for (let Q = 0; Q < B; Q++)
      if (typeof A[Q] !== "number") A[Q] = 0;
    return A
  }
  Rz2.exports = bI
})
// @from(Start 7430444, End 7443362)
Pz2 = z(($n8, Tz2) => {
  var YI5 = _K1(),
    cA = GE(),
    fO = I11(),
    WI5 = {
      left: "low",
      center: "centre",
      centre: "centre",
      right: "high"
    };

  function Oz2(A) {
    let {
      raw: B,
      density: Q,
      limitInputPixels: I,
      ignoreIcc: G,
      unlimited: Z,
      sequentialRead: D,
      failOn: Y,
      failOnError: W,
      animated: J,
      page: F,
      pages: X,
      subifd: V
    } = A;
    return [B, Q, I, G, Z, D, Y, W, J, F, X, V].some(cA.defined) ? {
      raw: B,
      density: Q,
      limitInputPixels: I,
      ignoreIcc: G,
      unlimited: Z,
      sequentialRead: D,
      failOn: Y,
      failOnError: W,
      animated: J,
      page: F,
      pages: X,
      subifd: V
    } : void 0
  }

  function JI5(A, B, Q) {
    let I = {
      failOn: "warning",
      limitInputPixels: Math.pow(16383, 2),
      ignoreIcc: !1,
      unlimited: !1,
      sequentialRead: !0
    };
    if (cA.string(A)) I.file = A;
    else if (cA.buffer(A)) {
      if (A.length === 0) throw Error("Input Buffer is empty");
      I.buffer = A
    } else if (cA.arrayBuffer(A)) {
      if (A.byteLength === 0) throw Error("Input bit Array is empty");
      I.buffer = Buffer.from(A, 0, A.byteLength)
    } else if (cA.typedArray(A)) {
      if (A.length === 0) throw Error("Input Bit Array is empty");
      I.buffer = Buffer.from(A.buffer, A.byteOffset, A.byteLength)
    } else if (cA.plainObject(A) && !cA.defined(B)) {
      if (B = A, Oz2(B)) I.buffer = []
    } else if (!cA.defined(A) && !cA.defined(B) && cA.object(Q) && Q.allowStream) I.buffer = [];
    else throw new Error(`Unsupported input '${A}' of type ${typeof A}${cA.defined(B)?` when also providing options of type ${typeof B}`:""}`);
    if (cA.object(B)) {
      if (cA.defined(B.failOnError))
        if (cA.bool(B.failOnError)) I.failOn = B.failOnError ? "warning" : "none";
        else throw cA.invalidParameterError("failOnError", "boolean", B.failOnError);
      if (cA.defined(B.failOn))
        if (cA.string(B.failOn) && cA.inArray(B.failOn, ["none", "truncated", "error", "warning"])) I.failOn = B.failOn;
        else throw cA.invalidParameterError("failOn", "one of: none, truncated, error, warning", B.failOn);
      if (cA.defined(B.density))
        if (cA.inRange(B.density, 1, 1e5)) I.density = B.density;
        else throw cA.invalidParameterError("density", "number between 1 and 100000", B.density);
      if (cA.defined(B.ignoreIcc))
        if (cA.bool(B.ignoreIcc)) I.ignoreIcc = B.ignoreIcc;
        else throw cA.invalidParameterError("ignoreIcc", "boolean", B.ignoreIcc);
      if (cA.defined(B.limitInputPixels))
        if (cA.bool(B.limitInputPixels)) I.limitInputPixels = B.limitInputPixels ? Math.pow(16383, 2) : 0;
        else if (cA.integer(B.limitInputPixels) && cA.inRange(B.limitInputPixels, 0, Number.MAX_SAFE_INTEGER)) I.limitInputPixels = B.limitInputPixels;
      else throw cA.invalidParameterError("limitInputPixels", "positive integer", B.limitInputPixels);
      if (cA.defined(B.unlimited))
        if (cA.bool(B.unlimited)) I.unlimited = B.unlimited;
        else throw cA.invalidParameterError("unlimited", "boolean", B.unlimited);
      if (cA.defined(B.sequentialRead))
        if (cA.bool(B.sequentialRead)) I.sequentialRead = B.sequentialRead;
        else throw cA.invalidParameterError("sequentialRead", "boolean", B.sequentialRead);
      if (cA.defined(B.raw))
        if (cA.object(B.raw) && cA.integer(B.raw.width) && B.raw.width > 0 && cA.integer(B.raw.height) && B.raw.height > 0 && cA.integer(B.raw.channels) && cA.inRange(B.raw.channels, 1, 4)) switch (I.rawWidth = B.raw.width, I.rawHeight = B.raw.height, I.rawChannels = B.raw.channels, I.rawPremultiplied = !!B.raw.premultiplied, A.constructor) {
          case Uint8Array:
          case Uint8ClampedArray:
            I.rawDepth = "uchar";
            break;
          case Int8Array:
            I.rawDepth = "char";
            break;
          case Uint16Array:
            I.rawDepth = "ushort";
            break;
          case Int16Array:
            I.rawDepth = "short";
            break;
          case Uint32Array:
            I.rawDepth = "uint";
            break;
          case Int32Array:
            I.rawDepth = "int";
            break;
          case Float32Array:
            I.rawDepth = "float";
            break;
          case Float64Array:
            I.rawDepth = "double";
            break;
          default:
            I.rawDepth = "uchar";
            break
        } else throw new Error("Expected width, height and channels for raw pixel input");
      if (cA.defined(B.animated))
        if (cA.bool(B.animated)) I.pages = B.animated ? -1 : 1;
        else throw cA.invalidParameterError("animated", "boolean", B.animated);
      if (cA.defined(B.pages))
        if (cA.integer(B.pages) && cA.inRange(B.pages, -1, 1e5)) I.pages = B.pages;
        else throw cA.invalidParameterError("pages", "integer between -1 and 100000", B.pages);
      if (cA.defined(B.page))
        if (cA.integer(B.page) && cA.inRange(B.page, 0, 1e5)) I.page = B.page;
        else throw cA.invalidParameterError("page", "integer between 0 and 100000", B.page);
      if (cA.defined(B.level))
        if (cA.integer(B.level) && cA.inRange(B.level, 0, 256)) I.level = B.level;
        else throw cA.invalidParameterError("level", "integer between 0 and 256", B.level);
      if (cA.defined(B.subifd))
        if (cA.integer(B.subifd) && cA.inRange(B.subifd, -1, 1e5)) I.subifd = B.subifd;
        else throw cA.invalidParameterError("subifd", "integer between -1 and 100000", B.subifd);
      if (cA.defined(B.create))
        if (cA.object(B.create) && cA.integer(B.create.width) && B.create.width > 0 && cA.integer(B.create.height) && B.create.height > 0 && cA.integer(B.create.channels)) {
          if (I.createWidth = B.create.width, I.createHeight = B.create.height, I.createChannels = B.create.channels, cA.defined(B.create.noise)) {
            if (!cA.object(B.create.noise)) throw new Error("Expected noise to be an object");
            if (!cA.inArray(B.create.noise.type, ["gaussian"])) throw new Error("Only gaussian noise is supported at the moment");
            if (!cA.inRange(B.create.channels, 1, 4)) throw cA.invalidParameterError("create.channels", "number between 1 and 4", B.create.channels);
            if (I.createNoiseType = B.create.noise.type, cA.number(B.create.noise.mean) && cA.inRange(B.create.noise.mean, 0, 1e4)) I.createNoiseMean = B.create.noise.mean;
            else throw cA.invalidParameterError("create.noise.mean", "number between 0 and 10000", B.create.noise.mean);
            if (cA.number(B.create.noise.sigma) && cA.inRange(B.create.noise.sigma, 0, 1e4)) I.createNoiseSigma = B.create.noise.sigma;
            else throw cA.invalidParameterError("create.noise.sigma", "number between 0 and 10000", B.create.noise.sigma)
          } else if (cA.defined(B.create.background)) {
            if (!cA.inRange(B.create.channels, 3, 4)) throw cA.invalidParameterError("create.channels", "number between 3 and 4", B.create.channels);
            let G = YI5(B.create.background);
            I.createBackground = [G.red(), G.green(), G.blue(), Math.round(G.alpha() * 255)]
          } else throw new Error("Expected valid noise or background to create a new input image");
          delete I.buffer
        } else throw new Error("Expected valid width, height and channels to create a new input image");
      if (cA.defined(B.text))
        if (cA.object(B.text) && cA.string(B.text.text)) {
          if (I.textValue = B.text.text, cA.defined(B.text.height) && cA.defined(B.text.dpi)) throw new Error("Expected only one of dpi or height");
          if (cA.defined(B.text.font))
            if (cA.string(B.text.font)) I.textFont = B.text.font;
            else throw cA.invalidParameterError("text.font", "string", B.text.font);
          if (cA.defined(B.text.fontfile))
            if (cA.string(B.text.fontfile)) I.textFontfile = B.text.fontfile;
            else throw cA.invalidParameterError("text.fontfile", "string", B.text.fontfile);
          if (cA.defined(B.text.width))
            if (cA.integer(B.text.width) && B.text.width > 0) I.textWidth = B.text.width;
            else throw cA.invalidParameterError("text.width", "positive integer", B.text.width);
          if (cA.defined(B.text.height))
            if (cA.integer(B.text.height) && B.text.height > 0) I.textHeight = B.text.height;
            else throw cA.invalidParameterError("text.height", "positive integer", B.text.height);
          if (cA.defined(B.text.align))
            if (cA.string(B.text.align) && cA.string(this.constructor.align[B.text.align])) I.textAlign = this.constructor.align[B.text.align];
            else throw cA.invalidParameterError("text.align", "valid alignment", B.text.align);
          if (cA.defined(B.text.justify))
            if (cA.bool(B.text.justify)) I.textJustify = B.text.justify;
            else throw cA.invalidParameterError("text.justify", "boolean", B.text.justify);
          if (cA.defined(B.text.dpi))
            if (cA.integer(B.text.dpi) && cA.inRange(B.text.dpi, 1, 1e6)) I.textDpi = B.text.dpi;
            else throw cA.invalidParameterError("text.dpi", "integer between 1 and 1000000", B.text.dpi);
          if (cA.defined(B.text.rgba))
            if (cA.bool(B.text.rgba)) I.textRgba = B.text.rgba;
            else throw cA.invalidParameterError("text.rgba", "bool", B.text.rgba);
          if (cA.defined(B.text.spacing))
            if (cA.integer(B.text.spacing) && cA.inRange(B.text.spacing, -1e6, 1e6)) I.textSpacing = B.text.spacing;
            else throw cA.invalidParameterError("text.spacing", "integer between -1000000 and 1000000", B.text.spacing);
          if (cA.defined(B.text.wrap))
            if (cA.string(B.text.wrap) && cA.inArray(B.text.wrap, ["word", "char", "word-char", "none"])) I.textWrap = B.text.wrap;
            else throw cA.invalidParameterError("text.wrap", "one of: word, char, word-char, none", B.text.wrap);
          delete I.buffer
        } else throw new Error("Expected a valid string to create an image with text.")
    } else if (cA.defined(B)) throw new Error("Invalid input options " + B);
    return I
  }

  function FI5(A, B, Q) {
    if (Array.isArray(this.options.input.buffer))
      if (cA.buffer(A)) {
        if (this.options.input.buffer.length === 0) this.on("finish", () => {
          this.streamInFinished = !0
        });
        this.options.input.buffer.push(A), Q()
      } else Q(new Error("Non-Buffer data on Writable Stream"));
    else Q(new Error("Unexpected data on Writable Stream"))
  }

  function XI5() {
    if (this._isStreamInput()) this.options.input.buffer = Buffer.concat(this.options.input.buffer)
  }

  function VI5() {
    return Array.isArray(this.options.input.buffer)
  }

  function CI5(A) {
    let B = Error();
    if (cA.fn(A)) {
      if (this._isStreamInput()) this.on("finish", () => {
        this._flattenBufferIn(), fO.metadata(this.options, (Q, I) => {
          if (Q) A(cA.nativeError(Q, B));
          else A(null, I)
        })
      });
      else fO.metadata(this.options, (Q, I) => {
        if (Q) A(cA.nativeError(Q, B));
        else A(null, I)
      });
      return this
    } else if (this._isStreamInput()) return new Promise((Q, I) => {
      let G = () => {
        this._flattenBufferIn(), fO.metadata(this.options, (Z, D) => {
          if (Z) I(cA.nativeError(Z, B));
          else Q(D)
        })
      };
      if (this.writableFinished) G();
      else this.once("finish", G)
    });
    else return new Promise((Q, I) => {
      fO.metadata(this.options, (G, Z) => {
        if (G) I(cA.nativeError(G, B));
        else Q(Z)
      })
    })
  }

  function KI5(A) {
    let B = Error();
    if (cA.fn(A)) {
      if (this._isStreamInput()) this.on("finish", () => {
        this._flattenBufferIn(), fO.stats(this.options, (Q, I) => {
          if (Q) A(cA.nativeError(Q, B));
          else A(null, I)
        })
      });
      else fO.stats(this.options, (Q, I) => {
        if (Q) A(cA.nativeError(Q, B));
        else A(null, I)
      });
      return this
    } else if (this._isStreamInput()) return new Promise((Q, I) => {
      this.on("finish", function() {
        this._flattenBufferIn(), fO.stats(this.options, (G, Z) => {
          if (G) I(cA.nativeError(G, B));
          else Q(Z)
        })
      })
    });
    else return new Promise((Q, I) => {
      fO.stats(this.options, (G, Z) => {
        if (G) I(cA.nativeError(G, B));
        else Q(Z)
      })
    })
  }
  Tz2.exports = function(A) {
    Object.assign(A.prototype, {
      _inputOptionsFromObject: Oz2,
      _createInputDescriptor: JI5,
      _write: FI5,
      _flattenBufferIn: XI5,
      _isStreamInput: VI5,
      metadata: CI5,
      stats: KI5
    }), A.align = WI5
  }
})
// @from(Start 7443368, End 7449855)
xz2 = z((qn8, kz2) => {
  var C9 = GE(),
    _z2 = {
      center: 0,
      centre: 0,
      north: 1,
      east: 2,
      south: 3,
      west: 4,
      northeast: 5,
      southeast: 6,
      southwest: 7,
      northwest: 8
    },
    jz2 = {
      top: 1,
      right: 2,
      bottom: 3,
      left: 4,
      "right top": 5,
      "right bottom": 6,
      "left bottom": 7,
      "left top": 8
    },
    Sz2 = {
      background: "background",
      copy: "copy",
      repeat: "repeat",
      mirror: "mirror"
    },
    yz2 = {
      entropy: 16,
      attention: 17
    },
    Jt1 = {
      nearest: "nearest",
      linear: "linear",
      cubic: "cubic",
      mitchell: "mitchell",
      lanczos2: "lanczos2",
      lanczos3: "lanczos3"
    },
    HI5 = {
      contain: "contain",
      cover: "cover",
      fill: "fill",
      inside: "inside",
      outside: "outside"
    },
    zI5 = {
      contain: "embed",
      cover: "crop",
      fill: "ignore_aspect",
      inside: "max",
      outside: "min"
    };

  function Ft1(A) {
    return A.angle % 360 !== 0 || A.useExifOrientation === !0 || A.rotationAngle !== 0
  }

  function jK1(A) {
    return A.width !== -1 || A.height !== -1
  }

  function wI5(A, B, Q) {
    if (jK1(this.options)) this.options.debuglog("ignoring previous resize options");
    if (this.options.widthPost !== -1) this.options.debuglog("operation order will be: extract, resize, extract");
    if (C9.defined(A))
      if (C9.object(A) && !C9.defined(Q)) Q = A;
      else if (C9.integer(A) && A > 0) this.options.width = A;
    else throw C9.invalidParameterError("width", "positive integer", A);
    else this.options.width = -1;
    if (C9.defined(B))
      if (C9.integer(B) && B > 0) this.options.height = B;
      else throw C9.invalidParameterError("height", "positive integer", B);
    else this.options.height = -1;
    if (C9.object(Q)) {
      if (C9.defined(Q.width))
        if (C9.integer(Q.width) && Q.width > 0) this.options.width = Q.width;
        else throw C9.invalidParameterError("width", "positive integer", Q.width);
      if (C9.defined(Q.height))
        if (C9.integer(Q.height) && Q.height > 0) this.options.height = Q.height;
        else throw C9.invalidParameterError("height", "positive integer", Q.height);
      if (C9.defined(Q.fit)) {
        let I = zI5[Q.fit];
        if (C9.string(I)) this.options.canvas = I;
        else throw C9.invalidParameterError("fit", "valid fit", Q.fit)
      }
      if (C9.defined(Q.position)) {
        let I = C9.integer(Q.position) ? Q.position : yz2[Q.position] || jz2[Q.position] || _z2[Q.position];
        if (C9.integer(I) && (C9.inRange(I, 0, 8) || C9.inRange(I, 16, 17))) this.options.position = I;
        else throw C9.invalidParameterError("position", "valid position/gravity/strategy", Q.position)
      }
      if (this._setBackgroundColourOption("resizeBackground", Q.background), C9.defined(Q.kernel))
        if (C9.string(Jt1[Q.kernel])) this.options.kernel = Jt1[Q.kernel];
        else throw C9.invalidParameterError("kernel", "valid kernel name", Q.kernel);
      if (C9.defined(Q.withoutEnlargement)) this._setBooleanOption("withoutEnlargement", Q.withoutEnlargement);
      if (C9.defined(Q.withoutReduction)) this._setBooleanOption("withoutReduction", Q.withoutReduction);
      if (C9.defined(Q.fastShrinkOnLoad)) this._setBooleanOption("fastShrinkOnLoad", Q.fastShrinkOnLoad)
    }
    if (Ft1(this.options) && jK1(this.options)) this.options.rotateBeforePreExtract = !0;
    return this
  }

  function EI5(A) {
    if (C9.integer(A) && A > 0) this.options.extendTop = A, this.options.extendBottom = A, this.options.extendLeft = A, this.options.extendRight = A;
    else if (C9.object(A)) {
      if (C9.defined(A.top))
        if (C9.integer(A.top) && A.top >= 0) this.options.extendTop = A.top;
        else throw C9.invalidParameterError("top", "positive integer", A.top);
      if (C9.defined(A.bottom))
        if (C9.integer(A.bottom) && A.bottom >= 0) this.options.extendBottom = A.bottom;
        else throw C9.invalidParameterError("bottom", "positive integer", A.bottom);
      if (C9.defined(A.left))
        if (C9.integer(A.left) && A.left >= 0) this.options.extendLeft = A.left;
        else throw C9.invalidParameterError("left", "positive integer", A.left);
      if (C9.defined(A.right))
        if (C9.integer(A.right) && A.right >= 0) this.options.extendRight = A.right;
        else throw C9.invalidParameterError("right", "positive integer", A.right);
      if (this._setBackgroundColourOption("extendBackground", A.background), C9.defined(A.extendWith))
        if (C9.string(Sz2[A.extendWith])) this.options.extendWith = Sz2[A.extendWith];
        else throw C9.invalidParameterError("extendWith", "one of: background, copy, repeat, mirror", A.extendWith)
    } else throw C9.invalidParameterError("extend", "integer or object", A);
    return this
  }

  function UI5(A) {
    let B = jK1(this.options) || this.options.widthPre !== -1 ? "Post" : "Pre";
    if (this.options[`width${B}`] !== -1) this.options.debuglog("ignoring previous extract options");
    if (["left", "top", "width", "height"].forEach(function(Q) {
        let I = A[Q];
        if (C9.integer(I) && I >= 0) this.options[Q + (Q === "left" || Q === "top" ? "Offset" : "") + B] = I;
        else throw C9.invalidParameterError(Q, "integer", I)
      }, this), Ft1(this.options) && !jK1(this.options)) {
      if (this.options.widthPre === -1 || this.options.widthPost === -1) this.options.rotateBeforePreExtract = !0
    }
    return this
  }

  function NI5(A) {
    if (this.options.trimThreshold = 10, C9.defined(A))
      if (C9.object(A)) {
        if (C9.defined(A.background)) this._setBackgroundColourOption("trimBackground", A.background);
        if (C9.defined(A.threshold))
          if (C9.number(A.threshold) && A.threshold >= 0) this.options.trimThreshold = A.threshold;
          else throw C9.invalidParameterError("threshold", "positive number", A.threshold);
        if (C9.defined(A.lineArt)) this._setBooleanOption("trimLineArt", A.lineArt)
      } else throw C9.invalidParameterError("trim", "object", A);
    if (Ft1(this.options)) this.options.rotateBeforePreExtract = !0;
    return this
  }
  kz2.exports = function(A) {
    Object.assign(A.prototype, {
      resize: wI5,
      extend: EI5,
      extract: UI5,
      trim: NI5
    }), A.gravity = _z2, A.strategy = yz2, A.kernel = Jt1, A.fit = HI5, A.position = jz2
  }
})
// @from(Start 7449861, End 7452692)
vz2 = z((Mn8, fz2) => {
  var S8 = GE(),
    Xt1 = {
      clear: "clear",
      source: "source",
      over: "over",
      in: "in",
      out: "out",
      atop: "atop",
      dest: "dest",
      "dest-over": "dest-over",
      "dest-in": "dest-in",
      "dest-out": "dest-out",
      "dest-atop": "dest-atop",
      xor: "xor",
      add: "add",
      saturate: "saturate",
      multiply: "multiply",
      screen: "screen",
      overlay: "overlay",
      darken: "darken",
      lighten: "lighten",
      "colour-dodge": "colour-dodge",
      "color-dodge": "colour-dodge",
      "colour-burn": "colour-burn",
      "color-burn": "colour-burn",
      "hard-light": "hard-light",
      "soft-light": "soft-light",
      difference: "difference",
      exclusion: "exclusion"
    };

  function $I5(A) {
    if (!Array.isArray(A)) throw S8.invalidParameterError("images to composite", "array", A);
    return this.options.composite = A.map((B) => {
      if (!S8.object(B)) throw S8.invalidParameterError("image to composite", "object", B);
      let Q = this._inputOptionsFromObject(B),
        I = {
          input: this._createInputDescriptor(B.input, Q, {
            allowStream: !1
          }),
          blend: "over",
          tile: !1,
          left: 0,
          top: 0,
          hasOffset: !1,
          gravity: 0,
          premultiplied: !1
        };
      if (S8.defined(B.blend))
        if (S8.string(Xt1[B.blend])) I.blend = Xt1[B.blend];
        else throw S8.invalidParameterError("blend", "valid blend name", B.blend);
      if (S8.defined(B.tile))
        if (S8.bool(B.tile)) I.tile = B.tile;
        else throw S8.invalidParameterError("tile", "boolean", B.tile);
      if (S8.defined(B.left))
        if (S8.integer(B.left)) I.left = B.left;
        else throw S8.invalidParameterError("left", "integer", B.left);
      if (S8.defined(B.top))
        if (S8.integer(B.top)) I.top = B.top;
        else throw S8.invalidParameterError("top", "integer", B.top);
      if (S8.defined(B.top) !== S8.defined(B.left)) throw new Error("Expected both left and top to be set");
      else I.hasOffset = S8.integer(B.top) && S8.integer(B.left);
      if (S8.defined(B.gravity))
        if (S8.integer(B.gravity) && S8.inRange(B.gravity, 0, 8)) I.gravity = B.gravity;
        else if (S8.string(B.gravity) && S8.integer(this.constructor.gravity[B.gravity])) I.gravity = this.constructor.gravity[B.gravity];
      else throw S8.invalidParameterError("gravity", "valid gravity", B.gravity);
      if (S8.defined(B.premultiplied))
        if (S8.bool(B.premultiplied)) I.premultiplied = B.premultiplied;
        else throw S8.invalidParameterError("premultiplied", "boolean", B.premultiplied);
      return I
    }), this
  }
  fz2.exports = function(A) {
    A.prototype.composite = $I5, A.blend = Xt1
  }
})
// @from(Start 7452698, End 7464787)
hz2 = z((Ln8, gz2) => {
  var qI5 = _K1(),
    _A = GE(),
    bz2 = {
      integer: "integer",
      float: "float",
      approximate: "approximate"
    };

  function MI5(A, B) {
    if (this.options.useExifOrientation || this.options.angle || this.options.rotationAngle) this.options.debuglog("ignoring previous rotate options");
    if (!_A.defined(A)) this.options.useExifOrientation = !0;
    else if (_A.integer(A) && !(A % 90)) this.options.angle = A;
    else if (_A.number(A)) {
      if (this.options.rotationAngle = A, _A.object(B) && B.background) {
        let Q = qI5(B.background);
        this.options.rotationBackground = [Q.red(), Q.green(), Q.blue(), Math.round(Q.alpha() * 255)]
      }
    } else throw _A.invalidParameterError("angle", "numeric", A);
    return this
  }

  function LI5(A) {
    return this.options.flip = _A.bool(A) ? A : !0, this
  }

  function RI5(A) {
    return this.options.flop = _A.bool(A) ? A : !0, this
  }

  function OI5(A, B) {
    let Q = [].concat(...A);
    if (Q.length === 4 && Q.every(_A.number)) this.options.affineMatrix = Q;
    else throw _A.invalidParameterError("matrix", "1x4 or 2x2 array", A);
    if (_A.defined(B))
      if (_A.object(B)) {
        if (this._setBackgroundColourOption("affineBackground", B.background), _A.defined(B.idx))
          if (_A.number(B.idx)) this.options.affineIdx = B.idx;
          else throw _A.invalidParameterError("options.idx", "number", B.idx);
        if (_A.defined(B.idy))
          if (_A.number(B.idy)) this.options.affineIdy = B.idy;
          else throw _A.invalidParameterError("options.idy", "number", B.idy);
        if (_A.defined(B.odx))
          if (_A.number(B.odx)) this.options.affineOdx = B.odx;
          else throw _A.invalidParameterError("options.odx", "number", B.odx);
        if (_A.defined(B.ody))
          if (_A.number(B.ody)) this.options.affineOdy = B.ody;
          else throw _A.invalidParameterError("options.ody", "number", B.ody);
        if (_A.defined(B.interpolator))
          if (_A.inArray(B.interpolator, Object.values(this.constructor.interpolators))) this.options.affineInterpolator = B.interpolator;
          else throw _A.invalidParameterError("options.interpolator", "valid interpolator name", B.interpolator)
      } else throw _A.invalidParameterError("options", "object", B);
    return this
  }

  function TI5(A, B, Q) {
    if (!_A.defined(A)) this.options.sharpenSigma = -1;
    else if (_A.bool(A)) this.options.sharpenSigma = A ? -1 : 0;
    else if (_A.number(A) && _A.inRange(A, 0.01, 1e4)) {
      if (this.options.sharpenSigma = A, _A.defined(B))
        if (_A.number(B) && _A.inRange(B, 0, 1e4)) this.options.sharpenM1 = B;
        else throw _A.invalidParameterError("flat", "number between 0 and 10000", B);
      if (_A.defined(Q))
        if (_A.number(Q) && _A.inRange(Q, 0, 1e4)) this.options.sharpenM2 = Q;
        else throw _A.invalidParameterError("jagged", "number between 0 and 10000", Q)
    } else if (_A.plainObject(A)) {
      if (_A.number(A.sigma) && _A.inRange(A.sigma, 0.000001, 10)) this.options.sharpenSigma = A.sigma;
      else throw _A.invalidParameterError("options.sigma", "number between 0.000001 and 10", A.sigma);
      if (_A.defined(A.m1))
        if (_A.number(A.m1) && _A.inRange(A.m1, 0, 1e6)) this.options.sharpenM1 = A.m1;
        else throw _A.invalidParameterError("options.m1", "number between 0 and 1000000", A.m1);
      if (_A.defined(A.m2))
        if (_A.number(A.m2) && _A.inRange(A.m2, 0, 1e6)) this.options.sharpenM2 = A.m2;
        else throw _A.invalidParameterError("options.m2", "number between 0 and 1000000", A.m2);
      if (_A.defined(A.x1))
        if (_A.number(A.x1) && _A.inRange(A.x1, 0, 1e6)) this.options.sharpenX1 = A.x1;
        else throw _A.invalidParameterError("options.x1", "number between 0 and 1000000", A.x1);
      if (_A.defined(A.y2))
        if (_A.number(A.y2) && _A.inRange(A.y2, 0, 1e6)) this.options.sharpenY2 = A.y2;
        else throw _A.invalidParameterError("options.y2", "number between 0 and 1000000", A.y2);
      if (_A.defined(A.y3))
        if (_A.number(A.y3) && _A.inRange(A.y3, 0, 1e6)) this.options.sharpenY3 = A.y3;
        else throw _A.invalidParameterError("options.y3", "number between 0 and 1000000", A.y3)
    } else throw _A.invalidParameterError("sigma", "number between 0.01 and 10000", A);
    return this
  }

  function PI5(A) {
    if (!_A.defined(A)) this.options.medianSize = 3;
    else if (_A.integer(A) && _A.inRange(A, 1, 1000)) this.options.medianSize = A;
    else throw _A.invalidParameterError("size", "integer between 1 and 1000", A);
    return this
  }

  function SI5(A) {
    let B;
    if (_A.number(A)) B = A;
    else if (_A.plainObject(A)) {
      if (!_A.number(A.sigma)) throw _A.invalidParameterError("options.sigma", "number between 0.3 and 1000", B);
      if (B = A.sigma, "precision" in A)
        if (_A.string(bz2[A.precision])) this.options.precision = bz2[A.precision];
        else throw _A.invalidParameterError("precision", "one of: integer, float, approximate", A.precision);
      if ("minAmplitude" in A)
        if (_A.number(A.minAmplitude) && _A.inRange(A.minAmplitude, 0.001, 1)) this.options.minAmpl = A.minAmplitude;
        else throw _A.invalidParameterError("minAmplitude", "number between 0.001 and 1", A.minAmplitude)
    }
    if (!_A.defined(A)) this.options.blurSigma = -1;
    else if (_A.bool(A)) this.options.blurSigma = A ? -1 : 0;
    else if (_A.number(B) && _A.inRange(B, 0.3, 1000)) this.options.blurSigma = B;
    else throw _A.invalidParameterError("sigma", "number between 0.3 and 1000", B);
    return this
  }

  function _I5(A) {
    if (this.options.flatten = _A.bool(A) ? A : !0, _A.object(A)) this._setBackgroundColourOption("flattenBackground", A.background);
    return this
  }

  function jI5() {
    return this.options.unflatten = !0, this
  }

  function yI5(A, B) {
    if (!_A.defined(A)) this.options.gamma = 2.2;
    else if (_A.number(A) && _A.inRange(A, 1, 3)) this.options.gamma = A;
    else throw _A.invalidParameterError("gamma", "number between 1.0 and 3.0", A);
    if (!_A.defined(B)) this.options.gammaOut = this.options.gamma;
    else if (_A.number(B) && _A.inRange(B, 1, 3)) this.options.gammaOut = B;
    else throw _A.invalidParameterError("gammaOut", "number between 1.0 and 3.0", B);
    return this
  }

  function kI5(A) {
    if (this.options.negate = _A.bool(A) ? A : !0, _A.plainObject(A) && "alpha" in A)
      if (!_A.bool(A.alpha)) throw _A.invalidParameterError("alpha", "should be boolean value", A.alpha);
      else this.options.negateAlpha = A.alpha;
    return this
  }

  function xI5(A) {
    if (_A.plainObject(A)) {
      if (_A.defined(A.lower))
        if (_A.number(A.lower) && _A.inRange(A.lower, 0, 99)) this.options.normaliseLower = A.lower;
        else throw _A.invalidParameterError("lower", "number between 0 and 99", A.lower);
      if (_A.defined(A.upper))
        if (_A.number(A.upper) && _A.inRange(A.upper, 1, 100)) this.options.normaliseUpper = A.upper;
        else throw _A.invalidParameterError("upper", "number between 1 and 100", A.upper)
    }
    if (this.options.normaliseLower >= this.options.normaliseUpper) throw _A.invalidParameterError("range", "lower to be less than upper", `${this.options.normaliseLower} >= ${this.options.normaliseUpper}`);
    return this.options.normalise = !0, this
  }

  function fI5(A) {
    return this.normalise(A)
  }

  function vI5(A) {
    if (_A.plainObject(A)) {
      if (_A.integer(A.width) && A.width > 0) this.options.claheWidth = A.width;
      else throw _A.invalidParameterError("width", "integer greater than zero", A.width);
      if (_A.integer(A.height) && A.height > 0) this.options.claheHeight = A.height;
      else throw _A.invalidParameterError("height", "integer greater than zero", A.height);
      if (_A.defined(A.maxSlope))
        if (_A.integer(A.maxSlope) && _A.inRange(A.maxSlope, 0, 100)) this.options.claheMaxSlope = A.maxSlope;
        else throw _A.invalidParameterError("maxSlope", "integer between 0 and 100", A.maxSlope)
    } else throw _A.invalidParameterError("options", "plain object", A);
    return this
  }

  function bI5(A) {
    if (!_A.object(A) || !Array.isArray(A.kernel) || !_A.integer(A.width) || !_A.integer(A.height) || !_A.inRange(A.width, 3, 1001) || !_A.inRange(A.height, 3, 1001) || A.height * A.width !== A.kernel.length) throw new Error("Invalid convolution kernel");
    if (!_A.integer(A.scale)) A.scale = A.kernel.reduce(function(B, Q) {
      return B + Q
    }, 0);
    if (A.scale < 1) A.scale = 1;
    if (!_A.integer(A.offset)) A.offset = 0;
    return this.options.convKernel = A, this
  }

  function gI5(A, B) {
    if (!_A.defined(A)) this.options.threshold = 128;
    else if (_A.bool(A)) this.options.threshold = A ? 128 : 0;
    else if (_A.integer(A) && _A.inRange(A, 0, 255)) this.options.threshold = A;
    else throw _A.invalidParameterError("threshold", "integer between 0 and 255", A);
    if (!_A.object(B) || B.greyscale === !0 || B.grayscale === !0) this.options.thresholdGrayscale = !0;
    else this.options.thresholdGrayscale = !1;
    return this
  }

  function hI5(A, B, Q) {
    if (this.options.boolean = this._createInputDescriptor(A, Q), _A.string(B) && _A.inArray(B, ["and", "or", "eor"])) this.options.booleanOp = B;
    else throw _A.invalidParameterError("operator", "one of: and, or, eor", B);
    return this
  }

  function mI5(A, B) {
    if (!_A.defined(A) && _A.number(B)) A = 1;
    else if (_A.number(A) && !_A.defined(B)) B = 0;
    if (!_A.defined(A)) this.options.linearA = [];
    else if (_A.number(A)) this.options.linearA = [A];
    else if (Array.isArray(A) && A.length && A.every(_A.number)) this.options.linearA = A;
    else throw _A.invalidParameterError("a", "number or array of numbers", A);
    if (!_A.defined(B)) this.options.linearB = [];
    else if (_A.number(B)) this.options.linearB = [B];
    else if (Array.isArray(B) && B.length && B.every(_A.number)) this.options.linearB = B;
    else throw _A.invalidParameterError("b", "number or array of numbers", B);
    if (this.options.linearA.length !== this.options.linearB.length) throw new Error("Expected a and b to be arrays of the same length");
    return this
  }

  function dI5(A) {
    if (!Array.isArray(A)) throw _A.invalidParameterError("inputMatrix", "array", A);
    if (A.length !== 3 && A.length !== 4) throw _A.invalidParameterError("inputMatrix", "3x3 or 4x4 array", A.length);
    let B = A.flat().map(Number);
    if (B.length !== 9 && B.length !== 16) throw _A.invalidParameterError("inputMatrix", "cardinality of 9 or 16", B.length);
    return this.options.recombMatrix = B, this
  }

  function uI5(A) {
    if (!_A.plainObject(A)) throw _A.invalidParameterError("options", "plain object", A);
    if ("brightness" in A)
      if (_A.number(A.brightness) && A.brightness >= 0) this.options.brightness = A.brightness;
      else throw _A.invalidParameterError("brightness", "number above zero", A.brightness);
    if ("saturation" in A)
      if (_A.number(A.saturation) && A.saturation >= 0) this.options.saturation = A.saturation;
      else throw _A.invalidParameterError("saturation", "number above zero", A.saturation);
    if ("hue" in A)
      if (_A.integer(A.hue)) this.options.hue = A.hue % 360;
      else throw _A.invalidParameterError("hue", "number", A.hue);
    if ("lightness" in A)
      if (_A.number(A.lightness)) this.options.lightness = A.lightness;
      else throw _A.invalidParameterError("lightness", "number", A.lightness);
    return this
  }
  gz2.exports = function(A) {
    Object.assign(A.prototype, {
      rotate: MI5,
      flip: LI5,
      flop: RI5,
      affine: OI5,
      sharpen: TI5,
      median: PI5,
      blur: SI5,
      flatten: _I5,
      unflatten: jI5,
      gamma: yI5,
      negate: kI5,
      normalise: xI5,
      normalize: fI5,
      clahe: vI5,
      convolve: bI5,
      threshold: gI5,
      boolean: hI5,
      linear: mI5,
      recomb: dI5,
      modulate: uI5
    })
  }
})
// @from(Start 7464793, End 7466254)
uz2 = z((Rn8, dz2) => {
  var pI5 = _K1(),
    O$ = GE(),
    mz2 = {
      multiband: "multiband",
      "b-w": "b-w",
      bw: "b-w",
      cmyk: "cmyk",
      srgb: "srgb"
    };

  function cI5(A) {
    return this._setBackgroundColourOption("tint", A), this
  }

  function lI5(A) {
    return this.options.greyscale = O$.bool(A) ? A : !0, this
  }

  function iI5(A) {
    return this.greyscale(A)
  }

  function nI5(A) {
    if (!O$.string(A)) throw O$.invalidParameterError("colourspace", "string", A);
    return this.options.colourspacePipeline = A, this
  }

  function aI5(A) {
    return this.pipelineColourspace(A)
  }

  function sI5(A) {
    if (!O$.string(A)) throw O$.invalidParameterError("colourspace", "string", A);
    return this.options.colourspace = A, this
  }

  function rI5(A) {
    return this.toColourspace(A)
  }

  function oI5(A, B) {
    if (O$.defined(B))
      if (O$.object(B) || O$.string(B)) {
        let Q = pI5(B);
        this.options[A] = [Q.red(), Q.green(), Q.blue(), Math.round(Q.alpha() * 255)]
      } else throw O$.invalidParameterError("background", "object or string", B)
  }
  dz2.exports = function(A) {
    Object.assign(A.prototype, {
      tint: cI5,
      greyscale: lI5,
      grayscale: iI5,
      pipelineColourspace: nI5,
      pipelineColorspace: aI5,
      toColourspace: sI5,
      toColorspace: rI5,
      _setBackgroundColourOption: oI5
    }), A.colourspace = mz2, A.colorspace = mz2
  }
})
// @from(Start 7466260, End 7467727)
cz2 = z((On8, pz2) => {
  var YE = GE(),
    tI5 = {
      and: "and",
      or: "or",
      eor: "eor"
    };

  function eI5() {
    return this.options.removeAlpha = !0, this
  }

  function AG5(A) {
    if (YE.defined(A))
      if (YE.number(A) && YE.inRange(A, 0, 1)) this.options.ensureAlpha = A;
      else throw YE.invalidParameterError("alpha", "number between 0 and 1", A);
    else this.options.ensureAlpha = 1;
    return this
  }

  function BG5(A) {
    let B = {
      red: 0,
      green: 1,
      blue: 2,
      alpha: 3
    };
    if (Object.keys(B).includes(A)) A = B[A];
    if (YE.integer(A) && YE.inRange(A, 0, 4)) this.options.extractChannel = A;
    else throw YE.invalidParameterError("channel", "integer or one of: red, green, blue, alpha", A);
    return this
  }

  function QG5(A, B) {
    if (Array.isArray(A)) A.forEach(function(Q) {
      this.options.joinChannelIn.push(this._createInputDescriptor(Q, B))
    }, this);
    else this.options.joinChannelIn.push(this._createInputDescriptor(A, B));
    return this
  }

  function IG5(A) {
    if (YE.string(A) && YE.inArray(A, ["and", "or", "eor"])) this.options.bandBoolOp = A;
    else throw YE.invalidParameterError("boolOp", "one of: and, or, eor", A);
    return this
  }
  pz2.exports = function(A) {
    Object.assign(A.prototype, {
      removeAlpha: eI5,
      ensureAlpha: AG5,
      extractChannel: BG5,
      joinChannel: QG5,
      bandbool: IG5
    }), A.bool = tI5
  }
})