
// @from(Start 6747972, End 6754074)
jD2 = z((_o6, rV1) => {
  var TD2 = Z1("punycode"),
    OD2 = RD2(),
    Ed = {
      TRANSITIONAL: 0,
      NONTRANSITIONAL: 1
    };

  function PD2(A) {
    return A.split("\x00").map(function(B) {
      return B.normalize("NFC")
    }).join("\x00")
  }

  function SD2(A) {
    var B = 0,
      Q = OD2.length - 1;
    while (B <= Q) {
      var I = Math.floor((B + Q) / 2),
        G = OD2[I];
      if (G[0][0] <= A && G[0][1] >= A) return G;
      else if (G[0][0] > A) Q = I - 1;
      else B = I + 1
    }
    return null
  }
  var Oo6 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

  function _D2(A) {
    return A.replace(Oo6, "_").length
  }

  function To6(A, B, Q) {
    var I = !1,
      G = "",
      Z = _D2(A);
    for (var D = 0; D < Z; ++D) {
      var Y = A.codePointAt(D),
        W = SD2(Y);
      switch (W[1]) {
        case "disallowed":
          I = !0, G += String.fromCodePoint(Y);
          break;
        case "ignored":
          break;
        case "mapped":
          G += String.fromCodePoint.apply(String, W[2]);
          break;
        case "deviation":
          if (Q === Ed.TRANSITIONAL) G += String.fromCodePoint.apply(String, W[2]);
          else G += String.fromCodePoint(Y);
          break;
        case "valid":
          G += String.fromCodePoint(Y);
          break;
        case "disallowed_STD3_mapped":
          if (B) I = !0, G += String.fromCodePoint(Y);
          else G += String.fromCodePoint.apply(String, W[2]);
          break;
        case "disallowed_STD3_valid":
          if (B) I = !0;
          G += String.fromCodePoint(Y);
          break
      }
    }
    return {
      string: G,
      error: I
    }
  }
  var Po6 = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDE2C-\uDE37\uDEDF-\uDEEA\uDF01-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDE30-\uDE40\uDEAB-\uDEB7]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]/;

  function So6(A, B) {
    if (A.substr(0, 4) === "xn--") A = TD2.toUnicode(A), B = Ed.NONTRANSITIONAL;
    var Q = !1;
    if (PD2(A) !== A || A[3] === "-" && A[4] === "-" || A[0] === "-" || A[A.length - 1] === "-" || A.indexOf(".") !== -1 || A.search(Po6) === 0) Q = !0;
    var I = _D2(A);
    for (var G = 0; G < I; ++G) {
      var Z = SD2(A.codePointAt(G));
      if (sV1 === Ed.TRANSITIONAL && Z[1] !== "valid" || sV1 === Ed.NONTRANSITIONAL && Z[1] !== "valid" && Z[1] !== "deviation") {
        Q = !0;
        break
      }
    }
    return {
      label: A,
      error: Q
    }
  }

  function sV1(A, B, Q) {
    var I = To6(A, B, Q);
    I.string = PD2(I.string);
    var G = I.string.split(".");
    for (var Z = 0; Z < G.length; ++Z) try {
      var D = So6(G[Z]);
      G[Z] = D.label, I.error = I.error || D.error
    } catch (Y) {
      I.error = !0
    }
    return {
      string: G.join("."),
      error: I.error
    }
  }
  _o6.toASCII = function(A, B, Q, I) {
    var G = sV1(A, B, Q),
      Z = G.string.split(".");
    if (Z = Z.map(function(W) {
        try {
          return TD2.toASCII(W)
        } catch (J) {
          return G.error = !0, W
        }
      }), I) {
      var D = Z.slice(0, Z.length - 1).join(".").length;
      if (D.length > 253 || D.length === 0) G.error = !0;
      for (var Y = 0; Y < Z.length; ++Y)
        if (Z.length > 63 || Z.length === 0) {
          G.error = !0;
          break
        }
    }
    if (G.error) return null;
    return Z.join(".")
  };
  _o6.toUnicode = function(A, B) {
    var Q = sV1(A, B, Ed.NONTRANSITIONAL);
    return {
      domain: Q.string,
      error: Q.error
    }
  };
  _o6.PROCESSING_OPTIONS = Ed
})
// @from(Start 6754080, End 6777420)
aw = z((Zt6, dJ) => {
  var Ud = Z1("punycode"),
    yD2 = jD2(),
    bD2 = {
      ftp: 21,
      file: null,
      gopher: 70,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    },
    R6 = Symbol("failure");

  function kD2(A) {
    return Ud.ucs2.decode(A).length
  }

  function xD2(A, B) {
    let Q = A[B];
    return isNaN(Q) ? void 0 : String.fromCodePoint(Q)
  }

  function Ke(A) {
    return A >= 48 && A <= 57
  }

  function He(A) {
    return A >= 65 && A <= 90 || A >= 97 && A <= 122
  }

  function xo6(A) {
    return He(A) || Ke(A)
  }

  function zK(A) {
    return Ke(A) || A >= 65 && A <= 70 || A >= 97 && A <= 102
  }

  function fD2(A) {
    return A === "." || A.toLowerCase() === "%2e"
  }

  function fo6(A) {
    return A = A.toLowerCase(), A === ".." || A === "%2e." || A === ".%2e" || A === "%2e%2e"
  }

  function vo6(A, B) {
    return He(A) && (B === 58 || B === 124)
  }

  function gD2(A) {
    return A.length === 2 && He(A.codePointAt(0)) && (A[1] === ":" || A[1] === "|")
  }

  function bo6(A) {
    return A.length === 2 && He(A.codePointAt(0)) && A[1] === ":"
  }

  function go6(A) {
    return A.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/) !== -1
  }

  function ho6(A) {
    return A.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/) !== -1
  }

  function Fs1(A) {
    return bD2[A] !== void 0
  }

  function c7(A) {
    return Fs1(A.scheme)
  }

  function mo6(A) {
    return bD2[A]
  }

  function hD2(A) {
    let B = A.toString(16).toUpperCase();
    if (B.length === 1) B = "0" + B;
    return "%" + B
  }

  function do6(A) {
    let B = new Buffer(A),
      Q = "";
    for (let I = 0; I < B.length; ++I) Q += hD2(B[I]);
    return Q
  }

  function uo6(A) {
    let B = new Buffer(A),
      Q = [];
    for (let I = 0; I < B.length; ++I)
      if (B[I] !== 37) Q.push(B[I]);
      else if (B[I] === 37 && zK(B[I + 1]) && zK(B[I + 2])) Q.push(parseInt(B.slice(I + 1, I + 3).toString(), 16)), I += 2;
    else Q.push(B[I]);
    return new Buffer(Q).toString()
  }

  function oV1(A) {
    return A <= 31 || A > 126
  }
  var po6 = new Set([32, 34, 35, 60, 62, 63, 96, 123, 125]);

  function mD2(A) {
    return oV1(A) || po6.has(A)
  }
  var co6 = new Set([47, 58, 59, 61, 64, 91, 92, 93, 94, 124]);

  function Vs1(A) {
    return mD2(A) || co6.has(A)
  }

  function ij(A, B) {
    let Q = String.fromCodePoint(A);
    if (B(A)) return do6(Q);
    return Q
  }

  function lo6(A) {
    let B = 10;
    if (A.length >= 2 && A.charAt(0) === "0" && A.charAt(1).toLowerCase() === "x") A = A.substring(2), B = 16;
    else if (A.length >= 2 && A.charAt(0) === "0") A = A.substring(1), B = 8;
    if (A === "") return 0;
    if ((B === 10 ? /[^0-9]/ : B === 16 ? /[^0-9A-Fa-f]/ : /[^0-7]/).test(A)) return R6;
    return parseInt(A, B)
  }

  function io6(A) {
    let B = A.split(".");
    if (B[B.length - 1] === "") {
      if (B.length > 1) B.pop()
    }
    if (B.length > 4) return A;
    let Q = [];
    for (let Z of B) {
      if (Z === "") return A;
      let D = lo6(Z);
      if (D === R6) return A;
      Q.push(D)
    }
    for (let Z = 0; Z < Q.length - 1; ++Z)
      if (Q[Z] > 255) return R6;
    if (Q[Q.length - 1] >= Math.pow(256, 5 - Q.length)) return R6;
    let I = Q.pop(),
      G = 0;
    for (let Z of Q) I += Z * Math.pow(256, 3 - G), ++G;
    return I
  }

  function no6(A) {
    let B = "",
      Q = A;
    for (let I = 1; I <= 4; ++I) {
      if (B = String(Q % 256) + B, I !== 4) B = "." + B;
      Q = Math.floor(Q / 256)
    }
    return B
  }

  function ao6(A) {
    let B = [0, 0, 0, 0, 0, 0, 0, 0],
      Q = 0,
      I = null,
      G = 0;
    if (A = Ud.ucs2.decode(A), A[G] === 58) {
      if (A[G + 1] !== 58) return R6;
      G += 2, ++Q, I = Q
    }
    while (G < A.length) {
      if (Q === 8) return R6;
      if (A[G] === 58) {
        if (I !== null) return R6;
        ++G, ++Q, I = Q;
        continue
      }
      let Z = 0,
        D = 0;
      while (D < 4 && zK(A[G])) Z = Z * 16 + parseInt(xD2(A, G), 16), ++G, ++D;
      if (A[G] === 46) {
        if (D === 0) return R6;
        if (G -= D, Q > 6) return R6;
        let Y = 0;
        while (A[G] !== void 0) {
          let W = null;
          if (Y > 0)
            if (A[G] === 46 && Y < 4) ++G;
            else return R6;
          if (!Ke(A[G])) return R6;
          while (Ke(A[G])) {
            let J = parseInt(xD2(A, G));
            if (W === null) W = J;
            else if (W === 0) return R6;
            else W = W * 10 + J;
            if (W > 255) return R6;
            ++G
          }
          if (B[Q] = B[Q] * 256 + W, ++Y, Y === 2 || Y === 4) ++Q
        }
        if (Y !== 4) return R6;
        break
      } else if (A[G] === 58) {
        if (++G, A[G] === void 0) return R6
      } else if (A[G] !== void 0) return R6;
      B[Q] = Z, ++Q
    }
    if (I !== null) {
      let Z = Q - I;
      Q = 7;
      while (Q !== 0 && Z > 0) {
        let D = B[I + Z - 1];
        B[I + Z - 1] = B[Q], B[Q] = D, --Q, --Z
      }
    } else if (I === null && Q !== 8) return R6;
    return B
  }

  function so6(A) {
    let B = "",
      I = oo6(A).idx,
      G = !1;
    for (let Z = 0; Z <= 7; ++Z) {
      if (G && A[Z] === 0) continue;
      else if (G) G = !1;
      if (I === Z) {
        B += Z === 0 ? "::" : ":", G = !0;
        continue
      }
      if (B += A[Z].toString(16), Z !== 7) B += ":"
    }
    return B
  }

  function Xs1(A, B) {
    if (A[0] === "[") {
      if (A[A.length - 1] !== "]") return R6;
      return ao6(A.substring(1, A.length - 1))
    }
    if (!B) return ro6(A);
    let Q = uo6(A),
      I = yD2.toASCII(Q, !1, yD2.PROCESSING_OPTIONS.NONTRANSITIONAL, !1);
    if (I === null) return R6;
    if (go6(I)) return R6;
    let G = io6(I);
    if (typeof G === "number" || G === R6) return G;
    return I
  }

  function ro6(A) {
    if (ho6(A)) return R6;
    let B = "",
      Q = Ud.ucs2.decode(A);
    for (let I = 0; I < Q.length; ++I) B += ij(Q[I], oV1);
    return B
  }

  function oo6(A) {
    let B = null,
      Q = 1,
      I = null,
      G = 0;
    for (let Z = 0; Z < A.length; ++Z)
      if (A[Z] !== 0) {
        if (G > Q) B = I, Q = G;
        I = null, G = 0
      } else {
        if (I === null) I = Z;
        ++G
      } if (G > Q) B = I, Q = G;
    return {
      idx: B,
      len: Q
    }
  }

  function Cs1(A) {
    if (typeof A === "number") return no6(A);
    if (A instanceof Array) return "[" + so6(A) + "]";
    return A
  }

  function to6(A) {
    return A.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "")
  }

  function eo6(A) {
    return A.replace(/\u0009|\u000A|\u000D/g, "")
  }

  function dD2(A) {
    let B = A.path;
    if (B.length === 0) return;
    if (A.scheme === "file" && B.length === 1 && Bt6(B[0])) return;
    B.pop()
  }

  function uD2(A) {
    return A.username !== "" || A.password !== ""
  }

  function At6(A) {
    return A.host === null || A.host === "" || A.cannotBeABaseURL || A.scheme === "file"
  }

  function Bt6(A) {
    return /^[A-Za-z]:$/.test(A)
  }

  function s3(A, B, Q, I, G) {
    if (this.pointer = 0, this.input = A, this.base = B || null, this.encodingOverride = Q || "utf-8", this.stateOverride = G, this.url = I, this.failure = !1, this.parseError = !1, !this.url) {
      this.url = {
        scheme: "",
        username: "",
        password: "",
        host: null,
        port: null,
        path: [],
        query: null,
        fragment: null,
        cannotBeABaseURL: !1
      };
      let D = to6(this.input);
      if (D !== this.input) this.parseError = !0;
      this.input = D
    }
    let Z = eo6(this.input);
    if (Z !== this.input) this.parseError = !0;
    this.input = Z, this.state = G || "scheme start", this.buffer = "", this.atFlag = !1, this.arrFlag = !1, this.passwordTokenSeenFlag = !1, this.input = Ud.ucs2.decode(this.input);
    for (; this.pointer <= this.input.length; ++this.pointer) {
      let D = this.input[this.pointer],
        Y = isNaN(D) ? void 0 : String.fromCodePoint(D),
        W = this["parse " + this.state](D, Y);
      if (!W) break;
      else if (W === R6) {
        this.failure = !0;
        break
      }
    }
  }
  s3.prototype["parse scheme start"] = function A(B, Q) {
    if (He(B)) this.buffer += Q.toLowerCase(), this.state = "scheme";
    else if (!this.stateOverride) this.state = "no scheme", --this.pointer;
    else return this.parseError = !0, R6;
    return !0
  };
  s3.prototype["parse scheme"] = function A(B, Q) {
    if (xo6(B) || B === 43 || B === 45 || B === 46) this.buffer += Q.toLowerCase();
    else if (B === 58) {
      if (this.stateOverride) {
        if (c7(this.url) && !Fs1(this.buffer)) return !1;
        if (!c7(this.url) && Fs1(this.buffer)) return !1;
        if ((uD2(this.url) || this.url.port !== null) && this.buffer === "file") return !1;
        if (this.url.scheme === "file" && (this.url.host === "" || this.url.host === null)) return !1
      }
      if (this.url.scheme = this.buffer, this.buffer = "", this.stateOverride) return !1;
      if (this.url.scheme === "file") {
        if (this.input[this.pointer + 1] !== 47 || this.input[this.pointer + 2] !== 47) this.parseError = !0;
        this.state = "file"
      } else if (c7(this.url) && this.base !== null && this.base.scheme === this.url.scheme) this.state = "special relative or authority";
      else if (c7(this.url)) this.state = "special authority slashes";
      else if (this.input[this.pointer + 1] === 47) this.state = "path or authority", ++this.pointer;
      else this.url.cannotBeABaseURL = !0, this.url.path.push(""), this.state = "cannot-be-a-base-URL path"
    } else if (!this.stateOverride) this.buffer = "", this.state = "no scheme", this.pointer = -1;
    else return this.parseError = !0, R6;
    return !0
  };
  s3.prototype["parse no scheme"] = function A(B) {
    if (this.base === null || this.base.cannotBeABaseURL && B !== 35) return R6;
    else if (this.base.cannotBeABaseURL && B === 35) this.url.scheme = this.base.scheme, this.url.path = this.base.path.slice(), this.url.query = this.base.query, this.url.fragment = "", this.url.cannotBeABaseURL = !0, this.state = "fragment";
    else if (this.base.scheme === "file") this.state = "file", --this.pointer;
    else this.state = "relative", --this.pointer;
    return !0
  };
  s3.prototype["parse special relative or authority"] = function A(B) {
    if (B === 47 && this.input[this.pointer + 1] === 47) this.state = "special authority ignore slashes", ++this.pointer;
    else this.parseError = !0, this.state = "relative", --this.pointer;
    return !0
  };
  s3.prototype["parse path or authority"] = function A(B) {
    if (B === 47) this.state = "authority";
    else this.state = "path", --this.pointer;
    return !0
  };
  s3.prototype["parse relative"] = function A(B) {
    if (this.url.scheme = this.base.scheme, isNaN(B)) this.url.username = this.base.username, this.url.password = this.base.password, this.url.host = this.base.host, this.url.port = this.base.port, this.url.path = this.base.path.slice(), this.url.query = this.base.query;
    else if (B === 47) this.state = "relative slash";
    else if (B === 63) this.url.username = this.base.username, this.url.password = this.base.password, this.url.host = this.base.host, this.url.port = this.base.port, this.url.path = this.base.path.slice(), this.url.query = "", this.state = "query";
    else if (B === 35) this.url.username = this.base.username, this.url.password = this.base.password, this.url.host = this.base.host, this.url.port = this.base.port, this.url.path = this.base.path.slice(), this.url.query = this.base.query, this.url.fragment = "", this.state = "fragment";
    else if (c7(this.url) && B === 92) this.parseError = !0, this.state = "relative slash";
    else this.url.username = this.base.username, this.url.password = this.base.password, this.url.host = this.base.host, this.url.port = this.base.port, this.url.path = this.base.path.slice(0, this.base.path.length - 1), this.state = "path", --this.pointer;
    return !0
  };
  s3.prototype["parse relative slash"] = function A(B) {
    if (c7(this.url) && (B === 47 || B === 92)) {
      if (B === 92) this.parseError = !0;
      this.state = "special authority ignore slashes"
    } else if (B === 47) this.state = "authority";
    else this.url.username = this.base.username, this.url.password = this.base.password, this.url.host = this.base.host, this.url.port = this.base.port, this.state = "path", --this.pointer;
    return !0
  };
  s3.prototype["parse special authority slashes"] = function A(B) {
    if (B === 47 && this.input[this.pointer + 1] === 47) this.state = "special authority ignore slashes", ++this.pointer;
    else this.parseError = !0, this.state = "special authority ignore slashes", --this.pointer;
    return !0
  };
  s3.prototype["parse special authority ignore slashes"] = function A(B) {
    if (B !== 47 && B !== 92) this.state = "authority", --this.pointer;
    else this.parseError = !0;
    return !0
  };
  s3.prototype["parse authority"] = function A(B, Q) {
    if (B === 64) {
      if (this.parseError = !0, this.atFlag) this.buffer = "%40" + this.buffer;
      this.atFlag = !0;
      let I = kD2(this.buffer);
      for (let G = 0; G < I; ++G) {
        let Z = this.buffer.codePointAt(G);
        if (Z === 58 && !this.passwordTokenSeenFlag) {
          this.passwordTokenSeenFlag = !0;
          continue
        }
        let D = ij(Z, Vs1);
        if (this.passwordTokenSeenFlag) this.url.password += D;
        else this.url.username += D
      }
      this.buffer = ""
    } else if (isNaN(B) || B === 47 || B === 63 || B === 35 || c7(this.url) && B === 92) {
      if (this.atFlag && this.buffer === "") return this.parseError = !0, R6;
      this.pointer -= kD2(this.buffer) + 1, this.buffer = "", this.state = "host"
    } else this.buffer += Q;
    return !0
  };
  s3.prototype["parse hostname"] = s3.prototype["parse host"] = function A(B, Q) {
    if (this.stateOverride && this.url.scheme === "file") --this.pointer, this.state = "file host";
    else if (B === 58 && !this.arrFlag) {
      if (this.buffer === "") return this.parseError = !0, R6;
      let I = Xs1(this.buffer, c7(this.url));
      if (I === R6) return R6;
      if (this.url.host = I, this.buffer = "", this.state = "port", this.stateOverride === "hostname") return !1
    } else if (isNaN(B) || B === 47 || B === 63 || B === 35 || c7(this.url) && B === 92) {
      if (--this.pointer, c7(this.url) && this.buffer === "") return this.parseError = !0, R6;
      else if (this.stateOverride && this.buffer === "" && (uD2(this.url) || this.url.port !== null)) return this.parseError = !0, !1;
      let I = Xs1(this.buffer, c7(this.url));
      if (I === R6) return R6;
      if (this.url.host = I, this.buffer = "", this.state = "path start", this.stateOverride) return !1
    } else {
      if (B === 91) this.arrFlag = !0;
      else if (B === 93) this.arrFlag = !1;
      this.buffer += Q
    }
    return !0
  };
  s3.prototype["parse port"] = function A(B, Q) {
    if (Ke(B)) this.buffer += Q;
    else if (isNaN(B) || B === 47 || B === 63 || B === 35 || c7(this.url) && B === 92 || this.stateOverride) {
      if (this.buffer !== "") {
        let I = parseInt(this.buffer);
        if (I > Math.pow(2, 16) - 1) return this.parseError = !0, R6;
        this.url.port = I === mo6(this.url.scheme) ? null : I, this.buffer = ""
      }
      if (this.stateOverride) return !1;
      this.state = "path start", --this.pointer
    } else return this.parseError = !0, R6;
    return !0
  };
  var Qt6 = new Set([47, 92, 63, 35]);
  s3.prototype["parse file"] = function A(B) {
    if (this.url.scheme = "file", B === 47 || B === 92) {
      if (B === 92) this.parseError = !0;
      this.state = "file slash"
    } else if (this.base !== null && this.base.scheme === "file")
      if (isNaN(B)) this.url.host = this.base.host, this.url.path = this.base.path.slice(), this.url.query = this.base.query;
      else if (B === 63) this.url.host = this.base.host, this.url.path = this.base.path.slice(), this.url.query = "", this.state = "query";
    else if (B === 35) this.url.host = this.base.host, this.url.path = this.base.path.slice(), this.url.query = this.base.query, this.url.fragment = "", this.state = "fragment";
    else {
      if (this.input.length - this.pointer - 1 === 0 || !vo6(B, this.input[this.pointer + 1]) || this.input.length - this.pointer - 1 >= 2 && !Qt6.has(this.input[this.pointer + 2])) this.url.host = this.base.host, this.url.path = this.base.path.slice(), dD2(this.url);
      else this.parseError = !0;
      this.state = "path", --this.pointer
    } else this.state = "path", --this.pointer;
    return !0
  };
  s3.prototype["parse file slash"] = function A(B) {
    if (B === 47 || B === 92) {
      if (B === 92) this.parseError = !0;
      this.state = "file host"
    } else {
      if (this.base !== null && this.base.scheme === "file")
        if (bo6(this.base.path[0])) this.url.path.push(this.base.path[0]);
        else this.url.host = this.base.host;
      this.state = "path", --this.pointer
    }
    return !0
  };
  s3.prototype["parse file host"] = function A(B, Q) {
    if (isNaN(B) || B === 47 || B === 92 || B === 63 || B === 35)
      if (--this.pointer, !this.stateOverride && gD2(this.buffer)) this.parseError = !0, this.state = "path";
      else if (this.buffer === "") {
      if (this.url.host = "", this.stateOverride) return !1;
      this.state = "path start"
    } else {
      let I = Xs1(this.buffer, c7(this.url));
      if (I === R6) return R6;
      if (I === "localhost") I = "";
      if (this.url.host = I, this.stateOverride) return !1;
      this.buffer = "", this.state = "path start"
    } else this.buffer += Q;
    return !0
  };
  s3.prototype["parse path start"] = function A(B) {
    if (c7(this.url)) {
      if (B === 92) this.parseError = !0;
      if (this.state = "path", B !== 47 && B !== 92) --this.pointer
    } else if (!this.stateOverride && B === 63) this.url.query = "", this.state = "query";
    else if (!this.stateOverride && B === 35) this.url.fragment = "", this.state = "fragment";
    else if (B !== void 0) {
      if (this.state = "path", B !== 47) --this.pointer
    }
    return !0
  };
  s3.prototype["parse path"] = function A(B) {
    if (isNaN(B) || B === 47 || c7(this.url) && B === 92 || !this.stateOverride && (B === 63 || B === 35)) {
      if (c7(this.url) && B === 92) this.parseError = !0;
      if (fo6(this.buffer)) {
        if (dD2(this.url), B !== 47 && !(c7(this.url) && B === 92)) this.url.path.push("")
      } else if (fD2(this.buffer) && B !== 47 && !(c7(this.url) && B === 92)) this.url.path.push("");
      else if (!fD2(this.buffer)) {
        if (this.url.scheme === "file" && this.url.path.length === 0 && gD2(this.buffer)) {
          if (this.url.host !== "" && this.url.host !== null) this.parseError = !0, this.url.host = "";
          this.buffer = this.buffer[0] + ":"
        }
        this.url.path.push(this.buffer)
      }
      if (this.buffer = "", this.url.scheme === "file" && (B === void 0 || B === 63 || B === 35))
        while (this.url.path.length > 1 && this.url.path[0] === "") this.parseError = !0, this.url.path.shift();
      if (B === 63) this.url.query = "", this.state = "query";
      if (B === 35) this.url.fragment = "", this.state = "fragment"
    } else {
      if (B === 37 && (!zK(this.input[this.pointer + 1]) || !zK(this.input[this.pointer + 2]))) this.parseError = !0;
      this.buffer += ij(B, mD2)
    }
    return !0
  };
  s3.prototype["parse cannot-be-a-base-URL path"] = function A(B) {
    if (B === 63) this.url.query = "", this.state = "query";
    else if (B === 35) this.url.fragment = "", this.state = "fragment";
    else {
      if (!isNaN(B) && B !== 37) this.parseError = !0;
      if (B === 37 && (!zK(this.input[this.pointer + 1]) || !zK(this.input[this.pointer + 2]))) this.parseError = !0;
      if (!isNaN(B)) this.url.path[0] = this.url.path[0] + ij(B, oV1)
    }
    return !0
  };
  s3.prototype["parse query"] = function A(B, Q) {
    if (isNaN(B) || !this.stateOverride && B === 35) {
      if (!c7(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") this.encodingOverride = "utf-8";
      let I = new Buffer(this.buffer);
      for (let G = 0; G < I.length; ++G)
        if (I[G] < 33 || I[G] > 126 || I[G] === 34 || I[G] === 35 || I[G] === 60 || I[G] === 62) this.url.query += hD2(I[G]);
        else this.url.query += String.fromCodePoint(I[G]);
      if (this.buffer = "", B === 35) this.url.fragment = "", this.state = "fragment"
    } else {
      if (B === 37 && (!zK(this.input[this.pointer + 1]) || !zK(this.input[this.pointer + 2]))) this.parseError = !0;
      this.buffer += Q
    }
    return !0
  };
  s3.prototype["parse fragment"] = function A(B) {
    if (isNaN(B));
    else if (B === 0) this.parseError = !0;
    else {
      if (B === 37 && (!zK(this.input[this.pointer + 1]) || !zK(this.input[this.pointer + 2]))) this.parseError = !0;
      this.url.fragment += ij(B, oV1)
    }
    return !0
  };

  function It6(A, B) {
    let Q = A.scheme + ":";
    if (A.host !== null) {
      if (Q += "//", A.username !== "" || A.password !== "") {
        if (Q += A.username, A.password !== "") Q += ":" + A.password;
        Q += "@"
      }
      if (Q += Cs1(A.host), A.port !== null) Q += ":" + A.port
    } else if (A.host === null && A.scheme === "file") Q += "//";
    if (A.cannotBeABaseURL) Q += A.path[0];
    else
      for (let I of A.path) Q += "/" + I;
    if (A.query !== null) Q += "?" + A.query;
    if (!B && A.fragment !== null) Q += "#" + A.fragment;
    return Q
  }

  function Gt6(A) {
    let B = A.scheme + "://";
    if (B += Cs1(A.host), A.port !== null) B += ":" + A.port;
    return B
  }
  Zt6.serializeURL = It6;
  Zt6.serializeURLOrigin = function(A) {
    switch (A.scheme) {
      case "blob":
        try {
          return Zt6.serializeURLOrigin(Zt6.parseURL(A.path[0]))
        } catch (B) {
          return "null"
        }
      case "ftp":
      case "gopher":
      case "http":
      case "https":
      case "ws":
      case "wss":
        return Gt6({
          scheme: A.scheme,
          host: A.host,
          port: A.port
        });
      case "file":
        return "file://";
      default:
        return "null"
    }
  };
  Zt6.basicURLParse = function(A, B) {
    if (B === void 0) B = {};
    let Q = new s3(A, B.baseURL, B.encodingOverride, B.url, B.stateOverride);
    if (Q.failure) return "failure";
    return Q.url
  };
  Zt6.setTheUsername = function(A, B) {
    A.username = "";
    let Q = Ud.ucs2.decode(B);
    for (let I = 0; I < Q.length; ++I) A.username += ij(Q[I], Vs1)
  };
  Zt6.setThePassword = function(A, B) {
    A.password = "";
    let Q = Ud.ucs2.decode(B);
    for (let I = 0; I < Q.length; ++I) A.password += ij(Q[I], Vs1)
  };
  Zt6.serializeHost = Cs1;
  Zt6.cannotHaveAUsernamePasswordPort = At6;
  Zt6.serializeInteger = function(A) {
    return String(A)
  };
  Zt6.parseURL = function(A, B) {
    if (B === void 0) B = {};
    return Zt6.basicURLParse(A, {
      baseURL: B.baseURL,
      encodingOverride: B.encodingOverride
    })
  }
})
// @from(Start 6777426, End 6780961)
cD2 = z((Ct6) => {
  var r3 = aw();
  Ct6.implementation = class A {
    constructor(B) {
      let Q = B[0],
        I = B[1],
        G = null;
      if (I !== void 0) {
        if (G = r3.basicURLParse(I), G === "failure") throw new TypeError("Invalid base URL")
      }
      let Z = r3.basicURLParse(Q, {
        baseURL: G
      });
      if (Z === "failure") throw new TypeError("Invalid URL");
      this._url = Z
    }
    get href() {
      return r3.serializeURL(this._url)
    }
    set href(B) {
      let Q = r3.basicURLParse(B);
      if (Q === "failure") throw new TypeError("Invalid URL");
      this._url = Q
    }
    get origin() {
      return r3.serializeURLOrigin(this._url)
    }
    get protocol() {
      return this._url.scheme + ":"
    }
    set protocol(B) {
      r3.basicURLParse(B + ":", {
        url: this._url,
        stateOverride: "scheme start"
      })
    }
    get username() {
      return this._url.username
    }
    set username(B) {
      if (r3.cannotHaveAUsernamePasswordPort(this._url)) return;
      r3.setTheUsername(this._url, B)
    }
    get password() {
      return this._url.password
    }
    set password(B) {
      if (r3.cannotHaveAUsernamePasswordPort(this._url)) return;
      r3.setThePassword(this._url, B)
    }
    get host() {
      let B = this._url;
      if (B.host === null) return "";
      if (B.port === null) return r3.serializeHost(B.host);
      return r3.serializeHost(B.host) + ":" + r3.serializeInteger(B.port)
    }
    set host(B) {
      if (this._url.cannotBeABaseURL) return;
      r3.basicURLParse(B, {
        url: this._url,
        stateOverride: "host"
      })
    }
    get hostname() {
      if (this._url.host === null) return "";
      return r3.serializeHost(this._url.host)
    }
    set hostname(B) {
      if (this._url.cannotBeABaseURL) return;
      r3.basicURLParse(B, {
        url: this._url,
        stateOverride: "hostname"
      })
    }
    get port() {
      if (this._url.port === null) return "";
      return r3.serializeInteger(this._url.port)
    }
    set port(B) {
      if (r3.cannotHaveAUsernamePasswordPort(this._url)) return;
      if (B === "") this._url.port = null;
      else r3.basicURLParse(B, {
        url: this._url,
        stateOverride: "port"
      })
    }
    get pathname() {
      if (this._url.cannotBeABaseURL) return this._url.path[0];
      if (this._url.path.length === 0) return "";
      return "/" + this._url.path.join("/")
    }
    set pathname(B) {
      if (this._url.cannotBeABaseURL) return;
      this._url.path = [], r3.basicURLParse(B, {
        url: this._url,
        stateOverride: "path start"
      })
    }
    get search() {
      if (this._url.query === null || this._url.query === "") return "";
      return "?" + this._url.query
    }
    set search(B) {
      let Q = this._url;
      if (B === "") {
        Q.query = null;
        return
      }
      let I = B[0] === "?" ? B.substring(1) : B;
      Q.query = "", r3.basicURLParse(I, {
        url: Q,
        stateOverride: "query"
      })
    }
    get hash() {
      if (this._url.fragment === null || this._url.fragment === "") return "";
      return "#" + this._url.fragment
    }
    set hash(B) {
      if (B === "") {
        this._url.fragment = null;
        return
      }
      let Q = B[0] === "#" ? B.substring(1) : B;
      this._url.fragment = "", r3.basicURLParse(Q, {
        url: this._url,
        stateOverride: "fragment"
      })
    }
    toJSON() {
      return this.href
    }
  }
})
// @from(Start 6780967, End 6784776)
nD2 = z((vd8, ze) => {
  var eX = $D2(),
    iD2 = LD2(),
    lD2 = cD2(),
    l8 = iD2.implSymbol;

  function yI(A) {
    if (!this || this[l8] || !(this instanceof yI)) throw new TypeError("Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
    if (arguments.length < 1) throw new TypeError("Failed to construct 'URL': 1 argument required, but only " + arguments.length + " present.");
    let B = [];
    for (let Q = 0; Q < arguments.length && Q < 2; ++Q) B[Q] = arguments[Q];
    if (B[0] = eX.USVString(B[0]), B[1] !== void 0) B[1] = eX.USVString(B[1]);
    ze.exports.setup(this, B)
  }
  yI.prototype.toJSON = function A() {
    if (!this || !ze.exports.is(this)) throw new TypeError("Illegal invocation");
    let B = [];
    for (let Q = 0; Q < arguments.length && Q < 0; ++Q) B[Q] = arguments[Q];
    return this[l8].toJSON.apply(this[l8], B)
  };
  Object.defineProperty(yI.prototype, "href", {
    get() {
      return this[l8].href
    },
    set(A) {
      A = eX.USVString(A), this[l8].href = A
    },
    enumerable: !0,
    configurable: !0
  });
  yI.prototype.toString = function() {
    if (!this || !ze.exports.is(this)) throw new TypeError("Illegal invocation");
    return this.href
  };
  Object.defineProperty(yI.prototype, "origin", {
    get() {
      return this[l8].origin
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "protocol", {
    get() {
      return this[l8].protocol
    },
    set(A) {
      A = eX.USVString(A), this[l8].protocol = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "username", {
    get() {
      return this[l8].username
    },
    set(A) {
      A = eX.USVString(A), this[l8].username = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "password", {
    get() {
      return this[l8].password
    },
    set(A) {
      A = eX.USVString(A), this[l8].password = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "host", {
    get() {
      return this[l8].host
    },
    set(A) {
      A = eX.USVString(A), this[l8].host = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "hostname", {
    get() {
      return this[l8].hostname
    },
    set(A) {
      A = eX.USVString(A), this[l8].hostname = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "port", {
    get() {
      return this[l8].port
    },
    set(A) {
      A = eX.USVString(A), this[l8].port = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "pathname", {
    get() {
      return this[l8].pathname
    },
    set(A) {
      A = eX.USVString(A), this[l8].pathname = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "search", {
    get() {
      return this[l8].search
    },
    set(A) {
      A = eX.USVString(A), this[l8].search = A
    },
    enumerable: !0,
    configurable: !0
  });
  Object.defineProperty(yI.prototype, "hash", {
    get() {
      return this[l8].hash
    },
    set(A) {
      A = eX.USVString(A), this[l8].hash = A
    },
    enumerable: !0,
    configurable: !0
  });
  ze.exports = {
    is(A) {
      return !!A && A[l8] instanceof lD2.implementation
    },
    create(A, B) {
      let Q = Object.create(yI.prototype);
      return this.setup(Q, A, B), Q
    },
    setup(A, B, Q) {
      if (!Q) Q = {};
      Q.wrapper = A, A[l8] = new lD2.implementation(B, Q), A[l8][iD2.wrapperSymbol] = A
    },
    interface: yI,
    expose: {
      Window: {
        URL: yI
      },
      Worker: {
        URL: yI
      }
    }
  }
})
// @from(Start 6784782, End 6785175)
aD2 = z((zt6) => {
  zt6.URL = nD2().interface;
  zt6.serializeURL = aw().serializeURL;
  zt6.serializeURLOrigin = aw().serializeURLOrigin;
  zt6.basicURLParse = aw().basicURLParse;
  zt6.setTheUsername = aw().setTheUsername;
  zt6.setThePassword = aw().setThePassword;
  zt6.serializeHost = aw().serializeHost;
  zt6.serializeInteger = aw().serializeInteger;
  zt6.parseURL = aw().parseURL
})
// @from(Start 6785181, End 6813230)
DY2 = z((EK, ZY2) => {
  Object.defineProperty(EK, "__esModule", {
    value: !0
  });

  function Ld(A) {
    return A && typeof A === "object" && "default" in A ? A.default : A
  }
  var wK = Ld(Z1("stream")),
    tD2 = Ld(Z1("http")),
    eV1 = Ld(Z1("url")),
    eD2 = Ld(aD2()),
    Ot6 = Ld(Z1("https")),
    nj = Ld(Z1("zlib")),
    Tt6 = wK.Readable,
    K$ = Symbol("buffer"),
    Ks1 = Symbol("type");
  class qd {
    constructor() {
      this[Ks1] = "";
      let A = arguments[0],
        B = arguments[1],
        Q = [],
        I = 0;
      if (A) {
        let Z = A,
          D = Number(Z.length);
        for (let Y = 0; Y < D; Y++) {
          let W = Z[Y],
            J;
          if (W instanceof Buffer) J = W;
          else if (ArrayBuffer.isView(W)) J = Buffer.from(W.buffer, W.byteOffset, W.byteLength);
          else if (W instanceof ArrayBuffer) J = Buffer.from(W);
          else if (W instanceof qd) J = W[K$];
          else J = Buffer.from(typeof W === "string" ? W : String(W));
          I += J.length, Q.push(J)
        }
      }
      this[K$] = Buffer.concat(Q);
      let G = B && B.type !== void 0 && String(B.type).toLowerCase();
      if (G && !/[^\u0020-\u007E]/.test(G)) this[Ks1] = G
    }
    get size() {
      return this[K$].length
    }
    get type() {
      return this[Ks1]
    }
    text() {
      return Promise.resolve(this[K$].toString())
    }
    arrayBuffer() {
      let A = this[K$],
        B = A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength);
      return Promise.resolve(B)
    }
    stream() {
      let A = new Tt6;
      return A._read = function() {}, A.push(this[K$]), A.push(null), A
    }
    toString() {
      return "[object Blob]"
    }
    slice() {
      let A = this.size,
        B = arguments[0],
        Q = arguments[1],
        I, G;
      if (B === void 0) I = 0;
      else if (B < 0) I = Math.max(A + B, 0);
      else I = Math.min(B, A);
      if (Q === void 0) G = A;
      else if (Q < 0) G = Math.max(A + Q, 0);
      else G = Math.min(Q, A);
      let Z = Math.max(G - I, 0),
        Y = this[K$].slice(I, I + Z),
        W = new qd([], {
          type: arguments[2]
        });
      return W[K$] = Y, W
    }
  }
  Object.defineProperties(qd.prototype, {
    size: {
      enumerable: !0
    },
    type: {
      enumerable: !0
    },
    slice: {
      enumerable: !0
    }
  });
  Object.defineProperty(qd.prototype, Symbol.toStringTag, {
    value: "Blob",
    writable: !1,
    enumerable: !1,
    configurable: !0
  });

  function fG(A, B, Q) {
    if (Error.call(this, A), this.message = A, this.type = B, Q) this.code = this.errno = Q.code;
    Error.captureStackTrace(this, this.constructor)
  }
  fG.prototype = Object.create(Error.prototype);
  fG.prototype.constructor = fG;
  fG.prototype.name = "FetchError";
  var Es1;
  try {
    Es1 = (() => {
      throw new Error("Cannot require module " + "encoding");
    })().convert
  } catch (A) {}
  var z$ = Symbol("Body internals"),
    sD2 = wK.PassThrough;

  function kI(A) {
    var B = this,
      Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      I = Q.size;
    let G = I === void 0 ? 0 : I;
    var Z = Q.timeout;
    let D = Z === void 0 ? 0 : Z;
    if (A == null) A = null;
    else if (AY2(A)) A = Buffer.from(A.toString());
    else if (Ue(A));
    else if (Buffer.isBuffer(A));
    else if (Object.prototype.toString.call(A) === "[object ArrayBuffer]") A = Buffer.from(A);
    else if (ArrayBuffer.isView(A)) A = Buffer.from(A.buffer, A.byteOffset, A.byteLength);
    else if (A instanceof wK);
    else A = Buffer.from(String(A));
    if (this[z$] = {
        body: A,
        disturbed: !1,
        error: null
      }, this.size = G, this.timeout = D, A instanceof wK) A.on("error", function(Y) {
      let W = Y.name === "AbortError" ? Y : new fG(`Invalid response body while trying to fetch ${B.url}: ${Y.message}`, "system", Y);
      B[z$].error = W
    })
  }
  kI.prototype = {
    get body() {
      return this[z$].body
    },
    get bodyUsed() {
      return this[z$].disturbed
    },
    arrayBuffer() {
      return Nd.call(this).then(function(A) {
        return A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength)
      })
    },
    blob() {
      let A = this.headers && this.headers.get("content-type") || "";
      return Nd.call(this).then(function(B) {
        return Object.assign(new qd([], {
          type: A.toLowerCase()
        }), {
          [K$]: B
        })
      })
    },
    json() {
      var A = this;
      return Nd.call(this).then(function(B) {
        try {
          return JSON.parse(B.toString())
        } catch (Q) {
          return kI.Promise.reject(new fG(`invalid json response body at ${A.url} reason: ${Q.message}`, "invalid-json"))
        }
      })
    },
    text() {
      return Nd.call(this).then(function(A) {
        return A.toString()
      })
    },
    buffer() {
      return Nd.call(this)
    },
    textConverted() {
      var A = this;
      return Nd.call(this).then(function(B) {
        return Pt6(B, A.headers)
      })
    }
  };
  Object.defineProperties(kI.prototype, {
    body: {
      enumerable: !0
    },
    bodyUsed: {
      enumerable: !0
    },
    arrayBuffer: {
      enumerable: !0
    },
    blob: {
      enumerable: !0
    },
    json: {
      enumerable: !0
    },
    text: {
      enumerable: !0
    }
  });
  kI.mixIn = function(A) {
    for (let B of Object.getOwnPropertyNames(kI.prototype))
      if (!(B in A)) {
        let Q = Object.getOwnPropertyDescriptor(kI.prototype, B);
        Object.defineProperty(A, B, Q)
      }
  };

  function Nd() {
    var A = this;
    if (this[z$].disturbed) return kI.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    if (this[z$].disturbed = !0, this[z$].error) return kI.Promise.reject(this[z$].error);
    let B = this.body;
    if (B === null) return kI.Promise.resolve(Buffer.alloc(0));
    if (Ue(B)) B = B.stream();
    if (Buffer.isBuffer(B)) return kI.Promise.resolve(B);
    if (!(B instanceof wK)) return kI.Promise.resolve(Buffer.alloc(0));
    let Q = [],
      I = 0,
      G = !1;
    return new kI.Promise(function(Z, D) {
      let Y;
      if (A.timeout) Y = setTimeout(function() {
        G = !0, D(new fG(`Response timeout while trying to fetch ${A.url} (over ${A.timeout}ms)`, "body-timeout"))
      }, A.timeout);
      B.on("error", function(W) {
        if (W.name === "AbortError") G = !0, D(W);
        else D(new fG(`Invalid response body while trying to fetch ${A.url}: ${W.message}`, "system", W))
      }), B.on("data", function(W) {
        if (G || W === null) return;
        if (A.size && I + W.length > A.size) {
          G = !0, D(new fG(`content size at ${A.url} over limit: ${A.size}`, "max-size"));
          return
        }
        I += W.length, Q.push(W)
      }), B.on("end", function() {
        if (G) return;
        clearTimeout(Y);
        try {
          Z(Buffer.concat(Q, I))
        } catch (W) {
          D(new fG(`Could not create Buffer from response body for ${A.url}: ${W.message}`, "system", W))
        }
      })
    })
  }

  function Pt6(A, B) {
    if (typeof Es1 !== "function") throw new Error("The package `encoding` must be installed to use the textConverted() function");
    let Q = B.get("content-type"),
      I = "utf-8",
      G, Z;
    if (Q) G = /charset=([^;]*)/i.exec(Q);
    if (Z = A.slice(0, 1024).toString(), !G && Z) G = /<meta.+?charset=(['"])(.+?)\1/i.exec(Z);
    if (!G && Z) {
      if (G = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(Z), !G) {
        if (G = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(Z), G) G.pop()
      }
      if (G) G = /charset=(.*)/i.exec(G.pop())
    }
    if (!G && Z) G = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(Z);
    if (G) {
      if (I = G.pop(), I === "gb2312" || I === "gbk") I = "gb18030"
    }
    return Es1(A, "UTF-8", I).toString()
  }

  function AY2(A) {
    if (typeof A !== "object" || typeof A.append !== "function" || typeof A.delete !== "function" || typeof A.get !== "function" || typeof A.getAll !== "function" || typeof A.has !== "function" || typeof A.set !== "function") return !1;
    return A.constructor.name === "URLSearchParams" || Object.prototype.toString.call(A) === "[object URLSearchParams]" || typeof A.sort === "function"
  }

  function Ue(A) {
    return typeof A === "object" && typeof A.arrayBuffer === "function" && typeof A.type === "string" && typeof A.stream === "function" && typeof A.constructor === "function" && typeof A.constructor.name === "string" && /^(Blob|File)$/.test(A.constructor.name) && /^(Blob|File)$/.test(A[Symbol.toStringTag])
  }

  function BY2(A) {
    let B, Q, I = A.body;
    if (A.bodyUsed) throw new Error("cannot clone body after it is used");
    if (I instanceof wK && typeof I.getBoundary !== "function") B = new sD2, Q = new sD2, I.pipe(B), I.pipe(Q), A[z$].body = B, I = Q;
    return I
  }

  function QY2(A) {
    if (A === null) return null;
    else if (typeof A === "string") return "text/plain;charset=UTF-8";
    else if (AY2(A)) return "application/x-www-form-urlencoded;charset=UTF-8";
    else if (Ue(A)) return A.type || null;
    else if (Buffer.isBuffer(A)) return null;
    else if (Object.prototype.toString.call(A) === "[object ArrayBuffer]") return null;
    else if (ArrayBuffer.isView(A)) return null;
    else if (typeof A.getBoundary === "function") return `multipart/form-data;boundary=${A.getBoundary()}`;
    else if (A instanceof wK) return null;
    else return "text/plain;charset=UTF-8"
  }

  function IY2(A) {
    let B = A.body;
    if (B === null) return 0;
    else if (Ue(B)) return B.size;
    else if (Buffer.isBuffer(B)) return B.length;
    else if (B && typeof B.getLengthSync === "function") {
      if (B._lengthRetrievers && B._lengthRetrievers.length == 0 || B.hasKnownLength && B.hasKnownLength()) return B.getLengthSync();
      return null
    } else return null
  }

  function St6(A, B) {
    let Q = B.body;
    if (Q === null) A.end();
    else if (Ue(Q)) Q.stream().pipe(A);
    else if (Buffer.isBuffer(Q)) A.write(Q), A.end();
    else Q.pipe(A)
  }
  kI.Promise = global.Promise;
  var GY2 = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,
    Us1 = /[^\t\x20-\x7e\x80-\xff]/;

  function we(A) {
    if (A = `${A}`, GY2.test(A) || A === "") throw new TypeError(`${A} is not a legal HTTP header name`)
  }

  function rD2(A) {
    if (A = `${A}`, Us1.test(A)) throw new TypeError(`${A} is not a legal HTTP header value`)
  }

  function $d(A, B) {
    B = B.toLowerCase();
    for (let Q in A)
      if (Q.toLowerCase() === B) return Q;
    return
  }
  var vQ = Symbol("map");
  class BV {
    constructor() {
      let A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      if (this[vQ] = Object.create(null), A instanceof BV) {
        let B = A.raw(),
          Q = Object.keys(B);
        for (let I of Q)
          for (let G of B[I]) this.append(I, G);
        return
      }
      if (A == null);
      else if (typeof A === "object") {
        let B = A[Symbol.iterator];
        if (B != null) {
          if (typeof B !== "function") throw new TypeError("Header pairs must be iterable");
          let Q = [];
          for (let I of A) {
            if (typeof I !== "object" || typeof I[Symbol.iterator] !== "function") throw new TypeError("Each header pair must be iterable");
            Q.push(Array.from(I))
          }
          for (let I of Q) {
            if (I.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
            this.append(I[0], I[1])
          }
        } else
          for (let Q of Object.keys(A)) {
            let I = A[Q];
            this.append(Q, I)
          }
      } else throw new TypeError("Provided initializer must be an object")
    }
    get(A) {
      A = `${A}`, we(A);
      let B = $d(this[vQ], A);
      if (B === void 0) return null;
      return this[vQ][B].join(", ")
    }
    forEach(A) {
      let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0,
        Q = Ns1(this),
        I = 0;
      while (I < Q.length) {
        var G = Q[I];
        let Z = G[0],
          D = G[1];
        A.call(B, D, Z, this), Q = Ns1(this), I++
      }
    }
    set(A, B) {
      A = `${A}`, B = `${B}`, we(A), rD2(B);
      let Q = $d(this[vQ], A);
      this[vQ][Q !== void 0 ? Q : A] = [B]
    }
    append(A, B) {
      A = `${A}`, B = `${B}`, we(A), rD2(B);
      let Q = $d(this[vQ], A);
      if (Q !== void 0) this[vQ][Q].push(B);
      else this[vQ][A] = [B]
    }
    has(A) {
      return A = `${A}`, we(A), $d(this[vQ], A) !== void 0
    }
    delete(A) {
      A = `${A}`, we(A);
      let B = $d(this[vQ], A);
      if (B !== void 0) delete this[vQ][B]
    }
    raw() {
      return this[vQ]
    }
    keys() {
      return Hs1(this, "key")
    }
    values() {
      return Hs1(this, "value")
    } [Symbol.iterator]() {
      return Hs1(this, "key+value")
    }
  }
  BV.prototype.entries = BV.prototype[Symbol.iterator];
  Object.defineProperty(BV.prototype, Symbol.toStringTag, {
    value: "Headers",
    writable: !1,
    enumerable: !1,
    configurable: !0
  });
  Object.defineProperties(BV.prototype, {
    get: {
      enumerable: !0
    },
    forEach: {
      enumerable: !0
    },
    set: {
      enumerable: !0
    },
    append: {
      enumerable: !0
    },
    has: {
      enumerable: !0
    },
    delete: {
      enumerable: !0
    },
    keys: {
      enumerable: !0
    },
    values: {
      enumerable: !0
    },
    entries: {
      enumerable: !0
    }
  });

  function Ns1(A) {
    let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
    return Object.keys(A[vQ]).sort().map(B === "key" ? function(I) {
      return I.toLowerCase()
    } : B === "value" ? function(I) {
      return A[vQ][I].join(", ")
    } : function(I) {
      return [I.toLowerCase(), A[vQ][I].join(", ")]
    })
  }
  var $s1 = Symbol("internal");

  function Hs1(A, B) {
    let Q = Object.create(qs1);
    return Q[$s1] = {
      target: A,
      kind: B,
      index: 0
    }, Q
  }
  var qs1 = Object.setPrototypeOf({
    next() {
      if (!this || Object.getPrototypeOf(this) !== qs1) throw new TypeError("Value of `this` is not a HeadersIterator");
      var A = this[$s1];
      let {
        target: B,
        kind: Q,
        index: I
      } = A, G = Ns1(B, Q), Z = G.length;
      if (I >= Z) return {
        value: void 0,
        done: !0
      };
      return this[$s1].index = I + 1, {
        value: G[I],
        done: !1
      }
    }
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(qs1, Symbol.toStringTag, {
    value: "HeadersIterator",
    writable: !1,
    enumerable: !1,
    configurable: !0
  });

  function _t6(A) {
    let B = Object.assign({
        __proto__: null
      }, A[vQ]),
      Q = $d(A[vQ], "Host");
    if (Q !== void 0) B[Q] = B[Q][0];
    return B
  }

  function jt6(A) {
    let B = new BV;
    for (let Q of Object.keys(A)) {
      if (GY2.test(Q)) continue;
      if (Array.isArray(A[Q]))
        for (let I of A[Q]) {
          if (Us1.test(I)) continue;
          if (B[vQ][Q] === void 0) B[vQ][Q] = [I];
          else B[vQ][Q].push(I)
        } else if (!Us1.test(A[Q])) B[vQ][Q] = [A[Q]]
    }
    return B
  }
  var FO = Symbol("Response internals"),
    yt6 = tD2.STATUS_CODES;
  class AV {
    constructor() {
      let A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null,
        B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      kI.call(this, A, B);
      let Q = B.status || 200,
        I = new BV(B.headers);
      if (A != null && !I.has("Content-Type")) {
        let G = QY2(A);
        if (G) I.append("Content-Type", G)
      }
      this[FO] = {
        url: B.url,
        status: Q,
        statusText: B.statusText || yt6[Q],
        headers: I,
        counter: B.counter
      }
    }
    get url() {
      return this[FO].url || ""
    }
    get status() {
      return this[FO].status
    }
    get ok() {
      return this[FO].status >= 200 && this[FO].status < 300
    }
    get redirected() {
      return this[FO].counter > 0
    }
    get statusText() {
      return this[FO].statusText
    }
    get headers() {
      return this[FO].headers
    }
    clone() {
      return new AV(BY2(this), {
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok,
        redirected: this.redirected
      })
    }
  }
  kI.mixIn(AV.prototype);
  Object.defineProperties(AV.prototype, {
    url: {
      enumerable: !0
    },
    status: {
      enumerable: !0
    },
    ok: {
      enumerable: !0
    },
    redirected: {
      enumerable: !0
    },
    statusText: {
      enumerable: !0
    },
    headers: {
      enumerable: !0
    },
    clone: {
      enumerable: !0
    }
  });
  Object.defineProperty(AV.prototype, Symbol.toStringTag, {
    value: "Response",
    writable: !1,
    enumerable: !1,
    configurable: !0
  });
  var H$ = Symbol("Request internals"),
    kt6 = eV1.URL || eD2.URL,
    xt6 = eV1.parse,
    ft6 = eV1.format;

  function zs1(A) {
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(A)) A = new kt6(A).toString();
    return xt6(A)
  }
  var vt6 = "destroy" in wK.Readable.prototype;

  function tV1(A) {
    return typeof A === "object" && typeof A[H$] === "object"
  }

  function bt6(A) {
    let B = A && typeof A === "object" && Object.getPrototypeOf(A);
    return !!(B && B.constructor.name === "AbortSignal")
  }
  class VO {
    constructor(A) {
      let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        Q;
      if (!tV1(A)) {
        if (A && A.href) Q = zs1(A.href);
        else Q = zs1(`${A}`);
        A = {}
      } else Q = zs1(A.url);
      let I = B.method || A.method || "GET";
      if (I = I.toUpperCase(), (B.body != null || tV1(A) && A.body !== null) && (I === "GET" || I === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body");
      let G = B.body != null ? B.body : tV1(A) && A.body !== null ? BY2(A) : null;
      kI.call(this, G, {
        timeout: B.timeout || A.timeout || 0,
        size: B.size || A.size || 0
      });
      let Z = new BV(B.headers || A.headers || {});
      if (G != null && !Z.has("Content-Type")) {
        let Y = QY2(G);
        if (Y) Z.append("Content-Type", Y)
      }
      let D = tV1(A) ? A.signal : null;
      if ("signal" in B) D = B.signal;
      if (D != null && !bt6(D)) throw new TypeError("Expected signal to be an instanceof AbortSignal");
      this[H$] = {
        method: I,
        redirect: B.redirect || A.redirect || "follow",
        headers: Z,
        parsedURL: Q,
        signal: D
      }, this.follow = B.follow !== void 0 ? B.follow : A.follow !== void 0 ? A.follow : 20, this.compress = B.compress !== void 0 ? B.compress : A.compress !== void 0 ? A.compress : !0, this.counter = B.counter || A.counter || 0, this.agent = B.agent || A.agent
    }
    get method() {
      return this[H$].method
    }
    get url() {
      return ft6(this[H$].parsedURL)
    }
    get headers() {
      return this[H$].headers
    }
    get redirect() {
      return this[H$].redirect
    }
    get signal() {
      return this[H$].signal
    }
    clone() {
      return new VO(this)
    }
  }
  kI.mixIn(VO.prototype);
  Object.defineProperty(VO.prototype, Symbol.toStringTag, {
    value: "Request",
    writable: !1,
    enumerable: !1,
    configurable: !0
  });
  Object.defineProperties(VO.prototype, {
    method: {
      enumerable: !0
    },
    url: {
      enumerable: !0
    },
    headers: {
      enumerable: !0
    },
    redirect: {
      enumerable: !0
    },
    clone: {
      enumerable: !0
    },
    signal: {
      enumerable: !0
    }
  });

  function gt6(A) {
    let B = A[H$].parsedURL,
      Q = new BV(A[H$].headers);
    if (!Q.has("Accept")) Q.set("Accept", "*/*");
    if (!B.protocol || !B.hostname) throw new TypeError("Only absolute URLs are supported");
    if (!/^https?:$/.test(B.protocol)) throw new TypeError("Only HTTP(S) protocols are supported");
    if (A.signal && A.body instanceof wK.Readable && !vt6) throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
    let I = null;
    if (A.body == null && /^(POST|PUT)$/i.test(A.method)) I = "0";
    if (A.body != null) {
      let Z = IY2(A);
      if (typeof Z === "number") I = String(Z)
    }
    if (I) Q.set("Content-Length", I);
    if (!Q.has("User-Agent")) Q.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
    if (A.compress && !Q.has("Accept-Encoding")) Q.set("Accept-Encoding", "gzip,deflate");
    let G = A.agent;
    if (typeof G === "function") G = G(B);
    return Object.assign({}, B, {
      method: A.method,
      headers: _t6(Q),
      agent: G
    })
  }

  function Md(A) {
    Error.call(this, A), this.type = "aborted", this.message = A, Error.captureStackTrace(this, this.constructor)
  }
  Md.prototype = Object.create(Error.prototype);
  Md.prototype.constructor = Md;
  Md.prototype.name = "AbortError";
  var Ee = eV1.URL || eD2.URL,
    oD2 = wK.PassThrough,
    ht6 = function A(B, Q) {
      let I = new Ee(Q).hostname,
        G = new Ee(B).hostname;
      return I === G || I[I.length - G.length - 1] === "." && I.endsWith(G)
    },
    mt6 = function A(B, Q) {
      let I = new Ee(Q).protocol,
        G = new Ee(B).protocol;
      return I === G
    };

  function XO(A, B) {
    if (!XO.Promise) throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
    return kI.Promise = XO.Promise, new XO.Promise(function(Q, I) {
      let G = new VO(A, B),
        Z = gt6(G),
        D = (Z.protocol === "https:" ? Ot6 : tD2).request,
        Y = G.signal,
        W = null,
        J = function K() {
          let E = new Md("The user aborted a request.");
          if (I(E), G.body && G.body instanceof wK.Readable) ws1(G.body, E);
          if (!W || !W.body) return;
          W.body.emit("error", E)
        };
      if (Y && Y.aborted) {
        J();
        return
      }
      let F = function K() {
          J(), C()
        },
        X = D(Z),
        V;
      if (Y) Y.addEventListener("abort", F);

      function C() {
        if (X.abort(), Y) Y.removeEventListener("abort", F);
        clearTimeout(V)
      }
      if (G.timeout) X.once("socket", function(K) {
        V = setTimeout(function() {
          I(new fG(`network timeout at: ${G.url}`, "request-timeout")), C()
        }, G.timeout)
      });
      if (X.on("error", function(K) {
          if (I(new fG(`request to ${G.url} failed, reason: ${K.message}`, "system", K)), W && W.body) ws1(W.body, K);
          C()
        }), dt6(X, function(K) {
          if (Y && Y.aborted) return;
          if (W && W.body) ws1(W.body, K)
        }), parseInt(process.version.substring(1)) < 14) X.on("socket", function(K) {
        K.addListener("close", function(E) {
          let N = K.listenerCount("data") > 0;
          if (W && N && !E && !(Y && Y.aborted)) {
            let q = new Error("Premature close");
            q.code = "ERR_STREAM_PREMATURE_CLOSE", W.body.emit("error", q)
          }
        })
      });
      X.on("response", function(K) {
        clearTimeout(V);
        let E = jt6(K.headers);
        if (XO.isRedirect(K.statusCode)) {
          let T = E.get("Location"),
            L = null;
          try {
            L = T === null ? null : new Ee(T, G.url).toString()
          } catch (_) {
            if (G.redirect !== "manual") {
              I(new fG(`uri requested responds with an invalid redirect URL: ${T}`, "invalid-redirect")), C();
              return
            }
          }
          switch (G.redirect) {
            case "error":
              I(new fG(`uri requested responds with a redirect, redirect mode is set to error: ${G.url}`, "no-redirect")), C();
              return;
            case "manual":
              if (L !== null) try {
                E.set("Location", L)
              } catch (k) {
                I(k)
              }
              break;
            case "follow":
              if (L === null) break;
              if (G.counter >= G.follow) {
                I(new fG(`maximum redirect reached at: ${G.url}`, "max-redirect")), C();
                return
              }
              let _ = {
                headers: new BV(G.headers),
                follow: G.follow,
                counter: G.counter + 1,
                agent: G.agent,
                compress: G.compress,
                method: G.method,
                body: G.body,
                signal: G.signal,
                timeout: G.timeout,
                size: G.size
              };
              if (!ht6(G.url, L) || !mt6(G.url, L))
                for (let k of ["authorization", "www-authenticate", "cookie", "cookie2"]) _.headers.delete(k);
              if (K.statusCode !== 303 && G.body && IY2(G) === null) {
                I(new fG("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), C();
                return
              }
              if (K.statusCode === 303 || (K.statusCode === 301 || K.statusCode === 302) && G.method === "POST") _.method = "GET", _.body = void 0, _.headers.delete("content-length");
              Q(XO(new VO(L, _))), C();
              return
          }
        }
        K.once("end", function() {
          if (Y) Y.removeEventListener("abort", F)
        });
        let N = K.pipe(new oD2),
          q = {
            url: G.url,
            status: K.statusCode,
            statusText: K.statusMessage,
            headers: E,
            size: G.size,
            timeout: G.timeout,
            counter: G.counter
          },
          O = E.get("Content-Encoding");
        if (!G.compress || G.method === "HEAD" || O === null || K.statusCode === 204 || K.statusCode === 304) {
          W = new AV(N, q), Q(W);
          return
        }
        let R = {
          flush: nj.Z_SYNC_FLUSH,
          finishFlush: nj.Z_SYNC_FLUSH
        };
        if (O == "gzip" || O == "x-gzip") {
          N = N.pipe(nj.createGunzip(R)), W = new AV(N, q), Q(W);
          return
        }
        if (O == "deflate" || O == "x-deflate") {
          let T = K.pipe(new oD2);
          T.once("data", function(L) {
            if ((L[0] & 15) === 8) N = N.pipe(nj.createInflate());
            else N = N.pipe(nj.createInflateRaw());
            W = new AV(N, q), Q(W)
          }), T.on("end", function() {
            if (!W) W = new AV(N, q), Q(W)
          });
          return
        }
        if (O == "br" && typeof nj.createBrotliDecompress === "function") {
          N = N.pipe(nj.createBrotliDecompress()), W = new AV(N, q), Q(W);
          return
        }
        W = new AV(N, q), Q(W)
      }), St6(X, G)
    })
  }

  function dt6(A, B) {
    let Q;
    A.on("socket", function(I) {
      Q = I
    }), A.on("response", function(I) {
      let G = I.headers;
      if (G["transfer-encoding"] === "chunked" && !G["content-length"]) I.once("close", function(Z) {
        if (Q && Q.listenerCount("data") > 0 && !Z) {
          let Y = new Error("Premature close");
          Y.code = "ERR_STREAM_PREMATURE_CLOSE", B(Y)
        }
      })
    })
  }

  function ws1(A, B) {
    if (A.destroy) A.destroy(B);
    else A.emit("error", B), A.end()
  }
  XO.isRedirect = function(A) {
    return A === 301 || A === 302 || A === 303 || A === 307 || A === 308
  };
  XO.Promise = global.Promise;
  ZY2.exports = EK = XO;
  Object.defineProperty(EK, "__esModule", {
    value: !0
  });
  EK.default = EK;
  EK.Headers = BV;
  EK.Request = VO;
  EK.Response = AV;
  EK.FetchError = fG;
  EK.AbortError = Md
})
// @from(Start 6813236, End 6813748)
WY2 = z((hd8, YY2) => {
  var sw = (A) => A !== null && typeof A === "object" && typeof A.pipe === "function";
  sw.writable = (A) => sw(A) && A.writable !== !1 && typeof A._write === "function" && typeof A._writableState === "object";
  sw.readable = (A) => sw(A) && A.readable !== !1 && typeof A._read === "function" && typeof A._readableState === "object";
  sw.duplex = (A) => sw.writable(A) && sw.readable(A);
  sw.transform = (A) => sw.duplex(A) && typeof A._transform === "function";
  YY2.exports = sw
})
// @from(Start 6813754, End 6816580)
JY2 = z((md8, ut6) => {
  ut6.exports = {
    name: "gaxios",
    version: "6.7.1",
    description: "A simple common HTTP client specifically for Google APIs and services.",
    main: "build/src/index.js",
    types: "build/src/index.d.ts",
    files: ["build/src"],
    scripts: {
      lint: "gts check",
      test: "c8 mocha build/test",
      "presystem-test": "npm run compile",
      "system-test": "mocha build/system-test --timeout 80000",
      compile: "tsc -p .",
      fix: "gts fix",
      prepare: "npm run compile",
      pretest: "npm run compile",
      webpack: "webpack",
      "prebrowser-test": "npm run compile",
      "browser-test": "node build/browser-test/browser-test-runner.js",
      docs: "compodoc src/",
      "docs-test": "linkinator docs",
      "predocs-test": "npm run docs",
      "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
      prelint: "cd samples; npm link ../; npm install",
      clean: "gts clean",
      precompile: "gts clean"
    },
    repository: "googleapis/gaxios",
    keywords: ["google"],
    engines: {
      node: ">=14"
    },
    author: "Google, LLC",
    license: "Apache-2.0",
    devDependencies: {
      "@babel/plugin-proposal-private-methods": "^7.18.6",
      "@compodoc/compodoc": "1.1.19",
      "@types/cors": "^2.8.6",
      "@types/express": "^4.16.1",
      "@types/extend": "^3.0.1",
      "@types/mocha": "^9.0.0",
      "@types/multiparty": "0.0.36",
      "@types/mv": "^2.1.0",
      "@types/ncp": "^2.0.1",
      "@types/node": "^20.0.0",
      "@types/node-fetch": "^2.5.7",
      "@types/sinon": "^17.0.0",
      "@types/tmp": "0.2.6",
      "@types/uuid": "^10.0.0",
      "abort-controller": "^3.0.0",
      assert: "^2.0.0",
      browserify: "^17.0.0",
      c8: "^8.0.0",
      cheerio: "1.0.0-rc.10",
      cors: "^2.8.5",
      execa: "^5.0.0",
      express: "^4.16.4",
      "form-data": "^4.0.0",
      gts: "^5.0.0",
      "is-docker": "^2.0.0",
      karma: "^6.0.0",
      "karma-chrome-launcher": "^3.0.0",
      "karma-coverage": "^2.0.0",
      "karma-firefox-launcher": "^2.0.0",
      "karma-mocha": "^2.0.0",
      "karma-remap-coverage": "^0.1.5",
      "karma-sourcemap-loader": "^0.4.0",
      "karma-webpack": "5.0.0",
      linkinator: "^3.0.0",
      mocha: "^8.0.0",
      multiparty: "^4.2.1",
      mv: "^2.1.1",
      ncp: "^2.0.0",
      nock: "^13.0.0",
      "null-loader": "^4.0.0",
      puppeteer: "^19.0.0",
      sinon: "^18.0.0",
      "stream-browserify": "^3.0.0",
      tmp: "0.2.3",
      "ts-loader": "^8.0.0",
      typescript: "^5.1.6",
      webpack: "^5.35.0",
      "webpack-cli": "^4.0.0"
    },
    dependencies: {
      extend: "^3.0.2",
      "https-proxy-agent": "^7.0.1",
      "is-stream": "^2.0.0",
      "node-fetch": "^2.6.9",
      uuid: "^9.0.1"
    }
  }
})
// @from(Start 6816586, End 6816710)
VY2 = z((FY2) => {
  Object.defineProperty(FY2, "__esModule", {
    value: !0
  });
  FY2.pkg = void 0;
  FY2.pkg = JY2()
})
// @from(Start 6816716, End 6820428)
Rs1 = z((QV) => {
  var pt6 = QV && QV.__importDefault || function(A) {
      return A && A.__esModule ? A : {
        default: A
      }
    },
    CY2;
  Object.defineProperty(QV, "__esModule", {
    value: !0
  });
  QV.GaxiosError = QV.GAXIOS_ERROR_SYMBOL = void 0;
  QV.defaultErrorRedactor = HY2;
  var ct6 = Z1("url"),
    Ms1 = VY2(),
    KY2 = pt6(Js1());
  QV.GAXIOS_ERROR_SYMBOL = Symbol.for(`${Ms1.pkg.name}-gaxios-error`);
  class Ls1 extends Error {
    static[(CY2 = QV.GAXIOS_ERROR_SYMBOL, Symbol.hasInstance)](A) {
      if (A && typeof A === "object" && QV.GAXIOS_ERROR_SYMBOL in A && A[QV.GAXIOS_ERROR_SYMBOL] === Ms1.pkg.version) return !0;
      return Function.prototype[Symbol.hasInstance].call(Ls1, A)
    }
    constructor(A, B, Q, I) {
      var G;
      super(A);
      if (this.config = B, this.response = Q, this.error = I, this[CY2] = Ms1.pkg.version, this.config = KY2.default(!0, {}, B), this.response) this.response.config = KY2.default(!0, {}, this.response.config);
      if (this.response) {
        try {
          this.response.data = lt6(this.config.responseType, (G = this.response) === null || G === void 0 ? void 0 : G.data)
        } catch (Z) {}
        this.status = this.response.status
      }
      if (I && "code" in I && I.code) this.code = I.code;
      if (B.errorRedactor) B.errorRedactor({
        config: this.config,
        response: this.response
      })
    }
  }
  QV.GaxiosError = Ls1;

  function lt6(A, B) {
    switch (A) {
      case "stream":
        return B;
      case "json":
        return JSON.parse(JSON.stringify(B));
      case "arraybuffer":
        return JSON.parse(Buffer.from(B).toString("utf8"));
      case "blob":
        return JSON.parse(B.text());
      default:
        return B
    }
  }

  function HY2(A) {
    function Q(Z) {
      if (!Z) return;
      for (let D of Object.keys(Z)) {
        if (/^authentication$/i.test(D)) Z[D] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
        if (/^authorization$/i.test(D)) Z[D] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
        if (/secret/i.test(D)) Z[D] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
      }
    }

    function I(Z, D) {
      if (typeof Z === "object" && Z !== null && typeof Z[D] === "string") {
        let Y = Z[D];
        if (/grant_type=/i.test(Y) || /assertion=/i.test(Y) || /secret/i.test(Y)) Z[D] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
      }
    }

    function G(Z) {
      if (typeof Z === "object" && Z !== null) {
        if ("grant_type" in Z) Z.grant_type = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
        if ("assertion" in Z) Z.assertion = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
        if ("client_secret" in Z) Z.client_secret = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
      }
    }
    if (A.config) {
      Q(A.config.headers), I(A.config, "data"), G(A.config.data), I(A.config, "body"), G(A.config.body);
      try {
        let Z = new ct6.URL("", A.config.url);
        if (Z.searchParams.has("token")) Z.searchParams.set("token", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
        if (Z.searchParams.has("client_secret")) Z.searchParams.set("client_secret", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
        A.config.url = Z.toString()
      } catch (Z) {}
    }
    if (A.response) HY2({
      config: A.response.config
    }), Q(A.response.headers), I(A.response, "data"), G(A.response.data);
    return A
  }
})
// @from(Start 6820434, End 6823120)
EY2 = z((wY2) => {
  Object.defineProperty(wY2, "__esModule", {
    value: !0
  });
  wY2.getRetryConfig = it6;
  async function it6(A) {
    let B = zY2(A);
    if (!A || !A.config || !B && !A.config.retry) return {
      shouldRetry: !1
    };
    B = B || {}, B.currentRetryAttempt = B.currentRetryAttempt || 0, B.retry = B.retry === void 0 || B.retry === null ? 3 : B.retry, B.httpMethodsToRetry = B.httpMethodsToRetry || ["GET", "HEAD", "PUT", "OPTIONS", "DELETE"], B.noResponseRetries = B.noResponseRetries === void 0 || B.noResponseRetries === null ? 2 : B.noResponseRetries, B.retryDelayMultiplier = B.retryDelayMultiplier ? B.retryDelayMultiplier : 2, B.timeOfFirstRequest = B.timeOfFirstRequest ? B.timeOfFirstRequest : Date.now(), B.totalTimeout = B.totalTimeout ? B.totalTimeout : Number.MAX_SAFE_INTEGER, B.maxRetryDelay = B.maxRetryDelay ? B.maxRetryDelay : Number.MAX_SAFE_INTEGER;
    let Q = [
      [100, 199],
      [408, 408],
      [429, 429],
      [500, 599]
    ];
    if (B.statusCodesToRetry = B.statusCodesToRetry || Q, A.config.retryConfig = B, !await (B.shouldRetry || nt6)(A)) return {
      shouldRetry: !1,
      config: A.config
    };
    let G = at6(B);
    A.config.retryConfig.currentRetryAttempt += 1;
    let Z = B.retryBackoff ? B.retryBackoff(A, G) : new Promise((D) => {
      setTimeout(D, G)
    });
    if (B.onRetryAttempt) B.onRetryAttempt(A);
    return await Z, {
      shouldRetry: !0,
      config: A.config
    }
  }

  function nt6(A) {
    var B;
    let Q = zY2(A);
    if (A.name === "AbortError" || ((B = A.error) === null || B === void 0 ? void 0 : B.name) === "AbortError") return !1;
    if (!Q || Q.retry === 0) return !1;
    if (!A.response && (Q.currentRetryAttempt || 0) >= Q.noResponseRetries) return !1;
    if (!A.config.method || Q.httpMethodsToRetry.indexOf(A.config.method.toUpperCase()) < 0) return !1;
    if (A.response && A.response.status) {
      let I = !1;
      for (let [G, Z] of Q.statusCodesToRetry) {
        let D = A.response.status;
        if (D >= G && D <= Z) {
          I = !0;
          break
        }
      }
      if (!I) return !1
    }
    if (Q.currentRetryAttempt = Q.currentRetryAttempt || 0, Q.currentRetryAttempt >= Q.retry) return !1;
    return !0
  }

  function zY2(A) {
    if (A && A.config && A.config.retryConfig) return A.config.retryConfig;
    return
  }

  function at6(A) {
    var B;
    let I = (A.currentRetryAttempt ? 0 : (B = A.retryDelay) !== null && B !== void 0 ? B : 100) + (Math.pow(A.retryDelayMultiplier, A.currentRetryAttempt) - 1) / 2 * 1000,
      G = A.totalTimeout - (Date.now() - A.timeOfFirstRequest);
    return Math.min(I, G, A.maxRetryDelay)
  }
})
// @from(Start 6823126, End 6823538)
Os1 = z((UY2) => {
  Object.defineProperty(UY2, "__esModule", {
    value: !0
  });
  UY2.default = tt6;
  var rt6 = ot6(Z1("crypto"));

  function ot6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var BC1 = new Uint8Array(256),
    AC1 = BC1.length;

  function tt6() {
    if (AC1 > BC1.length - 16) rt6.default.randomFillSync(BC1), AC1 = 0;
    return BC1.slice(AC1, AC1 += 16)
  }
})
// @from(Start 6823544, End 6823805)
qY2 = z((NY2) => {
  Object.defineProperty(NY2, "__esModule", {
    value: !0
  });
  NY2.default = void 0;
  var Ae6 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  NY2.default = Ae6
})
// @from(Start 6823811, End 6824147)
Ne = z((MY2) => {
  Object.defineProperty(MY2, "__esModule", {
    value: !0
  });
  MY2.default = void 0;
  var Be6 = Qe6(qY2());

  function Qe6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function Ie6(A) {
    return typeof A === "string" && Be6.default.test(A)
  }
  var Ge6 = Ie6;
  MY2.default = Ge6
})
// @from(Start 6824153, End 6824977)
$e = z((OY2) => {
  Object.defineProperty(OY2, "__esModule", {
    value: !0
  });
  OY2.default = void 0;
  OY2.unsafeStringify = RY2;
  var Ze6 = De6(Ne());

  function De6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var vG = [];
  for (let A = 0; A < 256; ++A) vG.push((A + 256).toString(16).slice(1));

  function RY2(A, B = 0) {
    return vG[A[B + 0]] + vG[A[B + 1]] + vG[A[B + 2]] + vG[A[B + 3]] + "-" + vG[A[B + 4]] + vG[A[B + 5]] + "-" + vG[A[B + 6]] + vG[A[B + 7]] + "-" + vG[A[B + 8]] + vG[A[B + 9]] + "-" + vG[A[B + 10]] + vG[A[B + 11]] + vG[A[B + 12]] + vG[A[B + 13]] + vG[A[B + 14]] + vG[A[B + 15]]
  }

  function Ye6(A, B = 0) {
    let Q = RY2(A, B);
    if (!Ze6.default(Q)) throw TypeError("Stringified UUID is invalid");
    return Q
  }
  var We6 = Ye6;
  OY2.default = We6
})
// @from(Start 6824983, End 6826520)
jY2 = z((SY2) => {
  Object.defineProperty(SY2, "__esModule", {
    value: !0
  });
  SY2.default = void 0;
  var Fe6 = Ve6(Os1()),
    Xe6 = $e();

  function Ve6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var PY2, Ts1, Ps1 = 0,
    Ss1 = 0;

  function Ce6(A, B, Q) {
    let I = B && Q || 0,
      G = B || new Array(16);
    A = A || {};
    let Z = A.node || PY2,
      D = A.clockseq !== void 0 ? A.clockseq : Ts1;
    if (Z == null || D == null) {
      let V = A.random || (A.rng || Fe6.default)();
      if (Z == null) Z = PY2 = [V[0] | 1, V[1], V[2], V[3], V[4], V[5]];
      if (D == null) D = Ts1 = (V[6] << 8 | V[7]) & 16383
    }
    let Y = A.msecs !== void 0 ? A.msecs : Date.now(),
      W = A.nsecs !== void 0 ? A.nsecs : Ss1 + 1,
      J = Y - Ps1 + (W - Ss1) / 1e4;
    if (J < 0 && A.clockseq === void 0) D = D + 1 & 16383;
    if ((J < 0 || Y > Ps1) && A.nsecs === void 0) W = 0;
    if (W >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Ps1 = Y, Ss1 = W, Ts1 = D, Y += 12219292800000;
    let F = ((Y & 268435455) * 1e4 + W) % 4294967296;
    G[I++] = F >>> 24 & 255, G[I++] = F >>> 16 & 255, G[I++] = F >>> 8 & 255, G[I++] = F & 255;
    let X = Y / 4294967296 * 1e4 & 268435455;
    G[I++] = X >>> 8 & 255, G[I++] = X & 255, G[I++] = X >>> 24 & 15 | 16, G[I++] = X >>> 16 & 255, G[I++] = D >>> 8 | 128, G[I++] = D & 255;
    for (let V = 0; V < 6; ++V) G[I + V] = Z[V];
    return B || Xe6.unsafeStringify(G)
  }
  var Ke6 = Ce6;
  SY2.default = Ke6
})
// @from(Start 6826526, End 6827404)
_s1 = z((yY2) => {
  Object.defineProperty(yY2, "__esModule", {
    value: !0
  });
  yY2.default = void 0;
  var He6 = ze6(Ne());

  function ze6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function we6(A) {
    if (!He6.default(A)) throw TypeError("Invalid UUID");
    let B, Q = new Uint8Array(16);
    return Q[0] = (B = parseInt(A.slice(0, 8), 16)) >>> 24, Q[1] = B >>> 16 & 255, Q[2] = B >>> 8 & 255, Q[3] = B & 255, Q[4] = (B = parseInt(A.slice(9, 13), 16)) >>> 8, Q[5] = B & 255, Q[6] = (B = parseInt(A.slice(14, 18), 16)) >>> 8, Q[7] = B & 255, Q[8] = (B = parseInt(A.slice(19, 23), 16)) >>> 8, Q[9] = B & 255, Q[10] = (B = parseInt(A.slice(24, 36), 16)) / 1099511627776 & 255, Q[11] = B / 4294967296 & 255, Q[12] = B >>> 24 & 255, Q[13] = B >>> 16 & 255, Q[14] = B >>> 8 & 255, Q[15] = B & 255, Q
  }
  var Ee6 = we6;
  yY2.default = Ee6
})
// @from(Start 6827410, End 6828670)
js1 = z((vY2) => {
  Object.defineProperty(vY2, "__esModule", {
    value: !0
  });
  vY2.URL = vY2.DNS = void 0;
  vY2.default = Me6;
  var Ue6 = $e(),
    Ne6 = $e6(_s1());

  function $e6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function qe6(A) {
    A = unescape(encodeURIComponent(A));
    let B = [];
    for (let Q = 0; Q < A.length; ++Q) B.push(A.charCodeAt(Q));
    return B
  }
  var xY2 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  vY2.DNS = xY2;
  var fY2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  vY2.URL = fY2;

  function Me6(A, B, Q) {
    function I(G, Z, D, Y) {
      var W;
      if (typeof G === "string") G = qe6(G);
      if (typeof Z === "string") Z = Ne6.default(Z);
      if (((W = Z) === null || W === void 0 ? void 0 : W.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      let J = new Uint8Array(16 + G.length);
      if (J.set(Z), J.set(G, Z.length), J = Q(J), J[6] = J[6] & 15 | B, J[8] = J[8] & 63 | 128, D) {
        Y = Y || 0;
        for (let F = 0; F < 16; ++F) D[Y + F] = J[F];
        return D
      }
      return Ue6.unsafeStringify(J)
    }
    try {
      I.name = A
    } catch (G) {}
    return I.DNS = xY2, I.URL = fY2, I
  }
})
// @from(Start 6828676, End 6829134)
mY2 = z((gY2) => {
  Object.defineProperty(gY2, "__esModule", {
    value: !0
  });
  gY2.default = void 0;
  var Oe6 = Te6(Z1("crypto"));

  function Te6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function Pe6(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return Oe6.default.createHash("md5").update(A).digest()
  }
  var Se6 = Pe6;
  gY2.default = Se6
})
// @from(Start 6829140, End 6829464)
cY2 = z((uY2) => {
  Object.defineProperty(uY2, "__esModule", {
    value: !0
  });
  uY2.default = void 0;
  var _e6 = dY2(js1()),
    je6 = dY2(mY2());

  function dY2(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var ye6 = _e6.default("v3", 48, je6.default),
    ke6 = ye6;
  uY2.default = ke6
})
// @from(Start 6829470, End 6829774)
nY2 = z((lY2) => {
  Object.defineProperty(lY2, "__esModule", {
    value: !0
  });
  lY2.default = void 0;
  var xe6 = fe6(Z1("crypto"));

  function fe6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var ve6 = {
    randomUUID: xe6.default.randomUUID
  };
  lY2.default = ve6
})
// @from(Start 6829780, End 6830434)
tY2 = z((rY2) => {
  Object.defineProperty(rY2, "__esModule", {
    value: !0
  });
  rY2.default = void 0;
  var aY2 = sY2(nY2()),
    be6 = sY2(Os1()),
    ge6 = $e();

  function sY2(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function he6(A, B, Q) {
    if (aY2.default.randomUUID && !B && !A) return aY2.default.randomUUID();
    A = A || {};
    let I = A.random || (A.rng || be6.default)();
    if (I[6] = I[6] & 15 | 64, I[8] = I[8] & 63 | 128, B) {
      Q = Q || 0;
      for (let G = 0; G < 16; ++G) B[Q + G] = I[G];
      return B
    }
    return ge6.unsafeStringify(I)
  }
  var me6 = he6;
  rY2.default = me6
})
// @from(Start 6830440, End 6830899)
BW2 = z((eY2) => {
  Object.defineProperty(eY2, "__esModule", {
    value: !0
  });
  eY2.default = void 0;
  var de6 = ue6(Z1("crypto"));

  function ue6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function pe6(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return de6.default.createHash("sha1").update(A).digest()
  }
  var ce6 = pe6;
  eY2.default = ce6
})
// @from(Start 6830905, End 6831229)
ZW2 = z((IW2) => {
  Object.defineProperty(IW2, "__esModule", {
    value: !0
  });
  IW2.default = void 0;
  var le6 = QW2(js1()),
    ie6 = QW2(BW2());

  function QW2(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var ne6 = le6.default("v5", 80, ie6.default),
    ae6 = ne6;
  IW2.default = ae6
})
// @from(Start 6831235, End 6831417)
WW2 = z((DW2) => {
  Object.defineProperty(DW2, "__esModule", {
    value: !0
  });
  DW2.default = void 0;
  var se6 = "00000000-0000-0000-0000-000000000000";
  DW2.default = se6
})
// @from(Start 6831423, End 6831802)
XW2 = z((JW2) => {
  Object.defineProperty(JW2, "__esModule", {
    value: !0
  });
  JW2.default = void 0;
  var re6 = oe6(Ne());

  function oe6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function te6(A) {
    if (!re6.default(A)) throw TypeError("Invalid UUID");
    return parseInt(A.slice(14, 15), 16)
  }
  var ee6 = te6;
  JW2.default = ee6
})
// @from(Start 6831808, End 6833222)
VW2 = z((UK) => {
  Object.defineProperty(UK, "__esModule", {
    value: !0
  });
  Object.defineProperty(UK, "NIL", {
    enumerable: !0,
    get: function() {
      return G15.default
    }
  });
  Object.defineProperty(UK, "parse", {
    enumerable: !0,
    get: function() {
      return W15.default
    }
  });
  Object.defineProperty(UK, "stringify", {
    enumerable: !0,
    get: function() {
      return Y15.default
    }
  });
  Object.defineProperty(UK, "v1", {
    enumerable: !0,
    get: function() {
      return A15.default
    }
  });
  Object.defineProperty(UK, "v3", {
    enumerable: !0,
    get: function() {
      return B15.default
    }
  });
  Object.defineProperty(UK, "v4", {
    enumerable: !0,
    get: function() {
      return Q15.default
    }
  });
  Object.defineProperty(UK, "v5", {
    enumerable: !0,
    get: function() {
      return I15.default
    }
  });
  Object.defineProperty(UK, "validate", {
    enumerable: !0,
    get: function() {
      return D15.default
    }
  });
  Object.defineProperty(UK, "version", {
    enumerable: !0,
    get: function() {
      return Z15.default
    }
  });
  var A15 = w$(jY2()),
    B15 = w$(cY2()),
    Q15 = w$(tY2()),
    I15 = w$(ZW2()),
    G15 = w$(WW2()),
    Z15 = w$(XW2()),
    D15 = w$(Ne()),
    Y15 = w$($e()),
    W15 = w$(_s1());

  function w$(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
})
// @from(Start 6833228, End 6833419)
ys1 = z((KW2) => {
  Object.defineProperty(KW2, "__esModule", {
    value: !0
  });
  KW2.GaxiosInterceptorManager = void 0;
  class CW2 extends Set {}
  KW2.GaxiosInterceptorManager = CW2
})
// @from(Start 6833425, End 6844288)
OW2 = z((pZ) => {
  var J15 = pZ && pZ.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    F15 = pZ && pZ.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    X15 = pZ && pZ.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) J15(B, A, Q)
      }
      return F15(B, A), B
    },
    sj = pZ && pZ.__classPrivateFieldGet || function(A, B, Q, I) {
      if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
      if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
    },
    V15 = pZ && pZ.__classPrivateFieldSet || function(A, B, Q, I, G) {
      if (I === "m") throw new TypeError("Private method is not writable");
      if (I === "a" && !G) throw new TypeError("Private accessor was defined without a setter");
      if (typeof B === "function" ? A !== B || !G : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return I === "a" ? G.call(A, Q) : G ? G.value = Q : B.set(A, Q), Q
    },
    GC1 = pZ && pZ.__importDefault || function(A) {
      return A && A.__esModule ? A : {
        default: A
      }
    },
    Rd, aj, zW2, qW2, MW2, LW2, QC1, wW2;
  Object.defineProperty(pZ, "__esModule", {
    value: !0
  });
  pZ.Gaxios = void 0;
  var C15 = GC1(Js1()),
    K15 = Z1("https"),
    H15 = GC1(DY2()),
    z15 = GC1(Z1("querystring")),
    w15 = GC1(WY2()),
    EW2 = Z1("url"),
    IC1 = Rs1(),
    E15 = EY2(),
    UW2 = Z1("stream"),
    U15 = VW2(),
    NW2 = ys1(),
    N15 = q15() ? window.fetch : H15.default;

  function $15() {
    return typeof window !== "undefined" && !!window
  }

  function q15() {
    return $15() && !!window.fetch
  }

  function M15() {
    return typeof Buffer !== "undefined"
  }

  function $W2(A, B) {
    return !!RW2(A, B)
  }

  function RW2(A, B) {
    B = B.toLowerCase();
    for (let Q of Object.keys((A === null || A === void 0 ? void 0 : A.headers) || {}))
      if (B === Q.toLowerCase()) return A.headers[Q];
    return
  }
  class ks1 {
    constructor(A) {
      Rd.add(this), this.agentCache = new Map, this.defaults = A || {}, this.interceptors = {
        request: new NW2.GaxiosInterceptorManager,
        response: new NW2.GaxiosInterceptorManager
      }
    }
    async request(A = {}) {
      return A = await sj(this, Rd, "m", LW2).call(this, A), A = await sj(this, Rd, "m", qW2).call(this, A), sj(this, Rd, "m", MW2).call(this, this._request(A))
    }
    async _defaultAdapter(A) {
      let Q = await (A.fetchImplementation || N15)(A.url, A),
        I = await this.getResponseData(A, Q);
      return this.translateResponse(A, Q, I)
    }
    async _request(A = {}) {
      var B;
      try {
        let Q;
        if (A.adapter) Q = await A.adapter(A, this._defaultAdapter.bind(this));
        else Q = await this._defaultAdapter(A);
        if (!A.validateStatus(Q.status)) {
          if (A.responseType === "stream") {
            let I = "";
            await new Promise((G) => {
              (Q === null || Q === void 0 ? void 0 : Q.data).on("data", (Z) => {
                I += Z
              }), (Q === null || Q === void 0 ? void 0 : Q.data).on("end", G)
            }), Q.data = I
          }
          throw new IC1.GaxiosError(`Request failed with status code ${Q.status}`, A, Q)
        }
        return Q
      } catch (Q) {
        let I = Q instanceof IC1.GaxiosError ? Q : new IC1.GaxiosError(Q.message, A, void 0, Q),
          {
            shouldRetry: G,
            config: Z
          } = await E15.getRetryConfig(I);
        if (G && Z) return I.config.retryConfig.currentRetryAttempt = Z.retryConfig.currentRetryAttempt, A.retryConfig = (B = I.config) === null || B === void 0 ? void 0 : B.retryConfig, this._request(A);
        throw I
      }
    }
    async getResponseData(A, B) {
      switch (A.responseType) {
        case "stream":
          return B.body;
        case "json": {
          let Q = await B.text();
          try {
            Q = JSON.parse(Q)
          } catch (I) {}
          return Q
        }
        case "arraybuffer":
          return B.arrayBuffer();
        case "blob":
          return B.blob();
        case "text":
          return B.text();
        default:
          return this.getResponseDataFromContentType(B)
      }
    }
    validateStatus(A) {
      return A >= 200 && A < 300
    }
    paramsSerializer(A) {
      return z15.default.stringify(A)
    }
    translateResponse(A, B, Q) {
      let I = {};
      return B.headers.forEach((G, Z) => {
        I[Z] = G
      }), {
        config: A,
        data: Q,
        headers: I,
        status: B.status,
        statusText: B.statusText,
        request: {
          responseURL: B.url
        }
      }
    }
    async getResponseDataFromContentType(A) {
      let B = A.headers.get("Content-Type");
      if (B === null) return A.text();
      if (B = B.toLowerCase(), B.includes("application/json")) {
        let Q = await A.text();
        try {
          Q = JSON.parse(Q)
        } catch (I) {}
        return Q
      } else if (B.match(/^text\//)) return A.text();
      else return A.blob()
    }
    async * getMultipartRequest(A, B) {
      let Q = `--${B}--`;
      for (let I of A) {
        let G = I.headers["Content-Type"] || "application/octet-stream";
        if (yield `--${B}\r
Content-Type: ${G}\r
\r
`, typeof I.content === "string") yield I.content;
        else yield* I.content;
        yield `\r
`
      }
      yield Q
    }
  }
  pZ.Gaxios = ks1;
  aj = ks1, Rd = new WeakSet, zW2 = function A(B, Q = []) {
    var I, G;
    let Z = new EW2.URL(B),
      D = [...Q],
      Y = ((G = (I = process.env.NO_PROXY) !== null && I !== void 0 ? I : process.env.no_proxy) === null || G === void 0 ? void 0 : G.split(",")) || [];
    for (let W of Y) D.push(W.trim());
    for (let W of D)
      if (W instanceof RegExp) {
        if (W.test(Z.toString())) return !1
      } else if (W instanceof EW2.URL) {
      if (W.origin === Z.origin) return !1
    } else if (W.startsWith("*.") || W.startsWith(".")) {
      let J = W.replace(/^\*\./, ".");
      if (Z.hostname.endsWith(J)) return !1
    } else if (W === Z.origin || W === Z.hostname || W === Z.href) return !1;
    return !0
  }, qW2 = async function A(B) {
    let Q = Promise.resolve(B);
    for (let I of this.interceptors.request.values())
      if (I) Q = Q.then(I.resolved, I.rejected);
    return Q
  }, MW2 = async function A(B) {
    let Q = Promise.resolve(B);
    for (let I of this.interceptors.response.values())
      if (I) Q = Q.then(I.resolved, I.rejected);
    return Q
  }, LW2 = async function A(B) {
    var Q, I, G, Z;
    let D = C15.default(!0, {}, this.defaults, B);
    if (!D.url) throw new Error("URL is required.");
    let Y = D.baseUrl || D.baseURL;
    if (Y) D.url = Y.toString() + D.url;
    if (D.paramsSerializer = D.paramsSerializer || this.paramsSerializer, D.params && Object.keys(D.params).length > 0) {
      let F = D.paramsSerializer(D.params);
      if (F.startsWith("?")) F = F.slice(1);
      let X = D.url.toString().includes("?") ? "&" : "?";
      D.url = D.url + X + F
    }
    if (typeof B.maxContentLength === "number") D.size = B.maxContentLength;
    if (typeof B.maxRedirects === "number") D.follow = B.maxRedirects;
    if (D.headers = D.headers || {}, D.multipart === void 0 && D.data) {
      let F = typeof FormData === "undefined" ? !1 : (D === null || D === void 0 ? void 0 : D.data) instanceof FormData;
      if (w15.default.readable(D.data)) D.body = D.data;
      else if (M15() && Buffer.isBuffer(D.data)) {
        if (D.body = D.data, !$W2(D, "Content-Type")) D.headers["Content-Type"] = "application/json"
      } else if (typeof D.data === "object") {
        if (!F)
          if (RW2(D, "content-type") === "application/x-www-form-urlencoded") D.body = D.paramsSerializer(D.data);
          else {
            if (!$W2(D, "Content-Type")) D.headers["Content-Type"] = "application/json";
            D.body = JSON.stringify(D.data)
          }
      } else D.body = D.data
    } else if (D.multipart && D.multipart.length > 0) {
      let F = U15.v4();
      D.headers["Content-Type"] = `multipart/related; boundary=${F}`;
      let X = new UW2.PassThrough;
      D.body = X, UW2.pipeline(this.getMultipartRequest(D.multipart, F), X, () => {})
    }
    if (D.validateStatus = D.validateStatus || this.validateStatus, D.responseType = D.responseType || "unknown", !D.headers.Accept && D.responseType === "json") D.headers.Accept = "application/json";
    D.method = D.method || "GET";
    let W = D.proxy || ((Q = process === null || process === void 0 ? void 0 : process.env) === null || Q === void 0 ? void 0 : Q.HTTPS_PROXY) || ((I = process === null || process === void 0 ? void 0 : process.env) === null || I === void 0 ? void 0 : I.https_proxy) || ((G = process === null || process === void 0 ? void 0 : process.env) === null || G === void 0 ? void 0 : G.HTTP_PROXY) || ((Z = process === null || process === void 0 ? void 0 : process.env) === null || Z === void 0 ? void 0 : Z.http_proxy),
      J = sj(this, Rd, "m", zW2).call(this, D.url, D.noProxy);
    if (D.agent);
    else if (W && J) {
      let F = await sj(aj, aj, "m", wW2).call(aj);
      if (this.agentCache.has(W)) D.agent = this.agentCache.get(W);
      else D.agent = new F(W, {
        cert: D.cert,
        key: D.key
      }), this.agentCache.set(W, D.agent)
    } else if (D.cert && D.key)
      if (this.agentCache.has(D.key)) D.agent = this.agentCache.get(D.key);
      else D.agent = new K15.Agent({
        cert: D.cert,
        key: D.key
      }), this.agentCache.set(D.key, D.agent);
    if (typeof D.errorRedactor !== "function" && D.errorRedactor !== !1) D.errorRedactor = IC1.defaultErrorRedactor;
    return D
  }, wW2 = async function A() {
    return V15(this, aj, sj(this, aj, "f", QC1) || (await Promise.resolve().then(() => X15(Du1()))).HttpsProxyAgent, "f", QC1), sj(this, aj, "f", QC1)
  };
  QC1 = {
    value: void 0
  }
})
// @from(Start 6844294, End 6845482)
NK = z((dD) => {
  var L15 = dD && dD.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    R15 = dD && dD.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) L15(B, A, Q)
    };
  Object.defineProperty(dD, "__esModule", {
    value: !0
  });
  dD.instance = dD.Gaxios = dD.GaxiosError = void 0;
  dD.request = T15;
  var TW2 = OW2();
  Object.defineProperty(dD, "Gaxios", {
    enumerable: !0,
    get: function() {
      return TW2.Gaxios
    }
  });
  var O15 = Rs1();
  Object.defineProperty(dD, "GaxiosError", {
    enumerable: !0,
    get: function() {
      return O15.GaxiosError
    }
  });
  R15(ys1(), dD);
  dD.instance = new TW2.Gaxios;
  async function T15(A) {
    return dD.instance.request(A)
  }
})