
// @from(Start 8180902, End 8182719)
jA1 = z((lQB, uR2) => {
  uR2.exports = dR2;
  var hR2 = Oz1(),
    mR2 = Pz1(),
    bK5 = fz1(),
    vz1 = QQ(),
    gK5 = Xz1();

  function dR2(A) {
    this.contextObject = A
  }
  var hK5 = {
    xml: {
      "": !0,
      "1.0": !0,
      "2.0": !0
    },
    core: {
      "": !0,
      "2.0": !0
    },
    html: {
      "": !0,
      "1.0": !0,
      "2.0": !0
    },
    xhtml: {
      "": !0,
      "1.0": !0,
      "2.0": !0
    }
  };
  dR2.prototype = {
    hasFeature: function A(B, Q) {
      var I = hK5[(B || "").toLowerCase()];
      return I && I[Q || ""] || !1
    },
    createDocumentType: function A(B, Q, I) {
      if (!gK5.isValidQName(B)) vz1.InvalidCharacterError();
      return new mR2(this.contextObject, B, Q, I)
    },
    createDocument: function A(B, Q, I) {
      var G = new hR2(!1, null),
        Z;
      if (Q) Z = G.createElementNS(B, Q);
      else Z = null;
      if (I) G.appendChild(I);
      if (Z) G.appendChild(Z);
      if (B === vz1.NAMESPACE.HTML) G._contentType = "application/xhtml+xml";
      else if (B === vz1.NAMESPACE.SVG) G._contentType = "image/svg+xml";
      else G._contentType = "application/xml";
      return G
    },
    createHTMLDocument: function A(B) {
      var Q = new hR2(!0, null);
      Q.appendChild(new mR2(Q, "html"));
      var I = Q.createElement("html");
      Q.appendChild(I);
      var G = Q.createElement("head");
      if (I.appendChild(G), B !== void 0) {
        var Z = Q.createElement("title");
        G.appendChild(Z), Z.appendChild(Q.createTextNode(B))
      }
      return I.appendChild(Q.createElement("body")), Q.modclock = 1, Q
    },
    mozSetOutputMutationHandler: function(A, B) {
      A.mutationHandler = B
    },
    mozGetInputMutationHandler: function(A) {
      vz1.nyi()
    },
    mozHTMLParser: bK5
  }
})
// @from(Start 8182725, End 8183495)
cR2 = z((iQB, pR2) => {
  var mK5 = $z1(),
    dK5 = DAA();
  pR2.exports = NAA;

  function NAA(A, B) {
    this._window = A, this._href = B
  }
  NAA.prototype = Object.create(dK5.prototype, {
    constructor: {
      value: NAA
    },
    href: {
      get: function() {
        return this._href
      },
      set: function(A) {
        this.assign(A)
      }
    },
    assign: {
      value: function(A) {
        var B = new mK5(this._href),
          Q = B.resolve(A);
        this._href = Q
      }
    },
    replace: {
      value: function(A) {
        this.assign(A)
      }
    },
    reload: {
      value: function() {
        this.assign(this.href)
      }
    },
    toString: {
      value: function() {
        return this.href
      }
    }
  })
})
// @from(Start 8183501, End 8184052)
iR2 = z((nQB, lR2) => {
  var uK5 = Object.create(null, {
    appCodeName: {
      value: "Mozilla"
    },
    appName: {
      value: "Netscape"
    },
    appVersion: {
      value: "4.0"
    },
    platform: {
      value: ""
    },
    product: {
      value: "Gecko"
    },
    productSub: {
      value: "20100101"
    },
    userAgent: {
      value: ""
    },
    vendor: {
      value: ""
    },
    vendorSub: {
      value: ""
    },
    taintEnabled: {
      value: function() {
        return !1
      }
    }
  });
  lR2.exports = uK5
})
// @from(Start 8184058, End 8184192)
aR2 = z((aQB, nR2) => {
  var pK5 = {
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval
  };
  nR2.exports = pK5
})
// @from(Start 8184198, End 8184791)
qAA = z((yA1, sR2) => {
  var $AA = QQ();
  yA1 = sR2.exports = {
    CSSStyleDeclaration: qz1(),
    CharacterData: qA1(),
    Comment: i1A(),
    DOMException: Dz1(),
    DOMImplementation: jA1(),
    DOMTokenList: S1A(),
    Document: Oz1(),
    DocumentFragment: a1A(),
    DocumentType: Pz1(),
    Element: uu(),
    HTMLParser: fz1(),
    NamedNodeMap: f1A(),
    Node: cG(),
    NodeList: Oy(),
    NodeFilter: OA1(),
    ProcessingInstruction: r1A(),
    Text: c1A(),
    Window: MAA()
  };
  $AA.merge(yA1, ZAA());
  $AA.merge(yA1, Lz1().elements);
  $AA.merge(yA1, XAA().elements)
})
// @from(Start 8184797, End 8186194)
MAA = z((sQB, rR2) => {
  var cK5 = jA1(),
    lK5 = C1A(),
    iK5 = cR2(),
    kA1 = QQ();
  rR2.exports = bz1;

  function bz1(A) {
    this.document = A || new cK5(null).createHTMLDocument(""), this.document._scripting_enabled = !0, this.document.defaultView = this, this.location = new iK5(this, this.document._address || "about:blank")
  }
  bz1.prototype = Object.create(lK5.prototype, {
    console: {
      value: console
    },
    history: {
      value: {
        back: kA1.nyi,
        forward: kA1.nyi,
        go: kA1.nyi
      }
    },
    navigator: {
      value: iR2()
    },
    window: {
      get: function() {
        return this
      }
    },
    self: {
      get: function() {
        return this
      }
    },
    frames: {
      get: function() {
        return this
      }
    },
    parent: {
      get: function() {
        return this
      }
    },
    top: {
      get: function() {
        return this
      }
    },
    length: {
      value: 0
    },
    frameElement: {
      value: null
    },
    opener: {
      value: null
    },
    onload: {
      get: function() {
        return this._getEventHandler("load")
      },
      set: function(A) {
        this._setEventHandler("load", A)
      }
    },
    getComputedStyle: {
      value: function A(B) {
        return B.style
      }
    }
  });
  kA1.expose(aR2(), bz1);
  kA1.expose(qAA(), bz1)
})
// @from(Start 8186200, End 8187175)
BO2 = z((nK5) => {
  var oR2 = jA1(),
    tR2 = fz1(),
    rQB = MAA(),
    eR2 = qAA();
  nK5.createDOMImplementation = function() {
    return new oR2(null)
  };
  nK5.createDocument = function(A, B) {
    if (A || B) {
      var Q = new tR2;
      return Q.parse(A || "", !0), Q.document()
    }
    return new oR2(null).createHTMLDocument("")
  };
  nK5.createIncrementalHTMLParser = function() {
    var A = new tR2;
    return {
      write: function(B) {
        if (B.length > 0) A.parse(B, !1, function() {
          return !0
        })
      },
      end: function(B) {
        A.parse(B || "", !0, function() {
          return !0
        })
      },
      process: function(B) {
        return A.parse("", !1, B)
      },
      document: function() {
        return A.document()
      }
    }
  };
  nK5.createWindow = function(A, B) {
    var Q = nK5.createDocument(A);
    if (B !== void 0) Q._address = B;
    return new eR2.Window(Q)
  };
  nK5.impl = eR2
})
// @from(Start 8187181, End 8202271)
CO2 = z((tQB, VO2) => {
  function tK5(A) {
    for (var B = 1; B < arguments.length; B++) {
      var Q = arguments[B];
      for (var I in Q)
        if (Q.hasOwnProperty(I)) A[I] = Q[I]
    }
    return A
  }

  function TAA(A, B) {
    return Array(B + 1).join(A)
  }

  function eK5(A) {
    return A.replace(/^\n*/, "")
  }

  function AH5(A) {
    var B = A.length;
    while (B > 0 && A[B - 1] === `
`) B--;
    return A.substring(0, B)
  }
  var BH5 = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];

  function PAA(A) {
    return SAA(A, BH5)
  }
  var GO2 = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];

  function ZO2(A) {
    return SAA(A, GO2)
  }

  function QH5(A) {
    return YO2(A, GO2)
  }
  var DO2 = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];

  function IH5(A) {
    return SAA(A, DO2)
  }

  function GH5(A) {
    return YO2(A, DO2)
  }

  function SAA(A, B) {
    return B.indexOf(A.nodeName) >= 0
  }

  function YO2(A, B) {
    return A.getElementsByTagName && B.some(function(Q) {
      return A.getElementsByTagName(Q).length
    })
  }
  var sZ = {};
  sZ.paragraph = {
    filter: "p",
    replacement: function(A) {
      return `

` + A + `

`
    }
  };
  sZ.lineBreak = {
    filter: "br",
    replacement: function(A, B, Q) {
      return Q.br + `
`
    }
  };
  sZ.heading = {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement: function(A, B, Q) {
      var I = Number(B.nodeName.charAt(1));
      if (Q.headingStyle === "setext" && I < 3) {
        var G = TAA(I === 1 ? "=" : "-", A.length);
        return `

` + A + `
` + G + `

`
      } else return `

` + TAA("#", I) + " " + A + `

`
    }
  };
  sZ.blockquote = {
    filter: "blockquote",
    replacement: function(A) {
      return A = A.replace(/^\n+|\n+$/g, ""), A = A.replace(/^/gm, "> "), `

` + A + `

`
    }
  };
  sZ.list = {
    filter: ["ul", "ol"],
    replacement: function(A, B) {
      var Q = B.parentNode;
      if (Q.nodeName === "LI" && Q.lastElementChild === B) return `
` + A;
      else return `

` + A + `

`
    }
  };
  sZ.listItem = {
    filter: "li",
    replacement: function(A, B, Q) {
      A = A.replace(/^\n+/, "").replace(/\n+$/, `
`).replace(/\n/gm, `
    `);
      var I = Q.bulletListMarker + "   ",
        G = B.parentNode;
      if (G.nodeName === "OL") {
        var Z = G.getAttribute("start"),
          D = Array.prototype.indexOf.call(G.children, B);
        I = (Z ? Number(Z) + D : D + 1) + ".  "
      }
      return I + A + (B.nextSibling && !/\n$/.test(A) ? `
` : "")
    }
  };
  sZ.indentedCodeBlock = {
    filter: function(A, B) {
      return B.codeBlockStyle === "indented" && A.nodeName === "PRE" && A.firstChild && A.firstChild.nodeName === "CODE"
    },
    replacement: function(A, B, Q) {
      return `

    ` + B.firstChild.textContent.replace(/\n/g, `
    `) + `

`
    }
  };
  sZ.fencedCodeBlock = {
    filter: function(A, B) {
      return B.codeBlockStyle === "fenced" && A.nodeName === "PRE" && A.firstChild && A.firstChild.nodeName === "CODE"
    },
    replacement: function(A, B, Q) {
      var I = B.firstChild.getAttribute("class") || "",
        G = (I.match(/language-(\S+)/) || [null, ""])[1],
        Z = B.firstChild.textContent,
        D = Q.fence.charAt(0),
        Y = 3,
        W = new RegExp("^" + D + "{3,}", "gm"),
        J;
      while (J = W.exec(Z))
        if (J[0].length >= Y) Y = J[0].length + 1;
      var F = TAA(D, Y);
      return `

` + F + G + `
` + Z.replace(/\n$/, "") + `
` + F + `

`
    }
  };
  sZ.horizontalRule = {
    filter: "hr",
    replacement: function(A, B, Q) {
      return `

` + Q.hr + `

`
    }
  };
  sZ.inlineLink = {
    filter: function(A, B) {
      return B.linkStyle === "inlined" && A.nodeName === "A" && A.getAttribute("href")
    },
    replacement: function(A, B) {
      var Q = B.getAttribute("href");
      if (Q) Q = Q.replace(/([()])/g, "\\$1");
      var I = gz1(B.getAttribute("title"));
      if (I) I = ' "' + I.replace(/"/g, "\\\"") + '"';
      return "[" + A + "](" + Q + I + ")"
    }
  };
  sZ.referenceLink = {
    filter: function(A, B) {
      return B.linkStyle === "referenced" && A.nodeName === "A" && A.getAttribute("href")
    },
    replacement: function(A, B, Q) {
      var I = B.getAttribute("href"),
        G = gz1(B.getAttribute("title"));
      if (G) G = ' "' + G + '"';
      var Z, D;
      switch (Q.linkReferenceStyle) {
        case "collapsed":
          Z = "[" + A + "][]", D = "[" + A + "]: " + I + G;
          break;
        case "shortcut":
          Z = "[" + A + "]", D = "[" + A + "]: " + I + G;
          break;
        default:
          var Y = this.references.length + 1;
          Z = "[" + A + "][" + Y + "]", D = "[" + Y + "]: " + I + G
      }
      return this.references.push(D), Z
    },
    references: [],
    append: function(A) {
      var B = "";
      if (this.references.length) B = `

` + this.references.join(`
`) + `

`, this.references = [];
      return B
    }
  };
  sZ.emphasis = {
    filter: ["em", "i"],
    replacement: function(A, B, Q) {
      if (!A.trim()) return "";
      return Q.emDelimiter + A + Q.emDelimiter
    }
  };
  sZ.strong = {
    filter: ["strong", "b"],
    replacement: function(A, B, Q) {
      if (!A.trim()) return "";
      return Q.strongDelimiter + A + Q.strongDelimiter
    }
  };
  sZ.code = {
    filter: function(A) {
      var B = A.previousSibling || A.nextSibling,
        Q = A.parentNode.nodeName === "PRE" && !B;
      return A.nodeName === "CODE" && !Q
    },
    replacement: function(A) {
      if (!A) return "";
      A = A.replace(/\r?\n|\r/g, " ");
      var B = /^`|^ .*?[^ ].* $|`$/.test(A) ? " " : "",
        Q = "`",
        I = A.match(/`+/gm) || [];
      while (I.indexOf(Q) !== -1) Q = Q + "`";
      return Q + B + A + B + Q
    }
  };
  sZ.image = {
    filter: "img",
    replacement: function(A, B) {
      var Q = gz1(B.getAttribute("alt")),
        I = B.getAttribute("src") || "",
        G = gz1(B.getAttribute("title")),
        Z = G ? ' "' + G + '"' : "";
      return I ? "![" + Q + "](" + I + Z + ")" : ""
    }
  };

  function gz1(A) {
    return A ? A.replace(/(\n+\s*)+/g, `
`) : ""
  }

  function WO2(A) {
    this.options = A, this._keep = [], this._remove = [], this.blankRule = {
      replacement: A.blankReplacement
    }, this.keepReplacement = A.keepReplacement, this.defaultRule = {
      replacement: A.defaultReplacement
    }, this.array = [];
    for (var B in A.rules) this.array.push(A.rules[B])
  }
  WO2.prototype = {
    add: function(A, B) {
      this.array.unshift(B)
    },
    keep: function(A) {
      this._keep.unshift({
        filter: A,
        replacement: this.keepReplacement
      })
    },
    remove: function(A) {
      this._remove.unshift({
        filter: A,
        replacement: function() {
          return ""
        }
      })
    },
    forNode: function(A) {
      if (A.isBlank) return this.blankRule;
      var B;
      if (B = LAA(this.array, A, this.options)) return B;
      if (B = LAA(this._keep, A, this.options)) return B;
      if (B = LAA(this._remove, A, this.options)) return B;
      return this.defaultRule
    },
    forEach: function(A) {
      for (var B = 0; B < this.array.length; B++) A(this.array[B], B)
    }
  };

  function LAA(A, B, Q) {
    for (var I = 0; I < A.length; I++) {
      var G = A[I];
      if (ZH5(G, B, Q)) return G
    }
    return
  }

  function ZH5(A, B, Q) {
    var I = A.filter;
    if (typeof I === "string") {
      if (I === B.nodeName.toLowerCase()) return !0
    } else if (Array.isArray(I)) {
      if (I.indexOf(B.nodeName.toLowerCase()) > -1) return !0
    } else if (typeof I === "function") {
      if (I.call(A, B, Q)) return !0
    } else throw new TypeError("`filter` needs to be a string, array, or function")
  }

  function DH5(A) {
    var {
      element: B,
      isBlock: Q,
      isVoid: I
    } = A, G = A.isPre || function(X) {
      return X.nodeName === "PRE"
    };
    if (!B.firstChild || G(B)) return;
    var Z = null,
      D = !1,
      Y = null,
      W = QO2(Y, B, G);
    while (W !== B) {
      if (W.nodeType === 3 || W.nodeType === 4) {
        var J = W.data.replace(/[ \r\n\t]+/g, " ");
        if ((!Z || / $/.test(Z.data)) && !D && J[0] === " ") J = J.substr(1);
        if (!J) {
          W = RAA(W);
          continue
        }
        W.data = J, Z = W
      } else if (W.nodeType === 1) {
        if (Q(W) || W.nodeName === "BR") {
          if (Z) Z.data = Z.data.replace(/ $/, "");
          Z = null, D = !1
        } else if (I(W) || G(W)) Z = null, D = !0;
        else if (Z) D = !1
      } else {
        W = RAA(W);
        continue
      }
      var F = QO2(Y, W, G);
      Y = W, W = F
    }
    if (Z) {
      if (Z.data = Z.data.replace(/ $/, ""), !Z.data) RAA(Z)
    }
  }

  function RAA(A) {
    var B = A.nextSibling || A.parentNode;
    return A.parentNode.removeChild(A), B
  }

  function QO2(A, B, Q) {
    if (A && A.parentNode === B || Q(B)) return B.nextSibling || B.parentNode;
    return B.firstChild || B.nextSibling || B.parentNode
  }
  var JO2 = typeof window !== "undefined" ? window : {};

  function YH5() {
    var A = JO2.DOMParser,
      B = !1;
    try {
      if (new A().parseFromString("", "text/html")) B = !0
    } catch (Q) {}
    return B
  }

  function WH5() {
    var A = function() {};
    {
      var B = BO2();
      A.prototype.parseFromString = function(Q) {
        return B.createDocument(Q)
      }
    }
    return A
  }
  var JH5 = YH5() ? JO2.DOMParser : WH5();

  function FH5(A, B) {
    var Q;
    if (typeof A === "string") {
      var I = XH5().parseFromString('<x-turndown id="turndown-root">' + A + "</x-turndown>", "text/html");
      Q = I.getElementById("turndown-root")
    } else Q = A.cloneNode(!0);
    return DH5({
      element: Q,
      isBlock: PAA,
      isVoid: ZO2,
      isPre: B.preformattedCode ? VH5 : null
    }), Q
  }
  var OAA;

  function XH5() {
    return OAA = OAA || new JH5, OAA
  }

  function VH5(A) {
    return A.nodeName === "PRE" || A.nodeName === "CODE"
  }

  function CH5(A, B) {
    return A.isBlock = PAA(A), A.isCode = A.nodeName === "CODE" || A.parentNode.isCode, A.isBlank = KH5(A), A.flankingWhitespace = HH5(A, B), A
  }

  function KH5(A) {
    return !ZO2(A) && !IH5(A) && /^\s*$/i.test(A.textContent) && !QH5(A) && !GH5(A)
  }

  function HH5(A, B) {
    if (A.isBlock || B.preformattedCode && A.isCode) return {
      leading: "",
      trailing: ""
    };
    var Q = zH5(A.textContent);
    if (Q.leadingAscii && IO2("left", A, B)) Q.leading = Q.leadingNonAscii;
    if (Q.trailingAscii && IO2("right", A, B)) Q.trailing = Q.trailingNonAscii;
    return {
      leading: Q.leading,
      trailing: Q.trailing
    }
  }

  function zH5(A) {
    var B = A.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
    return {
      leading: B[1],
      leadingAscii: B[2],
      leadingNonAscii: B[3],
      trailing: B[4],
      trailingNonAscii: B[5],
      trailingAscii: B[6]
    }
  }

  function IO2(A, B, Q) {
    var I, G, Z;
    if (A === "left") I = B.previousSibling, G = / $/;
    else I = B.nextSibling, G = /^ /;
    if (I) {
      if (I.nodeType === 3) Z = G.test(I.nodeValue);
      else if (Q.preformattedCode && I.nodeName === "CODE") Z = !1;
      else if (I.nodeType === 1 && !PAA(I)) Z = G.test(I.textContent)
    }
    return Z
  }
  var wH5 = Array.prototype.reduce,
    EH5 = [
      [/\\/g, "\\\\"],
      [/\*/g, "\\*"],
      [/^-/g, "\\-"],
      [/^\+ /g, "\\+ "],
      [/^(=+)/g, "\\$1"],
      [/^(#{1,6}) /g, "\\$1 "],
      [/`/g, "\\`"],
      [/^~~~/g, "\\~~~"],
      [/\[/g, "\\["],
      [/\]/g, "\\]"],
      [/^>/g, "\\>"],
      [/_/g, "\\_"],
      [/^(\d+)\. /g, "$1\\. "]
    ];

  function hz1(A) {
    if (!(this instanceof hz1)) return new hz1(A);
    var B = {
      rules: sZ,
      headingStyle: "setext",
      hr: "* * *",
      bulletListMarker: "*",
      codeBlockStyle: "indented",
      fence: "```",
      emDelimiter: "_",
      strongDelimiter: "**",
      linkStyle: "inlined",
      linkReferenceStyle: "full",
      br: "  ",
      preformattedCode: !1,
      blankReplacement: function(Q, I) {
        return I.isBlock ? `

` : ""
      },
      keepReplacement: function(Q, I) {
        return I.isBlock ? `

` + I.outerHTML + `

` : I.outerHTML
      },
      defaultReplacement: function(Q, I) {
        return I.isBlock ? `

` + Q + `

` : Q
      }
    };
    this.options = tK5({}, B, A), this.rules = new WO2(this.options)
  }
  hz1.prototype = {
    turndown: function(A) {
      if (!$H5(A)) throw new TypeError(A + " is not a string, or an element/document/fragment node.");
      if (A === "") return "";
      var B = FO2.call(this, new FH5(A, this.options));
      return UH5.call(this, B)
    },
    use: function(A) {
      if (Array.isArray(A))
        for (var B = 0; B < A.length; B++) this.use(A[B]);
      else if (typeof A === "function") A(this);
      else throw new TypeError("plugin must be a Function or an Array of Functions");
      return this
    },
    addRule: function(A, B) {
      return this.rules.add(A, B), this
    },
    keep: function(A) {
      return this.rules.keep(A), this
    },
    remove: function(A) {
      return this.rules.remove(A), this
    },
    escape: function(A) {
      return EH5.reduce(function(B, Q) {
        return B.replace(Q[0], Q[1])
      }, A)
    }
  };

  function FO2(A) {
    var B = this;
    return wH5.call(A.childNodes, function(Q, I) {
      I = new CH5(I, B.options);
      var G = "";
      if (I.nodeType === 3) G = I.isCode ? I.nodeValue : B.escape(I.nodeValue);
      else if (I.nodeType === 1) G = NH5.call(B, I);
      return XO2(Q, G)
    }, "")
  }

  function UH5(A) {
    var B = this;
    return this.rules.forEach(function(Q) {
      if (typeof Q.append === "function") A = XO2(A, Q.append(B.options))
    }), A.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "")
  }

  function NH5(A) {
    var B = this.rules.forNode(A),
      Q = FO2.call(this, A),
      I = A.flankingWhitespace;
    if (I.leading || I.trailing) Q = Q.trim();
    return I.leading + B.replacement(Q, A, this.options) + I.trailing
  }

  function XO2(A, B) {
    var Q = AH5(A),
      I = eK5(B),
      G = Math.max(A.length - Q.length, B.length - I.length),
      Z = `

`.substring(0, G);
    return Q + Z + I
  }

  function $H5(A) {
    return A != null && (typeof A === "string" || A.nodeType && (A.nodeType === 1 || A.nodeType === 9 || A.nodeType === 11))
  }
  VO2.exports = hz1
})
// @from(Start 8202277, End 8202618)
eO2 = z((JGB, tO2) => {
  tO2.exports = ({
    onlyFirst: A = !1
  } = {}) => {
    let B = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
    return new RegExp(B, A ? void 0 : "g")
  }
})
// @from(Start 8202624, End 8202741)
BT2 = z((FGB, AT2) => {
  var Tz5 = eO2();
  AT2.exports = (A) => typeof A === "string" ? A.replace(Tz5(), "") : A
})
// @from(Start 8202747, End 8203356)
IT2 = z((XGB, cAA) => {
  var QT2 = (A) => {
    if (Number.isNaN(A)) return !1;
    if (A >= 4352 && (A <= 4447 || A === 9001 || A === 9002 || 11904 <= A && A <= 12871 && A !== 12351 || 12880 <= A && A <= 19903 || 19968 <= A && A <= 42182 || 43360 <= A && A <= 43388 || 44032 <= A && A <= 55203 || 63744 <= A && A <= 64255 || 65040 <= A && A <= 65049 || 65072 <= A && A <= 65131 || 65281 <= A && A <= 65376 || 65504 <= A && A <= 65510 || 110592 <= A && A <= 110593 || 127488 <= A && A <= 127569 || 131072 <= A && A <= 262141)) return !0;
    return !1
  };
  cAA.exports = QT2;
  cAA.exports.default = QT2
})
// @from(Start 8203362, End 8213632)
ZT2 = z((VGB, GT2) => {
  GT2.exports = function() {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g
  }
})
// @from(Start 8213638, End 8214207)
iAA = z((CGB, lAA) => {
  var Pz5 = BT2(),
    Sz5 = IT2(),
    _z5 = ZT2(),
    DT2 = (A) => {
      if (typeof A !== "string" || A.length === 0) return 0;
      if (A = Pz5(A), A.length === 0) return 0;
      A = A.replace(_z5(), "  ");
      let B = 0;
      for (let Q = 0; Q < A.length; Q++) {
        let I = A.codePointAt(Q);
        if (I <= 31 || I >= 127 && I <= 159) continue;
        if (I >= 768 && I <= 879) continue;
        if (I > 65535) Q++;
        B += Sz5(I) ? 2 : 1
      }
      return B
    };
  lAA.exports = DT2;
  lAA.exports.default = DT2
})
// @from(Start 8214213, End 8214618)
Ww1 = z((XYB, tT2) => {
  var G0A = [],
    oT2 = 0,
    oZ = (A, B) => {
      if (oT2 >= B) G0A.push(A)
    };
  oZ.WARN = 1;
  oZ.INFO = 2;
  oZ.DEBUG = 3;
  oZ.reset = () => {
    G0A = []
  };
  oZ.setDebugLevel = (A) => {
    oT2 = A
  };
  oZ.warn = (A) => oZ(A, oZ.WARN);
  oZ.info = (A) => oZ(A, oZ.INFO);
  oZ.debug = (A) => oZ(A, oZ.DEBUG);
  oZ.debugMessages = () => G0A;
  tT2.exports = oZ
})
// @from(Start 8214624, End 8220189)
Z0A = z((VYB, QP2) => {
  var eT2 = iAA();

  function Jw1(A) {
    return A ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g
  }

  function OE(A) {
    let B = Jw1();
    return ("" + A).replace(B, "").split(`
`).reduce(function(G, Z) {
      return eT2(Z) > G ? eT2(Z) : G
    }, 0)
  }

  function dA1(A, B) {
    return Array(B + 1).join(A)
  }

  function Jw5(A, B, Q, I) {
    let G = OE(A);
    if (B + 1 >= G) {
      let Z = B - G;
      switch (I) {
        case "right": {
          A = dA1(Q, Z) + A;
          break
        }
        case "center": {
          let D = Math.ceil(Z / 2),
            Y = Z - D;
          A = dA1(Q, Y) + A + dA1(Q, D);
          break
        }
        default: {
          A = A + dA1(Q, Z);
          break
        }
      }
    }
    return A
  }
  var Qp = {};

  function uA1(A, B, Q) {
    B = "\x1B[" + B + "m", Q = "\x1B[" + Q + "m", Qp[B] = {
      set: A,
      to: !0
    }, Qp[Q] = {
      set: A,
      to: !1
    }, Qp[A] = {
      on: B,
      off: Q
    }
  }
  uA1("bold", 1, 22);
  uA1("italics", 3, 23);
  uA1("underline", 4, 24);
  uA1("inverse", 7, 27);
  uA1("strikethrough", 9, 29);

  function AP2(A, B) {
    let Q = B[1] ? parseInt(B[1].split(";")[0]) : 0;
    if (Q >= 30 && Q <= 39 || Q >= 90 && Q <= 97) {
      A.lastForegroundAdded = B[0];
      return
    }
    if (Q >= 40 && Q <= 49 || Q >= 100 && Q <= 107) {
      A.lastBackgroundAdded = B[0];
      return
    }
    if (Q === 0) {
      for (let G in A)
        if (Object.prototype.hasOwnProperty.call(A, G)) delete A[G];
      return
    }
    let I = Qp[B[0]];
    if (I) A[I.set] = I.to
  }

  function Fw5(A) {
    let B = Jw1(!0),
      Q = B.exec(A),
      I = {};
    while (Q !== null) AP2(I, Q), Q = B.exec(A);
    return I
  }

  function BP2(A, B) {
    let {
      lastBackgroundAdded: Q,
      lastForegroundAdded: I
    } = A;
    if (delete A.lastBackgroundAdded, delete A.lastForegroundAdded, Object.keys(A).forEach(function(G) {
        if (A[G]) B += Qp[G].off
      }), Q && Q != "\x1B[49m") B += "\x1B[49m";
    if (I && I != "\x1B[39m") B += "\x1B[39m";
    return B
  }

  function Xw5(A, B) {
    let {
      lastBackgroundAdded: Q,
      lastForegroundAdded: I
    } = A;
    if (delete A.lastBackgroundAdded, delete A.lastForegroundAdded, Object.keys(A).forEach(function(G) {
        if (A[G]) B = Qp[G].on + B
      }), Q && Q != "\x1B[49m") B = Q + B;
    if (I && I != "\x1B[39m") B = I + B;
    return B
  }

  function Vw5(A, B) {
    if (A.length === OE(A)) return A.substr(0, B);
    while (OE(A) > B) A = A.slice(0, -1);
    return A
  }

  function Cw5(A, B) {
    let Q = Jw1(!0),
      I = A.split(Jw1()),
      G = 0,
      Z = 0,
      D = "",
      Y, W = {};
    while (Z < B) {
      Y = Q.exec(A);
      let J = I[G];
      if (G++, Z + OE(J) > B) J = Vw5(J, B - Z);
      if (D += J, Z += OE(J), Z < B) {
        if (!Y) break;
        D += Y[0], AP2(W, Y)
      }
    }
    return BP2(W, D)
  }

  function Kw5(A, B, Q) {
    if (Q = Q || "…", OE(A) <= B) return A;
    B -= OE(Q);
    let G = Cw5(A, B);
    G += Q;
    let Z = "\x1B]8;;\x07";
    if (A.includes(Z) && !G.includes(Z)) G += Z;
    return G
  }

  function Hw5() {
    return {
      chars: {
        top: "─",
        "top-mid": "┬",
        "top-left": "┌",
        "top-right": "┐",
        bottom: "─",
        "bottom-mid": "┴",
        "bottom-left": "└",
        "bottom-right": "┘",
        left: "│",
        "left-mid": "├",
        mid: "─",
        "mid-mid": "┼",
        right: "│",
        "right-mid": "┤",
        middle: "│"
      },
      truncate: "…",
      colWidths: [],
      rowHeights: [],
      colAligns: [],
      rowAligns: [],
      style: {
        "padding-left": 1,
        "padding-right": 1,
        head: ["red"],
        border: ["grey"],
        compact: !1
      },
      head: []
    }
  }

  function zw5(A, B) {
    A = A || {}, B = B || Hw5();
    let Q = Object.assign({}, B, A);
    return Q.chars = Object.assign({}, B.chars, A.chars), Q.style = Object.assign({}, B.style, A.style), Q
  }

  function ww5(A, B) {
    let Q = [],
      I = B.split(/(\s+)/g),
      G = [],
      Z = 0,
      D;
    for (let Y = 0; Y < I.length; Y += 2) {
      let W = I[Y],
        J = Z + OE(W);
      if (Z > 0 && D) J += D.length;
      if (J > A) {
        if (Z !== 0) Q.push(G.join(""));
        G = [W], Z = OE(W)
      } else G.push(D || "", W), Z = J;
      D = I[Y + 1]
    }
    if (Z) Q.push(G.join(""));
    return Q
  }

  function Ew5(A, B) {
    let Q = [],
      I = "";

    function G(D, Y) {
      if (I.length && Y) I += Y;
      I += D;
      while (I.length > A) Q.push(I.slice(0, A)), I = I.slice(A)
    }
    let Z = B.split(/(\s+)/g);
    for (let D = 0; D < Z.length; D += 2) G(Z[D], D && Z[D - 1]);
    if (I.length) Q.push(I);
    return Q
  }

  function Uw5(A, B, Q = !0) {
    let I = [];
    B = B.split(`
`);
    let G = Q ? ww5 : Ew5;
    for (let Z = 0; Z < B.length; Z++) I.push.apply(I, G(A, B[Z]));
    return I
  }

  function Nw5(A) {
    let B = {},
      Q = [];
    for (let I = 0; I < A.length; I++) {
      let G = Xw5(B, A[I]);
      B = Fw5(G);
      let Z = Object.assign({}, B);
      Q.push(BP2(Z, G))
    }
    return Q
  }

  function $w5(A, B) {
    return ["\x1B]", "8", ";", ";", A || B, "\x07", B, "\x1B]", "8", ";", ";", "\x07"].join("")
  }
  QP2.exports = {
    strlen: OE,
    repeat: dA1,
    pad: Jw5,
    truncate: Kw5,
    mergeOptions: zw5,
    wordWrap: Uw5,
    colorizeLines: Nw5,
    hyperlink: $w5
  }
})
// @from(Start 8220195, End 8221619)
DP2 = z((CYB, ZP2) => {
  var GP2 = {};
  ZP2.exports = GP2;
  var IP2 = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49],
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49]
  };
  Object.keys(IP2).forEach(function(A) {
    var B = IP2[A],
      Q = GP2[A] = [];
    Q.open = "\x1B[" + B[0] + "m", Q.close = "\x1B[" + B[1] + "m"
  })
})
// @from(Start 8221625, End 8221860)
WP2 = z((KYB, YP2) => {
  YP2.exports = function(A, B) {
    B = B || process.argv;
    var Q = B.indexOf("--"),
      I = /^-{1,2}/.test(A) ? "" : "--",
      G = B.indexOf(I + A);
    return G !== -1 && (Q === -1 ? !0 : G < Q)
  }
})
// @from(Start 8221866, End 8223875)
FP2 = z((HYB, JP2) => {
  var qw5 = Z1("os"),
    aK = WP2(),
    rD = process.env,
    Ip = void 0;
  if (aK("no-color") || aK("no-colors") || aK("color=false")) Ip = !1;
  else if (aK("color") || aK("colors") || aK("color=true") || aK("color=always")) Ip = !0;
  if ("FORCE_COLOR" in rD) Ip = rD.FORCE_COLOR.length === 0 || parseInt(rD.FORCE_COLOR, 10) !== 0;

  function Mw5(A) {
    if (A === 0) return !1;
    return {
      level: A,
      hasBasic: !0,
      has256: A >= 2,
      has16m: A >= 3
    }
  }

  function Lw5(A) {
    if (Ip === !1) return 0;
    if (aK("color=16m") || aK("color=full") || aK("color=truecolor")) return 3;
    if (aK("color=256")) return 2;
    if (A && !A.isTTY && Ip !== !0) return 0;
    var B = Ip ? 1 : 0;
    if (process.platform === "win32") {
      var Q = qw5.release().split(".");
      if (Number(process.versions.node.split(".")[0]) >= 8 && Number(Q[0]) >= 10 && Number(Q[2]) >= 10586) return Number(Q[2]) >= 14931 ? 3 : 2;
      return 1
    }
    if ("CI" in rD) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(G) {
          return G in rD
        }) || rD.CI_NAME === "codeship") return 1;
      return B
    }
    if ("TEAMCITY_VERSION" in rD) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(rD.TEAMCITY_VERSION) ? 1 : 0;
    if ("TERM_PROGRAM" in rD) {
      var I = parseInt((rD.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (rD.TERM_PROGRAM) {
        case "iTerm.app":
          return I >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2
      }
    }
    if (/-256(color)?$/i.test(rD.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(rD.TERM)) return 1;
    if ("COLORTERM" in rD) return 1;
    if (rD.TERM === "dumb") return B;
    return B
  }

  function D0A(A) {
    var B = Lw5(A);
    return Mw5(B)
  }
  JP2.exports = {
    supportsColor: D0A,
    stdout: D0A(process.stdout),
    stderr: D0A(process.stderr)
  }
})
// @from(Start 8223881, End 8225041)
VP2 = z((zYB, XP2) => {
  XP2.exports = function A(B, Q) {
    var I = "";
    B = B || "Run the trap, drop the bass", B = B.split("");
    var G = {
      a: ["@", "Ą", "Ⱥ", "Ʌ", "Δ", "Λ", "Д"],
      b: ["ß", "Ɓ", "Ƀ", "ɮ", "β", "฿"],
      c: ["©", "Ȼ", "Ͼ"],
      d: ["Ð", "Ɗ", "Ԁ", "ԁ", "Ԃ", "ԃ"],
      e: ["Ë", "ĕ", "Ǝ", "ɘ", "Σ", "ξ", "Ҽ", "੬"],
      f: ["Ӻ"],
      g: ["ɢ"],
      h: ["Ħ", "ƕ", "Ң", "Һ", "Ӈ", "Ԋ"],
      i: ["༏"],
      j: ["Ĵ"],
      k: ["ĸ", "Ҡ", "Ӄ", "Ԟ"],
      l: ["Ĺ"],
      m: ["ʍ", "Ӎ", "ӎ", "Ԡ", "ԡ", "൩"],
      n: ["Ñ", "ŋ", "Ɲ", "Ͷ", "Π", "Ҋ"],
      o: ["Ø", "õ", "ø", "Ǿ", "ʘ", "Ѻ", "ם", "۝", "๏"],
      p: ["Ƿ", "Ҏ"],
      q: ["্"],
      r: ["®", "Ʀ", "Ȑ", "Ɍ", "ʀ", "Я"],
      s: ["§", "Ϟ", "ϟ", "Ϩ"],
      t: ["Ł", "Ŧ", "ͳ"],
      u: ["Ʊ", "Ս"],
      v: ["ט"],
      w: ["Ш", "Ѡ", "Ѽ", "൰"],
      x: ["Ҳ", "Ӿ", "Ӽ", "ӽ"],
      y: ["¥", "Ұ", "Ӌ"],
      z: ["Ƶ", "ɀ"]
    };
    return B.forEach(function(Z) {
      Z = Z.toLowerCase();
      var D = G[Z] || [" "],
        Y = Math.floor(Math.random() * D.length);
      if (typeof G[Z] !== "undefined") I += G[Z][Y];
      else I += Z
    }), I
  }
})
// @from(Start 8225047, End 8227045)
KP2 = z((wYB, CP2) => {
  CP2.exports = function A(B, Q) {
    B = B || "   he is here   ";
    var I = {
        up: ["̍", "̎", "̄", "̅", "̿", "̑", "̆", "̐", "͒", "͗", "͑", "̇", "̈", "̊", "͂", "̓", "̈", "͊", "͋", "͌", "̃", "̂", "̌", "͐", "̀", "́", "̋", "̏", "̒", "̓", "̔", "̽", "̉", "ͣ", "ͤ", "ͥ", "ͦ", "ͧ", "ͨ", "ͩ", "ͪ", "ͫ", "ͬ", "ͭ", "ͮ", "ͯ", "̾", "͛", "͆", "̚"],
        down: ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̤", "̥", "̦", "̩", "̪", "̫", "̬", "̭", "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ", "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "̣"],
        mid: ["̕", "̛", "̀", "́", "͘", "̡", "̢", "̧", "̨", "̴", "̵", "̶", "͜", "͝", "͞", "͟", "͠", "͢", "̸", "̷", "͡", " ҉"]
      },
      G = [].concat(I.up, I.down, I.mid);

    function Z(W) {
      var J = Math.floor(Math.random() * W);
      return J
    }

    function D(W) {
      var J = !1;
      return G.filter(function(F) {
        J = F === W
      }), J
    }

    function Y(W, J) {
      var F = "",
        X, V;
      J = J || {}, J.up = typeof J.up !== "undefined" ? J.up : !0, J.mid = typeof J.mid !== "undefined" ? J.mid : !0, J.down = typeof J.down !== "undefined" ? J.down : !0, J.size = typeof J.size !== "undefined" ? J.size : "maxi", W = W.split("");
      for (V in W) {
        if (D(V)) continue;
        switch (F = F + W[V], X = {
            up: 0,
            down: 0,
            mid: 0
          }, J.size) {
          case "mini":
            X.up = Z(8), X.mid = Z(2), X.down = Z(8);
            break;
          case "maxi":
            X.up = Z(16) + 3, X.mid = Z(4) + 1, X.down = Z(64) + 3;
            break;
          default:
            X.up = Z(8) + 1, X.mid = Z(6) / 2, X.down = Z(8) + 1;
            break
        }
        var C = ["up", "mid", "down"];
        for (var K in C) {
          var E = C[K];
          for (var N = 0; N <= X[E]; N++)
            if (J[E]) F = F + I[E][Z(I[E].length)]
        }
      }
      return F
    }
    return Y(B, Q)
  }
})
// @from(Start 8227051, End 8227341)
zP2 = z((EYB, HP2) => {
  HP2.exports = function(A) {
    return function(B, Q, I) {
      if (B === " ") return B;
      switch (Q % 3) {
        case 0:
          return A.red(B);
        case 1:
          return A.white(B);
        case 2:
          return A.blue(B)
      }
    }
  }
})
// @from(Start 8227347, End 8227488)
EP2 = z((UYB, wP2) => {
  wP2.exports = function(A) {
    return function(B, Q, I) {
      return Q % 2 === 0 ? B : A.inverse(B)
    }
  }
})
// @from(Start 8227494, End 8227723)
NP2 = z((NYB, UP2) => {
  UP2.exports = function(A) {
    var B = ["red", "yellow", "green", "blue", "magenta"];
    return function(Q, I, G) {
      if (Q === " ") return Q;
      else return A[B[I++ % B.length]](Q)
    }
  }
})
// @from(Start 8227729, End 8228119)
qP2 = z(($YB, $P2) => {
  $P2.exports = function(A) {
    var B = ["underline", "inverse", "grey", "yellow", "red", "green", "blue", "white", "cyan", "magenta", "brightYellow", "brightRed", "brightGreen", "brightBlue", "brightWhite", "brightCyan", "brightMagenta"];
    return function(Q, I, G) {
      return Q === " " ? Q : A[B[Math.round(Math.random() * (B.length - 2))]](Q)
    }
  }
})
// @from(Start 8228125, End 8231343)
TP2 = z((MYB, OP2) => {
  var T6 = {};
  OP2.exports = T6;
  T6.themes = {};
  var Rw5 = Z1("util"),
    ky = T6.styles = DP2(),
    MP2 = Object.defineProperties,
    Ow5 = new RegExp(/[\r\n]+/g);
  T6.supportsColor = FP2().supportsColor;
  if (typeof T6.enabled === "undefined") T6.enabled = T6.supportsColor() !== !1;
  T6.enable = function() {
    T6.enabled = !0
  };
  T6.disable = function() {
    T6.enabled = !1
  };
  T6.stripColors = T6.strip = function(A) {
    return ("" + A).replace(/\x1B\[\d+m/g, "")
  };
  var qYB = T6.stylize = function A(B, Q) {
      if (!T6.enabled) return B + "";
      var I = ky[Q];
      if (!I && Q in T6) return T6[Q](B);
      return I.open + B + I.close
    },
    Tw5 = /[|\\{}()[\]^$+*?.]/g,
    Pw5 = function(A) {
      if (typeof A !== "string") throw new TypeError("Expected a string");
      return A.replace(Tw5, "\\$&")
    };

  function LP2(A) {
    var B = function Q() {
      return _w5.apply(Q, arguments)
    };
    return B._styles = A, B.__proto__ = Sw5, B
  }
  var RP2 = function() {
      var A = {};
      return ky.grey = ky.gray, Object.keys(ky).forEach(function(B) {
        ky[B].closeRe = new RegExp(Pw5(ky[B].close), "g"), A[B] = {
          get: function() {
            return LP2(this._styles.concat(B))
          }
        }
      }), A
    }(),
    Sw5 = MP2(function A() {}, RP2);

  function _w5() {
    var A = Array.prototype.slice.call(arguments),
      B = A.map(function(D) {
        if (D != null && D.constructor === String) return D;
        else return Rw5.inspect(D)
      }).join(" ");
    if (!T6.enabled || !B) return B;
    var Q = B.indexOf(`
`) != -1,
      I = this._styles,
      G = I.length;
    while (G--) {
      var Z = ky[I[G]];
      if (B = Z.open + B.replace(Z.closeRe, Z.open) + Z.close, Q) B = B.replace(Ow5, function(D) {
        return Z.close + D + Z.open
      })
    }
    return B
  }
  T6.setTheme = function(A) {
    if (typeof A === "string") {
      console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
      return
    }
    for (var B in A)(function(Q) {
      T6[Q] = function(I) {
        if (typeof A[Q] === "object") {
          var G = I;
          for (var Z in A[Q]) G = T6[A[Q][Z]](G);
          return G
        }
        return T6[A[Q]](I)
      }
    })(B)
  };

  function jw5() {
    var A = {};
    return Object.keys(RP2).forEach(function(B) {
      A[B] = {
        get: function() {
          return LP2([B])
        }
      }
    }), A
  }
  var yw5 = function A(B, Q) {
    var I = Q.split("");
    return I = I.map(B), I.join("")
  };
  T6.trap = VP2();
  T6.zalgo = KP2();
  T6.maps = {};
  T6.maps.america = zP2()(T6);
  T6.maps.zebra = EP2()(T6);
  T6.maps.rainbow = NP2()(T6);
  T6.maps.random = qP2()(T6);
  for (Y0A in T6.maps)(function(A) {
    T6[A] = function(B) {
      return yw5(T6.maps[A], B)
    }
  })(Y0A);
  var Y0A;
  MP2(T6, jw5())
})
// @from(Start 8231349, End 8231414)
SP2 = z((LYB, PP2) => {
  var kw5 = TP2();
  PP2.exports = kw5
})
// @from(Start 8231420, End 8239339)
kP2 = z((RYB, Vw1) => {
  var {
    info: xw5,
    debug: yP2
  } = Ww1(), GF = Z0A();
  class pA1 {
    constructor(A) {
      this.setOptions(A), this.x = null, this.y = null
    }
    setOptions(A) {
      if (["boolean", "number", "bigint", "string"].indexOf(typeof A) !== -1) A = {
        content: "" + A
      };
      A = A || {}, this.options = A;
      let B = A.content;
      if (["boolean", "number", "bigint", "string"].indexOf(typeof B) !== -1) this.content = String(B);
      else if (!B) this.content = this.options.href || "";
      else throw new Error("Content needs to be a primitive, got: " + typeof B);
      if (this.colSpan = A.colSpan || 1, this.rowSpan = A.rowSpan || 1, this.options.href) Object.defineProperty(this, "href", {
        get() {
          return this.options.href
        }
      })
    }
    mergeTableOptions(A, B) {
      this.cells = B;
      let Q = this.options.chars || {},
        I = A.chars,
        G = this.chars = {};
      vw5.forEach(function(Y) {
        W0A(Q, I, Y, G)
      }), this.truncate = this.options.truncate || A.truncate;
      let Z = this.options.style = this.options.style || {},
        D = A.style;
      W0A(Z, D, "padding-left", this), W0A(Z, D, "padding-right", this), this.head = Z.head || D.head, this.border = Z.border || D.border, this.fixedWidth = A.colWidths[this.x], this.lines = this.computeLines(A), this.desiredWidth = GF.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length
    }
    computeLines(A) {
      let B = A.wordWrap || A.textWrap,
        {
          wordWrap: Q = B
        } = this.options;
      if (this.fixedWidth && Q) {
        if (this.fixedWidth -= this.paddingLeft + this.paddingRight, this.colSpan) {
          let Z = 1;
          while (Z < this.colSpan) this.fixedWidth += A.colWidths[this.x + Z], Z++
        }
        let {
          wrapOnWordBoundary: I = !0
        } = A, {
          wrapOnWordBoundary: G = I
        } = this.options;
        return this.wrapLines(GF.wordWrap(this.fixedWidth, this.content, G))
      }
      return this.wrapLines(this.content.split(`
`))
    }
    wrapLines(A) {
      let B = GF.colorizeLines(A);
      if (this.href) return B.map((Q) => GF.hyperlink(this.href, Q));
      return B
    }
    init(A) {
      let B = this.x,
        Q = this.y;
      this.widths = A.colWidths.slice(B, B + this.colSpan), this.heights = A.rowHeights.slice(Q, Q + this.rowSpan), this.width = this.widths.reduce(jP2, -1), this.height = this.heights.reduce(jP2, -1), this.hAlign = this.options.hAlign || A.colAligns[B], this.vAlign = this.options.vAlign || A.rowAligns[Q], this.drawRight = B + this.colSpan == A.colWidths.length
    }
    draw(A, B) {
      if (A == "top") return this.drawTop(this.drawRight);
      if (A == "bottom") return this.drawBottom(this.drawRight);
      let Q = GF.truncate(this.content, 10, this.truncate);
      if (!A) xw5(`${this.y}-${this.x}: ${this.rowSpan-A}x${this.colSpan} Cell ${Q}`);
      let I = Math.max(this.height - this.lines.length, 0),
        G;
      switch (this.vAlign) {
        case "center":
          G = Math.ceil(I / 2);
          break;
        case "bottom":
          G = I;
          break;
        default:
          G = 0
      }
      if (A < G || A >= G + this.lines.length) return this.drawEmpty(this.drawRight, B);
      let Z = this.lines.length > this.height && A + 1 >= this.height;
      return this.drawLine(A - G, this.drawRight, Z, B)
    }
    drawTop(A) {
      let B = [];
      if (this.cells) this.widths.forEach(function(Q, I) {
        B.push(this._topLeftChar(I)), B.push(GF.repeat(this.chars[this.y == 0 ? "top" : "mid"], Q))
      }, this);
      else B.push(this._topLeftChar(0)), B.push(GF.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width));
      if (A) B.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]);
      return this.wrapWithStyleColors("border", B.join(""))
    }
    _topLeftChar(A) {
      let B = this.x + A,
        Q;
      if (this.y == 0) Q = B == 0 ? "topLeft" : A == 0 ? "topMid" : "top";
      else if (B == 0) Q = "leftMid";
      else if (Q = A == 0 ? "midMid" : "bottomMid", this.cells) {
        if (this.cells[this.y - 1][B] instanceof pA1.ColSpanCell) Q = A == 0 ? "topMid" : "mid";
        if (A == 0) {
          let G = 1;
          while (this.cells[this.y][B - G] instanceof pA1.ColSpanCell) G++;
          if (this.cells[this.y][B - G] instanceof pA1.RowSpanCell) Q = "leftMid"
        }
      }
      return this.chars[Q]
    }
    wrapWithStyleColors(A, B) {
      if (this[A] && this[A].length) try {
        let Q = SP2();
        for (let I = this[A].length - 1; I >= 0; I--) Q = Q[this[A][I]];
        return Q(B)
      } catch (Q) {
        return B
      } else return B
    }
    drawLine(A, B, Q, I) {
      let G = this.chars[this.x == 0 ? "left" : "middle"];
      if (this.x && I && this.cells) {
        let X = this.cells[this.y + I][this.x - 1];
        while (X instanceof Fw1) X = this.cells[X.y][X.x - 1];
        if (!(X instanceof Xw1)) G = this.chars.rightMid
      }
      let Z = GF.repeat(" ", this.paddingLeft),
        D = B ? this.chars.right : "",
        Y = GF.repeat(" ", this.paddingRight),
        W = this.lines[A],
        J = this.width - (this.paddingLeft + this.paddingRight);
      if (Q) W += this.truncate || "…";
      let F = GF.truncate(W, J, this.truncate);
      return F = GF.pad(F, J, " ", this.hAlign), F = Z + F + Y, this.stylizeLine(G, F, D)
    }
    stylizeLine(A, B, Q) {
      if (A = this.wrapWithStyleColors("border", A), Q = this.wrapWithStyleColors("border", Q), this.y === 0) B = this.wrapWithStyleColors("head", B);
      return A + B + Q
    }
    drawBottom(A) {
      let B = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"],
        Q = GF.repeat(this.chars.bottom, this.width),
        I = A ? this.chars.bottomRight : "";
      return this.wrapWithStyleColors("border", B + Q + I)
    }
    drawEmpty(A, B) {
      let Q = this.chars[this.x == 0 ? "left" : "middle"];
      if (this.x && B && this.cells) {
        let Z = this.cells[this.y + B][this.x - 1];
        while (Z instanceof Fw1) Z = this.cells[Z.y][Z.x - 1];
        if (!(Z instanceof Xw1)) Q = this.chars.rightMid
      }
      let I = A ? this.chars.right : "",
        G = GF.repeat(" ", this.width);
      return this.stylizeLine(Q, G, I)
    }
  }
  class Fw1 {
    constructor() {}
    draw(A) {
      if (typeof A === "number") yP2(`${this.y}-${this.x}: 1x1 ColSpanCell`);
      return ""
    }
    init() {}
    mergeTableOptions() {}
  }
  class Xw1 {
    constructor(A) {
      this.originalCell = A
    }
    init(A) {
      let B = this.y,
        Q = this.originalCell.y;
      this.cellOffset = B - Q, this.offset = fw5(A.rowHeights, Q, this.cellOffset)
    }
    draw(A) {
      if (A == "top") return this.originalCell.draw(this.offset, this.cellOffset);
      if (A == "bottom") return this.originalCell.draw("bottom");
      return yP2(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + A)
    }
    mergeTableOptions() {}
  }

  function _P2(...A) {
    return A.filter((B) => B !== void 0 && B !== null).shift()
  }

  function W0A(A, B, Q, I) {
    let G = Q.split("-");
    if (G.length > 1) G[1] = G[1].charAt(0).toUpperCase() + G[1].substr(1), G = G.join(""), I[G] = _P2(A[G], A[Q], B[G], B[Q]);
    else I[Q] = _P2(A[Q], B[Q])
  }

  function fw5(A, B, Q) {
    let I = A[B];
    for (let G = 1; G < Q; G++) I += 1 + A[B + G];
    return I
  }

  function jP2(A, B) {
    return A + B + 1
  }
  var vw5 = ["top", "top-mid", "top-left", "top-right", "bottom", "bottom-mid", "bottom-left", "bottom-right", "left", "left-mid", "mid", "mid-mid", "right", "right-mid", "middle"];
  Vw1.exports = pA1;
  Vw1.exports.ColSpanCell = Fw1;
  Vw1.exports.RowSpanCell = Xw1
})
// @from(Start 8239345, End 8244270)
vP2 = z((OYB, fP2) => {
  var {
    warn: bw5,
    debug: gw5
  } = Ww1(), J0A = kP2(), {
    ColSpanCell: hw5,
    RowSpanCell: mw5
  } = J0A;
  (function() {
    function A(C, K) {
      if (C[K] > 0) return A(C, K + 1);
      return K
    }

    function B(C) {
      let K = {};
      C.forEach(function(E, N) {
        let q = 0;
        E.forEach(function(O) {
          O.y = N, O.x = N ? A(K, q) : q;
          let R = O.rowSpan || 1,
            T = O.colSpan || 1;
          if (R > 1)
            for (let L = 0; L < T; L++) K[O.x + L] = R;
          q = O.x + T
        }), Object.keys(K).forEach((O) => {
          if (K[O]--, K[O] < 1) delete K[O]
        })
      })
    }

    function Q(C) {
      let K = 0;
      return C.forEach(function(E) {
        E.forEach(function(N) {
          K = Math.max(K, N.x + (N.colSpan || 1))
        })
      }), K
    }

    function I(C) {
      return C.length
    }

    function G(C, K) {
      let E = C.y,
        N = C.y - 1 + (C.rowSpan || 1),
        q = K.y,
        O = K.y - 1 + (K.rowSpan || 1),
        R = !(E > O || q > N),
        T = C.x,
        L = C.x - 1 + (C.colSpan || 1),
        _ = K.x,
        k = K.x - 1 + (K.colSpan || 1),
        i = !(T > k || _ > L);
      return R && i
    }

    function Z(C, K, E) {
      let N = Math.min(C.length - 1, E),
        q = {
          x: K,
          y: E
        };
      for (let O = 0; O <= N; O++) {
        let R = C[O];
        for (let T = 0; T < R.length; T++)
          if (G(q, R[T])) return !0
      }
      return !1
    }

    function D(C, K, E, N) {
      for (let q = E; q < N; q++)
        if (Z(C, q, K)) return !1;
      return !0
    }

    function Y(C) {
      C.forEach(function(K, E) {
        K.forEach(function(N) {
          for (let q = 1; q < N.rowSpan; q++) {
            let O = new mw5(N);
            O.x = N.x, O.y = N.y + q, O.colSpan = N.colSpan, J(O, C[E + q])
          }
        })
      })
    }

    function W(C) {
      for (let K = C.length - 1; K >= 0; K--) {
        let E = C[K];
        for (let N = 0; N < E.length; N++) {
          let q = E[N];
          for (let O = 1; O < q.colSpan; O++) {
            let R = new hw5;
            R.x = q.x + O, R.y = q.y, E.splice(N + 1, 0, R)
          }
        }
      }
    }

    function J(C, K) {
      let E = 0;
      while (E < K.length && K[E].x < C.x) E++;
      K.splice(E, 0, C)
    }

    function F(C) {
      let K = I(C),
        E = Q(C);
      gw5(`Max rows: ${K}; Max cols: ${E}`);
      for (let N = 0; N < K; N++)
        for (let q = 0; q < E; q++)
          if (!Z(C, q, N)) {
            let O = {
              x: q,
              y: N,
              colSpan: 1,
              rowSpan: 1
            };
            q++;
            while (q < E && !Z(C, q, N)) O.colSpan++, q++;
            let R = N + 1;
            while (R < K && D(C, R, O.x, O.x + O.colSpan)) O.rowSpan++, R++;
            let T = new J0A(O);
            T.x = O.x, T.y = O.y, bw5(`Missing cell at ${T.y}-${T.x}.`), J(T, C[N])
          }
    }

    function X(C) {
      return C.map(function(K) {
        if (!Array.isArray(K)) {
          let E = Object.keys(K)[0];
          if (K = K[E], Array.isArray(K)) K = K.slice(), K.unshift(E);
          else K = [E, K]
        }
        return K.map(function(E) {
          return new J0A(E)
        })
      })
    }

    function V(C) {
      let K = X(C);
      return B(K), F(K), Y(K), W(K), K
    }
    fP2.exports = {
      makeTableLayout: V,
      layoutTable: B,
      addRowSpanCells: Y,
      maxWidth: Q,
      fillInTable: F,
      computeWidths: xP2("colSpan", "desiredWidth", "x", 1),
      computeHeights: xP2("rowSpan", "desiredHeight", "y", 1)
    }
  })();

  function xP2(A, B, Q, I) {
    return function(G, Z) {
      let D = [],
        Y = [],
        W = {};
      Z.forEach(function(J) {
        J.forEach(function(F) {
          if ((F[A] || 1) > 1) Y.push(F);
          else D[F[Q]] = Math.max(D[F[Q]] || 0, F[B] || 0, I)
        })
      }), G.forEach(function(J, F) {
        if (typeof J === "number") D[F] = J
      });
      for (let J = Y.length - 1; J >= 0; J--) {
        let F = Y[J],
          X = F[A],
          V = F[Q],
          C = D[V],
          K = typeof G[V] === "number" ? 0 : 1;
        if (typeof C === "number") {
          for (let E = 1; E < X; E++)
            if (C += 1 + D[V + E], typeof G[V + E] !== "number") K++
        } else if (C = B === "desiredWidth" ? F.desiredWidth - 1 : 1, !W[V] || W[V] < C) W[V] = C;
        if (F[B] > C) {
          let E = 0;
          while (K > 0 && F[B] > C) {
            if (typeof G[V + E] !== "number") {
              let N = Math.round((F[B] - C) / K);
              C += N, D[V + E] += N, K--
            }
            E++
          }
        }
      }
      Object.assign(G, D, W);
      for (let J = 0; J < G.length; J++) G[J] = Math.max(I, G[J] || 0)
    }
  }
})
// @from(Start 8244276, End 8246444)
gP2 = z((TYB, bP2) => {
  var l$ = Ww1(),
    dw5 = Z0A(),
    F0A = vP2();
  class V0A extends Array {
    constructor(A) {
      super();
      let B = dw5.mergeOptions(A);
      if (Object.defineProperty(this, "options", {
          value: B,
          enumerable: B.debug
        }), B.debug) {
        switch (typeof B.debug) {
          case "boolean":
            l$.setDebugLevel(l$.WARN);
            break;
          case "number":
            l$.setDebugLevel(B.debug);
            break;
          case "string":
            l$.setDebugLevel(parseInt(B.debug, 10));
            break;
          default:
            l$.setDebugLevel(l$.WARN), l$.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof B.debug}`)
        }
        Object.defineProperty(this, "messages", {
          get() {
            return l$.debugMessages()
          }
        })
      }
    }
    toString() {
      let A = this,
        B = this.options.head && this.options.head.length;
      if (B) {
        if (A = [this.options.head], this.length) A.push.apply(A, this)
      } else this.options.style.head = [];
      let Q = F0A.makeTableLayout(A);
      Q.forEach(function(G) {
        G.forEach(function(Z) {
          Z.mergeTableOptions(this.options, Q)
        }, this)
      }, this), F0A.computeWidths(this.options.colWidths, Q), F0A.computeHeights(this.options.rowHeights, Q), Q.forEach(function(G) {
        G.forEach(function(Z) {
          Z.init(this.options)
        }, this)
      }, this);
      let I = [];
      for (let G = 0; G < Q.length; G++) {
        let Z = Q[G],
          D = this.options.rowHeights[G];
        if (G === 0 || !this.options.style.compact || G == 1 && B) X0A(Z, "top", I);
        for (let Y = 0; Y < D; Y++) X0A(Z, Y, I);
        if (G + 1 == Q.length) X0A(Z, "bottom", I)
      }
      return I.join(`
`)
    }
    get width() {
      return this.toString().split(`
`)[0].length
    }
  }
  V0A.reset = () => l$.reset();

  function X0A(A, B, Q) {
    let I = [];
    A.forEach(function(Z) {
      I.push(Z.draw(B))
    });
    let G = I.join("");
    if (G.length) Q.push(G)
  }
  bP2.exports = V0A
})
// @from(Start 8246450, End 8246957)
J01 = z((N$5) => {
  class q2A extends Error {
    constructor(A, B, Q) {
      super(Q);
      Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, this.code = B, this.exitCode = A, this.nestedError = void 0
    }
  }
  class Fy2 extends q2A {
    constructor(A) {
      super(1, "commander.invalidArgument", A);
      Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name
    }
  }
  N$5.CommanderError = q2A;
  N$5.InvalidArgumentError = Fy2
})
// @from(Start 8246963, End 8248613)
QE1 = z((R$5) => {
  var {
    InvalidArgumentError: M$5
  } = J01();
  class Xy2 {
    constructor(A, B) {
      switch (this.description = B || "", this.variadic = !1, this.parseArg = void 0, this.defaultValue = void 0, this.defaultValueDescription = void 0, this.argChoices = void 0, A[0]) {
        case "<":
          this.required = !0, this._name = A.slice(1, -1);
          break;
        case "[":
          this.required = !1, this._name = A.slice(1, -1);
          break;
        default:
          this.required = !0, this._name = A;
          break
      }
      if (this._name.length > 3 && this._name.slice(-3) === "...") this.variadic = !0, this._name = this._name.slice(0, -3)
    }
    name() {
      return this._name
    }
    _concatValue(A, B) {
      if (B === this.defaultValue || !Array.isArray(B)) return [A];
      return B.concat(A)
    }
    default (A, B) {
      return this.defaultValue = A, this.defaultValueDescription = B, this
    }
    argParser(A) {
      return this.parseArg = A, this
    }
    choices(A) {
      return this.argChoices = A.slice(), this.parseArg = (B, Q) => {
        if (!this.argChoices.includes(B)) throw new M$5(`Allowed choices are ${this.argChoices.join(", ")}.`);
        if (this.variadic) return this._concatValue(B, Q);
        return B
      }, this
    }
    argRequired() {
      return this.required = !0, this
    }
    argOptional() {
      return this.required = !1, this
    }
  }

  function L$5(A) {
    let B = A.name() + (A.variadic === !0 ? "..." : "");
    return A.required ? "<" + B + ">" : "[" + B + "]"
  }
  R$5.Argument = Xy2;
  R$5.humanReadableArgName = L$5
})
// @from(Start 8248619, End 8254915)
M2A = z((S$5) => {
  var {
    humanReadableArgName: P$5
  } = QE1();
  class Vy2 {
    constructor() {
      this.helpWidth = void 0, this.sortSubcommands = !1, this.sortOptions = !1, this.showGlobalOptions = !1
    }
    visibleCommands(A) {
      let B = A.commands.filter((I) => !I._hidden),
        Q = A._getHelpCommand();
      if (Q && !Q._hidden) B.push(Q);
      if (this.sortSubcommands) B.sort((I, G) => {
        return I.name().localeCompare(G.name())
      });
      return B
    }
    compareOptions(A, B) {
      let Q = (I) => {
        return I.short ? I.short.replace(/^-/, "") : I.long.replace(/^--/, "")
      };
      return Q(A).localeCompare(Q(B))
    }
    visibleOptions(A) {
      let B = A.options.filter((I) => !I.hidden),
        Q = A._getHelpOption();
      if (Q && !Q.hidden) {
        let I = Q.short && A._findOption(Q.short),
          G = Q.long && A._findOption(Q.long);
        if (!I && !G) B.push(Q);
        else if (Q.long && !G) B.push(A.createOption(Q.long, Q.description));
        else if (Q.short && !I) B.push(A.createOption(Q.short, Q.description))
      }
      if (this.sortOptions) B.sort(this.compareOptions);
      return B
    }
    visibleGlobalOptions(A) {
      if (!this.showGlobalOptions) return [];
      let B = [];
      for (let Q = A.parent; Q; Q = Q.parent) {
        let I = Q.options.filter((G) => !G.hidden);
        B.push(...I)
      }
      if (this.sortOptions) B.sort(this.compareOptions);
      return B
    }
    visibleArguments(A) {
      if (A._argsDescription) A.registeredArguments.forEach((B) => {
        B.description = B.description || A._argsDescription[B.name()] || ""
      });
      if (A.registeredArguments.find((B) => B.description)) return A.registeredArguments;
      return []
    }
    subcommandTerm(A) {
      let B = A.registeredArguments.map((Q) => P$5(Q)).join(" ");
      return A._name + (A._aliases[0] ? "|" + A._aliases[0] : "") + (A.options.length ? " [options]" : "") + (B ? " " + B : "")
    }
    optionTerm(A) {
      return A.flags
    }
    argumentTerm(A) {
      return A.name()
    }
    longestSubcommandTermLength(A, B) {
      return B.visibleCommands(A).reduce((Q, I) => {
        return Math.max(Q, B.subcommandTerm(I).length)
      }, 0)
    }
    longestOptionTermLength(A, B) {
      return B.visibleOptions(A).reduce((Q, I) => {
        return Math.max(Q, B.optionTerm(I).length)
      }, 0)
    }
    longestGlobalOptionTermLength(A, B) {
      return B.visibleGlobalOptions(A).reduce((Q, I) => {
        return Math.max(Q, B.optionTerm(I).length)
      }, 0)
    }
    longestArgumentTermLength(A, B) {
      return B.visibleArguments(A).reduce((Q, I) => {
        return Math.max(Q, B.argumentTerm(I).length)
      }, 0)
    }
    commandUsage(A) {
      let B = A._name;
      if (A._aliases[0]) B = B + "|" + A._aliases[0];
      let Q = "";
      for (let I = A.parent; I; I = I.parent) Q = I.name() + " " + Q;
      return Q + B + " " + A.usage()
    }
    commandDescription(A) {
      return A.description()
    }
    subcommandDescription(A) {
      return A.summary() || A.description()
    }
    optionDescription(A) {
      let B = [];
      if (A.argChoices) B.push(`choices: ${A.argChoices.map((Q)=>JSON.stringify(Q)).join(", ")}`);
      if (A.defaultValue !== void 0) {
        if (A.required || A.optional || A.isBoolean() && typeof A.defaultValue === "boolean") B.push(`default: ${A.defaultValueDescription||JSON.stringify(A.defaultValue)}`)
      }
      if (A.presetArg !== void 0 && A.optional) B.push(`preset: ${JSON.stringify(A.presetArg)}`);
      if (A.envVar !== void 0) B.push(`env: ${A.envVar}`);
      if (B.length > 0) return `${A.description} (${B.join(", ")})`;
      return A.description
    }
    argumentDescription(A) {
      let B = [];
      if (A.argChoices) B.push(`choices: ${A.argChoices.map((Q)=>JSON.stringify(Q)).join(", ")}`);
      if (A.defaultValue !== void 0) B.push(`default: ${A.defaultValueDescription||JSON.stringify(A.defaultValue)}`);
      if (B.length > 0) {
        let Q = `(${B.join(", ")})`;
        if (A.description) return `${A.description} ${Q}`;
        return Q
      }
      return A.description
    }
    formatHelp(A, B) {
      let Q = B.padWidth(A, B),
        I = B.helpWidth || 80,
        G = 2,
        Z = 2;

      function D(C, K) {
        if (K) {
          let E = `${C.padEnd(Q+2)}${K}`;
          return B.wrap(E, I - 2, Q + 2)
        }
        return C
      }

      function Y(C) {
        return C.join(`
`).replace(/^/gm, " ".repeat(2))
      }
      let W = [`Usage: ${B.commandUsage(A)}`, ""],
        J = B.commandDescription(A);
      if (J.length > 0) W = W.concat([B.wrap(J, I, 0), ""]);
      let F = B.visibleArguments(A).map((C) => {
        return D(B.argumentTerm(C), B.argumentDescription(C))
      });
      if (F.length > 0) W = W.concat(["Arguments:", Y(F), ""]);
      let X = B.visibleOptions(A).map((C) => {
        return D(B.optionTerm(C), B.optionDescription(C))
      });
      if (X.length > 0) W = W.concat(["Options:", Y(X), ""]);
      if (this.showGlobalOptions) {
        let C = B.visibleGlobalOptions(A).map((K) => {
          return D(B.optionTerm(K), B.optionDescription(K))
        });
        if (C.length > 0) W = W.concat(["Global Options:", Y(C), ""])
      }
      let V = B.visibleCommands(A).map((C) => {
        return D(B.subcommandTerm(C), B.subcommandDescription(C))
      });
      if (V.length > 0) W = W.concat(["Commands:", Y(V), ""]);
      return W.join(`
`)
    }
    padWidth(A, B) {
      return Math.max(B.longestOptionTermLength(A, B), B.longestGlobalOptionTermLength(A, B), B.longestSubcommandTermLength(A, B), B.longestArgumentTermLength(A, B))
    }
    wrap(A, B, Q, I = 40) {
      let Z = new RegExp(`[\\n][${" \\f\\t\\v   -   　\uFEFF"}]+`);
      if (A.match(Z)) return A;
      let D = B - Q;
      if (D < I) return A;
      let Y = A.slice(0, Q),
        W = A.slice(Q).replace(`\r
`, `
`),
        J = " ".repeat(Q),
        X = `\\s${"​"}`,
        V = new RegExp(`
|.{1,${D-1}}([${X}]|$)|[^${X}]+?([${X}]|$)`, "g"),
        C = W.match(V) || [];
      return Y + C.map((K, E) => {
        if (K === `
`) return "";
        return (E > 0 ? J : "") + K.trimEnd()
      }).join(`
`)
    }
  }
  S$5.Help = Vy2
})
// @from(Start 8254921, End 8258141)
L2A = z((x$5) => {
  var {
    InvalidArgumentError: j$5
  } = J01();
  class Cy2 {
    constructor(A, B) {
      this.flags = A, this.description = B || "", this.required = A.includes("<"), this.optional = A.includes("["), this.variadic = /\w\.\.\.[>\]]$/.test(A), this.mandatory = !1;
      let Q = k$5(A);
      if (this.short = Q.shortFlag, this.long = Q.longFlag, this.negate = !1, this.long) this.negate = this.long.startsWith("--no-");
      this.defaultValue = void 0, this.defaultValueDescription = void 0, this.presetArg = void 0, this.envVar = void 0, this.parseArg = void 0, this.hidden = !1, this.argChoices = void 0, this.conflictsWith = [], this.implied = void 0
    }
    default (A, B) {
      return this.defaultValue = A, this.defaultValueDescription = B, this
    }
    preset(A) {
      return this.presetArg = A, this
    }
    conflicts(A) {
      return this.conflictsWith = this.conflictsWith.concat(A), this
    }
    implies(A) {
      let B = A;
      if (typeof A === "string") B = {
        [A]: !0
      };
      return this.implied = Object.assign(this.implied || {}, B), this
    }
    env(A) {
      return this.envVar = A, this
    }
    argParser(A) {
      return this.parseArg = A, this
    }
    makeOptionMandatory(A = !0) {
      return this.mandatory = !!A, this
    }
    hideHelp(A = !0) {
      return this.hidden = !!A, this
    }
    _concatValue(A, B) {
      if (B === this.defaultValue || !Array.isArray(B)) return [A];
      return B.concat(A)
    }
    choices(A) {
      return this.argChoices = A.slice(), this.parseArg = (B, Q) => {
        if (!this.argChoices.includes(B)) throw new j$5(`Allowed choices are ${this.argChoices.join(", ")}.`);
        if (this.variadic) return this._concatValue(B, Q);
        return B
      }, this
    }
    name() {
      if (this.long) return this.long.replace(/^--/, "");
      return this.short.replace(/^-/, "")
    }
    attributeName() {
      return y$5(this.name().replace(/^no-/, ""))
    }
    is(A) {
      return this.short === A || this.long === A
    }
    isBoolean() {
      return !this.required && !this.optional && !this.negate
    }
  }
  class Ky2 {
    constructor(A) {
      this.positiveOptions = new Map, this.negativeOptions = new Map, this.dualOptions = new Set, A.forEach((B) => {
        if (B.negate) this.negativeOptions.set(B.attributeName(), B);
        else this.positiveOptions.set(B.attributeName(), B)
      }), this.negativeOptions.forEach((B, Q) => {
        if (this.positiveOptions.has(Q)) this.dualOptions.add(Q)
      })
    }
    valueFromOption(A, B) {
      let Q = B.attributeName();
      if (!this.dualOptions.has(Q)) return !0;
      let I = this.negativeOptions.get(Q).presetArg,
        G = I !== void 0 ? I : !1;
      return B.negate === (G === A)
    }
  }

  function y$5(A) {
    return A.split("-").reduce((B, Q) => {
      return B + Q[0].toUpperCase() + Q.slice(1)
    })
  }

  function k$5(A) {
    let B, Q, I = A.split(/[ |,]+/);
    if (I.length > 1 && !/^[[<]/.test(I[1])) B = I.shift();
    if (Q = I.shift(), !B && /^-[^-]$/.test(Q)) B = Q, Q = void 0;
    return {
      shortFlag: B,
      longFlag: Q
    }
  }
  x$5.Option = Cy2;
  x$5.DualOptions = Ky2
})
// @from(Start 8258147, End 8259538)
Hy2 = z((h$5) => {
  function b$5(A, B) {
    if (Math.abs(A.length - B.length) > 3) return Math.max(A.length, B.length);
    let Q = [];
    for (let I = 0; I <= A.length; I++) Q[I] = [I];
    for (let I = 0; I <= B.length; I++) Q[0][I] = I;
    for (let I = 1; I <= B.length; I++)
      for (let G = 1; G <= A.length; G++) {
        let Z = 1;
        if (A[G - 1] === B[I - 1]) Z = 0;
        else Z = 1;
        if (Q[G][I] = Math.min(Q[G - 1][I] + 1, Q[G][I - 1] + 1, Q[G - 1][I - 1] + Z), G > 1 && I > 1 && A[G - 1] === B[I - 2] && A[G - 2] === B[I - 1]) Q[G][I] = Math.min(Q[G][I], Q[G - 2][I - 2] + 1)
      }
    return Q[A.length][B.length]
  }

  function g$5(A, B) {
    if (!B || B.length === 0) return "";
    B = Array.from(new Set(B));
    let Q = A.startsWith("--");
    if (Q) A = A.slice(2), B = B.map((D) => D.slice(2));
    let I = [],
      G = 3,
      Z = 0.4;
    if (B.forEach((D) => {
        if (D.length <= 1) return;
        let Y = b$5(A, D),
          W = Math.max(A.length, D.length);
        if ((W - Y) / W > Z) {
          if (Y < G) G = Y, I = [D];
          else if (Y === G) I.push(D)
        }
      }), I.sort((D, Y) => D.localeCompare(Y)), Q) I = I.map((D) => `--${D}`);
    if (I.length > 1) return `
(Did you mean one of ${I.join(", ")}?)`;
    if (I.length === 1) return `
(Did you mean ${I[0]}?)`;
    return ""
  }
  h$5.suggestSimilar = g$5
})