
// @from(Start 3277234, End 3284710)
Mj1 = z((FG4) => {
  var qj1 = Z71(),
    BG4 = {
      allowBooleanAttributes: !1,
      unpairedTags: []
    };
  FG4.validate = function(A, B) {
    B = Object.assign({}, BG4, B);
    let Q = [],
      I = !1,
      G = !1;
    if (A[0] === "\uFEFF") A = A.substr(1);
    for (let Z = 0; Z < A.length; Z++)
      if (A[Z] === "<" && A[Z + 1] === "?") {
        if (Z += 2, Z = GsA(A, Z), Z.err) return Z
      } else if (A[Z] === "<") {
      let D = Z;
      if (Z++, A[Z] === "!") {
        Z = ZsA(A, Z);
        continue
      } else {
        let Y = !1;
        if (A[Z] === "/") Y = !0, Z++;
        let W = "";
        for (; Z < A.length && A[Z] !== ">" && A[Z] !== " " && A[Z] !== "\t" && A[Z] !== `
` && A[Z] !== "\r"; Z++) W += A[Z];
        if (W = W.trim(), W[W.length - 1] === "/") W = W.substring(0, W.length - 1), Z--;
        if (!JG4(W)) {
          let X;
          if (W.trim().length === 0) X = "Invalid space after '<'.";
          else X = "Tag '" + W + "' is an invalid name.";
          return OQ("InvalidTag", X, SD(A, Z))
        }
        let J = GG4(A, Z);
        if (J === !1) return OQ("InvalidAttr", "Attributes for '" + W + "' have open quote.", SD(A, Z));
        let F = J.value;
        if (Z = J.index, F[F.length - 1] === "/") {
          let X = Z - F.length;
          F = F.substring(0, F.length - 1);
          let V = DsA(F, B);
          if (V === !0) I = !0;
          else return OQ(V.err.code, V.err.msg, SD(A, X + V.err.line))
        } else if (Y)
          if (!J.tagClosed) return OQ("InvalidTag", "Closing tag '" + W + "' doesn't have proper closing.", SD(A, Z));
          else if (F.trim().length > 0) return OQ("InvalidTag", "Closing tag '" + W + "' can't have attributes or invalid starting.", SD(A, D));
        else if (Q.length === 0) return OQ("InvalidTag", "Closing tag '" + W + "' has not been opened.", SD(A, D));
        else {
          let X = Q.pop();
          if (W !== X.tagName) {
            let V = SD(A, X.tagStartPos);
            return OQ("InvalidTag", "Expected closing tag '" + X.tagName + "' (opened in line " + V.line + ", col " + V.col + ") instead of closing tag '" + W + "'.", SD(A, D))
          }
          if (Q.length == 0) G = !0
        } else {
          let X = DsA(F, B);
          if (X !== !0) return OQ(X.err.code, X.err.msg, SD(A, Z - F.length + X.err.line));
          if (G === !0) return OQ("InvalidXml", "Multiple possible root nodes found.", SD(A, Z));
          else if (B.unpairedTags.indexOf(W) !== -1);
          else Q.push({
            tagName: W,
            tagStartPos: D
          });
          I = !0
        }
        for (Z++; Z < A.length; Z++)
          if (A[Z] === "<")
            if (A[Z + 1] === "!") {
              Z++, Z = ZsA(A, Z);
              continue
            } else if (A[Z + 1] === "?") {
          if (Z = GsA(A, ++Z), Z.err) return Z
        } else break;
        else if (A[Z] === "&") {
          let X = YG4(A, Z);
          if (X == -1) return OQ("InvalidChar", "char '&' is not expected.", SD(A, Z));
          Z = X
        } else if (G === !0 && !IsA(A[Z])) return OQ("InvalidXml", "Extra text at the end", SD(A, Z));
        if (A[Z] === "<") Z--
      }
    } else {
      if (IsA(A[Z])) continue;
      return OQ("InvalidChar", "char '" + A[Z] + "' is not expected.", SD(A, Z))
    }
    if (!I) return OQ("InvalidXml", "Start tag expected.", 1);
    else if (Q.length == 1) return OQ("InvalidTag", "Unclosed tag '" + Q[0].tagName + "'.", SD(A, Q[0].tagStartPos));
    else if (Q.length > 0) return OQ("InvalidXml", "Invalid '" + JSON.stringify(Q.map((Z) => Z.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", {
      line: 1,
      col: 1
    });
    return !0
  };

  function IsA(A) {
    return A === " " || A === "\t" || A === `
` || A === "\r"
  }

  function GsA(A, B) {
    let Q = B;
    for (; B < A.length; B++)
      if (A[B] == "?" || A[B] == " ") {
        let I = A.substr(Q, B - Q);
        if (B > 5 && I === "xml") return OQ("InvalidXml", "XML declaration allowed only at the start of the document.", SD(A, B));
        else if (A[B] == "?" && A[B + 1] == ">") {
          B++;
          break
        } else continue
      } return B
  }

  function ZsA(A, B) {
    if (A.length > B + 5 && A[B + 1] === "-" && A[B + 2] === "-") {
      for (B += 3; B < A.length; B++)
        if (A[B] === "-" && A[B + 1] === "-" && A[B + 2] === ">") {
          B += 2;
          break
        }
    } else if (A.length > B + 8 && A[B + 1] === "D" && A[B + 2] === "O" && A[B + 3] === "C" && A[B + 4] === "T" && A[B + 5] === "Y" && A[B + 6] === "P" && A[B + 7] === "E") {
      let Q = 1;
      for (B += 8; B < A.length; B++)
        if (A[B] === "<") Q++;
        else if (A[B] === ">") {
        if (Q--, Q === 0) break
      }
    } else if (A.length > B + 9 && A[B + 1] === "[" && A[B + 2] === "C" && A[B + 3] === "D" && A[B + 4] === "A" && A[B + 5] === "T" && A[B + 6] === "A" && A[B + 7] === "[") {
      for (B += 8; B < A.length; B++)
        if (A[B] === "]" && A[B + 1] === "]" && A[B + 2] === ">") {
          B += 2;
          break
        }
    }
    return B
  }
  var QG4 = '"',
    IG4 = "'";

  function GG4(A, B) {
    let Q = "",
      I = "",
      G = !1;
    for (; B < A.length; B++) {
      if (A[B] === QG4 || A[B] === IG4)
        if (I === "") I = A[B];
        else if (I !== A[B]);
      else I = "";
      else if (A[B] === ">") {
        if (I === "") {
          G = !0;
          break
        }
      }
      Q += A[B]
    }
    if (I !== "") return !1;
    return {
      value: Q,
      index: B,
      tagClosed: G
    }
  }
  var ZG4 = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");

  function DsA(A, B) {
    let Q = qj1.getAllMatches(A, ZG4),
      I = {};
    for (let G = 0; G < Q.length; G++) {
      if (Q[G][1].length === 0) return OQ("InvalidAttr", "Attribute '" + Q[G][2] + "' has no space in starting.", en(Q[G]));
      else if (Q[G][3] !== void 0 && Q[G][4] === void 0) return OQ("InvalidAttr", "Attribute '" + Q[G][2] + "' is without value.", en(Q[G]));
      else if (Q[G][3] === void 0 && !B.allowBooleanAttributes) return OQ("InvalidAttr", "boolean attribute '" + Q[G][2] + "' is not allowed.", en(Q[G]));
      let Z = Q[G][2];
      if (!WG4(Z)) return OQ("InvalidAttr", "Attribute '" + Z + "' is an invalid name.", en(Q[G]));
      if (!I.hasOwnProperty(Z)) I[Z] = 1;
      else return OQ("InvalidAttr", "Attribute '" + Z + "' is repeated.", en(Q[G]))
    }
    return !0
  }

  function DG4(A, B) {
    let Q = /\d/;
    if (A[B] === "x") B++, Q = /[\da-fA-F]/;
    for (; B < A.length; B++) {
      if (A[B] === ";") return B;
      if (!A[B].match(Q)) break
    }
    return -1
  }

  function YG4(A, B) {
    if (B++, A[B] === ";") return -1;
    if (A[B] === "#") return B++, DG4(A, B);
    let Q = 0;
    for (; B < A.length; B++, Q++) {
      if (A[B].match(/\w/) && Q < 20) continue;
      if (A[B] === ";") break;
      return -1
    }
    return B
  }

  function OQ(A, B, Q) {
    return {
      err: {
        code: A,
        msg: B,
        line: Q.line || Q,
        col: Q.col
      }
    }
  }

  function WG4(A) {
    return qj1.isName(A)
  }

  function JG4(A) {
    return qj1.isName(A)
  }

  function SD(A, B) {
    let Q = A.substring(0, B).split(/\r?\n/);
    return {
      line: Q.length,
      col: Q[Q.length - 1].length + 1
    }
  }

  function en(A) {
    return A.startIndex + A[1].length
  }
})
// @from(Start 3284716, End 3285791)
WsA = z((CG4) => {
  var YsA = {
      preserveOrder: !1,
      attributeNamePrefix: "@_",
      attributesGroupName: !1,
      textNodeName: "#text",
      ignoreAttributes: !0,
      removeNSPrefix: !1,
      allowBooleanAttributes: !1,
      parseTagValue: !0,
      parseAttributeValue: !1,
      trimValues: !0,
      cdataPropName: !1,
      numberParseOptions: {
        hex: !0,
        leadingZeros: !0,
        eNotation: !0
      },
      tagValueProcessor: function(A, B) {
        return B
      },
      attributeValueProcessor: function(A, B) {
        return B
      },
      stopNodes: [],
      alwaysCreateTextNode: !1,
      isArray: () => !1,
      commentPropName: !1,
      unpairedTags: [],
      processEntities: !0,
      htmlEntities: !1,
      ignoreDeclaration: !1,
      ignorePiTags: !1,
      transformTagName: !1,
      transformAttributeName: !1,
      updateTag: function(A, B, Q) {
        return A
      }
    },
    VG4 = function(A) {
      return Object.assign({}, YsA, A)
    };
  CG4.buildOptions = VG4;
  CG4.defaultOptions = YsA
})
// @from(Start 3285797, End 3286352)
XsA = z((H78, FsA) => {
  class JsA {
    constructor(A) {
      this.tagname = A, this.child = [], this[":@"] = {}
    }
    add(A, B) {
      if (A === "__proto__") A = "#__proto__";
      this.child.push({
        [A]: B
      })
    }
    addChild(A) {
      if (A.tagname === "__proto__") A.tagname = "#__proto__";
      if (A[":@"] && Object.keys(A[":@"]).length > 0) this.child.push({
        [A.tagname]: A.child,
        [":@"]: A[":@"]
      });
      else this.child.push({
        [A.tagname]: A.child
      })
    }
  }
  FsA.exports = JsA
})
// @from(Start 3286358, End 3289030)
CsA = z((z78, VsA) => {
  var zG4 = Z71();

  function wG4(A, B) {
    let Q = {};
    if (A[B + 3] === "O" && A[B + 4] === "C" && A[B + 5] === "T" && A[B + 6] === "Y" && A[B + 7] === "P" && A[B + 8] === "E") {
      B = B + 9;
      let I = 1,
        G = !1,
        Z = !1,
        D = "";
      for (; B < A.length; B++)
        if (A[B] === "<" && !Z) {
          if (G && NG4(A, B)) {
            if (B += 7, [entityName, val, B] = EG4(A, B + 1), val.indexOf("&") === -1) Q[LG4(entityName)] = {
              regx: RegExp(`&${entityName};`, "g"),
              val
            }
          } else if (G && $G4(A, B)) B += 8;
          else if (G && qG4(A, B)) B += 8;
          else if (G && MG4(A, B)) B += 9;
          else if (UG4) Z = !0;
          else throw new Error("Invalid DOCTYPE");
          I++, D = ""
        } else if (A[B] === ">") {
        if (Z) {
          if (A[B - 1] === "-" && A[B - 2] === "-") Z = !1, I--
        } else I--;
        if (I === 0) break
      } else if (A[B] === "[") G = !0;
      else D += A[B];
      if (I !== 0) throw new Error("Unclosed DOCTYPE")
    } else throw new Error("Invalid Tag instead of DOCTYPE");
    return {
      entities: Q,
      i: B
    }
  }

  function EG4(A, B) {
    let Q = "";
    for (; B < A.length && (A[B] !== "'" && A[B] !== '"'); B++) Q += A[B];
    if (Q = Q.trim(), Q.indexOf(" ") !== -1) throw new Error("External entites are not supported");
    let I = A[B++],
      G = "";
    for (; B < A.length && A[B] !== I; B++) G += A[B];
    return [Q, G, B]
  }

  function UG4(A, B) {
    if (A[B + 1] === "!" && A[B + 2] === "-" && A[B + 3] === "-") return !0;
    return !1
  }

  function NG4(A, B) {
    if (A[B + 1] === "!" && A[B + 2] === "E" && A[B + 3] === "N" && A[B + 4] === "T" && A[B + 5] === "I" && A[B + 6] === "T" && A[B + 7] === "Y") return !0;
    return !1
  }

  function $G4(A, B) {
    if (A[B + 1] === "!" && A[B + 2] === "E" && A[B + 3] === "L" && A[B + 4] === "E" && A[B + 5] === "M" && A[B + 6] === "E" && A[B + 7] === "N" && A[B + 8] === "T") return !0;
    return !1
  }

  function qG4(A, B) {
    if (A[B + 1] === "!" && A[B + 2] === "A" && A[B + 3] === "T" && A[B + 4] === "T" && A[B + 5] === "L" && A[B + 6] === "I" && A[B + 7] === "S" && A[B + 8] === "T") return !0;
    return !1
  }

  function MG4(A, B) {
    if (A[B + 1] === "!" && A[B + 2] === "N" && A[B + 3] === "O" && A[B + 4] === "T" && A[B + 5] === "A" && A[B + 6] === "T" && A[B + 7] === "I" && A[B + 8] === "O" && A[B + 9] === "N") return !0;
    return !1
  }

  function LG4(A) {
    if (zG4.isName(A)) return A;
    else throw new Error(`Invalid entity name ${A}`)
  }
  VsA.exports = wG4
})
// @from(Start 3289036, End 3291020)
HsA = z((w78, KsA) => {
  var RG4 = /^[-+]?0x[a-fA-F0-9]+$/,
    OG4 = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
  if (!Number.parseInt && window.parseInt) Number.parseInt = window.parseInt;
  if (!Number.parseFloat && window.parseFloat) Number.parseFloat = window.parseFloat;
  var TG4 = {
    hex: !0,
    leadingZeros: !0,
    decimalPoint: ".",
    eNotation: !0
  };

  function PG4(A, B = {}) {
    if (B = Object.assign({}, TG4, B), !A || typeof A !== "string") return A;
    let Q = A.trim();
    if (B.skipLike !== void 0 && B.skipLike.test(Q)) return A;
    else if (B.hex && RG4.test(Q)) return Number.parseInt(Q, 16);
    else {
      let I = OG4.exec(Q);
      if (I) {
        let G = I[1],
          Z = I[2],
          D = SG4(I[3]),
          Y = I[4] || I[6];
        if (!B.leadingZeros && Z.length > 0 && G && Q[2] !== ".") return A;
        else if (!B.leadingZeros && Z.length > 0 && !G && Q[1] !== ".") return A;
        else {
          let W = Number(Q),
            J = "" + W;
          if (J.search(/[eE]/) !== -1)
            if (B.eNotation) return W;
            else return A;
          else if (Y)
            if (B.eNotation) return W;
            else return A;
          else if (Q.indexOf(".") !== -1)
            if (J === "0" && D === "") return W;
            else if (J === D) return W;
          else if (G && J === "-" + D) return W;
          else return A;
          if (Z)
            if (D === J) return W;
            else if (G + D === J) return W;
          else return A;
          if (Q === J) return W;
          else if (Q === G + J) return W;
          return A
        }
      } else return A
    }
  }

  function SG4(A) {
    if (A && A.indexOf(".") !== -1) {
      if (A = A.replace(/0+$/, ""), A === ".") A = "0";
      else if (A[0] === ".") A = "0" + A;
      else if (A[A.length - 1] === ".") A = A.substr(0, A.length - 1);
      return A
    }
    return A
  }
  KsA.exports = PG4
})
// @from(Start 3291026, End 3303560)
UsA = z((E78, EsA) => {
  var zsA = Z71(),
    Aa = XsA(),
    _G4 = CsA(),
    jG4 = HsA();
  class wsA {
    constructor(A) {
      this.options = A, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = {
        apos: {
          regex: /&(apos|#39|#x27);/g,
          val: "'"
        },
        gt: {
          regex: /&(gt|#62|#x3E);/g,
          val: ">"
        },
        lt: {
          regex: /&(lt|#60|#x3C);/g,
          val: "<"
        },
        quot: {
          regex: /&(quot|#34|#x22);/g,
          val: '"'
        }
      }, this.ampEntity = {
        regex: /&(amp|#38|#x26);/g,
        val: "&"
      }, this.htmlEntities = {
        space: {
          regex: /&(nbsp|#160);/g,
          val: " "
        },
        cent: {
          regex: /&(cent|#162);/g,
          val: "¢"
        },
        pound: {
          regex: /&(pound|#163);/g,
          val: "£"
        },
        yen: {
          regex: /&(yen|#165);/g,
          val: "¥"
        },
        euro: {
          regex: /&(euro|#8364);/g,
          val: "€"
        },
        copyright: {
          regex: /&(copy|#169);/g,
          val: "©"
        },
        reg: {
          regex: /&(reg|#174);/g,
          val: "®"
        },
        inr: {
          regex: /&(inr|#8377);/g,
          val: "₹"
        },
        num_dec: {
          regex: /&#([0-9]{1,7});/g,
          val: (B, Q) => String.fromCharCode(Number.parseInt(Q, 10))
        },
        num_hex: {
          regex: /&#x([0-9a-fA-F]{1,6});/g,
          val: (B, Q) => String.fromCharCode(Number.parseInt(Q, 16))
        }
      }, this.addExternalEntities = yG4, this.parseXml = bG4, this.parseTextData = kG4, this.resolveNameSpace = xG4, this.buildAttributesMap = vG4, this.isItStopNode = dG4, this.replaceEntitiesValue = hG4, this.readStopNodeData = pG4, this.saveTextToParentTag = mG4, this.addChild = gG4
    }
  }

  function yG4(A) {
    let B = Object.keys(A);
    for (let Q = 0; Q < B.length; Q++) {
      let I = B[Q];
      this.lastEntities[I] = {
        regex: new RegExp("&" + I + ";", "g"),
        val: A[I]
      }
    }
  }

  function kG4(A, B, Q, I, G, Z, D) {
    if (A !== void 0) {
      if (this.options.trimValues && !I) A = A.trim();
      if (A.length > 0) {
        if (!D) A = this.replaceEntitiesValue(A);
        let Y = this.options.tagValueProcessor(B, A, Q, G, Z);
        if (Y === null || Y === void 0) return A;
        else if (typeof Y !== typeof A || Y !== A) return Y;
        else if (this.options.trimValues) return Rj1(A, this.options.parseTagValue, this.options.numberParseOptions);
        else if (A.trim() === A) return Rj1(A, this.options.parseTagValue, this.options.numberParseOptions);
        else return A
      }
    }
  }

  function xG4(A) {
    if (this.options.removeNSPrefix) {
      let B = A.split(":"),
        Q = A.charAt(0) === "/" ? "/" : "";
      if (B[0] === "xmlns") return "";
      if (B.length === 2) A = Q + B[1]
    }
    return A
  }
  var fG4 = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");

  function vG4(A, B, Q) {
    if (!this.options.ignoreAttributes && typeof A === "string") {
      let I = zsA.getAllMatches(A, fG4),
        G = I.length,
        Z = {};
      for (let D = 0; D < G; D++) {
        let Y = this.resolveNameSpace(I[D][1]),
          W = I[D][4],
          J = this.options.attributeNamePrefix + Y;
        if (Y.length) {
          if (this.options.transformAttributeName) J = this.options.transformAttributeName(J);
          if (J === "__proto__") J = "#__proto__";
          if (W !== void 0) {
            if (this.options.trimValues) W = W.trim();
            W = this.replaceEntitiesValue(W);
            let F = this.options.attributeValueProcessor(Y, W, B);
            if (F === null || F === void 0) Z[J] = W;
            else if (typeof F !== typeof W || F !== W) Z[J] = F;
            else Z[J] = Rj1(W, this.options.parseAttributeValue, this.options.numberParseOptions)
          } else if (this.options.allowBooleanAttributes) Z[J] = !0
        }
      }
      if (!Object.keys(Z).length) return;
      if (this.options.attributesGroupName) {
        let D = {};
        return D[this.options.attributesGroupName] = Z, D
      }
      return Z
    }
  }
  var bG4 = function(A) {
    A = A.replace(/\r\n?/g, `
`);
    let B = new Aa("!xml"),
      Q = B,
      I = "",
      G = "";
    for (let Z = 0; Z < A.length; Z++)
      if (A[Z] === "<")
        if (A[Z + 1] === "/") {
          let Y = oS(A, ">", Z, "Closing Tag is not closed."),
            W = A.substring(Z + 2, Y).trim();
          if (this.options.removeNSPrefix) {
            let X = W.indexOf(":");
            if (X !== -1) W = W.substr(X + 1)
          }
          if (this.options.transformTagName) W = this.options.transformTagName(W);
          if (Q) I = this.saveTextToParentTag(I, Q, G);
          let J = G.substring(G.lastIndexOf(".") + 1);
          if (W && this.options.unpairedTags.indexOf(W) !== -1) throw new Error(`Unpaired tag can not be used as closing tag: </${W}>`);
          let F = 0;
          if (J && this.options.unpairedTags.indexOf(J) !== -1) F = G.lastIndexOf(".", G.lastIndexOf(".") - 1), this.tagsNodeStack.pop();
          else F = G.lastIndexOf(".");
          G = G.substring(0, F), Q = this.tagsNodeStack.pop(), I = "", Z = Y
        } else if (A[Z + 1] === "?") {
      let Y = Lj1(A, Z, !1, "?>");
      if (!Y) throw new Error("Pi Tag is not closed.");
      if (I = this.saveTextToParentTag(I, Q, G), this.options.ignoreDeclaration && Y.tagName === "?xml" || this.options.ignorePiTags);
      else {
        let W = new Aa(Y.tagName);
        if (W.add(this.options.textNodeName, ""), Y.tagName !== Y.tagExp && Y.attrExpPresent) W[":@"] = this.buildAttributesMap(Y.tagExp, G, Y.tagName);
        this.addChild(Q, W, G)
      }
      Z = Y.closeIndex + 1
    } else if (A.substr(Z + 1, 3) === "!--") {
      let Y = oS(A, "-->", Z + 4, "Comment is not closed.");
      if (this.options.commentPropName) {
        let W = A.substring(Z + 4, Y - 2);
        I = this.saveTextToParentTag(I, Q, G), Q.add(this.options.commentPropName, [{
          [this.options.textNodeName]: W
        }])
      }
      Z = Y
    } else if (A.substr(Z + 1, 2) === "!D") {
      let Y = _G4(A, Z);
      this.docTypeEntities = Y.entities, Z = Y.i
    } else if (A.substr(Z + 1, 2) === "![") {
      let Y = oS(A, "]]>", Z, "CDATA is not closed.") - 2,
        W = A.substring(Z + 9, Y);
      I = this.saveTextToParentTag(I, Q, G);
      let J = this.parseTextData(W, Q.tagname, G, !0, !1, !0, !0);
      if (J == null) J = "";
      if (this.options.cdataPropName) Q.add(this.options.cdataPropName, [{
        [this.options.textNodeName]: W
      }]);
      else Q.add(this.options.textNodeName, J);
      Z = Y + 2
    } else {
      let Y = Lj1(A, Z, this.options.removeNSPrefix),
        W = Y.tagName,
        J = Y.rawTagName,
        F = Y.tagExp,
        X = Y.attrExpPresent,
        V = Y.closeIndex;
      if (this.options.transformTagName) W = this.options.transformTagName(W);
      if (Q && I) {
        if (Q.tagname !== "!xml") I = this.saveTextToParentTag(I, Q, G, !1)
      }
      let C = Q;
      if (C && this.options.unpairedTags.indexOf(C.tagname) !== -1) Q = this.tagsNodeStack.pop(), G = G.substring(0, G.lastIndexOf("."));
      if (W !== B.tagname) G += G ? "." + W : W;
      if (this.isItStopNode(this.options.stopNodes, G, W)) {
        let K = "";
        if (F.length > 0 && F.lastIndexOf("/") === F.length - 1) {
          if (W[W.length - 1] === "/") W = W.substr(0, W.length - 1), G = G.substr(0, G.length - 1), F = W;
          else F = F.substr(0, F.length - 1);
          Z = Y.closeIndex
        } else if (this.options.unpairedTags.indexOf(W) !== -1) Z = Y.closeIndex;
        else {
          let N = this.readStopNodeData(A, J, V + 1);
          if (!N) throw new Error(`Unexpected end of ${J}`);
          Z = N.i, K = N.tagContent
        }
        let E = new Aa(W);
        if (W !== F && X) E[":@"] = this.buildAttributesMap(F, G, W);
        if (K) K = this.parseTextData(K, W, G, !0, X, !0, !0);
        G = G.substr(0, G.lastIndexOf(".")), E.add(this.options.textNodeName, K), this.addChild(Q, E, G)
      } else {
        if (F.length > 0 && F.lastIndexOf("/") === F.length - 1) {
          if (W[W.length - 1] === "/") W = W.substr(0, W.length - 1), G = G.substr(0, G.length - 1), F = W;
          else F = F.substr(0, F.length - 1);
          if (this.options.transformTagName) W = this.options.transformTagName(W);
          let K = new Aa(W);
          if (W !== F && X) K[":@"] = this.buildAttributesMap(F, G, W);
          this.addChild(Q, K, G), G = G.substr(0, G.lastIndexOf("."))
        } else {
          let K = new Aa(W);
          if (this.tagsNodeStack.push(Q), W !== F && X) K[":@"] = this.buildAttributesMap(F, G, W);
          this.addChild(Q, K, G), Q = K
        }
        I = "", Z = V
      }
    } else I += A[Z];
    return B.child
  };

  function gG4(A, B, Q) {
    let I = this.options.updateTag(B.tagname, Q, B[":@"]);
    if (I === !1);
    else if (typeof I === "string") B.tagname = I, A.addChild(B);
    else A.addChild(B)
  }
  var hG4 = function(A) {
    if (this.options.processEntities) {
      for (let B in this.docTypeEntities) {
        let Q = this.docTypeEntities[B];
        A = A.replace(Q.regx, Q.val)
      }
      for (let B in this.lastEntities) {
        let Q = this.lastEntities[B];
        A = A.replace(Q.regex, Q.val)
      }
      if (this.options.htmlEntities)
        for (let B in this.htmlEntities) {
          let Q = this.htmlEntities[B];
          A = A.replace(Q.regex, Q.val)
        }
      A = A.replace(this.ampEntity.regex, this.ampEntity.val)
    }
    return A
  };

  function mG4(A, B, Q, I) {
    if (A) {
      if (I === void 0) I = Object.keys(B.child).length === 0;
      if (A = this.parseTextData(A, B.tagname, Q, !1, B[":@"] ? Object.keys(B[":@"]).length !== 0 : !1, I), A !== void 0 && A !== "") B.add(this.options.textNodeName, A);
      A = ""
    }
    return A
  }

  function dG4(A, B, Q) {
    let I = "*." + Q;
    for (let G in A) {
      let Z = A[G];
      if (I === Z || B === Z) return !0
    }
    return !1
  }

  function uG4(A, B, Q = ">") {
    let I, G = "";
    for (let Z = B; Z < A.length; Z++) {
      let D = A[Z];
      if (I) {
        if (D === I) I = ""
      } else if (D === '"' || D === "'") I = D;
      else if (D === Q[0])
        if (Q[1]) {
          if (A[Z + 1] === Q[1]) return {
            data: G,
            index: Z
          }
        } else return {
          data: G,
          index: Z
        };
      else if (D === "\t") D = " ";
      G += D
    }
  }

  function oS(A, B, Q, I) {
    let G = A.indexOf(B, Q);
    if (G === -1) throw new Error(I);
    else return G + B.length - 1
  }

  function Lj1(A, B, Q, I = ">") {
    let G = uG4(A, B + 1, I);
    if (!G) return;
    let {
      data: Z,
      index: D
    } = G, Y = Z.search(/\s/), W = Z, J = !0;
    if (Y !== -1) W = Z.substring(0, Y), Z = Z.substring(Y + 1).trimStart();
    let F = W;
    if (Q) {
      let X = W.indexOf(":");
      if (X !== -1) W = W.substr(X + 1), J = W !== G.data.substr(X + 1)
    }
    return {
      tagName: W,
      tagExp: Z,
      closeIndex: D,
      attrExpPresent: J,
      rawTagName: F
    }
  }

  function pG4(A, B, Q) {
    let I = Q,
      G = 1;
    for (; Q < A.length; Q++)
      if (A[Q] === "<")
        if (A[Q + 1] === "/") {
          let Z = oS(A, ">", Q, `${B} is not closed`);
          if (A.substring(Q + 2, Z).trim() === B) {
            if (G--, G === 0) return {
              tagContent: A.substring(I, Q),
              i: Z
            }
          }
          Q = Z
        } else if (A[Q + 1] === "?") Q = oS(A, "?>", Q + 1, "StopNode is not closed.");
    else if (A.substr(Q + 1, 3) === "!--") Q = oS(A, "-->", Q + 3, "StopNode is not closed.");
    else if (A.substr(Q + 1, 2) === "![") Q = oS(A, "]]>", Q, "StopNode is not closed.") - 2;
    else {
      let Z = Lj1(A, Q, ">");
      if (Z) {
        if ((Z && Z.tagName) === B && Z.tagExp[Z.tagExp.length - 1] !== "/") G++;
        Q = Z.closeIndex
      }
    }
  }

  function Rj1(A, B, Q) {
    if (B && typeof A === "string") {
      let I = A.trim();
      if (I === "true") return !0;
      else if (I === "false") return !1;
      else return jG4(A, Q)
    } else if (zsA.isExist(A)) return A;
    else return ""
  }
  EsA.exports = wsA
})
// @from(Start 3303566, End 3305371)
$sA = z((aG4) => {
  function cG4(A, B) {
    return NsA(A, B)
  }

  function NsA(A, B, Q) {
    let I, G = {};
    for (let Z = 0; Z < A.length; Z++) {
      let D = A[Z],
        Y = lG4(D),
        W = "";
      if (Q === void 0) W = Y;
      else W = Q + "." + Y;
      if (Y === B.textNodeName)
        if (I === void 0) I = D[Y];
        else I += "" + D[Y];
      else if (Y === void 0) continue;
      else if (D[Y]) {
        let J = NsA(D[Y], B, W),
          F = nG4(J, B);
        if (D[":@"]) iG4(J, D[":@"], W, B);
        else if (Object.keys(J).length === 1 && J[B.textNodeName] !== void 0 && !B.alwaysCreateTextNode) J = J[B.textNodeName];
        else if (Object.keys(J).length === 0)
          if (B.alwaysCreateTextNode) J[B.textNodeName] = "";
          else J = "";
        if (G[Y] !== void 0 && G.hasOwnProperty(Y)) {
          if (!Array.isArray(G[Y])) G[Y] = [G[Y]];
          G[Y].push(J)
        } else if (B.isArray(Y, W, F)) G[Y] = [J];
        else G[Y] = J
      }
    }
    if (typeof I === "string") {
      if (I.length > 0) G[B.textNodeName] = I
    } else if (I !== void 0) G[B.textNodeName] = I;
    return G
  }

  function lG4(A) {
    let B = Object.keys(A);
    for (let Q = 0; Q < B.length; Q++) {
      let I = B[Q];
      if (I !== ":@") return I
    }
  }

  function iG4(A, B, Q, I) {
    if (B) {
      let G = Object.keys(B),
        Z = G.length;
      for (let D = 0; D < Z; D++) {
        let Y = G[D];
        if (I.isArray(Y, Q + "." + Y, !0, !0)) A[Y] = [B[Y]];
        else A[Y] = B[Y]
      }
    }
  }

  function nG4(A, B) {
    let {
      textNodeName: Q
    } = B, I = Object.keys(A).length;
    if (I === 0) return !0;
    if (I === 1 && (A[Q] || typeof A[Q] === "boolean" || A[Q] === 0)) return !0;
    return !1
  }
  aG4.prettify = cG4
})
// @from(Start 3305377, End 3306584)
LsA = z((N78, MsA) => {
  var {
    buildOptions: rG4
  } = WsA(), oG4 = UsA(), {
    prettify: tG4
  } = $sA(), eG4 = Mj1();
  class qsA {
    constructor(A) {
      this.externalEntities = {}, this.options = rG4(A)
    }
    parse(A, B) {
      if (typeof A === "string");
      else if (A.toString) A = A.toString();
      else throw new Error("XML data is accepted in String or Bytes[] form.");
      if (B) {
        if (B === !0) B = {};
        let G = eG4.validate(A, B);
        if (G !== !0) throw Error(`${G.err.msg}:${G.err.line}:${G.err.col}`)
      }
      let Q = new oG4(this.options);
      Q.addExternalEntities(this.externalEntities);
      let I = Q.parseXml(A);
      if (this.options.preserveOrder || I === void 0) return I;
      else return tG4(I, this.options)
    }
    addEntity(A, B) {
      if (B.indexOf("&") !== -1) throw new Error("Entity value can't have '&'");
      else if (A.indexOf("&") !== -1 || A.indexOf(";") !== -1) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
      else if (B === "&") throw new Error("An entity with value '&' is not permitted");
      else this.externalEntities[A] = B
    }
  }
  MsA.exports = qsA
})
// @from(Start 3306590, End 3309413)
SsA = z(($78, PsA) => {
  function AZ4(A, B) {
    let Q = "";
    if (B.format && B.indentBy.length > 0) Q = `
`;
    return OsA(A, B, "", Q)
  }

  function OsA(A, B, Q, I) {
    let G = "",
      Z = !1;
    for (let D = 0; D < A.length; D++) {
      let Y = A[D],
        W = BZ4(Y);
      if (W === void 0) continue;
      let J = "";
      if (Q.length === 0) J = W;
      else J = `${Q}.${W}`;
      if (W === B.textNodeName) {
        let K = Y[W];
        if (!QZ4(J, B)) K = B.tagValueProcessor(W, K), K = TsA(K, B);
        if (Z) G += I;
        G += K, Z = !1;
        continue
      } else if (W === B.cdataPropName) {
        if (Z) G += I;
        G += `<![CDATA[${Y[W][0][B.textNodeName]}]]>`, Z = !1;
        continue
      } else if (W === B.commentPropName) {
        G += I + `<!--${Y[W][0][B.textNodeName]}-->`, Z = !0;
        continue
      } else if (W[0] === "?") {
        let K = RsA(Y[":@"], B),
          E = W === "?xml" ? "" : I,
          N = Y[W][0][B.textNodeName];
        N = N.length !== 0 ? " " + N : "", G += E + `<${W}${N}${K}?>`, Z = !0;
        continue
      }
      let F = I;
      if (F !== "") F += B.indentBy;
      let X = RsA(Y[":@"], B),
        V = I + `<${W}${X}`,
        C = OsA(Y[W], B, J, F);
      if (B.unpairedTags.indexOf(W) !== -1)
        if (B.suppressUnpairedNode) G += V + ">";
        else G += V + "/>";
      else if ((!C || C.length === 0) && B.suppressEmptyNode) G += V + "/>";
      else if (C && C.endsWith(">")) G += V + `>${C}${I}</${W}>`;
      else {
        if (G += V + ">", C && I !== "" && (C.includes("/>") || C.includes("</"))) G += I + B.indentBy + C + I;
        else G += C;
        G += `</${W}>`
      }
      Z = !0
    }
    return G
  }

  function BZ4(A) {
    let B = Object.keys(A);
    for (let Q = 0; Q < B.length; Q++) {
      let I = B[Q];
      if (!A.hasOwnProperty(I)) continue;
      if (I !== ":@") return I
    }
  }

  function RsA(A, B) {
    let Q = "";
    if (A && !B.ignoreAttributes)
      for (let I in A) {
        if (!A.hasOwnProperty(I)) continue;
        let G = B.attributeValueProcessor(I, A[I]);
        if (G = TsA(G, B), G === !0 && B.suppressBooleanAttributes) Q += ` ${I.substr(B.attributeNamePrefix.length)}`;
        else Q += ` ${I.substr(B.attributeNamePrefix.length)}="${G}"`
      }
    return Q
  }

  function QZ4(A, B) {
    A = A.substr(0, A.length - B.textNodeName.length - 1);
    let Q = A.substr(A.lastIndexOf(".") + 1);
    for (let I in B.stopNodes)
      if (B.stopNodes[I] === A || B.stopNodes[I] === "*." + Q) return !0;
    return !1
  }

  function TsA(A, B) {
    if (A && A.length > 0 && B.processEntities)
      for (let Q = 0; Q < B.entities.length; Q++) {
        let I = B.entities[Q];
        A = A.replace(I.regex, I.val)
      }
    return A
  }
  PsA.exports = AZ4
})
// @from(Start 3309419, End 3316380)
jsA = z((q78, _sA) => {
  var IZ4 = SsA(),
    GZ4 = {
      attributeNamePrefix: "@_",
      attributesGroupName: !1,
      textNodeName: "#text",
      ignoreAttributes: !0,
      cdataPropName: !1,
      format: !1,
      indentBy: "  ",
      suppressEmptyNode: !1,
      suppressUnpairedNode: !0,
      suppressBooleanAttributes: !0,
      tagValueProcessor: function(A, B) {
        return B
      },
      attributeValueProcessor: function(A, B) {
        return B
      },
      preserveOrder: !1,
      commentPropName: !1,
      unpairedTags: [],
      entities: [{
        regex: new RegExp("&", "g"),
        val: "&amp;"
      }, {
        regex: new RegExp(">", "g"),
        val: "&gt;"
      }, {
        regex: new RegExp("<", "g"),
        val: "&lt;"
      }, {
        regex: new RegExp("'", "g"),
        val: "&apos;"
      }, {
        regex: new RegExp('"', "g"),
        val: "&quot;"
      }],
      processEntities: !0,
      stopNodes: [],
      oneListGroup: !1
    };

  function _L(A) {
    if (this.options = Object.assign({}, GZ4, A), this.options.ignoreAttributes || this.options.attributesGroupName) this.isAttribute = function() {
      return !1
    };
    else this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = YZ4;
    if (this.processTextOrObjNode = ZZ4, this.options.format) this.indentate = DZ4, this.tagEndChar = `>
`, this.newLine = `
`;
    else this.indentate = function() {
      return ""
    }, this.tagEndChar = ">", this.newLine = ""
  }
  _L.prototype.build = function(A) {
    if (this.options.preserveOrder) return IZ4(A, this.options);
    else {
      if (Array.isArray(A) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) A = {
        [this.options.arrayNodeName]: A
      };
      return this.j2x(A, 0).val
    }
  };
  _L.prototype.j2x = function(A, B) {
    let Q = "",
      I = "";
    for (let G in A) {
      if (!Object.prototype.hasOwnProperty.call(A, G)) continue;
      if (typeof A[G] === "undefined") {
        if (this.isAttribute(G)) I += ""
      } else if (A[G] === null)
        if (this.isAttribute(G)) I += "";
        else if (G[0] === "?") I += this.indentate(B) + "<" + G + "?" + this.tagEndChar;
      else I += this.indentate(B) + "<" + G + "/" + this.tagEndChar;
      else if (A[G] instanceof Date) I += this.buildTextValNode(A[G], G, "", B);
      else if (typeof A[G] !== "object") {
        let Z = this.isAttribute(G);
        if (Z) Q += this.buildAttrPairStr(Z, "" + A[G]);
        else if (G === this.options.textNodeName) {
          let D = this.options.tagValueProcessor(G, "" + A[G]);
          I += this.replaceEntitiesValue(D)
        } else I += this.buildTextValNode(A[G], G, "", B)
      } else if (Array.isArray(A[G])) {
        let Z = A[G].length,
          D = "",
          Y = "";
        for (let W = 0; W < Z; W++) {
          let J = A[G][W];
          if (typeof J === "undefined");
          else if (J === null)
            if (G[0] === "?") I += this.indentate(B) + "<" + G + "?" + this.tagEndChar;
            else I += this.indentate(B) + "<" + G + "/" + this.tagEndChar;
          else if (typeof J === "object")
            if (this.options.oneListGroup) {
              let F = this.j2x(J, B + 1);
              if (D += F.val, this.options.attributesGroupName && J.hasOwnProperty(this.options.attributesGroupName)) Y += F.attrStr
            } else D += this.processTextOrObjNode(J, G, B);
          else if (this.options.oneListGroup) {
            let F = this.options.tagValueProcessor(G, J);
            F = this.replaceEntitiesValue(F), D += F
          } else D += this.buildTextValNode(J, G, "", B)
        }
        if (this.options.oneListGroup) D = this.buildObjectNode(D, G, Y, B);
        I += D
      } else if (this.options.attributesGroupName && G === this.options.attributesGroupName) {
        let Z = Object.keys(A[G]),
          D = Z.length;
        for (let Y = 0; Y < D; Y++) Q += this.buildAttrPairStr(Z[Y], "" + A[G][Z[Y]])
      } else I += this.processTextOrObjNode(A[G], G, B)
    }
    return {
      attrStr: Q,
      val: I
    }
  };
  _L.prototype.buildAttrPairStr = function(A, B) {
    if (B = this.options.attributeValueProcessor(A, "" + B), B = this.replaceEntitiesValue(B), this.options.suppressBooleanAttributes && B === "true") return " " + A;
    else return " " + A + '="' + B + '"'
  };

  function ZZ4(A, B, Q) {
    let I = this.j2x(A, Q + 1);
    if (A[this.options.textNodeName] !== void 0 && Object.keys(A).length === 1) return this.buildTextValNode(A[this.options.textNodeName], B, I.attrStr, Q);
    else return this.buildObjectNode(I.val, B, I.attrStr, Q)
  }
  _L.prototype.buildObjectNode = function(A, B, Q, I) {
    if (A === "")
      if (B[0] === "?") return this.indentate(I) + "<" + B + Q + "?" + this.tagEndChar;
      else return this.indentate(I) + "<" + B + Q + this.closeTag(B) + this.tagEndChar;
    else {
      let G = "</" + B + this.tagEndChar,
        Z = "";
      if (B[0] === "?") Z = "?", G = "";
      if ((Q || Q === "") && A.indexOf("<") === -1) return this.indentate(I) + "<" + B + Q + Z + ">" + A + G;
      else if (this.options.commentPropName !== !1 && B === this.options.commentPropName && Z.length === 0) return this.indentate(I) + `<!--${A}-->` + this.newLine;
      else return this.indentate(I) + "<" + B + Q + Z + this.tagEndChar + A + this.indentate(I) + G
    }
  };
  _L.prototype.closeTag = function(A) {
    let B = "";
    if (this.options.unpairedTags.indexOf(A) !== -1) {
      if (!this.options.suppressUnpairedNode) B = "/"
    } else if (this.options.suppressEmptyNode) B = "/";
    else B = `></${A}`;
    return B
  };
  _L.prototype.buildTextValNode = function(A, B, Q, I) {
    if (this.options.cdataPropName !== !1 && B === this.options.cdataPropName) return this.indentate(I) + `<![CDATA[${A}]]>` + this.newLine;
    else if (this.options.commentPropName !== !1 && B === this.options.commentPropName) return this.indentate(I) + `<!--${A}-->` + this.newLine;
    else if (B[0] === "?") return this.indentate(I) + "<" + B + Q + "?" + this.tagEndChar;
    else {
      let G = this.options.tagValueProcessor(B, A);
      if (G = this.replaceEntitiesValue(G), G === "") return this.indentate(I) + "<" + B + Q + this.closeTag(B) + this.tagEndChar;
      else return this.indentate(I) + "<" + B + Q + ">" + G + "</" + B + this.tagEndChar
    }
  };
  _L.prototype.replaceEntitiesValue = function(A) {
    if (A && A.length > 0 && this.options.processEntities)
      for (let B = 0; B < this.options.entities.length; B++) {
        let Q = this.options.entities[B];
        A = A.replace(Q.regex, Q.val)
      }
    return A
  };

  function DZ4(A) {
    return this.options.indentBy.repeat(A)
  }

  function YZ4(A) {
    if (A.startsWith(this.options.attributeNamePrefix) && A !== this.options.textNodeName) return A.substr(this.attrPrefixLen);
    else return !1
  }
  _sA.exports = _L
})
// @from(Start 3316386, End 3316550)
ksA = z((M78, ysA) => {
  var WZ4 = Mj1(),
    JZ4 = LsA(),
    FZ4 = jsA();
  ysA.exports = {
    XMLParser: JZ4,
    XMLValidator: WZ4,
    XMLBuilder: FZ4
  }
})
// @from(Start 3316556, End 3321629)
hsA = z((L78, gsA) => {
  var {
    defineProperty: D71,
    getOwnPropertyDescriptor: XZ4,
    getOwnPropertyNames: VZ4
  } = Object, CZ4 = Object.prototype.hasOwnProperty, fY = (A, B) => D71(A, "name", {
    value: B,
    configurable: !0
  }), KZ4 = (A, B) => {
    for (var Q in B) D71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, HZ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of VZ4(B))
        if (!CZ4.call(A, G) && G !== Q) D71(A, G, {
          get: () => B[G],
          enumerable: !(I = XZ4(B, G)) || I.enumerable
        })
    }
    return A
  }, zZ4 = (A) => HZ4(D71({}, "__esModule", {
    value: !0
  }), A), xsA = {};
  KZ4(xsA, {
    _toBool: () => EZ4,
    _toNum: () => UZ4,
    _toStr: () => wZ4,
    awsExpectUnion: () => $Z4,
    loadRestJsonErrorCode: () => LZ4,
    loadRestXmlErrorCode: () => PZ4,
    parseJsonBody: () => vsA,
    parseJsonErrorBody: () => MZ4,
    parseXmlBody: () => bsA,
    parseXmlErrorBody: () => TZ4
  });
  gsA.exports = zZ4(xsA);
  var wZ4 = fY((A) => {
      if (A == null) return A;
      if (typeof A === "number" || typeof A === "bigint") {
        let B = new Error(`Received number ${A} where a string was expected.`);
        return B.name = "Warning", console.warn(B), String(A)
      }
      if (typeof A === "boolean") {
        let B = new Error(`Received boolean ${A} where a string was expected.`);
        return B.name = "Warning", console.warn(B), String(A)
      }
      return A
    }, "_toStr"),
    EZ4 = fY((A) => {
      if (A == null) return A;
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (A !== "" && B !== "false" && B !== "true") {
          let Q = new Error(`Received string "${A}" where a boolean was expected.`);
          Q.name = "Warning", console.warn(Q)
        }
        return A !== "" && B !== "false"
      }
      return A
    }, "_toBool"),
    UZ4 = fY((A) => {
      if (A == null) return A;
      if (typeof A === "string") {
        let B = Number(A);
        if (B.toString() !== A) {
          let Q = new Error(`Received string "${A}" where a number was expected.`);
          return Q.name = "Warning", console.warn(Q), A
        }
        return B
      }
      return A
    }, "_toNum"),
    NZ4 = G71(),
    $Z4 = fY((A) => {
      if (A == null) return;
      if (typeof A === "object" && "__type" in A) delete A.__type;
      return NZ4.expectUnion(A)
    }, "awsExpectUnion"),
    qZ4 = G71(),
    fsA = fY((A, B) => qZ4.collectBody(A, B).then((Q) => B.utf8Encoder(Q)), "collectBodyString"),
    vsA = fY((A, B) => fsA(A, B).then((Q) => {
      if (Q.length) try {
        return JSON.parse(Q)
      } catch (I) {
        if (I?.name === "SyntaxError") Object.defineProperty(I, "$responseBodyText", {
          value: Q
        });
        throw I
      }
      return {}
    }), "parseJsonBody"),
    MZ4 = fY(async (A, B) => {
      let Q = await vsA(A, B);
      return Q.message = Q.message ?? Q.Message, Q
    }, "parseJsonErrorBody"),
    LZ4 = fY((A, B) => {
      let Q = fY((Z, D) => Object.keys(Z).find((Y) => Y.toLowerCase() === D.toLowerCase()), "findKey"),
        I = fY((Z) => {
          let D = Z;
          if (typeof D === "number") D = D.toString();
          if (D.indexOf(",") >= 0) D = D.split(",")[0];
          if (D.indexOf(":") >= 0) D = D.split(":")[0];
          if (D.indexOf("#") >= 0) D = D.split("#")[1];
          return D
        }, "sanitizeErrorCode"),
        G = Q(A.headers, "x-amzn-errortype");
      if (G !== void 0) return I(A.headers[G]);
      if (B.code !== void 0) return I(B.code);
      if (B.__type !== void 0) return I(B.__type)
    }, "loadRestJsonErrorCode"),
    RZ4 = G71(),
    OZ4 = ksA(),
    bsA = fY((A, B) => fsA(A, B).then((Q) => {
      if (Q.length) {
        let I = new OZ4.XMLParser({
          attributeNamePrefix: "",
          htmlEntities: !0,
          ignoreAttributes: !1,
          ignoreDeclaration: !0,
          parseTagValue: !1,
          trimValues: !1,
          tagValueProcessor: fY((W, J) => J.trim() === "" && J.includes(`
`) ? "" : void 0, "tagValueProcessor")
        });
        I.addEntity("#xD", "\r"), I.addEntity("#10", `
`);
        let G;
        try {
          G = I.parse(Q, !0)
        } catch (W) {
          if (W && typeof W === "object") Object.defineProperty(W, "$responseBodyText", {
            value: Q
          });
          throw W
        }
        let Z = "#text",
          D = Object.keys(G)[0],
          Y = G[D];
        if (Y[Z]) Y[D] = Y[Z], delete Y[Z];
        return RZ4.getValueFromTextNode(Y)
      }
      return {}
    }), "parseXmlBody"),
    TZ4 = fY(async (A, B) => {
      let Q = await bsA(A, B);
      if (Q.Error) Q.Error.message = Q.Error.message ?? Q.Error.Message;
      return Q
    }, "parseXmlErrorBody"),
    PZ4 = fY((A, B) => {
      if (B?.Error?.Code !== void 0) return B.Error.Code;
      if (B?.Code !== void 0) return B.Code;
      if (A.statusCode == 404) return "NotFound"
    }, "loadRestXmlErrorCode")
})
// @from(Start 3321635, End 3321828)
IB = z((Ba) => {
  Object.defineProperty(Ba, "__esModule", {
    value: !0
  });
  var Oj1 = $nA();
  Oj1.__exportStar(NC(), Ba);
  Oj1.__exportStar(yaA(), Ba);
  Oj1.__exportStar(hsA(), Ba)
})
// @from(Start 3321834, End 3327434)
jL = z((O78, osA) => {
  var {
    defineProperty: W71,
    getOwnPropertyDescriptor: SZ4,
    getOwnPropertyNames: _Z4
  } = Object, jZ4 = Object.prototype.hasOwnProperty, JN = (A, B) => W71(A, "name", {
    value: B,
    configurable: !0
  }), yZ4 = (A, B) => {
    for (var Q in B) W71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, kZ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of _Z4(B))
        if (!jZ4.call(A, G) && G !== Q) W71(A, G, {
          get: () => B[G],
          enumerable: !(I = SZ4(B, G)) || I.enumerable
        })
    }
    return A
  }, xZ4 = (A) => kZ4(W71({}, "__esModule", {
    value: !0
  }), A), psA = {};
  yZ4(psA, {
    DEFAULT_UA_APP_ID: () => csA,
    getUserAgentMiddlewareOptions: () => rsA,
    getUserAgentPlugin: () => uZ4,
    resolveUserAgentConfig: () => isA,
    userAgentMiddleware: () => ssA
  });
  osA.exports = xZ4(psA);
  var fZ4 = NI(),
    csA = void 0;

  function lsA(A) {
    if (A === void 0) return !0;
    return typeof A === "string" && A.length <= 50
  }
  JN(lsA, "isValidUserAgentAppId");

  function isA(A) {
    let B = fZ4.normalizeProvider(A.userAgentAppId ?? csA),
      {
        customUserAgent: Q
      } = A;
    return Object.assign(A, {
      customUserAgent: typeof Q === "string" ? [
        [Q]
      ] : Q,
      userAgentAppId: JN(async () => {
        let I = await B();
        if (!lsA(I)) {
          let G = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console : A.logger;
          if (typeof I !== "string") G?.warn("userAgentAppId must be a string or undefined.");
          else if (I.length > 50) G?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.")
        }
        return I
      }, "userAgentAppId")
    })
  }
  JN(isA, "resolveUserAgentConfig");
  var vZ4 = RL(),
    bZ4 = iiA(),
    gz = IB(),
    gZ4 = /\d{12}\.ddb/;
  async function nsA(A, B, Q) {
    if (Q.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") gz.setFeature(A, "PROTOCOL_RPC_V2_CBOR", "M");
    if (typeof B.retryStrategy === "function") {
      let Z = await B.retryStrategy();
      if (typeof Z.acquireInitialRetryToken === "function")
        if (Z.constructor?.name?.includes("Adaptive")) gz.setFeature(A, "RETRY_MODE_ADAPTIVE", "F");
        else gz.setFeature(A, "RETRY_MODE_STANDARD", "E");
      else gz.setFeature(A, "RETRY_MODE_LEGACY", "D")
    }
    if (typeof B.accountIdEndpointMode === "function") {
      let Z = A.endpointV2;
      if (String(Z?.url?.hostname).match(gZ4)) gz.setFeature(A, "ACCOUNT_ID_ENDPOINT", "O");
      switch (await B.accountIdEndpointMode?.()) {
        case "disabled":
          gz.setFeature(A, "ACCOUNT_ID_MODE_DISABLED", "Q");
          break;
        case "preferred":
          gz.setFeature(A, "ACCOUNT_ID_MODE_PREFERRED", "P");
          break;
        case "required":
          gz.setFeature(A, "ACCOUNT_ID_MODE_REQUIRED", "R");
          break
      }
    }
    let G = A.__smithy_context?.selectedHttpAuthScheme?.identity;
    if (G?.$source) {
      let Z = G;
      if (Z.accountId) gz.setFeature(A, "RESOLVED_ACCOUNT_ID", "T");
      for (let [D, Y] of Object.entries(Z.$source ?? {})) gz.setFeature(A, D, Y)
    }
  }
  JN(nsA, "checkFeatures");
  var msA = "user-agent",
    Tj1 = "x-amz-user-agent",
    dsA = " ",
    Pj1 = "/",
    hZ4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g,
    mZ4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g,
    usA = "-",
    dZ4 = 1024;

  function asA(A) {
    let B = "";
    for (let Q in A) {
      let I = A[Q];
      if (B.length + I.length + 1 <= dZ4) {
        if (B.length) B += "," + I;
        else B += I;
        continue
      }
      break
    }
    return B
  }
  JN(asA, "encodeFeatures");
  var ssA = JN((A) => (B, Q) => async (I) => {
      let {
        request: G
      } = I;
      if (!bZ4.HttpRequest.isInstance(G)) return B(I);
      let {
        headers: Z
      } = G, D = Q?.userAgent?.map(Y71) || [], Y = (await A.defaultUserAgentProvider()).map(Y71);
      await nsA(Q, A, I);
      let W = Q;
      Y.push(`m/${asA(Object.assign({},Q.__smithy_context?.features,W.__aws_sdk_context?.features))}`);
      let J = A?.customUserAgent?.map(Y71) || [],
        F = await A.userAgentAppId();
      if (F) Y.push(Y71([`app/${F}`]));
      let X = vZ4.getUserAgentPrefix(),
        V = (X ? [X] : []).concat([...Y, ...D, ...J]).join(dsA),
        C = [...Y.filter((K) => K.startsWith("aws-sdk-")), ...J].join(dsA);
      if (A.runtime !== "browser") {
        if (C) Z[Tj1] = Z[Tj1] ? `${Z[msA]} ${C}` : C;
        Z[msA] = V
      } else Z[Tj1] = V;
      return B({
        ...I,
        request: G
      })
    }, "userAgentMiddleware"),
    Y71 = JN((A) => {
      let B = A[0].split(Pj1).map((D) => D.replace(hZ4, usA)).join(Pj1),
        Q = A[1]?.replace(mZ4, usA),
        I = B.indexOf(Pj1),
        G = B.substring(0, I),
        Z = B.substring(I + 1);
      if (G === "api") Z = Z.toLowerCase();
      return [G, Z, Q].filter((D) => D && D.length > 0).reduce((D, Y, W) => {
        switch (W) {
          case 0:
            return Y;
          case 1:
            return `${D}/${Y}`;
          default:
            return `${D}#${Y}`
        }
      }, "")
    }, "escapeUserAgent"),
    rsA = {
      name: "getUserAgentMiddleware",
      step: "build",
      priority: "low",
      tags: ["SET_USER_AGENT", "USER_AGENT"],
      override: !0
    },
    uZ4 = JN((A) => ({
      applyToStack: JN((B) => {
        B.add(ssA(A), rsA)
      }, "applyToStack")
    }), "getUserAgentPlugin")
})
// @from(Start 3327440, End 3328886)
QrA = z((T78, BrA) => {
  var {
    defineProperty: J71,
    getOwnPropertyDescriptor: pZ4,
    getOwnPropertyNames: cZ4
  } = Object, lZ4 = Object.prototype.hasOwnProperty, tsA = (A, B) => J71(A, "name", {
    value: B,
    configurable: !0
  }), iZ4 = (A, B) => {
    for (var Q in B) J71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, nZ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of cZ4(B))
        if (!lZ4.call(A, G) && G !== Q) J71(A, G, {
          get: () => B[G],
          enumerable: !(I = pZ4(B, G)) || I.enumerable
        })
    }
    return A
  }, aZ4 = (A) => nZ4(J71({}, "__esModule", {
    value: !0
  }), A), esA = {};
  iZ4(esA, {
    SelectorType: () => ArA,
    booleanSelector: () => sZ4,
    numberSelector: () => rZ4
  });
  BrA.exports = aZ4(esA);
  var sZ4 = tsA((A, B, Q) => {
      if (!(B in A)) return;
      if (A[B] === "true") return !0;
      if (A[B] === "false") return !1;
      throw new Error(`Cannot load ${Q} "${B}". Expected "true" or "false", got ${A[B]}.`)
    }, "booleanSelector"),
    rZ4 = tsA((A, B, Q) => {
      if (!(B in A)) return;
      let I = parseInt(A[B], 10);
      if (Number.isNaN(I)) throw new TypeError(`Cannot load ${Q} '${B}'. Expected number, got '${A[B]}'.`);
      return I
    }, "numberSelector"),
    ArA = ((A) => {
      return A.ENV = "env", A.CONFIG = "shared config entry", A
    })(ArA || {})
})
// @from(Start 3328892, End 3335616)
_D = z((P78, CrA) => {
  var {
    defineProperty: X71,
    getOwnPropertyDescriptor: oZ4,
    getOwnPropertyNames: tZ4
  } = Object, eZ4 = Object.prototype.hasOwnProperty, $C = (A, B) => X71(A, "name", {
    value: B,
    configurable: !0
  }), AD4 = (A, B) => {
    for (var Q in B) X71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, BD4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of tZ4(B))
        if (!eZ4.call(A, G) && G !== Q) X71(A, G, {
          get: () => B[G],
          enumerable: !(I = oZ4(B, G)) || I.enumerable
        })
    }
    return A
  }, QD4 = (A) => BD4(X71({}, "__esModule", {
    value: !0
  }), A), ZrA = {};
  AD4(ZrA, {
    CONFIG_USE_DUALSTACK_ENDPOINT: () => YrA,
    CONFIG_USE_FIPS_ENDPOINT: () => JrA,
    DEFAULT_USE_DUALSTACK_ENDPOINT: () => ID4,
    DEFAULT_USE_FIPS_ENDPOINT: () => ZD4,
    ENV_USE_DUALSTACK_ENDPOINT: () => DrA,
    ENV_USE_FIPS_ENDPOINT: () => WrA,
    NODE_REGION_CONFIG_FILE_OPTIONS: () => XD4,
    NODE_REGION_CONFIG_OPTIONS: () => FD4,
    NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => GD4,
    NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => DD4,
    REGION_ENV_NAME: () => FrA,
    REGION_INI_NAME: () => XrA,
    getRegionInfo: () => zD4,
    resolveCustomEndpointsConfig: () => YD4,
    resolveEndpointsConfig: () => JD4,
    resolveRegionConfig: () => VD4
  });
  CrA.exports = QD4(ZrA);
  var yL = QrA(),
    DrA = "AWS_USE_DUALSTACK_ENDPOINT",
    YrA = "use_dualstack_endpoint",
    ID4 = !1,
    GD4 = {
      environmentVariableSelector: (A) => yL.booleanSelector(A, DrA, yL.SelectorType.ENV),
      configFileSelector: (A) => yL.booleanSelector(A, YrA, yL.SelectorType.CONFIG),
      default: !1
    },
    WrA = "AWS_USE_FIPS_ENDPOINT",
    JrA = "use_fips_endpoint",
    ZD4 = !1,
    DD4 = {
      environmentVariableSelector: (A) => yL.booleanSelector(A, WrA, yL.SelectorType.ENV),
      configFileSelector: (A) => yL.booleanSelector(A, JrA, yL.SelectorType.CONFIG),
      default: !1
    },
    F71 = ZX(),
    YD4 = $C((A) => {
      let {
        tls: B,
        endpoint: Q,
        urlParser: I,
        useDualstackEndpoint: G
      } = A;
      return Object.assign(A, {
        tls: B ?? !0,
        endpoint: F71.normalizeProvider(typeof Q === "string" ? I(Q) : Q),
        isCustomEndpoint: !0,
        useDualstackEndpoint: F71.normalizeProvider(G ?? !1)
      })
    }, "resolveCustomEndpointsConfig"),
    WD4 = $C(async (A) => {
      let {
        tls: B = !0
      } = A, Q = await A.region();
      if (!new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/).test(Q)) throw new Error("Invalid region in client config");
      let G = await A.useDualstackEndpoint(),
        Z = await A.useFipsEndpoint(),
        {
          hostname: D
        } = await A.regionInfoProvider(Q, {
          useDualstackEndpoint: G,
          useFipsEndpoint: Z
        }) ?? {};
      if (!D) throw new Error("Cannot resolve hostname from client config");
      return A.urlParser(`${B?"https:":"http:"}//${D}`)
    }, "getEndpointFromRegion"),
    JD4 = $C((A) => {
      let B = F71.normalizeProvider(A.useDualstackEndpoint ?? !1),
        {
          endpoint: Q,
          useFipsEndpoint: I,
          urlParser: G,
          tls: Z
        } = A;
      return Object.assign(A, {
        tls: Z ?? !0,
        endpoint: Q ? F71.normalizeProvider(typeof Q === "string" ? G(Q) : Q) : () => WD4({
          ...A,
          useDualstackEndpoint: B,
          useFipsEndpoint: I
        }),
        isCustomEndpoint: !!Q,
        useDualstackEndpoint: B
      })
    }, "resolveEndpointsConfig"),
    FrA = "AWS_REGION",
    XrA = "region",
    FD4 = {
      environmentVariableSelector: (A) => A[FrA],
      configFileSelector: (A) => A[XrA],
      default: () => {
        throw new Error("Region is missing")
      }
    },
    XD4 = {
      preferredFile: "credentials"
    },
    VrA = $C((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
    IrA = $C((A) => VrA(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
    VD4 = $C((A) => {
      let {
        region: B,
        useFipsEndpoint: Q
      } = A;
      if (!B) throw new Error("Region is missing");
      return Object.assign(A, {
        region: async () => {
          if (typeof B === "string") return IrA(B);
          let I = await B();
          return IrA(I)
        },
        useFipsEndpoint: async () => {
          let I = typeof B === "string" ? B : await B();
          if (VrA(I)) return !0;
          return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
        }
      })
    }, "resolveRegionConfig"),
    GrA = $C((A = [], {
      useFipsEndpoint: B,
      useDualstackEndpoint: Q
    }) => A.find(({
      tags: I
    }) => B === I.includes("fips") && Q === I.includes("dualstack"))?.hostname, "getHostnameFromVariants"),
    CD4 = $C((A, {
      regionHostname: B,
      partitionHostname: Q
    }) => B ? B : Q ? Q.replace("{region}", A) : void 0, "getResolvedHostname"),
    KD4 = $C((A, {
      partitionHash: B
    }) => Object.keys(B || {}).find((Q) => B[Q].regions.includes(A)) ?? "aws", "getResolvedPartition"),
    HD4 = $C((A, {
      signingRegion: B,
      regionRegex: Q,
      useFipsEndpoint: I
    }) => {
      if (B) return B;
      else if (I) {
        let G = Q.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\."),
          Z = A.match(G);
        if (Z) return Z[0].slice(1, -1)
      }
    }, "getResolvedSigningRegion"),
    zD4 = $C((A, {
      useFipsEndpoint: B = !1,
      useDualstackEndpoint: Q = !1,
      signingService: I,
      regionHash: G,
      partitionHash: Z
    }) => {
      let D = KD4(A, {
          partitionHash: Z
        }),
        Y = A in G ? A : Z[D]?.endpoint ?? A,
        W = {
          useFipsEndpoint: B,
          useDualstackEndpoint: Q
        },
        J = GrA(G[Y]?.variants, W),
        F = GrA(Z[D]?.variants, W),
        X = CD4(Y, {
          regionHostname: J,
          partitionHostname: F
        });
      if (X === void 0) throw new Error(`Endpoint resolution failed for: ${{resolvedRegion:Y,useFipsEndpoint:B,useDualstackEndpoint:Q}}`);
      let V = HD4(X, {
        signingRegion: G[Y]?.signingRegion,
        regionRegex: Z[D].regionRegex,
        useFipsEndpoint: B
      });
      return {
        partition: D,
        signingService: I,
        hostname: X,
        ...V && {
          signingRegion: V
        },
        ...G[Y]?.signingService && {
          signingService: G[Y].signingService
        }
      }
    }, "getRegionInfo")
})
// @from(Start 3335622, End 3338405)
MrA = z((S78, qrA) => {
  var {
    defineProperty: V71,
    getOwnPropertyDescriptor: wD4,
    getOwnPropertyNames: ED4
  } = Object, UD4 = Object.prototype.hasOwnProperty, C71 = (A, B) => V71(A, "name", {
    value: B,
    configurable: !0
  }), ND4 = (A, B) => {
    for (var Q in B) V71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, $D4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of ED4(B))
        if (!UD4.call(A, G) && G !== Q) V71(A, G, {
          get: () => B[G],
          enumerable: !(I = wD4(B, G)) || I.enumerable
        })
    }
    return A
  }, qD4 = (A) => $D4(V71({}, "__esModule", {
    value: !0
  }), A), KrA = {};
  ND4(KrA, {
    AlgorithmId: () => ErA,
    EndpointURLScheme: () => wrA,
    FieldPosition: () => UrA,
    HttpApiKeyAuthLocation: () => zrA,
    HttpAuthLocation: () => HrA,
    IniSectionType: () => NrA,
    RequestHandlerProtocol: () => $rA,
    SMITHY_CONTEXT_KEY: () => TD4,
    getDefaultClientConfiguration: () => RD4,
    resolveDefaultRuntimeConfig: () => OD4
  });
  qrA.exports = qD4(KrA);
  var HrA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(HrA || {}),
    zrA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(zrA || {}),
    wrA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(wrA || {}),
    ErA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(ErA || {}),
    MD4 = C71((A) => {
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
    LD4 = C71((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    RD4 = C71((A) => {
      return MD4(A)
    }, "getDefaultClientConfiguration"),
    OD4 = C71((A) => {
      return LD4(A)
    }, "resolveDefaultRuntimeConfig"),
    UrA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(UrA || {}),
    TD4 = "__smithy_context",
    NrA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(NrA || {}),
    $rA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })($rA || {})
})
// @from(Start 3338411, End 3342918)
SrA = z((_78, PrA) => {
  var {
    defineProperty: K71,
    getOwnPropertyDescriptor: PD4,
    getOwnPropertyNames: SD4
  } = Object, _D4 = Object.prototype.hasOwnProperty, kL = (A, B) => K71(A, "name", {
    value: B,
    configurable: !0
  }), jD4 = (A, B) => {
    for (var Q in B) K71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, yD4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of SD4(B))
        if (!_D4.call(A, G) && G !== Q) K71(A, G, {
          get: () => B[G],
          enumerable: !(I = PD4(B, G)) || I.enumerable
        })
    }
    return A
  }, kD4 = (A) => yD4(K71({}, "__esModule", {
    value: !0
  }), A), LrA = {};
  jD4(LrA, {
    Field: () => vD4,
    Fields: () => bD4,
    HttpRequest: () => gD4,
    HttpResponse: () => hD4,
    IHttpRequest: () => RrA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => xD4,
    isValidHostname: () => TrA,
    resolveHttpHandlerRuntimeConfig: () => fD4
  });
  PrA.exports = kD4(LrA);
  var xD4 = kL((A) => {
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
    fD4 = kL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    RrA = MrA(),
    vD4 = class {
      static {
        kL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = RrA.FieldPosition.HEADER,
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
    bD4 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        kL(this, "Fields")
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
    gD4 = class A {
      static {
        kL(this, "HttpRequest")
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
        if (Q.query) Q.query = OrA(Q.query);
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

  function OrA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  kL(OrA, "cloneQuery");
  var hD4 = class {
    static {
      kL(this, "HttpResponse")
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

  function TrA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  kL(TrA, "isValidHostname")
})
// @from(Start 3342924, End 3344678)
tS = z((x78, xrA) => {
  var {
    defineProperty: H71,
    getOwnPropertyDescriptor: mD4,
    getOwnPropertyNames: dD4
  } = Object, uD4 = Object.prototype.hasOwnProperty, jrA = (A, B) => H71(A, "name", {
    value: B,
    configurable: !0
  }), pD4 = (A, B) => {
    for (var Q in B) H71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, cD4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of dD4(B))
        if (!uD4.call(A, G) && G !== Q) H71(A, G, {
          get: () => B[G],
          enumerable: !(I = mD4(B, G)) || I.enumerable
        })
    }
    return A
  }, lD4 = (A) => cD4(H71({}, "__esModule", {
    value: !0
  }), A), yrA = {};
  pD4(yrA, {
    contentLengthMiddleware: () => Sj1,
    contentLengthMiddlewareOptions: () => krA,
    getContentLengthPlugin: () => nD4
  });
  xrA.exports = lD4(yrA);
  var iD4 = SrA(),
    _rA = "content-length";

  function Sj1(A) {
    return (B) => async (Q) => {
      let I = Q.request;
      if (iD4.HttpRequest.isInstance(I)) {
        let {
          body: G,
          headers: Z
        } = I;
        if (G && Object.keys(Z).map((D) => D.toLowerCase()).indexOf(_rA) === -1) try {
          let D = A(G);
          I.headers = {
            ...I.headers,
            [_rA]: String(D)
          }
        } catch (D) {}
      }
      return B({
        ...Q,
        request: I
      })
    }
  }
  jrA(Sj1, "contentLengthMiddleware");
  var krA = {
      step: "build",
      tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
      name: "contentLengthMiddleware",
      override: !0
    },
    nD4 = jrA((A) => ({
      applyToStack: (B) => {
        B.add(Sj1(A.bodyLengthChecker), krA)
      }
    }), "getContentLengthPlugin")
})
// @from(Start 3344684, End 3345316)
zb = z((frA) => {
  Object.defineProperty(frA, "__esModule", {
    value: !0
  });
  frA.getHomeDir = void 0;
  var aD4 = Z1("os"),
    sD4 = Z1("path"),
    _j1 = {},
    rD4 = () => {
      if (process && process.geteuid) return `${process.geteuid()}`;
      return "DEFAULT"
    },
    oD4 = () => {
      let {
        HOME: A,
        USERPROFILE: B,
        HOMEPATH: Q,
        HOMEDRIVE: I = `C:${sD4.sep}`
      } = process.env;
      if (A) return A;
      if (B) return B;
      if (Q) return `${I}${Q}`;
      let G = rD4();
      if (!_j1[G]) _j1[G] = aD4.homedir();
      return _j1[G]
    };
  frA.getHomeDir = oD4
})
// @from(Start 3345322, End 3345705)
jj1 = z((brA) => {
  Object.defineProperty(brA, "__esModule", {
    value: !0
  });
  brA.getSSOTokenFilepath = void 0;
  var tD4 = Z1("crypto"),
    eD4 = Z1("path"),
    AY4 = zb(),
    BY4 = (A) => {
      let Q = tD4.createHash("sha1").update(A).digest("hex");
      return eD4.join(AY4.getHomeDir(), ".aws", "sso", "cache", `${Q}.json`)
    };
  brA.getSSOTokenFilepath = BY4
})
// @from(Start 3345711, End 3346087)
drA = z((hrA) => {
  Object.defineProperty(hrA, "__esModule", {
    value: !0
  });
  hrA.getSSOTokenFromFile = void 0;
  var QY4 = Z1("fs"),
    IY4 = jj1(),
    {
      readFile: GY4
    } = QY4.promises,
    ZY4 = async (A) => {
      let B = IY4.getSSOTokenFilepath(A),
        Q = await GY4(B, "utf8");
      return JSON.parse(Q)
    };
  hrA.getSSOTokenFromFile = ZY4
})
// @from(Start 3346093, End 3348876)
orA = z((g78, rrA) => {
  var {
    defineProperty: z71,
    getOwnPropertyDescriptor: DY4,
    getOwnPropertyNames: YY4
  } = Object, WY4 = Object.prototype.hasOwnProperty, w71 = (A, B) => z71(A, "name", {
    value: B,
    configurable: !0
  }), JY4 = (A, B) => {
    for (var Q in B) z71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, FY4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of YY4(B))
        if (!WY4.call(A, G) && G !== Q) z71(A, G, {
          get: () => B[G],
          enumerable: !(I = DY4(B, G)) || I.enumerable
        })
    }
    return A
  }, XY4 = (A) => FY4(z71({}, "__esModule", {
    value: !0
  }), A), urA = {};
  JY4(urA, {
    AlgorithmId: () => irA,
    EndpointURLScheme: () => lrA,
    FieldPosition: () => nrA,
    HttpApiKeyAuthLocation: () => crA,
    HttpAuthLocation: () => prA,
    IniSectionType: () => arA,
    RequestHandlerProtocol: () => srA,
    SMITHY_CONTEXT_KEY: () => zY4,
    getDefaultClientConfiguration: () => KY4,
    resolveDefaultRuntimeConfig: () => HY4
  });
  rrA.exports = XY4(urA);
  var prA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(prA || {}),
    crA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(crA || {}),
    lrA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(lrA || {}),
    irA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(irA || {}),
    VY4 = w71((A) => {
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
    CY4 = w71((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    KY4 = w71((A) => {
      return VY4(A)
    }, "getDefaultClientConfiguration"),
    HY4 = w71((A) => {
      return CY4(A)
    }, "resolveDefaultRuntimeConfig"),
    nrA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(nrA || {}),
    zY4 = "__smithy_context",
    arA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(arA || {}),
    srA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(srA || {})
})
// @from(Start 3348882, End 3349250)
kj1 = z((trA) => {
  Object.defineProperty(trA, "__esModule", {
    value: !0
  });
  trA.slurpFile = void 0;
  var wY4 = Z1("fs"),
    {
      readFile: EY4
    } = wY4.promises,
    yj1 = {},
    UY4 = (A, B) => {
      if (!yj1[A] || (B === null || B === void 0 ? void 0 : B.ignoreCache)) yj1[A] = EY4(A, "utf8");
      return yj1[A]
    };
  trA.slurpFile = UY4
})
// @from(Start 3349256, End 3353948)
xL = z((m78, Ia) => {
  var {
    defineProperty: N71,
    getOwnPropertyDescriptor: NY4,
    getOwnPropertyNames: $Y4
  } = Object, qY4 = Object.prototype.hasOwnProperty, YX = (A, B) => N71(A, "name", {
    value: B,
    configurable: !0
  }), MY4 = (A, B) => {
    for (var Q in B) N71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, xj1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of $Y4(B))
        if (!qY4.call(A, G) && G !== Q) N71(A, G, {
          get: () => B[G],
          enumerable: !(I = NY4(B, G)) || I.enumerable
        })
    }
    return A
  }, vj1 = (A, B, Q) => (xj1(A, B, "default"), Q && xj1(Q, B, "default")), LY4 = (A) => xj1(N71({}, "__esModule", {
    value: !0
  }), A), Qa = {};
  MY4(Qa, {
    CONFIG_PREFIX_SEPARATOR: () => eS,
    DEFAULT_PROFILE: () => IoA,
    ENV_PROFILE: () => QoA,
    getProfileName: () => RY4,
    loadSharedConfigFiles: () => ZoA,
    loadSsoSessionData: () => gY4,
    parseKnownFiles: () => mY4
  });
  Ia.exports = LY4(Qa);
  vj1(Qa, zb(), Ia.exports);
  var QoA = "AWS_PROFILE",
    IoA = "default",
    RY4 = YX((A) => A.profile || process.env[QoA] || IoA, "getProfileName");
  vj1(Qa, jj1(), Ia.exports);
  vj1(Qa, drA(), Ia.exports);
  var E71 = orA(),
    OY4 = YX((A) => Object.entries(A).filter(([B]) => {
      let Q = B.indexOf(eS);
      if (Q === -1) return !1;
      return Object.values(E71.IniSectionType).includes(B.substring(0, Q))
    }).reduce((B, [Q, I]) => {
      let G = Q.indexOf(eS),
        Z = Q.substring(0, G) === E71.IniSectionType.PROFILE ? Q.substring(G + 1) : Q;
      return B[Z] = I, B
    }, {
      ...A.default && {
        default: A.default
      }
    }), "getConfigData"),
    U71 = Z1("path"),
    TY4 = zb(),
    PY4 = "AWS_CONFIG_FILE",
    GoA = YX(() => process.env[PY4] || U71.join(TY4.getHomeDir(), ".aws", "config"), "getConfigFilepath"),
    SY4 = zb(),
    _Y4 = "AWS_SHARED_CREDENTIALS_FILE",
    jY4 = YX(() => process.env[_Y4] || U71.join(SY4.getHomeDir(), ".aws", "credentials"), "getCredentialsFilepath"),
    yY4 = zb(),
    kY4 = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/,
    xY4 = ["__proto__", "profile __proto__"],
    fj1 = YX((A) => {
      let B = {},
        Q, I;
      for (let G of A.split(/\r?\n/)) {
        let Z = G.split(/(^|\s)[;#]/)[0].trim();
        if (Z[0] === "[" && Z[Z.length - 1] === "]") {
          Q = void 0, I = void 0;
          let Y = Z.substring(1, Z.length - 1),
            W = kY4.exec(Y);
          if (W) {
            let [, J, , F] = W;
            if (Object.values(E71.IniSectionType).includes(J)) Q = [J, F].join(eS)
          } else Q = Y;
          if (xY4.includes(Y)) throw new Error(`Found invalid profile name "${Y}"`)
        } else if (Q) {
          let Y = Z.indexOf("=");
          if (![0, -1].includes(Y)) {
            let [W, J] = [Z.substring(0, Y).trim(), Z.substring(Y + 1).trim()];
            if (J === "") I = W;
            else {
              if (I && G.trimStart() === G) I = void 0;
              B[Q] = B[Q] || {};
              let F = I ? [I, W].join(eS) : W;
              B[Q][F] = J
            }
          }
        }
      }
      return B
    }, "parseIni"),
    AoA = kj1(),
    BoA = YX(() => ({}), "swallowError"),
    eS = ".",
    ZoA = YX(async (A = {}) => {
      let {
        filepath: B = jY4(),
        configFilepath: Q = GoA()
      } = A, I = yY4.getHomeDir(), G = "~/", Z = B;
      if (B.startsWith("~/")) Z = U71.join(I, B.slice(2));
      let D = Q;
      if (Q.startsWith("~/")) D = U71.join(I, Q.slice(2));
      let Y = await Promise.all([AoA.slurpFile(D, {
        ignoreCache: A.ignoreCache
      }).then(fj1).then(OY4).catch(BoA), AoA.slurpFile(Z, {
        ignoreCache: A.ignoreCache
      }).then(fj1).catch(BoA)]);
      return {
        configFile: Y[0],
        credentialsFile: Y[1]
      }
    }, "loadSharedConfigFiles"),
    fY4 = YX((A) => Object.entries(A).filter(([B]) => B.startsWith(E71.IniSectionType.SSO_SESSION + eS)).reduce((B, [Q, I]) => ({
      ...B,
      [Q.substring(Q.indexOf(eS) + 1)]: I
    }), {}), "getSsoSessionData"),
    vY4 = kj1(),
    bY4 = YX(() => ({}), "swallowError"),
    gY4 = YX(async (A = {}) => vY4.slurpFile(A.configFilepath ?? GoA()).then(fj1).then(fY4).catch(bY4), "loadSsoSessionData"),
    hY4 = YX((...A) => {
      let B = {};
      for (let Q of A)
        for (let [I, G] of Object.entries(Q))
          if (B[I] !== void 0) Object.assign(B[I], G);
          else B[I] = G;
      return B
    }, "mergeConfigFiles"),
    mY4 = YX(async (A) => {
      let B = await ZoA(A);
      return hY4(B.configFile, B.credentialsFile)
    }, "parseKnownFiles")
})
// @from(Start 3353954, End 3356450)
qC = z((d78, WoA) => {
  var {
    defineProperty: $71,
    getOwnPropertyDescriptor: dY4,
    getOwnPropertyNames: uY4
  } = Object, pY4 = Object.prototype.hasOwnProperty, wb = (A, B) => $71(A, "name", {
    value: B,
    configurable: !0
  }), cY4 = (A, B) => {
    for (var Q in B) $71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, lY4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of uY4(B))
        if (!pY4.call(A, G) && G !== Q) $71(A, G, {
          get: () => B[G],
          enumerable: !(I = dY4(B, G)) || I.enumerable
        })
    }
    return A
  }, iY4 = (A) => lY4($71({}, "__esModule", {
    value: !0
  }), A), YoA = {};
  cY4(YoA, {
    loadConfig: () => oY4
  });
  WoA.exports = iY4(YoA);
  var Ga = $I();

  function bj1(A) {
    try {
      let B = new Set(Array.from(A.match(/([A-Z_]){3,}/g) ?? []));
      return B.delete("CONFIG"), B.delete("CONFIG_PREFIX_SEPARATOR"), B.delete("ENV"), [...B].join(", ")
    } catch (B) {
      return A
    }
  }
  wb(bj1, "getSelectorName");
  var nY4 = wb((A, B) => async () => {
      try {
        let Q = A(process.env);
        if (Q === void 0) throw new Error;
        return Q
      } catch (Q) {
        throw new Ga.CredentialsProviderError(Q.message || `Not found in ENV: ${bj1(A.toString())}`, {
          logger: B
        })
      }
    }, "fromEnv"),
    DoA = xL(),
    aY4 = wb((A, {
      preferredFile: B = "config",
      ...Q
    } = {}) => async () => {
      let I = DoA.getProfileName(Q),
        {
          configFile: G,
          credentialsFile: Z
        } = await DoA.loadSharedConfigFiles(Q),
        D = Z[I] || {},
        Y = G[I] || {},
        W = B === "config" ? {
          ...D,
          ...Y
        } : {
          ...Y,
          ...D
        };
      try {
        let F = A(W, B === "config" ? G : Z);
        if (F === void 0) throw new Error;
        return F
      } catch (J) {
        throw new Ga.CredentialsProviderError(J.message || `Not found in config files w/ profile [${I}]: ${bj1(A.toString())}`, {
          logger: Q.logger
        })
      }
    }, "fromSharedConfigFiles"),
    sY4 = wb((A) => typeof A === "function", "isFunction"),
    rY4 = wb((A) => sY4(A) ? async () => await A(): Ga.fromStatic(A), "fromStatic"),
    oY4 = wb(({
      environmentVariableSelector: A,
      configFileSelector: B,
      default: Q
    }, I = {}) => Ga.memoize(Ga.chain(nY4(A), aY4(B, I), rY4(Q))), "loadConfig")
})
// @from(Start 3356456, End 3357405)
KoA = z((VoA) => {
  Object.defineProperty(VoA, "__esModule", {
    value: !0
  });
  VoA.getEndpointUrlConfig = void 0;
  var JoA = xL(),
    FoA = "AWS_ENDPOINT_URL",
    XoA = "endpoint_url",
    tY4 = (A) => ({
      environmentVariableSelector: (B) => {
        let Q = A.split(" ").map((Z) => Z.toUpperCase()),
          I = B[[FoA, ...Q].join("_")];
        if (I) return I;
        let G = B[FoA];
        if (G) return G;
        return
      },
      configFileSelector: (B, Q) => {
        if (Q && B.services) {
          let G = Q[["services", B.services].join(JoA.CONFIG_PREFIX_SEPARATOR)];
          if (G) {
            let Z = A.split(" ").map((Y) => Y.toLowerCase()),
              D = G[[Z.join("_"), XoA].join(JoA.CONFIG_PREFIX_SEPARATOR)];
            if (D) return D
          }
        }
        let I = B[XoA];
        if (I) return I;
        return
      },
      default: void 0
    });
  VoA.getEndpointUrlConfig = tY4
})
// @from(Start 3357411, End 3357708)
gj1 = z((HoA) => {
  Object.defineProperty(HoA, "__esModule", {
    value: !0
  });
  HoA.getEndpointFromConfig = void 0;
  var eY4 = qC(),
    AW4 = KoA(),
    BW4 = async (A) => eY4.loadConfig(AW4.getEndpointUrlConfig(A !== null && A !== void 0 ? A : ""))();
  HoA.getEndpointFromConfig = BW4
})
// @from(Start 3357714, End 3358895)
NoA = z((c78, UoA) => {
  var {
    defineProperty: q71,
    getOwnPropertyDescriptor: QW4,
    getOwnPropertyNames: IW4
  } = Object, GW4 = Object.prototype.hasOwnProperty, ZW4 = (A, B) => q71(A, "name", {
    value: B,
    configurable: !0
  }), DW4 = (A, B) => {
    for (var Q in B) q71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, YW4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of IW4(B))
        if (!GW4.call(A, G) && G !== Q) q71(A, G, {
          get: () => B[G],
          enumerable: !(I = QW4(B, G)) || I.enumerable
        })
    }
    return A
  }, WW4 = (A) => YW4(q71({}, "__esModule", {
    value: !0
  }), A), woA = {};
  DW4(woA, {
    parseQueryString: () => EoA
  });
  UoA.exports = WW4(woA);

  function EoA(A) {
    let B = {};
    if (A = A.replace(/^\?/, ""), A)
      for (let Q of A.split("&")) {
        let [I, G = null] = Q.split("=");
        if (I = decodeURIComponent(I), G) G = decodeURIComponent(G);
        if (!(I in B)) B[I] = G;
        else if (Array.isArray(B[I])) B[I].push(G);
        else B[I] = [B[I], G]
      }
    return B
  }
  ZW4(EoA, "parseQueryString")
})
// @from(Start 3358901, End 3360106)
FN = z((l78, MoA) => {
  var {
    defineProperty: M71,
    getOwnPropertyDescriptor: JW4,
    getOwnPropertyNames: FW4
  } = Object, XW4 = Object.prototype.hasOwnProperty, VW4 = (A, B) => M71(A, "name", {
    value: B,
    configurable: !0
  }), CW4 = (A, B) => {
    for (var Q in B) M71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, KW4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of FW4(B))
        if (!XW4.call(A, G) && G !== Q) M71(A, G, {
          get: () => B[G],
          enumerable: !(I = JW4(B, G)) || I.enumerable
        })
    }
    return A
  }, HW4 = (A) => KW4(M71({}, "__esModule", {
    value: !0
  }), A), $oA = {};
  CW4($oA, {
    parseUrl: () => qoA
  });
  MoA.exports = HW4($oA);
  var zW4 = NoA(),
    qoA = VW4((A) => {
      if (typeof A === "string") return qoA(new URL(A));
      let {
        hostname: B,
        pathname: Q,
        port: I,
        protocol: G,
        search: Z
      } = A, D;
      if (Z) D = zW4.parseQueryString(Z);
      return {
        hostname: B,
        port: I ? parseInt(I) : void 0,
        protocol: G,
        path: Q,
        query: D
      }
    }, "parseUrl")
})
// @from(Start 3360112, End 3367113)
hz = z((i78, _oA) => {
  var {
    defineProperty: R71,
    getOwnPropertyDescriptor: wW4,
    getOwnPropertyNames: EW4
  } = Object, UW4 = Object.prototype.hasOwnProperty, MC = (A, B) => R71(A, "name", {
    value: B,
    configurable: !0
  }), NW4 = (A, B) => {
    for (var Q in B) R71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, $W4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of EW4(B))
        if (!UW4.call(A, G) && G !== Q) R71(A, G, {
          get: () => B[G],
          enumerable: !(I = wW4(B, G)) || I.enumerable
        })
    }
    return A
  }, qW4 = (A) => $W4(R71({}, "__esModule", {
    value: !0
  }), A), RoA = {};
  NW4(RoA, {
    endpointMiddleware: () => PoA,
    endpointMiddlewareOptions: () => SoA,
    getEndpointFromInstructions: () => OoA,
    getEndpointPlugin: () => kW4,
    resolveEndpointConfig: () => fW4,
    resolveParams: () => ToA,
    toEndpointV1: () => hj1
  });
  _oA.exports = qW4(RoA);
  var MW4 = MC(async (A) => {
      let B = A?.Bucket || "";
      if (typeof A.Bucket === "string") A.Bucket = B.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
      if (PW4(B)) {
        if (A.ForcePathStyle === !0) throw new Error("Path-style addressing cannot be used with ARN buckets")
      } else if (!TW4(B) || B.indexOf(".") !== -1 && !String(A.Endpoint).startsWith("http:") || B.toLowerCase() !== B || B.length < 3) A.ForcePathStyle = !0;
      if (A.DisableMultiRegionAccessPoints) A.disableMultiRegionAccessPoints = !0, A.DisableMRAP = !0;
      return A
    }, "resolveParamsForS3"),
    LW4 = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/,
    RW4 = /(\d+\.){3}\d+/,
    OW4 = /\.\./,
    TW4 = MC((A) => LW4.test(A) && !RW4.test(A) && !OW4.test(A), "isDnsCompatibleBucketName"),
    PW4 = MC((A) => {
      let [B, Q, I, , , G] = A.split(":"), Z = B === "arn" && A.split(":").length >= 6, D = Boolean(Z && Q && I && G);
      if (Z && !D) throw new Error(`Invalid ARN: ${A} was an invalid ARN.`);
      return D
    }, "isArnBucketName"),
    SW4 = MC((A, B, Q) => {
      let I = MC(async () => {
        let G = Q[A] ?? Q[B];
        if (typeof G === "function") return G();
        return G
      }, "configProvider");
      if (A === "credentialScope" || B === "CredentialScope") return async () => {
        let G = typeof Q.credentials === "function" ? await Q.credentials() : Q.credentials;
        return G?.credentialScope ?? G?.CredentialScope
      };
      if (A === "accountId" || B === "AccountId") return async () => {
        let G = typeof Q.credentials === "function" ? await Q.credentials() : Q.credentials;
        return G?.accountId ?? G?.AccountId
      };
      if (A === "endpoint" || B === "endpoint") return async () => {
        let G = await I();
        if (G && typeof G === "object") {
          if ("url" in G) return G.url.href;
          if ("hostname" in G) {
            let {
              protocol: Z,
              hostname: D,
              port: Y,
              path: W
            } = G;
            return `${Z}//${D}${Y?":"+Y:""}${W}`
          }
        }
        return G
      };
      return I
    }, "createConfigValueProvider"),
    _W4 = gj1(),
    LoA = FN(),
    hj1 = MC((A) => {
      if (typeof A === "object") {
        if ("url" in A) return LoA.parseUrl(A.url);
        return A
      }
      return LoA.parseUrl(A)
    }, "toEndpointV1"),
    OoA = MC(async (A, B, Q, I) => {
      if (!Q.endpoint) {
        let D;
        if (Q.serviceConfiguredEndpoint) D = await Q.serviceConfiguredEndpoint();
        else D = await _W4.getEndpointFromConfig(Q.serviceId);
        if (D) Q.endpoint = () => Promise.resolve(hj1(D))
      }
      let G = await ToA(A, B, Q);
      if (typeof Q.endpointProvider !== "function") throw new Error("config.endpointProvider is not set.");
      return Q.endpointProvider(G, I)
    }, "getEndpointFromInstructions"),
    ToA = MC(async (A, B, Q) => {
      let I = {},
        G = B?.getEndpointParameterInstructions?.() || {};
      for (let [Z, D] of Object.entries(G)) switch (D.type) {
        case "staticContextParams":
          I[Z] = D.value;
          break;
        case "contextParams":
          I[Z] = A[D.name];
          break;
        case "clientContextParams":
        case "builtInParams":
          I[Z] = await SW4(D.name, Z, Q)();
          break;
        case "operationContextParams":
          I[Z] = D.get(A);
          break;
        default:
          throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(D))
      }
      if (Object.keys(G).length === 0) Object.assign(I, Q);
      if (String(Q.serviceId).toLowerCase() === "s3") await MW4(I);
      return I
    }, "resolveParams"),
    jW4 = NI(),
    L71 = ZX(),
    PoA = MC(({
      config: A,
      instructions: B
    }) => {
      return (Q, I) => async (G) => {
        if (A.endpoint) jW4.setFeature(I, "ENDPOINT_OVERRIDE", "N");
        let Z = await OoA(G.input, {
          getEndpointParameterInstructions() {
            return B
          }
        }, {
          ...A
        }, I);
        I.endpointV2 = Z, I.authSchemes = Z.properties?.authSchemes;
        let D = I.authSchemes?.[0];
        if (D) {
          I.signing_region = D.signingRegion, I.signing_service = D.signingName;
          let W = L71.getSmithyContext(I)?.selectedHttpAuthScheme?.httpAuthOption;
          if (W) W.signingProperties = Object.assign(W.signingProperties || {}, {
            signing_region: D.signingRegion,
            signingRegion: D.signingRegion,
            signing_service: D.signingName,
            signingName: D.signingName,
            signingRegionSet: D.signingRegionSet
          }, D.properties)
        }
        return Q({
          ...G
        })
      }
    }, "endpointMiddleware"),
    yW4 = yz(),
    SoA = {
      step: "serialize",
      tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
      name: "endpointV2Middleware",
      override: !0,
      relation: "before",
      toMiddleware: yW4.serializerMiddlewareOption.name
    },
    kW4 = MC((A, B) => ({
      applyToStack: (Q) => {
        Q.addRelativeTo(PoA({
          config: A,
          instructions: B
        }), SoA)
      }
    }), "getEndpointPlugin"),
    xW4 = gj1(),
    fW4 = MC((A) => {
      let B = A.tls ?? !0,
        {
          endpoint: Q,
          useDualstackEndpoint: I,
          useFipsEndpoint: G
        } = A,
        Z = Q != null ? async () => hj1(await L71.normalizeProvider(Q)()): void 0, Y = Object.assign(A, {
          endpoint: Z,
          tls: B,
          isCustomEndpoint: !!Q,
          useDualstackEndpoint: L71.normalizeProvider(I ?? !1),
          useFipsEndpoint: L71.normalizeProvider(G ?? !1)
        }), W = void 0;
      return Y.serviceConfiguredEndpoint = async () => {
        if (A.serviceId && !W) W = xW4.getEndpointFromConfig(A.serviceId);
        return W
      }, Y
    }, "resolveEndpointConfig")
})
// @from(Start 3367119, End 3369902)
mj1 = z((n78, hoA) => {
  var {
    defineProperty: O71,
    getOwnPropertyDescriptor: vW4,
    getOwnPropertyNames: bW4
  } = Object, gW4 = Object.prototype.hasOwnProperty, T71 = (A, B) => O71(A, "name", {
    value: B,
    configurable: !0
  }), hW4 = (A, B) => {
    for (var Q in B) O71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, mW4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of bW4(B))
        if (!gW4.call(A, G) && G !== Q) O71(A, G, {
          get: () => B[G],
          enumerable: !(I = vW4(B, G)) || I.enumerable
        })
    }
    return A
  }, dW4 = (A) => mW4(O71({}, "__esModule", {
    value: !0
  }), A), joA = {};
  hW4(joA, {
    AlgorithmId: () => foA,
    EndpointURLScheme: () => xoA,
    FieldPosition: () => voA,
    HttpApiKeyAuthLocation: () => koA,
    HttpAuthLocation: () => yoA,
    IniSectionType: () => boA,
    RequestHandlerProtocol: () => goA,
    SMITHY_CONTEXT_KEY: () => iW4,
    getDefaultClientConfiguration: () => cW4,
    resolveDefaultRuntimeConfig: () => lW4
  });
  hoA.exports = dW4(joA);
  var yoA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(yoA || {}),
    koA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(koA || {}),
    xoA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(xoA || {}),
    foA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(foA || {}),
    uW4 = T71((A) => {
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
    pW4 = T71((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    cW4 = T71((A) => {
      return uW4(A)
    }, "getDefaultClientConfiguration"),
    lW4 = T71((A) => {
      return pW4(A)
    }, "resolveDefaultRuntimeConfig"),
    voA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(voA || {}),
    iW4 = "__smithy_context",
    boA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(boA || {}),
    goA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(goA || {})
})
// @from(Start 3369908, End 3374415)
loA = z((a78, coA) => {
  var {
    defineProperty: P71,
    getOwnPropertyDescriptor: nW4,
    getOwnPropertyNames: aW4
  } = Object, sW4 = Object.prototype.hasOwnProperty, fL = (A, B) => P71(A, "name", {
    value: B,
    configurable: !0
  }), rW4 = (A, B) => {
    for (var Q in B) P71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, oW4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of aW4(B))
        if (!sW4.call(A, G) && G !== Q) P71(A, G, {
          get: () => B[G],
          enumerable: !(I = nW4(B, G)) || I.enumerable
        })
    }
    return A
  }, tW4 = (A) => oW4(P71({}, "__esModule", {
    value: !0
  }), A), moA = {};
  rW4(moA, {
    Field: () => BJ4,
    Fields: () => QJ4,
    HttpRequest: () => IJ4,
    HttpResponse: () => GJ4,
    IHttpRequest: () => doA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => eW4,
    isValidHostname: () => poA,
    resolveHttpHandlerRuntimeConfig: () => AJ4
  });
  coA.exports = tW4(moA);
  var eW4 = fL((A) => {
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
    AJ4 = fL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    doA = mj1(),
    BJ4 = class {
      static {
        fL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = doA.FieldPosition.HEADER,
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
    QJ4 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        fL(this, "Fields")
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
    IJ4 = class A {
      static {
        fL(this, "HttpRequest")
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
        if (Q.query) Q.query = uoA(Q.query);
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

  function uoA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  fL(uoA, "cloneQuery");
  var GJ4 = class {
    static {
      fL(this, "HttpResponse")
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

  function poA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  fL(poA, "isValidHostname")
})
// @from(Start 3374421, End 3374833)
dj1 = z((ioA) => {
  Object.defineProperty(ioA, "__esModule", {
    value: !0
  });
  ioA.default = YJ4;
  var ZJ4 = DJ4(Z1("crypto"));

  function DJ4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var _71 = new Uint8Array(256),
    S71 = _71.length;

  function YJ4() {
    if (S71 > _71.length - 16) ZJ4.default.randomFillSync(_71), S71 = 0;
    return _71.slice(S71, S71 += 16)
  }
})
// @from(Start 3374839, End 3375100)
soA = z((noA) => {
  Object.defineProperty(noA, "__esModule", {
    value: !0
  });
  noA.default = void 0;
  var JJ4 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  noA.default = JJ4
})
// @from(Start 3375106, End 3375442)
Za = z((roA) => {
  Object.defineProperty(roA, "__esModule", {
    value: !0
  });
  roA.default = void 0;
  var FJ4 = XJ4(soA());

  function XJ4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function VJ4(A) {
    return typeof A === "string" && FJ4.default.test(A)
  }
  var CJ4 = VJ4;
  roA.default = CJ4
})