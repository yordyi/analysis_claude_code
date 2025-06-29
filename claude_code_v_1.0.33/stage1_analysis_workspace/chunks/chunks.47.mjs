
// @from(Start 4801170, End 4803700)
o_ = z((t$8, pj0) => {
  pj0.exports = $J;
  $J.className = "ReflectionObject";
  var qD1 = RI(),
    MD1;

  function $J(A, B) {
    if (!qD1.isString(A)) throw TypeError("name must be a string");
    if (B && !qD1.isObject(B)) throw TypeError("options must be an object");
    this.options = B, this.parsedOptions = null, this.name = A, this.parent = null, this.resolved = !1, this.comment = null, this.filename = null
  }
  Object.defineProperties($J.prototype, {
    root: {
      get: function() {
        var A = this;
        while (A.parent !== null) A = A.parent;
        return A
      }
    },
    fullName: {
      get: function() {
        var A = [this.name],
          B = this.parent;
        while (B) A.unshift(B.name), B = B.parent;
        return A.join(".")
      }
    }
  });
  $J.prototype.toJSON = function A() {
    throw Error()
  };
  $J.prototype.onAdd = function A(B) {
    if (this.parent && this.parent !== B) this.parent.remove(this);
    this.parent = B, this.resolved = !1;
    var Q = B.root;
    if (Q instanceof MD1) Q._handleAdd(this)
  };
  $J.prototype.onRemove = function A(B) {
    var Q = B.root;
    if (Q instanceof MD1) Q._handleRemove(this);
    this.parent = null, this.resolved = !1
  };
  $J.prototype.resolve = function A() {
    if (this.resolved) return this;
    if (this.root instanceof MD1) this.resolved = !0;
    return this
  };
  $J.prototype.getOption = function A(B) {
    if (this.options) return this.options[B];
    return
  };
  $J.prototype.setOption = function A(B, Q, I) {
    if (!I || !this.options || this.options[B] === void 0)(this.options || (this.options = {}))[B] = Q;
    return this
  };
  $J.prototype.setParsedOption = function A(B, Q, I) {
    if (!this.parsedOptions) this.parsedOptions = [];
    var G = this.parsedOptions;
    if (I) {
      var Z = G.find(function(W) {
        return Object.prototype.hasOwnProperty.call(W, B)
      });
      if (Z) {
        var D = Z[B];
        qD1.setProperty(D, I, Q)
      } else Z = {}, Z[B] = qD1.setProperty({}, I, Q), G.push(Z)
    } else {
      var Y = {};
      Y[B] = Q, G.push(Y)
    }
    return this
  };
  $J.prototype.setOptions = function A(B, Q) {
    if (B)
      for (var I = Object.keys(B), G = 0; G < I.length; ++G) this.setOption(I[G], B[I[G]], Q);
    return this
  };
  $J.prototype.toString = function A() {
    var B = this.constructor.className,
      Q = this.fullName;
    if (Q.length) return B + " " + Q;
    return B
  };
  $J._configure = function(A) {
    MD1 = A
  }
})
// @from(Start 4803706, End 4806271)
cC = z((e$8, ij0) => {
  ij0.exports = Jw;
  var cj0 = o_();
  ((Jw.prototype = Object.create(cj0.prototype)).constructor = Jw).className = "Enum";
  var lj0 = Bh(),
    LD1 = RI();

  function Jw(A, B, Q, I, G, Z) {
    if (cj0.call(this, A, Q), B && typeof B !== "object") throw TypeError("values must be an object");
    if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = I, this.comments = G || {}, this.valuesOptions = Z, this.reserved = void 0, B) {
      for (var D = Object.keys(B), Y = 0; Y < D.length; ++Y)
        if (typeof B[D[Y]] === "number") this.valuesById[this.values[D[Y]] = B[D[Y]]] = D[Y]
    }
  }
  Jw.fromJSON = function A(B, Q) {
    var I = new Jw(B, Q.values, Q.options, Q.comment, Q.comments);
    return I.reserved = Q.reserved, I
  };
  Jw.prototype.toJSON = function A(B) {
    var Q = B ? Boolean(B.keepComments) : !1;
    return LD1.toObject(["options", this.options, "valuesOptions", this.valuesOptions, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", Q ? this.comment : void 0, "comments", Q ? this.comments : void 0])
  };
  Jw.prototype.add = function A(B, Q, I, G) {
    if (!LD1.isString(B)) throw TypeError("name must be a string");
    if (!LD1.isInteger(Q)) throw TypeError("id must be an integer");
    if (this.values[B] !== void 0) throw Error("duplicate name '" + B + "' in " + this);
    if (this.isReservedId(Q)) throw Error("id " + Q + " is reserved in " + this);
    if (this.isReservedName(B)) throw Error("name '" + B + "' is reserved in " + this);
    if (this.valuesById[Q] !== void 0) {
      if (!(this.options && this.options.allow_alias)) throw Error("duplicate id " + Q + " in " + this);
      this.values[B] = Q
    } else this.valuesById[this.values[B] = Q] = B;
    if (G) {
      if (this.valuesOptions === void 0) this.valuesOptions = {};
      this.valuesOptions[B] = G || null
    }
    return this.comments[B] = I || null, this
  };
  Jw.prototype.remove = function A(B) {
    if (!LD1.isString(B)) throw TypeError("name must be a string");
    var Q = this.values[B];
    if (Q == null) throw Error("name '" + B + "' does not exist in " + this);
    if (delete this.valuesById[Q], delete this.values[B], delete this.comments[B], this.valuesOptions) delete this.valuesOptions[B];
    return this
  };
  Jw.prototype.isReservedId = function A(B) {
    return lj0.isReservedId(this.reserved, B)
  };
  Jw.prototype.isReservedName = function A(B) {
    return lj0.isReservedName(this.reserved, B)
  }
})
// @from(Start 4806277, End 4808145)
Zm1 = z((Aq8, aj0) => {
  aj0.exports = x36;
  var k36 = cC(),
    Fm1 = r_(),
    Xm1 = RI();

  function nj0(A, B, Q, I) {
    return B.resolvedType.group ? A("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", Q, I, (B.id << 3 | 3) >>> 0, (B.id << 3 | 4) >>> 0) : A("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", Q, I, (B.id << 3 | 2) >>> 0)
  }

  function x36(A) {
    var B = Xm1.codegen(["m", "w"], A.name + "$encode")("if(!w)")("w=Writer.create()"),
      Q, I, G = A.fieldsArray.slice().sort(Xm1.compareFieldsById);
    for (var Q = 0; Q < G.length; ++Q) {
      var Z = G[Q].resolve(),
        D = A._fieldsArray.indexOf(Z),
        Y = Z.resolvedType instanceof k36 ? "int32" : Z.type,
        W = Fm1.basic[Y];
      if (I = "m" + Xm1.safeProp(Z.name), Z.map) {
        if (B("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", I, Z.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", I)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (Z.id << 3 | 2) >>> 0, 8 | Fm1.mapKey[Z.keyType], Z.keyType), W === void 0) B("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", D, I);
        else B(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | W, Y, I);
        B("}")("}")
      } else if (Z.repeated) {
        if (B("if(%s!=null&&%s.length){", I, I), Z.packed && Fm1.packed[Y] !== void 0) B("w.uint32(%i).fork()", (Z.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", I)("w.%s(%s[i])", Y, I)("w.ldelim()");
        else if (B("for(var i=0;i<%s.length;++i)", I), W === void 0) nj0(B, Z, D, I + "[i]");
        else B("w.uint32(%i).%s(%s[i])", (Z.id << 3 | W) >>> 0, Y, I);
        B("}")
      } else {
        if (Z.optional) B("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", I, Z.name);
        if (W === void 0) nj0(B, Z, D, I);
        else B("w.uint32(%i).%s(%s)", (Z.id << 3 | W) >>> 0, Y, I)
      }
    }
    return B("return w")
  }
})
// @from(Start 4808151, End 4809045)
rj0 = z((Bq8, sj0) => {
  var Q5 = sj0.exports = mg1();
  Q5.build = "light";

  function f36(A, B, Q) {
    if (typeof B === "function") Q = B, B = new Q5.Root;
    else if (!B) B = new Q5.Root;
    return B.load(A, Q)
  }
  Q5.load = f36;

  function v36(A, B) {
    if (!B) B = new Q5.Root;
    return B.loadSync(A)
  }
  Q5.loadSync = v36;
  Q5.encoder = Zm1();
  Q5.decoder = ah1();
  Q5.verifier = oh1();
  Q5.converter = Am1();
  Q5.ReflectionObject = o_();
  Q5.Namespace = Bh();
  Q5.Root = $D1();
  Q5.Enum = cC();
  Q5.Type = ED1();
  Q5.Field = VR();
  Q5.OneOf = tg();
  Q5.MapField = VD1();
  Q5.Service = KD1();
  Q5.Method = CD1();
  Q5.Message = HD1();
  Q5.wrappers = Bm1();
  Q5.types = r_();
  Q5.util = RI();
  Q5.ReflectionObject._configure(Q5.Root);
  Q5.Namespace._configure(Q5.Type, Q5.Service, Q5.Enum);
  Q5.Root._configure(Q5.Type);
  Q5.Field._configure(Q5.Type)
})
// @from(Start 4809051, End 4813438)
Cm1 = z((Qq8, ej0) => {
  ej0.exports = tj0;
  var Vm1 = /[\s{}=;:[\],'"()<>]/g,
    b36 = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    g36 = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
    h36 = /^ *[*/]+ */,
    m36 = /^\s*\*?\/*/,
    d36 = /\n/g,
    u36 = /\s/,
    p36 = /\\(.?)/g,
    c36 = {
      "0": "\x00",
      r: "\r",
      n: `
`,
      t: "\t"
    };

  function oj0(A) {
    return A.replace(p36, function(B, Q) {
      switch (Q) {
        case "\\":
        case "":
          return Q;
        default:
          return c36[Q] || ""
      }
    })
  }
  tj0.unescape = oj0;

  function tj0(A, B) {
    A = A.toString();
    var Q = 0,
      I = A.length,
      G = 1,
      Z = 0,
      D = {},
      Y = [],
      W = null;

    function J(T) {
      return Error("illegal " + T + " (line " + G + ")")
    }

    function F() {
      var T = W === "'" ? g36 : b36;
      T.lastIndex = Q - 1;
      var L = T.exec(A);
      if (!L) throw J("string");
      return Q = T.lastIndex, N(W), W = null, oj0(L[1])
    }

    function X(T) {
      return A.charAt(T)
    }

    function V(T, L, _) {
      var k = {
          type: A.charAt(T++),
          lineEmpty: !1,
          leading: _
        },
        i;
      if (B) i = 2;
      else i = 3;
      var x = T - i,
        s;
      do
        if (--x < 0 || (s = A.charAt(x)) === `
`) {
          k.lineEmpty = !0;
          break
        } while (s === " " || s === "\t");
      var d = A.substring(T, L).split(d36);
      for (var F1 = 0; F1 < d.length; ++F1) d[F1] = d[F1].replace(B ? m36 : h36, "").trim();
      k.text = d.join(`
`).trim(), D[G] = k, Z = G
    }

    function C(T) {
      var L = K(T),
        _ = A.substring(T, L),
        k = /^\s*\/\//.test(_);
      return k
    }

    function K(T) {
      var L = T;
      while (L < I && X(L) !== `
`) L++;
      return L
    }

    function E() {
      if (Y.length > 0) return Y.shift();
      if (W) return F();
      var T, L, _, k, i, x = Q === 0;
      do {
        if (Q === I) return null;
        T = !1;
        while (u36.test(_ = X(Q))) {
          if (_ === `
`) x = !0, ++G;
          if (++Q === I) return null
        }
        if (X(Q) === "/") {
          if (++Q === I) throw J("comment");
          if (X(Q) === "/")
            if (!B) {
              i = X(k = Q + 1) === "/";
              while (X(++Q) !== `
`)
                if (Q === I) return null;
              if (++Q, i) V(k, Q - 1, x), x = !0;
              ++G, T = !0
            } else {
              if (k = Q, i = !1, C(Q - 1)) {
                i = !0;
                do {
                  if (Q = K(Q), Q === I) break;
                  if (Q++, !x) break
                } while (C(Q))
              } else Q = Math.min(I, K(Q) + 1);
              if (i) V(k, Q, x), x = !0;
              G++, T = !0
            }
          else if ((_ = X(Q)) === "*") {
            k = Q + 1, i = B || X(k) === "*";
            do {
              if (_ === `
`) ++G;
              if (++Q === I) throw J("comment");
              L = _, _ = X(Q)
            } while (L !== "*" || _ !== "/");
            if (++Q, i) V(k, Q - 2, x), x = !0;
            T = !0
          } else return "/"
        }
      } while (T);
      var s = Q;
      Vm1.lastIndex = 0;
      var d = Vm1.test(X(s++));
      if (!d)
        while (s < I && !Vm1.test(X(s))) ++s;
      var F1 = A.substring(Q, Q = s);
      if (F1 === '"' || F1 === "'") W = F1;
      return F1
    }

    function N(T) {
      Y.push(T)
    }

    function q() {
      if (!Y.length) {
        var T = E();
        if (T === null) return null;
        N(T)
      }
      return Y[0]
    }

    function O(T, L) {
      var _ = q(),
        k = _ === T;
      if (k) return E(), !0;
      if (!L) throw J("token '" + _ + "', '" + T + "' expected");
      return !1
    }

    function R(T) {
      var L = null,
        _;
      if (T === void 0) {
        if (_ = D[G - 1], delete D[G - 1], _ && (B || _.type === "*" || _.lineEmpty)) L = _.leading ? _.text : null
      } else {
        if (Z < T) q();
        if (_ = D[T], delete D[T], _ && !_.lineEmpty && (B || _.type === "/")) L = _.leading ? null : _.text
      }
      return L
    }
    return Object.defineProperty({
      next: E,
      peek: q,
      push: N,
      skip: O,
      cmnt: R
    }, "line", {
      get: function() {
        return G
      }
    })
  }
})
// @from(Start 4813444, End 4826032)
Zy0 = z((Iq8, Gy0) => {
  Gy0.exports = _N;
  _N.filename = null;
  _N.defaults = {
    keepCase: !1
  };
  var l36 = Cm1(),
    Ay0 = $D1(),
    By0 = ED1(),
    Qy0 = VR(),
    i36 = VD1(),
    Iy0 = tg(),
    n36 = cC(),
    a36 = KD1(),
    s36 = CD1(),
    Km1 = r_(),
    Hm1 = RI(),
    r36 = /^[1-9][0-9]*$/,
    o36 = /^-?[1-9][0-9]*$/,
    t36 = /^0[x][0-9a-fA-F]+$/,
    e36 = /^-?0[x][0-9a-fA-F]+$/,
    AQ6 = /^0[0-7]+$/,
    BQ6 = /^-?0[0-7]+$/,
    QQ6 = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
    Fw = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    Xw = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
    IQ6 = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

  function _N(A, B, Q) {
    if (!(B instanceof Ay0)) Q = B, B = new Ay0;
    if (!Q) Q = _N.defaults;
    var I = Q.preferTrailingComment || !1,
      G = l36(A, Q.alternateCommentMode || !1),
      Z = G.next,
      D = G.push,
      Y = G.peek,
      W = G.skip,
      J = G.cmnt,
      F = !0,
      X, V, C, K, E = !1,
      N = B,
      q = Q.keepCase ? function(t) {
        return t
      } : Hm1.camelCase;

    function O(t, B1, W1) {
      var w1 = _N.filename;
      if (!W1) _N.filename = null;
      return Error("illegal " + (B1 || "token") + " '" + t + "' (" + (w1 ? w1 + ", " : "") + "line " + G.line + ")")
    }

    function R() {
      var t = [],
        B1;
      do {
        if ((B1 = Z()) !== '"' && B1 !== "'") throw O(B1);
        t.push(Z()), W(B1), B1 = Y()
      } while (B1 === '"' || B1 === "'");
      return t.join("")
    }

    function T(t) {
      var B1 = Z();
      switch (B1) {
        case "'":
        case '"':
          return D(B1), R();
        case "true":
        case "TRUE":
          return !0;
        case "false":
        case "FALSE":
          return !1
      }
      try {
        return _(B1, !0)
      } catch (W1) {
        if (t && Xw.test(B1)) return B1;
        throw O(B1, "value")
      }
    }

    function L(t, B1) {
      var W1, w1;
      do
        if (B1 && ((W1 = Y()) === '"' || W1 === "'")) t.push(R());
        else t.push([w1 = k(Z()), W("to", !0) ? k(Z()) : w1]); while (W(",", !0));
      var P1 = {
        options: void 0
      };
      P1.setOption = function(e, y1) {
        if (this.options === void 0) this.options = {};
        this.options[e] = y1
      }, F1(P1, function e(y1) {
        if (y1 === "option") bA(P1, y1), W(";");
        else throw O(y1)
      }, function e() {
        v1(P1)
      })
    }

    function _(t, B1) {
      var W1 = 1;
      if (t.charAt(0) === "-") W1 = -1, t = t.substring(1);
      switch (t) {
        case "inf":
        case "INF":
        case "Inf":
          return W1 * (1 / 0);
        case "nan":
        case "NAN":
        case "Nan":
        case "NaN":
          return NaN;
        case "0":
          return 0
      }
      if (r36.test(t)) return W1 * parseInt(t, 10);
      if (t36.test(t)) return W1 * parseInt(t, 16);
      if (AQ6.test(t)) return W1 * parseInt(t, 8);
      if (QQ6.test(t)) return W1 * parseFloat(t);
      throw O(t, "number", B1)
    }

    function k(t, B1) {
      switch (t) {
        case "max":
        case "MAX":
        case "Max":
          return 536870911;
        case "0":
          return 0
      }
      if (!B1 && t.charAt(0) === "-") throw O(t, "id");
      if (o36.test(t)) return parseInt(t, 10);
      if (e36.test(t)) return parseInt(t, 16);
      if (BQ6.test(t)) return parseInt(t, 8);
      throw O(t, "id")
    }

    function i() {
      if (X !== void 0) throw O("package");
      if (X = Z(), !Xw.test(X)) throw O(X, "name");
      N = N.define(X), W(";")
    }

    function x() {
      var t = Y(),
        B1;
      switch (t) {
        case "weak":
          B1 = C || (C = []), Z();
          break;
        case "public":
          Z();
        default:
          B1 = V || (V = []);
          break
      }
      t = R(), W(";"), B1.push(t)
    }

    function s() {
      if (W("="), K = R(), E = K === "proto3", !E && K !== "proto2") throw O(K, "syntax");
      B.setOption("syntax", K), W(";")
    }

    function d(t, B1) {
      switch (B1) {
        case "option":
          return bA(t, B1), W(";"), !0;
        case "message":
          return X1(t, B1), !0;
        case "enum":
          return d1(t, B1), !0;
        case "service":
          return L1(t, B1), !0;
        case "extend":
          return HA(t, B1), !0
      }
      return !1
    }

    function F1(t, B1, W1) {
      var w1 = G.line;
      if (t) {
        if (typeof t.comment !== "string") t.comment = J();
        t.filename = _N.filename
      }
      if (W("{", !0)) {
        var P1;
        while ((P1 = Z()) !== "}") B1(P1);
        W(";", !0)
      } else {
        if (W1) W1();
        if (W(";"), t && (typeof t.comment !== "string" || I)) t.comment = J(w1) || t.comment
      }
    }

    function X1(t, B1) {
      if (!Fw.test(B1 = Z())) throw O(B1, "type name");
      var W1 = new By0(B1);
      F1(W1, function w1(P1) {
        if (d(W1, P1)) return;
        switch (P1) {
          case "map":
            N1(W1, P1);
            break;
          case "required":
          case "repeated":
            v(W1, P1);
            break;
          case "optional":
            if (E) v(W1, "proto3_optional");
            else v(W1, "optional");
            break;
          case "oneof":
            u1(W1, P1);
            break;
          case "extensions":
            L(W1.extensions || (W1.extensions = []));
            break;
          case "reserved":
            L(W1.reserved || (W1.reserved = []), !0);
            break;
          default:
            if (!E || !Xw.test(P1)) throw O(P1);
            D(P1), v(W1, "optional");
            break
        }
      }), t.add(W1)
    }

    function v(t, B1, W1) {
      var w1 = Z();
      if (w1 === "group") {
        D1(t, B1);
        return
      }
      while (w1.endsWith(".") || Y().startsWith(".")) w1 += Z();
      if (!Xw.test(w1)) throw O(w1, "type");
      var P1 = Z();
      if (!Fw.test(P1)) throw O(P1, "name");
      P1 = q(P1), W("=");
      var e = new Qy0(P1, k(Z()), w1, B1, W1);
      if (F1(e, function O1(h1) {
          if (h1 === "option") bA(e, h1), W(";");
          else throw O(h1)
        }, function O1() {
          v1(e)
        }), B1 === "proto3_optional") {
        var y1 = new Iy0("_" + P1);
        e.setOption("proto3_optional", !0), y1.add(e), t.add(y1)
      } else t.add(e);
      if (!E && e.repeated && (Km1.packed[w1] !== void 0 || Km1.basic[w1] === void 0)) e.setOption("packed", !1, !0)
    }

    function D1(t, B1) {
      var W1 = Z();
      if (!Fw.test(W1)) throw O(W1, "name");
      var w1 = Hm1.lcFirst(W1);
      if (W1 === w1) W1 = Hm1.ucFirst(W1);
      W("=");
      var P1 = k(Z()),
        e = new By0(W1);
      e.group = !0;
      var y1 = new Qy0(w1, P1, W1, B1);
      y1.filename = _N.filename, F1(e, function O1(h1) {
        switch (h1) {
          case "option":
            bA(e, h1), W(";");
            break;
          case "required":
          case "repeated":
            v(e, h1);
            break;
          case "optional":
            if (E) v(e, "proto3_optional");
            else v(e, "optional");
            break;
          case "message":
            X1(e, h1);
            break;
          case "enum":
            d1(e, h1);
            break;
          default:
            throw O(h1)
        }
      }), t.add(e).add(y1)
    }

    function N1(t) {
      W("<");
      var B1 = Z();
      if (Km1.mapKey[B1] === void 0) throw O(B1, "type");
      W(",");
      var W1 = Z();
      if (!Xw.test(W1)) throw O(W1, "type");
      W(">");
      var w1 = Z();
      if (!Fw.test(w1)) throw O(w1, "name");
      W("=");
      var P1 = new i36(q(w1), k(Z()), B1, W1);
      F1(P1, function e(y1) {
        if (y1 === "option") bA(P1, y1), W(";");
        else throw O(y1)
      }, function e() {
        v1(P1)
      }), t.add(P1)
    }

    function u1(t, B1) {
      if (!Fw.test(B1 = Z())) throw O(B1, "name");
      var W1 = new Iy0(q(B1));
      F1(W1, function w1(P1) {
        if (P1 === "option") bA(W1, P1), W(";");
        else D(P1), v(W1, "optional")
      }), t.add(W1)
    }

    function d1(t, B1) {
      if (!Fw.test(B1 = Z())) throw O(B1, "name");
      var W1 = new n36(B1);
      F1(W1, function w1(P1) {
        switch (P1) {
          case "option":
            bA(W1, P1), W(";");
            break;
          case "reserved":
            L(W1.reserved || (W1.reserved = []), !0);
            break;
          default:
            YA(W1, P1)
        }
      }), t.add(W1)
    }

    function YA(t, B1) {
      if (!Fw.test(B1)) throw O(B1, "name");
      W("=");
      var W1 = k(Z(), !0),
        w1 = {
          options: void 0
        };
      w1.setOption = function(P1, e) {
        if (this.options === void 0) this.options = {};
        this.options[P1] = e
      }, F1(w1, function P1(e) {
        if (e === "option") bA(w1, e), W(";");
        else throw O(e)
      }, function P1() {
        v1(w1)
      }), t.add(B1, W1, w1.comment, w1.options)
    }

    function bA(t, B1) {
      var W1 = W("(", !0);
      if (!Xw.test(B1 = Z())) throw O(B1, "name");
      var w1 = B1,
        P1 = w1,
        e;
      if (W1) {
        if (W(")"), w1 = "(" + w1 + ")", P1 = w1, B1 = Y(), IQ6.test(B1)) e = B1.slice(1), w1 += B1, Z()
      }
      W("=");
      var y1 = e1(t, w1);
      Q1(t, P1, y1, e)
    }

    function e1(t, B1) {
      if (W("{", !0)) {
        var W1 = {};
        while (!W("}", !0)) {
          if (!Fw.test(MA = Z())) throw O(MA, "name");
          if (MA === null) throw O(MA, "end of input");
          var w1, P1 = MA;
          if (W(":", !0), Y() === "{") w1 = e1(t, B1 + "." + MA);
          else if (Y() === "[") {
            w1 = [];
            var e;
            if (W("[", !0)) {
              do e = T(!0), w1.push(e); while (W(",", !0));
              if (W("]"), typeof e !== "undefined") k1(t, B1 + "." + MA, e)
            }
          } else w1 = T(!0), k1(t, B1 + "." + MA, w1);
          var y1 = W1[P1];
          if (y1) w1 = [].concat(y1).concat(w1);
          W1[P1] = w1, W(",", !0), W(";", !0)
        }
        return W1
      }
      var O1 = T(!0);
      return k1(t, B1, O1), O1
    }

    function k1(t, B1, W1) {
      if (t.setOption) t.setOption(B1, W1)
    }

    function Q1(t, B1, W1, w1) {
      if (t.setParsedOption) t.setParsedOption(B1, W1, w1)
    }

    function v1(t) {
      if (W("[", !0)) {
        do bA(t, "option"); while (W(",", !0));
        W("]")
      }
      return t
    }

    function L1(t, B1) {
      if (!Fw.test(B1 = Z())) throw O(B1, "service name");
      var W1 = new a36(B1);
      F1(W1, function w1(P1) {
        if (d(W1, P1)) return;
        if (P1 === "rpc") BA(W1, P1);
        else throw O(P1)
      }), t.add(W1)
    }

    function BA(t, B1) {
      var W1 = J(),
        w1 = B1;
      if (!Fw.test(B1 = Z())) throw O(B1, "name");
      var P1 = B1,
        e, y1, O1, h1;
      if (W("("), W("stream", !0)) y1 = !0;
      if (!Xw.test(B1 = Z())) throw O(B1);
      if (e = B1, W(")"), W("returns"), W("("), W("stream", !0)) h1 = !0;
      if (!Xw.test(B1 = Z())) throw O(B1);
      O1 = B1, W(")");
      var o1 = new s36(P1, w1, e, O1, y1, h1);
      o1.comment = W1, F1(o1, function QA(zA) {
        if (zA === "option") bA(o1, zA), W(";");
        else throw O(zA)
      }), t.add(o1)
    }

    function HA(t, B1) {
      if (!Xw.test(B1 = Z())) throw O(B1, "reference");
      var W1 = B1;
      F1(null, function w1(P1) {
        switch (P1) {
          case "required":
          case "repeated":
            v(t, P1, W1);
            break;
          case "optional":
            if (E) v(t, "proto3_optional", W1);
            else v(t, "optional", W1);
            break;
          default:
            if (!E || !Xw.test(P1)) throw O(P1);
            D(P1), v(t, "optional", W1);
            break
        }
      })
    }
    var MA;
    while ((MA = Z()) !== null) switch (MA) {
      case "package":
        if (!F) throw O(MA);
        i();
        break;
      case "import":
        if (!F) throw O(MA);
        x();
        break;
      case "syntax":
        if (!F) throw O(MA);
        s();
        break;
      case "option":
        bA(N, MA), W(";");
        break;
      default:
        if (d(N, MA)) {
          F = !1;
          continue
        }
        throw O(MA)
    }
    return _N.filename = null, {
      package: X,
      imports: V,
      weakImports: C,
      syntax: K,
      root: B
    }
  }
})
// @from(Start 4826038, End 4829238)
Wy0 = z((Gq8, Yy0) => {
  Yy0.exports = iC;
  var GQ6 = /\/|\./;

  function iC(A, B) {
    if (!GQ6.test(A)) A = "google/protobuf/" + A + ".proto", B = {
      nested: {
        google: {
          nested: {
            protobuf: {
              nested: B
            }
          }
        }
      }
    };
    iC[A] = B
  }
  iC("any", {
    Any: {
      fields: {
        type_url: {
          type: "string",
          id: 1
        },
        value: {
          type: "bytes",
          id: 2
        }
      }
    }
  });
  var Dy0;
  iC("duration", {
    Duration: Dy0 = {
      fields: {
        seconds: {
          type: "int64",
          id: 1
        },
        nanos: {
          type: "int32",
          id: 2
        }
      }
    }
  });
  iC("timestamp", {
    Timestamp: Dy0
  });
  iC("empty", {
    Empty: {
      fields: {}
    }
  });
  iC("struct", {
    Struct: {
      fields: {
        fields: {
          keyType: "string",
          type: "Value",
          id: 1
        }
      }
    },
    Value: {
      oneofs: {
        kind: {
          oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
        }
      },
      fields: {
        nullValue: {
          type: "NullValue",
          id: 1
        },
        numberValue: {
          type: "double",
          id: 2
        },
        stringValue: {
          type: "string",
          id: 3
        },
        boolValue: {
          type: "bool",
          id: 4
        },
        structValue: {
          type: "Struct",
          id: 5
        },
        listValue: {
          type: "ListValue",
          id: 6
        }
      }
    },
    NullValue: {
      values: {
        NULL_VALUE: 0
      }
    },
    ListValue: {
      fields: {
        values: {
          rule: "repeated",
          type: "Value",
          id: 1
        }
      }
    }
  });
  iC("wrappers", {
    DoubleValue: {
      fields: {
        value: {
          type: "double",
          id: 1
        }
      }
    },
    FloatValue: {
      fields: {
        value: {
          type: "float",
          id: 1
        }
      }
    },
    Int64Value: {
      fields: {
        value: {
          type: "int64",
          id: 1
        }
      }
    },
    UInt64Value: {
      fields: {
        value: {
          type: "uint64",
          id: 1
        }
      }
    },
    Int32Value: {
      fields: {
        value: {
          type: "int32",
          id: 1
        }
      }
    },
    UInt32Value: {
      fields: {
        value: {
          type: "uint32",
          id: 1
        }
      }
    },
    BoolValue: {
      fields: {
        value: {
          type: "bool",
          id: 1
        }
      }
    },
    StringValue: {
      fields: {
        value: {
          type: "string",
          id: 1
        }
      }
    },
    BytesValue: {
      fields: {
        value: {
          type: "bytes",
          id: 1
        }
      }
    }
  });
  iC("field_mask", {
    FieldMask: {
      fields: {
        paths: {
          rule: "repeated",
          type: "string",
          id: 1
        }
      }
    }
  });
  iC.get = function A(B) {
    return iC[B] || null
  }
})
// @from(Start 4829244, End 4829438)
RD1 = z((Zq8, Jy0) => {
  var HR = Jy0.exports = rj0();
  HR.build = "full";
  HR.tokenize = Cm1();
  HR.parse = Zy0();
  HR.common = Wy0();
  HR.Root._configure(HR.Type, HR.parse, HR.common)
})
// @from(Start 4829444, End 4850154)
zm1 = z((Dq8, ZQ6) => {
  ZQ6.exports = {
    nested: {
      google: {
        nested: {
          protobuf: {
            nested: {
              FileDescriptorSet: {
                fields: {
                  file: {
                    rule: "repeated",
                    type: "FileDescriptorProto",
                    id: 1
                  }
                }
              },
              FileDescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  package: {
                    type: "string",
                    id: 2
                  },
                  dependency: {
                    rule: "repeated",
                    type: "string",
                    id: 3
                  },
                  publicDependency: {
                    rule: "repeated",
                    type: "int32",
                    id: 10,
                    options: {
                      packed: !1
                    }
                  },
                  weakDependency: {
                    rule: "repeated",
                    type: "int32",
                    id: 11,
                    options: {
                      packed: !1
                    }
                  },
                  messageType: {
                    rule: "repeated",
                    type: "DescriptorProto",
                    id: 4
                  },
                  enumType: {
                    rule: "repeated",
                    type: "EnumDescriptorProto",
                    id: 5
                  },
                  service: {
                    rule: "repeated",
                    type: "ServiceDescriptorProto",
                    id: 6
                  },
                  extension: {
                    rule: "repeated",
                    type: "FieldDescriptorProto",
                    id: 7
                  },
                  options: {
                    type: "FileOptions",
                    id: 8
                  },
                  sourceCodeInfo: {
                    type: "SourceCodeInfo",
                    id: 9
                  },
                  syntax: {
                    type: "string",
                    id: 12
                  }
                }
              },
              DescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  field: {
                    rule: "repeated",
                    type: "FieldDescriptorProto",
                    id: 2
                  },
                  extension: {
                    rule: "repeated",
                    type: "FieldDescriptorProto",
                    id: 6
                  },
                  nestedType: {
                    rule: "repeated",
                    type: "DescriptorProto",
                    id: 3
                  },
                  enumType: {
                    rule: "repeated",
                    type: "EnumDescriptorProto",
                    id: 4
                  },
                  extensionRange: {
                    rule: "repeated",
                    type: "ExtensionRange",
                    id: 5
                  },
                  oneofDecl: {
                    rule: "repeated",
                    type: "OneofDescriptorProto",
                    id: 8
                  },
                  options: {
                    type: "MessageOptions",
                    id: 7
                  },
                  reservedRange: {
                    rule: "repeated",
                    type: "ReservedRange",
                    id: 9
                  },
                  reservedName: {
                    rule: "repeated",
                    type: "string",
                    id: 10
                  }
                },
                nested: {
                  ExtensionRange: {
                    fields: {
                      start: {
                        type: "int32",
                        id: 1
                      },
                      end: {
                        type: "int32",
                        id: 2
                      }
                    }
                  },
                  ReservedRange: {
                    fields: {
                      start: {
                        type: "int32",
                        id: 1
                      },
                      end: {
                        type: "int32",
                        id: 2
                      }
                    }
                  }
                }
              },
              FieldDescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  number: {
                    type: "int32",
                    id: 3
                  },
                  label: {
                    type: "Label",
                    id: 4
                  },
                  type: {
                    type: "Type",
                    id: 5
                  },
                  typeName: {
                    type: "string",
                    id: 6
                  },
                  extendee: {
                    type: "string",
                    id: 2
                  },
                  defaultValue: {
                    type: "string",
                    id: 7
                  },
                  oneofIndex: {
                    type: "int32",
                    id: 9
                  },
                  jsonName: {
                    type: "string",
                    id: 10
                  },
                  options: {
                    type: "FieldOptions",
                    id: 8
                  }
                },
                nested: {
                  Type: {
                    values: {
                      TYPE_DOUBLE: 1,
                      TYPE_FLOAT: 2,
                      TYPE_INT64: 3,
                      TYPE_UINT64: 4,
                      TYPE_INT32: 5,
                      TYPE_FIXED64: 6,
                      TYPE_FIXED32: 7,
                      TYPE_BOOL: 8,
                      TYPE_STRING: 9,
                      TYPE_GROUP: 10,
                      TYPE_MESSAGE: 11,
                      TYPE_BYTES: 12,
                      TYPE_UINT32: 13,
                      TYPE_ENUM: 14,
                      TYPE_SFIXED32: 15,
                      TYPE_SFIXED64: 16,
                      TYPE_SINT32: 17,
                      TYPE_SINT64: 18
                    }
                  },
                  Label: {
                    values: {
                      LABEL_OPTIONAL: 1,
                      LABEL_REQUIRED: 2,
                      LABEL_REPEATED: 3
                    }
                  }
                }
              },
              OneofDescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  options: {
                    type: "OneofOptions",
                    id: 2
                  }
                }
              },
              EnumDescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  value: {
                    rule: "repeated",
                    type: "EnumValueDescriptorProto",
                    id: 2
                  },
                  options: {
                    type: "EnumOptions",
                    id: 3
                  }
                }
              },
              EnumValueDescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  number: {
                    type: "int32",
                    id: 2
                  },
                  options: {
                    type: "EnumValueOptions",
                    id: 3
                  }
                }
              },
              ServiceDescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  method: {
                    rule: "repeated",
                    type: "MethodDescriptorProto",
                    id: 2
                  },
                  options: {
                    type: "ServiceOptions",
                    id: 3
                  }
                }
              },
              MethodDescriptorProto: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  inputType: {
                    type: "string",
                    id: 2
                  },
                  outputType: {
                    type: "string",
                    id: 3
                  },
                  options: {
                    type: "MethodOptions",
                    id: 4
                  },
                  clientStreaming: {
                    type: "bool",
                    id: 5
                  },
                  serverStreaming: {
                    type: "bool",
                    id: 6
                  }
                }
              },
              FileOptions: {
                fields: {
                  javaPackage: {
                    type: "string",
                    id: 1
                  },
                  javaOuterClassname: {
                    type: "string",
                    id: 8
                  },
                  javaMultipleFiles: {
                    type: "bool",
                    id: 10
                  },
                  javaGenerateEqualsAndHash: {
                    type: "bool",
                    id: 20,
                    options: {
                      deprecated: !0
                    }
                  },
                  javaStringCheckUtf8: {
                    type: "bool",
                    id: 27
                  },
                  optimizeFor: {
                    type: "OptimizeMode",
                    id: 9,
                    options: {
                      default: "SPEED"
                    }
                  },
                  goPackage: {
                    type: "string",
                    id: 11
                  },
                  ccGenericServices: {
                    type: "bool",
                    id: 16
                  },
                  javaGenericServices: {
                    type: "bool",
                    id: 17
                  },
                  pyGenericServices: {
                    type: "bool",
                    id: 18
                  },
                  deprecated: {
                    type: "bool",
                    id: 23
                  },
                  ccEnableArenas: {
                    type: "bool",
                    id: 31
                  },
                  objcClassPrefix: {
                    type: "string",
                    id: 36
                  },
                  csharpNamespace: {
                    type: "string",
                    id: 37
                  },
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ],
                reserved: [
                  [38, 38]
                ],
                nested: {
                  OptimizeMode: {
                    values: {
                      SPEED: 1,
                      CODE_SIZE: 2,
                      LITE_RUNTIME: 3
                    }
                  }
                }
              },
              MessageOptions: {
                fields: {
                  messageSetWireFormat: {
                    type: "bool",
                    id: 1
                  },
                  noStandardDescriptorAccessor: {
                    type: "bool",
                    id: 2
                  },
                  deprecated: {
                    type: "bool",
                    id: 3
                  },
                  mapEntry: {
                    type: "bool",
                    id: 7
                  },
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ],
                reserved: [
                  [8, 8]
                ]
              },
              FieldOptions: {
                fields: {
                  ctype: {
                    type: "CType",
                    id: 1,
                    options: {
                      default: "STRING"
                    }
                  },
                  packed: {
                    type: "bool",
                    id: 2
                  },
                  jstype: {
                    type: "JSType",
                    id: 6,
                    options: {
                      default: "JS_NORMAL"
                    }
                  },
                  lazy: {
                    type: "bool",
                    id: 5
                  },
                  deprecated: {
                    type: "bool",
                    id: 3
                  },
                  weak: {
                    type: "bool",
                    id: 10
                  },
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ],
                reserved: [
                  [4, 4]
                ],
                nested: {
                  CType: {
                    values: {
                      STRING: 0,
                      CORD: 1,
                      STRING_PIECE: 2
                    }
                  },
                  JSType: {
                    values: {
                      JS_NORMAL: 0,
                      JS_STRING: 1,
                      JS_NUMBER: 2
                    }
                  }
                }
              },
              OneofOptions: {
                fields: {
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ]
              },
              EnumOptions: {
                fields: {
                  allowAlias: {
                    type: "bool",
                    id: 2
                  },
                  deprecated: {
                    type: "bool",
                    id: 3
                  },
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ]
              },
              EnumValueOptions: {
                fields: {
                  deprecated: {
                    type: "bool",
                    id: 1
                  },
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ]
              },
              ServiceOptions: {
                fields: {
                  deprecated: {
                    type: "bool",
                    id: 33
                  },
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ]
              },
              MethodOptions: {
                fields: {
                  deprecated: {
                    type: "bool",
                    id: 33
                  },
                  uninterpretedOption: {
                    rule: "repeated",
                    type: "UninterpretedOption",
                    id: 999
                  }
                },
                extensions: [
                  [1000, 536870911]
                ]
              },
              UninterpretedOption: {
                fields: {
                  name: {
                    rule: "repeated",
                    type: "NamePart",
                    id: 2
                  },
                  identifierValue: {
                    type: "string",
                    id: 3
                  },
                  positiveIntValue: {
                    type: "uint64",
                    id: 4
                  },
                  negativeIntValue: {
                    type: "int64",
                    id: 5
                  },
                  doubleValue: {
                    type: "double",
                    id: 6
                  },
                  stringValue: {
                    type: "bytes",
                    id: 7
                  },
                  aggregateValue: {
                    type: "string",
                    id: 8
                  }
                },
                nested: {
                  NamePart: {
                    fields: {
                      namePart: {
                        rule: "required",
                        type: "string",
                        id: 1
                      },
                      isExtension: {
                        rule: "required",
                        type: "bool",
                        id: 2
                      }
                    }
                  }
                }
              },
              SourceCodeInfo: {
                fields: {
                  location: {
                    rule: "repeated",
                    type: "Location",
                    id: 1
                  }
                },
                nested: {
                  Location: {
                    fields: {
                      path: {
                        rule: "repeated",
                        type: "int32",
                        id: 1
                      },
                      span: {
                        rule: "repeated",
                        type: "int32",
                        id: 2
                      },
                      leadingComments: {
                        type: "string",
                        id: 3
                      },
                      trailingComments: {
                        type: "string",
                        id: 4
                      },
                      leadingDetachedComments: {
                        rule: "repeated",
                        type: "string",
                        id: 6
                      }
                    }
                  }
                }
              },
              GeneratedCodeInfo: {
                fields: {
                  annotation: {
                    rule: "repeated",
                    type: "Annotation",
                    id: 1
                  }
                },
                nested: {
                  Annotation: {
                    fields: {
                      path: {
                        rule: "repeated",
                        type: "int32",
                        id: 1
                      },
                      sourceFile: {
                        type: "string",
                        id: 2
                      },
                      begin: {
                        type: "int32",
                        id: 3
                      },
                      end: {
                        type: "int32",
                        id: 4
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})
// @from(Start 4850160, End 4864850)
Ky0 = z((V6, Cy0) => {
  var yD = RD1();
  Cy0.exports = V6 = yD.descriptor = yD.Root.fromJSON(zm1()).lookup(".google.protobuf");
  var {
    Namespace: Fy0,
    Root: Dr,
    Enum: jN,
    Type: zR,
    Field: wR,
    MapField: DQ6,
    OneOf: OD1,
    Service: Yr,
    Method: TD1
  } = yD;
  Dr.fromDescriptor = function A(B) {
    if (typeof B.length === "number") B = V6.FileDescriptorSet.decode(B);
    var Q = new Dr;
    if (B.file) {
      var I, G;
      for (var Z = 0, D; Z < B.file.length; ++Z) {
        if (G = Q, (I = B.file[Z]).package && I.package.length) G = Q.define(I.package);
        if (I.name && I.name.length) Q.files.push(G.filename = I.name);
        if (I.messageType)
          for (D = 0; D < I.messageType.length; ++D) G.add(zR.fromDescriptor(I.messageType[D], I.syntax));
        if (I.enumType)
          for (D = 0; D < I.enumType.length; ++D) G.add(jN.fromDescriptor(I.enumType[D]));
        if (I.extension)
          for (D = 0; D < I.extension.length; ++D) G.add(wR.fromDescriptor(I.extension[D]));
        if (I.service)
          for (D = 0; D < I.service.length; ++D) G.add(Yr.fromDescriptor(I.service[D]));
        var Y = Ih(I.options, V6.FileOptions);
        if (Y) {
          var W = Object.keys(Y);
          for (D = 0; D < W.length; ++D) G.setOption(W[D], Y[W[D]])
        }
      }
    }
    return Q
  };
  Dr.prototype.toDescriptor = function A(B) {
    var Q = V6.FileDescriptorSet.create();
    return Xy0(this, Q.file, B), Q
  };

  function Xy0(A, B, Q) {
    var I = V6.FileDescriptorProto.create({
      name: A.filename || (A.fullName.substring(1).replace(/\./g, "_") || "root") + ".proto"
    });
    if (Q) I.syntax = Q;
    if (!(A instanceof Dr)) I.package = A.fullName.substring(1);
    for (var G = 0, Z; G < A.nestedArray.length; ++G)
      if ((Z = A._nestedArray[G]) instanceof zR) I.messageType.push(Z.toDescriptor(Q));
      else if (Z instanceof jN) I.enumType.push(Z.toDescriptor());
    else if (Z instanceof wR) I.extension.push(Z.toDescriptor(Q));
    else if (Z instanceof Yr) I.service.push(Z.toDescriptor());
    else if (Z instanceof Fy0) Xy0(Z, B, Q);
    if (I.options = Gh(A.options, V6.FileOptions), I.messageType.length + I.enumType.length + I.extension.length + I.service.length) B.push(I)
  }
  var YQ6 = 0;
  zR.fromDescriptor = function A(B, Q) {
    if (typeof B.length === "number") B = V6.DescriptorProto.decode(B);
    var I = new zR(B.name.length ? B.name : "Type" + YQ6++, Ih(B.options, V6.MessageOptions)),
      G;
    if (B.oneofDecl)
      for (G = 0; G < B.oneofDecl.length; ++G) I.add(OD1.fromDescriptor(B.oneofDecl[G]));
    if (B.field)
      for (G = 0; G < B.field.length; ++G) {
        var Z = wR.fromDescriptor(B.field[G], Q);
        if (I.add(Z), B.field[G].hasOwnProperty("oneofIndex")) I.oneofsArray[B.field[G].oneofIndex].add(Z)
      }
    if (B.extension)
      for (G = 0; G < B.extension.length; ++G) I.add(wR.fromDescriptor(B.extension[G], Q));
    if (B.nestedType) {
      for (G = 0; G < B.nestedType.length; ++G)
        if (I.add(zR.fromDescriptor(B.nestedType[G], Q)), B.nestedType[G].options && B.nestedType[G].options.mapEntry) I.setOption("map_entry", !0)
    }
    if (B.enumType)
      for (G = 0; G < B.enumType.length; ++G) I.add(jN.fromDescriptor(B.enumType[G]));
    if (B.extensionRange && B.extensionRange.length) {
      I.extensions = [];
      for (G = 0; G < B.extensionRange.length; ++G) I.extensions.push([B.extensionRange[G].start, B.extensionRange[G].end])
    }
    if (B.reservedRange && B.reservedRange.length || B.reservedName && B.reservedName.length) {
      if (I.reserved = [], B.reservedRange)
        for (G = 0; G < B.reservedRange.length; ++G) I.reserved.push([B.reservedRange[G].start, B.reservedRange[G].end]);
      if (B.reservedName)
        for (G = 0; G < B.reservedName.length; ++G) I.reserved.push(B.reservedName[G])
    }
    return I
  };
  zR.prototype.toDescriptor = function A(B) {
    var Q = V6.DescriptorProto.create({
        name: this.name
      }),
      I;
    for (I = 0; I < this.fieldsArray.length; ++I) {
      var G;
      if (Q.field.push(G = this._fieldsArray[I].toDescriptor(B)), this._fieldsArray[I] instanceof DQ6) {
        var Z = wm1(this._fieldsArray[I].keyType, this._fieldsArray[I].resolvedKeyType),
          D = wm1(this._fieldsArray[I].type, this._fieldsArray[I].resolvedType),
          Y = D === 11 || D === 14 ? this._fieldsArray[I].resolvedType && Vy0(this.parent, this._fieldsArray[I].resolvedType) || this._fieldsArray[I].type : void 0;
        Q.nestedType.push(V6.DescriptorProto.create({
          name: G.typeName,
          field: [V6.FieldDescriptorProto.create({
            name: "key",
            number: 1,
            label: 1,
            type: Z
          }), V6.FieldDescriptorProto.create({
            name: "value",
            number: 2,
            label: 1,
            type: D,
            typeName: Y
          })],
          options: V6.MessageOptions.create({
            mapEntry: !0
          })
        }))
      }
    }
    for (I = 0; I < this.oneofsArray.length; ++I) Q.oneofDecl.push(this._oneofsArray[I].toDescriptor());
    for (I = 0; I < this.nestedArray.length; ++I)
      if (this._nestedArray[I] instanceof wR) Q.field.push(this._nestedArray[I].toDescriptor(B));
      else if (this._nestedArray[I] instanceof zR) Q.nestedType.push(this._nestedArray[I].toDescriptor(B));
    else if (this._nestedArray[I] instanceof jN) Q.enumType.push(this._nestedArray[I].toDescriptor());
    if (this.extensions)
      for (I = 0; I < this.extensions.length; ++I) Q.extensionRange.push(V6.DescriptorProto.ExtensionRange.create({
        start: this.extensions[I][0],
        end: this.extensions[I][1]
      }));
    if (this.reserved)
      for (I = 0; I < this.reserved.length; ++I)
        if (typeof this.reserved[I] === "string") Q.reservedName.push(this.reserved[I]);
        else Q.reservedRange.push(V6.DescriptorProto.ReservedRange.create({
          start: this.reserved[I][0],
          end: this.reserved[I][1]
        }));
    return Q.options = Gh(this.options, V6.MessageOptions), Q
  };
  var WQ6 = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
  wR.fromDescriptor = function A(B, Q) {
    if (typeof B.length === "number") B = V6.DescriptorProto.decode(B);
    if (typeof B.number !== "number") throw Error("missing field id");
    var I;
    if (B.typeName && B.typeName.length) I = B.typeName;
    else I = CQ6(B.type);
    var G;
    switch (B.label) {
      case 1:
        G = void 0;
        break;
      case 2:
        G = "required";
        break;
      case 3:
        G = "repeated";
        break;
      default:
        throw Error("illegal label: " + B.label)
    }
    var Z = B.extendee;
    if (B.extendee !== void 0) Z = Z.length ? Z : void 0;
    var D = new wR(B.name.length ? B.name : "field" + B.number, B.number, I, G, Z);
    if (D.options = Ih(B.options, V6.FieldOptions), B.defaultValue && B.defaultValue.length) {
      var Y = B.defaultValue;
      switch (Y) {
        case "true":
        case "TRUE":
          Y = !0;
          break;
        case "false":
        case "FALSE":
          Y = !1;
          break;
        default:
          var W = WQ6.exec(Y);
          if (W) Y = parseInt(Y);
          break
      }
      D.setOption("default", Y)
    }
    if (KQ6(B.type)) {
      if (Q === "proto3") {
        if (B.options && !B.options.packed) D.setOption("packed", !1)
      } else if (!(B.options && B.options.packed)) D.setOption("packed", !1)
    }
    return D
  };
  wR.prototype.toDescriptor = function A(B) {
    var Q = V6.FieldDescriptorProto.create({
      name: this.name,
      number: this.id
    });
    if (this.map) Q.type = 11, Q.typeName = yD.util.ucFirst(this.name), Q.label = 3;
    else {
      switch (Q.type = wm1(this.type, this.resolve().resolvedType)) {
        case 10:
        case 11:
        case 14:
          Q.typeName = this.resolvedType ? Vy0(this.parent, this.resolvedType) : this.type;
          break
      }
      switch (this.rule) {
        case "repeated":
          Q.label = 3;
          break;
        case "required":
          Q.label = 2;
          break;
        default:
          Q.label = 1;
          break
      }
    }
    if (Q.extendee = this.extensionField ? this.extensionField.parent.fullName : this.extend, this.partOf) {
      if ((Q.oneofIndex = this.parent.oneofsArray.indexOf(this.partOf)) < 0) throw Error("missing oneof")
    }
    if (this.options) {
      if (Q.options = Gh(this.options, V6.FieldOptions), this.options.default != null) Q.defaultValue = String(this.options.default)
    }
    if (B === "proto3") {
      if (!this.packed)(Q.options || (Q.options = V6.FieldOptions.create())).packed = !1
    } else if (this.packed)(Q.options || (Q.options = V6.FieldOptions.create())).packed = !0;
    return Q
  };
  var JQ6 = 0;
  jN.fromDescriptor = function A(B) {
    if (typeof B.length === "number") B = V6.EnumDescriptorProto.decode(B);
    var Q = {};
    if (B.value)
      for (var I = 0; I < B.value.length; ++I) {
        var G = B.value[I].name,
          Z = B.value[I].number || 0;
        Q[G && G.length ? G : "NAME" + Z] = Z
      }
    return new jN(B.name && B.name.length ? B.name : "Enum" + JQ6++, Q, Ih(B.options, V6.EnumOptions))
  };
  jN.prototype.toDescriptor = function A() {
    var B = [];
    for (var Q = 0, I = Object.keys(this.values); Q < I.length; ++Q) B.push(V6.EnumValueDescriptorProto.create({
      name: I[Q],
      number: this.values[I[Q]]
    }));
    return V6.EnumDescriptorProto.create({
      name: this.name,
      value: B,
      options: Gh(this.options, V6.EnumOptions)
    })
  };
  var FQ6 = 0;
  OD1.fromDescriptor = function A(B) {
    if (typeof B.length === "number") B = V6.OneofDescriptorProto.decode(B);
    return new OD1(B.name && B.name.length ? B.name : "oneof" + FQ6++)
  };
  OD1.prototype.toDescriptor = function A() {
    return V6.OneofDescriptorProto.create({
      name: this.name
    })
  };
  var XQ6 = 0;
  Yr.fromDescriptor = function A(B) {
    if (typeof B.length === "number") B = V6.ServiceDescriptorProto.decode(B);
    var Q = new Yr(B.name && B.name.length ? B.name : "Service" + XQ6++, Ih(B.options, V6.ServiceOptions));
    if (B.method)
      for (var I = 0; I < B.method.length; ++I) Q.add(TD1.fromDescriptor(B.method[I]));
    return Q
  };
  Yr.prototype.toDescriptor = function A() {
    var B = [];
    for (var Q = 0; Q < this.methodsArray.length; ++Q) B.push(this._methodsArray[Q].toDescriptor());
    return V6.ServiceDescriptorProto.create({
      name: this.name,
      method: B,
      options: Gh(this.options, V6.ServiceOptions)
    })
  };
  var VQ6 = 0;
  TD1.fromDescriptor = function A(B) {
    if (typeof B.length === "number") B = V6.MethodDescriptorProto.decode(B);
    return new TD1(B.name && B.name.length ? B.name : "Method" + VQ6++, "rpc", B.inputType, B.outputType, Boolean(B.clientStreaming), Boolean(B.serverStreaming), Ih(B.options, V6.MethodOptions))
  };
  TD1.prototype.toDescriptor = function A() {
    return V6.MethodDescriptorProto.create({
      name: this.name,
      inputType: this.resolvedRequestType ? this.resolvedRequestType.fullName : this.requestType,
      outputType: this.resolvedResponseType ? this.resolvedResponseType.fullName : this.responseType,
      clientStreaming: this.requestStream,
      serverStreaming: this.responseStream,
      options: Gh(this.options, V6.MethodOptions)
    })
  };

  function CQ6(A) {
    switch (A) {
      case 1:
        return "double";
      case 2:
        return "float";
      case 3:
        return "int64";
      case 4:
        return "uint64";
      case 5:
        return "int32";
      case 6:
        return "fixed64";
      case 7:
        return "fixed32";
      case 8:
        return "bool";
      case 9:
        return "string";
      case 12:
        return "bytes";
      case 13:
        return "uint32";
      case 15:
        return "sfixed32";
      case 16:
        return "sfixed64";
      case 17:
        return "sint32";
      case 18:
        return "sint64"
    }
    throw Error("illegal type: " + A)
  }

  function KQ6(A) {
    switch (A) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        return !0
    }
    return !1
  }

  function wm1(A, B) {
    switch (A) {
      case "double":
        return 1;
      case "float":
        return 2;
      case "int64":
        return 3;
      case "uint64":
        return 4;
      case "int32":
        return 5;
      case "fixed64":
        return 6;
      case "fixed32":
        return 7;
      case "bool":
        return 8;
      case "string":
        return 9;
      case "bytes":
        return 12;
      case "uint32":
        return 13;
      case "sfixed32":
        return 15;
      case "sfixed64":
        return 16;
      case "sint32":
        return 17;
      case "sint64":
        return 18
    }
    if (B instanceof jN) return 14;
    if (B instanceof zR) return B.group ? 10 : 11;
    throw Error("illegal type: " + A)
  }

  function Ih(A, B) {
    if (!A) return;
    var Q = [];
    for (var I = 0, G, Z, D; I < B.fieldsArray.length; ++I)
      if ((Z = (G = B._fieldsArray[I]).name) !== "uninterpretedOption") {
        if (A.hasOwnProperty(Z)) {
          if (D = A[Z], G.resolvedType instanceof jN && typeof D === "number" && G.resolvedType.valuesById[D] !== void 0) D = G.resolvedType.valuesById[D];
          Q.push(HQ6(Z), D)
        }
      } return Q.length ? yD.util.toObject(Q) : void 0
  }

  function Gh(A, B) {
    if (!A) return;
    var Q = [];
    for (var I = 0, G = Object.keys(A), Z, D; I < G.length; ++I) {
      if (D = A[Z = G[I]], Z === "default") continue;
      var Y = B.fields[Z];
      if (!Y && !(Y = B.fields[Z = yD.util.camelCase(Z)])) continue;
      Q.push(Z, D)
    }
    return Q.length ? B.fromObject(yD.util.toObject(Q)) : void 0
  }

  function Vy0(A, B) {
    var Q = A.fullName.split("."),
      I = B.fullName.split("."),
      G = 0,
      Z = 0,
      D = I.length - 1;
    if (!(A instanceof Dr) && B instanceof Fy0)
      while (G < Q.length && Z < D && Q[G] === I[Z]) {
        var Y = B.lookup(Q[G++], !0);
        if (Y !== null && Y !== B) break;
        ++Z
      } else
        for (; G < Q.length && Z < D && Q[G] === I[Z]; ++G, ++Z);
    return I.slice(Z).join(".")
  }

  function HQ6(A) {
    return A.substring(0, 1) + A.substring(1).replace(/([A-Z])(?=[a-z]|$)/g, function(B, Q) {
      return "_" + Q.toLowerCase()
    })
  }
})
// @from(Start 4864856, End 4867924)
Hy0 = z((Yq8, zQ6) => {
  zQ6.exports = {
    nested: {
      google: {
        nested: {
          protobuf: {
            nested: {
              Api: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  methods: {
                    rule: "repeated",
                    type: "Method",
                    id: 2
                  },
                  options: {
                    rule: "repeated",
                    type: "Option",
                    id: 3
                  },
                  version: {
                    type: "string",
                    id: 4
                  },
                  sourceContext: {
                    type: "SourceContext",
                    id: 5
                  },
                  mixins: {
                    rule: "repeated",
                    type: "Mixin",
                    id: 6
                  },
                  syntax: {
                    type: "Syntax",
                    id: 7
                  }
                }
              },
              Method: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  requestTypeUrl: {
                    type: "string",
                    id: 2
                  },
                  requestStreaming: {
                    type: "bool",
                    id: 3
                  },
                  responseTypeUrl: {
                    type: "string",
                    id: 4
                  },
                  responseStreaming: {
                    type: "bool",
                    id: 5
                  },
                  options: {
                    rule: "repeated",
                    type: "Option",
                    id: 6
                  },
                  syntax: {
                    type: "Syntax",
                    id: 7
                  }
                }
              },
              Mixin: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  root: {
                    type: "string",
                    id: 2
                  }
                }
              },
              SourceContext: {
                fields: {
                  fileName: {
                    type: "string",
                    id: 1
                  }
                }
              },
              Option: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  value: {
                    type: "Any",
                    id: 2
                  }
                }
              },
              Syntax: {
                values: {
                  SYNTAX_PROTO2: 0,
                  SYNTAX_PROTO3: 1
                }
              }
            }
          }
        }
      }
    }
  }
})
// @from(Start 4867930, End 4868323)
zy0 = z((Wq8, wQ6) => {
  wQ6.exports = {
    nested: {
      google: {
        nested: {
          protobuf: {
            nested: {
              SourceContext: {
                fields: {
                  fileName: {
                    type: "string",
                    id: 1
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})
// @from(Start 4868329, End 4873954)
wy0 = z((Jq8, EQ6) => {
  EQ6.exports = {
    nested: {
      google: {
        nested: {
          protobuf: {
            nested: {
              Type: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  fields: {
                    rule: "repeated",
                    type: "Field",
                    id: 2
                  },
                  oneofs: {
                    rule: "repeated",
                    type: "string",
                    id: 3
                  },
                  options: {
                    rule: "repeated",
                    type: "Option",
                    id: 4
                  },
                  sourceContext: {
                    type: "SourceContext",
                    id: 5
                  },
                  syntax: {
                    type: "Syntax",
                    id: 6
                  }
                }
              },
              Field: {
                fields: {
                  kind: {
                    type: "Kind",
                    id: 1
                  },
                  cardinality: {
                    type: "Cardinality",
                    id: 2
                  },
                  number: {
                    type: "int32",
                    id: 3
                  },
                  name: {
                    type: "string",
                    id: 4
                  },
                  typeUrl: {
                    type: "string",
                    id: 6
                  },
                  oneofIndex: {
                    type: "int32",
                    id: 7
                  },
                  packed: {
                    type: "bool",
                    id: 8
                  },
                  options: {
                    rule: "repeated",
                    type: "Option",
                    id: 9
                  },
                  jsonName: {
                    type: "string",
                    id: 10
                  },
                  defaultValue: {
                    type: "string",
                    id: 11
                  }
                },
                nested: {
                  Kind: {
                    values: {
                      TYPE_UNKNOWN: 0,
                      TYPE_DOUBLE: 1,
                      TYPE_FLOAT: 2,
                      TYPE_INT64: 3,
                      TYPE_UINT64: 4,
                      TYPE_INT32: 5,
                      TYPE_FIXED64: 6,
                      TYPE_FIXED32: 7,
                      TYPE_BOOL: 8,
                      TYPE_STRING: 9,
                      TYPE_GROUP: 10,
                      TYPE_MESSAGE: 11,
                      TYPE_BYTES: 12,
                      TYPE_UINT32: 13,
                      TYPE_ENUM: 14,
                      TYPE_SFIXED32: 15,
                      TYPE_SFIXED64: 16,
                      TYPE_SINT32: 17,
                      TYPE_SINT64: 18
                    }
                  },
                  Cardinality: {
                    values: {
                      CARDINALITY_UNKNOWN: 0,
                      CARDINALITY_OPTIONAL: 1,
                      CARDINALITY_REQUIRED: 2,
                      CARDINALITY_REPEATED: 3
                    }
                  }
                }
              },
              Enum: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  enumvalue: {
                    rule: "repeated",
                    type: "EnumValue",
                    id: 2
                  },
                  options: {
                    rule: "repeated",
                    type: "Option",
                    id: 3
                  },
                  sourceContext: {
                    type: "SourceContext",
                    id: 4
                  },
                  syntax: {
                    type: "Syntax",
                    id: 5
                  }
                }
              },
              EnumValue: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  number: {
                    type: "int32",
                    id: 2
                  },
                  options: {
                    rule: "repeated",
                    type: "Option",
                    id: 3
                  }
                }
              },
              Option: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  value: {
                    type: "Any",
                    id: 2
                  }
                }
              },
              Syntax: {
                values: {
                  SYNTAX_PROTO2: 0,
                  SYNTAX_PROTO3: 1
                }
              },
              Any: {
                fields: {
                  type_url: {
                    type: "string",
                    id: 1
                  },
                  value: {
                    type: "bytes",
                    id: 2
                  }
                }
              },
              SourceContext: {
                fields: {
                  fileName: {
                    type: "string",
                    id: 1
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})
// @from(Start 4873960, End 4875655)
My0 = z(($y0) => {
  Object.defineProperty($y0, "__esModule", {
    value: !0
  });
  $y0.addCommonProtos = $y0.loadProtosWithOptionsSync = $y0.loadProtosWithOptions = void 0;
  var Ey0 = Z1("fs"),
    Uy0 = Z1("path"),
    Zh = RD1();

  function Ny0(A, B) {
    let Q = A.resolvePath;
    A.resolvePath = (I, G) => {
      if (Uy0.isAbsolute(G)) return G;
      for (let Z of B) {
        let D = Uy0.join(Z, G);
        try {
          return Ey0.accessSync(D, Ey0.constants.R_OK), D
        } catch (Y) {
          continue
        }
      }
      return process.emitWarning(`${G} not found in any of the include paths ${B}`), Q(I, G)
    }
  }
  async function UQ6(A, B) {
    let Q = new Zh.Root;
    if (B = B || {}, B.includeDirs) {
      if (!Array.isArray(B.includeDirs)) return Promise.reject(new Error("The includeDirs option must be an array"));
      Ny0(Q, B.includeDirs)
    }
    let I = await Q.load(A, B);
    return I.resolveAll(), I
  }
  $y0.loadProtosWithOptions = UQ6;

  function NQ6(A, B) {
    let Q = new Zh.Root;
    if (B = B || {}, B.includeDirs) {
      if (!Array.isArray(B.includeDirs)) throw new Error("The includeDirs option must be an array");
      Ny0(Q, B.includeDirs)
    }
    let I = Q.loadSync(A, B);
    return I.resolveAll(), I
  }
  $y0.loadProtosWithOptionsSync = NQ6;

  function $Q6() {
    let A = Hy0(),
      B = zm1(),
      Q = zy0(),
      I = wy0();
    Zh.common("api", A.nested.google.nested.protobuf.nested), Zh.common("descriptor", B.nested.google.nested.protobuf.nested), Zh.common("source_context", Q.nested.google.nested.protobuf.nested), Zh.common("type", I.nested.google.nested.protobuf.nested)
  }
  $y0.addCommonProtos = $Q6
})
// @from(Start 4875661, End 4892903)
Ly0 = z((Wr, Em1) => {
  (function(A, B) {
    function Q(I) {
      return "default" in I ? I.default : I
    }
    if (typeof define === "function" && define.amd) define([], function() {
      var I = {};
      return B(I), Q(I)
    });
    else if (typeof Wr === "object") {
      if (B(Wr), typeof Em1 === "object") Em1.exports = Q(Wr)
    } else(function() {
      var I = {};
      B(I), A.Long = Q(I)
    })()
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : Wr, function(A) {
    Object.defineProperty(A, "__esModule", {
      value: !0
    }), A.default = void 0;
    var B = null;
    try {
      B = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
    } catch {}

    function Q(X1, v, D1) {
      this.low = X1 | 0, this.high = v | 0, this.unsigned = !!D1
    }
    Q.prototype.__isLong__, Object.defineProperty(Q.prototype, "__isLong__", {
      value: !0
    });

    function I(X1) {
      return (X1 && X1.__isLong__) === !0
    }

    function G(X1) {
      var v = Math.clz32(X1 & -X1);
      return X1 ? 31 - v : v
    }
    Q.isLong = I;
    var Z = {},
      D = {};

    function Y(X1, v) {
      var D1, N1, u1;
      if (v) {
        if (X1 >>>= 0, u1 = 0 <= X1 && X1 < 256) {
          if (N1 = D[X1], N1) return N1
        }
        if (D1 = J(X1, 0, !0), u1) D[X1] = D1;
        return D1
      } else {
        if (X1 |= 0, u1 = -128 <= X1 && X1 < 128) {
          if (N1 = Z[X1], N1) return N1
        }
        if (D1 = J(X1, X1 < 0 ? -1 : 0, !1), u1) Z[X1] = D1;
        return D1
      }
    }
    Q.fromInt = Y;

    function W(X1, v) {
      if (isNaN(X1)) return v ? T : R;
      if (v) {
        if (X1 < 0) return T;
        if (X1 >= N) return x
      } else {
        if (X1 <= -q) return s;
        if (X1 + 1 >= q) return i
      }
      if (X1 < 0) return W(-X1, v).neg();
      return J(X1 % E | 0, X1 / E | 0, v)
    }
    Q.fromNumber = W;

    function J(X1, v, D1) {
      return new Q(X1, v, D1)
    }
    Q.fromBits = J;
    var F = Math.pow;

    function X(X1, v, D1) {
      if (X1.length === 0) throw Error("empty string");
      if (typeof v === "number") D1 = v, v = !1;
      else v = !!v;
      if (X1 === "NaN" || X1 === "Infinity" || X1 === "+Infinity" || X1 === "-Infinity") return v ? T : R;
      if (D1 = D1 || 10, D1 < 2 || 36 < D1) throw RangeError("radix");
      var N1;
      if ((N1 = X1.indexOf("-")) > 0) throw Error("interior hyphen");
      else if (N1 === 0) return X(X1.substring(1), v, D1).neg();
      var u1 = W(F(D1, 8)),
        d1 = R;
      for (var YA = 0; YA < X1.length; YA += 8) {
        var bA = Math.min(8, X1.length - YA),
          e1 = parseInt(X1.substring(YA, YA + bA), D1);
        if (bA < 8) {
          var k1 = W(F(D1, bA));
          d1 = d1.mul(k1).add(W(e1))
        } else d1 = d1.mul(u1), d1 = d1.add(W(e1))
      }
      return d1.unsigned = v, d1
    }
    Q.fromString = X;

    function V(X1, v) {
      if (typeof X1 === "number") return W(X1, v);
      if (typeof X1 === "string") return X(X1, v);
      return J(X1.low, X1.high, typeof v === "boolean" ? v : X1.unsigned)
    }
    Q.fromValue = V;
    var C = 65536,
      K = 16777216,
      E = C * C,
      N = E * E,
      q = N / 2,
      O = Y(K),
      R = Y(0);
    Q.ZERO = R;
    var T = Y(0, !0);
    Q.UZERO = T;
    var L = Y(1);
    Q.ONE = L;
    var _ = Y(1, !0);
    Q.UONE = _;
    var k = Y(-1);
    Q.NEG_ONE = k;
    var i = J(-1, 2147483647, !1);
    Q.MAX_VALUE = i;
    var x = J(-1, -1, !0);
    Q.MAX_UNSIGNED_VALUE = x;
    var s = J(0, -2147483648, !1);
    Q.MIN_VALUE = s;
    var d = Q.prototype;
    if (d.toInt = function X1() {
        return this.unsigned ? this.low >>> 0 : this.low
      }, d.toNumber = function X1() {
        if (this.unsigned) return (this.high >>> 0) * E + (this.low >>> 0);
        return this.high * E + (this.low >>> 0)
      }, d.toString = function X1(v) {
        if (v = v || 10, v < 2 || 36 < v) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative())
          if (this.eq(s)) {
            var D1 = W(v),
              N1 = this.div(D1),
              u1 = N1.mul(D1).sub(this);
            return N1.toString(v) + u1.toInt().toString(v)
          } else return "-" + this.neg().toString(v);
        var d1 = W(F(v, 6), this.unsigned),
          YA = this,
          bA = "";
        while (!0) {
          var e1 = YA.div(d1),
            k1 = YA.sub(e1.mul(d1)).toInt() >>> 0,
            Q1 = k1.toString(v);
          if (YA = e1, YA.isZero()) return Q1 + bA;
          else {
            while (Q1.length < 6) Q1 = "0" + Q1;
            bA = "" + Q1 + bA
          }
        }
      }, d.getHighBits = function X1() {
        return this.high
      }, d.getHighBitsUnsigned = function X1() {
        return this.high >>> 0
      }, d.getLowBits = function X1() {
        return this.low
      }, d.getLowBitsUnsigned = function X1() {
        return this.low >>> 0
      }, d.getNumBitsAbs = function X1() {
        if (this.isNegative()) return this.eq(s) ? 64 : this.neg().getNumBitsAbs();
        var v = this.high != 0 ? this.high : this.low;
        for (var D1 = 31; D1 > 0; D1--)
          if ((v & 1 << D1) != 0) break;
        return this.high != 0 ? D1 + 33 : D1 + 1
      }, d.isSafeInteger = function X1() {
        var v = this.high >> 21;
        if (!v) return !0;
        if (this.unsigned) return !1;
        return v === -1 && !(this.low === 0 && this.high === -2097152)
      }, d.isZero = function X1() {
        return this.high === 0 && this.low === 0
      }, d.eqz = d.isZero, d.isNegative = function X1() {
        return !this.unsigned && this.high < 0
      }, d.isPositive = function X1() {
        return this.unsigned || this.high >= 0
      }, d.isOdd = function X1() {
        return (this.low & 1) === 1
      }, d.isEven = function X1() {
        return (this.low & 1) === 0
      }, d.equals = function X1(v) {
        if (!I(v)) v = V(v);
        if (this.unsigned !== v.unsigned && this.high >>> 31 === 1 && v.high >>> 31 === 1) return !1;
        return this.high === v.high && this.low === v.low
      }, d.eq = d.equals, d.notEquals = function X1(v) {
        return !this.eq(v)
      }, d.neq = d.notEquals, d.ne = d.notEquals, d.lessThan = function X1(v) {
        return this.comp(v) < 0
      }, d.lt = d.lessThan, d.lessThanOrEqual = function X1(v) {
        return this.comp(v) <= 0
      }, d.lte = d.lessThanOrEqual, d.le = d.lessThanOrEqual, d.greaterThan = function X1(v) {
        return this.comp(v) > 0
      }, d.gt = d.greaterThan, d.greaterThanOrEqual = function X1(v) {
        return this.comp(v) >= 0
      }, d.gte = d.greaterThanOrEqual, d.ge = d.greaterThanOrEqual, d.compare = function X1(v) {
        if (!I(v)) v = V(v);
        if (this.eq(v)) return 0;
        var D1 = this.isNegative(),
          N1 = v.isNegative();
        if (D1 && !N1) return -1;
        if (!D1 && N1) return 1;
        if (!this.unsigned) return this.sub(v).isNegative() ? -1 : 1;
        return v.high >>> 0 > this.high >>> 0 || v.high === this.high && v.low >>> 0 > this.low >>> 0 ? -1 : 1
      }, d.comp = d.compare, d.negate = function X1() {
        if (!this.unsigned && this.eq(s)) return s;
        return this.not().add(L)
      }, d.neg = d.negate, d.add = function X1(v) {
        if (!I(v)) v = V(v);
        var D1 = this.high >>> 16,
          N1 = this.high & 65535,
          u1 = this.low >>> 16,
          d1 = this.low & 65535,
          YA = v.high >>> 16,
          bA = v.high & 65535,
          e1 = v.low >>> 16,
          k1 = v.low & 65535,
          Q1 = 0,
          v1 = 0,
          L1 = 0,
          BA = 0;
        return BA += d1 + k1, L1 += BA >>> 16, BA &= 65535, L1 += u1 + e1, v1 += L1 >>> 16, L1 &= 65535, v1 += N1 + bA, Q1 += v1 >>> 16, v1 &= 65535, Q1 += D1 + YA, Q1 &= 65535, J(L1 << 16 | BA, Q1 << 16 | v1, this.unsigned)
      }, d.subtract = function X1(v) {
        if (!I(v)) v = V(v);
        return this.add(v.neg())
      }, d.sub = d.subtract, d.multiply = function X1(v) {
        if (this.isZero()) return this;
        if (!I(v)) v = V(v);
        if (B) {
          var D1 = B.mul(this.low, this.high, v.low, v.high);
          return J(D1, B.get_high(), this.unsigned)
        }
        if (v.isZero()) return this.unsigned ? T : R;
        if (this.eq(s)) return v.isOdd() ? s : R;
        if (v.eq(s)) return this.isOdd() ? s : R;
        if (this.isNegative())
          if (v.isNegative()) return this.neg().mul(v.neg());
          else return this.neg().mul(v).neg();
        else if (v.isNegative()) return this.mul(v.neg()).neg();
        if (this.lt(O) && v.lt(O)) return W(this.toNumber() * v.toNumber(), this.unsigned);
        var N1 = this.high >>> 16,
          u1 = this.high & 65535,
          d1 = this.low >>> 16,
          YA = this.low & 65535,
          bA = v.high >>> 16,
          e1 = v.high & 65535,
          k1 = v.low >>> 16,
          Q1 = v.low & 65535,
          v1 = 0,
          L1 = 0,
          BA = 0,
          HA = 0;
        return HA += YA * Q1, BA += HA >>> 16, HA &= 65535, BA += d1 * Q1, L1 += BA >>> 16, BA &= 65535, BA += YA * k1, L1 += BA >>> 16, BA &= 65535, L1 += u1 * Q1, v1 += L1 >>> 16, L1 &= 65535, L1 += d1 * k1, v1 += L1 >>> 16, L1 &= 65535, L1 += YA * e1, v1 += L1 >>> 16, L1 &= 65535, v1 += N1 * Q1 + u1 * k1 + d1 * e1 + YA * bA, v1 &= 65535, J(BA << 16 | HA, v1 << 16 | L1, this.unsigned)
      }, d.mul = d.multiply, d.divide = function X1(v) {
        if (!I(v)) v = V(v);
        if (v.isZero()) throw Error("division by zero");
        if (B) {
          if (!this.unsigned && this.high === -2147483648 && v.low === -1 && v.high === -1) return this;
          var D1 = (this.unsigned ? B.div_u : B.div_s)(this.low, this.high, v.low, v.high);
          return J(D1, B.get_high(), this.unsigned)
        }
        if (this.isZero()) return this.unsigned ? T : R;
        var N1, u1, d1;
        if (!this.unsigned) {
          if (this.eq(s))
            if (v.eq(L) || v.eq(k)) return s;
            else if (v.eq(s)) return L;
          else {
            var YA = this.shr(1);
            if (N1 = YA.div(v).shl(1), N1.eq(R)) return v.isNegative() ? L : k;
            else return u1 = this.sub(v.mul(N1)), d1 = N1.add(u1.div(v)), d1
          } else if (v.eq(s)) return this.unsigned ? T : R;
          if (this.isNegative()) {
            if (v.isNegative()) return this.neg().div(v.neg());
            return this.neg().div(v).neg()
          } else if (v.isNegative()) return this.div(v.neg()).neg();
          d1 = R
        } else {
          if (!v.unsigned) v = v.toUnsigned();
          if (v.gt(this)) return T;
          if (v.gt(this.shru(1))) return _;
          d1 = T
        }
        u1 = this;
        while (u1.gte(v)) {
          N1 = Math.max(1, Math.floor(u1.toNumber() / v.toNumber()));
          var bA = Math.ceil(Math.log(N1) / Math.LN2),
            e1 = bA <= 48 ? 1 : F(2, bA - 48),
            k1 = W(N1),
            Q1 = k1.mul(v);
          while (Q1.isNegative() || Q1.gt(u1)) N1 -= e1, k1 = W(N1, this.unsigned), Q1 = k1.mul(v);
          if (k1.isZero()) k1 = L;
          d1 = d1.add(k1), u1 = u1.sub(Q1)
        }
        return d1
      }, d.div = d.divide, d.modulo = function X1(v) {
        if (!I(v)) v = V(v);
        if (B) {
          var D1 = (this.unsigned ? B.rem_u : B.rem_s)(this.low, this.high, v.low, v.high);
          return J(D1, B.get_high(), this.unsigned)
        }
        return this.sub(this.div(v).mul(v))
      }, d.mod = d.modulo, d.rem = d.modulo, d.not = function X1() {
        return J(~this.low, ~this.high, this.unsigned)
      }, d.countLeadingZeros = function X1() {
        return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32
      }, d.clz = d.countLeadingZeros, d.countTrailingZeros = function X1() {
        return this.low ? G(this.low) : G(this.high) + 32
      }, d.ctz = d.countTrailingZeros, d.and = function X1(v) {
        if (!I(v)) v = V(v);
        return J(this.low & v.low, this.high & v.high, this.unsigned)
      }, d.or = function X1(v) {
        if (!I(v)) v = V(v);
        return J(this.low | v.low, this.high | v.high, this.unsigned)
      }, d.xor = function X1(v) {
        if (!I(v)) v = V(v);
        return J(this.low ^ v.low, this.high ^ v.high, this.unsigned)
      }, d.shiftLeft = function X1(v) {
        if (I(v)) v = v.toInt();
        if ((v &= 63) === 0) return this;
        else if (v < 32) return J(this.low << v, this.high << v | this.low >>> 32 - v, this.unsigned);
        else return J(0, this.low << v - 32, this.unsigned)
      }, d.shl = d.shiftLeft, d.shiftRight = function X1(v) {
        if (I(v)) v = v.toInt();
        if ((v &= 63) === 0) return this;
        else if (v < 32) return J(this.low >>> v | this.high << 32 - v, this.high >> v, this.unsigned);
        else return J(this.high >> v - 32, this.high >= 0 ? 0 : -1, this.unsigned)
      }, d.shr = d.shiftRight, d.shiftRightUnsigned = function X1(v) {
        if (I(v)) v = v.toInt();
        if ((v &= 63) === 0) return this;
        if (v < 32) return J(this.low >>> v | this.high << 32 - v, this.high >>> v, this.unsigned);
        if (v === 32) return J(this.high, 0, this.unsigned);
        return J(this.high >>> v - 32, 0, this.unsigned)
      }, d.shru = d.shiftRightUnsigned, d.shr_u = d.shiftRightUnsigned, d.rotateLeft = function X1(v) {
        var D1;
        if (I(v)) v = v.toInt();
        if ((v &= 63) === 0) return this;
        if (v === 32) return J(this.high, this.low, this.unsigned);
        if (v < 32) return D1 = 32 - v, J(this.low << v | this.high >>> D1, this.high << v | this.low >>> D1, this.unsigned);
        return v -= 32, D1 = 32 - v, J(this.high << v | this.low >>> D1, this.low << v | this.high >>> D1, this.unsigned)
      }, d.rotl = d.rotateLeft, d.rotateRight = function X1(v) {
        var D1;
        if (I(v)) v = v.toInt();
        if ((v &= 63) === 0) return this;
        if (v === 32) return J(this.high, this.low, this.unsigned);
        if (v < 32) return D1 = 32 - v, J(this.high << D1 | this.low >>> v, this.low << D1 | this.high >>> v, this.unsigned);
        return v -= 32, D1 = 32 - v, J(this.low << D1 | this.high >>> v, this.high << D1 | this.low >>> v, this.unsigned)
      }, d.rotr = d.rotateRight, d.toSigned = function X1() {
        if (!this.unsigned) return this;
        return J(this.low, this.high, !1)
      }, d.toUnsigned = function X1() {
        if (this.unsigned) return this;
        return J(this.low, this.high, !0)
      }, d.toBytes = function X1(v) {
        return v ? this.toBytesLE() : this.toBytesBE()
      }, d.toBytesLE = function X1() {
        var v = this.high,
          D1 = this.low;
        return [D1 & 255, D1 >>> 8 & 255, D1 >>> 16 & 255, D1 >>> 24, v & 255, v >>> 8 & 255, v >>> 16 & 255, v >>> 24]
      }, d.toBytesBE = function X1() {
        var v = this.high,
          D1 = this.low;
        return [v >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, D1 >>> 24, D1 >>> 16 & 255, D1 >>> 8 & 255, D1 & 255]
      }, Q.fromBytes = function X1(v, D1, N1) {
        return N1 ? Q.fromBytesLE(v, D1) : Q.fromBytesBE(v, D1)
      }, Q.fromBytesLE = function X1(v, D1) {
        return new Q(v[0] | v[1] << 8 | v[2] << 16 | v[3] << 24, v[4] | v[5] << 8 | v[6] << 16 | v[7] << 24, D1)
      }, Q.fromBytesBE = function X1(v, D1) {
        return new Q(v[4] << 24 | v[5] << 16 | v[6] << 8 | v[7], v[0] << 24 | v[1] << 16 | v[2] << 8 | v[3], D1)
      }, typeof BigInt === "function") Q.fromBigInt = function X1(v, D1) {
      var N1 = Number(BigInt.asIntN(32, v)),
        u1 = Number(BigInt.asIntN(32, v >> BigInt(32)));
      return J(N1, u1, D1)
    }, Q.fromValue = function X1(v, D1) {
      if (typeof v === "bigint") return fromBigInt(v, D1);
      return V(v, D1)
    }, d.toBigInt = function X1() {
      var v = BigInt(this.low >>> 0),
        D1 = BigInt(this.unsigned ? this.high >>> 0 : this.high);
      return D1 << BigInt(32) | v
    };
    var F1 = A.default = Q
  })
})
// @from(Start 4892909, End 4897463)
xy0 = z((yy0) => {
  Object.defineProperty(yy0, "__esModule", {
    value: !0
  });
  yy0.loadFileDescriptorSetFromObject = yy0.loadFileDescriptorSetFromBuffer = yy0.fromJSON = yy0.loadSync = yy0.load = yy0.IdempotencyLevel = yy0.isAnyExtension = yy0.Long = void 0;
  var LQ6 = Gj0(),
    Vw = RD1(),
    Nm1 = Ky0(),
    $m1 = My0(),
    RQ6 = Ly0();
  yy0.Long = RQ6;

  function OQ6(A) {
    return "@type" in A && typeof A["@type"] === "string"
  }
  yy0.isAnyExtension = OQ6;
  var Py0;
  (function(A) {
    A.IDEMPOTENCY_UNKNOWN = "IDEMPOTENCY_UNKNOWN", A.NO_SIDE_EFFECTS = "NO_SIDE_EFFECTS", A.IDEMPOTENT = "IDEMPOTENT"
  })(Py0 = yy0.IdempotencyLevel || (yy0.IdempotencyLevel = {}));
  var Sy0 = {
    longs: String,
    enums: String,
    bytes: String,
    defaults: !0,
    oneofs: !0,
    json: !0
  };

  function TQ6(A, B) {
    if (A === "") return B;
    else return A + "." + B
  }

  function PQ6(A) {
    return A instanceof Vw.Service || A instanceof Vw.Type || A instanceof Vw.Enum
  }

  function SQ6(A) {
    return A instanceof Vw.Namespace || A instanceof Vw.Root
  }

  function _y0(A, B) {
    let Q = TQ6(B, A.name);
    if (PQ6(A)) return [
      [Q, A]
    ];
    else if (SQ6(A) && typeof A.nested !== "undefined") return Object.keys(A.nested).map((I) => {
      return _y0(A.nested[I], Q)
    }).reduce((I, G) => I.concat(G), []);
    return []
  }

  function Ry0(A, B) {
    return function Q(I) {
      return A.toObject(A.decode(I), B)
    }
  }

  function Oy0(A) {
    return function B(Q) {
      if (Array.isArray(Q)) throw new Error(`Failed to serialize message: expected object with ${A.name} structure, got array instead`);
      let I = A.fromObject(Q);
      return A.encode(I).finish()
    }
  }

  function _Q6(A) {
    return (A || []).reduce((B, Q) => {
      for (let [I, G] of Object.entries(Q)) switch (I) {
        case "uninterpreted_option":
          B.uninterpreted_option.push(Q.uninterpreted_option);
          break;
        default:
          B[I] = G
      }
      return B
    }, {
      deprecated: !1,
      idempotency_level: Py0.IDEMPOTENCY_UNKNOWN,
      uninterpreted_option: []
    })
  }

  function jQ6(A, B, Q, I) {
    let {
      resolvedRequestType: G,
      resolvedResponseType: Z
    } = A;
    return {
      path: "/" + B + "/" + A.name,
      requestStream: !!A.requestStream,
      responseStream: !!A.responseStream,
      requestSerialize: Oy0(G),
      requestDeserialize: Ry0(G, Q),
      responseSerialize: Oy0(Z),
      responseDeserialize: Ry0(Z, Q),
      originalName: LQ6(A.name),
      requestType: Um1(G, I),
      responseType: Um1(Z, I),
      options: _Q6(A.parsedOptions)
    }
  }

  function yQ6(A, B, Q, I) {
    let G = {};
    for (let Z of A.methodsArray) G[Z.name] = jQ6(Z, B, Q, I);
    return G
  }

  function Um1(A, B) {
    let Q = A.toDescriptor("proto3");
    return {
      format: "Protocol Buffer 3 DescriptorProto",
      type: Q.$type.toObject(Q, Sy0),
      fileDescriptorProtos: B
    }
  }

  function kQ6(A, B) {
    let Q = A.toDescriptor("proto3");
    return {
      format: "Protocol Buffer 3 EnumDescriptorProto",
      type: Q.$type.toObject(Q, Sy0),
      fileDescriptorProtos: B
    }
  }

  function xQ6(A, B, Q, I) {
    if (A instanceof Vw.Service) return yQ6(A, B, Q, I);
    else if (A instanceof Vw.Type) return Um1(A, I);
    else if (A instanceof Vw.Enum) return kQ6(A, I);
    else throw new Error("Type mismatch in reflection object handling")
  }

  function PD1(A, B) {
    let Q = {};
    A.resolveAll();
    let G = A.toDescriptor("proto3").file.map((Z) => Buffer.from(Nm1.FileDescriptorProto.encode(Z).finish()));
    for (let [Z, D] of _y0(A, "")) Q[Z] = xQ6(D, Z, B, G);
    return Q
  }

  function jy0(A, B) {
    B = B || {};
    let Q = Vw.Root.fromDescriptor(A);
    return Q.resolveAll(), PD1(Q, B)
  }

  function fQ6(A, B) {
    return $m1.loadProtosWithOptions(A, B).then((Q) => {
      return PD1(Q, B)
    })
  }
  yy0.load = fQ6;

  function vQ6(A, B) {
    let Q = $m1.loadProtosWithOptionsSync(A, B);
    return PD1(Q, B)
  }
  yy0.loadSync = vQ6;

  function bQ6(A, B) {
    B = B || {};
    let Q = Vw.Root.fromJSON(A);
    return Q.resolveAll(), PD1(Q, B)
  }
  yy0.fromJSON = bQ6;

  function gQ6(A, B) {
    let Q = Nm1.FileDescriptorSet.decode(A);
    return jy0(Q, B)
  }
  yy0.loadFileDescriptorSetFromBuffer = gQ6;

  function hQ6(A, B) {
    let Q = Nm1.FileDescriptorSet.fromObject(A);
    return jy0(Q, B)
  }
  yy0.loadFileDescriptorSetFromObject = hQ6;
  $m1.addCommonProtos()
})