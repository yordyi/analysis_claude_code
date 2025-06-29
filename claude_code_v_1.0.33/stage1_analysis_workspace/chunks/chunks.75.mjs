
// @from(Start 7655730, End 7667300)
m$2 = z((g$2, h$2) => {
  (function() {
    var A, B, Q, I, G, Z, D, Y, W, J, F, X, V, C, K, E, N, q, O, R, T, L, _, k = {}.hasOwnProperty;
    ({
      isObject: L,
      isFunction: T,
      isPlainObject: _,
      getValue: R
    } = HE()), A = mQ(), X = ae1(), C = vH1(), I = bH1(), G = gH1(), E = lH1(), O = iH1(), K = nH1(), J = hH1(), F = cH1(), Z = mH1(), Y = dH1(), D = uH1(), W = pH1(), Q = ce1(), q = ie1(), N = aH1(), B = IA1(), h$2.exports = V = class i {
      constructor(x, s, d) {
        var F1;
        if (this.name = "?xml", this.type = A.Document, x || (x = {}), F1 = {}, !x.writer) x.writer = new N;
        else if (_(x.writer)) F1 = x.writer, x.writer = new N;
        this.options = x, this.writer = x.writer, this.writerOptions = this.writer.filterOptions(F1), this.stringify = new q(x), this.onDataCallback = s || function() {}, this.onEndCallback = d || function() {}, this.currentNode = null, this.currentLevel = -1, this.openTags = {}, this.documentStarted = !1, this.documentCompleted = !1, this.root = null
      }
      createChildNode(x) {
        var s, d, F1, X1, v, D1, N1, u1;
        switch (x.type) {
          case A.CData:
            this.cdata(x.value);
            break;
          case A.Comment:
            this.comment(x.value);
            break;
          case A.Element:
            F1 = {}, N1 = x.attribs;
            for (d in N1) {
              if (!k.call(N1, d)) continue;
              s = N1[d], F1[d] = s.value
            }
            this.node(x.name, F1);
            break;
          case A.Dummy:
            this.dummy();
            break;
          case A.Raw:
            this.raw(x.value);
            break;
          case A.Text:
            this.text(x.value);
            break;
          case A.ProcessingInstruction:
            this.instruction(x.target, x.value);
            break;
          default:
            throw new Error("This XML node type is not supported in a JS object: " + x.constructor.name)
        }
        u1 = x.children;
        for (v = 0, D1 = u1.length; v < D1; v++)
          if (X1 = u1[v], this.createChildNode(X1), X1.type === A.Element) this.up();
        return this
      }
      dummy() {
        return this
      }
      node(x, s, d) {
        if (x == null) throw new Error("Missing node name.");
        if (this.root && this.currentLevel === -1) throw new Error("Document can only have one root node. " + this.debugInfo(x));
        if (this.openCurrent(), x = R(x), s == null) s = {};
        if (s = R(s), !L(s))[d, s] = [s, d];
        if (this.currentNode = new C(this, x, s), this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, d != null) this.text(d);
        return this
      }
      element(x, s, d) {
        var F1, X1, v, D1, N1, u1;
        if (this.currentNode && this.currentNode.type === A.DocType) this.dtdElement(...arguments);
        else if (Array.isArray(x) || L(x) || T(x)) {
          D1 = this.options.noValidation, this.options.noValidation = !0, u1 = new X(this.options).element("TEMP_ROOT"), u1.element(x), this.options.noValidation = D1, N1 = u1.children;
          for (X1 = 0, v = N1.length; X1 < v; X1++)
            if (F1 = N1[X1], this.createChildNode(F1), F1.type === A.Element) this.up()
        } else this.node(x, s, d);
        return this
      }
      attribute(x, s) {
        var d, F1;
        if (!this.currentNode || this.currentNode.children) throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(x));
        if (x != null) x = R(x);
        if (L(x))
          for (d in x) {
            if (!k.call(x, d)) continue;
            F1 = x[d], this.attribute(d, F1)
          } else {
            if (T(s)) s = s.apply();
            if (this.options.keepNullAttributes && s == null) this.currentNode.attribs[x] = new Q(this, x, "");
            else if (s != null) this.currentNode.attribs[x] = new Q(this, x, s)
          }
        return this
      }
      text(x) {
        var s;
        return this.openCurrent(), s = new O(this, x), this.onData(this.writer.text(s, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      cdata(x) {
        var s;
        return this.openCurrent(), s = new I(this, x), this.onData(this.writer.cdata(s, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      comment(x) {
        var s;
        return this.openCurrent(), s = new G(this, x), this.onData(this.writer.comment(s, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      raw(x) {
        var s;
        return this.openCurrent(), s = new E(this, x), this.onData(this.writer.raw(s, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      instruction(x, s) {
        var d, F1, X1, v, D1;
        if (this.openCurrent(), x != null) x = R(x);
        if (s != null) s = R(s);
        if (Array.isArray(x))
          for (d = 0, v = x.length; d < v; d++) F1 = x[d], this.instruction(F1);
        else if (L(x))
          for (F1 in x) {
            if (!k.call(x, F1)) continue;
            X1 = x[F1], this.instruction(F1, X1)
          } else {
            if (T(s)) s = s.apply();
            D1 = new K(this, x, s), this.onData(this.writer.processingInstruction(D1, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1)
          }
        return this
      }
      declaration(x, s, d) {
        var F1;
        if (this.openCurrent(), this.documentStarted) throw new Error("declaration() must be the first node.");
        return F1 = new J(this, x, s, d), this.onData(this.writer.declaration(F1, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      doctype(x, s, d) {
        if (this.openCurrent(), x == null) throw new Error("Missing root node name.");
        if (this.root) throw new Error("dtd() must come before the root node.");
        return this.currentNode = new F(this, s, d), this.currentNode.rootNodeName = x, this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, this
      }
      dtdElement(x, s) {
        var d;
        return this.openCurrent(), d = new D(this, x, s), this.onData(this.writer.dtdElement(d, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      attList(x, s, d, F1, X1) {
        var v;
        return this.openCurrent(), v = new Z(this, x, s, d, F1, X1), this.onData(this.writer.dtdAttList(v, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      entity(x, s) {
        var d;
        return this.openCurrent(), d = new Y(this, !1, x, s), this.onData(this.writer.dtdEntity(d, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      pEntity(x, s) {
        var d;
        return this.openCurrent(), d = new Y(this, !0, x, s), this.onData(this.writer.dtdEntity(d, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      notation(x, s) {
        var d;
        return this.openCurrent(), d = new W(this, x, s), this.onData(this.writer.dtdNotation(d, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
      }
      up() {
        if (this.currentLevel < 0) throw new Error("The document node has no parent.");
        if (this.currentNode) {
          if (this.currentNode.children) this.closeNode(this.currentNode);
          else this.openNode(this.currentNode);
          this.currentNode = null
        } else this.closeNode(this.openTags[this.currentLevel]);
        return delete this.openTags[this.currentLevel], this.currentLevel--, this
      }
      end() {
        while (this.currentLevel >= 0) this.up();
        return this.onEnd()
      }
      openCurrent() {
        if (this.currentNode) return this.currentNode.children = !0, this.openNode(this.currentNode)
      }
      openNode(x) {
        var s, d, F1, X1;
        if (!x.isOpen) {
          if (!this.root && this.currentLevel === 0 && x.type === A.Element) this.root = x;
          if (d = "", x.type === A.Element) {
            this.writerOptions.state = B.OpenTag, d = this.writer.indent(x, this.writerOptions, this.currentLevel) + "<" + x.name, X1 = x.attribs;
            for (F1 in X1) {
              if (!k.call(X1, F1)) continue;
              s = X1[F1], d += this.writer.attribute(s, this.writerOptions, this.currentLevel)
            }
            d += (x.children ? ">" : "/>") + this.writer.endline(x, this.writerOptions, this.currentLevel), this.writerOptions.state = B.InsideTag
          } else {
            if (this.writerOptions.state = B.OpenTag, d = this.writer.indent(x, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + x.rootNodeName, x.pubID && x.sysID) d += ' PUBLIC "' + x.pubID + '" "' + x.sysID + '"';
            else if (x.sysID) d += ' SYSTEM "' + x.sysID + '"';
            if (x.children) d += " [", this.writerOptions.state = B.InsideTag;
            else this.writerOptions.state = B.CloseTag, d += ">";
            d += this.writer.endline(x, this.writerOptions, this.currentLevel)
          }
          return this.onData(d, this.currentLevel), x.isOpen = !0
        }
      }
      closeNode(x) {
        var s;
        if (!x.isClosed) {
          if (s = "", this.writerOptions.state = B.CloseTag, x.type === A.Element) s = this.writer.indent(x, this.writerOptions, this.currentLevel) + "</" + x.name + ">" + this.writer.endline(x, this.writerOptions, this.currentLevel);
          else s = this.writer.indent(x, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(x, this.writerOptions, this.currentLevel);
          return this.writerOptions.state = B.None, this.onData(s, this.currentLevel), x.isClosed = !0
        }
      }
      onData(x, s) {
        return this.documentStarted = !0, this.onDataCallback(x, s + 1)
      }
      onEnd() {
        return this.documentCompleted = !0, this.onEndCallback()
      }
      debugInfo(x) {
        if (x == null) return "";
        else return "node: <" + x + ">"
      }
      ele() {
        return this.element(...arguments)
      }
      nod(x, s, d) {
        return this.node(x, s, d)
      }
      txt(x) {
        return this.text(x)
      }
      dat(x) {
        return this.cdata(x)
      }
      com(x) {
        return this.comment(x)
      }
      ins(x, s) {
        return this.instruction(x, s)
      }
      dec(x, s, d) {
        return this.declaration(x, s, d)
      }
      dtd(x, s, d) {
        return this.doctype(x, s, d)
      }
      e(x, s, d) {
        return this.element(x, s, d)
      }
      n(x, s, d) {
        return this.node(x, s, d)
      }
      t(x) {
        return this.text(x)
      }
      d(x) {
        return this.cdata(x)
      }
      c(x) {
        return this.comment(x)
      }
      r(x) {
        return this.raw(x)
      }
      i(x, s) {
        return this.instruction(x, s)
      }
      att() {
        if (this.currentNode && this.currentNode.type === A.DocType) return this.attList(...arguments);
        else return this.attribute(...arguments)
      }
      a() {
        if (this.currentNode && this.currentNode.type === A.DocType) return this.attList(...arguments);
        else return this.attribute(...arguments)
      }
      ent(x, s) {
        return this.entity(x, s)
      }
      pent(x, s) {
        return this.pEntity(x, s)
      }
      not(x, s) {
        return this.notation(x, s)
      }
    }
  }).call(g$2)
})
// @from(Start 7667306, End 7671808)
p$2 = z((d$2, u$2) => {
  (function() {
    var A, B, Q, I, G = {}.hasOwnProperty;
    A = mQ(), I = ne1(), B = IA1(), u$2.exports = Q = class Z extends I {
      constructor(D, Y) {
        super(Y);
        this.stream = D
      }
      endline(D, Y, W) {
        if (D.isLastRootNode && Y.state === B.CloseTag) return "";
        else return super.endline(D, Y, W)
      }
      document(D, Y) {
        var W, J, F, X, V, C, K, E, N;
        K = D.children;
        for (J = F = 0, V = K.length; F < V; J = ++F) W = K[J], W.isLastRootNode = J === D.children.length - 1;
        Y = this.filterOptions(Y), E = D.children, N = [];
        for (X = 0, C = E.length; X < C; X++) W = E[X], N.push(this.writeChildNode(W, Y, 0));
        return N
      }
      cdata(D, Y, W) {
        return this.stream.write(super.cdata(D, Y, W))
      }
      comment(D, Y, W) {
        return this.stream.write(super.comment(D, Y, W))
      }
      declaration(D, Y, W) {
        return this.stream.write(super.declaration(D, Y, W))
      }
      docType(D, Y, W) {
        var J, F, X, V;
        if (W || (W = 0), this.openNode(D, Y, W), Y.state = B.OpenTag, this.stream.write(this.indent(D, Y, W)), this.stream.write("<!DOCTYPE " + D.root().name), D.pubID && D.sysID) this.stream.write(' PUBLIC "' + D.pubID + '" "' + D.sysID + '"');
        else if (D.sysID) this.stream.write(' SYSTEM "' + D.sysID + '"');
        if (D.children.length > 0) {
          this.stream.write(" ["), this.stream.write(this.endline(D, Y, W)), Y.state = B.InsideTag, V = D.children;
          for (F = 0, X = V.length; F < X; F++) J = V[F], this.writeChildNode(J, Y, W + 1);
          Y.state = B.CloseTag, this.stream.write("]")
        }
        return Y.state = B.CloseTag, this.stream.write(Y.spaceBeforeSlash + ">"), this.stream.write(this.endline(D, Y, W)), Y.state = B.None, this.closeNode(D, Y, W)
      }
      element(D, Y, W) {
        var J, F, X, V, C, K, E, N, q, O, R, T, L, _, k, i;
        if (W || (W = 0), this.openNode(D, Y, W), Y.state = B.OpenTag, R = this.indent(D, Y, W) + "<" + D.name, Y.pretty && Y.width > 0) {
          E = R.length, L = D.attribs;
          for (q in L) {
            if (!G.call(L, q)) continue;
            if (J = L[q], T = this.attribute(J, Y, W), F = T.length, E + F > Y.width) i = this.indent(D, Y, W + 1) + T, R += this.endline(D, Y, W) + i, E = i.length;
            else i = " " + T, R += i, E += i.length
          }
        } else {
          _ = D.attribs;
          for (q in _) {
            if (!G.call(_, q)) continue;
            J = _[q], R += this.attribute(J, Y, W)
          }
        }
        if (this.stream.write(R), V = D.children.length, C = V === 0 ? null : D.children[0], V === 0 || D.children.every(function(x) {
            return (x.type === A.Text || x.type === A.Raw || x.type === A.CData) && x.value === ""
          }))
          if (Y.allowEmpty) this.stream.write(">"), Y.state = B.CloseTag, this.stream.write("</" + D.name + ">");
          else Y.state = B.CloseTag, this.stream.write(Y.spaceBeforeSlash + "/>");
        else if (Y.pretty && V === 1 && (C.type === A.Text || C.type === A.Raw || C.type === A.CData) && C.value != null) this.stream.write(">"), Y.state = B.InsideTag, Y.suppressPrettyCount++, O = !0, this.writeChildNode(C, Y, W + 1), Y.suppressPrettyCount--, O = !1, Y.state = B.CloseTag, this.stream.write("</" + D.name + ">");
        else {
          this.stream.write(">" + this.endline(D, Y, W)), Y.state = B.InsideTag, k = D.children;
          for (K = 0, N = k.length; K < N; K++) X = k[K], this.writeChildNode(X, Y, W + 1);
          Y.state = B.CloseTag, this.stream.write(this.indent(D, Y, W) + "</" + D.name + ">")
        }
        return this.stream.write(this.endline(D, Y, W)), Y.state = B.None, this.closeNode(D, Y, W)
      }
      processingInstruction(D, Y, W) {
        return this.stream.write(super.processingInstruction(D, Y, W))
      }
      raw(D, Y, W) {
        return this.stream.write(super.raw(D, Y, W))
      }
      text(D, Y, W) {
        return this.stream.write(super.text(D, Y, W))
      }
      dtdAttList(D, Y, W) {
        return this.stream.write(super.dtdAttList(D, Y, W))
      }
      dtdElement(D, Y, W) {
        return this.stream.write(super.dtdElement(D, Y, W))
      }
      dtdEntity(D, Y, W) {
        return this.stream.write(super.dtdEntity(D, Y, W))
      }
      dtdNotation(D, Y, W) {
        return this.stream.write(super.dtdNotation(D, Y, W))
      }
    }
  }).call(d$2)
})
// @from(Start 7671814, End 7672680)
l$2 = z((c$2, rO) => {
  (function() {
    var A, B, Q, I, G, Z, D, Y, W;
    ({
      assign: Y,
      isFunction: W
    } = HE()), Q = pe1(), I = ae1(), G = m$2(), D = aH1(), Z = p$2(), A = mQ(), B = IA1(), c$2.create = function(J, F, X, V) {
      var C, K;
      if (J == null) throw new Error("Root element needs a name.");
      if (V = Y({}, F, X, V), C = new I(V), K = C.element(J), !V.headless) {
        if (C.declaration(V), V.pubID != null || V.sysID != null) C.dtd(V)
      }
      return K
    }, c$2.begin = function(J, F, X) {
      if (W(J))[F, X] = [J, F], J = {};
      if (F) return new G(J, F, X);
      else return new I(J)
    }, c$2.stringWriter = function(J) {
      return new D(J)
    }, c$2.streamWriter = function(J, F) {
      return new Z(J, F)
    }, c$2.implementation = new Q, c$2.nodeType = A, c$2.writerState = B
  }).call(c$2)
})
// @from(Start 7672686, End 7674590)
a$2 = z((YF5) => {
  var i$2 = cs1(),
    IF5 = l$2();
  YF5.build = DF5;

  function GF5(A) {
    function B(Q) {
      return Q < 10 ? "0" + Q : Q
    }
    return A.getUTCFullYear() + "-" + B(A.getUTCMonth() + 1) + "-" + B(A.getUTCDate()) + "T" + B(A.getUTCHours()) + ":" + B(A.getUTCMinutes()) + ":" + B(A.getUTCSeconds()) + "Z"
  }
  var ZF5 = Object.prototype.toString;

  function n$2(A) {
    var B = ZF5.call(A).match(/\[object (.*)\]/);
    return B ? B[1] : B
  }

  function DF5(A, B) {
    var Q = {
        version: "1.0",
        encoding: "UTF-8"
      },
      I = {
        pubid: "-//Apple//DTD PLIST 1.0//EN",
        sysid: "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
      },
      G = IF5.create("plist");
    if (G.dec(Q.version, Q.encoding, Q.standalone), G.dtd(I.pubid, I.sysid), G.att("version", "1.0"), se1(A, G), !B) B = {};
    return B.pretty = B.pretty !== !1, G.end(B)
  }

  function se1(A, B) {
    var Q, I, G, Z = n$2(A);
    if (Z == "Undefined") return;
    else if (Array.isArray(A)) {
      B = B.ele("array");
      for (I = 0; I < A.length; I++) se1(A[I], B)
    } else if (Buffer.isBuffer(A)) B.ele("data").raw(A.toString("base64"));
    else if (Z == "Object") {
      B = B.ele("dict");
      for (G in A)
        if (A.hasOwnProperty(G)) B.ele("key").txt(G), se1(A[G], B)
    } else if (Z == "Number") Q = A % 1 === 0 ? "integer" : "real", B.ele(Q).txt(A.toString());
    else if (Z == "BigInt") B.ele("integer").txt(A);
    else if (Z == "Date") B.ele("date").txt(GF5(new Date(A)));
    else if (Z == "Boolean") B.ele(A ? "true" : "false");
    else if (Z == "String") B.ele("string").txt(A);
    else if (Z == "ArrayBuffer") B.ele("data").raw(i$2.fromByteArray(A));
    else if (A && A.buffer && n$2(A.buffer) == "ArrayBuffer") B.ele("data").raw(i$2.fromByteArray(new Uint8Array(A.buffer), B));
    else if (Z === "Null") B.ele("null").txt("")
  }
})
// @from(Start 7674596, End 7674788)
o$2 = z((re1) => {
  var s$2 = TN2();
  Object.keys(s$2).forEach(function(A) {
    re1[A] = s$2[A]
  });
  var r$2 = a$2();
  Object.keys(r$2).forEach(function(A) {
    re1[A] = r$2[A]
  })
})
// @from(Start 7674794, End 7677508)
Cq2 = z((m4B, Vq2) => {
  var KF5 = "Expected a function",
    Fq2 = NaN,
    HF5 = "[object Symbol]",
    zF5 = /^\s+|\s+$/g,
    wF5 = /^[-+]0x[0-9a-f]+$/i,
    EF5 = /^0b[01]+$/i,
    UF5 = /^0o[0-7]+$/i,
    NF5 = parseInt,
    $F5 = typeof global == "object" && global && global.Object === Object && global,
    qF5 = typeof self == "object" && self && self.Object === Object && self,
    MF5 = $F5 || qF5 || Function("return this")(),
    LF5 = Object.prototype,
    RF5 = LF5.toString,
    OF5 = Math.max,
    TF5 = Math.min,
    A1A = function() {
      return MF5.Date.now()
    };

  function PF5(A, B, Q) {
    var I, G, Z, D, Y, W, J = 0,
      F = !1,
      X = !1,
      V = !0;
    if (typeof A != "function") throw new TypeError(KF5);
    if (B = Xq2(B) || 0, B1A(Q)) F = !!Q.leading, X = "maxWait" in Q, Z = X ? OF5(Xq2(Q.maxWait) || 0, B) : Z, V = "trailing" in Q ? !!Q.trailing : V;

    function C(_) {
      var k = I,
        i = G;
      return I = G = void 0, J = _, D = A.apply(i, k), D
    }

    function K(_) {
      return J = _, Y = setTimeout(q, B), F ? C(_) : D
    }

    function E(_) {
      var k = _ - W,
        i = _ - J,
        x = B - k;
      return X ? TF5(x, Z - i) : x
    }

    function N(_) {
      var k = _ - W,
        i = _ - J;
      return W === void 0 || k >= B || k < 0 || X && i >= Z
    }

    function q() {
      var _ = A1A();
      if (N(_)) return O(_);
      Y = setTimeout(q, E(_))
    }

    function O(_) {
      if (Y = void 0, V && I) return C(_);
      return I = G = void 0, D
    }

    function R() {
      if (Y !== void 0) clearTimeout(Y);
      J = 0, I = W = G = Y = void 0
    }

    function T() {
      return Y === void 0 ? D : O(A1A())
    }

    function L() {
      var _ = A1A(),
        k = N(_);
      if (I = arguments, G = this, W = _, k) {
        if (Y === void 0) return K(W);
        if (X) return Y = setTimeout(q, B), C(W)
      }
      if (Y === void 0) Y = setTimeout(q, B);
      return D
    }
    return L.cancel = R, L.flush = T, L
  }

  function B1A(A) {
    var B = typeof A;
    return !!A && (B == "object" || B == "function")
  }

  function SF5(A) {
    return !!A && typeof A == "object"
  }

  function _F5(A) {
    return typeof A == "symbol" || SF5(A) && RF5.call(A) == HF5
  }

  function Xq2(A) {
    if (typeof A == "number") return A;
    if (_F5(A)) return Fq2;
    if (B1A(A)) {
      var B = typeof A.valueOf == "function" ? A.valueOf() : A;
      A = B1A(B) ? B + "" : B
    }
    if (typeof A != "string") return A === 0 ? A : +A;
    A = A.replace(zF5, "");
    var Q = EF5.test(A);
    return Q || UF5.test(A) ? NF5(A.slice(2), Q ? 2 : 8) : wF5.test(A) ? Fq2 : +A
  }
  Vq2.exports = PF5
})