
// @from(Start 6063183, End 6090802)
fB2 = z((Rh8, xB2) => {
  var {
    defineProperty: cX1,
    getOwnPropertyDescriptor: gm6,
    getOwnPropertyNames: hm6
  } = Object, mm6 = Object.prototype.hasOwnProperty, I2 = (A, B) => cX1(A, "name", {
    value: B,
    configurable: !0
  }), dm6 = (A, B) => {
    for (var Q in B) cX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, um6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of hm6(B))
        if (!mm6.call(A, G) && G !== Q) cX1(A, G, {
          get: () => B[G],
          enumerable: !(I = gm6(B, G)) || I.enumerable
        })
    }
    return A
  }, pm6 = (A) => um6(cX1({}, "__esModule", {
    value: !0
  }), A), CB2 = {};
  dm6(CB2, {
    Client: () => lm6,
    Command: () => EB2,
    LazyJsonString: () => dd6,
    NoOpLogger: () => cm6,
    SENSITIVE_STRING: () => am6,
    ServiceException: () => Sd6,
    StringWrapper: () => Ae,
    _json: () => rn1,
    collectBody: () => im6,
    convertMap: () => ud6,
    createAggregatedClient: () => sm6,
    dateToUtcString: () => RB2,
    decorateServiceException: () => TB2,
    emitWarningIfUnsupportedVersion: () => kd6,
    expectBoolean: () => om6,
    expectByte: () => sn1,
    expectFloat32: () => dX1,
    expectInt: () => em6,
    expectInt32: () => nn1,
    expectLong: () => tt,
    expectNonNull: () => Bd6,
    expectNumber: () => ot,
    expectObject: () => NB2,
    expectShort: () => an1,
    expectString: () => Qd6,
    expectUnion: () => Id6,
    extendedEncodeURIComponent: () => pX1,
    getArrayIfSingleItem: () => md6,
    getDefaultClientConfiguration: () => gd6,
    getDefaultExtensionConfiguration: () => SB2,
    getValueFromTextNode: () => _B2,
    handleFloat: () => Dd6,
    limitedParseDouble: () => en1,
    limitedParseFloat: () => Yd6,
    limitedParseFloat32: () => Wd6,
    loadConfigsForDefaultMode: () => yd6,
    logger: () => et,
    map: () => Ba1,
    parseBoolean: () => rm6,
    parseEpochTimestamp: () => Nd6,
    parseRfc3339DateTime: () => Cd6,
    parseRfc3339DateTimeWithOffset: () => Hd6,
    parseRfc7231DateTime: () => Ud6,
    resolveDefaultRuntimeConfig: () => hd6,
    resolvedPath: () => nd6,
    serializeFloat: () => ad6,
    splitEvery: () => kB2,
    strictParseByte: () => LB2,
    strictParseDouble: () => tn1,
    strictParseFloat: () => Gd6,
    strictParseFloat32: () => $B2,
    strictParseInt: () => Jd6,
    strictParseInt32: () => Fd6,
    strictParseLong: () => MB2,
    strictParseShort: () => Zd,
    take: () => pd6,
    throwDefaultError: () => PB2,
    withBaseException: () => _d6
  });
  xB2.exports = pm6(CB2);
  var KB2 = class A {
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };
  I2(KB2, "NoOpLogger");
  var cm6 = KB2,
    HB2 = L82(),
    zB2 = class A {
      constructor(B) {
        this.middlewareStack = HB2.constructStack(), this.config = B
      }
      send(B, Q, I) {
        let G = typeof Q !== "function" ? Q : void 0,
          Z = typeof Q === "function" ? Q : I,
          D = B.resolveMiddleware(this.middlewareStack, this.config, G);
        if (Z) D(B).then((Y) => Z(null, Y.output), (Y) => Z(Y)).catch(() => {});
        else return D(B).then((Y) => Y.output)
      }
      destroy() {
        if (this.config.requestHandler.destroy) this.config.requestHandler.destroy()
      }
    };
  I2(zB2, "Client");
  var lm6 = zB2,
    cn1 = XB2(),
    im6 = I2(async (A = new Uint8Array, B) => {
      if (A instanceof Uint8Array) return cn1.Uint8ArrayBlobAdapter.mutate(A);
      if (!A) return cn1.Uint8ArrayBlobAdapter.mutate(new Uint8Array);
      let Q = B.streamCollector(A);
      return cn1.Uint8ArrayBlobAdapter.mutate(await Q)
    }, "collectBody"),
    in1 = Xn1(),
    wB2 = class A {
      constructor() {
        this.middlewareStack = HB2.constructStack()
      }
      static classBuilder() {
        return new nm6
      }
      resolveMiddlewareWithContext(B, Q, I, {
        middlewareFn: G,
        clientName: Z,
        commandName: D,
        inputFilterSensitiveLog: Y,
        outputFilterSensitiveLog: W,
        smithyContext: J,
        additionalContext: F,
        CommandCtor: X
      }) {
        for (let N of G.bind(this)(X, B, Q, I)) this.middlewareStack.use(N);
        let V = B.concat(this.middlewareStack),
          {
            logger: C
          } = Q,
          K = {
            logger: C,
            clientName: Z,
            commandName: D,
            inputFilterSensitiveLog: Y,
            outputFilterSensitiveLog: W,
            [in1.SMITHY_CONTEXT_KEY]: {
              ...J
            },
            ...F
          },
          {
            requestHandler: E
          } = Q;
        return V.resolve((N) => E.handle(N.request, I || {}), K)
      }
    };
  I2(wB2, "Command");
  var EB2 = wB2,
    UB2 = class A {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (B) => B, this._outputFilterSensitiveLog = (B) => B, this._serializer = null, this._deserializer = null
      }
      init(B) {
        this._init = B
      }
      ep(B) {
        return this._ep = B, this
      }
      m(B) {
        return this._middlewareFn = B, this
      }
      s(B, Q, I = {}) {
        return this._smithyContext = {
          service: B,
          operation: Q,
          ...I
        }, this
      }
      c(B = {}) {
        return this._additionalContext = B, this
      }
      n(B, Q) {
        return this._clientName = B, this._commandName = Q, this
      }
      f(B = (I) => I, Q = (I) => I) {
        return this._inputFilterSensitiveLog = B, this._outputFilterSensitiveLog = Q, this
      }
      ser(B) {
        return this._serializer = B, this
      }
      de(B) {
        return this._deserializer = B, this
      }
      build() {
        var B;
        let Q = this,
          I;
        return I = (B = class extends EB2 {
          constructor(...[G]) {
            super();
            this.serialize = Q._serializer, this.deserialize = Q._deserializer, this.input = G ?? {}, Q._init(this)
          }
          static getEndpointParameterInstructions() {
            return Q._ep
          }
          resolveMiddleware(G, Z, D) {
            return this.resolveMiddlewareWithContext(G, Z, D, {
              CommandCtor: I,
              middlewareFn: Q._middlewareFn,
              clientName: Q._clientName,
              commandName: Q._commandName,
              inputFilterSensitiveLog: Q._inputFilterSensitiveLog,
              outputFilterSensitiveLog: Q._outputFilterSensitiveLog,
              smithyContext: Q._smithyContext,
              additionalContext: Q._additionalContext
            })
          }
        }, I2(B, "CommandRef"), B)
      }
    };
  I2(UB2, "ClassBuilder");
  var nm6 = UB2,
    am6 = "***SensitiveInformation***",
    sm6 = I2((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = I2(async function(D, Y, W) {
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
    rm6 = I2((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    om6 = I2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) et.warn(uX1(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") et.warn(uX1(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    ot = I2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) et.warn(uX1(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    tm6 = Math.ceil(340282346638528860000000000000000000000),
    dX1 = I2((A) => {
      let B = ot(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > tm6) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    tt = I2((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    em6 = tt,
    nn1 = I2((A) => on1(A, 32), "expectInt32"),
    an1 = I2((A) => on1(A, 16), "expectShort"),
    sn1 = I2((A) => on1(A, 8), "expectByte"),
    on1 = I2((A, B) => {
      let Q = tt(A);
      if (Q !== void 0 && Ad6(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    Ad6 = I2((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    Bd6 = I2((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    NB2 = I2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    Qd6 = I2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return et.warn(uX1(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    Id6 = I2((A) => {
      if (A === null || A === void 0) return;
      let B = NB2(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    tn1 = I2((A) => {
      if (typeof A == "string") return ot(Yd(A));
      return ot(A)
    }, "strictParseDouble"),
    Gd6 = tn1,
    $B2 = I2((A) => {
      if (typeof A == "string") return dX1(Yd(A));
      return dX1(A)
    }, "strictParseFloat32"),
    Zd6 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    Yd = I2((A) => {
      let B = A.match(Zd6);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    en1 = I2((A) => {
      if (typeof A == "string") return qB2(A);
      return ot(A)
    }, "limitedParseDouble"),
    Dd6 = en1,
    Yd6 = en1,
    Wd6 = I2((A) => {
      if (typeof A == "string") return qB2(A);
      return dX1(A)
    }, "limitedParseFloat32"),
    qB2 = I2((A) => {
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
    MB2 = I2((A) => {
      if (typeof A === "string") return tt(Yd(A));
      return tt(A)
    }, "strictParseLong"),
    Jd6 = MB2,
    Fd6 = I2((A) => {
      if (typeof A === "string") return nn1(Yd(A));
      return nn1(A)
    }, "strictParseInt32"),
    Zd = I2((A) => {
      if (typeof A === "string") return an1(Yd(A));
      return an1(A)
    }, "strictParseShort"),
    LB2 = I2((A) => {
      if (typeof A === "string") return sn1(Yd(A));
      return sn1(A)
    }, "strictParseByte"),
    uX1 = I2((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    et = {
      warn: console.warn
    },
    Xd6 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Aa1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function RB2(A) {
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
    return `${Xd6[I]}, ${W} ${Aa1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  I2(RB2, "dateToUtcString");
  var Vd6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    Cd6 = I2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = Vd6.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = Zd(Dd(I)), X = uw(G, "month", 1, 12), V = uw(Z, "day", 1, 31);
      return rt(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    Kd6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    Hd6 = I2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = Kd6.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = Zd(Dd(I)), V = uw(G, "month", 1, 12), C = uw(Z, "day", 1, 31), K = rt(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - Pd6(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    zd6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    wd6 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    Ed6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    Ud6 = I2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = zd6.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return rt(Zd(Dd(Z)), ln1(G), uw(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = wd6.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Md6(rt($d6(Z), ln1(G), uw(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = Ed6.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return rt(Zd(Dd(J)), ln1(I), uw(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    Nd6 = I2((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = tn1(A);
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    rt = I2((A, B, Q, I) => {
      let G = B - 1;
      return Rd6(A, G, Q), new Date(Date.UTC(A, G, Q, uw(I.hours, "hour", 0, 23), uw(I.minutes, "minute", 0, 59), uw(I.seconds, "seconds", 0, 60), Td6(I.fractionalMilliseconds)))
    }, "buildDate"),
    $d6 = I2((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + Zd(Dd(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    qd6 = 1576800000000,
    Md6 = I2((A) => {
      if (A.getTime() - new Date().getTime() > qd6) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    ln1 = I2((A) => {
      let B = Aa1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    Ld6 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Rd6 = I2((A, B, Q) => {
      let I = Ld6[B];
      if (B === 1 && Od6(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${Aa1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    Od6 = I2((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    uw = I2((A, B, Q, I) => {
      let G = LB2(Dd(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    Td6 = I2((A) => {
      if (A === null || A === void 0) return 0;
      return $B2("0." + A) * 1000
    }, "parseMilliseconds"),
    Pd6 = I2((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    Dd = I2((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    OB2 = class A extends Error {
      constructor(B) {
        super(B.message);
        Object.setPrototypeOf(this, A.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
      }
    };
  I2(OB2, "ServiceException");
  var Sd6 = OB2,
    TB2 = I2((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    PB2 = I2(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = jd6(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: (B == null ? void 0 : B.code) || (B == null ? void 0 : B.Code) || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw TB2(D, B)
    }, "throwDefaultError"),
    _d6 = I2((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        PB2({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    jd6 = I2((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    yd6 = I2((A) => {
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
    VB2 = !1,
    kd6 = I2((A) => {
      if (A && !VB2 && parseInt(A.substring(1, A.indexOf("."))) < 14) VB2 = !0
    }, "emitWarningIfUnsupportedVersion"),
    xd6 = I2((A) => {
      let B = [];
      for (let Q in in1.AlgorithmId) {
        let I = in1.AlgorithmId[Q];
        if (A[I] === void 0) continue;
        B.push({
          algorithmId: () => I,
          checksumConstructor: () => A[I]
        })
      }
      return {
        _checksumAlgorithms: B,
        addChecksumAlgorithm(Q) {
          this._checksumAlgorithms.push(Q)
        },
        checksumAlgorithms() {
          return this._checksumAlgorithms
        }
      }
    }, "getChecksumConfiguration"),
    fd6 = I2((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    vd6 = I2((A) => {
      let B = A.retryStrategy;
      return {
        setRetryStrategy(Q) {
          B = Q
        },
        retryStrategy() {
          return B
        }
      }
    }, "getRetryConfiguration"),
    bd6 = I2((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    SB2 = I2((A) => {
      return {
        ...xd6(A),
        ...vd6(A)
      }
    }, "getDefaultExtensionConfiguration"),
    gd6 = SB2,
    hd6 = I2((A) => {
      return {
        ...fd6(A),
        ...bd6(A)
      }
    }, "resolveDefaultRuntimeConfig");

  function pX1(A) {
    return encodeURIComponent(A).replace(/[!'()*]/g, function(B) {
      return "%" + B.charCodeAt(0).toString(16).toUpperCase()
    })
  }
  I2(pX1, "extendedEncodeURIComponent");
  var md6 = I2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    _B2 = I2((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = _B2(A[Q]);
      return A
    }, "getValueFromTextNode"),
    Ae = I2(function() {
      let A = Object.getPrototypeOf(this).constructor,
        Q = new(Function.bind.apply(String, [null, ...arguments]));
      return Object.setPrototypeOf(Q, A.prototype), Q
    }, "StringWrapper");
  Ae.prototype = Object.create(String.prototype, {
    constructor: {
      value: Ae,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  });
  Object.setPrototypeOf(Ae, String);
  var jB2 = class A extends Ae {
    deserializeJSON() {
      return JSON.parse(super.toString())
    }
    toJSON() {
      return super.toString()
    }
    static fromObject(B) {
      if (B instanceof A) return B;
      else if (B instanceof String || typeof B === "string") return new A(B);
      return new A(JSON.stringify(B))
    }
  };
  I2(jB2, "LazyJsonString");
  var dd6 = jB2;

  function Ba1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, cd6(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      yB2(I, null, Z, D)
    }
    return I
  }
  I2(Ba1, "map");
  var ud6 = I2((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    pd6 = I2((A, B) => {
      let Q = {};
      for (let I in B) yB2(Q, A, B, I);
      return Q
    }, "take"),
    cd6 = I2((A, B, Q) => {
      return Ba1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    yB2 = I2((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = ld6, W = id6, J = I] = D;
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
    ld6 = I2((A) => A != null, "nonNullish"),
    id6 = I2((A) => A, "pass"),
    nd6 = I2((A, B, Q, I, G, Z) => {
      if (B != null && B[Q] !== void 0) {
        let D = I();
        if (D.length <= 0) throw new Error("Empty value provided for input HTTP label: " + Q + ".");
        A = A.replace(G, Z ? D.split("/").map((Y) => pX1(Y)).join("/") : pX1(D))
      } else throw new Error("No value provided for input HTTP label: " + Q + ".");
      return A
    }, "resolvedPath"),
    ad6 = I2((A) => {
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
    rn1 = I2((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(rn1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = rn1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function kB2(A, B, Q) {
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
  I2(kB2, "splitEvery")
})
// @from(Start 6090808, End 6093591)
lB2 = z((Th8, cB2) => {
  var {
    defineProperty: lX1,
    getOwnPropertyDescriptor: sd6,
    getOwnPropertyNames: rd6
  } = Object, od6 = Object.prototype.hasOwnProperty, iX1 = (A, B) => lX1(A, "name", {
    value: B,
    configurable: !0
  }), td6 = (A, B) => {
    for (var Q in B) lX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, ed6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of rd6(B))
        if (!od6.call(A, G) && G !== Q) lX1(A, G, {
          get: () => B[G],
          enumerable: !(I = sd6(B, G)) || I.enumerable
        })
    }
    return A
  }, Au6 = (A) => ed6(lX1({}, "__esModule", {
    value: !0
  }), A), vB2 = {};
  td6(vB2, {
    AlgorithmId: () => mB2,
    EndpointURLScheme: () => hB2,
    FieldPosition: () => dB2,
    HttpApiKeyAuthLocation: () => gB2,
    HttpAuthLocation: () => bB2,
    IniSectionType: () => uB2,
    RequestHandlerProtocol: () => pB2,
    SMITHY_CONTEXT_KEY: () => Zu6,
    getDefaultClientConfiguration: () => Iu6,
    resolveDefaultRuntimeConfig: () => Gu6
  });
  cB2.exports = Au6(vB2);
  var bB2 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(bB2 || {}),
    gB2 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(gB2 || {}),
    hB2 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(hB2 || {}),
    mB2 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(mB2 || {}),
    Bu6 = iX1((A) => {
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
    Qu6 = iX1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    Iu6 = iX1((A) => {
      return Bu6(A)
    }, "getDefaultClientConfiguration"),
    Gu6 = iX1((A) => {
      return Qu6(A)
    }, "resolveDefaultRuntimeConfig"),
    dB2 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(dB2 || {}),
    Zu6 = "__smithy_context",
    uB2 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(uB2 || {}),
    pB2 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(pB2 || {})
})
// @from(Start 6093597, End 6098104)
oB2 = z((Ph8, rB2) => {
  var {
    defineProperty: nX1,
    getOwnPropertyDescriptor: Du6,
    getOwnPropertyNames: Yu6
  } = Object, Wu6 = Object.prototype.hasOwnProperty, GO = (A, B) => nX1(A, "name", {
    value: B,
    configurable: !0
  }), Ju6 = (A, B) => {
    for (var Q in B) nX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Fu6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Yu6(B))
        if (!Wu6.call(A, G) && G !== Q) nX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Du6(B, G)) || I.enumerable
        })
    }
    return A
  }, Xu6 = (A) => Fu6(nX1({}, "__esModule", {
    value: !0
  }), A), iB2 = {};
  Ju6(iB2, {
    Field: () => Ku6,
    Fields: () => Hu6,
    HttpRequest: () => zu6,
    HttpResponse: () => wu6,
    IHttpRequest: () => nB2.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => Vu6,
    isValidHostname: () => sB2,
    resolveHttpHandlerRuntimeConfig: () => Cu6
  });
  rB2.exports = Xu6(iB2);
  var Vu6 = GO((A) => {
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
    Cu6 = GO((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    nB2 = lB2(),
    Ku6 = class {
      static {
        GO(this, "Field")
      }
      constructor({
        name: A,
        kind: B = nB2.FieldPosition.HEADER,
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
    Hu6 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        GO(this, "Fields")
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
    zu6 = class A {
      static {
        GO(this, "HttpRequest")
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
        if (Q.query) Q.query = aB2(Q.query);
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

  function aB2(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  GO(aB2, "cloneQuery");
  var wu6 = class {
    static {
      GO(this, "HttpResponse")
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

  function sB2(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  GO(sB2, "isValidHostname")
})
// @from(Start 6098110, End 6100659)
D32 = z((yh8, Z32) => {
  var {
    defineProperty: aX1,
    getOwnPropertyDescriptor: Eu6,
    getOwnPropertyNames: Uu6
  } = Object, Nu6 = Object.prototype.hasOwnProperty, Be = (A, B) => aX1(A, "name", {
    value: B,
    configurable: !0
  }), $u6 = (A, B) => {
    for (var Q in B) aX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, qu6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Uu6(B))
        if (!Nu6.call(A, G) && G !== Q) aX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Eu6(B, G)) || I.enumerable
        })
    }
    return A
  }, Mu6 = (A) => qu6(aX1({}, "__esModule", {
    value: !0
  }), A), tB2 = {};
  $u6(tB2, {
    eventStreamHandlingMiddleware: () => B32,
    eventStreamHandlingMiddlewareOptions: () => Q32,
    eventStreamHeaderMiddleware: () => I32,
    eventStreamHeaderMiddlewareOptions: () => G32,
    getEventStreamPlugin: () => Lu6,
    resolveEventStreamConfig: () => eB2
  });
  Z32.exports = Mu6(tB2);

  function eB2(A) {
    let {
      signer: B,
      signer: Q
    } = A, I = Object.assign(A, {
      eventSigner: B,
      messageSigner: Q
    }), G = I.eventStreamPayloadHandlerProvider(I);
    return Object.assign(I, {
      eventStreamPayloadHandler: G
    })
  }
  Be(eB2, "resolveEventStreamConfig");
  var A32 = oB2(),
    B32 = Be((A) => (B, Q) => async (I) => {
      let {
        request: G
      } = I;
      if (!A32.HttpRequest.isInstance(G)) return B(I);
      return A.eventStreamPayloadHandler.handle(B, I, Q)
    }, "eventStreamHandlingMiddleware"),
    Q32 = {
      tags: ["EVENT_STREAM", "SIGNATURE", "HANDLE"],
      name: "eventStreamHandlingMiddleware",
      relation: "after",
      toMiddleware: "awsAuthMiddleware",
      override: !0
    },
    I32 = Be((A) => async (B) => {
      let {
        request: Q
      } = B;
      if (!A32.HttpRequest.isInstance(Q)) return A(B);
      return Q.headers = {
        ...Q.headers,
        "content-type": "application/vnd.amazon.eventstream",
        "x-amz-content-sha256": "STREAMING-AWS4-HMAC-SHA256-EVENTS"
      }, A({
        ...B,
        request: Q
      })
    }, "eventStreamHeaderMiddleware"),
    G32 = {
      step: "build",
      tags: ["EVENT_STREAM", "HEADER", "CONTENT_TYPE", "CONTENT_SHA256"],
      name: "eventStreamHeaderMiddleware",
      override: !0
    },
    Lu6 = Be((A) => ({
      applyToStack: Be((B) => {
        B.addRelativeTo(B32(A), Q32), B.add(I32, G32)
      }, "applyToStack")
    }), "getEventStreamPlugin")
})
// @from(Start 6100665, End 6101605)
J32 = z((kh8, W32) => {
  var {
    defineProperty: sX1,
    getOwnPropertyDescriptor: Ru6,
    getOwnPropertyNames: Ou6
  } = Object, Tu6 = Object.prototype.hasOwnProperty, Pu6 = (A, B) => sX1(A, "name", {
    value: B,
    configurable: !0
  }), Su6 = (A, B) => {
    for (var Q in B) sX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, _u6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Ou6(B))
        if (!Tu6.call(A, G) && G !== Q) sX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Ru6(B, G)) || I.enumerable
        })
    }
    return A
  }, ju6 = (A) => _u6(sX1({}, "__esModule", {
    value: !0
  }), A), Y32 = {};
  Su6(Y32, {
    resolveEventStreamSerdeConfig: () => yu6
  });
  W32.exports = ju6(Y32);
  var yu6 = Pu6((A) => Object.assign(A, {
    eventStreamMarshaller: A.eventStreamSerdeProvider(A)
  }), "resolveEventStreamSerdeConfig")
})
// @from(Start 6101611, End 6102938)
Ia1 = z((F32) => {
  Object.defineProperty(F32, "__esModule", {
    value: !0
  });
  F32.resolveHttpAuthSchemeConfig = F32.defaultBedrockRuntimeHttpAuthSchemeProvider = F32.defaultBedrockRuntimeHttpAuthSchemeParametersProvider = void 0;
  var ku6 = IB(),
    Qa1 = ZX(),
    xu6 = async (A, B, Q) => {
      return {
        operation: Qa1.getSmithyContext(B).operation,
        region: await Qa1.normalizeProvider(A.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
        })()
      }
    };
  F32.defaultBedrockRuntimeHttpAuthSchemeParametersProvider = xu6;

  function fu6(A) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "bedrock",
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
  var vu6 = (A) => {
    let B = [];
    switch (A.operation) {
      default:
        B.push(fu6(A))
    }
    return B
  };
  F32.defaultBedrockRuntimeHttpAuthSchemeProvider = vu6;
  var bu6 = (A) => {
    let B = ku6.resolveAwsSdkSigV4Config(A);
    return Object.assign(B, {
      authSchemePreference: Qa1.normalizeProvider(A.authSchemePreference ?? [])
    })
  };
  F32.resolveHttpAuthSchemeConfig = bu6
})
// @from(Start 6102944, End 6120264)
m32 = z((fh8, tX1) => {
  var V32, C32, K32, H32, z32, w32, E32, U32, N32, $32, q32, M32, L32, rX1, Ga1, R32, O32, T32, Wd, P32, S32, _32, j32, y32, k32, x32, f32, v32, oX1, b32, g32, h32;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof tX1 === "object" && typeof fh8 === "object") A(Q(B, Q(fh8)));
    else A(Q(B));

    function Q(I, G) {
      if (I !== B)
        if (typeof Object.create === "function") Object.defineProperty(I, "__esModule", {
          value: !0
        });
        else I.__esModule = !0;
      return function(Z, D) {
        return I[Z] = G ? G(Z, D) : D
      }
    }
  })(function(A) {
    var B = Object.setPrototypeOf || {
      __proto__: []
    }
    instanceof Array && function(Z, D) {
      Z.__proto__ = D
    } || function(Z, D) {
      for (var Y in D)
        if (Object.prototype.hasOwnProperty.call(D, Y)) Z[Y] = D[Y]
    };
    V32 = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, C32 = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, K32 = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, H32 = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, z32 = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, w32 = function(Z, D, Y, W, J, F) {
      function X(_) {
        if (_ !== void 0 && typeof _ !== "function") throw new TypeError("Function expected");
        return _
      }
      var V = W.kind,
        C = V === "getter" ? "get" : V === "setter" ? "set" : "value",
        K = !D && Z ? W.static ? Z : Z.prototype : null,
        E = D || (K ? Object.getOwnPropertyDescriptor(K, W.name) : {}),
        N, q = !1;
      for (var O = Y.length - 1; O >= 0; O--) {
        var R = {};
        for (var T in W) R[T] = T === "access" ? {} : W[T];
        for (var T in W.access) R.access[T] = W.access[T];
        R.addInitializer = function(_) {
          if (q) throw new TypeError("Cannot add initializers after decoration has completed");
          F.push(X(_ || null))
        };
        var L = Y[O](V === "accessor" ? {
          get: E.get,
          set: E.set
        } : E[C], R);
        if (V === "accessor") {
          if (L === void 0) continue;
          if (L === null || typeof L !== "object") throw new TypeError("Object expected");
          if (N = X(L.get)) E.get = N;
          if (N = X(L.set)) E.set = N;
          if (N = X(L.init)) J.unshift(N)
        } else if (N = X(L))
          if (V === "field") J.unshift(N);
          else E[C] = N
      }
      if (K) Object.defineProperty(K, W.name, E);
      q = !0
    }, E32 = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, U32 = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, N32 = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, $32 = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, q32 = function(Z, D, Y, W) {
      function J(F) {
        return F instanceof Y ? F : new Y(function(X) {
          X(F)
        })
      }
      return new(Y || (Y = Promise))(function(F, X) {
        function V(E) {
          try {
            K(W.next(E))
          } catch (N) {
            X(N)
          }
        }

        function C(E) {
          try {
            K(W.throw(E))
          } catch (N) {
            X(N)
          }
        }

        function K(E) {
          E.done ? F(E.value) : J(E.value).then(V, C)
        }
        K((W = W.apply(Z, D || [])).next())
      })
    }, M32 = function(Z, D) {
      var Y = {
          label: 0,
          sent: function() {
            if (F[0] & 1) throw F[1];
            return F[1]
          },
          trys: [],
          ops: []
        },
        W, J, F, X = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return X.next = V(0), X.throw = V(1), X.return = V(2), typeof Symbol === "function" && (X[Symbol.iterator] = function() {
        return this
      }), X;

      function V(K) {
        return function(E) {
          return C([K, E])
        }
      }

      function C(K) {
        if (W) throw new TypeError("Generator is already executing.");
        while (X && (X = 0, K[0] && (Y = 0)), Y) try {
          if (W = 1, J && (F = K[0] & 2 ? J.return : K[0] ? J.throw || ((F = J.return) && F.call(J), 0) : J.next) && !(F = F.call(J, K[1])).done) return F;
          if (J = 0, F) K = [K[0] & 2, F.value];
          switch (K[0]) {
            case 0:
            case 1:
              F = K;
              break;
            case 4:
              return Y.label++, {
                value: K[1],
                done: !1
              };
            case 5:
              Y.label++, J = K[1], K = [0];
              continue;
            case 7:
              K = Y.ops.pop(), Y.trys.pop();
              continue;
            default:
              if ((F = Y.trys, !(F = F.length > 0 && F[F.length - 1])) && (K[0] === 6 || K[0] === 2)) {
                Y = 0;
                continue
              }
              if (K[0] === 3 && (!F || K[1] > F[0] && K[1] < F[3])) {
                Y.label = K[1];
                break
              }
              if (K[0] === 6 && Y.label < F[1]) {
                Y.label = F[1], F = K;
                break
              }
              if (F && Y.label < F[2]) {
                Y.label = F[2], Y.ops.push(K);
                break
              }
              if (F[2]) Y.ops.pop();
              Y.trys.pop();
              continue
          }
          K = D.call(Z, Y)
        } catch (E) {
          K = [6, E], J = 0
        } finally {
          W = F = 0
        }
        if (K[0] & 5) throw K[1];
        return {
          value: K[0] ? K[1] : void 0,
          done: !0
        }
      }
    }, L32 = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) oX1(D, Z, Y)
    }, oX1 = Object.create ? function(Z, D, Y, W) {
      if (W === void 0) W = Y;
      var J = Object.getOwnPropertyDescriptor(D, Y);
      if (!J || ("get" in J ? !D.__esModule : J.writable || J.configurable)) J = {
        enumerable: !0,
        get: function() {
          return D[Y]
        }
      };
      Object.defineProperty(Z, W, J)
    } : function(Z, D, Y, W) {
      if (W === void 0) W = Y;
      Z[W] = D[Y]
    }, rX1 = function(Z) {
      var D = typeof Symbol === "function" && Symbol.iterator,
        Y = D && Z[D],
        W = 0;
      if (Y) return Y.call(Z);
      if (Z && typeof Z.length === "number") return {
        next: function() {
          if (Z && W >= Z.length) Z = void 0;
          return {
            value: Z && Z[W++],
            done: !Z
          }
        }
      };
      throw new TypeError(D ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, Ga1 = function(Z, D) {
      var Y = typeof Symbol === "function" && Z[Symbol.iterator];
      if (!Y) return Z;
      var W = Y.call(Z),
        J, F = [],
        X;
      try {
        while ((D === void 0 || D-- > 0) && !(J = W.next()).done) F.push(J.value)
      } catch (V) {
        X = {
          error: V
        }
      } finally {
        try {
          if (J && !J.done && (Y = W.return)) Y.call(W)
        } finally {
          if (X) throw X.error
        }
      }
      return F
    }, R32 = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(Ga1(arguments[D]));
      return Z
    }, O32 = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, T32 = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, Wd = function(Z) {
      return this instanceof Wd ? (this.v = Z, this) : new Wd(Z)
    }, P32 = function(Z, D, Y) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var W = Y.apply(Z, D || []),
        J, F = [];
      return J = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), V("next"), V("throw"), V("return", X), J[Symbol.asyncIterator] = function() {
        return this
      }, J;

      function X(O) {
        return function(R) {
          return Promise.resolve(R).then(O, N)
        }
      }

      function V(O, R) {
        if (W[O]) {
          if (J[O] = function(T) {
              return new Promise(function(L, _) {
                F.push([O, T, L, _]) > 1 || C(O, T)
              })
            }, R) J[O] = R(J[O])
        }
      }

      function C(O, R) {
        try {
          K(W[O](R))
        } catch (T) {
          q(F[0][3], T)
        }
      }

      function K(O) {
        O.value instanceof Wd ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
      }

      function E(O) {
        C("next", O)
      }

      function N(O) {
        C("throw", O)
      }

      function q(O, R) {
        if (O(R), F.shift(), F.length) C(F[0][0], F[0][1])
      }
    }, S32 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: Wd(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, _32 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof rX1 === "function" ? rX1(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
        return this
      }, Y);

      function W(F) {
        Y[F] = Z[F] && function(X) {
          return new Promise(function(V, C) {
            X = Z[F](X), J(V, C, X.done, X.value)
          })
        }
      }

      function J(F, X, V, C) {
        Promise.resolve(C).then(function(K) {
          F({
            value: K,
            done: V
          })
        }, X)
      }
    }, j32 = function(Z, D) {
      if (Object.defineProperty) Object.defineProperty(Z, "raw", {
        value: D
      });
      else Z.raw = D;
      return Z
    };
    var Q = Object.create ? function(Z, D) {
        Object.defineProperty(Z, "default", {
          enumerable: !0,
          value: D
        })
      } : function(Z, D) {
        Z.default = D
      },
      I = function(Z) {
        return I = Object.getOwnPropertyNames || function(D) {
          var Y = [];
          for (var W in D)
            if (Object.prototype.hasOwnProperty.call(D, W)) Y[Y.length] = W;
          return Y
        }, I(Z)
      };
    y32 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") oX1(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, k32 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, x32 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, f32 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, v32 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, b32 = function(Z, D, Y) {
      if (D !== null && D !== void 0) {
        if (typeof D !== "object" && typeof D !== "function") throw new TypeError("Object expected.");
        var W, J;
        if (Y) {
          if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
          W = D[Symbol.asyncDispose]
        }
        if (W === void 0) {
          if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
          if (W = D[Symbol.dispose], Y) J = W
        }
        if (typeof W !== "function") throw new TypeError("Object not disposable.");
        if (J) W = function() {
          try {
            J.call(this)
          } catch (F) {
            return Promise.reject(F)
          }
        };
        Z.stack.push({
          value: D,
          dispose: W,
          async: Y
        })
      } else if (Y) Z.stack.push({
        async: !0
      });
      return D
    };
    var G = typeof SuppressedError === "function" ? SuppressedError : function(Z, D, Y) {
      var W = new Error(Y);
      return W.name = "SuppressedError", W.error = Z, W.suppressed = D, W
    };
    g32 = function(Z) {
      function D(F) {
        Z.error = Z.hasError ? new G(F, Z.error, "An error was suppressed during disposal.") : F, Z.hasError = !0
      }
      var Y, W = 0;

      function J() {
        while (Y = Z.stack.pop()) try {
          if (!Y.async && W === 1) return W = 0, Z.stack.push(Y), Promise.resolve().then(J);
          if (Y.dispose) {
            var F = Y.dispose.call(Y.value);
            if (Y.async) return W |= 2, Promise.resolve(F).then(J, function(X) {
              return D(X), J()
            })
          } else W |= 1
        } catch (X) {
          D(X)
        }
        if (W === 1) return Z.hasError ? Promise.reject(Z.error) : Promise.resolve();
        if (Z.hasError) throw Z.error
      }
      return J()
    }, h32 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", V32), A("__assign", C32), A("__rest", K32), A("__decorate", H32), A("__param", z32), A("__esDecorate", w32), A("__runInitializers", E32), A("__propKey", U32), A("__setFunctionName", N32), A("__metadata", $32), A("__awaiter", q32), A("__generator", M32), A("__exportStar", L32), A("__createBinding", oX1), A("__values", rX1), A("__read", Ga1), A("__spread", R32), A("__spreadArrays", O32), A("__spreadArray", T32), A("__await", Wd), A("__asyncGenerator", P32), A("__asyncDelegator", S32), A("__asyncValues", _32), A("__makeTemplateObject", j32), A("__importStar", y32), A("__importDefault", k32), A("__classPrivateFieldGet", x32), A("__classPrivateFieldSet", f32), A("__classPrivateFieldIn", v32), A("__addDisposableResource", b32), A("__disposeResources", g32), A("__rewriteRelativeImportExtension", h32)
  })
})
// @from(Start 6120270, End 6124342)
d32 = z((vh8, mu6) => {
  mu6.exports = {
    name: "@aws-sdk/client-bedrock-runtime",
    description: "AWS SDK for JavaScript Bedrock Runtime Client for Node.js, Browser and React Native",
    version: "3.797.0",
    scripts: {
      build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
      "build:cjs": "node ../../scripts/compilation/inline client-bedrock-runtime",
      "build:es": "tsc -p tsconfig.es.json",
      "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
      "build:types": "tsc -p tsconfig.types.json",
      "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
      clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
      "extract:docs": "api-extractor run --local",
      "generate:client": "node ../../scripts/generate-clients/single-service --solo bedrock-runtime"
    },
    main: "./dist-cjs/index.js",
    types: "./dist-types/index.d.ts",
    module: "./dist-es/index.js",
    sideEffects: !1,
    dependencies: {
      "@aws-crypto/sha256-browser": "5.2.0",
      "@aws-crypto/sha256-js": "5.2.0",
      "@aws-sdk/core": "3.796.0",
      "@aws-sdk/credential-provider-node": "3.797.0",
      "@aws-sdk/eventstream-handler-node": "3.775.0",
      "@aws-sdk/middleware-eventstream": "3.775.0",
      "@aws-sdk/middleware-host-header": "3.775.0",
      "@aws-sdk/middleware-logger": "3.775.0",
      "@aws-sdk/middleware-recursion-detection": "3.775.0",
      "@aws-sdk/middleware-user-agent": "3.796.0",
      "@aws-sdk/region-config-resolver": "3.775.0",
      "@aws-sdk/types": "3.775.0",
      "@aws-sdk/util-endpoints": "3.787.0",
      "@aws-sdk/util-user-agent-browser": "3.775.0",
      "@aws-sdk/util-user-agent-node": "3.796.0",
      "@smithy/config-resolver": "^4.1.0",
      "@smithy/core": "^3.2.0",
      "@smithy/eventstream-serde-browser": "^4.0.2",
      "@smithy/eventstream-serde-config-resolver": "^4.1.0",
      "@smithy/eventstream-serde-node": "^4.0.2",
      "@smithy/fetch-http-handler": "^5.0.2",
      "@smithy/hash-node": "^4.0.2",
      "@smithy/invalid-dependency": "^4.0.2",
      "@smithy/middleware-content-length": "^4.0.2",
      "@smithy/middleware-endpoint": "^4.1.0",
      "@smithy/middleware-retry": "^4.1.0",
      "@smithy/middleware-serde": "^4.0.3",
      "@smithy/middleware-stack": "^4.0.2",
      "@smithy/node-config-provider": "^4.0.2",
      "@smithy/node-http-handler": "^4.0.4",
      "@smithy/protocol-http": "^5.1.0",
      "@smithy/smithy-client": "^4.2.0",
      "@smithy/types": "^4.2.0",
      "@smithy/url-parser": "^4.0.2",
      "@smithy/util-base64": "^4.0.0",
      "@smithy/util-body-length-browser": "^4.0.0",
      "@smithy/util-body-length-node": "^4.0.0",
      "@smithy/util-defaults-mode-browser": "^4.0.8",
      "@smithy/util-defaults-mode-node": "^4.0.8",
      "@smithy/util-endpoints": "^3.0.2",
      "@smithy/util-middleware": "^4.0.2",
      "@smithy/util-retry": "^4.0.2",
      "@smithy/util-stream": "^4.2.0",
      "@smithy/util-utf8": "^4.0.0",
      "@types/uuid": "^9.0.1",
      tslib: "^2.6.2",
      uuid: "^9.0.1"
    },
    devDependencies: {
      "@tsconfig/node18": "18.2.4",
      "@types/node": "^18.19.69",
      concurrently: "7.0.0",
      "downlevel-dts": "0.10.1",
      rimraf: "3.0.2",
      typescript: "~5.2.2"
    },
    engines: {
      node: ">=18.0.0"
    },
    typesVersions: {
      "<4.0": {
        "dist-types/*": ["dist-types/ts3.4/*"]
      }
    },
    files: ["dist-*/**"],
    author: {
      name: "AWS SDK for JavaScript Team",
      url: "https://aws.amazon.com/javascript/"
    },
    license: "Apache-2.0",
    browser: {
      "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
    },
    "react-native": {
      "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
    },
    homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-bedrock-runtime",
    repository: {
      type: "git",
      url: "https://github.com/aws/aws-sdk-js-v3.git",
      directory: "clients/client-bedrock-runtime"
    }
  }
})
// @from(Start 6124348, End 6141668)
Da1 = z((bh8, BV1) => {
  var u32, p32, c32, l32, i32, n32, a32, s32, r32, o32, t32, e32, AQ2, eX1, Za1, BQ2, QQ2, IQ2, Jd, GQ2, ZQ2, DQ2, YQ2, WQ2, JQ2, FQ2, XQ2, VQ2, AV1, CQ2, KQ2, HQ2;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof BV1 === "object" && typeof bh8 === "object") A(Q(B, Q(bh8)));
    else A(Q(B));

    function Q(I, G) {
      if (I !== B)
        if (typeof Object.create === "function") Object.defineProperty(I, "__esModule", {
          value: !0
        });
        else I.__esModule = !0;
      return function(Z, D) {
        return I[Z] = G ? G(Z, D) : D
      }
    }
  })(function(A) {
    var B = Object.setPrototypeOf || {
      __proto__: []
    }
    instanceof Array && function(Z, D) {
      Z.__proto__ = D
    } || function(Z, D) {
      for (var Y in D)
        if (Object.prototype.hasOwnProperty.call(D, Y)) Z[Y] = D[Y]
    };
    u32 = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, p32 = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, c32 = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, l32 = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, i32 = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, n32 = function(Z, D, Y, W, J, F) {
      function X(_) {
        if (_ !== void 0 && typeof _ !== "function") throw new TypeError("Function expected");
        return _
      }
      var V = W.kind,
        C = V === "getter" ? "get" : V === "setter" ? "set" : "value",
        K = !D && Z ? W.static ? Z : Z.prototype : null,
        E = D || (K ? Object.getOwnPropertyDescriptor(K, W.name) : {}),
        N, q = !1;
      for (var O = Y.length - 1; O >= 0; O--) {
        var R = {};
        for (var T in W) R[T] = T === "access" ? {} : W[T];
        for (var T in W.access) R.access[T] = W.access[T];
        R.addInitializer = function(_) {
          if (q) throw new TypeError("Cannot add initializers after decoration has completed");
          F.push(X(_ || null))
        };
        var L = Y[O](V === "accessor" ? {
          get: E.get,
          set: E.set
        } : E[C], R);
        if (V === "accessor") {
          if (L === void 0) continue;
          if (L === null || typeof L !== "object") throw new TypeError("Object expected");
          if (N = X(L.get)) E.get = N;
          if (N = X(L.set)) E.set = N;
          if (N = X(L.init)) J.unshift(N)
        } else if (N = X(L))
          if (V === "field") J.unshift(N);
          else E[C] = N
      }
      if (K) Object.defineProperty(K, W.name, E);
      q = !0
    }, a32 = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, s32 = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, r32 = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, o32 = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, t32 = function(Z, D, Y, W) {
      function J(F) {
        return F instanceof Y ? F : new Y(function(X) {
          X(F)
        })
      }
      return new(Y || (Y = Promise))(function(F, X) {
        function V(E) {
          try {
            K(W.next(E))
          } catch (N) {
            X(N)
          }
        }

        function C(E) {
          try {
            K(W.throw(E))
          } catch (N) {
            X(N)
          }
        }

        function K(E) {
          E.done ? F(E.value) : J(E.value).then(V, C)
        }
        K((W = W.apply(Z, D || [])).next())
      })
    }, e32 = function(Z, D) {
      var Y = {
          label: 0,
          sent: function() {
            if (F[0] & 1) throw F[1];
            return F[1]
          },
          trys: [],
          ops: []
        },
        W, J, F, X = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return X.next = V(0), X.throw = V(1), X.return = V(2), typeof Symbol === "function" && (X[Symbol.iterator] = function() {
        return this
      }), X;

      function V(K) {
        return function(E) {
          return C([K, E])
        }
      }

      function C(K) {
        if (W) throw new TypeError("Generator is already executing.");
        while (X && (X = 0, K[0] && (Y = 0)), Y) try {
          if (W = 1, J && (F = K[0] & 2 ? J.return : K[0] ? J.throw || ((F = J.return) && F.call(J), 0) : J.next) && !(F = F.call(J, K[1])).done) return F;
          if (J = 0, F) K = [K[0] & 2, F.value];
          switch (K[0]) {
            case 0:
            case 1:
              F = K;
              break;
            case 4:
              return Y.label++, {
                value: K[1],
                done: !1
              };
            case 5:
              Y.label++, J = K[1], K = [0];
              continue;
            case 7:
              K = Y.ops.pop(), Y.trys.pop();
              continue;
            default:
              if ((F = Y.trys, !(F = F.length > 0 && F[F.length - 1])) && (K[0] === 6 || K[0] === 2)) {
                Y = 0;
                continue
              }
              if (K[0] === 3 && (!F || K[1] > F[0] && K[1] < F[3])) {
                Y.label = K[1];
                break
              }
              if (K[0] === 6 && Y.label < F[1]) {
                Y.label = F[1], F = K;
                break
              }
              if (F && Y.label < F[2]) {
                Y.label = F[2], Y.ops.push(K);
                break
              }
              if (F[2]) Y.ops.pop();
              Y.trys.pop();
              continue
          }
          K = D.call(Z, Y)
        } catch (E) {
          K = [6, E], J = 0
        } finally {
          W = F = 0
        }
        if (K[0] & 5) throw K[1];
        return {
          value: K[0] ? K[1] : void 0,
          done: !0
        }
      }
    }, AQ2 = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) AV1(D, Z, Y)
    }, AV1 = Object.create ? function(Z, D, Y, W) {
      if (W === void 0) W = Y;
      var J = Object.getOwnPropertyDescriptor(D, Y);
      if (!J || ("get" in J ? !D.__esModule : J.writable || J.configurable)) J = {
        enumerable: !0,
        get: function() {
          return D[Y]
        }
      };
      Object.defineProperty(Z, W, J)
    } : function(Z, D, Y, W) {
      if (W === void 0) W = Y;
      Z[W] = D[Y]
    }, eX1 = function(Z) {
      var D = typeof Symbol === "function" && Symbol.iterator,
        Y = D && Z[D],
        W = 0;
      if (Y) return Y.call(Z);
      if (Z && typeof Z.length === "number") return {
        next: function() {
          if (Z && W >= Z.length) Z = void 0;
          return {
            value: Z && Z[W++],
            done: !Z
          }
        }
      };
      throw new TypeError(D ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, Za1 = function(Z, D) {
      var Y = typeof Symbol === "function" && Z[Symbol.iterator];
      if (!Y) return Z;
      var W = Y.call(Z),
        J, F = [],
        X;
      try {
        while ((D === void 0 || D-- > 0) && !(J = W.next()).done) F.push(J.value)
      } catch (V) {
        X = {
          error: V
        }
      } finally {
        try {
          if (J && !J.done && (Y = W.return)) Y.call(W)
        } finally {
          if (X) throw X.error
        }
      }
      return F
    }, BQ2 = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(Za1(arguments[D]));
      return Z
    }, QQ2 = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, IQ2 = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, Jd = function(Z) {
      return this instanceof Jd ? (this.v = Z, this) : new Jd(Z)
    }, GQ2 = function(Z, D, Y) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var W = Y.apply(Z, D || []),
        J, F = [];
      return J = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), V("next"), V("throw"), V("return", X), J[Symbol.asyncIterator] = function() {
        return this
      }, J;

      function X(O) {
        return function(R) {
          return Promise.resolve(R).then(O, N)
        }
      }

      function V(O, R) {
        if (W[O]) {
          if (J[O] = function(T) {
              return new Promise(function(L, _) {
                F.push([O, T, L, _]) > 1 || C(O, T)
              })
            }, R) J[O] = R(J[O])
        }
      }

      function C(O, R) {
        try {
          K(W[O](R))
        } catch (T) {
          q(F[0][3], T)
        }
      }

      function K(O) {
        O.value instanceof Jd ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
      }

      function E(O) {
        C("next", O)
      }

      function N(O) {
        C("throw", O)
      }

      function q(O, R) {
        if (O(R), F.shift(), F.length) C(F[0][0], F[0][1])
      }
    }, ZQ2 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: Jd(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, DQ2 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof eX1 === "function" ? eX1(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
        return this
      }, Y);

      function W(F) {
        Y[F] = Z[F] && function(X) {
          return new Promise(function(V, C) {
            X = Z[F](X), J(V, C, X.done, X.value)
          })
        }
      }

      function J(F, X, V, C) {
        Promise.resolve(C).then(function(K) {
          F({
            value: K,
            done: V
          })
        }, X)
      }
    }, YQ2 = function(Z, D) {
      if (Object.defineProperty) Object.defineProperty(Z, "raw", {
        value: D
      });
      else Z.raw = D;
      return Z
    };
    var Q = Object.create ? function(Z, D) {
        Object.defineProperty(Z, "default", {
          enumerable: !0,
          value: D
        })
      } : function(Z, D) {
        Z.default = D
      },
      I = function(Z) {
        return I = Object.getOwnPropertyNames || function(D) {
          var Y = [];
          for (var W in D)
            if (Object.prototype.hasOwnProperty.call(D, W)) Y[Y.length] = W;
          return Y
        }, I(Z)
      };
    WQ2 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") AV1(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, JQ2 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, FQ2 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, XQ2 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, VQ2 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, CQ2 = function(Z, D, Y) {
      if (D !== null && D !== void 0) {
        if (typeof D !== "object" && typeof D !== "function") throw new TypeError("Object expected.");
        var W, J;
        if (Y) {
          if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
          W = D[Symbol.asyncDispose]
        }
        if (W === void 0) {
          if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
          if (W = D[Symbol.dispose], Y) J = W
        }
        if (typeof W !== "function") throw new TypeError("Object not disposable.");
        if (J) W = function() {
          try {
            J.call(this)
          } catch (F) {
            return Promise.reject(F)
          }
        };
        Z.stack.push({
          value: D,
          dispose: W,
          async: Y
        })
      } else if (Y) Z.stack.push({
        async: !0
      });
      return D
    };
    var G = typeof SuppressedError === "function" ? SuppressedError : function(Z, D, Y) {
      var W = new Error(Y);
      return W.name = "SuppressedError", W.error = Z, W.suppressed = D, W
    };
    KQ2 = function(Z) {
      function D(F) {
        Z.error = Z.hasError ? new G(F, Z.error, "An error was suppressed during disposal.") : F, Z.hasError = !0
      }
      var Y, W = 0;

      function J() {
        while (Y = Z.stack.pop()) try {
          if (!Y.async && W === 1) return W = 0, Z.stack.push(Y), Promise.resolve().then(J);
          if (Y.dispose) {
            var F = Y.dispose.call(Y.value);
            if (Y.async) return W |= 2, Promise.resolve(F).then(J, function(X) {
              return D(X), J()
            })
          } else W |= 1
        } catch (X) {
          D(X)
        }
        if (W === 1) return Z.hasError ? Promise.reject(Z.error) : Promise.resolve();
        if (Z.hasError) throw Z.error
      }
      return J()
    }, HQ2 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", u32), A("__assign", p32), A("__rest", c32), A("__decorate", l32), A("__param", i32), A("__esDecorate", n32), A("__runInitializers", a32), A("__propKey", s32), A("__setFunctionName", r32), A("__metadata", o32), A("__awaiter", t32), A("__generator", e32), A("__exportStar", AQ2), A("__createBinding", AV1), A("__values", eX1), A("__read", Za1), A("__spread", BQ2), A("__spreadArrays", QQ2), A("__spreadArray", IQ2), A("__await", Jd), A("__asyncGenerator", GQ2), A("__asyncDelegator", ZQ2), A("__asyncValues", DQ2), A("__makeTemplateObject", YQ2), A("__importStar", WQ2), A("__importDefault", JQ2), A("__classPrivateFieldGet", FQ2), A("__classPrivateFieldSet", XQ2), A("__classPrivateFieldIn", VQ2), A("__addDisposableResource", CQ2), A("__disposeResources", KQ2), A("__rewriteRelativeImportExtension", HQ2)
  })
})
// @from(Start 6141674, End 6142627)
EQ2 = z((gh8, wQ2) => {
  var {
    defineProperty: QV1,
    getOwnPropertyDescriptor: du6,
    getOwnPropertyNames: uu6
  } = Object, pu6 = Object.prototype.hasOwnProperty, cu6 = (A, B) => QV1(A, "name", {
    value: B,
    configurable: !0
  }), lu6 = (A, B) => {
    for (var Q in B) QV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, iu6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of uu6(B))
        if (!pu6.call(A, G) && G !== Q) QV1(A, G, {
          get: () => B[G],
          enumerable: !(I = du6(B, G)) || I.enumerable
        })
    }
    return A
  }, nu6 = (A) => iu6(QV1({}, "__esModule", {
    value: !0
  }), A), zQ2 = {};
  lu6(zQ2, {
    isArrayBuffer: () => au6
  });
  wQ2.exports = nu6(zQ2);
  var au6 = cu6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
})
// @from(Start 6142633, End 6143982)
qQ2 = z((hh8, $Q2) => {
  var {
    defineProperty: IV1,
    getOwnPropertyDescriptor: su6,
    getOwnPropertyNames: ru6
  } = Object, ou6 = Object.prototype.hasOwnProperty, UQ2 = (A, B) => IV1(A, "name", {
    value: B,
    configurable: !0
  }), tu6 = (A, B) => {
    for (var Q in B) IV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, eu6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of ru6(B))
        if (!ou6.call(A, G) && G !== Q) IV1(A, G, {
          get: () => B[G],
          enumerable: !(I = su6(B, G)) || I.enumerable
        })
    }
    return A
  }, Ap6 = (A) => eu6(IV1({}, "__esModule", {
    value: !0
  }), A), NQ2 = {};
  tu6(NQ2, {
    fromArrayBuffer: () => Qp6,
    fromString: () => Ip6
  });
  $Q2.exports = Ap6(NQ2);
  var Bp6 = EQ2(),
    Ya1 = Z1("buffer"),
    Qp6 = UQ2((A, B = 0, Q = A.byteLength - B) => {
      if (!Bp6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
      return Ya1.Buffer.from(A, B, Q)
    }, "fromArrayBuffer"),
    Ip6 = UQ2((A, B) => {
      if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
      return B ? Ya1.Buffer.from(A, B) : Ya1.Buffer.from(A)
    }, "fromString")
})
// @from(Start 6143988, End 6145645)
TQ2 = z((mh8, OQ2) => {
  var {
    defineProperty: GV1,
    getOwnPropertyDescriptor: Gp6,
    getOwnPropertyNames: Zp6
  } = Object, Dp6 = Object.prototype.hasOwnProperty, Wa1 = (A, B) => GV1(A, "name", {
    value: B,
    configurable: !0
  }), Yp6 = (A, B) => {
    for (var Q in B) GV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Wp6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Zp6(B))
        if (!Dp6.call(A, G) && G !== Q) GV1(A, G, {
          get: () => B[G],
          enumerable: !(I = Gp6(B, G)) || I.enumerable
        })
    }
    return A
  }, Jp6 = (A) => Wp6(GV1({}, "__esModule", {
    value: !0
  }), A), MQ2 = {};
  Yp6(MQ2, {
    fromUtf8: () => RQ2,
    toUint8Array: () => Fp6,
    toUtf8: () => Xp6
  });
  OQ2.exports = Jp6(MQ2);
  var LQ2 = qQ2(),
    RQ2 = Wa1((A) => {
      let B = LQ2.fromString(A, "utf8");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
    }, "fromUtf8"),
    Fp6 = Wa1((A) => {
      if (typeof A === "string") return RQ2(A);
      if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      return new Uint8Array(A)
    }, "toUint8Array"),
    Xp6 = Wa1((A) => {
      if (typeof A === "string") return A;
      if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      return LQ2.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
    }, "toUtf8")
})
// @from(Start 6145651, End 6146211)
_Q2 = z((PQ2) => {
  Object.defineProperty(PQ2, "__esModule", {
    value: !0
  });
  PQ2.convertToBuffer = void 0;
  var Vp6 = TQ2(),
    Cp6 = typeof Buffer !== "undefined" && Buffer.from ? function(A) {
      return Buffer.from(A, "utf8")
    } : Vp6.fromUtf8;

  function Kp6(A) {
    if (A instanceof Uint8Array) return A;
    if (typeof A === "string") return Cp6(A);
    if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    return new Uint8Array(A)
  }
  PQ2.convertToBuffer = Kp6
})
// @from(Start 6146217, End 6146464)
kQ2 = z((jQ2) => {
  Object.defineProperty(jQ2, "__esModule", {
    value: !0
  });
  jQ2.isEmptyData = void 0;

  function Hp6(A) {
    if (typeof A === "string") return A.length === 0;
    return A.byteLength === 0
  }
  jQ2.isEmptyData = Hp6
})
// @from(Start 6146470, End 6146732)
vQ2 = z((xQ2) => {
  Object.defineProperty(xQ2, "__esModule", {
    value: !0
  });
  xQ2.numToUint8 = void 0;

  function zp6(A) {
    return new Uint8Array([(A & 4278190080) >> 24, (A & 16711680) >> 16, (A & 65280) >> 8, A & 255])
  }
  xQ2.numToUint8 = zp6
})
// @from(Start 6146738, End 6147094)
hQ2 = z((bQ2) => {
  Object.defineProperty(bQ2, "__esModule", {
    value: !0
  });
  bQ2.uint32ArrayFrom = void 0;

  function wp6(A) {
    if (!Uint32Array.from) {
      var B = new Uint32Array(A.length),
        Q = 0;
      while (Q < A.length) B[Q] = A[Q], Q += 1;
      return B
    }
    return Uint32Array.from(A)
  }
  bQ2.uint32ArrayFrom = wp6
})
// @from(Start 6147100, End 6147870)
Ja1 = z((Fd) => {
  Object.defineProperty(Fd, "__esModule", {
    value: !0
  });
  Fd.uint32ArrayFrom = Fd.numToUint8 = Fd.isEmptyData = Fd.convertToBuffer = void 0;
  var Ep6 = _Q2();
  Object.defineProperty(Fd, "convertToBuffer", {
    enumerable: !0,
    get: function() {
      return Ep6.convertToBuffer
    }
  });
  var Up6 = kQ2();
  Object.defineProperty(Fd, "isEmptyData", {
    enumerable: !0,
    get: function() {
      return Up6.isEmptyData
    }
  });
  var Np6 = vQ2();
  Object.defineProperty(Fd, "numToUint8", {
    enumerable: !0,
    get: function() {
      return Np6.numToUint8
    }
  });
  var $p6 = hQ2();
  Object.defineProperty(Fd, "uint32ArrayFrom", {
    enumerable: !0,
    get: function() {
      return $p6.uint32ArrayFrom
    }
  })
})
// @from(Start 6147876, End 6148627)
cQ2 = z((uQ2) => {
  Object.defineProperty(uQ2, "__esModule", {
    value: !0
  });
  uQ2.AwsCrc32 = void 0;
  var mQ2 = Da1(),
    Fa1 = Ja1(),
    dQ2 = ZV1(),
    Mp6 = function() {
      function A() {
        this.crc32 = new dQ2.Crc32
      }
      return A.prototype.update = function(B) {
        if (Fa1.isEmptyData(B)) return;
        this.crc32.update(Fa1.convertToBuffer(B))
      }, A.prototype.digest = function() {
        return mQ2.__awaiter(this, void 0, void 0, function() {
          return mQ2.__generator(this, function(B) {
            return [2, Fa1.numToUint8(this.crc32.digest())]
          })
        })
      }, A.prototype.reset = function() {
        this.crc32 = new dQ2.Crc32
      }, A
    }();
  uQ2.AwsCrc32 = Mp6
})
// @from(Start 6148633, End 6152788)
ZV1 = z((Xa1) => {
  Object.defineProperty(Xa1, "__esModule", {
    value: !0
  });
  Xa1.AwsCrc32 = Xa1.Crc32 = Xa1.crc32 = void 0;
  var Lp6 = Da1(),
    Rp6 = Ja1();

  function Op6(A) {
    return new lQ2().update(A).digest()
  }
  Xa1.crc32 = Op6;
  var lQ2 = function() {
    function A() {
      this.checksum = 4294967295
    }
    return A.prototype.update = function(B) {
      var Q, I;
      try {
        for (var G = Lp6.__values(B), Z = G.next(); !Z.done; Z = G.next()) {
          var D = Z.value;
          this.checksum = this.checksum >>> 8 ^ Pp6[(this.checksum ^ D) & 255]
        }
      } catch (Y) {
        Q = {
          error: Y
        }
      } finally {
        try {
          if (Z && !Z.done && (I = G.return)) I.call(G)
        } finally {
          if (Q) throw Q.error
        }
      }
      return this
    }, A.prototype.digest = function() {
      return (this.checksum ^ 4294967295) >>> 0
    }, A
  }();
  Xa1.Crc32 = lQ2;
  var Tp6 = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
    Pp6 = Rp6.uint32ArrayFrom(Tp6),
    Sp6 = cQ2();
  Object.defineProperty(Xa1, "AwsCrc32", {
    enumerable: !0,
    get: function() {
      return Sp6.AwsCrc32
    }
  })
})