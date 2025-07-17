
// @from(Start 7913312, End 7914373)
r1A = z((MQB, zL2) => {
  zL2.exports = s1A;
  var _C5 = cG(),
    HL2 = qA1();

  function s1A(A, B, Q) {
    HL2.call(this), this.nodeType = _C5.PROCESSING_INSTRUCTION_NODE, this.ownerDocument = A, this.target = B, this._data = Q
  }
  var RA1 = {
    get: function() {
      return this._data
    },
    set: function(A) {
      if (A === null || A === void 0) A = "";
      else A = String(A);
      if (this._data = A, this.rooted) this.ownerDocument.mutateValue(this)
    }
  };
  s1A.prototype = Object.create(HL2.prototype, {
    nodeName: {
      get: function() {
        return this.target
      }
    },
    nodeValue: RA1,
    textContent: RA1,
    innerText: RA1,
    data: {
      get: RA1.get,
      set: function(A) {
        RA1.set.call(this, A === null ? "" : String(A))
      }
    },
    clone: {
      value: function A() {
        return new s1A(this.ownerDocument, this.target, this._data)
      }
    },
    isEqual: {
      value: function A(B) {
        return this.target === B.target && this._data === B._data
      }
    }
  })
})
// @from(Start 7914379, End 7914880)
OA1 = z((LQB, wL2) => {
  var o1A = {
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3,
    SHOW_ALL: 4294967295,
    SHOW_ELEMENT: 1,
    SHOW_ATTRIBUTE: 2,
    SHOW_TEXT: 4,
    SHOW_CDATA_SECTION: 8,
    SHOW_ENTITY_REFERENCE: 16,
    SHOW_ENTITY: 32,
    SHOW_PROCESSING_INSTRUCTION: 64,
    SHOW_COMMENT: 128,
    SHOW_DOCUMENT: 256,
    SHOW_DOCUMENT_TYPE: 512,
    SHOW_DOCUMENT_FRAGMENT: 1024,
    SHOW_NOTATION: 2048
  };
  wL2.exports = o1A.constructor = o1A.prototype = o1A
})
// @from(Start 7914886, End 7915810)
e1A = z((OQB, UL2) => {
  var RQB = UL2.exports = {
    nextSkippingChildren: jC5,
    nextAncestorSibling: t1A,
    next: yC5,
    previous: kC5,
    deepLastChild: EL2
  };

  function jC5(A, B) {
    if (A === B) return null;
    if (A.nextSibling !== null) return A.nextSibling;
    return t1A(A, B)
  }

  function t1A(A, B) {
    for (A = A.parentNode; A !== null; A = A.parentNode) {
      if (A === B) return null;
      if (A.nextSibling !== null) return A.nextSibling
    }
    return null
  }

  function yC5(A, B) {
    var Q = A.firstChild;
    if (Q !== null) return Q;
    if (A === B) return null;
    if (Q = A.nextSibling, Q !== null) return Q;
    return t1A(A, B)
  }

  function EL2(A) {
    while (A.lastChild) A = A.lastChild;
    return A
  }

  function kC5(A, B) {
    var Q = A.previousSibling;
    if (Q !== null) return EL2(Q);
    if (Q = A.parentNode, Q === B) return null;
    return Q
  }
})
// @from(Start 7915816, End 7920716)
OL2 = z((TQB, RL2) => {
  RL2.exports = LL2;
  var xC5 = cG(),
    lG = OA1(),
    NL2 = e1A(),
    ML2 = QQ(),
    AAA = {
      first: "firstChild",
      last: "lastChild",
      next: "firstChild",
      previous: "lastChild"
    },
    BAA = {
      first: "nextSibling",
      last: "previousSibling",
      next: "nextSibling",
      previous: "previousSibling"
    };

  function $L2(A, B) {
    var Q, I, G, Z, D;
    I = A._currentNode[AAA[B]];
    while (I !== null) {
      if (Z = A._internalFilter(I), Z === lG.FILTER_ACCEPT) return A._currentNode = I, I;
      if (Z === lG.FILTER_SKIP) {
        if (Q = I[AAA[B]], Q !== null) {
          I = Q;
          continue
        }
      }
      while (I !== null) {
        if (D = I[BAA[B]], D !== null) {
          I = D;
          break
        }
        if (G = I.parentNode, G === null || G === A.root || G === A._currentNode) return null;
        else I = G
      }
    }
    return null
  }

  function qL2(A, B) {
    var Q, I, G;
    if (Q = A._currentNode, Q === A.root) return null;
    while (!0) {
      G = Q[BAA[B]];
      while (G !== null) {
        if (Q = G, I = A._internalFilter(Q), I === lG.FILTER_ACCEPT) return A._currentNode = Q, Q;
        if (G = Q[AAA[B]], I === lG.FILTER_REJECT || G === null) G = Q[BAA[B]]
      }
      if (Q = Q.parentNode, Q === null || Q === A.root) return null;
      if (A._internalFilter(Q) === lG.FILTER_ACCEPT) return null
    }
  }

  function LL2(A, B, Q) {
    if (!A || !A.nodeType) ML2.NotSupportedError();
    this._root = A, this._whatToShow = Number(B) || 0, this._filter = Q || null, this._active = !1, this._currentNode = A
  }
  Object.defineProperties(LL2.prototype, {
    root: {
      get: function() {
        return this._root
      }
    },
    whatToShow: {
      get: function() {
        return this._whatToShow
      }
    },
    filter: {
      get: function() {
        return this._filter
      }
    },
    currentNode: {
      get: function A() {
        return this._currentNode
      },
      set: function A(B) {
        if (!(B instanceof xC5)) throw new TypeError("Not a Node");
        this._currentNode = B
      }
    },
    _internalFilter: {
      value: function A(B) {
        var Q, I;
        if (this._active) ML2.InvalidStateError();
        if (!(1 << B.nodeType - 1 & this._whatToShow)) return lG.FILTER_SKIP;
        if (I = this._filter, I === null) Q = lG.FILTER_ACCEPT;
        else {
          this._active = !0;
          try {
            if (typeof I === "function") Q = I(B);
            else Q = I.acceptNode(B)
          } finally {
            this._active = !1
          }
        }
        return +Q
      }
    },
    parentNode: {
      value: function A() {
        var B = this._currentNode;
        while (B !== this.root) {
          if (B = B.parentNode, B === null) return null;
          if (this._internalFilter(B) === lG.FILTER_ACCEPT) return this._currentNode = B, B
        }
        return null
      }
    },
    firstChild: {
      value: function A() {
        return $L2(this, "first")
      }
    },
    lastChild: {
      value: function A() {
        return $L2(this, "last")
      }
    },
    previousSibling: {
      value: function A() {
        return qL2(this, "previous")
      }
    },
    nextSibling: {
      value: function A() {
        return qL2(this, "next")
      }
    },
    previousNode: {
      value: function A() {
        var B, Q, I, G;
        B = this._currentNode;
        while (B !== this._root) {
          for (I = B.previousSibling; I; I = B.previousSibling) {
            if (B = I, Q = this._internalFilter(B), Q === lG.FILTER_REJECT) continue;
            for (G = B.lastChild; G; G = B.lastChild)
              if (B = G, Q = this._internalFilter(B), Q === lG.FILTER_REJECT) break;
            if (Q === lG.FILTER_ACCEPT) return this._currentNode = B, B
          }
          if (B === this.root || B.parentNode === null) return null;
          if (B = B.parentNode, this._internalFilter(B) === lG.FILTER_ACCEPT) return this._currentNode = B, B
        }
        return null
      }
    },
    nextNode: {
      value: function A() {
        var B, Q, I, G;
        B = this._currentNode, Q = lG.FILTER_ACCEPT;
        A: while (!0) {
          for (I = B.firstChild; I; I = B.firstChild)
            if (B = I, Q = this._internalFilter(B), Q === lG.FILTER_ACCEPT) return this._currentNode = B, B;
            else if (Q === lG.FILTER_REJECT) break;
          for (G = NL2.nextSkippingChildren(B, this.root); G; G = NL2.nextSkippingChildren(B, this.root))
            if (B = G, Q = this._internalFilter(B), Q === lG.FILTER_ACCEPT) return this._currentNode = B, B;
            else if (Q === lG.FILTER_SKIP) continue A;
          return null
        }
      }
    },
    toString: {
      value: function A() {
        return "[object TreeWalker]"
      }
    }
  })
})
// @from(Start 7920722, End 7923807)
yL2 = z((PQB, jL2) => {
  jL2.exports = _L2;
  var QAA = OA1(),
    IAA = e1A(),
    SL2 = QQ();

  function fC5(A, B, Q) {
    if (Q) return IAA.next(A, B);
    else {
      if (A === B) return null;
      return IAA.previous(A, null)
    }
  }

  function TL2(A, B) {
    for (; B; B = B.parentNode)
      if (A === B) return !0;
    return !1
  }

  function PL2(A, B) {
    var Q, I;
    Q = A._referenceNode, I = A._pointerBeforeReferenceNode;
    while (!0) {
      if (I === B) I = !I;
      else if (Q = fC5(Q, A._root, B), Q === null) return null;
      var G = A._internalFilter(Q);
      if (G === QAA.FILTER_ACCEPT) break
    }
    return A._referenceNode = Q, A._pointerBeforeReferenceNode = I, Q
  }

  function _L2(A, B, Q) {
    if (!A || !A.nodeType) SL2.NotSupportedError();
    this._root = A, this._referenceNode = A, this._pointerBeforeReferenceNode = !0, this._whatToShow = Number(B) || 0, this._filter = Q || null, this._active = !1, A.doc._attachNodeIterator(this)
  }
  Object.defineProperties(_L2.prototype, {
    root: {
      get: function A() {
        return this._root
      }
    },
    referenceNode: {
      get: function A() {
        return this._referenceNode
      }
    },
    pointerBeforeReferenceNode: {
      get: function A() {
        return this._pointerBeforeReferenceNode
      }
    },
    whatToShow: {
      get: function A() {
        return this._whatToShow
      }
    },
    filter: {
      get: function A() {
        return this._filter
      }
    },
    _internalFilter: {
      value: function A(B) {
        var Q, I;
        if (this._active) SL2.InvalidStateError();
        if (!(1 << B.nodeType - 1 & this._whatToShow)) return QAA.FILTER_SKIP;
        if (I = this._filter, I === null) Q = QAA.FILTER_ACCEPT;
        else {
          this._active = !0;
          try {
            if (typeof I === "function") Q = I(B);
            else Q = I.acceptNode(B)
          } finally {
            this._active = !1
          }
        }
        return +Q
      }
    },
    _preremove: {
      value: function A(B) {
        if (TL2(B, this._root)) return;
        if (!TL2(B, this._referenceNode)) return;
        if (this._pointerBeforeReferenceNode) {
          var Q = B;
          while (Q.lastChild) Q = Q.lastChild;
          if (Q = IAA.next(Q, this.root), Q) {
            this._referenceNode = Q;
            return
          }
          this._pointerBeforeReferenceNode = !1
        }
        if (B.previousSibling === null) this._referenceNode = B.parentNode;
        else {
          this._referenceNode = B.previousSibling;
          var I;
          for (I = this._referenceNode.lastChild; I; I = this._referenceNode.lastChild) this._referenceNode = I
        }
      }
    },
    nextNode: {
      value: function A() {
        return PL2(this, !0)
      }
    },
    previousNode: {
      value: function A() {
        return PL2(this, !1)
      }
    },
    detach: {
      value: function A() {}
    },
    toString: {
      value: function A() {
        return "[object NodeIterator]"
      }
    }
  })
})
// @from(Start 7923813, End 7927730)
$z1 = z((SQB, kL2) => {
  kL2.exports = iG;

  function iG(A) {
    if (!A) return Object.create(iG.prototype);
    this.url = A.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
    var B = iG.pattern.exec(this.url);
    if (B) {
      if (B[2]) this.scheme = B[2];
      if (B[4]) {
        var Q = B[4].match(iG.userinfoPattern);
        if (Q) this.username = Q[1], this.password = Q[3], B[4] = B[4].substring(Q[0].length);
        if (B[4].match(iG.portPattern)) {
          var I = B[4].lastIndexOf(":");
          this.host = B[4].substring(0, I), this.port = B[4].substring(I + 1)
        } else this.host = B[4]
      }
      if (B[5]) this.path = B[5];
      if (B[6]) this.query = B[7];
      if (B[8]) this.fragment = B[9]
    }
  }
  iG.pattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
  iG.userinfoPattern = /^([^@:]*)(:([^@]*))?@/;
  iG.portPattern = /:\d+$/;
  iG.authorityPattern = /^[^:\/?#]+:\/\//;
  iG.hierarchyPattern = /^[^:\/?#]+:\//;
  iG.percentEncode = function A(B) {
    var Q = B.charCodeAt(0);
    if (Q < 256) return "%" + Q.toString(16);
    else throw Error("can't percent-encode codepoints > 255 yet")
  };
  iG.prototype = {
    constructor: iG,
    isAbsolute: function() {
      return !!this.scheme
    },
    isAuthorityBased: function() {
      return iG.authorityPattern.test(this.url)
    },
    isHierarchical: function() {
      return iG.hierarchyPattern.test(this.url)
    },
    toString: function() {
      var A = "";
      if (this.scheme !== void 0) A += this.scheme + ":";
      if (this.isAbsolute()) {
        if (A += "//", this.username || this.password) {
          if (A += this.username || "", this.password) A += ":" + this.password;
          A += "@"
        }
        if (this.host) A += this.host
      }
      if (this.port !== void 0) A += ":" + this.port;
      if (this.path !== void 0) A += this.path;
      if (this.query !== void 0) A += "?" + this.query;
      if (this.fragment !== void 0) A += "#" + this.fragment;
      return A
    },
    resolve: function(A) {
      var B = this,
        Q = new iG(A),
        I = new iG;
      if (Q.scheme !== void 0) I.scheme = Q.scheme, I.username = Q.username, I.password = Q.password, I.host = Q.host, I.port = Q.port, I.path = Z(Q.path), I.query = Q.query;
      else if (I.scheme = B.scheme, Q.host !== void 0) I.username = Q.username, I.password = Q.password, I.host = Q.host, I.port = Q.port, I.path = Z(Q.path), I.query = Q.query;
      else if (I.username = B.username, I.password = B.password, I.host = B.host, I.port = B.port, !Q.path)
        if (I.path = B.path, Q.query !== void 0) I.query = Q.query;
        else I.query = B.query;
      else {
        if (Q.path.charAt(0) === "/") I.path = Z(Q.path);
        else I.path = G(B.path, Q.path), I.path = Z(I.path);
        I.query = Q.query
      }
      return I.fragment = Q.fragment, I.toString();

      function G(D, Y) {
        if (B.host !== void 0 && !B.path) return "/" + Y;
        var W = D.lastIndexOf("/");
        if (W === -1) return Y;
        else return D.substring(0, W + 1) + Y
      }

      function Z(D) {
        if (!D) return D;
        var Y = "";
        while (D.length > 0) {
          if (D === "." || D === "..") {
            D = "";
            break
          }
          var W = D.substring(0, 2),
            J = D.substring(0, 3),
            F = D.substring(0, 4);
          if (J === "../") D = D.substring(3);
          else if (W === "./") D = D.substring(2);
          else if (J === "/./") D = "/" + D.substring(3);
          else if (W === "/." && D.length === 2) D = "/";
          else if (F === "/../" || J === "/.." && D.length === 3) D = "/" + D.substring(4), Y = Y.replace(/\/?[^\/]*$/, "");
          else {
            var X = D.match(/(\/?([^\/]*))/)[0];
            Y += X, D = D.substring(X.length)
          }
        }
        return Y
      }
    }
  }
})
// @from(Start 7927736, End 7927950)
vL2 = z((_QB, fL2) => {
  fL2.exports = GAA;
  var xL2 = fu();

  function GAA(A, B) {
    xL2.call(this, A, B)
  }
  GAA.prototype = Object.create(xL2.prototype, {
    constructor: {
      value: GAA
    }
  })
})
// @from(Start 7927956, End 7928087)
ZAA = z((jQB, bL2) => {
  bL2.exports = {
    Event: fu(),
    UIEvent: F1A(),
    MouseEvent: V1A(),
    CustomEvent: vL2()
  }
})
// @from(Start 7928093, End 7929293)
dL2 = z((hL2) => {
  Object.defineProperty(hL2, "__esModule", {
    value: !0
  });
  hL2.hyphenate = hL2.parse = void 0;

  function vC5(A) {
    let B = [],
      Q = 0,
      I = 0,
      G = 0,
      Z = 0,
      D = 0,
      Y = null;
    while (Q < A.length) switch (A.charCodeAt(Q++)) {
      case 40:
        I++;
        break;
      case 41:
        I--;
        break;
      case 39:
        if (G === 0) G = 39;
        else if (G === 39 && A.charCodeAt(Q - 1) !== 92) G = 0;
        break;
      case 34:
        if (G === 0) G = 34;
        else if (G === 34 && A.charCodeAt(Q - 1) !== 92) G = 0;
        break;
      case 58:
        if (!Y && I === 0 && G === 0) Y = gL2(A.substring(D, Q - 1).trim()), Z = Q;
        break;
      case 59:
        if (Y && Z > 0 && I === 0 && G === 0) {
          let J = A.substring(Z, Q - 1).trim();
          B.push(Y, J), D = Q, Z = 0, Y = null
        }
        break
    }
    if (Y && Z) {
      let W = A.slice(Z).trim();
      B.push(Y, W)
    }
    return B
  }
  hL2.parse = vC5;

  function gL2(A) {
    return A.replace(/[a-z][A-Z]/g, (B) => {
      return B.charAt(0) + "-" + B.charAt(1)
    }).toLowerCase()
  }
  hL2.hyphenate = gL2
})
// @from(Start 7929299, End 7933314)
qz1 = z((kQB, iL2) => {
  var {
    parse: gC5
  } = dL2();
  iL2.exports = function(A) {
    let B = new lL2(A);
    return new Proxy(B, {
      get: function(I, G) {
        return G in I ? I[G] : I.getPropertyValue(uL2(G))
      },
      has: function(I, G) {
        return !0
      },
      set: function(I, G, Z) {
        if (G in I) I[G] = Z;
        else I.setProperty(uL2(G), Z ?? void 0);
        return !0
      }
    })
  };

  function uL2(A) {
    return A.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
  }

  function lL2(A) {
    this._element = A
  }
  var pL2 = "!important";

  function cL2(A) {
    let B = {
      property: {},
      priority: {}
    };
    if (!A) return B;
    let Q = gC5(A);
    if (Q.length < 2) return B;
    for (let I = 0; I < Q.length; I += 2) {
      let G = Q[I],
        Z = Q[I + 1];
      if (Z.endsWith(pL2)) B.priority[G] = "important", Z = Z.slice(0, -pL2.length).trim();
      B.property[G] = Z
    }
    return B
  }
  var pu = {};
  lL2.prototype = Object.create(Object.prototype, {
    _parsed: {
      get: function() {
        if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
          var A = this.cssText;
          this._parsedStyles = cL2(A), this._lastParsedText = A, delete this._names
        }
        return this._parsedStyles
      }
    },
    _serialize: {
      value: function() {
        var A = this._parsed,
          B = "";
        for (var Q in A.property) {
          if (B) B += " ";
          if (B += Q + ": " + A.property[Q], A.priority[Q]) B += " !" + A.priority[Q];
          B += ";"
        }
        this.cssText = B, this._lastParsedText = B, delete this._names
      }
    },
    cssText: {
      get: function() {
        return this._element.getAttribute("style")
      },
      set: function(A) {
        this._element.setAttribute("style", A)
      }
    },
    length: {
      get: function() {
        if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
        return this._names.length
      }
    },
    item: {
      value: function(A) {
        if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
        return this._names[A]
      }
    },
    getPropertyValue: {
      value: function(A) {
        return A = A.toLowerCase(), this._parsed.property[A] || ""
      }
    },
    getPropertyPriority: {
      value: function(A) {
        return A = A.toLowerCase(), this._parsed.priority[A] || ""
      }
    },
    setProperty: {
      value: function(A, B, Q) {
        if (A = A.toLowerCase(), B === null || B === void 0) B = "";
        if (Q === null || Q === void 0) Q = "";
        if (B !== pu) B = "" + B;
        if (B = B.trim(), B === "") {
          this.removeProperty(A);
          return
        }
        if (Q !== "" && Q !== pu && !/^important$/i.test(Q)) return;
        var I = this._parsed;
        if (B === pu) {
          if (!I.property[A]) return;
          if (Q !== "") I.priority[A] = "important";
          else delete I.priority[A]
        } else {
          if (B.indexOf(";") !== -1) return;
          var G = cL2(A + ":" + B);
          if (Object.getOwnPropertyNames(G.property).length === 0) return;
          if (Object.getOwnPropertyNames(G.priority).length !== 0) return;
          for (var Z in G.property)
            if (I.property[Z] = G.property[Z], Q === pu) continue;
            else if (Q !== "") I.priority[Z] = "important";
          else if (I.priority[Z]) delete I.priority[Z]
        }
        this._serialize()
      }
    },
    setPropertyValue: {
      value: function(A, B) {
        return this.setProperty(A, B, pu)
      }
    },
    setPropertyPriority: {
      value: function(A, B) {
        return this.setProperty(A, pu, B)
      }
    },
    removeProperty: {
      value: function(A) {
        A = A.toLowerCase();
        var B = this._parsed;
        if (A in B.property) delete B.property[A], delete B.priority[A], this._serialize()
      }
    }
  })
})
// @from(Start 7933320, End 7938693)
DAA = z((xQB, nL2) => {
  var uI = $z1();
  nL2.exports = TA1;

  function TA1() {}
  TA1.prototype = Object.create(Object.prototype, {
    _url: {
      get: function() {
        return new uI(this.href)
      }
    },
    protocol: {
      get: function() {
        var A = this._url;
        if (A && A.scheme) return A.scheme + ":";
        else return ":"
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute()) {
          if (A = A.replace(/:+$/, ""), A = A.replace(/[^-+\.a-zA-Z0-9]/g, uI.percentEncode), A.length > 0) Q.scheme = A, B = Q.toString()
        }
        this.href = B
      }
    },
    host: {
      get: function() {
        var A = this._url;
        if (A.isAbsolute() && A.isAuthorityBased()) return A.host + (A.port ? ":" + A.port : "");
        else return ""
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute() && Q.isAuthorityBased()) {
          if (A = A.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, uI.percentEncode), A.length > 0) Q.host = A, delete Q.port, B = Q.toString()
        }
        this.href = B
      }
    },
    hostname: {
      get: function() {
        var A = this._url;
        if (A.isAbsolute() && A.isAuthorityBased()) return A.host;
        else return ""
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute() && Q.isAuthorityBased()) {
          if (A = A.replace(/^\/+/, ""), A = A.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, uI.percentEncode), A.length > 0) Q.host = A, B = Q.toString()
        }
        this.href = B
      }
    },
    port: {
      get: function() {
        var A = this._url;
        if (A.isAbsolute() && A.isAuthorityBased() && A.port !== void 0) return A.port;
        else return ""
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute() && Q.isAuthorityBased()) {
          if (A = "" + A, A = A.replace(/[^0-9].*$/, ""), A = A.replace(/^0+/, ""), A.length === 0) A = "0";
          if (parseInt(A, 10) <= 65535) Q.port = A, B = Q.toString()
        }
        this.href = B
      }
    },
    pathname: {
      get: function() {
        var A = this._url;
        if (A.isAbsolute() && A.isHierarchical()) return A.path;
        else return ""
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute() && Q.isHierarchical()) {
          if (A.charAt(0) !== "/") A = "/" + A;
          A = A.replace(/[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g, uI.percentEncode), Q.path = A, B = Q.toString()
        }
        this.href = B
      }
    },
    search: {
      get: function() {
        var A = this._url;
        if (A.isAbsolute() && A.isHierarchical() && A.query !== void 0) return "?" + A.query;
        else return ""
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute() && Q.isHierarchical()) {
          if (A.charAt(0) === "?") A = A.substring(1);
          A = A.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, uI.percentEncode), Q.query = A, B = Q.toString()
        }
        this.href = B
      }
    },
    hash: {
      get: function() {
        var A = this._url;
        if (A == null || A.fragment == null || A.fragment === "") return "";
        else return "#" + A.fragment
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (A.charAt(0) === "#") A = A.substring(1);
        A = A.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, uI.percentEncode), Q.fragment = A, B = Q.toString(), this.href = B
      }
    },
    username: {
      get: function() {
        var A = this._url;
        return A.username || ""
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute()) A = A.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g, uI.percentEncode), Q.username = A, B = Q.toString();
        this.href = B
      }
    },
    password: {
      get: function() {
        var A = this._url;
        return A.password || ""
      },
      set: function(A) {
        var B = this.href,
          Q = new uI(B);
        if (Q.isAbsolute()) {
          if (A === "") Q.password = null;
          else A = A.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g, uI.percentEncode), Q.password = A;
          B = Q.toString()
        }
        this.href = B
      }
    },
    origin: {
      get: function() {
        var A = this._url;
        if (A == null) return "";
        var B = function(Q) {
          var I = [A.scheme, A.host, +A.port || Q];
          return I[0] + "://" + I[1] + (I[2] === Q ? "" : ":" + I[2])
        };
        switch (A.scheme) {
          case "ftp":
            return B(21);
          case "gopher":
            return B(70);
          case "http":
          case "ws":
            return B(80);
          case "https":
          case "wss":
            return B(443);
          default:
            return A.scheme + "://"
        }
      }
    }
  });
  TA1._inherit = function(A) {
    Object.getOwnPropertyNames(TA1.prototype).forEach(function(B) {
      if (B === "constructor" || B === "href") return;
      var Q = Object.getOwnPropertyDescriptor(TA1.prototype, B);
      Object.defineProperty(A, B, Q)
    })
  }
})
// @from(Start 7938699, End 7940142)
YAA = z((fQB, rL2) => {
  var aL2 = T1A(),
    hC5 = Yz1().isApiWritable;
  rL2.exports = function(A, B, Q, I) {
    var G = A.ctor;
    if (G) {
      var Z = A.props || {};
      if (A.attributes)
        for (var D in A.attributes) {
          var Y = A.attributes[D];
          if (typeof Y !== "object" || Array.isArray(Y)) Y = {
            type: Y
          };
          if (!Y.name) Y.name = D.toLowerCase();
          Z[D] = aL2.property(Y)
        }
      if (Z.constructor = {
          value: G,
          writable: hC5
        }, G.prototype = Object.create((A.superclass || B).prototype, Z), A.events) dC5(G, A.events);
      Q[A.name] = G
    } else G = B;
    return (A.tags || A.tag && [A.tag] || []).forEach(function(W) {
      I[W] = G
    }), G
  };

  function sL2(A, B, Q, I) {
    this.body = A, this.document = B, this.form = Q, this.element = I
  }
  sL2.prototype.build = function() {
    return () => {}
  };

  function mC5(A, B, Q, I) {
    var G = A.ownerDocument || Object.create(null),
      Z = A.form || Object.create(null);
    A[B] = new sL2(I, G, Z, A).build()
  }

  function dC5(A, B) {
    var Q = A.prototype;
    B.forEach(function(I) {
      Object.defineProperty(Q, "on" + I, {
        get: function() {
          return this._getEventHandler(I)
        },
        set: function(G) {
          this._setEventHandler(I, G)
        }
      }), aL2.registerChangeHandler(A, "on" + I, mC5)
    })
  }
})
// @from(Start 7940148, End 7975315)
Lz1 = z((iC5) => {
  var WAA = cG(),
    oL2 = uu(),
    uC5 = qz1(),
    QF = QQ(),
    tL2 = DAA(),
    pC5 = YAA(),
    m$ = iC5.elements = {},
    PA1 = Object.create(null);
  iC5.createElement = function(A, B, Q) {
    var I = PA1[B] || lC5;
    return new I(A, B, Q)
  };

  function U2(A) {
    return pC5(A, K9, m$, PA1)
  }

  function IQ(A) {
    return {
      get: function() {
        var B = this._getattr(A);
        if (B === null) return "";
        var Q = this.doc._resolve(B);
        return Q === null ? B : Q
      },
      set: function(B) {
        this._setattr(A, B)
      }
    }
  }

  function Mz1(A) {
    return {
      get: function() {
        var B = this._getattr(A);
        if (B === null) return null;
        if (B.toLowerCase() === "use-credentials") return "use-credentials";
        return "anonymous"
      },
      set: function(B) {
        if (B === null || B === void 0) this.removeAttribute(A);
        else this._setattr(A, B)
      }
    }
  }
  var cu = {
      type: ["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"],
      missing: ""
    },
    cC5 = {
      A: !0,
      LINK: !0,
      BUTTON: !0,
      INPUT: !0,
      SELECT: !0,
      TEXTAREA: !0,
      COMMAND: !0
    },
    cK = function(A, B, Q) {
      K9.call(this, A, B, Q), this._form = null
    },
    K9 = iC5.HTMLElement = U2({
      superclass: oL2,
      name: "HTMLElement",
      ctor: function A(B, Q, I) {
        oL2.call(this, B, Q, QF.NAMESPACE.HTML, I)
      },
      props: {
        dangerouslySetInnerHTML: {
          set: function(A) {
            this._innerHTML = A
          }
        },
        innerHTML: {
          get: function() {
            return this.serialize()
          },
          set: function(A) {
            var B = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, this);
            B.parse(A === null ? "" : String(A), !0);
            var Q = this instanceof PA1.template ? this.content : this;
            while (Q.hasChildNodes()) Q.removeChild(Q.firstChild);
            Q.appendChild(B._asDocumentFragment())
          }
        },
        style: {
          get: function() {
            if (!this._style) this._style = new uC5(this);
            return this._style
          },
          set: function(A) {
            if (A === null || A === void 0) A = "";
            this._setattr("style", String(A))
          }
        },
        blur: {
          value: function() {}
        },
        focus: {
          value: function() {}
        },
        forceSpellCheck: {
          value: function() {}
        },
        click: {
          value: function() {
            if (this._click_in_progress) return;
            this._click_in_progress = !0;
            try {
              if (this._pre_click_activation_steps) this._pre_click_activation_steps();
              var A = this.ownerDocument.createEvent("MouseEvent");
              A.initMouseEvent("click", !0, !0, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
              var B = this.dispatchEvent(A);
              if (B) {
                if (this._post_click_activation_steps) this._post_click_activation_steps(A)
              } else if (this._cancelled_activation_steps) this._cancelled_activation_steps()
            } finally {
              this._click_in_progress = !1
            }
          }
        },
        submit: {
          value: QF.nyi
        }
      },
      attributes: {
        title: String,
        lang: String,
        dir: {
          type: ["ltr", "rtl", "auto"],
          missing: ""
        },
        draggable: {
          type: ["true", "false"],
          treatNullAsEmptyString: !0
        },
        spellcheck: {
          type: ["true", "false"],
          missing: ""
        },
        enterKeyHint: {
          type: ["enter", "done", "go", "next", "previous", "search", "send"],
          missing: ""
        },
        autoCapitalize: {
          type: ["off", "on", "none", "sentences", "words", "characters"],
          missing: ""
        },
        autoFocus: Boolean,
        accessKey: String,
        nonce: String,
        hidden: Boolean,
        translate: {
          type: ["no", "yes"],
          missing: ""
        },
        tabIndex: {
          type: "long",
          default: function() {
            if (this.tagName in cC5 || this.contentEditable) return 0;
            else return -1
          }
        }
      },
      events: ["abort", "canplay", "canplaythrough", "change", "click", "contextmenu", "cuechange", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "pause", "play", "playing", "progress", "ratechange", "readystatechange", "reset", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "blur", "error", "focus", "load", "scroll"]
    }),
    lC5 = U2({
      name: "HTMLUnknownElement",
      ctor: function A(B, Q, I) {
        K9.call(this, B, Q, I)
      }
    }),
    lK = {
      form: {
        get: function() {
          return this._form
        }
      }
    };
  U2({
    tag: "a",
    name: "HTMLAnchorElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      _post_click_activation_steps: {
        value: function(A) {
          if (this.href) this.ownerDocument.defaultView.location = this.href
        }
      }
    },
    attributes: {
      href: IQ,
      ping: String,
      download: String,
      target: String,
      rel: String,
      media: String,
      hreflang: String,
      type: String,
      referrerPolicy: cu,
      coords: String,
      charset: String,
      name: String,
      rev: String,
      shape: String
    }
  });
  tL2._inherit(PA1.a.prototype);
  U2({
    tag: "area",
    name: "HTMLAreaElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      alt: String,
      target: String,
      download: String,
      rel: String,
      media: String,
      href: IQ,
      hreflang: String,
      type: String,
      shape: String,
      coords: String,
      ping: String,
      referrerPolicy: cu,
      noHref: Boolean
    }
  });
  tL2._inherit(PA1.area.prototype);
  U2({
    tag: "br",
    name: "HTMLBRElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      clear: String
    }
  });
  U2({
    tag: "base",
    name: "HTMLBaseElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      target: String
    }
  });
  U2({
    tag: "body",
    name: "HTMLBodyElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    events: ["afterprint", "beforeprint", "beforeunload", "blur", "error", "focus", "hashchange", "load", "message", "offline", "online", "pagehide", "pageshow", "popstate", "resize", "scroll", "storage", "unload"],
    attributes: {
      text: {
        type: String,
        treatNullAsEmptyString: !0
      },
      link: {
        type: String,
        treatNullAsEmptyString: !0
      },
      vLink: {
        type: String,
        treatNullAsEmptyString: !0
      },
      aLink: {
        type: String,
        treatNullAsEmptyString: !0
      },
      bgColor: {
        type: String,
        treatNullAsEmptyString: !0
      },
      background: String
    }
  });
  U2({
    tag: "button",
    name: "HTMLButtonElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK,
    attributes: {
      name: String,
      value: String,
      disabled: Boolean,
      autofocus: Boolean,
      type: {
        type: ["submit", "reset", "button", "menu"],
        missing: "submit"
      },
      formTarget: String,
      formAction: IQ,
      formNoValidate: Boolean,
      formMethod: {
        type: ["get", "post", "dialog"],
        invalid: "get",
        missing: ""
      },
      formEnctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: ""
      }
    }
  });
  U2({
    tag: "dl",
    name: "HTMLDListElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      compact: Boolean
    }
  });
  U2({
    tag: "data",
    name: "HTMLDataElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      value: String
    }
  });
  U2({
    tag: "datalist",
    name: "HTMLDataListElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    }
  });
  U2({
    tag: "details",
    name: "HTMLDetailsElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      open: Boolean
    }
  });
  U2({
    tag: "div",
    name: "HTMLDivElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      align: String
    }
  });
  U2({
    tag: "embed",
    name: "HTMLEmbedElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      src: IQ,
      type: String,
      width: String,
      height: String,
      align: String,
      name: String
    }
  });
  U2({
    tag: "fieldset",
    name: "HTMLFieldSetElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK,
    attributes: {
      disabled: Boolean,
      name: String
    }
  });
  U2({
    tag: "form",
    name: "HTMLFormElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      action: String,
      autocomplete: {
        type: ["on", "off"],
        missing: "on"
      },
      name: String,
      acceptCharset: {
        name: "accept-charset"
      },
      target: String,
      noValidate: Boolean,
      method: {
        type: ["get", "post", "dialog"],
        invalid: "get",
        missing: "get"
      },
      enctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "application/x-www-form-urlencoded"
      },
      encoding: {
        name: "enctype",
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "application/x-www-form-urlencoded"
      }
    }
  });
  U2({
    tag: "hr",
    name: "HTMLHRElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      align: String,
      color: String,
      noShade: Boolean,
      size: String,
      width: String
    }
  });
  U2({
    tag: "head",
    name: "HTMLHeadElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    }
  });
  U2({
    tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
    name: "HTMLHeadingElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      align: String
    }
  });
  U2({
    tag: "html",
    name: "HTMLHtmlElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      xmlns: IQ,
      version: String
    }
  });
  U2({
    tag: "iframe",
    name: "HTMLIFrameElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      src: IQ,
      srcdoc: String,
      name: String,
      width: String,
      height: String,
      seamless: Boolean,
      allow: Boolean,
      allowFullscreen: Boolean,
      allowUserMedia: Boolean,
      allowPaymentRequest: Boolean,
      referrerPolicy: cu,
      loading: {
        type: ["eager", "lazy"],
        treatNullAsEmptyString: !0
      },
      align: String,
      scrolling: String,
      frameBorder: String,
      longDesc: IQ,
      marginHeight: {
        type: String,
        treatNullAsEmptyString: !0
      },
      marginWidth: {
        type: String,
        treatNullAsEmptyString: !0
      }
    }
  });
  U2({
    tag: "img",
    name: "HTMLImageElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      alt: String,
      src: IQ,
      srcset: String,
      crossOrigin: Mz1,
      useMap: String,
      isMap: Boolean,
      sizes: String,
      height: {
        type: "unsigned long",
        default: 0
      },
      width: {
        type: "unsigned long",
        default: 0
      },
      referrerPolicy: cu,
      loading: {
        type: ["eager", "lazy"],
        missing: ""
      },
      name: String,
      lowsrc: IQ,
      align: String,
      hspace: {
        type: "unsigned long",
        default: 0
      },
      vspace: {
        type: "unsigned long",
        default: 0
      },
      longDesc: IQ,
      border: {
        type: String,
        treatNullAsEmptyString: !0
      }
    }
  });
  U2({
    tag: "input",
    name: "HTMLInputElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: {
      form: lK.form,
      _post_click_activation_steps: {
        value: function(A) {
          if (this.type === "checkbox") this.checked = !this.checked;
          else if (this.type === "radio") {
            var B = this.form.getElementsByName(this.name);
            for (var Q = B.length - 1; Q >= 0; Q--) {
              var I = B[Q];
              I.checked = I === this
            }
          }
        }
      }
    },
    attributes: {
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      accept: String,
      alt: String,
      max: String,
      min: String,
      pattern: String,
      placeholder: String,
      step: String,
      dirName: String,
      defaultValue: {
        name: "value"
      },
      multiple: Boolean,
      required: Boolean,
      readOnly: Boolean,
      checked: Boolean,
      value: String,
      src: IQ,
      defaultChecked: {
        name: "checked",
        type: Boolean
      },
      size: {
        type: "unsigned long",
        default: 20,
        min: 1,
        setmin: 1
      },
      width: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: 0
      },
      height: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: 0
      },
      minLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      maxLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      autocomplete: String,
      type: {
        type: ["text", "hidden", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"],
        missing: "text"
      },
      formTarget: String,
      formNoValidate: Boolean,
      formMethod: {
        type: ["get", "post"],
        invalid: "get",
        missing: ""
      },
      formEnctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: ""
      },
      inputMode: {
        type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
        missing: ""
      },
      align: String,
      useMap: String
    }
  });
  U2({
    tag: "keygen",
    name: "HTMLKeygenElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK,
    attributes: {
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      challenge: String,
      keytype: {
        type: ["rsa"],
        missing: ""
      }
    }
  });
  U2({
    tag: "li",
    name: "HTMLLIElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      value: {
        type: "long",
        default: 0
      },
      type: String
    }
  });
  U2({
    tag: "label",
    name: "HTMLLabelElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK,
    attributes: {
      htmlFor: {
        name: "for",
        type: String
      }
    }
  });
  U2({
    tag: "legend",
    name: "HTMLLegendElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      align: String
    }
  });
  U2({
    tag: "link",
    name: "HTMLLinkElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      href: IQ,
      rel: String,
      media: String,
      hreflang: String,
      type: String,
      crossOrigin: Mz1,
      nonce: String,
      integrity: String,
      referrerPolicy: cu,
      imageSizes: String,
      imageSrcset: String,
      charset: String,
      rev: String,
      target: String
    }
  });
  U2({
    tag: "map",
    name: "HTMLMapElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      name: String
    }
  });
  U2({
    tag: "menu",
    name: "HTMLMenuElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      type: {
        type: ["context", "popup", "toolbar"],
        missing: "toolbar"
      },
      label: String,
      compact: Boolean
    }
  });
  U2({
    tag: "meta",
    name: "HTMLMetaElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      name: String,
      content: String,
      httpEquiv: {
        name: "http-equiv",
        type: String
      },
      scheme: String
    }
  });
  U2({
    tag: "meter",
    name: "HTMLMeterElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK
  });
  U2({
    tags: ["ins", "del"],
    name: "HTMLModElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      cite: IQ,
      dateTime: String
    }
  });
  U2({
    tag: "ol",
    name: "HTMLOListElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      _numitems: {
        get: function() {
          var A = 0;
          return this.childNodes.forEach(function(B) {
            if (B.nodeType === WAA.ELEMENT_NODE && B.tagName === "LI") A++
          }), A
        }
      }
    },
    attributes: {
      type: String,
      reversed: Boolean,
      start: {
        type: "long",
        default: function() {
          if (this.reversed) return this._numitems;
          else return 1
        }
      },
      compact: Boolean
    }
  });
  U2({
    tag: "object",
    name: "HTMLObjectElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK,
    attributes: {
      data: IQ,
      type: String,
      name: String,
      useMap: String,
      typeMustMatch: Boolean,
      width: String,
      height: String,
      align: String,
      archive: String,
      code: String,
      declare: Boolean,
      hspace: {
        type: "unsigned long",
        default: 0
      },
      standby: String,
      vspace: {
        type: "unsigned long",
        default: 0
      },
      codeBase: IQ,
      codeType: String,
      border: {
        type: String,
        treatNullAsEmptyString: !0
      }
    }
  });
  U2({
    tag: "optgroup",
    name: "HTMLOptGroupElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      disabled: Boolean,
      label: String
    }
  });
  U2({
    tag: "option",
    name: "HTMLOptionElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      form: {
        get: function() {
          var A = this.parentNode;
          while (A && A.nodeType === WAA.ELEMENT_NODE) {
            if (A.localName === "select") return A.form;
            A = A.parentNode
          }
        }
      },
      value: {
        get: function() {
          return this._getattr("value") || this.text
        },
        set: function(A) {
          this._setattr("value", A)
        }
      },
      text: {
        get: function() {
          return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim()
        },
        set: function(A) {
          this.textContent = A
        }
      }
    },
    attributes: {
      disabled: Boolean,
      defaultSelected: {
        name: "selected",
        type: Boolean
      },
      label: String
    }
  });
  U2({
    tag: "output",
    name: "HTMLOutputElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK,
    attributes: {
      name: String
    }
  });
  U2({
    tag: "p",
    name: "HTMLParagraphElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      align: String
    }
  });
  U2({
    tag: "param",
    name: "HTMLParamElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      name: String,
      value: String,
      type: String,
      valueType: String
    }
  });
  U2({
    tags: ["pre", "listing", "xmp"],
    name: "HTMLPreElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      width: {
        type: "long",
        default: 0
      }
    }
  });
  U2({
    tag: "progress",
    name: "HTMLProgressElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: lK,
    attributes: {
      max: {
        type: Number,
        float: !0,
        default: 1,
        min: 0
      }
    }
  });
  U2({
    tags: ["q", "blockquote"],
    name: "HTMLQuoteElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      cite: IQ
    }
  });
  U2({
    tag: "script",
    name: "HTMLScriptElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      text: {
        get: function() {
          var A = "";
          for (var B = 0, Q = this.childNodes.length; B < Q; B++) {
            var I = this.childNodes[B];
            if (I.nodeType === WAA.TEXT_NODE) A += I._data
          }
          return A
        },
        set: function(A) {
          if (this.removeChildren(), A !== null && A !== "") this.appendChild(this.ownerDocument.createTextNode(A))
        }
      }
    },
    attributes: {
      src: IQ,
      type: String,
      charset: String,
      referrerPolicy: cu,
      defer: Boolean,
      async: Boolean,
      nomodule: Boolean,
      crossOrigin: Mz1,
      nonce: String,
      integrity: String
    }
  });
  U2({
    tag: "select",
    name: "HTMLSelectElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: {
      form: lK.form,
      options: {
        get: function() {
          return this.getElementsByTagName("option")
        }
      }
    },
    attributes: {
      autocomplete: String,
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      multiple: Boolean,
      required: Boolean,
      size: {
        type: "unsigned long",
        default: 0
      }
    }
  });
  U2({
    tag: "span",
    name: "HTMLSpanElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    }
  });
  U2({
    tag: "style",
    name: "HTMLStyleElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      media: String,
      type: String,
      scoped: Boolean
    }
  });
  U2({
    tag: "caption",
    name: "HTMLTableCaptionElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      align: String
    }
  });
  U2({
    name: "HTMLTableCellElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      colSpan: {
        type: "unsigned long",
        default: 1
      },
      rowSpan: {
        type: "unsigned long",
        default: 1
      },
      scope: {
        type: ["row", "col", "rowgroup", "colgroup"],
        missing: ""
      },
      abbr: String,
      align: String,
      axis: String,
      height: String,
      width: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      noWrap: Boolean,
      vAlign: String,
      bgColor: {
        type: String,
        treatNullAsEmptyString: !0
      }
    }
  });
  U2({
    tags: ["col", "colgroup"],
    name: "HTMLTableColElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      span: {
        type: "limited unsigned long with fallback",
        default: 1,
        min: 1
      },
      align: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      vAlign: String,
      width: String
    }
  });
  U2({
    tag: "table",
    name: "HTMLTableElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      rows: {
        get: function() {
          return this.getElementsByTagName("tr")
        }
      }
    },
    attributes: {
      align: String,
      border: String,
      frame: String,
      rules: String,
      summary: String,
      width: String,
      bgColor: {
        type: String,
        treatNullAsEmptyString: !0
      },
      cellPadding: {
        type: String,
        treatNullAsEmptyString: !0
      },
      cellSpacing: {
        type: String,
        treatNullAsEmptyString: !0
      }
    }
  });
  U2({
    tag: "template",
    name: "HTMLTemplateElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I), this._contentFragment = B._templateDoc.createDocumentFragment()
    },
    props: {
      content: {
        get: function() {
          return this._contentFragment
        }
      },
      serialize: {
        value: function() {
          return this.content.serialize()
        }
      }
    }
  });
  U2({
    tag: "tr",
    name: "HTMLTableRowElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      cells: {
        get: function() {
          return this.querySelectorAll("td,th")
        }
      }
    },
    attributes: {
      align: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      vAlign: String,
      bgColor: {
        type: String,
        treatNullAsEmptyString: !0
      }
    }
  });
  U2({
    tags: ["thead", "tfoot", "tbody"],
    name: "HTMLTableSectionElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      rows: {
        get: function() {
          return this.getElementsByTagName("tr")
        }
      }
    },
    attributes: {
      align: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      vAlign: String
    }
  });
  U2({
    tag: "textarea",
    name: "HTMLTextAreaElement",
    ctor: function A(B, Q, I) {
      cK.call(this, B, Q, I)
    },
    props: {
      form: lK.form,
      type: {
        get: function() {
          return "textarea"
        }
      },
      defaultValue: {
        get: function() {
          return this.textContent
        },
        set: function(A) {
          this.textContent = A
        }
      },
      value: {
        get: function() {
          return this.defaultValue
        },
        set: function(A) {
          this.defaultValue = A
        }
      },
      textLength: {
        get: function() {
          return this.value.length
        }
      }
    },
    attributes: {
      autocomplete: String,
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      placeholder: String,
      wrap: String,
      dirName: String,
      required: Boolean,
      readOnly: Boolean,
      rows: {
        type: "limited unsigned long with fallback",
        default: 2
      },
      cols: {
        type: "limited unsigned long with fallback",
        default: 20
      },
      maxLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      minLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      inputMode: {
        type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
        missing: ""
      }
    }
  });
  U2({
    tag: "time",
    name: "HTMLTimeElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      dateTime: String,
      pubDate: Boolean
    }
  });
  U2({
    tag: "title",
    name: "HTMLTitleElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      text: {
        get: function() {
          return this.textContent
        }
      }
    }
  });
  U2({
    tag: "ul",
    name: "HTMLUListElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      type: String,
      compact: Boolean
    }
  });
  U2({
    name: "HTMLMediaElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      src: IQ,
      crossOrigin: Mz1,
      preload: {
        type: ["metadata", "none", "auto", {
          value: "",
          alias: "auto"
        }],
        missing: "auto"
      },
      loop: Boolean,
      autoplay: Boolean,
      mediaGroup: String,
      controls: Boolean,
      defaultMuted: {
        name: "muted",
        type: Boolean
      }
    }
  });
  U2({
    name: "HTMLAudioElement",
    tag: "audio",
    superclass: m$.HTMLMediaElement,
    ctor: function A(B, Q, I) {
      m$.HTMLMediaElement.call(this, B, Q, I)
    }
  });
  U2({
    name: "HTMLVideoElement",
    tag: "video",
    superclass: m$.HTMLMediaElement,
    ctor: function A(B, Q, I) {
      m$.HTMLMediaElement.call(this, B, Q, I)
    },
    attributes: {
      poster: IQ,
      width: {
        type: "unsigned long",
        min: 0,
        default: 0
      },
      height: {
        type: "unsigned long",
        min: 0,
        default: 0
      }
    }
  });
  U2({
    tag: "td",
    name: "HTMLTableDataCellElement",
    superclass: m$.HTMLTableCellElement,
    ctor: function A(B, Q, I) {
      m$.HTMLTableCellElement.call(this, B, Q, I)
    }
  });
  U2({
    tag: "th",
    name: "HTMLTableHeaderCellElement",
    superclass: m$.HTMLTableCellElement,
    ctor: function A(B, Q, I) {
      m$.HTMLTableCellElement.call(this, B, Q, I)
    }
  });
  U2({
    tag: "frameset",
    name: "HTMLFrameSetElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    }
  });
  U2({
    tag: "frame",
    name: "HTMLFrameElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    }
  });
  U2({
    tag: "canvas",
    name: "HTMLCanvasElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      getContext: {
        value: QF.nyi
      },
      probablySupportsContext: {
        value: QF.nyi
      },
      setContext: {
        value: QF.nyi
      },
      transferControlToProxy: {
        value: QF.nyi
      },
      toDataURL: {
        value: QF.nyi
      },
      toBlob: {
        value: QF.nyi
      }
    },
    attributes: {
      width: {
        type: "unsigned long",
        default: 300
      },
      height: {
        type: "unsigned long",
        default: 150
      }
    }
  });
  U2({
    tag: "dialog",
    name: "HTMLDialogElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      show: {
        value: QF.nyi
      },
      showModal: {
        value: QF.nyi
      },
      close: {
        value: QF.nyi
      }
    },
    attributes: {
      open: Boolean,
      returnValue: String
    }
  });
  U2({
    tag: "menuitem",
    name: "HTMLMenuItemElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    props: {
      _label: {
        get: function() {
          var A = this._getattr("label");
          if (A !== null && A !== "") return A;
          return A = this.textContent, A.replace(/[ \t\n\f\r]+/g, " ").trim()
        }
      },
      label: {
        get: function() {
          var A = this._getattr("label");
          if (A !== null) return A;
          return this._label
        },
        set: function(A) {
          this._setattr("label", A)
        }
      }
    },
    attributes: {
      type: {
        type: ["command", "checkbox", "radio"],
        missing: "command"
      },
      icon: IQ,
      disabled: Boolean,
      checked: Boolean,
      radiogroup: String,
      default: Boolean
    }
  });
  U2({
    tag: "source",
    name: "HTMLSourceElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      srcset: String,
      sizes: String,
      media: String,
      src: IQ,
      type: String,
      width: String,
      height: String
    }
  });
  U2({
    tag: "track",
    name: "HTMLTrackElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      src: IQ,
      srclang: String,
      label: String,
      default: Boolean,
      kind: {
        type: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
        missing: "subtitles",
        invalid: "metadata"
      }
    },
    props: {
      NONE: {
        get: function() {
          return 0
        }
      },
      LOADING: {
        get: function() {
          return 1
        }
      },
      LOADED: {
        get: function() {
          return 2
        }
      },
      ERROR: {
        get: function() {
          return 3
        }
      },
      readyState: {
        get: QF.nyi
      },
      track: {
        get: QF.nyi
      }
    }
  });
  U2({
    tag: "font",
    name: "HTMLFontElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      color: {
        type: String,
        treatNullAsEmptyString: !0
      },
      face: {
        type: String
      },
      size: {
        type: String
      }
    }
  });
  U2({
    tag: "dir",
    name: "HTMLDirectoryElement",
    ctor: function A(B, Q, I) {
      K9.call(this, B, Q, I)
    },
    attributes: {
      compact: Boolean
    }
  });
  U2({
    tags: ["abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "content", "code", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "hgroup", "i", "kbd", "main", "mark", "nav", "noscript", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr", "acronym", "basefont", "big", "center", "nobr", "noembed", "noframes", "plaintext", "strike", "tt"]
  })
})
// @from(Start 7975321, End 7977245)
XAA = z((tC5) => {
  var eL2 = uu(),
    aC5 = YAA(),
    sC5 = QQ(),
    rC5 = qz1(),
    oC5 = tC5.elements = {},
    AR2 = Object.create(null);
  tC5.createElement = function(A, B, Q) {
    var I = AR2[B] || FAA;
    return new I(A, B, Q)
  };

  function JAA(A) {
    return aC5(A, FAA, oC5, AR2)
  }
  var FAA = JAA({
    superclass: eL2,
    name: "SVGElement",
    ctor: function A(B, Q, I) {
      eL2.call(this, B, Q, sC5.NAMESPACE.SVG, I)
    },
    props: {
      style: {
        get: function() {
          if (!this._style) this._style = new rC5(this);
          return this._style
        }
      }
    }
  });
  JAA({
    name: "SVGSVGElement",
    ctor: function A(B, Q, I) {
      FAA.call(this, B, Q, I)
    },
    tag: "svg",
    props: {
      createSVGRect: {
        value: function() {
          return tC5.createElement(this.ownerDocument, "rect", null)
        }
      }
    }
  });
  JAA({
    tags: ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"]
  })
})
// @from(Start 7977251, End 7977388)
IR2 = z((dQB, QR2) => {
  QR2.exports = {
    VALUE: 1,
    ATTR: 2,
    REMOVE_ATTR: 3,
    REMOVE: 4,
    MOVE: 5,
    INSERT: 6
  }
})
// @from(Start 7977394, End 7995175)
Oz1 = z((uQB, CR2) => {
  CR2.exports = _A1;
  var iZ = cG(),
    eC5 = Oy(),
    JR2 = Fz1(),
    IT = uu(),
    AK5 = c1A(),
    BK5 = i1A(),
    SA1 = fu(),
    QK5 = a1A(),
    IK5 = r1A(),
    GK5 = jA1(),
    ZK5 = OL2(),
    DK5 = yL2(),
    GR2 = OA1(),
    ZR2 = $z1(),
    DR2 = Hz1(),
    YK5 = ZAA(),
    Rz1 = Xz1(),
    VAA = Lz1(),
    WK5 = XAA(),
    O5 = QQ(),
    lu = IR2(),
    nu = O5.NAMESPACE,
    CAA = Yz1().isApiWritable;

  function _A1(A, B) {
    JR2.call(this), this.nodeType = iZ.DOCUMENT_NODE, this.isHTML = A, this._address = B || "about:blank", this.readyState = "loading", this.implementation = new GK5(this), this.ownerDocument = null, this._contentType = A ? "text/html" : "application/xml", this.doctype = null, this.documentElement = null, this._templateDocCache = null, this._nodeIterators = null, this._nid = 1, this._nextnid = 2, this._nodes = [null, this], this.byId = Object.create(null), this.modclock = 0
  }
  var JK5 = {
      event: "Event",
      customevent: "CustomEvent",
      uievent: "UIEvent",
      mouseevent: "MouseEvent"
    },
    FK5 = {
      events: "event",
      htmlevents: "event",
      mouseevents: "mouseevent",
      mutationevents: "mutationevent",
      uievents: "uievent"
    },
    iu = function(A, B, Q) {
      return {
        get: function() {
          var I = A.call(this);
          if (I) return I[B];
          return Q
        },
        set: function(I) {
          var G = A.call(this);
          if (G) G[B] = I
        }
      }
    };

  function YR2(A, B) {
    var Q, I, G;
    if (A === "") A = null;
    if (!Rz1.isValidQName(B)) O5.InvalidCharacterError();
    if (Q = null, I = B, G = B.indexOf(":"), G >= 0) Q = B.substring(0, G), I = B.substring(G + 1);
    if (Q !== null && A === null) O5.NamespaceError();
    if (Q === "xml" && A !== nu.XML) O5.NamespaceError();
    if ((Q === "xmlns" || B === "xmlns") && A !== nu.XMLNS) O5.NamespaceError();
    if (A === nu.XMLNS && !(Q === "xmlns" || B === "xmlns")) O5.NamespaceError();
    return {
      namespace: A,
      prefix: Q,
      localName: I
    }
  }
  _A1.prototype = Object.create(JR2.prototype, {
    _setMutationHandler: {
      value: function(A) {
        this.mutationHandler = A
      }
    },
    _dispatchRendererEvent: {
      value: function(A, B, Q) {
        var I = this._nodes[A];
        if (!I) return;
        I._dispatchEvent(new SA1(B, Q), !0)
      }
    },
    nodeName: {
      value: "#document"
    },
    nodeValue: {
      get: function() {
        return null
      },
      set: function() {}
    },
    documentURI: {
      get: function() {
        return this._address
      },
      set: O5.nyi
    },
    compatMode: {
      get: function() {
        return this._quirks ? "BackCompat" : "CSS1Compat"
      }
    },
    createTextNode: {
      value: function(A) {
        return new AK5(this, String(A))
      }
    },
    createComment: {
      value: function(A) {
        return new BK5(this, A)
      }
    },
    createDocumentFragment: {
      value: function() {
        return new QK5(this)
      }
    },
    createProcessingInstruction: {
      value: function(A, B) {
        if (!Rz1.isValidName(A) || B.indexOf("?>") !== -1) O5.InvalidCharacterError();
        return new IK5(this, A, B)
      }
    },
    createAttribute: {
      value: function(A) {
        if (A = String(A), !Rz1.isValidName(A)) O5.InvalidCharacterError();
        if (this.isHTML) A = O5.toASCIILowerCase(A);
        return new IT._Attr(null, A, null, null, "")
      }
    },
    createAttributeNS: {
      value: function(A, B) {
        A = A === null || A === void 0 || A === "" ? null : String(A), B = String(B);
        var Q = YR2(A, B);
        return new IT._Attr(null, Q.localName, Q.prefix, Q.namespace, "")
      }
    },
    createElement: {
      value: function(A) {
        if (A = String(A), !Rz1.isValidName(A)) O5.InvalidCharacterError();
        if (this.isHTML) {
          if (/[A-Z]/.test(A)) A = O5.toASCIILowerCase(A);
          return VAA.createElement(this, A, null)
        } else if (this.contentType === "application/xhtml+xml") return VAA.createElement(this, A, null);
        else return new IT(this, A, null, null)
      },
      writable: CAA
    },
    createElementNS: {
      value: function(A, B) {
        A = A === null || A === void 0 || A === "" ? null : String(A), B = String(B);
        var Q = YR2(A, B);
        return this._createElementNS(Q.localName, Q.namespace, Q.prefix)
      },
      writable: CAA
    },
    _createElementNS: {
      value: function(A, B, Q) {
        if (B === nu.HTML) return VAA.createElement(this, A, Q);
        else if (B === nu.SVG) return WK5.createElement(this, A, Q);
        return new IT(this, A, B, Q)
      }
    },
    createEvent: {
      value: function A(B) {
        B = B.toLowerCase();
        var Q = FK5[B] || B,
          I = YK5[JK5[Q]];
        if (I) {
          var G = new I;
          return G._initialized = !1, G
        } else O5.NotSupportedError()
      }
    },
    createTreeWalker: {
      value: function(A, B, Q) {
        if (!A) throw new TypeError("root argument is required");
        if (!(A instanceof iZ)) throw new TypeError("root not a node");
        return B = B === void 0 ? GR2.SHOW_ALL : +B, Q = Q === void 0 ? null : Q, new ZK5(A, B, Q)
      }
    },
    createNodeIterator: {
      value: function(A, B, Q) {
        if (!A) throw new TypeError("root argument is required");
        if (!(A instanceof iZ)) throw new TypeError("root not a node");
        return B = B === void 0 ? GR2.SHOW_ALL : +B, Q = Q === void 0 ? null : Q, new DK5(A, B, Q)
      }
    },
    _attachNodeIterator: {
      value: function(A) {
        if (!this._nodeIterators) this._nodeIterators = [];
        this._nodeIterators.push(A)
      }
    },
    _detachNodeIterator: {
      value: function(A) {
        var B = this._nodeIterators.indexOf(A);
        this._nodeIterators.splice(B, 1)
      }
    },
    _preremoveNodeIterators: {
      value: function(A) {
        if (this._nodeIterators) this._nodeIterators.forEach(function(B) {
          B._preremove(A)
        })
      }
    },
    _updateDocTypeElement: {
      value: function A() {
        this.doctype = this.documentElement = null;
        for (var B = this.firstChild; B !== null; B = B.nextSibling)
          if (B.nodeType === iZ.DOCUMENT_TYPE_NODE) this.doctype = B;
          else if (B.nodeType === iZ.ELEMENT_NODE) this.documentElement = B
      }
    },
    insertBefore: {
      value: function A(B, Q) {
        return iZ.prototype.insertBefore.call(this, B, Q), this._updateDocTypeElement(), B
      }
    },
    replaceChild: {
      value: function A(B, Q) {
        return iZ.prototype.replaceChild.call(this, B, Q), this._updateDocTypeElement(), Q
      }
    },
    removeChild: {
      value: function A(B) {
        return iZ.prototype.removeChild.call(this, B), this._updateDocTypeElement(), B
      }
    },
    getElementById: {
      value: function(A) {
        var B = this.byId[A];
        if (!B) return null;
        if (B instanceof d$) return B.getFirst();
        return B
      }
    },
    _hasMultipleElementsWithId: {
      value: function(A) {
        return this.byId[A] instanceof d$
      }
    },
    getElementsByName: {
      value: IT.prototype.getElementsByName
    },
    getElementsByTagName: {
      value: IT.prototype.getElementsByTagName
    },
    getElementsByTagNameNS: {
      value: IT.prototype.getElementsByTagNameNS
    },
    getElementsByClassName: {
      value: IT.prototype.getElementsByClassName
    },
    adoptNode: {
      value: function A(B) {
        if (B.nodeType === iZ.DOCUMENT_NODE) O5.NotSupportedError();
        if (B.nodeType === iZ.ATTRIBUTE_NODE) return B;
        if (B.parentNode) B.parentNode.removeChild(B);
        if (B.ownerDocument !== this) VR2(B, this);
        return B
      }
    },
    importNode: {
      value: function A(B, Q) {
        return this.adoptNode(B.cloneNode(Q))
      },
      writable: CAA
    },
    origin: {
      get: function A() {
        return null
      }
    },
    characterSet: {
      get: function A() {
        return "UTF-8"
      }
    },
    contentType: {
      get: function A() {
        return this._contentType
      }
    },
    URL: {
      get: function A() {
        return this._address
      }
    },
    domain: {
      get: O5.nyi,
      set: O5.nyi
    },
    referrer: {
      get: O5.nyi
    },
    cookie: {
      get: O5.nyi,
      set: O5.nyi
    },
    lastModified: {
      get: O5.nyi
    },
    location: {
      get: function() {
        return this.defaultView ? this.defaultView.location : null
      },
      set: O5.nyi
    },
    _titleElement: {
      get: function() {
        return this.getElementsByTagName("title").item(0) || null
      }
    },
    title: {
      get: function() {
        var A = this._titleElement,
          B = A ? A.textContent : "";
        return B.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "")
      },
      set: function(A) {
        var B = this._titleElement,
          Q = this.head;
        if (!B && !Q) return;
        if (!B) B = this.createElement("title"), Q.appendChild(B);
        B.textContent = A
      }
    },
    dir: iu(function() {
      var A = this.documentElement;
      if (A && A.tagName === "HTML") return A
    }, "dir", ""),
    fgColor: iu(function() {
      return this.body
    }, "text", ""),
    linkColor: iu(function() {
      return this.body
    }, "link", ""),
    vlinkColor: iu(function() {
      return this.body
    }, "vLink", ""),
    alinkColor: iu(function() {
      return this.body
    }, "aLink", ""),
    bgColor: iu(function() {
      return this.body
    }, "bgColor", ""),
    charset: {
      get: function() {
        return this.characterSet
      }
    },
    inputEncoding: {
      get: function() {
        return this.characterSet
      }
    },
    scrollingElement: {
      get: function() {
        return this._quirks ? this.body : this.documentElement
      }
    },
    body: {
      get: function() {
        return WR2(this.documentElement, "body")
      },
      set: O5.nyi
    },
    head: {
      get: function() {
        return WR2(this.documentElement, "head")
      }
    },
    images: {
      get: O5.nyi
    },
    embeds: {
      get: O5.nyi
    },
    plugins: {
      get: O5.nyi
    },
    links: {
      get: O5.nyi
    },
    forms: {
      get: O5.nyi
    },
    scripts: {
      get: O5.nyi
    },
    applets: {
      get: function() {
        return []
      }
    },
    activeElement: {
      get: function() {
        return null
      }
    },
    innerHTML: {
      get: function() {
        return this.serialize()
      },
      set: O5.nyi
    },
    outerHTML: {
      get: function() {
        return this.serialize()
      },
      set: O5.nyi
    },
    write: {
      value: function(A) {
        if (!this.isHTML) O5.InvalidStateError();
        if (!this._parser) return;
        if (!this._parser);
        var B = arguments.join("");
        this._parser.parse(B)
      }
    },
    writeln: {
      value: function A(B) {
        this.write(Array.prototype.join.call(arguments, "") + `
`)
      }
    },
    open: {
      value: function() {
        this.documentElement = null
      }
    },
    close: {
      value: function() {
        if (this.readyState = "interactive", this._dispatchEvent(new SA1("readystatechange"), !0), this._dispatchEvent(new SA1("DOMContentLoaded"), !0), this.readyState = "complete", this._dispatchEvent(new SA1("readystatechange"), !0), this.defaultView) this.defaultView._dispatchEvent(new SA1("load"), !0)
      }
    },
    clone: {
      value: function A() {
        var B = new _A1(this.isHTML, this._address);
        return B._quirks = this._quirks, B._contentType = this._contentType, B
      }
    },
    cloneNode: {
      value: function A(B) {
        var Q = iZ.prototype.cloneNode.call(this, !1);
        if (B)
          for (var I = this.firstChild; I !== null; I = I.nextSibling) Q._appendChild(Q.importNode(I, !0));
        return Q._updateDocTypeElement(), Q
      }
    },
    isEqual: {
      value: function A(B) {
        return !0
      }
    },
    mutateValue: {
      value: function(A) {
        if (this.mutationHandler) this.mutationHandler({
          type: lu.VALUE,
          target: A,
          data: A.data
        })
      }
    },
    mutateAttr: {
      value: function(A, B) {
        if (this.mutationHandler) this.mutationHandler({
          type: lu.ATTR,
          target: A.ownerElement,
          attr: A
        })
      }
    },
    mutateRemoveAttr: {
      value: function(A) {
        if (this.mutationHandler) this.mutationHandler({
          type: lu.REMOVE_ATTR,
          target: A.ownerElement,
          attr: A
        })
      }
    },
    mutateRemove: {
      value: function(A) {
        if (this.mutationHandler) this.mutationHandler({
          type: lu.REMOVE,
          target: A.parentNode,
          node: A
        });
        XR2(A)
      }
    },
    mutateInsert: {
      value: function(A) {
        if (FR2(A), this.mutationHandler) this.mutationHandler({
          type: lu.INSERT,
          target: A.parentNode,
          node: A
        })
      }
    },
    mutateMove: {
      value: function(A) {
        if (this.mutationHandler) this.mutationHandler({
          type: lu.MOVE,
          target: A
        })
      }
    },
    addId: {
      value: function A(B, Q) {
        var I = this.byId[B];
        if (!I) this.byId[B] = Q;
        else {
          if (!(I instanceof d$)) I = new d$(I), this.byId[B] = I;
          I.add(Q)
        }
      }
    },
    delId: {
      value: function A(B, Q) {
        var I = this.byId[B];
        if (O5.assert(I), I instanceof d$) {
          if (I.del(Q), I.length === 1) this.byId[B] = I.downgrade()
        } else this.byId[B] = void 0
      }
    },
    _resolve: {
      value: function(A) {
        return new ZR2(this._documentBaseURL).resolve(A)
      }
    },
    _documentBaseURL: {
      get: function() {
        var A = this._address;
        if (A === "about:blank") A = "/";
        var B = this.querySelector("base[href]");
        if (B) return new ZR2(A).resolve(B.getAttribute("href"));
        return A
      }
    },
    _templateDoc: {
      get: function() {
        if (!this._templateDocCache) {
          var A = new _A1(this.isHTML, this._address);
          this._templateDocCache = A._templateDocCache = A
        }
        return this._templateDocCache
      }
    },
    querySelector: {
      value: function(A) {
        return DR2(A, this)[0]
      }
    },
    querySelectorAll: {
      value: function(A) {
        var B = DR2(A, this);
        return B.item ? B : new eC5(B)
      }
    }
  });
  var XK5 = ["abort", "canplay", "canplaythrough", "change", "click", "contextmenu", "cuechange", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "pause", "play", "playing", "progress", "ratechange", "readystatechange", "reset", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "blur", "error", "focus", "load", "scroll"];
  XK5.forEach(function(A) {
    Object.defineProperty(_A1.prototype, "on" + A, {
      get: function() {
        return this._getEventHandler(A)
      },
      set: function(B) {
        this._setEventHandler(A, B)
      }
    })
  });

  function WR2(A, B) {
    if (A && A.isHTML) {
      for (var Q = A.firstChild; Q !== null; Q = Q.nextSibling)
        if (Q.nodeType === iZ.ELEMENT_NODE && Q.localName === B && Q.namespaceURI === nu.HTML) return Q
    }
    return null
  }

  function VK5(A) {
    if (A._nid = A.ownerDocument._nextnid++, A.ownerDocument._nodes[A._nid] = A, A.nodeType === iZ.ELEMENT_NODE) {
      var B = A.getAttribute("id");
      if (B) A.ownerDocument.addId(B, A);
      if (A._roothook) A._roothook()
    }
  }

  function CK5(A) {
    if (A.nodeType === iZ.ELEMENT_NODE) {
      var B = A.getAttribute("id");
      if (B) A.ownerDocument.delId(B, A)
    }
    A.ownerDocument._nodes[A._nid] = void 0, A._nid = void 0
  }

  function FR2(A) {
    if (VK5(A), A.nodeType === iZ.ELEMENT_NODE)
      for (var B = A.firstChild; B !== null; B = B.nextSibling) FR2(B)
  }

  function XR2(A) {
    CK5(A);
    for (var B = A.firstChild; B !== null; B = B.nextSibling) XR2(B)
  }

  function VR2(A, B) {
    if (A.ownerDocument = B, A._lastModTime = void 0, Object.prototype.hasOwnProperty.call(A, "_tagName")) A._tagName = void 0;
    for (var Q = A.firstChild; Q !== null; Q = Q.nextSibling) VR2(Q, B)
  }

  function d$(A) {
    this.nodes = Object.create(null), this.nodes[A._nid] = A, this.length = 1, this.firstNode = void 0
  }
  d$.prototype.add = function(A) {
    if (!this.nodes[A._nid]) this.nodes[A._nid] = A, this.length++, this.firstNode = void 0
  };
  d$.prototype.del = function(A) {
    if (this.nodes[A._nid]) delete this.nodes[A._nid], this.length--, this.firstNode = void 0
  };
  d$.prototype.getFirst = function() {
    if (!this.firstNode) {
      var A;
      for (A in this.nodes)
        if (this.firstNode === void 0 || this.firstNode.compareDocumentPosition(this.nodes[A]) & iZ.DOCUMENT_POSITION_PRECEDING) this.firstNode = this.nodes[A]
    }
    return this.firstNode
  };
  d$.prototype.downgrade = function() {
    if (this.length === 1) {
      var A;
      for (A in this.nodes) return this.nodes[A]
    }
    return this
  }
})
// @from(Start 7995181, End 7996051)
Pz1 = z((pQB, HR2) => {
  HR2.exports = Tz1;
  var KK5 = cG(),
    KR2 = u1A(),
    HK5 = zz1();

  function Tz1(A, B, Q, I) {
    KR2.call(this), this.nodeType = KK5.DOCUMENT_TYPE_NODE, this.ownerDocument = A || null, this.name = B, this.publicId = Q || "", this.systemId = I || ""
  }
  Tz1.prototype = Object.create(KR2.prototype, {
    nodeName: {
      get: function() {
        return this.name
      }
    },
    nodeValue: {
      get: function() {
        return null
      },
      set: function() {}
    },
    clone: {
      value: function A() {
        return new Tz1(this.ownerDocument, this.name, this.publicId, this.systemId)
      }
    },
    isEqual: {
      value: function A(B) {
        return this.name === B.name && this.publicId === B.publicId && this.systemId === B.systemId
      }
    }
  });
  Object.defineProperties(Tz1.prototype, HK5)
})