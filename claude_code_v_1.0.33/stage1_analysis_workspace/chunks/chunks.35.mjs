
// @from(Start 3561321, End 3589858)
Na = z((ZG8, $20) => {
  var {
    defineProperty: CI1,
    getOwnPropertyDescriptor: qz4,
    getOwnPropertyNames: Mz4
  } = Object, Lz4 = Object.prototype.hasOwnProperty, e0 = (A, B) => CI1(A, "name", {
    value: B,
    configurable: !0
  }), Rz4 = (A, B) => {
    for (var Q in B) CI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Oz4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Mz4(B))
        if (!Lz4.call(A, G) && G !== Q) CI1(A, G, {
          get: () => B[G],
          enumerable: !(I = qz4(B, G)) || I.enumerable
        })
    }
    return A
  }, Tz4 = (A) => Oz4(CI1({}, "__esModule", {
    value: !0
  }), A), Z20 = {};
  Rz4(Z20, {
    Client: () => Pz4,
    Command: () => Y20,
    LazyJsonString: () => D_,
    NoOpLogger: () => Lw4,
    SENSITIVE_STRING: () => _z4,
    ServiceException: () => Xw4,
    _json: () => ry1,
    collectBody: () => cy1.collectBody,
    convertMap: () => Rw4,
    createAggregatedClient: () => jz4,
    dateToUtcString: () => C20,
    decorateServiceException: () => K20,
    emitWarningIfUnsupportedVersion: () => Hw4,
    expectBoolean: () => kz4,
    expectByte: () => sy1,
    expectFloat32: () => XI1,
    expectInt: () => fz4,
    expectInt32: () => ny1,
    expectLong: () => Ea,
    expectNonNull: () => bz4,
    expectNumber: () => wa,
    expectObject: () => W20,
    expectShort: () => ay1,
    expectString: () => gz4,
    expectUnion: () => hz4,
    extendedEncodeURIComponent: () => cy1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => qw4,
    getDefaultClientConfiguration: () => Nw4,
    getDefaultExtensionConfiguration: () => z20,
    getValueFromTextNode: () => w20,
    handleFloat: () => uz4,
    isSerializableHeaderValue: () => Mw4,
    limitedParseDouble: () => ey1,
    limitedParseFloat: () => pz4,
    limitedParseFloat32: () => cz4,
    loadConfigsForDefaultMode: () => Kw4,
    logger: () => Ua,
    map: () => Bk1,
    parseBoolean: () => yz4,
    parseEpochTimestamp: () => Qw4,
    parseRfc3339DateTime: () => sz4,
    parseRfc3339DateTimeWithOffset: () => oz4,
    parseRfc7231DateTime: () => Bw4,
    quoteHeader: () => U20,
    resolveDefaultRuntimeConfig: () => $w4,
    resolvedPath: () => cy1.resolvedPath,
    serializeDateTime: () => jw4,
    serializeFloat: () => _w4,
    splitEvery: () => N20,
    splitHeader: () => yw4,
    strictParseByte: () => V20,
    strictParseDouble: () => ty1,
    strictParseFloat: () => mz4,
    strictParseFloat32: () => J20,
    strictParseInt: () => lz4,
    strictParseInt32: () => iz4,
    strictParseLong: () => X20,
    strictParseShort: () => _b,
    take: () => Ow4,
    throwDefaultError: () => H20,
    withBaseException: () => Vw4
  });
  $20.exports = Tz4(Z20);
  var D20 = WN(),
    Pz4 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = D20.constructStack()
      }
      static {
        e0(this, "Client")
      }
      send(A, B, Q) {
        let I = typeof B !== "function" ? B : void 0,
          G = typeof B === "function" ? B : Q,
          Z = I === void 0 && this.config.cacheMiddleware === !0,
          D;
        if (Z) {
          if (!this.handlers) this.handlers = new WeakMap;
          let Y = this.handlers;
          if (Y.has(A.constructor)) D = Y.get(A.constructor);
          else D = A.resolveMiddleware(this.middlewareStack, this.config, I), Y.set(A.constructor, D)
        } else delete this.handlers, D = A.resolveMiddleware(this.middlewareStack, this.config, I);
        if (G) D(A).then((Y) => G(null, Y.output), (Y) => G(Y)).catch(() => {});
        else return D(A).then((Y) => Y.output)
      }
      destroy() {
        this.config?.requestHandler?.destroy?.(), delete this.handlers
      }
    },
    cy1 = vz(),
    iy1 = py1(),
    Y20 = class {
      constructor() {
        this.middlewareStack = D20.constructStack()
      }
      static {
        e0(this, "Command")
      }
      static classBuilder() {
        return new Sz4
      }
      resolveMiddlewareWithContext(A, B, Q, {
        middlewareFn: I,
        clientName: G,
        commandName: Z,
        inputFilterSensitiveLog: D,
        outputFilterSensitiveLog: Y,
        smithyContext: W,
        additionalContext: J,
        CommandCtor: F
      }) {
        for (let E of I.bind(this)(F, A, B, Q)) this.middlewareStack.use(E);
        let X = A.concat(this.middlewareStack),
          {
            logger: V
          } = B,
          C = {
            logger: V,
            clientName: G,
            commandName: Z,
            inputFilterSensitiveLog: D,
            outputFilterSensitiveLog: Y,
            [iy1.SMITHY_CONTEXT_KEY]: {
              commandInstance: this,
              ...W
            },
            ...J
          },
          {
            requestHandler: K
          } = B;
        return X.resolve((E) => K.handle(E.request, Q || {}), C)
      }
    },
    Sz4 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        e0(this, "ClassBuilder")
      }
      init(A) {
        this._init = A
      }
      ep(A) {
        return this._ep = A, this
      }
      m(A) {
        return this._middlewareFn = A, this
      }
      s(A, B, Q = {}) {
        return this._smithyContext = {
          service: A,
          operation: B,
          ...Q
        }, this
      }
      c(A = {}) {
        return this._additionalContext = A, this
      }
      n(A, B) {
        return this._clientName = A, this._commandName = B, this
      }
      f(A = (Q) => Q, B = (Q) => Q) {
        return this._inputFilterSensitiveLog = A, this._outputFilterSensitiveLog = B, this
      }
      ser(A) {
        return this._serializer = A, this
      }
      de(A) {
        return this._deserializer = A, this
      }
      build() {
        let A = this,
          B;
        return B = class extends Y20 {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            e0(this, "CommandRef")
          }
          static getEndpointParameterInstructions() {
            return A._ep
          }
          resolveMiddleware(Q, I, G) {
            return this.resolveMiddlewareWithContext(Q, I, G, {
              CommandCtor: B,
              middlewareFn: A._middlewareFn,
              clientName: A._clientName,
              commandName: A._commandName,
              inputFilterSensitiveLog: A._inputFilterSensitiveLog,
              outputFilterSensitiveLog: A._outputFilterSensitiveLog,
              smithyContext: A._smithyContext,
              additionalContext: A._additionalContext
            })
          }
        }
      }
    },
    _z4 = "***SensitiveInformation***",
    jz4 = e0((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = e0(async function(D, Y, W) {
            let J = new I(D);
            if (typeof Y === "function") this.send(J, Y);
            else if (typeof W === "function") {
              if (typeof Y !== "object") throw new Error(`Expected http options but got ${typeof Y}`);
              this.send(J, Y || {}, W)
            } else return this.send(J, Y)
          }, "methodImpl"),
          Z = (Q[0].toLowerCase() + Q.slice(1)).replace(/Command$/, "");
        B.prototype[Z] = G
      }
    }, "createAggregatedClient"),
    yz4 = e0((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    kz4 = e0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) Ua.warn(VI1(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") Ua.warn(VI1(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    wa = e0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) Ua.warn(VI1(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    xz4 = Math.ceil(340282346638528860000000000000000000000),
    XI1 = e0((A) => {
      let B = wa(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > xz4) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    Ea = e0((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    fz4 = Ea,
    ny1 = e0((A) => oy1(A, 32), "expectInt32"),
    ay1 = e0((A) => oy1(A, 16), "expectShort"),
    sy1 = e0((A) => oy1(A, 8), "expectByte"),
    oy1 = e0((A, B) => {
      let Q = Ea(A);
      if (Q !== void 0 && vz4(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    vz4 = e0((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    bz4 = e0((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    W20 = e0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    gz4 = e0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return Ua.warn(VI1(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    hz4 = e0((A) => {
      if (A === null || A === void 0) return;
      let B = W20(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    ty1 = e0((A) => {
      if (typeof A == "string") return wa(yb(A));
      return wa(A)
    }, "strictParseDouble"),
    mz4 = ty1,
    J20 = e0((A) => {
      if (typeof A == "string") return XI1(yb(A));
      return XI1(A)
    }, "strictParseFloat32"),
    dz4 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    yb = e0((A) => {
      let B = A.match(dz4);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    ey1 = e0((A) => {
      if (typeof A == "string") return F20(A);
      return wa(A)
    }, "limitedParseDouble"),
    uz4 = ey1,
    pz4 = ey1,
    cz4 = e0((A) => {
      if (typeof A == "string") return F20(A);
      return XI1(A)
    }, "limitedParseFloat32"),
    F20 = e0((A) => {
      switch (A) {
        case "NaN":
          return NaN;
        case "Infinity":
          return 1 / 0;
        case "-Infinity":
          return -1 / 0;
        default:
          throw new Error(`Unable to parse float value: ${A}`)
      }
    }, "parseFloatString"),
    X20 = e0((A) => {
      if (typeof A === "string") return Ea(yb(A));
      return Ea(A)
    }, "strictParseLong"),
    lz4 = X20,
    iz4 = e0((A) => {
      if (typeof A === "string") return ny1(yb(A));
      return ny1(A)
    }, "strictParseInt32"),
    _b = e0((A) => {
      if (typeof A === "string") return ay1(yb(A));
      return ay1(A)
    }, "strictParseShort"),
    V20 = e0((A) => {
      if (typeof A === "string") return sy1(yb(A));
      return sy1(A)
    }, "strictParseByte"),
    VI1 = e0((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    Ua = {
      warn: console.warn
    },
    nz4 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Ak1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function C20(A) {
    let B = A.getUTCFullYear(),
      Q = A.getUTCMonth(),
      I = A.getUTCDay(),
      G = A.getUTCDate(),
      Z = A.getUTCHours(),
      D = A.getUTCMinutes(),
      Y = A.getUTCSeconds(),
      W = G < 10 ? `0${G}` : `${G}`,
      J = Z < 10 ? `0${Z}` : `${Z}`,
      F = D < 10 ? `0${D}` : `${D}`,
      X = Y < 10 ? `0${Y}` : `${Y}`;
    return `${nz4[I]}, ${W} ${Ak1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  e0(C20, "dateToUtcString");
  var az4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    sz4 = e0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = az4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = _b(jb(I)), X = pz(G, "month", 1, 12), V = pz(Z, "day", 1, 31);
      return za(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    rz4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    oz4 = e0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = rz4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = _b(jb(I)), V = pz(G, "month", 1, 12), C = pz(Z, "day", 1, 31), K = za(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - Fw4(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    tz4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    ez4 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    Aw4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    Bw4 = e0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = tz4.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return za(_b(jb(Z)), ly1(G), pz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = ez4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Zw4(za(Iw4(Z), ly1(G), pz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = Aw4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return za(_b(jb(J)), ly1(I), pz(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    Qw4 = e0((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = ty1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    za = e0((A, B, Q, I) => {
      let G = B - 1;
      return Yw4(A, G, Q), new Date(Date.UTC(A, G, Q, pz(I.hours, "hour", 0, 23), pz(I.minutes, "minute", 0, 59), pz(I.seconds, "seconds", 0, 60), Jw4(I.fractionalMilliseconds)))
    }, "buildDate"),
    Iw4 = e0((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + _b(jb(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    Gw4 = 1576800000000,
    Zw4 = e0((A) => {
      if (A.getTime() - new Date().getTime() > Gw4) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    ly1 = e0((A) => {
      let B = Ak1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    Dw4 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Yw4 = e0((A, B, Q) => {
      let I = Dw4[B];
      if (B === 1 && Ww4(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${Ak1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    Ww4 = e0((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    pz = e0((A, B, Q, I) => {
      let G = V20(jb(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    Jw4 = e0((A) => {
      if (A === null || A === void 0) return 0;
      return J20("0." + A) * 1000
    }, "parseMilliseconds"),
    Fw4 = e0((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    jb = e0((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    Xw4 = class A extends Error {
      static {
        e0(this, "ServiceException")
      }
      constructor(B) {
        super(B.message);
        Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return A.prototype.isPrototypeOf(Q) || Boolean(Q.$fault) && Boolean(Q.$metadata) && (Q.$fault === "client" || Q.$fault === "server")
      }
      static[Symbol.hasInstance](B) {
        if (!B) return !1;
        let Q = B;
        if (this === A) return A.isInstance(B);
        if (A.isInstance(B)) {
          if (Q.name && this.name) return this.prototype.isPrototypeOf(B) || Q.name === this.name;
          return this.prototype.isPrototypeOf(B)
        }
        return !1
      }
    },
    K20 = e0((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    H20 = e0(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = Cw4(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw K20(D, B)
    }, "throwDefaultError"),
    Vw4 = e0((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        H20({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    Cw4 = e0((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    Kw4 = e0((A) => {
      switch (A) {
        case "standard":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "in-region":
          return {
            retryMode: "standard", connectionTimeout: 1100
          };
        case "cross-region":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "mobile":
          return {
            retryMode: "standard", connectionTimeout: 30000
          };
        default:
          return {}
      }
    }, "loadConfigsForDefaultMode"),
    G20 = !1,
    Hw4 = e0((A) => {
      if (A && !G20 && parseInt(A.substring(1, A.indexOf("."))) < 16) G20 = !0
    }, "emitWarningIfUnsupportedVersion"),
    zw4 = e0((A) => {
      let B = [];
      for (let Q in iy1.AlgorithmId) {
        let I = iy1.AlgorithmId[Q];
        if (A[I] === void 0) continue;
        B.push({
          algorithmId: () => I,
          checksumConstructor: () => A[I]
        })
      }
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    ww4 = e0((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    Ew4 = e0((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    Uw4 = e0((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    z20 = e0((A) => {
      return Object.assign(zw4(A), Ew4(A))
    }, "getDefaultExtensionConfiguration"),
    Nw4 = z20,
    $w4 = e0((A) => {
      return Object.assign(ww4(A), Uw4(A))
    }, "resolveDefaultRuntimeConfig"),
    qw4 = e0((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    w20 = e0((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = w20(A[Q]);
      return A
    }, "getValueFromTextNode"),
    Mw4 = e0((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    D_ = e0(function A(B) {
      return Object.assign(new String(B), {
        deserializeJSON() {
          return JSON.parse(String(B))
        },
        toString() {
          return String(B)
        },
        toJSON() {
          return String(B)
        }
      })
    }, "LazyJsonString");
  D_.from = (A) => {
    if (A && typeof A === "object" && (A instanceof D_ || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return D_(String(A));
    return D_(JSON.stringify(A))
  };
  D_.fromObject = D_.from;
  var Lw4 = class {
    static {
      e0(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function Bk1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, Tw4(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      E20(I, null, Z, D)
    }
    return I
  }
  e0(Bk1, "map");
  var Rw4 = e0((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    Ow4 = e0((A, B) => {
      let Q = {};
      for (let I in B) E20(Q, A, B, I);
      return Q
    }, "take"),
    Tw4 = e0((A, B, Q) => {
      return Bk1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    E20 = e0((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = Pw4, W = Sw4, J = I] = D;
        if (typeof Y === "function" && Y(B[J]) || typeof Y !== "function" && !!Y) A[I] = W(B[J]);
        return
      }
      let [G, Z] = Q[I];
      if (typeof Z === "function") {
        let D, Y = G === void 0 && (D = Z()) != null,
          W = typeof G === "function" && !!G(void 0) || typeof G !== "function" && !!G;
        if (Y) A[I] = D;
        else if (W) A[I] = Z()
      } else {
        let D = G === void 0 && Z != null,
          Y = typeof G === "function" && !!G(Z) || typeof G !== "function" && !!G;
        if (D || Y) A[I] = Z
      }
    }, "applyInstruction"),
    Pw4 = e0((A) => A != null, "nonNullish"),
    Sw4 = e0((A) => A, "pass");

  function U20(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  e0(U20, "quoteHeader");
  var _w4 = e0((A) => {
      if (A !== A) return "NaN";
      switch (A) {
        case 1 / 0:
          return "Infinity";
        case -1 / 0:
          return "-Infinity";
        default:
          return A
      }
    }, "serializeFloat"),
    jw4 = e0((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    ry1 = e0((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(ry1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = ry1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function N20(A, B, Q) {
    if (Q <= 0 || !Number.isInteger(Q)) throw new Error("Invalid number of delimiters (" + Q + ") for splitEvery.");
    let I = A.split(B);
    if (Q === 1) return I;
    let G = [],
      Z = "";
    for (let D = 0; D < I.length; D++) {
      if (Z === "") Z = I[D];
      else Z += B + I[D];
      if ((D + 1) % Q === 0) G.push(Z), Z = ""
    }
    if (Z !== "") G.push(Z);
    return G
  }
  e0(N20, "splitEvery");
  var yw4 = e0((A) => {
    let B = A.length,
      Q = [],
      I = !1,
      G = void 0,
      Z = 0;
    for (let D = 0; D < B; ++D) {
      let Y = A[D];
      switch (Y) {
        case '"':
          if (G !== "\\") I = !I;
          break;
        case ",":
          if (!I) Q.push(A.slice(Z, D)), Z = D + 1;
          break;
        default:
      }
      G = Y
    }
    return Q.push(A.slice(Z)), Q.map((D) => {
      D = D.trim();
      let Y = D.length;
      if (Y < 2) return D;
      if (D[0] === '"' && D[Y - 1] === '"') D = D.slice(1, Y - 1);
      return D.replace(/\\"/g, '"')
    })
  }, "splitHeader")
})
// @from(Start 3589864, End 3590354)
L20 = z((q20) => {
  Object.defineProperty(q20, "__esModule", {
    value: !0
  });
  q20.fromBase64 = void 0;
  var kw4 = MZ(),
    xw4 = /^[A-Za-z0-9+/]*={0,2}$/,
    fw4 = (A) => {
      if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
      if (!xw4.exec(A)) throw new TypeError("Invalid base64 string.");
      let B = kw4.fromString(A, "base64");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
    };
  q20.fromBase64 = fw4
})
// @from(Start 3590360, End 3590933)
T20 = z((R20) => {
  Object.defineProperty(R20, "__esModule", {
    value: !0
  });
  R20.toBase64 = void 0;
  var vw4 = MZ(),
    bw4 = RQ(),
    gw4 = (A) => {
      let B;
      if (typeof A === "string") B = bw4.fromUtf8(A);
      else B = A;
      if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      return vw4.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
    };
  R20.toBase64 = gw4
})
// @from(Start 3590939, End 3591635)
_20 = z((CG8, KI1) => {
  var {
    defineProperty: P20,
    getOwnPropertyDescriptor: hw4,
    getOwnPropertyNames: mw4
  } = Object, dw4 = Object.prototype.hasOwnProperty, Qk1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of mw4(B))
        if (!dw4.call(A, G) && G !== Q) P20(A, G, {
          get: () => B[G],
          enumerable: !(I = hw4(B, G)) || I.enumerable
        })
    }
    return A
  }, S20 = (A, B, Q) => (Qk1(A, B, "default"), Q && Qk1(Q, B, "default")), uw4 = (A) => Qk1(P20({}, "__esModule", {
    value: !0
  }), A), Ik1 = {};
  KI1.exports = uw4(Ik1);
  S20(Ik1, L20(), KI1.exports);
  S20(Ik1, T20(), KI1.exports)
})
// @from(Start 3591641, End 3596311)
n20 = z((l20) => {
  Object.defineProperty(l20, "__esModule", {
    value: !0
  });
  l20.ruleSet = void 0;
  var d20 = "required",
    JX = "fn",
    FX = "argv",
    fb = "ref",
    j20 = !0,
    y20 = "isSet",
    $a = "booleanEquals",
    kb = "error",
    xb = "endpoint",
    VN = "tree",
    Gk1 = "PartitionResult",
    Zk1 = "getAttr",
    k20 = {
      [d20]: !1,
      type: "String"
    },
    x20 = {
      [d20]: !0,
      default: !1,
      type: "Boolean"
    },
    f20 = {
      [fb]: "Endpoint"
    },
    u20 = {
      [JX]: $a,
      [FX]: [{
        [fb]: "UseFIPS"
      }, !0]
    },
    p20 = {
      [JX]: $a,
      [FX]: [{
        [fb]: "UseDualStack"
      }, !0]
    },
    WX = {},
    v20 = {
      [JX]: Zk1,
      [FX]: [{
        [fb]: Gk1
      }, "supportsFIPS"]
    },
    c20 = {
      [fb]: Gk1
    },
    b20 = {
      [JX]: $a,
      [FX]: [!0, {
        [JX]: Zk1,
        [FX]: [c20, "supportsDualStack"]
      }]
    },
    g20 = [u20],
    h20 = [p20],
    m20 = [{
      [fb]: "Region"
    }],
    pw4 = {
      version: "1.0",
      parameters: {
        Region: k20,
        UseDualStack: x20,
        UseFIPS: x20,
        Endpoint: k20
      },
      rules: [{
        conditions: [{
          [JX]: y20,
          [FX]: [f20]
        }],
        rules: [{
          conditions: g20,
          error: "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: kb
        }, {
          conditions: h20,
          error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
          type: kb
        }, {
          endpoint: {
            url: f20,
            properties: WX,
            headers: WX
          },
          type: xb
        }],
        type: VN
      }, {
        conditions: [{
          [JX]: y20,
          [FX]: m20
        }],
        rules: [{
          conditions: [{
            [JX]: "aws.partition",
            [FX]: m20,
            assign: Gk1
          }],
          rules: [{
            conditions: [u20, p20],
            rules: [{
              conditions: [{
                [JX]: $a,
                [FX]: [j20, v20]
              }, b20],
              rules: [{
                endpoint: {
                  url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: WX,
                  headers: WX
                },
                type: xb
              }],
              type: VN
            }, {
              error: "FIPS and DualStack are enabled, but this partition does not support one or both",
              type: kb
            }],
            type: VN
          }, {
            conditions: g20,
            rules: [{
              conditions: [{
                [JX]: $a,
                [FX]: [v20, j20]
              }],
              rules: [{
                conditions: [{
                  [JX]: "stringEquals",
                  [FX]: [{
                    [JX]: Zk1,
                    [FX]: [c20, "name"]
                  }, "aws-us-gov"]
                }],
                endpoint: {
                  url: "https://portal.sso.{Region}.amazonaws.com",
                  properties: WX,
                  headers: WX
                },
                type: xb
              }, {
                endpoint: {
                  url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
                  properties: WX,
                  headers: WX
                },
                type: xb
              }],
              type: VN
            }, {
              error: "FIPS is enabled but this partition does not support FIPS",
              type: kb
            }],
            type: VN
          }, {
            conditions: h20,
            rules: [{
              conditions: [b20],
              rules: [{
                endpoint: {
                  url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: WX,
                  headers: WX
                },
                type: xb
              }],
              type: VN
            }, {
              error: "DualStack is enabled but this partition does not support DualStack",
              type: kb
            }],
            type: VN
          }, {
            endpoint: {
              url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
              properties: WX,
              headers: WX
            },
            type: xb
          }],
          type: VN
        }],
        type: VN
      }, {
        error: "Invalid Configuration: Missing Region",
        type: kb
      }]
    };
  l20.ruleSet = pw4
})
// @from(Start 3596317, End 3596875)
r20 = z((a20) => {
  Object.defineProperty(a20, "__esModule", {
    value: !0
  });
  a20.defaultEndpointResolver = void 0;
  var cw4 = RL(),
    Dk1 = LL(),
    lw4 = n20(),
    iw4 = new Dk1.EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
    }),
    nw4 = (A, B = {}) => {
      return iw4.get(A, () => Dk1.resolveEndpoint(lw4.ruleSet, {
        endpointParams: A,
        logger: B.logger
      }))
    };
  a20.defaultEndpointResolver = nw4;
  Dk1.customEndpointFunctions.aws = cw4.awsEndpointFunctions
})
// @from(Start 3596881, End 3598291)
B90 = z((e20) => {
  Object.defineProperty(e20, "__esModule", {
    value: !0
  });
  e20.getRuntimeConfig = void 0;
  var aw4 = IB(),
    sw4 = NI(),
    rw4 = Na(),
    ow4 = FN(),
    o20 = _20(),
    t20 = RQ(),
    tw4 = gy1(),
    ew4 = r20(),
    AE4 = (A) => {
      return {
        apiVersion: "2019-06-10",
        base64Decoder: A?.base64Decoder ?? o20.fromBase64,
        base64Encoder: A?.base64Encoder ?? o20.toBase64,
        disableHostPrefix: A?.disableHostPrefix ?? !1,
        endpointProvider: A?.endpointProvider ?? ew4.defaultEndpointResolver,
        extensions: A?.extensions ?? [],
        httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? tw4.defaultSSOHttpAuthSchemeProvider,
        httpAuthSchemes: A?.httpAuthSchemes ?? [{
          schemeId: "aws.auth#sigv4",
          identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
          signer: new aw4.AwsSdkSigV4Signer
        }, {
          schemeId: "smithy.api#noAuth",
          identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new sw4.NoAuthSigner
        }],
        logger: A?.logger ?? new rw4.NoOpLogger,
        serviceId: A?.serviceId ?? "SSO",
        urlParser: A?.urlParser ?? ow4.parseUrl,
        utf8Decoder: A?.utf8Decoder ?? t20.fromUtf8,
        utf8Encoder: A?.utf8Encoder ?? t20.toUtf8
      }
    };
  e20.getRuntimeConfig = AE4
})
// @from(Start 3598297, End 3601318)
Y_ = z((wG8, Y90) => {
  var {
    create: BE4,
    defineProperty: qa,
    getOwnPropertyDescriptor: QE4,
    getOwnPropertyNames: IE4,
    getPrototypeOf: GE4
  } = Object, ZE4 = Object.prototype.hasOwnProperty, Yk1 = (A, B) => qa(A, "name", {
    value: B,
    configurable: !0
  }), DE4 = (A, B) => {
    for (var Q in B) qa(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Z90 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of IE4(B))
        if (!ZE4.call(A, G) && G !== Q) qa(A, G, {
          get: () => B[G],
          enumerable: !(I = QE4(B, G)) || I.enumerable
        })
    }
    return A
  }, YE4 = (A, B, Q) => (Q = A != null ? BE4(GE4(A)) : {}, Z90(B || !A || !A.__esModule ? qa(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q, A)), WE4 = (A) => Z90(qa({}, "__esModule", {
    value: !0
  }), A), D90 = {};
  DE4(D90, {
    resolveDefaultsModeConfig: () => EE4
  });
  Y90.exports = WE4(D90);
  var JE4 = _D(),
    Q90 = qC(),
    FE4 = $I(),
    XE4 = "AWS_EXECUTION_ENV",
    I90 = "AWS_REGION",
    G90 = "AWS_DEFAULT_REGION",
    VE4 = "AWS_EC2_METADATA_DISABLED",
    CE4 = ["in-region", "cross-region", "mobile", "standard", "legacy"],
    KE4 = "/latest/meta-data/placement/region",
    HE4 = "AWS_DEFAULTS_MODE",
    zE4 = "defaults_mode",
    wE4 = {
      environmentVariableSelector: (A) => {
        return A[HE4]
      },
      configFileSelector: (A) => {
        return A[zE4]
      },
      default: "legacy"
    },
    EE4 = Yk1(({
      region: A = Q90.loadConfig(JE4.NODE_REGION_CONFIG_OPTIONS),
      defaultsMode: B = Q90.loadConfig(wE4)
    } = {}) => FE4.memoize(async () => {
      let Q = typeof B === "function" ? await B() : B;
      switch (Q?.toLowerCase()) {
        case "auto":
          return UE4(A);
        case "in-region":
        case "cross-region":
        case "mobile":
        case "standard":
        case "legacy":
          return Promise.resolve(Q?.toLocaleLowerCase());
        case void 0:
          return Promise.resolve("legacy");
        default:
          throw new Error(`Invalid parameter for "defaultsMode", expect ${CE4.join(", ")}, got ${Q}`)
      }
    }), "resolveDefaultsModeConfig"),
    UE4 = Yk1(async (A) => {
      if (A) {
        let B = typeof A === "function" ? await A() : A,
          Q = await NE4();
        if (!Q) return "standard";
        if (B === Q) return "in-region";
        else return "cross-region"
      }
      return "standard"
    }, "resolveNodeDefaultsModeAuto"),
    NE4 = Yk1(async () => {
      if (process.env[XE4] && (process.env[I90] || process.env[G90])) return process.env[I90] ?? process.env[G90];
      if (!process.env[VE4]) try {
        let {
          getInstanceMetadataEndpoint: A,
          httpRequest: B
        } = await Promise.resolve().then(() => YE4(B_())), Q = await A();
        return (await B({
          ...Q,
          path: KE4
        })).toString()
      } catch (A) {}
    }, "inferPhysicalRegion")
})
// @from(Start 3601324, End 3603421)
C90 = z((X90) => {
  Object.defineProperty(X90, "__esModule", {
    value: !0
  });
  X90.getRuntimeConfig = void 0;
  var $E4 = k00(),
    qE4 = $E4.__importDefault(x00()),
    ME4 = IB(),
    W90 = I_(),
    HI1 = _D(),
    LE4 = G_(),
    J90 = KJ(),
    vb = qC(),
    F90 = DN(),
    RE4 = Z_(),
    OE4 = vL(),
    TE4 = B90(),
    PE4 = Na(),
    SE4 = Y_(),
    _E4 = Na(),
    jE4 = (A) => {
      _E4.emitWarningIfUnsupportedVersion(process.version);
      let B = SE4.resolveDefaultsModeConfig(A),
        Q = () => B().then(PE4.loadConfigsForDefaultMode),
        I = TE4.getRuntimeConfig(A);
      ME4.emitWarningIfUnsupportedVersion(process.version);
      let G = {
        profile: A?.profile
      };
      return {
        ...I,
        ...A,
        runtime: "node",
        defaultsMode: B,
        bodyLengthChecker: A?.bodyLengthChecker ?? RE4.calculateBodyLength,
        defaultUserAgentProvider: A?.defaultUserAgentProvider ?? W90.createDefaultUserAgentProvider({
          serviceId: I.serviceId,
          clientVersion: qE4.default.version
        }),
        maxAttempts: A?.maxAttempts ?? vb.loadConfig(J90.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
        region: A?.region ?? vb.loadConfig(HI1.NODE_REGION_CONFIG_OPTIONS, {
          ...HI1.NODE_REGION_CONFIG_FILE_OPTIONS,
          ...G
        }),
        requestHandler: F90.NodeHttpHandler.create(A?.requestHandler ?? Q),
        retryMode: A?.retryMode ?? vb.loadConfig({
          ...J90.NODE_RETRY_MODE_CONFIG_OPTIONS,
          default: async () => (await Q()).retryMode || OE4.DEFAULT_RETRY_MODE
        }, A),
        sha256: A?.sha256 ?? LE4.Hash.bind(null, "sha256"),
        streamCollector: A?.streamCollector ?? F90.streamCollector,
        useDualstackEndpoint: A?.useDualstackEndpoint ?? vb.loadConfig(HI1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, G),
        useFipsEndpoint: A?.useFipsEndpoint ?? vb.loadConfig(HI1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, G),
        userAgentAppId: A?.userAgentAppId ?? vb.loadConfig(W90.NODE_APP_ID_CONFIG_OPTIONS, G)
      }
    };
  X90.getRuntimeConfig = jE4
})
// @from(Start 3603427, End 3606037)
W_ = z((UG8, U90) => {
  var {
    defineProperty: zI1,
    getOwnPropertyDescriptor: yE4,
    getOwnPropertyNames: kE4
  } = Object, xE4 = Object.prototype.hasOwnProperty, cz = (A, B) => zI1(A, "name", {
    value: B,
    configurable: !0
  }), fE4 = (A, B) => {
    for (var Q in B) zI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, vE4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of kE4(B))
        if (!xE4.call(A, G) && G !== Q) zI1(A, G, {
          get: () => B[G],
          enumerable: !(I = yE4(B, G)) || I.enumerable
        })
    }
    return A
  }, bE4 = (A) => vE4(zI1({}, "__esModule", {
    value: !0
  }), A), H90 = {};
  fE4(H90, {
    NODE_REGION_CONFIG_FILE_OPTIONS: () => dE4,
    NODE_REGION_CONFIG_OPTIONS: () => mE4,
    REGION_ENV_NAME: () => z90,
    REGION_INI_NAME: () => w90,
    getAwsRegionExtensionConfiguration: () => gE4,
    resolveAwsRegionExtensionConfiguration: () => hE4,
    resolveRegionConfig: () => uE4
  });
  U90.exports = bE4(H90);
  var gE4 = cz((A) => {
      return {
        setRegion(B) {
          A.region = B
        },
        region() {
          return A.region
        }
      }
    }, "getAwsRegionExtensionConfiguration"),
    hE4 = cz((A) => {
      return {
        region: A.region()
      }
    }, "resolveAwsRegionExtensionConfiguration"),
    z90 = "AWS_REGION",
    w90 = "region",
    mE4 = {
      environmentVariableSelector: cz((A) => A[z90], "environmentVariableSelector"),
      configFileSelector: cz((A) => A[w90], "configFileSelector"),
      default: cz(() => {
        throw new Error("Region is missing")
      }, "default")
    },
    dE4 = {
      preferredFile: "credentials"
    },
    E90 = cz((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
    K90 = cz((A) => E90(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
    uE4 = cz((A) => {
      let {
        region: B,
        useFipsEndpoint: Q
      } = A;
      if (!B) throw new Error("Region is missing");
      return Object.assign(A, {
        region: cz(async () => {
          if (typeof B === "string") return K90(B);
          let I = await B();
          return K90(I)
        }, "region"),
        useFipsEndpoint: cz(async () => {
          let I = typeof B === "string" ? B : await B();
          if (E90(I)) return !0;
          return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
        }, "useFipsEndpoint")
      })
    }, "resolveRegionConfig")
})
// @from(Start 3606043, End 3610550)
R90 = z((NG8, L90) => {
  var {
    defineProperty: wI1,
    getOwnPropertyDescriptor: pE4,
    getOwnPropertyNames: cE4
  } = Object, lE4 = Object.prototype.hasOwnProperty, hL = (A, B) => wI1(A, "name", {
    value: B,
    configurable: !0
  }), iE4 = (A, B) => {
    for (var Q in B) wI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, nE4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of cE4(B))
        if (!lE4.call(A, G) && G !== Q) wI1(A, G, {
          get: () => B[G],
          enumerable: !(I = pE4(B, G)) || I.enumerable
        })
    }
    return A
  }, aE4 = (A) => nE4(wI1({}, "__esModule", {
    value: !0
  }), A), N90 = {};
  iE4(N90, {
    Field: () => oE4,
    Fields: () => tE4,
    HttpRequest: () => eE4,
    HttpResponse: () => AU4,
    IHttpRequest: () => $90.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => sE4,
    isValidHostname: () => M90,
    resolveHttpHandlerRuntimeConfig: () => rE4
  });
  L90.exports = aE4(N90);
  var sE4 = hL((A) => {
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
    rE4 = hL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    $90 = py1(),
    oE4 = class {
      static {
        hL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = $90.FieldPosition.HEADER,
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
    tE4 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        hL(this, "Fields")
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
    eE4 = class A {
      static {
        hL(this, "HttpRequest")
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
        if (Q.query) Q.query = q90(Q.query);
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

  function q90(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  hL(q90, "cloneQuery");
  var AU4 = class {
    static {
      hL(this, "HttpResponse")
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

  function M90(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  hL(M90, "isValidHostname")
})
// @from(Start 3610556, End 3626691)
e90 = z((LG8, t90) => {
  var {
    defineProperty: EI1,
    getOwnPropertyDescriptor: BU4,
    getOwnPropertyNames: QU4
  } = Object, IU4 = Object.prototype.hasOwnProperty, j6 = (A, B) => EI1(A, "name", {
    value: B,
    configurable: !0
  }), GU4 = (A, B) => {
    for (var Q in B) EI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, ZU4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of QU4(B))
        if (!IU4.call(A, G) && G !== Q) EI1(A, G, {
          get: () => B[G],
          enumerable: !(I = BU4(B, G)) || I.enumerable
        })
    }
    return A
  }, DU4 = (A) => ZU4(EI1({}, "__esModule", {
    value: !0
  }), A), y90 = {};
  GU4(y90, {
    GetRoleCredentialsCommand: () => s90,
    GetRoleCredentialsRequestFilterSensitiveLog: () => b90,
    GetRoleCredentialsResponseFilterSensitiveLog: () => h90,
    InvalidRequestException: () => k90,
    ListAccountRolesCommand: () => Wk1,
    ListAccountRolesRequestFilterSensitiveLog: () => m90,
    ListAccountsCommand: () => Jk1,
    ListAccountsRequestFilterSensitiveLog: () => d90,
    LogoutCommand: () => r90,
    LogoutRequestFilterSensitiveLog: () => u90,
    ResourceNotFoundException: () => x90,
    RoleCredentialsFilterSensitiveLog: () => g90,
    SSO: () => o90,
    SSOClient: () => NI1,
    SSOServiceException: () => bb,
    TooManyRequestsException: () => f90,
    UnauthorizedException: () => v90,
    __Client: () => f2.Client,
    paginateListAccountRoles: () => yU4,
    paginateListAccounts: () => kU4
  });
  t90.exports = DU4(y90);
  var O90 = cS(),
    YU4 = lS(),
    WU4 = iS(),
    T90 = jL(),
    JU4 = _D(),
    CN = NI(),
    FU4 = tS(),
    La = hz(),
    P90 = KJ(),
    S90 = gy1(),
    XU4 = j6((A) => {
      return Object.assign(A, {
        useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
        useFipsEndpoint: A.useFipsEndpoint ?? !1,
        defaultSigningName: "awsssoportal"
      })
    }, "resolveClientEndpointParameters"),
    UI1 = {
      UseFIPS: {
        type: "builtInParams",
        name: "useFipsEndpoint"
      },
      Endpoint: {
        type: "builtInParams",
        name: "endpoint"
      },
      Region: {
        type: "builtInParams",
        name: "region"
      },
      UseDualStack: {
        type: "builtInParams",
        name: "useDualstackEndpoint"
      }
    },
    VU4 = C90(),
    _90 = W_(),
    j90 = R90(),
    f2 = Na(),
    CU4 = j6((A) => {
      let {
        httpAuthSchemes: B,
        httpAuthSchemeProvider: Q,
        credentials: I
      } = A;
      return {
        setHttpAuthScheme(G) {
          let Z = B.findIndex((D) => D.schemeId === G.schemeId);
          if (Z === -1) B.push(G);
          else B.splice(Z, 1, G)
        },
        httpAuthSchemes() {
          return B
        },
        setHttpAuthSchemeProvider(G) {
          Q = G
        },
        httpAuthSchemeProvider() {
          return Q
        },
        setCredentials(G) {
          I = G
        },
        credentials() {
          return I
        }
      }
    }, "getHttpAuthExtensionConfiguration"),
    KU4 = j6((A) => {
      return {
        httpAuthSchemes: A.httpAuthSchemes(),
        httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
        credentials: A.credentials()
      }
    }, "resolveHttpAuthRuntimeConfig"),
    HU4 = j6((A, B) => {
      let Q = Object.assign(_90.getAwsRegionExtensionConfiguration(A), f2.getDefaultExtensionConfiguration(A), j90.getHttpHandlerExtensionConfiguration(A), CU4(A));
      return B.forEach((I) => I.configure(Q)), Object.assign(A, _90.resolveAwsRegionExtensionConfiguration(Q), f2.resolveDefaultRuntimeConfig(Q), j90.resolveHttpHandlerRuntimeConfig(Q), KU4(Q))
    }, "resolveRuntimeExtensions"),
    NI1 = class extends f2.Client {
      static {
        j6(this, "SSOClient")
      }
      config;
      constructor(...[A]) {
        let B = VU4.getRuntimeConfig(A || {});
        super(B);
        this.initConfig = B;
        let Q = XU4(B),
          I = T90.resolveUserAgentConfig(Q),
          G = P90.resolveRetryConfig(I),
          Z = JU4.resolveRegionConfig(G),
          D = O90.resolveHostHeaderConfig(Z),
          Y = La.resolveEndpointConfig(D),
          W = S90.resolveHttpAuthSchemeConfig(Y),
          J = HU4(W, A?.extensions || []);
        this.config = J, this.middlewareStack.use(T90.getUserAgentPlugin(this.config)), this.middlewareStack.use(P90.getRetryPlugin(this.config)), this.middlewareStack.use(FU4.getContentLengthPlugin(this.config)), this.middlewareStack.use(O90.getHostHeaderPlugin(this.config)), this.middlewareStack.use(YU4.getLoggerPlugin(this.config)), this.middlewareStack.use(WU4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(CN.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: S90.defaultSSOHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: j6(async (F) => new CN.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": F.credentials
          }), "identityProviderConfigProvider")
        })), this.middlewareStack.use(CN.getHttpSigningPlugin(this.config))
      }
      destroy() {
        super.destroy()
      }
    },
    $I1 = yz(),
    bb = class A extends f2.ServiceException {
      static {
        j6(this, "SSOServiceException")
      }
      constructor(B) {
        super(B);
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    k90 = class A extends bb {
      static {
        j6(this, "InvalidRequestException")
      }
      name = "InvalidRequestException";
      $fault = "client";
      constructor(B) {
        super({
          name: "InvalidRequestException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    x90 = class A extends bb {
      static {
        j6(this, "ResourceNotFoundException")
      }
      name = "ResourceNotFoundException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ResourceNotFoundException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    f90 = class A extends bb {
      static {
        j6(this, "TooManyRequestsException")
      }
      name = "TooManyRequestsException";
      $fault = "client";
      constructor(B) {
        super({
          name: "TooManyRequestsException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    v90 = class A extends bb {
      static {
        j6(this, "UnauthorizedException")
      }
      name = "UnauthorizedException";
      $fault = "client";
      constructor(B) {
        super({
          name: "UnauthorizedException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    b90 = j6((A) => ({
      ...A,
      ...A.accessToken && {
        accessToken: f2.SENSITIVE_STRING
      }
    }), "GetRoleCredentialsRequestFilterSensitiveLog"),
    g90 = j6((A) => ({
      ...A,
      ...A.secretAccessKey && {
        secretAccessKey: f2.SENSITIVE_STRING
      },
      ...A.sessionToken && {
        sessionToken: f2.SENSITIVE_STRING
      }
    }), "RoleCredentialsFilterSensitiveLog"),
    h90 = j6((A) => ({
      ...A,
      ...A.roleCredentials && {
        roleCredentials: g90(A.roleCredentials)
      }
    }), "GetRoleCredentialsResponseFilterSensitiveLog"),
    m90 = j6((A) => ({
      ...A,
      ...A.accessToken && {
        accessToken: f2.SENSITIVE_STRING
      }
    }), "ListAccountRolesRequestFilterSensitiveLog"),
    d90 = j6((A) => ({
      ...A,
      ...A.accessToken && {
        accessToken: f2.SENSITIVE_STRING
      }
    }), "ListAccountsRequestFilterSensitiveLog"),
    u90 = j6((A) => ({
      ...A,
      ...A.accessToken && {
        accessToken: f2.SENSITIVE_STRING
      }
    }), "LogoutRequestFilterSensitiveLog"),
    Ma = IB(),
    zU4 = j6(async (A, B) => {
      let Q = CN.requestBuilder(A, B),
        I = f2.map({}, f2.isSerializableHeaderValue, {
          [LI1]: A[MI1]
        });
      Q.bp("/federation/credentials");
      let G = f2.map({
          [_U4]: [, f2.expectNonNull(A[SU4], "roleName")],
          [c90]: [, f2.expectNonNull(A[p90], "accountId")]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_GetRoleCredentialsCommand"),
    wU4 = j6(async (A, B) => {
      let Q = CN.requestBuilder(A, B),
        I = f2.map({}, f2.isSerializableHeaderValue, {
          [LI1]: A[MI1]
        });
      Q.bp("/assignment/roles");
      let G = f2.map({
          [a90]: [, A[n90]],
          [i90]: [() => A.maxResults !== void 0, () => A[l90].toString()],
          [c90]: [, f2.expectNonNull(A[p90], "accountId")]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListAccountRolesCommand"),
    EU4 = j6(async (A, B) => {
      let Q = CN.requestBuilder(A, B),
        I = f2.map({}, f2.isSerializableHeaderValue, {
          [LI1]: A[MI1]
        });
      Q.bp("/assignment/accounts");
      let G = f2.map({
          [a90]: [, A[n90]],
          [i90]: [() => A.maxResults !== void 0, () => A[l90].toString()]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListAccountsCommand"),
    UU4 = j6(async (A, B) => {
      let Q = CN.requestBuilder(A, B),
        I = f2.map({}, f2.isSerializableHeaderValue, {
          [LI1]: A[MI1]
        });
      Q.bp("/logout");
      let G;
      return Q.m("POST").h(I).b(G), Q.build()
    }, "se_LogoutCommand"),
    NU4 = j6(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return qI1(A, B);
      let Q = f2.map({
          $metadata: mL(A)
        }),
        I = f2.expectNonNull(f2.expectObject(await Ma.parseJsonBody(A.body, B)), "body"),
        G = f2.take(I, {
          roleCredentials: f2._json
        });
      return Object.assign(Q, G), Q
    }, "de_GetRoleCredentialsCommand"),
    $U4 = j6(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return qI1(A, B);
      let Q = f2.map({
          $metadata: mL(A)
        }),
        I = f2.expectNonNull(f2.expectObject(await Ma.parseJsonBody(A.body, B)), "body"),
        G = f2.take(I, {
          nextToken: f2.expectString,
          roleList: f2._json
        });
      return Object.assign(Q, G), Q
    }, "de_ListAccountRolesCommand"),
    qU4 = j6(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return qI1(A, B);
      let Q = f2.map({
          $metadata: mL(A)
        }),
        I = f2.expectNonNull(f2.expectObject(await Ma.parseJsonBody(A.body, B)), "body"),
        G = f2.take(I, {
          accountList: f2._json,
          nextToken: f2.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListAccountsCommand"),
    MU4 = j6(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return qI1(A, B);
      let Q = f2.map({
        $metadata: mL(A)
      });
      return await f2.collectBody(A.body, B), Q
    }, "de_LogoutCommand"),
    qI1 = j6(async (A, B) => {
      let Q = {
          ...A,
          body: await Ma.parseJsonErrorBody(A.body, B)
        },
        I = Ma.loadRestJsonErrorCode(A, Q.body);
      switch (I) {
        case "InvalidRequestException":
        case "com.amazonaws.sso#InvalidRequestException":
          throw await RU4(Q, B);
        case "ResourceNotFoundException":
        case "com.amazonaws.sso#ResourceNotFoundException":
          throw await OU4(Q, B);
        case "TooManyRequestsException":
        case "com.amazonaws.sso#TooManyRequestsException":
          throw await TU4(Q, B);
        case "UnauthorizedException":
        case "com.amazonaws.sso#UnauthorizedException":
          throw await PU4(Q, B);
        default:
          let G = Q.body;
          return LU4({
            output: A,
            parsedBody: G,
            errorCode: I
          })
      }
    }, "de_CommandError"),
    LU4 = f2.withBaseException(bb),
    RU4 = j6(async (A, B) => {
      let Q = f2.map({}),
        I = A.body,
        G = f2.take(I, {
          message: f2.expectString
        });
      Object.assign(Q, G);
      let Z = new k90({
        $metadata: mL(A),
        ...Q
      });
      return f2.decorateServiceException(Z, A.body)
    }, "de_InvalidRequestExceptionRes"),
    OU4 = j6(async (A, B) => {
      let Q = f2.map({}),
        I = A.body,
        G = f2.take(I, {
          message: f2.expectString
        });
      Object.assign(Q, G);
      let Z = new x90({
        $metadata: mL(A),
        ...Q
      });
      return f2.decorateServiceException(Z, A.body)
    }, "de_ResourceNotFoundExceptionRes"),
    TU4 = j6(async (A, B) => {
      let Q = f2.map({}),
        I = A.body,
        G = f2.take(I, {
          message: f2.expectString
        });
      Object.assign(Q, G);
      let Z = new f90({
        $metadata: mL(A),
        ...Q
      });
      return f2.decorateServiceException(Z, A.body)
    }, "de_TooManyRequestsExceptionRes"),
    PU4 = j6(async (A, B) => {
      let Q = f2.map({}),
        I = A.body,
        G = f2.take(I, {
          message: f2.expectString
        });
      Object.assign(Q, G);
      let Z = new v90({
        $metadata: mL(A),
        ...Q
      });
      return f2.decorateServiceException(Z, A.body)
    }, "de_UnauthorizedExceptionRes"),
    mL = j6((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    p90 = "accountId",
    MI1 = "accessToken",
    c90 = "account_id",
    l90 = "maxResults",
    i90 = "max_result",
    n90 = "nextToken",
    a90 = "next_token",
    SU4 = "roleName",
    _U4 = "role_name",
    LI1 = "x-amz-sso_bearer_token",
    s90 = class extends f2.Command.classBuilder().ep(UI1).m(function(A, B, Q, I) {
      return [$I1.getSerdePlugin(Q, this.serialize, this.deserialize), La.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").f(b90, h90).ser(zU4).de(NU4).build() {
      static {
        j6(this, "GetRoleCredentialsCommand")
      }
    },
    Wk1 = class extends f2.Command.classBuilder().ep(UI1).m(function(A, B, Q, I) {
      return [$I1.getSerdePlugin(Q, this.serialize, this.deserialize), La.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("SWBPortalService", "ListAccountRoles", {}).n("SSOClient", "ListAccountRolesCommand").f(m90, void 0).ser(wU4).de($U4).build() {
      static {
        j6(this, "ListAccountRolesCommand")
      }
    },
    Jk1 = class extends f2.Command.classBuilder().ep(UI1).m(function(A, B, Q, I) {
      return [$I1.getSerdePlugin(Q, this.serialize, this.deserialize), La.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("SWBPortalService", "ListAccounts", {}).n("SSOClient", "ListAccountsCommand").f(d90, void 0).ser(EU4).de(qU4).build() {
      static {
        j6(this, "ListAccountsCommand")
      }
    },
    r90 = class extends f2.Command.classBuilder().ep(UI1).m(function(A, B, Q, I) {
      return [$I1.getSerdePlugin(Q, this.serialize, this.deserialize), La.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("SWBPortalService", "Logout", {}).n("SSOClient", "LogoutCommand").f(u90, void 0).ser(UU4).de(MU4).build() {
      static {
        j6(this, "LogoutCommand")
      }
    },
    jU4 = {
      GetRoleCredentialsCommand: s90,
      ListAccountRolesCommand: Wk1,
      ListAccountsCommand: Jk1,
      LogoutCommand: r90
    },
    o90 = class extends NI1 {
      static {
        j6(this, "SSO")
      }
    };
  f2.createAggregatedClient(jU4, o90);
  var yU4 = CN.createPaginator(NI1, Wk1, "nextToken", "nextToken", "maxResults"),
    kU4 = CN.createPaginator(NI1, Jk1, "nextToken", "nextToken", "maxResults")
})
// @from(Start 3626697, End 3629480)
Fk1 = z((jG8, W40) => {
  var {
    defineProperty: RI1,
    getOwnPropertyDescriptor: xU4,
    getOwnPropertyNames: fU4
  } = Object, vU4 = Object.prototype.hasOwnProperty, OI1 = (A, B) => RI1(A, "name", {
    value: B,
    configurable: !0
  }), bU4 = (A, B) => {
    for (var Q in B) RI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, gU4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of fU4(B))
        if (!vU4.call(A, G) && G !== Q) RI1(A, G, {
          get: () => B[G],
          enumerable: !(I = xU4(B, G)) || I.enumerable
        })
    }
    return A
  }, hU4 = (A) => gU4(RI1({}, "__esModule", {
    value: !0
  }), A), A40 = {};
  bU4(A40, {
    AlgorithmId: () => G40,
    EndpointURLScheme: () => I40,
    FieldPosition: () => Z40,
    HttpApiKeyAuthLocation: () => Q40,
    HttpAuthLocation: () => B40,
    IniSectionType: () => D40,
    RequestHandlerProtocol: () => Y40,
    SMITHY_CONTEXT_KEY: () => cU4,
    getDefaultClientConfiguration: () => uU4,
    resolveDefaultRuntimeConfig: () => pU4
  });
  W40.exports = hU4(A40);
  var B40 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(B40 || {}),
    Q40 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(Q40 || {}),
    I40 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(I40 || {}),
    G40 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(G40 || {}),
    mU4 = OI1((A) => {
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
    dU4 = OI1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    uU4 = OI1((A) => {
      return mU4(A)
    }, "getDefaultClientConfiguration"),
    pU4 = OI1((A) => {
      return dU4(A)
    }, "resolveDefaultRuntimeConfig"),
    Z40 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(Z40 || {}),
    cU4 = "__smithy_context",
    D40 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(D40 || {}),
    Y40 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(Y40 || {})
})
// @from(Start 3629486, End 3658023)
p3 = z((yG8, O40) => {
  var {
    defineProperty: SI1,
    getOwnPropertyDescriptor: lU4,
    getOwnPropertyNames: iU4
  } = Object, nU4 = Object.prototype.hasOwnProperty, A2 = (A, B) => SI1(A, "name", {
    value: B,
    configurable: !0
  }), aU4 = (A, B) => {
    for (var Q in B) SI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, sU4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of iU4(B))
        if (!nU4.call(A, G) && G !== Q) SI1(A, G, {
          get: () => B[G],
          enumerable: !(I = lU4(B, G)) || I.enumerable
        })
    }
    return A
  }, rU4 = (A) => sU4(SI1({}, "__esModule", {
    value: !0
  }), A), F40 = {};
  aU4(F40, {
    Client: () => oU4,
    Command: () => V40,
    LazyJsonString: () => J_,
    NoOpLogger: () => nN4,
    SENSITIVE_STRING: () => eU4,
    ServiceException: () => xN4,
    _json: () => wk1,
    collectBody: () => Xk1.collectBody,
    convertMap: () => aN4,
    createAggregatedClient: () => AN4,
    dateToUtcString: () => E40,
    decorateServiceException: () => U40,
    emitWarningIfUnsupportedVersion: () => gN4,
    expectBoolean: () => QN4,
    expectByte: () => zk1,
    expectFloat32: () => TI1,
    expectInt: () => GN4,
    expectInt32: () => Kk1,
    expectLong: () => Ta,
    expectNonNull: () => DN4,
    expectNumber: () => Oa,
    expectObject: () => C40,
    expectShort: () => Hk1,
    expectString: () => YN4,
    expectUnion: () => WN4,
    extendedEncodeURIComponent: () => Xk1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => lN4,
    getDefaultClientConfiguration: () => pN4,
    getDefaultExtensionConfiguration: () => $40,
    getValueFromTextNode: () => q40,
    handleFloat: () => XN4,
    isSerializableHeaderValue: () => iN4,
    limitedParseDouble: () => Nk1,
    limitedParseFloat: () => VN4,
    limitedParseFloat32: () => CN4,
    loadConfigsForDefaultMode: () => bN4,
    logger: () => Pa,
    map: () => qk1,
    parseBoolean: () => BN4,
    parseEpochTimestamp: () => RN4,
    parseRfc3339DateTime: () => EN4,
    parseRfc3339DateTimeWithOffset: () => NN4,
    parseRfc7231DateTime: () => LN4,
    quoteHeader: () => L40,
    resolveDefaultRuntimeConfig: () => cN4,
    resolvedPath: () => Xk1.resolvedPath,
    serializeDateTime: () => A$4,
    serializeFloat: () => eN4,
    splitEvery: () => R40,
    splitHeader: () => B$4,
    strictParseByte: () => w40,
    strictParseDouble: () => Uk1,
    strictParseFloat: () => JN4,
    strictParseFloat32: () => K40,
    strictParseInt: () => KN4,
    strictParseInt32: () => HN4,
    strictParseLong: () => z40,
    strictParseShort: () => gb,
    take: () => sN4,
    throwDefaultError: () => N40,
    withBaseException: () => fN4
  });
  O40.exports = rU4(F40);
  var X40 = WN(),
    oU4 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = X40.constructStack()
      }
      static {
        A2(this, "Client")
      }
      send(A, B, Q) {
        let I = typeof B !== "function" ? B : void 0,
          G = typeof B === "function" ? B : Q,
          Z = I === void 0 && this.config.cacheMiddleware === !0,
          D;
        if (Z) {
          if (!this.handlers) this.handlers = new WeakMap;
          let Y = this.handlers;
          if (Y.has(A.constructor)) D = Y.get(A.constructor);
          else D = A.resolveMiddleware(this.middlewareStack, this.config, I), Y.set(A.constructor, D)
        } else delete this.handlers, D = A.resolveMiddleware(this.middlewareStack, this.config, I);
        if (G) D(A).then((Y) => G(null, Y.output), (Y) => G(Y)).catch(() => {});
        else return D(A).then((Y) => Y.output)
      }
      destroy() {
        this.config?.requestHandler?.destroy?.(), delete this.handlers
      }
    },
    Xk1 = vz(),
    Ck1 = Fk1(),
    V40 = class {
      constructor() {
        this.middlewareStack = X40.constructStack()
      }
      static {
        A2(this, "Command")
      }
      static classBuilder() {
        return new tU4
      }
      resolveMiddlewareWithContext(A, B, Q, {
        middlewareFn: I,
        clientName: G,
        commandName: Z,
        inputFilterSensitiveLog: D,
        outputFilterSensitiveLog: Y,
        smithyContext: W,
        additionalContext: J,
        CommandCtor: F
      }) {
        for (let E of I.bind(this)(F, A, B, Q)) this.middlewareStack.use(E);
        let X = A.concat(this.middlewareStack),
          {
            logger: V
          } = B,
          C = {
            logger: V,
            clientName: G,
            commandName: Z,
            inputFilterSensitiveLog: D,
            outputFilterSensitiveLog: Y,
            [Ck1.SMITHY_CONTEXT_KEY]: {
              commandInstance: this,
              ...W
            },
            ...J
          },
          {
            requestHandler: K
          } = B;
        return X.resolve((E) => K.handle(E.request, Q || {}), C)
      }
    },
    tU4 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        A2(this, "ClassBuilder")
      }
      init(A) {
        this._init = A
      }
      ep(A) {
        return this._ep = A, this
      }
      m(A) {
        return this._middlewareFn = A, this
      }
      s(A, B, Q = {}) {
        return this._smithyContext = {
          service: A,
          operation: B,
          ...Q
        }, this
      }
      c(A = {}) {
        return this._additionalContext = A, this
      }
      n(A, B) {
        return this._clientName = A, this._commandName = B, this
      }
      f(A = (Q) => Q, B = (Q) => Q) {
        return this._inputFilterSensitiveLog = A, this._outputFilterSensitiveLog = B, this
      }
      ser(A) {
        return this._serializer = A, this
      }
      de(A) {
        return this._deserializer = A, this
      }
      build() {
        let A = this,
          B;
        return B = class extends V40 {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            A2(this, "CommandRef")
          }
          static getEndpointParameterInstructions() {
            return A._ep
          }
          resolveMiddleware(Q, I, G) {
            return this.resolveMiddlewareWithContext(Q, I, G, {
              CommandCtor: B,
              middlewareFn: A._middlewareFn,
              clientName: A._clientName,
              commandName: A._commandName,
              inputFilterSensitiveLog: A._inputFilterSensitiveLog,
              outputFilterSensitiveLog: A._outputFilterSensitiveLog,
              smithyContext: A._smithyContext,
              additionalContext: A._additionalContext
            })
          }
        }
      }
    },
    eU4 = "***SensitiveInformation***",
    AN4 = A2((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = A2(async function(D, Y, W) {
            let J = new I(D);
            if (typeof Y === "function") this.send(J, Y);
            else if (typeof W === "function") {
              if (typeof Y !== "object") throw new Error(`Expected http options but got ${typeof Y}`);
              this.send(J, Y || {}, W)
            } else return this.send(J, Y)
          }, "methodImpl"),
          Z = (Q[0].toLowerCase() + Q.slice(1)).replace(/Command$/, "");
        B.prototype[Z] = G
      }
    }, "createAggregatedClient"),
    BN4 = A2((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    QN4 = A2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) Pa.warn(PI1(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") Pa.warn(PI1(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    Oa = A2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) Pa.warn(PI1(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    IN4 = Math.ceil(340282346638528860000000000000000000000),
    TI1 = A2((A) => {
      let B = Oa(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > IN4) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    Ta = A2((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    GN4 = Ta,
    Kk1 = A2((A) => Ek1(A, 32), "expectInt32"),
    Hk1 = A2((A) => Ek1(A, 16), "expectShort"),
    zk1 = A2((A) => Ek1(A, 8), "expectByte"),
    Ek1 = A2((A, B) => {
      let Q = Ta(A);
      if (Q !== void 0 && ZN4(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    ZN4 = A2((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    DN4 = A2((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    C40 = A2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    YN4 = A2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return Pa.warn(PI1(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    WN4 = A2((A) => {
      if (A === null || A === void 0) return;
      let B = C40(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    Uk1 = A2((A) => {
      if (typeof A == "string") return Oa(mb(A));
      return Oa(A)
    }, "strictParseDouble"),
    JN4 = Uk1,
    K40 = A2((A) => {
      if (typeof A == "string") return TI1(mb(A));
      return TI1(A)
    }, "strictParseFloat32"),
    FN4 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    mb = A2((A) => {
      let B = A.match(FN4);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    Nk1 = A2((A) => {
      if (typeof A == "string") return H40(A);
      return Oa(A)
    }, "limitedParseDouble"),
    XN4 = Nk1,
    VN4 = Nk1,
    CN4 = A2((A) => {
      if (typeof A == "string") return H40(A);
      return TI1(A)
    }, "limitedParseFloat32"),
    H40 = A2((A) => {
      switch (A) {
        case "NaN":
          return NaN;
        case "Infinity":
          return 1 / 0;
        case "-Infinity":
          return -1 / 0;
        default:
          throw new Error(`Unable to parse float value: ${A}`)
      }
    }, "parseFloatString"),
    z40 = A2((A) => {
      if (typeof A === "string") return Ta(mb(A));
      return Ta(A)
    }, "strictParseLong"),
    KN4 = z40,
    HN4 = A2((A) => {
      if (typeof A === "string") return Kk1(mb(A));
      return Kk1(A)
    }, "strictParseInt32"),
    gb = A2((A) => {
      if (typeof A === "string") return Hk1(mb(A));
      return Hk1(A)
    }, "strictParseShort"),
    w40 = A2((A) => {
      if (typeof A === "string") return zk1(mb(A));
      return zk1(A)
    }, "strictParseByte"),
    PI1 = A2((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    Pa = {
      warn: console.warn
    },
    zN4 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    $k1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function E40(A) {
    let B = A.getUTCFullYear(),
      Q = A.getUTCMonth(),
      I = A.getUTCDay(),
      G = A.getUTCDate(),
      Z = A.getUTCHours(),
      D = A.getUTCMinutes(),
      Y = A.getUTCSeconds(),
      W = G < 10 ? `0${G}` : `${G}`,
      J = Z < 10 ? `0${Z}` : `${Z}`,
      F = D < 10 ? `0${D}` : `${D}`,
      X = Y < 10 ? `0${Y}` : `${Y}`;
    return `${zN4[I]}, ${W} ${$k1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  A2(E40, "dateToUtcString");
  var wN4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    EN4 = A2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = wN4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = gb(hb(I)), X = lz(G, "month", 1, 12), V = lz(Z, "day", 1, 31);
      return Ra(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    UN4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    NN4 = A2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = UN4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = gb(hb(I)), V = lz(G, "month", 1, 12), C = lz(Z, "day", 1, 31), K = Ra(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - kN4(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    $N4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    qN4 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    MN4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    LN4 = A2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = $N4.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Ra(gb(hb(Z)), Vk1(G), lz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = qN4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return PN4(Ra(ON4(Z), Vk1(G), lz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = MN4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Ra(gb(hb(J)), Vk1(I), lz(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    RN4 = A2((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = Uk1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    Ra = A2((A, B, Q, I) => {
      let G = B - 1;
      return _N4(A, G, Q), new Date(Date.UTC(A, G, Q, lz(I.hours, "hour", 0, 23), lz(I.minutes, "minute", 0, 59), lz(I.seconds, "seconds", 0, 60), yN4(I.fractionalMilliseconds)))
    }, "buildDate"),
    ON4 = A2((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + gb(hb(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    TN4 = 1576800000000,
    PN4 = A2((A) => {
      if (A.getTime() - new Date().getTime() > TN4) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    Vk1 = A2((A) => {
      let B = $k1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    SN4 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    _N4 = A2((A, B, Q) => {
      let I = SN4[B];
      if (B === 1 && jN4(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${$k1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    jN4 = A2((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    lz = A2((A, B, Q, I) => {
      let G = w40(hb(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    yN4 = A2((A) => {
      if (A === null || A === void 0) return 0;
      return K40("0." + A) * 1000
    }, "parseMilliseconds"),
    kN4 = A2((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    hb = A2((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    xN4 = class A extends Error {
      static {
        A2(this, "ServiceException")
      }
      constructor(B) {
        super(B.message);
        Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return A.prototype.isPrototypeOf(Q) || Boolean(Q.$fault) && Boolean(Q.$metadata) && (Q.$fault === "client" || Q.$fault === "server")
      }
      static[Symbol.hasInstance](B) {
        if (!B) return !1;
        let Q = B;
        if (this === A) return A.isInstance(B);
        if (A.isInstance(B)) {
          if (Q.name && this.name) return this.prototype.isPrototypeOf(B) || Q.name === this.name;
          return this.prototype.isPrototypeOf(B)
        }
        return !1
      }
    },
    U40 = A2((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    N40 = A2(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = vN4(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw U40(D, B)
    }, "throwDefaultError"),
    fN4 = A2((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        N40({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    vN4 = A2((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    bN4 = A2((A) => {
      switch (A) {
        case "standard":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "in-region":
          return {
            retryMode: "standard", connectionTimeout: 1100
          };
        case "cross-region":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "mobile":
          return {
            retryMode: "standard", connectionTimeout: 30000
          };
        default:
          return {}
      }
    }, "loadConfigsForDefaultMode"),
    J40 = !1,
    gN4 = A2((A) => {
      if (A && !J40 && parseInt(A.substring(1, A.indexOf("."))) < 16) J40 = !0
    }, "emitWarningIfUnsupportedVersion"),
    hN4 = A2((A) => {
      let B = [];
      for (let Q in Ck1.AlgorithmId) {
        let I = Ck1.AlgorithmId[Q];
        if (A[I] === void 0) continue;
        B.push({
          algorithmId: () => I,
          checksumConstructor: () => A[I]
        })
      }
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    mN4 = A2((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    dN4 = A2((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    uN4 = A2((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    $40 = A2((A) => {
      return Object.assign(hN4(A), dN4(A))
    }, "getDefaultExtensionConfiguration"),
    pN4 = $40,
    cN4 = A2((A) => {
      return Object.assign(mN4(A), uN4(A))
    }, "resolveDefaultRuntimeConfig"),
    lN4 = A2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    q40 = A2((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = q40(A[Q]);
      return A
    }, "getValueFromTextNode"),
    iN4 = A2((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    J_ = A2(function A(B) {
      return Object.assign(new String(B), {
        deserializeJSON() {
          return JSON.parse(String(B))
        },
        toString() {
          return String(B)
        },
        toJSON() {
          return String(B)
        }
      })
    }, "LazyJsonString");
  J_.from = (A) => {
    if (A && typeof A === "object" && (A instanceof J_ || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return J_(String(A));
    return J_(JSON.stringify(A))
  };
  J_.fromObject = J_.from;
  var nN4 = class {
    static {
      A2(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function qk1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, rN4(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      M40(I, null, Z, D)
    }
    return I
  }
  A2(qk1, "map");
  var aN4 = A2((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    sN4 = A2((A, B) => {
      let Q = {};
      for (let I in B) M40(Q, A, B, I);
      return Q
    }, "take"),
    rN4 = A2((A, B, Q) => {
      return qk1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    M40 = A2((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = oN4, W = tN4, J = I] = D;
        if (typeof Y === "function" && Y(B[J]) || typeof Y !== "function" && !!Y) A[I] = W(B[J]);
        return
      }
      let [G, Z] = Q[I];
      if (typeof Z === "function") {
        let D, Y = G === void 0 && (D = Z()) != null,
          W = typeof G === "function" && !!G(void 0) || typeof G !== "function" && !!G;
        if (Y) A[I] = D;
        else if (W) A[I] = Z()
      } else {
        let D = G === void 0 && Z != null,
          Y = typeof G === "function" && !!G(Z) || typeof G !== "function" && !!G;
        if (D || Y) A[I] = Z
      }
    }, "applyInstruction"),
    oN4 = A2((A) => A != null, "nonNullish"),
    tN4 = A2((A) => A, "pass");

  function L40(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  A2(L40, "quoteHeader");
  var eN4 = A2((A) => {
      if (A !== A) return "NaN";
      switch (A) {
        case 1 / 0:
          return "Infinity";
        case -1 / 0:
          return "-Infinity";
        default:
          return A
      }
    }, "serializeFloat"),
    A$4 = A2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    wk1 = A2((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(wk1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = wk1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function R40(A, B, Q) {
    if (Q <= 0 || !Number.isInteger(Q)) throw new Error("Invalid number of delimiters (" + Q + ") for splitEvery.");
    let I = A.split(B);
    if (Q === 1) return I;
    let G = [],
      Z = "";
    for (let D = 0; D < I.length; D++) {
      if (Z === "") Z = I[D];
      else Z += B + I[D];
      if ((D + 1) % Q === 0) G.push(Z), Z = ""
    }
    if (Z !== "") G.push(Z);
    return G
  }
  A2(R40, "splitEvery");
  var B$4 = A2((A) => {
    let B = A.length,
      Q = [],
      I = !1,
      G = void 0,
      Z = 0;
    for (let D = 0; D < B; ++D) {
      let Y = A[D];
      switch (Y) {
        case '"':
          if (G !== "\\") I = !I;
          break;
        case ",":
          if (!I) Q.push(A.slice(Z, D)), Z = D + 1;
          break;
        default:
      }
      G = Y
    }
    return Q.push(A.slice(Z)), Q.map((D) => {
      D = D.trim();
      let Y = D.length;
      if (Y < 2) return D;
      if (D[0] === '"' && D[Y - 1] === '"') D = D.slice(1, Y - 1);
      return D.replace(/\\"/g, '"')
    })
  }, "splitHeader")
})
// @from(Start 3658029, End 3659484)
Lk1 = z((T40) => {
  Object.defineProperty(T40, "__esModule", {
    value: !0
  });
  T40.resolveHttpAuthSchemeConfig = T40.defaultSSOOIDCHttpAuthSchemeProvider = T40.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
  var Q$4 = IB(),
    Mk1 = ZX(),
    I$4 = async (A, B, Q) => {
      return {
        operation: Mk1.getSmithyContext(B).operation,
        region: await Mk1.normalizeProvider(A.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
        })()
      }
    };
  T40.defaultSSOOIDCHttpAuthSchemeParametersProvider = I$4;

  function G$4(A) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "sso-oauth",
        region: A.region
      },
      propertiesExtractor: (B, Q) => ({
        signingProperties: {
          config: B,
          context: Q
        }
      })
    }
  }

  function Z$4(A) {
    return {
      schemeId: "smithy.api#noAuth"
    }
  }
  var D$4 = (A) => {
    let B = [];
    switch (A.operation) {
      case "CreateToken": {
        B.push(Z$4(A));
        break
      }
      default:
        B.push(G$4(A))
    }
    return B
  };
  T40.defaultSSOOIDCHttpAuthSchemeProvider = D$4;
  var Y$4 = (A) => {
    let B = Q$4.resolveAwsSdkSigV4Config(A);
    return Object.assign(B, {
      authSchemePreference: Mk1.normalizeProvider(A.authSchemePreference ?? [])
    })
  };
  T40.resolveHttpAuthSchemeConfig = Y$4
})