
// @from(Start 6845488, End 6881616)
xs1 = z((PW2, ZC1) => {
  (function(A) {
    var B, Q = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      I = Math.ceil,
      G = Math.floor,
      Z = "[BigNumber Error] ",
      D = Z + "Number primitive has more than 15 significant digits: ",
      Y = 100000000000000,
      W = 14,
      J = 9007199254740991,
      F = [1, 10, 100, 1000, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 10000000000, 100000000000, 1000000000000, 10000000000000],
      X = 1e7,
      V = 1e9;

    function C(L) {
      var _, k, i, x = Q1.prototype = {
          constructor: Q1,
          toString: null,
          valueOf: null
        },
        s = new Q1(1),
        d = 20,
        F1 = 4,
        X1 = -7,
        v = 21,
        D1 = -1e7,
        N1 = 1e7,
        u1 = !1,
        d1 = 1,
        YA = 0,
        bA = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          suffix: ""
        },
        e1 = "0123456789abcdefghijklmnopqrstuvwxyz",
        k1 = !0;

      function Q1(t, B1) {
        var W1, w1, P1, e, y1, O1, h1, o1, QA = this;
        if (!(QA instanceof Q1)) return new Q1(t, B1);
        if (B1 == null) {
          if (t && t._isBigNumber === !0) {
            if (QA.s = t.s, !t.c || t.e > N1) QA.c = QA.e = null;
            else if (t.e < D1) QA.c = [QA.e = 0];
            else QA.e = t.e, QA.c = t.c.slice();
            return
          }
          if ((O1 = typeof t == "number") && t * 0 == 0) {
            if (QA.s = 1 / t < 0 ? (t = -t, -1) : 1, t === ~~t) {
              for (e = 0, y1 = t; y1 >= 10; y1 /= 10, e++);
              if (e > N1) QA.c = QA.e = null;
              else QA.e = e, QA.c = [t];
              return
            }
            o1 = String(t)
          } else {
            if (!Q.test(o1 = String(t))) return i(QA, o1, O1);
            QA.s = o1.charCodeAt(0) == 45 ? (o1 = o1.slice(1), -1) : 1
          }
          if ((e = o1.indexOf(".")) > -1) o1 = o1.replace(".", "");
          if ((y1 = o1.search(/e/i)) > 0) {
            if (e < 0) e = y1;
            e += +o1.slice(y1 + 1), o1 = o1.substring(0, y1)
          } else if (e < 0) e = o1.length
        } else {
          if (q(B1, 2, e1.length, "Base"), B1 == 10 && k1) return QA = new Q1(t), HA(QA, d + QA.e + 1, F1);
          if (o1 = String(t), O1 = typeof t == "number") {
            if (t * 0 != 0) return i(QA, o1, O1, B1);
            if (QA.s = 1 / t < 0 ? (o1 = o1.slice(1), -1) : 1, Q1.DEBUG && o1.replace(/^0\.0*|\./, "").length > 15) throw Error(D + t)
          } else QA.s = o1.charCodeAt(0) === 45 ? (o1 = o1.slice(1), -1) : 1;
          W1 = e1.slice(0, B1), e = y1 = 0;
          for (h1 = o1.length; y1 < h1; y1++)
            if (W1.indexOf(w1 = o1.charAt(y1)) < 0) {
              if (w1 == ".") {
                if (y1 > e) {
                  e = h1;
                  continue
                }
              } else if (!P1) {
                if (o1 == o1.toUpperCase() && (o1 = o1.toLowerCase()) || o1 == o1.toLowerCase() && (o1 = o1.toUpperCase())) {
                  P1 = !0, y1 = -1, e = 0;
                  continue
                }
              }
              return i(QA, String(t), O1, B1)
            } if (O1 = !1, o1 = k(o1, B1, 10, QA.s), (e = o1.indexOf(".")) > -1) o1 = o1.replace(".", "");
          else e = o1.length
        }
        for (y1 = 0; o1.charCodeAt(y1) === 48; y1++);
        for (h1 = o1.length; o1.charCodeAt(--h1) === 48;);
        if (o1 = o1.slice(y1, ++h1)) {
          if (h1 -= y1, O1 && Q1.DEBUG && h1 > 15 && (t > J || t !== G(t))) throw Error(D + QA.s * t);
          if ((e = e - y1 - 1) > N1) QA.c = QA.e = null;
          else if (e < D1) QA.c = [QA.e = 0];
          else {
            if (QA.e = e, QA.c = [], y1 = (e + 1) % W, e < 0) y1 += W;
            if (y1 < h1) {
              if (y1) QA.c.push(+o1.slice(0, y1));
              for (h1 -= W; y1 < h1;) QA.c.push(+o1.slice(y1, y1 += W));
              y1 = W - (o1 = o1.slice(y1)).length
            } else y1 -= h1;
            for (; y1--; o1 += "0");
            QA.c.push(+o1)
          }
        } else QA.c = [QA.e = 0]
      }
      Q1.clone = C, Q1.ROUND_UP = 0, Q1.ROUND_DOWN = 1, Q1.ROUND_CEIL = 2, Q1.ROUND_FLOOR = 3, Q1.ROUND_HALF_UP = 4, Q1.ROUND_HALF_DOWN = 5, Q1.ROUND_HALF_EVEN = 6, Q1.ROUND_HALF_CEIL = 7, Q1.ROUND_HALF_FLOOR = 8, Q1.EUCLID = 9, Q1.config = Q1.set = function(t) {
        var B1, W1;
        if (t != null)
          if (typeof t == "object") {
            if (t.hasOwnProperty(B1 = "DECIMAL_PLACES")) W1 = t[B1], q(W1, 0, V, B1), d = W1;
            if (t.hasOwnProperty(B1 = "ROUNDING_MODE")) W1 = t[B1], q(W1, 0, 8, B1), F1 = W1;
            if (t.hasOwnProperty(B1 = "EXPONENTIAL_AT"))
              if (W1 = t[B1], W1 && W1.pop) q(W1[0], -V, 0, B1), q(W1[1], 0, V, B1), X1 = W1[0], v = W1[1];
              else q(W1, -V, V, B1), X1 = -(v = W1 < 0 ? -W1 : W1);
            if (t.hasOwnProperty(B1 = "RANGE"))
              if (W1 = t[B1], W1 && W1.pop) q(W1[0], -V, -1, B1), q(W1[1], 1, V, B1), D1 = W1[0], N1 = W1[1];
              else if (q(W1, -V, V, B1), W1) D1 = -(N1 = W1 < 0 ? -W1 : W1);
            else throw Error(Z + B1 + " cannot be zero: " + W1);
            if (t.hasOwnProperty(B1 = "CRYPTO"))
              if (W1 = t[B1], W1 === !!W1)
                if (W1)
                  if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) u1 = W1;
                  else throw u1 = !W1, Error(Z + "crypto unavailable");
            else u1 = W1;
            else throw Error(Z + B1 + " not true or false: " + W1);
            if (t.hasOwnProperty(B1 = "MODULO_MODE")) W1 = t[B1], q(W1, 0, 9, B1), d1 = W1;
            if (t.hasOwnProperty(B1 = "POW_PRECISION")) W1 = t[B1], q(W1, 0, V, B1), YA = W1;
            if (t.hasOwnProperty(B1 = "FORMAT"))
              if (W1 = t[B1], typeof W1 == "object") bA = W1;
              else throw Error(Z + B1 + " not an object: " + W1);
            if (t.hasOwnProperty(B1 = "ALPHABET"))
              if (W1 = t[B1], typeof W1 == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(W1)) k1 = W1.slice(0, 10) == "0123456789", e1 = W1;
              else throw Error(Z + B1 + " invalid: " + W1)
          } else throw Error(Z + "Object expected: " + t);
        return {
          DECIMAL_PLACES: d,
          ROUNDING_MODE: F1,
          EXPONENTIAL_AT: [X1, v],
          RANGE: [D1, N1],
          CRYPTO: u1,
          MODULO_MODE: d1,
          POW_PRECISION: YA,
          FORMAT: bA,
          ALPHABET: e1
        }
      }, Q1.isBigNumber = function(t) {
        if (!t || t._isBigNumber !== !0) return !1;
        if (!Q1.DEBUG) return !0;
        var B1, W1, w1 = t.c,
          P1 = t.e,
          e = t.s;
        A: if ({}.toString.call(w1) == "[object Array]") {
          if ((e === 1 || e === -1) && P1 >= -V && P1 <= V && P1 === G(P1)) {
            if (w1[0] === 0) {
              if (P1 === 0 && w1.length === 1) return !0;
              break A
            }
            if (B1 = (P1 + 1) % W, B1 < 1) B1 += W;
            if (String(w1[0]).length == B1) {
              for (B1 = 0; B1 < w1.length; B1++)
                if (W1 = w1[B1], W1 < 0 || W1 >= Y || W1 !== G(W1)) break A;
              if (W1 !== 0) return !0
            }
          }
        } else if (w1 === null && P1 === null && (e === null || e === 1 || e === -1)) return !0;
        throw Error(Z + "Invalid BigNumber: " + t)
      }, Q1.maximum = Q1.max = function() {
        return L1(arguments, -1)
      }, Q1.minimum = Q1.min = function() {
        return L1(arguments, 1)
      }, Q1.random = function() {
        var t = 9007199254740992,
          B1 = Math.random() * t & 2097151 ? function() {
            return G(Math.random() * t)
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0)
          };
        return function(W1) {
          var w1, P1, e, y1, O1, h1 = 0,
            o1 = [],
            QA = new Q1(s);
          if (W1 == null) W1 = d;
          else q(W1, 0, V);
          if (y1 = I(W1 / W), u1)
            if (crypto.getRandomValues) {
              w1 = crypto.getRandomValues(new Uint32Array(y1 *= 2));
              for (; h1 < y1;)
                if (O1 = w1[h1] * 131072 + (w1[h1 + 1] >>> 11), O1 >= 9000000000000000) P1 = crypto.getRandomValues(new Uint32Array(2)), w1[h1] = P1[0], w1[h1 + 1] = P1[1];
                else o1.push(O1 % 100000000000000), h1 += 2;
              h1 = y1 / 2
            } else if (crypto.randomBytes) {
            w1 = crypto.randomBytes(y1 *= 7);
            for (; h1 < y1;)
              if (O1 = (w1[h1] & 31) * 281474976710656 + w1[h1 + 1] * 1099511627776 + w1[h1 + 2] * 4294967296 + w1[h1 + 3] * 16777216 + (w1[h1 + 4] << 16) + (w1[h1 + 5] << 8) + w1[h1 + 6], O1 >= 9000000000000000) crypto.randomBytes(7).copy(w1, h1);
              else o1.push(O1 % 100000000000000), h1 += 7;
            h1 = y1 / 7
          } else throw u1 = !1, Error(Z + "crypto unavailable");
          if (!u1) {
            for (; h1 < y1;)
              if (O1 = B1(), O1 < 9000000000000000) o1[h1++] = O1 % 100000000000000
          }
          if (y1 = o1[--h1], W1 %= W, y1 && W1) O1 = F[W - W1], o1[h1] = G(y1 / O1) * O1;
          for (; o1[h1] === 0; o1.pop(), h1--);
          if (h1 < 0) o1 = [e = 0];
          else {
            for (e = -1; o1[0] === 0; o1.splice(0, 1), e -= W);
            for (h1 = 1, O1 = o1[0]; O1 >= 10; O1 /= 10, h1++);
            if (h1 < W) e -= W - h1
          }
          return QA.e = e, QA.c = o1, QA
        }
      }(), Q1.sum = function() {
        var t = 1,
          B1 = arguments,
          W1 = new Q1(B1[0]);
        for (; t < B1.length;) W1 = W1.plus(B1[t++]);
        return W1
      }, k = function() {
        var t = "0123456789";

        function B1(W1, w1, P1, e) {
          var y1, O1 = [0],
            h1, o1 = 0,
            QA = W1.length;
          for (; o1 < QA;) {
            for (h1 = O1.length; h1--; O1[h1] *= w1);
            O1[0] += e.indexOf(W1.charAt(o1++));
            for (y1 = 0; y1 < O1.length; y1++)
              if (O1[y1] > P1 - 1) {
                if (O1[y1 + 1] == null) O1[y1 + 1] = 0;
                O1[y1 + 1] += O1[y1] / P1 | 0, O1[y1] %= P1
              }
          }
          return O1.reverse()
        }
        return function(W1, w1, P1, e, y1) {
          var O1, h1, o1, QA, zA, Y0, fA, H0, k2 = W1.indexOf("."),
            s0 = d,
            q2 = F1;
          if (k2 >= 0) QA = YA, YA = 0, W1 = W1.replace(".", ""), H0 = new Q1(w1), Y0 = H0.pow(W1.length - k2), YA = QA, H0.c = B1(T(E(Y0.c), Y0.e, "0"), 10, P1, t), H0.e = H0.c.length;
          fA = B1(W1, w1, P1, y1 ? (O1 = e1, t) : (O1 = t, e1)), o1 = QA = fA.length;
          for (; fA[--QA] == 0; fA.pop());
          if (!fA[0]) return O1.charAt(0);
          if (k2 < 0) --o1;
          else Y0.c = fA, Y0.e = o1, Y0.s = e, Y0 = _(Y0, H0, s0, q2, P1), fA = Y0.c, zA = Y0.r, o1 = Y0.e;
          if (h1 = o1 + s0 + 1, k2 = fA[h1], QA = P1 / 2, zA = zA || h1 < 0 || fA[h1 + 1] != null, zA = q2 < 4 ? (k2 != null || zA) && (q2 == 0 || q2 == (Y0.s < 0 ? 3 : 2)) : k2 > QA || k2 == QA && (q2 == 4 || zA || q2 == 6 && fA[h1 - 1] & 1 || q2 == (Y0.s < 0 ? 8 : 7)), h1 < 1 || !fA[0]) W1 = zA ? T(O1.charAt(1), -s0, O1.charAt(0)) : O1.charAt(0);
          else {
            if (fA.length = h1, zA) {
              for (--P1; ++fA[--h1] > P1;)
                if (fA[h1] = 0, !h1) ++o1, fA = [1].concat(fA)
            }
            for (QA = fA.length; !fA[--QA];);
            for (k2 = 0, W1 = ""; k2 <= QA; W1 += O1.charAt(fA[k2++]));
            W1 = T(W1, o1, O1.charAt(0))
          }
          return W1
        }
      }(), _ = function() {
        function t(w1, P1, e) {
          var y1, O1, h1, o1, QA = 0,
            zA = w1.length,
            Y0 = P1 % X,
            fA = P1 / X | 0;
          for (w1 = w1.slice(); zA--;) h1 = w1[zA] % X, o1 = w1[zA] / X | 0, y1 = fA * h1 + o1 * Y0, O1 = Y0 * h1 + y1 % X * X + QA, QA = (O1 / e | 0) + (y1 / X | 0) + fA * o1, w1[zA] = O1 % e;
          if (QA) w1 = [QA].concat(w1);
          return w1
        }

        function B1(w1, P1, e, y1) {
          var O1, h1;
          if (e != y1) h1 = e > y1 ? 1 : -1;
          else
            for (O1 = h1 = 0; O1 < e; O1++)
              if (w1[O1] != P1[O1]) {
                h1 = w1[O1] > P1[O1] ? 1 : -1;
                break
              } return h1
        }

        function W1(w1, P1, e, y1) {
          var O1 = 0;
          for (; e--;) w1[e] -= O1, O1 = w1[e] < P1[e] ? 1 : 0, w1[e] = O1 * y1 + w1[e] - P1[e];
          for (; !w1[0] && w1.length > 1; w1.splice(0, 1));
        }
        return function(w1, P1, e, y1, O1) {
          var h1, o1, QA, zA, Y0, fA, H0, k2, s0, q2, h2, j9, w6, E0, g0, y0, T0, V0 = w1.s == P1.s ? 1 : -1,
            N2 = w1.c,
            h9 = P1.c;
          if (!N2 || !N2[0] || !h9 || !h9[0]) return new Q1(!w1.s || !P1.s || (N2 ? h9 && N2[0] == h9[0] : !h9) ? NaN : N2 && N2[0] == 0 || !h9 ? V0 * 0 : V0 / 0);
          if (k2 = new Q1(V0), s0 = k2.c = [], o1 = w1.e - P1.e, V0 = e + o1 + 1, !O1) O1 = Y, o1 = K(w1.e / W) - K(P1.e / W), V0 = V0 / W | 0;
          for (QA = 0; h9[QA] == (N2[QA] || 0); QA++);
          if (h9[QA] > (N2[QA] || 0)) o1--;
          if (V0 < 0) s0.push(1), zA = !0;
          else {
            if (E0 = N2.length, y0 = h9.length, QA = 0, V0 += 2, Y0 = G(O1 / (h9[0] + 1)), Y0 > 1) h9 = t(h9, Y0, O1), N2 = t(N2, Y0, O1), y0 = h9.length, E0 = N2.length;
            w6 = y0, q2 = N2.slice(0, y0), h2 = q2.length;
            for (; h2 < y0; q2[h2++] = 0);
            if (T0 = h9.slice(), T0 = [0].concat(T0), g0 = h9[0], h9[1] >= O1 / 2) g0++;
            do {
              if (Y0 = 0, h1 = B1(h9, q2, y0, h2), h1 < 0) {
                if (j9 = q2[0], y0 != h2) j9 = j9 * O1 + (q2[1] || 0);
                if (Y0 = G(j9 / g0), Y0 > 1) {
                  if (Y0 >= O1) Y0 = O1 - 1;
                  fA = t(h9, Y0, O1), H0 = fA.length, h2 = q2.length;
                  while (B1(fA, q2, H0, h2) == 1) Y0--, W1(fA, y0 < H0 ? T0 : h9, H0, O1), H0 = fA.length, h1 = 1
                } else {
                  if (Y0 == 0) h1 = Y0 = 1;
                  fA = h9.slice(), H0 = fA.length
                }
                if (H0 < h2) fA = [0].concat(fA);
                if (W1(q2, fA, h2, O1), h2 = q2.length, h1 == -1)
                  while (B1(h9, q2, y0, h2) < 1) Y0++, W1(q2, y0 < h2 ? T0 : h9, h2, O1), h2 = q2.length
              } else if (h1 === 0) Y0++, q2 = [0];
              if (s0[QA++] = Y0, q2[0]) q2[h2++] = N2[w6] || 0;
              else q2 = [N2[w6]], h2 = 1
            } while ((w6++ < E0 || q2[0] != null) && V0--);
            if (zA = q2[0] != null, !s0[0]) s0.splice(0, 1)
          }
          if (O1 == Y) {
            for (QA = 1, V0 = s0[0]; V0 >= 10; V0 /= 10, QA++);
            HA(k2, e + (k2.e = QA + o1 * W - 1) + 1, y1, zA)
          } else k2.e = o1, k2.r = +zA;
          return k2
        }
      }();

      function v1(t, B1, W1, w1) {
        var P1, e, y1, O1, h1;
        if (W1 == null) W1 = F1;
        else q(W1, 0, 8);
        if (!t.c) return t.toString();
        if (P1 = t.c[0], y1 = t.e, B1 == null) h1 = E(t.c), h1 = w1 == 1 || w1 == 2 && (y1 <= X1 || y1 >= v) ? R(h1, y1) : T(h1, y1, "0");
        else if (t = HA(new Q1(t), B1, W1), e = t.e, h1 = E(t.c), O1 = h1.length, w1 == 1 || w1 == 2 && (B1 <= e || e <= X1)) {
          for (; O1 < B1; h1 += "0", O1++);
          h1 = R(h1, e)
        } else if (B1 -= y1, h1 = T(h1, e, "0"), e + 1 > O1) {
          if (--B1 > 0)
            for (h1 += "."; B1--; h1 += "0");
        } else if (B1 += e - O1, B1 > 0) {
          if (e + 1 == O1) h1 += ".";
          for (; B1--; h1 += "0");
        }
        return t.s < 0 && P1 ? "-" + h1 : h1
      }

      function L1(t, B1) {
        var W1, w1, P1 = 1,
          e = new Q1(t[0]);
        for (; P1 < t.length; P1++)
          if (w1 = new Q1(t[P1]), !w1.s || (W1 = N(e, w1)) === B1 || W1 === 0 && e.s === B1) e = w1;
        return e
      }

      function BA(t, B1, W1) {
        var w1 = 1,
          P1 = B1.length;
        for (; !B1[--P1]; B1.pop());
        for (P1 = B1[0]; P1 >= 10; P1 /= 10, w1++);
        if ((W1 = w1 + W1 * W - 1) > N1) t.c = t.e = null;
        else if (W1 < D1) t.c = [t.e = 0];
        else t.e = W1, t.c = B1;
        return t
      }
      i = function() {
        var t = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          B1 = /^([^.]+)\.$/,
          W1 = /^\.([^.]+)$/,
          w1 = /^-?(Infinity|NaN)$/,
          P1 = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
        return function(e, y1, O1, h1) {
          var o1, QA = O1 ? y1 : y1.replace(P1, "");
          if (w1.test(QA)) e.s = isNaN(QA) ? null : QA < 0 ? -1 : 1;
          else {
            if (!O1) {
              if (QA = QA.replace(t, function(zA, Y0, fA) {
                  return o1 = (fA = fA.toLowerCase()) == "x" ? 16 : fA == "b" ? 2 : 8, !h1 || h1 == o1 ? Y0 : zA
                }), h1) o1 = h1, QA = QA.replace(B1, "$1").replace(W1, "0.$1");
              if (y1 != QA) return new Q1(QA, o1)
            }
            if (Q1.DEBUG) throw Error(Z + "Not a" + (h1 ? " base " + h1 : "") + " number: " + y1);
            e.s = null
          }
          e.c = e.e = null
        }
      }();

      function HA(t, B1, W1, w1) {
        var P1, e, y1, O1, h1, o1, QA, zA = t.c,
          Y0 = F;
        if (zA) {
          A: {
            for (P1 = 1, O1 = zA[0]; O1 >= 10; O1 /= 10, P1++);
            if (e = B1 - P1, e < 0) e += W,
            y1 = B1,
            h1 = zA[o1 = 0],
            QA = G(h1 / Y0[P1 - y1 - 1] % 10);
            else if (o1 = I((e + 1) / W), o1 >= zA.length)
              if (w1) {
                for (; zA.length <= o1; zA.push(0));
                h1 = QA = 0, P1 = 1, e %= W, y1 = e - W + 1
              } else break A;
            else {
              h1 = O1 = zA[o1];
              for (P1 = 1; O1 >= 10; O1 /= 10, P1++);
              e %= W, y1 = e - W + P1, QA = y1 < 0 ? 0 : G(h1 / Y0[P1 - y1 - 1] % 10)
            }
            if (w1 = w1 || B1 < 0 || zA[o1 + 1] != null || (y1 < 0 ? h1 : h1 % Y0[P1 - y1 - 1]), w1 = W1 < 4 ? (QA || w1) && (W1 == 0 || W1 == (t.s < 0 ? 3 : 2)) : QA > 5 || QA == 5 && (W1 == 4 || w1 || W1 == 6 && (e > 0 ? y1 > 0 ? h1 / Y0[P1 - y1] : 0 : zA[o1 - 1]) % 10 & 1 || W1 == (t.s < 0 ? 8 : 7)), B1 < 1 || !zA[0]) {
              if (zA.length = 0, w1) B1 -= t.e + 1, zA[0] = Y0[(W - B1 % W) % W], t.e = -B1 || 0;
              else zA[0] = t.e = 0;
              return t
            }
            if (e == 0) zA.length = o1,
            O1 = 1,
            o1--;
            else zA.length = o1 + 1,
            O1 = Y0[W - e],
            zA[o1] = y1 > 0 ? G(h1 / Y0[P1 - y1] % Y0[y1]) * O1 : 0;
            if (w1)
              for (;;)
                if (o1 == 0) {
                  for (e = 1, y1 = zA[0]; y1 >= 10; y1 /= 10, e++);
                  y1 = zA[0] += O1;
                  for (O1 = 1; y1 >= 10; y1 /= 10, O1++);
                  if (e != O1) {
                    if (t.e++, zA[0] == Y) zA[0] = 1
                  }
                  break
                } else {
                  if (zA[o1] += O1, zA[o1] != Y) break;
                  zA[o1--] = 0, O1 = 1
                } for (e = zA.length; zA[--e] === 0; zA.pop());
          }
          if (t.e > N1) t.c = t.e = null;
          else if (t.e < D1) t.c = [t.e = 0]
        }
        return t
      }

      function MA(t) {
        var B1, W1 = t.e;
        if (W1 === null) return t.toString();
        return B1 = E(t.c), B1 = W1 <= X1 || W1 >= v ? R(B1, W1) : T(B1, W1, "0"), t.s < 0 ? "-" + B1 : B1
      }
      if (x.absoluteValue = x.abs = function() {
          var t = new Q1(this);
          if (t.s < 0) t.s = 1;
          return t
        }, x.comparedTo = function(t, B1) {
          return N(this, new Q1(t, B1))
        }, x.decimalPlaces = x.dp = function(t, B1) {
          var W1, w1, P1, e = this;
          if (t != null) {
            if (q(t, 0, V), B1 == null) B1 = F1;
            else q(B1, 0, 8);
            return HA(new Q1(e), t + e.e + 1, B1)
          }
          if (!(W1 = e.c)) return null;
          if (w1 = ((P1 = W1.length - 1) - K(this.e / W)) * W, P1 = W1[P1])
            for (; P1 % 10 == 0; P1 /= 10, w1--);
          if (w1 < 0) w1 = 0;
          return w1
        }, x.dividedBy = x.div = function(t, B1) {
          return _(this, new Q1(t, B1), d, F1)
        }, x.dividedToIntegerBy = x.idiv = function(t, B1) {
          return _(this, new Q1(t, B1), 0, 1)
        }, x.exponentiatedBy = x.pow = function(t, B1) {
          var W1, w1, P1, e, y1, O1, h1, o1, QA, zA = this;
          if (t = new Q1(t), t.c && !t.isInteger()) throw Error(Z + "Exponent not an integer: " + MA(t));
          if (B1 != null) B1 = new Q1(B1);
          if (O1 = t.e > 14, !zA.c || !zA.c[0] || zA.c[0] == 1 && !zA.e && zA.c.length == 1 || !t.c || !t.c[0]) return QA = new Q1(Math.pow(+MA(zA), O1 ? t.s * (2 - O(t)) : +MA(t))), B1 ? QA.mod(B1) : QA;
          if (h1 = t.s < 0, B1) {
            if (B1.c ? !B1.c[0] : !B1.s) return new Q1(NaN);
            if (w1 = !h1 && zA.isInteger() && B1.isInteger(), w1) zA = zA.mod(B1)
          } else if (t.e > 9 && (zA.e > 0 || zA.e < -1 || (zA.e == 0 ? zA.c[0] > 1 || O1 && zA.c[1] >= 240000000 : zA.c[0] < 80000000000000 || O1 && zA.c[0] <= 99999750000000))) {
            if (e = zA.s < 0 && O(t) ? -0 : 0, zA.e > -1) e = 1 / e;
            return new Q1(h1 ? 1 / e : e)
          } else if (YA) e = I(YA / W + 2);
          if (O1) {
            if (W1 = new Q1(0.5), h1) t.s = 1;
            o1 = O(t)
          } else P1 = Math.abs(+MA(t)), o1 = P1 % 2;
          QA = new Q1(s);
          for (;;) {
            if (o1) {
              if (QA = QA.times(zA), !QA.c) break;
              if (e) {
                if (QA.c.length > e) QA.c.length = e
              } else if (w1) QA = QA.mod(B1)
            }
            if (P1) {
              if (P1 = G(P1 / 2), P1 === 0) break;
              o1 = P1 % 2
            } else if (t = t.times(W1), HA(t, t.e + 1, 1), t.e > 14) o1 = O(t);
            else {
              if (P1 = +MA(t), P1 === 0) break;
              o1 = P1 % 2
            }
            if (zA = zA.times(zA), e) {
              if (zA.c && zA.c.length > e) zA.c.length = e
            } else if (w1) zA = zA.mod(B1)
          }
          if (w1) return QA;
          if (h1) QA = s.div(QA);
          return B1 ? QA.mod(B1) : e ? HA(QA, YA, F1, y1) : QA
        }, x.integerValue = function(t) {
          var B1 = new Q1(this);
          if (t == null) t = F1;
          else q(t, 0, 8);
          return HA(B1, B1.e + 1, t)
        }, x.isEqualTo = x.eq = function(t, B1) {
          return N(this, new Q1(t, B1)) === 0
        }, x.isFinite = function() {
          return !!this.c
        }, x.isGreaterThan = x.gt = function(t, B1) {
          return N(this, new Q1(t, B1)) > 0
        }, x.isGreaterThanOrEqualTo = x.gte = function(t, B1) {
          return (B1 = N(this, new Q1(t, B1))) === 1 || B1 === 0
        }, x.isInteger = function() {
          return !!this.c && K(this.e / W) > this.c.length - 2
        }, x.isLessThan = x.lt = function(t, B1) {
          return N(this, new Q1(t, B1)) < 0
        }, x.isLessThanOrEqualTo = x.lte = function(t, B1) {
          return (B1 = N(this, new Q1(t, B1))) === -1 || B1 === 0
        }, x.isNaN = function() {
          return !this.s
        }, x.isNegative = function() {
          return this.s < 0
        }, x.isPositive = function() {
          return this.s > 0
        }, x.isZero = function() {
          return !!this.c && this.c[0] == 0
        }, x.minus = function(t, B1) {
          var W1, w1, P1, e, y1 = this,
            O1 = y1.s;
          if (t = new Q1(t, B1), B1 = t.s, !O1 || !B1) return new Q1(NaN);
          if (O1 != B1) return t.s = -B1, y1.plus(t);
          var h1 = y1.e / W,
            o1 = t.e / W,
            QA = y1.c,
            zA = t.c;
          if (!h1 || !o1) {
            if (!QA || !zA) return QA ? (t.s = -B1, t) : new Q1(zA ? y1 : NaN);
            if (!QA[0] || !zA[0]) return zA[0] ? (t.s = -B1, t) : new Q1(QA[0] ? y1 : F1 == 3 ? -0 : 0)
          }
          if (h1 = K(h1), o1 = K(o1), QA = QA.slice(), O1 = h1 - o1) {
            if (e = O1 < 0) O1 = -O1, P1 = QA;
            else o1 = h1, P1 = zA;
            P1.reverse();
            for (B1 = O1; B1--; P1.push(0));
            P1.reverse()
          } else {
            w1 = (e = (O1 = QA.length) < (B1 = zA.length)) ? O1 : B1;
            for (O1 = B1 = 0; B1 < w1; B1++)
              if (QA[B1] != zA[B1]) {
                e = QA[B1] < zA[B1];
                break
              }
          }
          if (e) P1 = QA, QA = zA, zA = P1, t.s = -t.s;
          if (B1 = (w1 = zA.length) - (W1 = QA.length), B1 > 0)
            for (; B1--; QA[W1++] = 0);
          B1 = Y - 1;
          for (; w1 > O1;) {
            if (QA[--w1] < zA[w1]) {
              for (W1 = w1; W1 && !QA[--W1]; QA[W1] = B1);
              --QA[W1], QA[w1] += Y
            }
            QA[w1] -= zA[w1]
          }
          for (; QA[0] == 0; QA.splice(0, 1), --o1);
          if (!QA[0]) return t.s = F1 == 3 ? -1 : 1, t.c = [t.e = 0], t;
          return BA(t, QA, o1)
        }, x.modulo = x.mod = function(t, B1) {
          var W1, w1, P1 = this;
          if (t = new Q1(t, B1), !P1.c || !t.s || t.c && !t.c[0]) return new Q1(NaN);
          else if (!t.c || P1.c && !P1.c[0]) return new Q1(P1);
          if (d1 == 9) w1 = t.s, t.s = 1, W1 = _(P1, t, 0, 3), t.s = w1, W1.s *= w1;
          else W1 = _(P1, t, 0, d1);
          if (t = P1.minus(W1.times(t)), !t.c[0] && d1 == 1) t.s = P1.s;
          return t
        }, x.multipliedBy = x.times = function(t, B1) {
          var W1, w1, P1, e, y1, O1, h1, o1, QA, zA, Y0, fA, H0, k2, s0, q2 = this,
            h2 = q2.c,
            j9 = (t = new Q1(t, B1)).c;
          if (!h2 || !j9 || !h2[0] || !j9[0]) {
            if (!q2.s || !t.s || h2 && !h2[0] && !j9 || j9 && !j9[0] && !h2) t.c = t.e = t.s = null;
            else if (t.s *= q2.s, !h2 || !j9) t.c = t.e = null;
            else t.c = [0], t.e = 0;
            return t
          }
          if (w1 = K(q2.e / W) + K(t.e / W), t.s *= q2.s, h1 = h2.length, zA = j9.length, h1 < zA) H0 = h2, h2 = j9, j9 = H0, P1 = h1, h1 = zA, zA = P1;
          for (P1 = h1 + zA, H0 = []; P1--; H0.push(0));
          k2 = Y, s0 = X;
          for (P1 = zA; --P1 >= 0;) {
            W1 = 0, Y0 = j9[P1] % s0, fA = j9[P1] / s0 | 0;
            for (y1 = h1, e = P1 + y1; e > P1;) o1 = h2[--y1] % s0, QA = h2[y1] / s0 | 0, O1 = fA * o1 + QA * Y0, o1 = Y0 * o1 + O1 % s0 * s0 + H0[e] + W1, W1 = (o1 / k2 | 0) + (O1 / s0 | 0) + fA * QA, H0[e--] = o1 % k2;
            H0[e] = W1
          }
          if (W1) ++w1;
          else H0.splice(0, 1);
          return BA(t, H0, w1)
        }, x.negated = function() {
          var t = new Q1(this);
          return t.s = -t.s || null, t
        }, x.plus = function(t, B1) {
          var W1, w1 = this,
            P1 = w1.s;
          if (t = new Q1(t, B1), B1 = t.s, !P1 || !B1) return new Q1(NaN);
          if (P1 != B1) return t.s = -B1, w1.minus(t);
          var e = w1.e / W,
            y1 = t.e / W,
            O1 = w1.c,
            h1 = t.c;
          if (!e || !y1) {
            if (!O1 || !h1) return new Q1(P1 / 0);
            if (!O1[0] || !h1[0]) return h1[0] ? t : new Q1(O1[0] ? w1 : P1 * 0)
          }
          if (e = K(e), y1 = K(y1), O1 = O1.slice(), P1 = e - y1) {
            if (P1 > 0) y1 = e, W1 = h1;
            else P1 = -P1, W1 = O1;
            W1.reverse();
            for (; P1--; W1.push(0));
            W1.reverse()
          }
          if (P1 = O1.length, B1 = h1.length, P1 - B1 < 0) W1 = h1, h1 = O1, O1 = W1, B1 = P1;
          for (P1 = 0; B1;) P1 = (O1[--B1] = O1[B1] + h1[B1] + P1) / Y | 0, O1[B1] = Y === O1[B1] ? 0 : O1[B1] % Y;
          if (P1) O1 = [P1].concat(O1), ++y1;
          return BA(t, O1, y1)
        }, x.precision = x.sd = function(t, B1) {
          var W1, w1, P1, e = this;
          if (t != null && t !== !!t) {
            if (q(t, 1, V), B1 == null) B1 = F1;
            else q(B1, 0, 8);
            return HA(new Q1(e), t, B1)
          }
          if (!(W1 = e.c)) return null;
          if (P1 = W1.length - 1, w1 = P1 * W + 1, P1 = W1[P1]) {
            for (; P1 % 10 == 0; P1 /= 10, w1--);
            for (P1 = W1[0]; P1 >= 10; P1 /= 10, w1++);
          }
          if (t && e.e + 1 > w1) w1 = e.e + 1;
          return w1
        }, x.shiftedBy = function(t) {
          return q(t, -J, J), this.times("1e" + t)
        }, x.squareRoot = x.sqrt = function() {
          var t, B1, W1, w1, P1, e = this,
            y1 = e.c,
            O1 = e.s,
            h1 = e.e,
            o1 = d + 4,
            QA = new Q1("0.5");
          if (O1 !== 1 || !y1 || !y1[0]) return new Q1(!O1 || O1 < 0 && (!y1 || y1[0]) ? NaN : y1 ? e : 1 / 0);
          if (O1 = Math.sqrt(+MA(e)), O1 == 0 || O1 == 1 / 0) {
            if (B1 = E(y1), (B1.length + h1) % 2 == 0) B1 += "0";
            if (O1 = Math.sqrt(+B1), h1 = K((h1 + 1) / 2) - (h1 < 0 || h1 % 2), O1 == 1 / 0) B1 = "5e" + h1;
            else B1 = O1.toExponential(), B1 = B1.slice(0, B1.indexOf("e") + 1) + h1;
            W1 = new Q1(B1)
          } else W1 = new Q1(O1 + "");
          if (W1.c[0]) {
            if (h1 = W1.e, O1 = h1 + o1, O1 < 3) O1 = 0;
            for (;;)
              if (P1 = W1, W1 = QA.times(P1.plus(_(e, P1, o1, 1))), E(P1.c).slice(0, O1) === (B1 = E(W1.c)).slice(0, O1)) {
                if (W1.e < h1) --O1;
                if (B1 = B1.slice(O1 - 3, O1 + 1), B1 == "9999" || !w1 && B1 == "4999") {
                  if (!w1) {
                    if (HA(P1, P1.e + d + 2, 0), P1.times(P1).eq(e)) {
                      W1 = P1;
                      break
                    }
                  }
                  o1 += 4, O1 += 4, w1 = 1
                } else {
                  if (!+B1 || !+B1.slice(1) && B1.charAt(0) == "5") HA(W1, W1.e + d + 2, 1), t = !W1.times(W1).eq(e);
                  break
                }
              }
          }
          return HA(W1, W1.e + d + 1, F1, t)
        }, x.toExponential = function(t, B1) {
          if (t != null) q(t, 0, V), t++;
          return v1(this, t, B1, 1)
        }, x.toFixed = function(t, B1) {
          if (t != null) q(t, 0, V), t = t + this.e + 1;
          return v1(this, t, B1)
        }, x.toFormat = function(t, B1, W1) {
          var w1, P1 = this;
          if (W1 == null)
            if (t != null && B1 && typeof B1 == "object") W1 = B1, B1 = null;
            else if (t && typeof t == "object") W1 = t, t = B1 = null;
          else W1 = bA;
          else if (typeof W1 != "object") throw Error(Z + "Argument not an object: " + W1);
          if (w1 = P1.toFixed(t, B1), P1.c) {
            var e, y1 = w1.split("."),
              O1 = +W1.groupSize,
              h1 = +W1.secondaryGroupSize,
              o1 = W1.groupSeparator || "",
              QA = y1[0],
              zA = y1[1],
              Y0 = P1.s < 0,
              fA = Y0 ? QA.slice(1) : QA,
              H0 = fA.length;
            if (h1) e = O1, O1 = h1, h1 = e, H0 -= e;
            if (O1 > 0 && H0 > 0) {
              e = H0 % O1 || O1, QA = fA.substr(0, e);
              for (; e < H0; e += O1) QA += o1 + fA.substr(e, O1);
              if (h1 > 0) QA += o1 + fA.slice(e);
              if (Y0) QA = "-" + QA
            }
            w1 = zA ? QA + (W1.decimalSeparator || "") + ((h1 = +W1.fractionGroupSize) ? zA.replace(new RegExp("\\d{" + h1 + "}\\B", "g"), "$&" + (W1.fractionGroupSeparator || "")) : zA) : QA
          }
          return (W1.prefix || "") + w1 + (W1.suffix || "")
        }, x.toFraction = function(t) {
          var B1, W1, w1, P1, e, y1, O1, h1, o1, QA, zA, Y0, fA = this,
            H0 = fA.c;
          if (t != null) {
            if (O1 = new Q1(t), !O1.isInteger() && (O1.c || O1.s !== 1) || O1.lt(s)) throw Error(Z + "Argument " + (O1.isInteger() ? "out of range: " : "not an integer: ") + MA(O1))
          }
          if (!H0) return new Q1(fA);
          B1 = new Q1(s), o1 = W1 = new Q1(s), w1 = h1 = new Q1(s), Y0 = E(H0), e = B1.e = Y0.length - fA.e - 1, B1.c[0] = F[(y1 = e % W) < 0 ? W + y1 : y1], t = !t || O1.comparedTo(B1) > 0 ? e > 0 ? B1 : o1 : O1, y1 = N1, N1 = 1 / 0, O1 = new Q1(Y0), h1.c[0] = 0;
          for (;;) {
            if (QA = _(O1, B1, 0, 1), P1 = W1.plus(QA.times(w1)), P1.comparedTo(t) == 1) break;
            W1 = w1, w1 = P1, o1 = h1.plus(QA.times(P1 = o1)), h1 = P1, B1 = O1.minus(QA.times(P1 = B1)), O1 = P1
          }
          return P1 = _(t.minus(W1), w1, 0, 1), h1 = h1.plus(P1.times(o1)), W1 = W1.plus(P1.times(w1)), h1.s = o1.s = fA.s, e = e * 2, zA = _(o1, w1, e, F1).minus(fA).abs().comparedTo(_(h1, W1, e, F1).minus(fA).abs()) < 1 ? [o1, w1] : [h1, W1], N1 = y1, zA
        }, x.toNumber = function() {
          return +MA(this)
        }, x.toPrecision = function(t, B1) {
          if (t != null) q(t, 1, V);
          return v1(this, t, B1, 2)
        }, x.toString = function(t) {
          var B1, W1 = this,
            w1 = W1.s,
            P1 = W1.e;
          if (P1 === null)
            if (w1) {
              if (B1 = "Infinity", w1 < 0) B1 = "-" + B1
            } else B1 = "NaN";
          else {
            if (t == null) B1 = P1 <= X1 || P1 >= v ? R(E(W1.c), P1) : T(E(W1.c), P1, "0");
            else if (t === 10 && k1) W1 = HA(new Q1(W1), d + P1 + 1, F1), B1 = T(E(W1.c), W1.e, "0");
            else q(t, 2, e1.length, "Base"), B1 = k(T(E(W1.c), P1, "0"), 10, t, w1, !0);
            if (w1 < 0 && W1.c[0]) B1 = "-" + B1
          }
          return B1
        }, x.valueOf = x.toJSON = function() {
          return MA(this)
        }, x._isBigNumber = !0, L != null) Q1.set(L);
      return Q1
    }

    function K(L) {
      var _ = L | 0;
      return L > 0 || L === _ ? _ : _ - 1
    }

    function E(L) {
      var _, k, i = 1,
        x = L.length,
        s = L[0] + "";
      for (; i < x;) {
        _ = L[i++] + "", k = W - _.length;
        for (; k--; _ = "0" + _);
        s += _
      }
      for (x = s.length; s.charCodeAt(--x) === 48;);
      return s.slice(0, x + 1 || 1)
    }

    function N(L, _) {
      var k, i, x = L.c,
        s = _.c,
        d = L.s,
        F1 = _.s,
        X1 = L.e,
        v = _.e;
      if (!d || !F1) return null;
      if (k = x && !x[0], i = s && !s[0], k || i) return k ? i ? 0 : -F1 : d;
      if (d != F1) return d;
      if (k = d < 0, i = X1 == v, !x || !s) return i ? 0 : !x ^ k ? 1 : -1;
      if (!i) return X1 > v ^ k ? 1 : -1;
      F1 = (X1 = x.length) < (v = s.length) ? X1 : v;
      for (d = 0; d < F1; d++)
        if (x[d] != s[d]) return x[d] > s[d] ^ k ? 1 : -1;
      return X1 == v ? 0 : X1 > v ^ k ? 1 : -1
    }

    function q(L, _, k, i) {
      if (L < _ || L > k || L !== G(L)) throw Error(Z + (i || "Argument") + (typeof L == "number" ? L < _ || L > k ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(L))
    }

    function O(L) {
      var _ = L.c.length - 1;
      return K(L.e / W) == _ && L.c[_] % 2 != 0
    }

    function R(L, _) {
      return (L.length > 1 ? L.charAt(0) + "." + L.slice(1) : L) + (_ < 0 ? "e" : "e+") + _
    }

    function T(L, _, k) {
      var i, x;
      if (_ < 0) {
        for (x = k + "."; ++_; x += k);
        L = x + L
      } else if (i = L.length, ++_ > i) {
        for (x = k, _ -= i; --_; x += k);
        L += x
      } else if (_ < i) L = L.slice(0, _) + "." + L.slice(_);
      return L
    }
    if (B = C(), B.default = B.BigNumber = B, typeof define == "function" && define.amd) define(function() {
      return B
    });
    else if (typeof ZC1 != "undefined" && ZC1.exports) ZC1.exports = B;
    else {
      if (!A) A = typeof self != "undefined" && self ? self : window;
      A.BigNumber = B
    }
  })(PW2)
})
// @from(Start 6881622, End 6884369)
yW2 = z((Ju8, jW2) => {
  var SW2 = xs1(),
    _W2 = Ju8;
  (function() {
    function A(J) {
      return J < 10 ? "0" + J : J
    }
    var B = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      Q = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      I, G, Z = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': "\\\"",
        "\\": "\\\\"
      },
      D;

    function Y(J) {
      return Q.lastIndex = 0, Q.test(J) ? '"' + J.replace(Q, function(F) {
        var X = Z[F];
        return typeof X === "string" ? X : "\\u" + ("0000" + F.charCodeAt(0).toString(16)).slice(-4)
      }) + '"' : '"' + J + '"'
    }

    function W(J, F) {
      var X, V, C, K, E = I,
        N, q = F[J],
        O = q != null && (q instanceof SW2 || SW2.isBigNumber(q));
      if (q && typeof q === "object" && typeof q.toJSON === "function") q = q.toJSON(J);
      if (typeof D === "function") q = D.call(F, J, q);
      switch (typeof q) {
        case "string":
          if (O) return q;
          else return Y(q);
        case "number":
          return isFinite(q) ? String(q) : "null";
        case "boolean":
        case "null":
        case "bigint":
          return String(q);
        case "object":
          if (!q) return "null";
          if (I += G, N = [], Object.prototype.toString.apply(q) === "[object Array]") {
            K = q.length;
            for (X = 0; X < K; X += 1) N[X] = W(X, q) || "null";
            return C = N.length === 0 ? "[]" : I ? `[
` + I + N.join(`,
` + I) + `
` + E + "]" : "[" + N.join(",") + "]", I = E, C
          }
          if (D && typeof D === "object") {
            K = D.length;
            for (X = 0; X < K; X += 1)
              if (typeof D[X] === "string") {
                if (V = D[X], C = W(V, q), C) N.push(Y(V) + (I ? ": " : ":") + C)
              }
          } else Object.keys(q).forEach(function(R) {
            var T = W(R, q);
            if (T) N.push(Y(R) + (I ? ": " : ":") + T)
          });
          return C = N.length === 0 ? "{}" : I ? `{
` + I + N.join(`,
` + I) + `
` + E + "}" : "{" + N.join(",") + "}", I = E, C
      }
    }
    if (typeof _W2.stringify !== "function") _W2.stringify = function(J, F, X) {
      var V;
      if (I = "", G = "", typeof X === "number")
        for (V = 0; V < X; V += 1) G += " ";
      else if (typeof X === "string") G = X;
      if (D = F, F && typeof F !== "function" && (typeof F !== "object" || typeof F.length !== "number")) throw new Error("JSON.stringify");
      return W("", {
        "": J
      })
    }
  })()
})
// @from(Start 6884375, End 6890618)
xW2 = z((Fu8, kW2) => {
  var DC1 = null,
    P15 = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/,
    S15 = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/,
    _15 = function(A) {
      var B = {
        strict: !1,
        storeAsString: !1,
        alwaysParseAsBig: !1,
        useNativeBigInt: !1,
        protoAction: "error",
        constructorAction: "error"
      };
      if (A !== void 0 && A !== null) {
        if (A.strict === !0) B.strict = !0;
        if (A.storeAsString === !0) B.storeAsString = !0;
        if (B.alwaysParseAsBig = A.alwaysParseAsBig === !0 ? A.alwaysParseAsBig : !1, B.useNativeBigInt = A.useNativeBigInt === !0 ? A.useNativeBigInt : !1, typeof A.constructorAction !== "undefined")
          if (A.constructorAction === "error" || A.constructorAction === "ignore" || A.constructorAction === "preserve") B.constructorAction = A.constructorAction;
          else throw new Error(`Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${A.constructorAction}`);
        if (typeof A.protoAction !== "undefined")
          if (A.protoAction === "error" || A.protoAction === "ignore" || A.protoAction === "preserve") B.protoAction = A.protoAction;
          else throw new Error(`Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${A.protoAction}`)
      }
      var Q, I, G = {
          '"': '"',
          "\\": "\\",
          "/": "/",
          b: "\b",
          f: "\f",
          n: `
`,
          r: "\r",
          t: "\t"
        },
        Z, D = function(E) {
          throw {
            name: "SyntaxError",
            message: E,
            at: Q,
            text: Z
          }
        },
        Y = function(E) {
          if (E && E !== I) D("Expected '" + E + "' instead of '" + I + "'");
          return I = Z.charAt(Q), Q += 1, I
        },
        W = function() {
          var E, N = "";
          if (I === "-") N = "-", Y("-");
          while (I >= "0" && I <= "9") N += I, Y();
          if (I === ".") {
            N += ".";
            while (Y() && I >= "0" && I <= "9") N += I
          }
          if (I === "e" || I === "E") {
            if (N += I, Y(), I === "-" || I === "+") N += I, Y();
            while (I >= "0" && I <= "9") N += I, Y()
          }
          if (E = +N, !isFinite(E)) D("Bad number");
          else {
            if (DC1 == null) DC1 = xs1();
            if (N.length > 15) return B.storeAsString ? N : B.useNativeBigInt ? BigInt(N) : new DC1(N);
            else return !B.alwaysParseAsBig ? E : B.useNativeBigInt ? BigInt(E) : new DC1(E)
          }
        },
        J = function() {
          var E, N, q = "",
            O;
          if (I === '"') {
            var R = Q;
            while (Y()) {
              if (I === '"') {
                if (Q - 1 > R) q += Z.substring(R, Q - 1);
                return Y(), q
              }
              if (I === "\\") {
                if (Q - 1 > R) q += Z.substring(R, Q - 1);
                if (Y(), I === "u") {
                  O = 0;
                  for (N = 0; N < 4; N += 1) {
                    if (E = parseInt(Y(), 16), !isFinite(E)) break;
                    O = O * 16 + E
                  }
                  q += String.fromCharCode(O)
                } else if (typeof G[I] === "string") q += G[I];
                else break;
                R = Q
              }
            }
          }
          D("Bad string")
        },
        F = function() {
          while (I && I <= " ") Y()
        },
        X = function() {
          switch (I) {
            case "t":
              return Y("t"), Y("r"), Y("u"), Y("e"), !0;
            case "f":
              return Y("f"), Y("a"), Y("l"), Y("s"), Y("e"), !1;
            case "n":
              return Y("n"), Y("u"), Y("l"), Y("l"), null
          }
          D("Unexpected '" + I + "'")
        },
        V, C = function() {
          var E = [];
          if (I === "[") {
            if (Y("["), F(), I === "]") return Y("]"), E;
            while (I) {
              if (E.push(V()), F(), I === "]") return Y("]"), E;
              Y(","), F()
            }
          }
          D("Bad array")
        },
        K = function() {
          var E, N = Object.create(null);
          if (I === "{") {
            if (Y("{"), F(), I === "}") return Y("}"), N;
            while (I) {
              if (E = J(), F(), Y(":"), B.strict === !0 && Object.hasOwnProperty.call(N, E)) D('Duplicate key "' + E + '"');
              if (P15.test(E) === !0)
                if (B.protoAction === "error") D("Object contains forbidden prototype property");
                else if (B.protoAction === "ignore") V();
              else N[E] = V();
              else if (S15.test(E) === !0)
                if (B.constructorAction === "error") D("Object contains forbidden constructor property");
                else if (B.constructorAction === "ignore") V();
              else N[E] = V();
              else N[E] = V();
              if (F(), I === "}") return Y("}"), N;
              Y(","), F()
            }
          }
          D("Bad object")
        };
      return V = function() {
          switch (F(), I) {
            case "{":
              return K();
            case "[":
              return C();
            case '"':
              return J();
            case "-":
              return W();
            default:
              return I >= "0" && I <= "9" ? W() : X()
          }
        },
        function(E, N) {
          var q;
          if (Z = E + "", Q = 0, I = " ", q = V(), F(), I) D("Syntax error");
          return typeof N === "function" ? function O(R, T) {
            var L, _, k = R[T];
            if (k && typeof k === "object") Object.keys(k).forEach(function(i) {
              if (_ = O(k, i), _ !== void 0) k[i] = _;
              else delete k[i]
            });
            return N.call(R, T, k)
          }({
            "": q
          }, "") : q
        }
    };
  kW2.exports = _15
})
// @from(Start 6890624, End 6890851)
bW2 = z((Xu8, YC1) => {
  var fW2 = yW2().stringify,
    vW2 = xW2();
  YC1.exports = function(A) {
    return {
      parse: vW2(A),
      stringify: fW2
    }
  };
  YC1.exports.parse = vW2();
  YC1.exports.stringify = fW2
})
// @from(Start 6890857, End 6892104)
fs1 = z((cW2) => {
  Object.defineProperty(cW2, "__esModule", {
    value: !0
  });
  cW2.GCE_LINUX_BIOS_PATHS = void 0;
  cW2.isGoogleCloudServerless = mW2;
  cW2.isGoogleComputeEngineLinux = dW2;
  cW2.isGoogleComputeEngineMACAddress = uW2;
  cW2.isGoogleComputeEngine = pW2;
  cW2.detectGCPResidency = y15;
  var gW2 = Z1("fs"),
    hW2 = Z1("os");
  cW2.GCE_LINUX_BIOS_PATHS = {
    BIOS_DATE: "/sys/class/dmi/id/bios_date",
    BIOS_VENDOR: "/sys/class/dmi/id/bios_vendor"
  };
  var j15 = /^42:01/;

  function mW2() {
    return !!(process.env.CLOUD_RUN_JOB || process.env.FUNCTION_NAME || process.env.K_SERVICE)
  }

  function dW2() {
    if (hW2.platform() !== "linux") return !1;
    try {
      gW2.statSync(cW2.GCE_LINUX_BIOS_PATHS.BIOS_DATE);
      let A = gW2.readFileSync(cW2.GCE_LINUX_BIOS_PATHS.BIOS_VENDOR, "utf8");
      return /Google/.test(A)
    } catch (A) {
      return !1
    }
  }

  function uW2() {
    let A = hW2.networkInterfaces();
    for (let B of Object.values(A)) {
      if (!B) continue;
      for (let {
          mac: Q
        }
        of B)
        if (j15.test(Q)) return !0
    }
    return !1
  }

  function pW2() {
    return dW2() || uW2()
  }

  function y15() {
    return mW2() || pW2()
  }
})
// @from(Start 6892110, End 6893116)
nW2 = z((lW2) => {
  Object.defineProperty(lW2, "__esModule", {
    value: !0
  });
  lW2.Colours = void 0;
  class Q6 {
    static isEnabled(A) {
      return A.isTTY && (typeof A.getColorDepth === "function" ? A.getColorDepth() > 2 : !0)
    }
    static refresh() {
      if (Q6.enabled = Q6.isEnabled(process.stderr), !this.enabled) Q6.reset = "", Q6.bright = "", Q6.dim = "", Q6.red = "", Q6.green = "", Q6.yellow = "", Q6.blue = "", Q6.magenta = "", Q6.cyan = "", Q6.white = "", Q6.grey = "";
      else Q6.reset = "\x1B[0m", Q6.bright = "\x1B[1m", Q6.dim = "\x1B[2m", Q6.red = "\x1B[31m", Q6.green = "\x1B[32m", Q6.yellow = "\x1B[33m", Q6.blue = "\x1B[34m", Q6.magenta = "\x1B[35m", Q6.cyan = "\x1B[36m", Q6.white = "\x1B[37m", Q6.grey = "\x1B[90m"
    }
  }
  lW2.Colours = Q6;
  Q6.enabled = !1;
  Q6.reset = "";
  Q6.bright = "";
  Q6.dim = "";
  Q6.red = "";
  Q6.green = "";
  Q6.yellow = "";
  Q6.blue = "";
  Q6.magenta = "";
  Q6.cyan = "";
  Q6.white = "";
  Q6.grey = "";
  Q6.refresh()
})
// @from(Start 6893122, End 6899511)
eW2 = z((O8) => {
  var g15 = O8 && O8.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    h15 = O8 && O8.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    aW2 = O8 && O8.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) g15(B, A, Q)
      }
      return h15(B, A), B
    };
  Object.defineProperty(O8, "__esModule", {
    value: !0
  });
  O8.env = O8.DebugLogBackendBase = O8.placeholder = O8.AdhocDebugLogger = O8.LogSeverity = void 0;
  O8.getNodeBackend = vs1;
  O8.getDebugBackend = d15;
  O8.getStructuredBackend = u15;
  O8.setBackend = p15;
  O8.log = tW2;
  var m15 = Z1("node:events"),
    qe = aW2(Z1("node:process")),
    sW2 = aW2(Z1("node:util")),
    uJ = nW2(),
    $K;
  (function(A) {
    A.DEFAULT = "DEFAULT", A.DEBUG = "DEBUG", A.INFO = "INFO", A.WARNING = "WARNING", A.ERROR = "ERROR"
  })($K || (O8.LogSeverity = $K = {}));
  class JC1 extends m15.EventEmitter {
    constructor(A, B) {
      super();
      this.namespace = A, this.upstream = B, this.func = Object.assign(this.invoke.bind(this), {
        instance: this,
        on: (Q, I) => this.on(Q, I)
      }), this.func.debug = (...Q) => this.invokeSeverity($K.DEBUG, ...Q), this.func.info = (...Q) => this.invokeSeverity($K.INFO, ...Q), this.func.warn = (...Q) => this.invokeSeverity($K.WARNING, ...Q), this.func.error = (...Q) => this.invokeSeverity($K.ERROR, ...Q), this.func.sublog = (Q) => tW2(Q, this.func)
    }
    invoke(A, ...B) {
      if (this.upstream) this.upstream(A, ...B);
      this.emit("log", A, B)
    }
    invokeSeverity(A, ...B) {
      this.invoke({
        severity: A
      }, ...B)
    }
  }
  O8.AdhocDebugLogger = JC1;
  O8.placeholder = new JC1("", () => {}).func;
  class Me {
    constructor() {
      var A;
      this.cached = new Map, this.filters = [], this.filtersSet = !1;
      let B = (A = qe.env[O8.env.nodeEnables]) !== null && A !== void 0 ? A : "*";
      if (B === "all") B = "*";
      this.filters = B.split(",")
    }
    log(A, B, ...Q) {
      try {
        if (!this.filtersSet) this.setFilters(), this.filtersSet = !0;
        let I = this.cached.get(A);
        if (!I) I = this.makeLogger(A), this.cached.set(A, I);
        I(B, ...Q)
      } catch (I) {
        console.error(I)
      }
    }
  }
  O8.DebugLogBackendBase = Me;
  class gs1 extends Me {
    constructor() {
      super(...arguments);
      this.enabledRegexp = /.*/g
    }
    isEnabled(A) {
      return this.enabledRegexp.test(A)
    }
    makeLogger(A) {
      if (!this.enabledRegexp.test(A)) return () => {};
      return (B, ...Q) => {
        var I;
        let G = `${uJ.Colours.green}${A}${uJ.Colours.reset}`,
          Z = `${uJ.Colours.yellow}${qe.pid}${uJ.Colours.reset}`,
          D;
        switch (B.severity) {
          case $K.ERROR:
            D = `${uJ.Colours.red}${B.severity}${uJ.Colours.reset}`;
            break;
          case $K.INFO:
            D = `${uJ.Colours.magenta}${B.severity}${uJ.Colours.reset}`;
            break;
          case $K.WARNING:
            D = `${uJ.Colours.yellow}${B.severity}${uJ.Colours.reset}`;
            break;
          default:
            D = (I = B.severity) !== null && I !== void 0 ? I : $K.DEFAULT;
            break
        }
        let Y = sW2.formatWithOptions({
            colors: uJ.Colours.enabled
          }, ...Q),
          W = Object.assign({}, B);
        delete W.severity;
        let J = Object.getOwnPropertyNames(W).length ? JSON.stringify(W) : "",
          F = J ? `${uJ.Colours.grey}${J}${uJ.Colours.reset}` : "";
        console.error("%s [%s|%s] %s%s", Z, G, D, Y, J ? ` ${F}` : "")
      }
    }
    setFilters() {
      let B = this.filters.join(",").replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^");
      this.enabledRegexp = new RegExp(`^${B}$`, "i")
    }
  }

  function vs1() {
    return new gs1
  }
  class rW2 extends Me {
    constructor(A) {
      super();
      this.debugPkg = A
    }
    makeLogger(A) {
      let B = this.debugPkg(A);
      return (Q, ...I) => {
        B(I[0], ...I.slice(1))
      }
    }
    setFilters() {
      var A;
      let B = (A = qe.env.NODE_DEBUG) !== null && A !== void 0 ? A : "";
      qe.env.NODE_DEBUG = `${B}${B?",":""}${this.filters.join(",")}`
    }
  }

  function d15(A) {
    return new rW2(A)
  }
  class oW2 extends Me {
    constructor(A) {
      var B;
      super();
      this.upstream = (B = A) !== null && B !== void 0 ? B : new gs1
    }
    makeLogger(A) {
      let B = this.upstream.makeLogger(A);
      return (Q, ...I) => {
        var G;
        let Z = (G = Q.severity) !== null && G !== void 0 ? G : $K.INFO,
          D = Object.assign({
            severity: Z,
            message: sW2.format(...I)
          }, Q),
          Y = JSON.stringify(D);
        B(Q, Y)
      }
    }
    setFilters() {
      this.upstream.setFilters()
    }
  }

  function u15(A) {
    return new oW2(A)
  }
  O8.env = {
    nodeEnables: "GOOGLE_SDK_NODE_LOGGING"
  };
  var bs1 = new Map,
    IV = void 0;

  function p15(A) {
    IV = A, bs1.clear()
  }

  function tW2(A, B) {
    if (!qe.env[O8.env.nodeEnables]) return O8.placeholder;
    if (!A) return O8.placeholder;
    if (B) A = `${B.instance.namespace}:${A}`;
    let I = bs1.get(A);
    if (I) return I.func;
    if (IV === null) return O8.placeholder;
    else if (IV === void 0) IV = vs1();
    let G = (() => {
      let Z = void 0;
      return new JC1(A, (Y, ...W) => {
        if (Z !== IV) {
          if (IV === null) return;
          else if (IV === void 0) IV = vs1();
          Z = IV
        }
        IV === null || IV === void 0 || IV.log(A, Y, ...W)
      })
    })();
    return bs1.set(A, G), G.func
  }
})
// @from(Start 6899517, End 6900252)
AJ2 = z((rj) => {
  var c15 = rj && rj.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    l15 = rj && rj.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) c15(B, A, Q)
    };
  Object.defineProperty(rj, "__esModule", {
    value: !0
  });
  l15(eW2(), rj)
})
// @from(Start 6900258, End 6906766)
Re = z((I4) => {
  var i15 = I4 && I4.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    n15 = I4 && I4.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) i15(B, A, Q)
    };
  Object.defineProperty(I4, "__esModule", {
    value: !0
  });
  I4.gcpResidencyCache = I4.METADATA_SERVER_DETECTION = I4.HEADERS = I4.HEADER_VALUE = I4.HEADER_NAME = I4.SECONDARY_HOST_ADDRESS = I4.HOST_ADDRESS = I4.BASE_PATH = void 0;
  I4.instance = e15;
  I4.project = AA5;
  I4.universe = BA5;
  I4.bulk = QA5;
  I4.isAvailable = GA5;
  I4.resetIsAvailableCache = ZA5;
  I4.getGCPResidency = ds1;
  I4.setGCPResidency = QJ2;
  I4.requestTimeout = IJ2;
  var hs1 = NK(),
    a15 = bW2(),
    s15 = fs1(),
    r15 = AJ2();
  I4.BASE_PATH = "/computeMetadata/v1";
  I4.HOST_ADDRESS = "http://169.254.169.254";
  I4.SECONDARY_HOST_ADDRESS = "http://metadata.google.internal.";
  I4.HEADER_NAME = "Metadata-Flavor";
  I4.HEADER_VALUE = "Google";
  I4.HEADERS = Object.freeze({
    [I4.HEADER_NAME]: I4.HEADER_VALUE
  });
  var BJ2 = r15.log("gcp metadata");
  I4.METADATA_SERVER_DETECTION = Object.freeze({
    "assume-present": "don't try to ping the metadata server, but assume it's present",
    none: "don't try to ping the metadata server, but don't try to use it either",
    "bios-only": "treat the result of a BIOS probe as canonical (don't fall back to pinging)",
    "ping-only": "skip the BIOS probe, and go straight to pinging"
  });

  function ms1(A) {
    if (!A) A = process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST || I4.HOST_ADDRESS;
    if (!/^https?:\/\//.test(A)) A = `http://${A}`;
    return new URL(I4.BASE_PATH, A).href
  }

  function o15(A) {
    Object.keys(A).forEach((B) => {
      switch (B) {
        case "params":
        case "property":
        case "headers":
          break;
        case "qs":
          throw new Error("'qs' is not a valid configuration option. Please use 'params' instead.");
        default:
          throw new Error(`'${B}' is not a valid configuration option.`)
      }
    })
  }
  async function Le(A, B = {}, Q = 3, I = !1) {
    let G = "",
      Z = {},
      D = {};
    if (typeof A === "object") {
      let F = A;
      G = F.metadataKey, Z = F.params || Z, D = F.headers || D, Q = F.noResponseRetries || Q, I = F.fastFail || I
    } else G = A;
    if (typeof B === "string") G += `/${B}`;
    else {
      if (o15(B), B.property) G += `/${B.property}`;
      D = B.headers || D, Z = B.params || Z
    }
    let Y = I ? t15 : hs1.request,
      W = {
        url: `${ms1()}/${G}`,
        headers: {
          ...I4.HEADERS,
          ...D
        },
        retryConfig: {
          noResponseRetries: Q
        },
        params: Z,
        responseType: "text",
        timeout: IJ2()
      };
    BJ2.info("instance request %j", W);
    let J = await Y(W);
    if (BJ2.info("instance metadata is %s", J.data), J.headers[I4.HEADER_NAME.toLowerCase()] !== I4.HEADER_VALUE) throw new Error(`Invalid response from metadata service: incorrect ${I4.HEADER_NAME} header. Expected '${I4.HEADER_VALUE}', got ${J.headers[I4.HEADER_NAME.toLowerCase()]?`'${J.headers[I4.HEADER_NAME.toLowerCase()]}'`:"no header"}`);
    if (typeof J.data === "string") try {
      return a15.parse(J.data)
    } catch (F) {}
    return J.data
  }
  async function t15(A) {
    var B;
    let Q = {
        ...A,
        url: (B = A.url) === null || B === void 0 ? void 0 : B.toString().replace(ms1(), ms1(I4.SECONDARY_HOST_ADDRESS))
      },
      I = !1,
      G = hs1.request(A).then((D) => {
        return I = !0, D
      }).catch((D) => {
        if (I) return Z;
        else throw I = !0, D
      }),
      Z = hs1.request(Q).then((D) => {
        return I = !0, D
      }).catch((D) => {
        if (I) return G;
        else throw I = !0, D
      });
    return Promise.race([G, Z])
  }

  function e15(A) {
    return Le("instance", A)
  }

  function AA5(A) {
    return Le("project", A)
  }

  function BA5(A) {
    return Le("universe", A)
  }
  async function QA5(A) {
    let B = {};
    return await Promise.all(A.map((Q) => {
      return (async () => {
        let I = await Le(Q),
          G = Q.metadataKey;
        B[G] = I
      })()
    })), B
  }

  function IA5() {
    return process.env.DETECT_GCP_RETRIES ? Number(process.env.DETECT_GCP_RETRIES) : 0
  }
  var FC1;
  async function GA5() {
    if (process.env.METADATA_SERVER_DETECTION) {
      let A = process.env.METADATA_SERVER_DETECTION.trim().toLocaleLowerCase();
      if (!(A in I4.METADATA_SERVER_DETECTION)) throw new RangeError(`Unknown \`METADATA_SERVER_DETECTION\` env variable. Got \`${A}\`, but it should be \`${Object.keys(I4.METADATA_SERVER_DETECTION).join("`, `")}\`, or unset`);
      switch (A) {
        case "assume-present":
          return !0;
        case "none":
          return !1;
        case "bios-only":
          return ds1();
        case "ping-only":
      }
    }
    try {
      if (FC1 === void 0) FC1 = Le("instance", void 0, IA5(), !(process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST));
      return await FC1, !0
    } catch (A) {
      let B = A;
      if (process.env.DEBUG_AUTH) console.info(B);
      if (B.type === "request-timeout") return !1;
      if (B.response && B.response.status === 404) return !1;
      else {
        if (!(B.response && B.response.status === 404) && (!B.code || !["EHOSTDOWN", "EHOSTUNREACH", "ENETUNREACH", "ENOENT", "ENOTFOUND", "ECONNREFUSED"].includes(B.code))) {
          let Q = "UNKNOWN";
          if (B.code) Q = B.code;
          process.emitWarning(`received unexpected error = ${B.message} code = ${Q}`, "MetadataLookupWarning")
        }
        return !1
      }
    }
  }

  function ZA5() {
    FC1 = void 0
  }
  I4.gcpResidencyCache = null;

  function ds1() {
    if (I4.gcpResidencyCache === null) QJ2();
    return I4.gcpResidencyCache
  }

  function QJ2(A = null) {
    I4.gcpResidencyCache = A !== null ? A : s15.detectGCPResidency()
  }

  function IJ2() {
    return ds1() ? 0 : 3000
  }
  n15(fs1(), I4)
})
// @from(Start 6906772, End 6908934)
cs1 = z((CA5) => {
  CA5.byteLength = YA5;
  CA5.toByteArray = JA5;
  CA5.fromByteArray = VA5;
  var rw = [],
    GV = [],
    DA5 = typeof Uint8Array !== "undefined" ? Uint8Array : Array,
    us1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (CO = 0, ps1 = us1.length; CO < ps1; ++CO) rw[CO] = us1[CO], GV[us1.charCodeAt(CO)] = CO;
  var CO, ps1;
  GV[45] = 62;
  GV[95] = 63;

  function GJ2(A) {
    var B = A.length;
    if (B % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var Q = A.indexOf("=");
    if (Q === -1) Q = B;
    var I = Q === B ? 0 : 4 - Q % 4;
    return [Q, I]
  }

  function YA5(A) {
    var B = GJ2(A),
      Q = B[0],
      I = B[1];
    return (Q + I) * 3 / 4 - I
  }

  function WA5(A, B, Q) {
    return (B + Q) * 3 / 4 - Q
  }

  function JA5(A) {
    var B, Q = GJ2(A),
      I = Q[0],
      G = Q[1],
      Z = new DA5(WA5(A, I, G)),
      D = 0,
      Y = G > 0 ? I - 4 : I,
      W;
    for (W = 0; W < Y; W += 4) B = GV[A.charCodeAt(W)] << 18 | GV[A.charCodeAt(W + 1)] << 12 | GV[A.charCodeAt(W + 2)] << 6 | GV[A.charCodeAt(W + 3)], Z[D++] = B >> 16 & 255, Z[D++] = B >> 8 & 255, Z[D++] = B & 255;
    if (G === 2) B = GV[A.charCodeAt(W)] << 2 | GV[A.charCodeAt(W + 1)] >> 4, Z[D++] = B & 255;
    if (G === 1) B = GV[A.charCodeAt(W)] << 10 | GV[A.charCodeAt(W + 1)] << 4 | GV[A.charCodeAt(W + 2)] >> 2, Z[D++] = B >> 8 & 255, Z[D++] = B & 255;
    return Z
  }

  function FA5(A) {
    return rw[A >> 18 & 63] + rw[A >> 12 & 63] + rw[A >> 6 & 63] + rw[A & 63]
  }

  function XA5(A, B, Q) {
    var I, G = [];
    for (var Z = B; Z < Q; Z += 3) I = (A[Z] << 16 & 16711680) + (A[Z + 1] << 8 & 65280) + (A[Z + 2] & 255), G.push(FA5(I));
    return G.join("")
  }

  function VA5(A) {
    var B, Q = A.length,
      I = Q % 3,
      G = [],
      Z = 16383;
    for (var D = 0, Y = Q - I; D < Y; D += Z) G.push(XA5(A, D, D + Z > Y ? Y : D + Z));
    if (I === 1) B = A[Q - 1], G.push(rw[B >> 2] + rw[B << 4 & 63] + "==");
    else if (I === 2) B = (A[Q - 2] << 8) + A[Q - 1], G.push(rw[B >> 10] + rw[B >> 4 & 63] + rw[B << 2 & 63] + "=");
    return G.join("")
  }
})
// @from(Start 6908940, End 6911335)
YJ2 = z((ZJ2) => {
  Object.defineProperty(ZJ2, "__esModule", {
    value: !0
  });
  ZJ2.BrowserCrypto = void 0;
  var Od = cs1(),
    wA5 = Td();
  class XC1 {
    constructor() {
      if (typeof window === "undefined" || window.crypto === void 0 || window.crypto.subtle === void 0) throw new Error("SubtleCrypto not found. Make sure it's an https:// website.")
    }
    async sha256DigestBase64(A) {
      let B = new TextEncoder().encode(A),
        Q = await window.crypto.subtle.digest("SHA-256", B);
      return Od.fromByteArray(new Uint8Array(Q))
    }
    randomBytesBase64(A) {
      let B = new Uint8Array(A);
      return window.crypto.getRandomValues(B), Od.fromByteArray(B)
    }
    static padBase64(A) {
      while (A.length % 4 !== 0) A += "=";
      return A
    }
    async verify(A, B, Q) {
      let I = {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-256"
          }
        },
        G = new TextEncoder().encode(B),
        Z = Od.toByteArray(XC1.padBase64(Q)),
        D = await window.crypto.subtle.importKey("jwk", A, I, !0, ["verify"]);
      return await window.crypto.subtle.verify(I, D, Z, G)
    }
    async sign(A, B) {
      let Q = {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-256"
          }
        },
        I = new TextEncoder().encode(B),
        G = await window.crypto.subtle.importKey("jwk", A, Q, !0, ["sign"]),
        Z = await window.crypto.subtle.sign(Q, G, I);
      return Od.fromByteArray(new Uint8Array(Z))
    }
    decodeBase64StringUtf8(A) {
      let B = Od.toByteArray(XC1.padBase64(A));
      return new TextDecoder().decode(B)
    }
    encodeBase64StringUtf8(A) {
      let B = new TextEncoder().encode(A);
      return Od.fromByteArray(B)
    }
    async sha256DigestHex(A) {
      let B = new TextEncoder().encode(A),
        Q = await window.crypto.subtle.digest("SHA-256", B);
      return wA5.fromArrayBufferToHex(Q)
    }
    async signWithHmacSha256(A, B) {
      let Q = typeof A === "string" ? A : String.fromCharCode(...new Uint16Array(A)),
        I = new TextEncoder,
        G = await window.crypto.subtle.importKey("raw", I.encode(Q), {
          name: "HMAC",
          hash: {
            name: "SHA-256"
          }
        }, !1, ["sign"]);
      return window.crypto.subtle.sign("HMAC", G, I.encode(B))
    }
  }
  ZJ2.BrowserCrypto = XC1
})
// @from(Start 6911341, End 6912562)
XJ2 = z((JJ2) => {
  Object.defineProperty(JJ2, "__esModule", {
    value: !0
  });
  JJ2.NodeCrypto = void 0;
  var Pd = Z1("crypto");
  class WJ2 {
    async sha256DigestBase64(A) {
      return Pd.createHash("sha256").update(A).digest("base64")
    }
    randomBytesBase64(A) {
      return Pd.randomBytes(A).toString("base64")
    }
    async verify(A, B, Q) {
      let I = Pd.createVerify("RSA-SHA256");
      return I.update(B), I.end(), I.verify(A, Q, "base64")
    }
    async sign(A, B) {
      let Q = Pd.createSign("RSA-SHA256");
      return Q.update(B), Q.end(), Q.sign(A, "base64")
    }
    decodeBase64StringUtf8(A) {
      return Buffer.from(A, "base64").toString("utf-8")
    }
    encodeBase64StringUtf8(A) {
      return Buffer.from(A, "utf-8").toString("base64")
    }
    async sha256DigestHex(A) {
      return Pd.createHash("sha256").update(A).digest("hex")
    }
    async signWithHmacSha256(A, B) {
      let Q = typeof A === "string" ? A : UA5(A);
      return EA5(Pd.createHmac("sha256", Q).update(B).digest())
    }
  }
  JJ2.NodeCrypto = WJ2;

  function EA5(A) {
    return A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength)
  }

  function UA5(A) {
    return Buffer.from(A)
  }
})
// @from(Start 6912568, End 6913170)
Td = z((CJ2) => {
  Object.defineProperty(CJ2, "__esModule", {
    value: !0
  });
  CJ2.createCrypto = qA5;
  CJ2.hasBrowserCrypto = VJ2;
  CJ2.fromArrayBufferToHex = MA5;
  var NA5 = YJ2(),
    $A5 = XJ2();

  function qA5() {
    if (VJ2()) return new NA5.BrowserCrypto;
    return new $A5.NodeCrypto
  }

  function VJ2() {
    return typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined"
  }

  function MA5(A) {
    return Array.from(new Uint8Array(A)).map((Q) => {
      return Q.toString(16).padStart(2, "0")
    }).join("")
  }
})
// @from(Start 6913176, End 6913806)
HJ2 = z((KJ2) => {
  Object.defineProperty(KJ2, "__esModule", {
    value: !0
  });
  KJ2.validate = TA5;

  function TA5(A) {
    let B = [{
      invalid: "uri",
      expected: "url"
    }, {
      invalid: "json",
      expected: "data"
    }, {
      invalid: "qs",
      expected: "params"
    }];
    for (let Q of B)
      if (A[Q.invalid]) {
        let I = `'${Q.invalid}' is not a valid configuration option. Please use '${Q.expected}' instead. This library is using Axios for requests. Please see https://github.com/axios/axios to learn more about the valid request options.`;
        throw new Error(I)
      }
  }
})
// @from(Start 6913812, End 6916504)
ls1 = z((qu8, SA5) => {
  SA5.exports = {
    name: "google-auth-library",
    version: "9.15.1",
    author: "Google Inc.",
    description: "Google APIs Authentication Client Library for Node.js",
    engines: {
      node: ">=14"
    },
    main: "./build/src/index.js",
    types: "./build/src/index.d.ts",
    repository: "googleapis/google-auth-library-nodejs.git",
    keywords: ["google", "api", "google apis", "client", "client library"],
    dependencies: {
      "base64-js": "^1.3.0",
      "ecdsa-sig-formatter": "^1.0.11",
      gaxios: "^6.1.1",
      "gcp-metadata": "^6.1.0",
      gtoken: "^7.0.0",
      jws: "^4.0.0"
    },
    devDependencies: {
      "@types/base64-js": "^1.2.5",
      "@types/chai": "^4.1.7",
      "@types/jws": "^3.1.0",
      "@types/mocha": "^9.0.0",
      "@types/mv": "^2.1.0",
      "@types/ncp": "^2.0.1",
      "@types/node": "^20.4.2",
      "@types/sinon": "^17.0.0",
      "assert-rejects": "^1.0.0",
      c8: "^8.0.0",
      chai: "^4.2.0",
      cheerio: "1.0.0-rc.12",
      codecov: "^3.0.2",
      "engine.io": "6.6.2",
      gts: "^5.0.0",
      "is-docker": "^2.0.0",
      jsdoc: "^4.0.0",
      "jsdoc-fresh": "^3.0.0",
      "jsdoc-region-tag": "^3.0.0",
      karma: "^6.0.0",
      "karma-chrome-launcher": "^3.0.0",
      "karma-coverage": "^2.0.0",
      "karma-firefox-launcher": "^2.0.0",
      "karma-mocha": "^2.0.0",
      "karma-sourcemap-loader": "^0.4.0",
      "karma-webpack": "5.0.0",
      keypair: "^1.0.4",
      linkinator: "^4.0.0",
      mocha: "^9.2.2",
      mv: "^2.1.1",
      ncp: "^2.0.0",
      nock: "^13.0.0",
      "null-loader": "^4.0.0",
      pdfmake: "0.2.12",
      puppeteer: "^21.0.0",
      sinon: "^18.0.0",
      "ts-loader": "^8.0.0",
      typescript: "^5.1.6",
      webpack: "^5.21.2",
      "webpack-cli": "^4.0.0"
    },
    files: ["build/src", "!build/src/**/*.map"],
    scripts: {
      test: "c8 mocha build/test",
      clean: "gts clean",
      prepare: "npm run compile",
      lint: "gts check",
      compile: "tsc -p .",
      fix: "gts fix",
      pretest: "npm run compile -- --sourceMap",
      docs: "jsdoc -c .jsdoc.json",
      "samples-setup": "cd samples/ && npm link ../ && npm run setup && cd ../",
      "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
      "system-test": "mocha build/system-test --timeout 60000",
      "presystem-test": "npm run compile -- --sourceMap",
      webpack: "webpack",
      "browser-test": "karma start",
      "docs-test": "linkinator docs",
      "predocs-test": "npm run docs",
      prelint: "cd samples; npm link ../; npm install",
      precompile: "gts clean"
    },
    license: "Apache-2.0"
  }
})
// @from(Start 6916510, End 6918181)
Te = z((wJ2) => {
  Object.defineProperty(wJ2, "__esModule", {
    value: !0
  });
  wJ2.DefaultTransporter = void 0;
  var _A5 = NK(),
    jA5 = HJ2(),
    yA5 = ls1(),
    zJ2 = "google-api-nodejs-client";
  class Oe {
    constructor() {
      this.instance = new _A5.Gaxios
    }
    configure(A = {}) {
      if (A.headers = A.headers || {}, typeof window === "undefined") {
        let B = A.headers["User-Agent"];
        if (!B) A.headers["User-Agent"] = Oe.USER_AGENT;
        else if (!B.includes(`${zJ2}/`)) A.headers["User-Agent"] = `${B} ${Oe.USER_AGENT}`;
        if (!A.headers["x-goog-api-client"]) {
          let Q = process.version.replace(/^v/, "");
          A.headers["x-goog-api-client"] = `gl-node/${Q}`
        }
      }
      return A
    }
    request(A) {
      return A = this.configure(A), jA5.validate(A), this.instance.request(A).catch((B) => {
        throw this.processError(B)
      })
    }
    get defaults() {
      return this.instance.defaults
    }
    set defaults(A) {
      this.instance.defaults = A
    }
    processError(A) {
      let B = A.response,
        Q = A,
        I = B ? B.data : null;
      if (B && I && I.error && B.status !== 200)
        if (typeof I.error === "string") Q.message = I.error, Q.status = B.status;
        else if (Array.isArray(I.error.errors)) Q.message = I.error.errors.map((G) => G.message).join(`
`), Q.code = I.error.code, Q.errors = I.error.errors;
      else Q.message = I.error.message, Q.code = I.error.code;
      else if (B && B.status >= 400) Q.message = I, Q.status = B.status;
      return Q
    }
  }
  wJ2.DefaultTransporter = Oe;
  Oe.USER_AGENT = `${zJ2}/${yA5.version}`
})
// @from(Start 6918187, End 6919340)
Sd = z((is1, NJ2) => {
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var VC1 = Z1("buffer"),
    ow = VC1.Buffer;

  function UJ2(A, B) {
    for (var Q in A) B[Q] = A[Q]
  }
  if (ow.from && ow.alloc && ow.allocUnsafe && ow.allocUnsafeSlow) NJ2.exports = VC1;
  else UJ2(VC1, is1), is1.Buffer = oj;

  function oj(A, B, Q) {
    return ow(A, B, Q)
  }
  oj.prototype = Object.create(ow.prototype);
  UJ2(ow, oj);
  oj.from = function(A, B, Q) {
    if (typeof A === "number") throw new TypeError("Argument must not be a number");
    return ow(A, B, Q)
  };
  oj.alloc = function(A, B, Q) {
    if (typeof A !== "number") throw new TypeError("Argument must be a number");
    var I = ow(A);
    if (B !== void 0)
      if (typeof Q === "string") I.fill(B, Q);
      else I.fill(B);
    else I.fill(0);
    return I
  };
  oj.allocUnsafe = function(A) {
    if (typeof A !== "number") throw new TypeError("Argument must be a number");
    return ow(A)
  };
  oj.allocUnsafeSlow = function(A) {
    if (typeof A !== "number") throw new TypeError("Argument must be a number");
    return VC1.SlowBuffer(A)
  }
})
// @from(Start 6919346, End 6919678)
qJ2 = z((Lu8, $J2) => {
  function ns1(A) {
    var B = (A / 8 | 0) + (A % 8 === 0 ? 0 : 1);
    return B
  }
  var kA5 = {
    ES256: ns1(256),
    ES384: ns1(384),
    ES512: ns1(521)
  };

  function xA5(A) {
    var B = kA5[A];
    if (B) return B;
    throw new Error('Unknown algorithm "' + A + '"')
  }
  $J2.exports = xA5
})
// @from(Start 6919684, End 6922545)
as1 = z((Ru8, PJ2) => {
  var CC1 = Sd().Buffer,
    LJ2 = qJ2(),
    KC1 = 128,
    RJ2 = 0,
    fA5 = 32,
    vA5 = 16,
    bA5 = 2,
    OJ2 = vA5 | fA5 | RJ2 << 6,
    HC1 = bA5 | RJ2 << 6;

  function gA5(A) {
    return A.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
  }

  function TJ2(A) {
    if (CC1.isBuffer(A)) return A;
    else if (typeof A === "string") return CC1.from(A, "base64");
    throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
  }

  function hA5(A, B) {
    A = TJ2(A);
    var Q = LJ2(B),
      I = Q + 1,
      G = A.length,
      Z = 0;
    if (A[Z++] !== OJ2) throw new Error('Could not find expected "seq"');
    var D = A[Z++];
    if (D === (KC1 | 1)) D = A[Z++];
    if (G - Z < D) throw new Error('"seq" specified length of "' + D + '", only "' + (G - Z) + '" remaining');
    if (A[Z++] !== HC1) throw new Error('Could not find expected "int" for "r"');
    var Y = A[Z++];
    if (G - Z - 2 < Y) throw new Error('"r" specified length of "' + Y + '", only "' + (G - Z - 2) + '" available');
    if (I < Y) throw new Error('"r" specified length of "' + Y + '", max of "' + I + '" is acceptable');
    var W = Z;
    if (Z += Y, A[Z++] !== HC1) throw new Error('Could not find expected "int" for "s"');
    var J = A[Z++];
    if (G - Z !== J) throw new Error('"s" specified length of "' + J + '", expected "' + (G - Z) + '"');
    if (I < J) throw new Error('"s" specified length of "' + J + '", max of "' + I + '" is acceptable');
    var F = Z;
    if (Z += J, Z !== G) throw new Error('Expected to consume entire buffer, but "' + (G - Z) + '" bytes remain');
    var X = Q - Y,
      V = Q - J,
      C = CC1.allocUnsafe(X + Y + V + J);
    for (Z = 0; Z < X; ++Z) C[Z] = 0;
    A.copy(C, Z, W + Math.max(-X, 0), W + Y), Z = Q;
    for (var K = Z; Z < K + V; ++Z) C[Z] = 0;
    return A.copy(C, Z, F + Math.max(-V, 0), F + J), C = C.toString("base64"), C = gA5(C), C
  }

  function MJ2(A, B, Q) {
    var I = 0;
    while (B + I < Q && A[B + I] === 0) ++I;
    var G = A[B + I] >= KC1;
    if (G) --I;
    return I
  }

  function mA5(A, B) {
    A = TJ2(A);
    var Q = LJ2(B),
      I = A.length;
    if (I !== Q * 2) throw new TypeError('"' + B + '" signatures must be "' + Q * 2 + '" bytes, saw "' + I + '"');
    var G = MJ2(A, 0, Q),
      Z = MJ2(A, Q, A.length),
      D = Q - G,
      Y = Q - Z,
      W = 2 + D + 1 + 1 + Y,
      J = W < KC1,
      F = CC1.allocUnsafe((J ? 2 : 3) + W),
      X = 0;
    if (F[X++] = OJ2, J) F[X++] = W;
    else F[X++] = KC1 | 1, F[X++] = W & 255;
    if (F[X++] = HC1, F[X++] = D, G < 0) F[X++] = 0, X += A.copy(F, X, 0, Q);
    else X += A.copy(F, X, G, Q);
    if (F[X++] = HC1, F[X++] = Y, Z < 0) F[X++] = 0, A.copy(F, X, Q);
    else A.copy(F, X, Q + Z);
    return F
  }
  PJ2.exports = {
    derToJose: hA5,
    joseToDer: mA5
  }
})
// @from(Start 6922551, End 6924354)
HO = z((KO) => {
  var qK = KO && KO.__classPrivateFieldGet || function(A, B, Q, I) {
      if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
      if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
    },
    _d, E$, ss1, rs1;
  Object.defineProperty(KO, "__esModule", {
    value: !0
  });
  KO.LRUCache = void 0;
  KO.snakeToCamel = SJ2;
  KO.originalOrCamelOptions = dA5;

  function SJ2(A) {
    return A.replace(/([_][^_])/g, (B) => B.slice(1).toUpperCase())
  }

  function dA5(A) {
    function B(Q) {
      var I;
      let G = A || {};
      return (I = G[Q]) !== null && I !== void 0 ? I : G[SJ2(Q)]
    }
    return {
      get: B
    }
  }
  class _J2 {
    constructor(A) {
      _d.add(this), E$.set(this, new Map), this.capacity = A.capacity, this.maxAge = A.maxAge
    }
    set(A, B) {
      qK(this, _d, "m", ss1).call(this, A, B), qK(this, _d, "m", rs1).call(this)
    }
    get(A) {
      let B = qK(this, E$, "f").get(A);
      if (!B) return;
      return qK(this, _d, "m", ss1).call(this, A, B.value), qK(this, _d, "m", rs1).call(this), B.value
    }
  }
  KO.LRUCache = _J2;
  E$ = new WeakMap, _d = new WeakSet, ss1 = function A(B, Q) {
    qK(this, E$, "f").delete(B), qK(this, E$, "f").set(B, {
      value: Q,
      lastAccessed: Date.now()
    })
  }, rs1 = function A() {
    let B = this.maxAge ? Date.now() - this.maxAge : 0,
      Q = qK(this, E$, "f").entries().next();
    while (!Q.done && (qK(this, E$, "f").size > this.capacity || Q.value[1].lastAccessed < B)) qK(this, E$, "f").delete(Q.value[0]), Q = qK(this, E$, "f").entries().next()
  }
})
// @from(Start 6924360, End 6926572)
tw = z((xJ2) => {
  Object.defineProperty(xJ2, "__esModule", {
    value: !0
  });
  xJ2.AuthClient = xJ2.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = xJ2.DEFAULT_UNIVERSE = void 0;
  var uA5 = Z1("events"),
    jJ2 = NK(),
    yJ2 = Te(),
    pA5 = HO();
  xJ2.DEFAULT_UNIVERSE = "googleapis.com";
  xJ2.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = 300000;
  class kJ2 extends uA5.EventEmitter {
    constructor(A = {}) {
      var B, Q, I, G, Z;
      super();
      this.credentials = {}, this.eagerRefreshThresholdMillis = xJ2.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS, this.forceRefreshOnFailure = !1, this.universeDomain = xJ2.DEFAULT_UNIVERSE;
      let D = pA5.originalOrCamelOptions(A);
      if (this.apiKey = A.apiKey, this.projectId = (B = D.get("project_id")) !== null && B !== void 0 ? B : null, this.quotaProjectId = D.get("quota_project_id"), this.credentials = (Q = D.get("credentials")) !== null && Q !== void 0 ? Q : {}, this.universeDomain = (I = D.get("universe_domain")) !== null && I !== void 0 ? I : xJ2.DEFAULT_UNIVERSE, this.transporter = (G = A.transporter) !== null && G !== void 0 ? G : new yJ2.DefaultTransporter, A.transporterOptions) this.transporter.defaults = A.transporterOptions;
      if (A.eagerRefreshThresholdMillis) this.eagerRefreshThresholdMillis = A.eagerRefreshThresholdMillis;
      this.forceRefreshOnFailure = (Z = A.forceRefreshOnFailure) !== null && Z !== void 0 ? Z : !1
    }
    get gaxios() {
      if (this.transporter instanceof jJ2.Gaxios) return this.transporter;
      else if (this.transporter instanceof yJ2.DefaultTransporter) return this.transporter.instance;
      else if ("instance" in this.transporter && this.transporter.instance instanceof jJ2.Gaxios) return this.transporter.instance;
      return null
    }
    setCredentials(A) {
      this.credentials = A
    }
    addSharedMetadataHeaders(A) {
      if (!A["x-goog-user-project"] && this.quotaProjectId) A["x-goog-user-project"] = this.quotaProjectId;
      return A
    }
    static get RETRY_CONFIG() {
      return {
        retry: !0,
        retryConfig: {
          httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
        }
      }
    }
  }
  xJ2.AuthClient = kJ2
})
// @from(Start 6926578, End 6927145)
ts1 = z((gJ2) => {
  Object.defineProperty(gJ2, "__esModule", {
    value: !0
  });
  gJ2.LoginTicket = void 0;
  class bJ2 {
    constructor(A, B) {
      this.envelope = A, this.payload = B
    }
    getEnvelope() {
      return this.envelope
    }
    getPayload() {
      return this.payload
    }
    getUserId() {
      let A = this.getPayload();
      if (A && A.sub) return A.sub;
      return null
    }
    getAttributes() {
      return {
        envelope: this.getEnvelope(),
        payload: this.getPayload()
      }
    }
  }
  gJ2.LoginTicket = bJ2
})