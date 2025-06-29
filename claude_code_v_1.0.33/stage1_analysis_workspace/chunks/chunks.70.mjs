
// @from(Start 7180703, End 7228068)
le = z((Ci8, TC2) => {
  var Q55 = $C2(),
    T8 = BK1(),
    Iy = MC2(),
    B0 = QK1(),
    r1 = T8.CODE_POINTS,
    By = T8.CODE_POINT_SEQUENCES,
    I55 = {
      128: 8364,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      142: 381,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      158: 382,
      159: 376
    };

  function RB(A) {
    return A === r1.SPACE || A === r1.LINE_FEED || A === r1.TABULATION || A === r1.FORM_FEED
  }

  function ce(A) {
    return A >= r1.DIGIT_0 && A <= r1.DIGIT_9
  }

  function _K(A) {
    return A >= r1.LATIN_CAPITAL_A && A <= r1.LATIN_CAPITAL_Z
  }

  function Qy(A) {
    return A >= r1.LATIN_SMALL_A && A <= r1.LATIN_SMALL_Z
  }

  function OO(A) {
    return Qy(A) || _K(A)
  }

  function qo1(A) {
    return OO(A) || ce(A)
  }

  function RC2(A) {
    return A >= r1.LATIN_CAPITAL_A && A <= r1.LATIN_CAPITAL_F
  }

  function OC2(A) {
    return A >= r1.LATIN_SMALL_A && A <= r1.LATIN_SMALL_F
  }

  function G55(A) {
    return ce(A) || RC2(A) || OC2(A)
  }

  function IK1(A) {
    return A + 32
  }

  function o3(A) {
    if (A <= 65535) return String.fromCharCode(A);
    return A -= 65536, String.fromCharCode(A >>> 10 & 1023 | 55296) + String.fromCharCode(56320 | A & 1023)
  }

  function RO(A) {
    return String.fromCharCode(IK1(A))
  }

  function LC2(A, B) {
    let Q = Iy[++A],
      I = ++A,
      G = I + Q - 1;
    while (I <= G) {
      let Z = I + G >>> 1,
        D = Iy[Z];
      if (D < B) I = Z + 1;
      else if (D > B) G = Z - 1;
      else return Iy[Z + Q]
    }
    return -1
  }
  class JB {
    constructor() {
      this.preprocessor = new Q55, this.tokenQueue = [], this.allowCDATA = !1, this.state = "DATA_STATE", this.returnState = "", this.charRefCode = -1, this.tempBuff = [], this.lastStartTagName = "", this.consumedAfterSnapshot = -1, this.active = !1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = null
    }
    _err() {}
    _errOnNextCodePoint(A) {
      this._consume(), this._err(A), this._unconsume()
    }
    getNextToken() {
      while (!this.tokenQueue.length && this.active) {
        this.consumedAfterSnapshot = 0;
        let A = this._consume();
        if (!this._ensureHibernation()) this[this.state](A)
      }
      return this.tokenQueue.shift()
    }
    write(A, B) {
      this.active = !0, this.preprocessor.write(A, B)
    }
    insertHtmlAtCurrentPos(A) {
      this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(A)
    }
    _ensureHibernation() {
      if (this.preprocessor.endOfChunkHit) {
        for (; this.consumedAfterSnapshot > 0; this.consumedAfterSnapshot--) this.preprocessor.retreat();
        return this.active = !1, this.tokenQueue.push({
          type: JB.HIBERNATION_TOKEN
        }), !0
      }
      return !1
    }
    _consume() {
      return this.consumedAfterSnapshot++, this.preprocessor.advance()
    }
    _unconsume() {
      this.consumedAfterSnapshot--, this.preprocessor.retreat()
    }
    _reconsumeInState(A) {
      this.state = A, this._unconsume()
    }
    _consumeSequenceIfMatch(A, B, Q) {
      let I = 0,
        G = !0,
        Z = A.length,
        D = 0,
        Y = B,
        W = void 0;
      for (; D < Z; D++) {
        if (D > 0) Y = this._consume(), I++;
        if (Y === r1.EOF) {
          G = !1;
          break
        }
        if (W = A[D], Y !== W && (Q || Y !== IK1(W))) {
          G = !1;
          break
        }
      }
      if (!G)
        while (I--) this._unconsume();
      return G
    }
    _isTempBufferEqualToScriptString() {
      if (this.tempBuff.length !== By.SCRIPT_STRING.length) return !1;
      for (let A = 0; A < this.tempBuff.length; A++)
        if (this.tempBuff[A] !== By.SCRIPT_STRING[A]) return !1;
      return !0
    }
    _createStartTagToken() {
      this.currentToken = {
        type: JB.START_TAG_TOKEN,
        tagName: "",
        selfClosing: !1,
        ackSelfClosing: !1,
        attrs: []
      }
    }
    _createEndTagToken() {
      this.currentToken = {
        type: JB.END_TAG_TOKEN,
        tagName: "",
        selfClosing: !1,
        attrs: []
      }
    }
    _createCommentToken() {
      this.currentToken = {
        type: JB.COMMENT_TOKEN,
        data: ""
      }
    }
    _createDoctypeToken(A) {
      this.currentToken = {
        type: JB.DOCTYPE_TOKEN,
        name: A,
        forceQuirks: !1,
        publicId: null,
        systemId: null
      }
    }
    _createCharacterToken(A, B) {
      this.currentCharacterToken = {
        type: A,
        chars: B
      }
    }
    _createEOFToken() {
      this.currentToken = {
        type: JB.EOF_TOKEN
      }
    }
    _createAttr(A) {
      this.currentAttr = {
        name: A,
        value: ""
      }
    }
    _leaveAttrName(A) {
      if (JB.getTokenAttr(this.currentToken, this.currentAttr.name) === null) this.currentToken.attrs.push(this.currentAttr);
      else this._err(B0.duplicateAttribute);
      this.state = A
    }
    _leaveAttrValue(A) {
      this.state = A
    }
    _emitCurrentToken() {
      this._emitCurrentCharacterToken();
      let A = this.currentToken;
      if (this.currentToken = null, A.type === JB.START_TAG_TOKEN) this.lastStartTagName = A.tagName;
      else if (A.type === JB.END_TAG_TOKEN) {
        if (A.attrs.length > 0) this._err(B0.endTagWithAttributes);
        if (A.selfClosing) this._err(B0.endTagWithTrailingSolidus)
      }
      this.tokenQueue.push(A)
    }
    _emitCurrentCharacterToken() {
      if (this.currentCharacterToken) this.tokenQueue.push(this.currentCharacterToken), this.currentCharacterToken = null
    }
    _emitEOFToken() {
      this._createEOFToken(), this._emitCurrentToken()
    }
    _appendCharToCurrentCharacterToken(A, B) {
      if (this.currentCharacterToken && this.currentCharacterToken.type !== A) this._emitCurrentCharacterToken();
      if (this.currentCharacterToken) this.currentCharacterToken.chars += B;
      else this._createCharacterToken(A, B)
    }
    _emitCodePoint(A) {
      let B = JB.CHARACTER_TOKEN;
      if (RB(A)) B = JB.WHITESPACE_CHARACTER_TOKEN;
      else if (A === r1.NULL) B = JB.NULL_CHARACTER_TOKEN;
      this._appendCharToCurrentCharacterToken(B, o3(A))
    }
    _emitSeveralCodePoints(A) {
      for (let B = 0; B < A.length; B++) this._emitCodePoint(A[B])
    }
    _emitChars(A) {
      this._appendCharToCurrentCharacterToken(JB.CHARACTER_TOKEN, A)
    }
    _matchNamedCharacterReference(A) {
      let B = null,
        Q = 1,
        I = LC2(0, A);
      this.tempBuff.push(A);
      while (I > -1) {
        let G = Iy[I],
          Z = G < 7;
        if (Z && G & 1) B = G & 2 ? [Iy[++I], Iy[++I]] : [Iy[++I]], Q = 0;
        let Y = this._consume();
        if (this.tempBuff.push(Y), Q++, Y === r1.EOF) break;
        if (Z) I = G & 4 ? LC2(I, Y) : -1;
        else I = Y === G ? ++I : -1
      }
      while (Q--) this.tempBuff.pop(), this._unconsume();
      return B
    }
    _isCharacterReferenceInAttribute() {
      return this.returnState === "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE" || this.returnState === "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE" || this.returnState === "ATTRIBUTE_VALUE_UNQUOTED_STATE"
    }
    _isCharacterReferenceAttributeQuirk(A) {
      if (!A && this._isCharacterReferenceInAttribute()) {
        let B = this._consume();
        return this._unconsume(), B === r1.EQUALS_SIGN || qo1(B)
      }
      return !1
    }
    _flushCodePointsConsumedAsCharacterReference() {
      if (this._isCharacterReferenceInAttribute())
        for (let A = 0; A < this.tempBuff.length; A++) this.currentAttr.value += o3(this.tempBuff[A]);
      else this._emitSeveralCodePoints(this.tempBuff);
      this.tempBuff = []
    } ["DATA_STATE"](A) {
      if (this.preprocessor.dropParsedChunk(), A === r1.LESS_THAN_SIGN) this.state = "TAG_OPEN_STATE";
      else if (A === r1.AMPERSAND) this.returnState = "DATA_STATE", this.state = "CHARACTER_REFERENCE_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._emitCodePoint(A);
      else if (A === r1.EOF) this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["RCDATA_STATE"](A) {
      if (this.preprocessor.dropParsedChunk(), A === r1.AMPERSAND) this.returnState = "RCDATA_STATE", this.state = "CHARACTER_REFERENCE_STATE";
      else if (A === r1.LESS_THAN_SIGN) this.state = "RCDATA_LESS_THAN_SIGN_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["RAWTEXT_STATE"](A) {
      if (this.preprocessor.dropParsedChunk(), A === r1.LESS_THAN_SIGN) this.state = "RAWTEXT_LESS_THAN_SIGN_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["SCRIPT_DATA_STATE"](A) {
      if (this.preprocessor.dropParsedChunk(), A === r1.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_LESS_THAN_SIGN_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["PLAINTEXT_STATE"](A) {
      if (this.preprocessor.dropParsedChunk(), A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["TAG_OPEN_STATE"](A) {
      if (A === r1.EXCLAMATION_MARK) this.state = "MARKUP_DECLARATION_OPEN_STATE";
      else if (A === r1.SOLIDUS) this.state = "END_TAG_OPEN_STATE";
      else if (OO(A)) this._createStartTagToken(), this._reconsumeInState("TAG_NAME_STATE");
      else if (A === r1.QUESTION_MARK) this._err(B0.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(), this._reconsumeInState("BOGUS_COMMENT_STATE");
      else if (A === r1.EOF) this._err(B0.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
      else this._err(B0.invalidFirstCharacterOfTagName), this._emitChars("<"), this._reconsumeInState("DATA_STATE")
    } ["END_TAG_OPEN_STATE"](A) {
      if (OO(A)) this._createEndTagToken(), this._reconsumeInState("TAG_NAME_STATE");
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.missingEndTagName), this.state = "DATA_STATE";
      else if (A === r1.EOF) this._err(B0.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
      else this._err(B0.invalidFirstCharacterOfTagName), this._createCommentToken(), this._reconsumeInState("BOGUS_COMMENT_STATE")
    } ["TAG_NAME_STATE"](A) {
      if (RB(A)) this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
      else if (A === r1.SOLIDUS) this.state = "SELF_CLOSING_START_TAG_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
      else if (_K(A)) this.currentToken.tagName += RO(A);
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.tagName += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.EOF) this._err(B0.eofInTag), this._emitEOFToken();
      else this.currentToken.tagName += o3(A)
    } ["RCDATA_LESS_THAN_SIGN_STATE"](A) {
      if (A === r1.SOLIDUS) this.tempBuff = [], this.state = "RCDATA_END_TAG_OPEN_STATE";
      else this._emitChars("<"), this._reconsumeInState("RCDATA_STATE")
    } ["RCDATA_END_TAG_OPEN_STATE"](A) {
      if (OO(A)) this._createEndTagToken(), this._reconsumeInState("RCDATA_END_TAG_NAME_STATE");
      else this._emitChars("</"), this._reconsumeInState("RCDATA_STATE")
    } ["RCDATA_END_TAG_NAME_STATE"](A) {
      if (_K(A)) this.currentToken.tagName += RO(A), this.tempBuff.push(A);
      else if (Qy(A)) this.currentToken.tagName += o3(A), this.tempBuff.push(A);
      else {
        if (this.lastStartTagName === this.currentToken.tagName) {
          if (RB(A)) {
            this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
            return
          }
          if (A === r1.SOLIDUS) {
            this.state = "SELF_CLOSING_START_TAG_STATE";
            return
          }
          if (A === r1.GREATER_THAN_SIGN) {
            this.state = "DATA_STATE", this._emitCurrentToken();
            return
          }
        }
        this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("RCDATA_STATE")
      }
    } ["RAWTEXT_LESS_THAN_SIGN_STATE"](A) {
      if (A === r1.SOLIDUS) this.tempBuff = [], this.state = "RAWTEXT_END_TAG_OPEN_STATE";
      else this._emitChars("<"), this._reconsumeInState("RAWTEXT_STATE")
    } ["RAWTEXT_END_TAG_OPEN_STATE"](A) {
      if (OO(A)) this._createEndTagToken(), this._reconsumeInState("RAWTEXT_END_TAG_NAME_STATE");
      else this._emitChars("</"), this._reconsumeInState("RAWTEXT_STATE")
    } ["RAWTEXT_END_TAG_NAME_STATE"](A) {
      if (_K(A)) this.currentToken.tagName += RO(A), this.tempBuff.push(A);
      else if (Qy(A)) this.currentToken.tagName += o3(A), this.tempBuff.push(A);
      else {
        if (this.lastStartTagName === this.currentToken.tagName) {
          if (RB(A)) {
            this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
            return
          }
          if (A === r1.SOLIDUS) {
            this.state = "SELF_CLOSING_START_TAG_STATE";
            return
          }
          if (A === r1.GREATER_THAN_SIGN) {
            this._emitCurrentToken(), this.state = "DATA_STATE";
            return
          }
        }
        this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("RAWTEXT_STATE")
      }
    } ["SCRIPT_DATA_LESS_THAN_SIGN_STATE"](A) {
      if (A === r1.SOLIDUS) this.tempBuff = [], this.state = "SCRIPT_DATA_END_TAG_OPEN_STATE";
      else if (A === r1.EXCLAMATION_MARK) this.state = "SCRIPT_DATA_ESCAPE_START_STATE", this._emitChars("<!");
      else this._emitChars("<"), this._reconsumeInState("SCRIPT_DATA_STATE")
    } ["SCRIPT_DATA_END_TAG_OPEN_STATE"](A) {
      if (OO(A)) this._createEndTagToken(), this._reconsumeInState("SCRIPT_DATA_END_TAG_NAME_STATE");
      else this._emitChars("</"), this._reconsumeInState("SCRIPT_DATA_STATE")
    } ["SCRIPT_DATA_END_TAG_NAME_STATE"](A) {
      if (_K(A)) this.currentToken.tagName += RO(A), this.tempBuff.push(A);
      else if (Qy(A)) this.currentToken.tagName += o3(A), this.tempBuff.push(A);
      else {
        if (this.lastStartTagName === this.currentToken.tagName) {
          if (RB(A)) {
            this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
            return
          } else if (A === r1.SOLIDUS) {
            this.state = "SELF_CLOSING_START_TAG_STATE";
            return
          } else if (A === r1.GREATER_THAN_SIGN) {
            this._emitCurrentToken(), this.state = "DATA_STATE";
            return
          }
        }
        this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("SCRIPT_DATA_STATE")
      }
    } ["SCRIPT_DATA_ESCAPE_START_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPE_START_DASH_STATE", this._emitChars("-");
      else this._reconsumeInState("SCRIPT_DATA_STATE")
    } ["SCRIPT_DATA_ESCAPE_START_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPED_DASH_DASH_STATE", this._emitChars("-");
      else this._reconsumeInState("SCRIPT_DATA_STATE")
    } ["SCRIPT_DATA_ESCAPED_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPED_DASH_STATE", this._emitChars("-");
      else if (A === r1.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._err(B0.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["SCRIPT_DATA_ESCAPED_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPED_DASH_DASH_STATE", this._emitChars("-");
      else if (A === r1.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._err(B0.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      else this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitCodePoint(A)
    } ["SCRIPT_DATA_ESCAPED_DASH_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this._emitChars("-");
      else if (A === r1.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this.state = "SCRIPT_DATA_STATE", this._emitChars(">");
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._err(B0.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      else this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitCodePoint(A)
    } ["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE"](A) {
      if (A === r1.SOLIDUS) this.tempBuff = [], this.state = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE";
      else if (OO(A)) this.tempBuff = [], this._emitChars("<"), this._reconsumeInState("SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE");
      else this._emitChars("<"), this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
    } ["SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE"](A) {
      if (OO(A)) this._createEndTagToken(), this._reconsumeInState("SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE");
      else this._emitChars("</"), this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
    } ["SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE"](A) {
      if (_K(A)) this.currentToken.tagName += RO(A), this.tempBuff.push(A);
      else if (Qy(A)) this.currentToken.tagName += o3(A), this.tempBuff.push(A);
      else {
        if (this.lastStartTagName === this.currentToken.tagName) {
          if (RB(A)) {
            this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
            return
          }
          if (A === r1.SOLIDUS) {
            this.state = "SELF_CLOSING_START_TAG_STATE";
            return
          }
          if (A === r1.GREATER_THAN_SIGN) {
            this._emitCurrentToken(), this.state = "DATA_STATE";
            return
          }
        }
        this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
      }
    } ["SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE"](A) {
      if (RB(A) || A === r1.SOLIDUS || A === r1.GREATER_THAN_SIGN) this.state = this._isTempBufferEqualToScriptString() ? "SCRIPT_DATA_DOUBLE_ESCAPED_STATE" : "SCRIPT_DATA_ESCAPED_STATE", this._emitCodePoint(A);
      else if (_K(A)) this.tempBuff.push(IK1(A)), this._emitCodePoint(A);
      else if (Qy(A)) this.tempBuff.push(A), this._emitCodePoint(A);
      else this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
    } ["SCRIPT_DATA_DOUBLE_ESCAPED_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE", this._emitChars("-");
      else if (A === r1.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE", this._emitChars("<");
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._err(B0.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE", this._emitChars("-");
      else if (A === r1.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE", this._emitChars("<");
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._err(B0.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      else this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitCodePoint(A)
    } ["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this._emitChars("-");
      else if (A === r1.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE", this._emitChars("<");
      else if (A === r1.GREATER_THAN_SIGN) this.state = "SCRIPT_DATA_STATE", this._emitChars(">");
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitChars(T8.REPLACEMENT_CHARACTER);
      else if (A === r1.EOF) this._err(B0.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
      else this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitCodePoint(A)
    } ["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE"](A) {
      if (A === r1.SOLIDUS) this.tempBuff = [], this.state = "SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE", this._emitChars("/");
      else this._reconsumeInState("SCRIPT_DATA_DOUBLE_ESCAPED_STATE")
    } ["SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE"](A) {
      if (RB(A) || A === r1.SOLIDUS || A === r1.GREATER_THAN_SIGN) this.state = this._isTempBufferEqualToScriptString() ? "SCRIPT_DATA_ESCAPED_STATE" : "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitCodePoint(A);
      else if (_K(A)) this.tempBuff.push(IK1(A)), this._emitCodePoint(A);
      else if (Qy(A)) this.tempBuff.push(A), this._emitCodePoint(A);
      else this._reconsumeInState("SCRIPT_DATA_DOUBLE_ESCAPED_STATE")
    } ["BEFORE_ATTRIBUTE_NAME_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.SOLIDUS || A === r1.GREATER_THAN_SIGN || A === r1.EOF) this._reconsumeInState("AFTER_ATTRIBUTE_NAME_STATE");
      else if (A === r1.EQUALS_SIGN) this._err(B0.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = "ATTRIBUTE_NAME_STATE";
      else this._createAttr(""), this._reconsumeInState("ATTRIBUTE_NAME_STATE")
    } ["ATTRIBUTE_NAME_STATE"](A) {
      if (RB(A) || A === r1.SOLIDUS || A === r1.GREATER_THAN_SIGN || A === r1.EOF) this._leaveAttrName("AFTER_ATTRIBUTE_NAME_STATE"), this._unconsume();
      else if (A === r1.EQUALS_SIGN) this._leaveAttrName("BEFORE_ATTRIBUTE_VALUE_STATE");
      else if (_K(A)) this.currentAttr.name += RO(A);
      else if (A === r1.QUOTATION_MARK || A === r1.APOSTROPHE || A === r1.LESS_THAN_SIGN) this._err(B0.unexpectedCharacterInAttributeName), this.currentAttr.name += o3(A);
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentAttr.name += T8.REPLACEMENT_CHARACTER;
      else this.currentAttr.name += o3(A)
    } ["AFTER_ATTRIBUTE_NAME_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.SOLIDUS) this.state = "SELF_CLOSING_START_TAG_STATE";
      else if (A === r1.EQUALS_SIGN) this.state = "BEFORE_ATTRIBUTE_VALUE_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInTag), this._emitEOFToken();
      else this._createAttr(""), this._reconsumeInState("ATTRIBUTE_NAME_STATE")
    } ["BEFORE_ATTRIBUTE_VALUE_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.QUOTATION_MARK) this.state = "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE";
      else if (A === r1.APOSTROPHE) this.state = "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.missingAttributeValue), this.state = "DATA_STATE", this._emitCurrentToken();
      else this._reconsumeInState("ATTRIBUTE_VALUE_UNQUOTED_STATE")
    } ["ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE"](A) {
      if (A === r1.QUOTATION_MARK) this.state = "AFTER_ATTRIBUTE_VALUE_QUOTED_STATE";
      else if (A === r1.AMPERSAND) this.returnState = "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE", this.state = "CHARACTER_REFERENCE_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentAttr.value += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.EOF) this._err(B0.eofInTag), this._emitEOFToken();
      else this.currentAttr.value += o3(A)
    } ["ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE"](A) {
      if (A === r1.APOSTROPHE) this.state = "AFTER_ATTRIBUTE_VALUE_QUOTED_STATE";
      else if (A === r1.AMPERSAND) this.returnState = "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE", this.state = "CHARACTER_REFERENCE_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentAttr.value += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.EOF) this._err(B0.eofInTag), this._emitEOFToken();
      else this.currentAttr.value += o3(A)
    } ["ATTRIBUTE_VALUE_UNQUOTED_STATE"](A) {
      if (RB(A)) this._leaveAttrValue("BEFORE_ATTRIBUTE_NAME_STATE");
      else if (A === r1.AMPERSAND) this.returnState = "ATTRIBUTE_VALUE_UNQUOTED_STATE", this.state = "CHARACTER_REFERENCE_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._leaveAttrValue("DATA_STATE"), this._emitCurrentToken();
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentAttr.value += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.QUOTATION_MARK || A === r1.APOSTROPHE || A === r1.LESS_THAN_SIGN || A === r1.EQUALS_SIGN || A === r1.GRAVE_ACCENT) this._err(B0.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += o3(A);
      else if (A === r1.EOF) this._err(B0.eofInTag), this._emitEOFToken();
      else this.currentAttr.value += o3(A)
    } ["AFTER_ATTRIBUTE_VALUE_QUOTED_STATE"](A) {
      if (RB(A)) this._leaveAttrValue("BEFORE_ATTRIBUTE_NAME_STATE");
      else if (A === r1.SOLIDUS) this._leaveAttrValue("SELF_CLOSING_START_TAG_STATE");
      else if (A === r1.GREATER_THAN_SIGN) this._leaveAttrValue("DATA_STATE"), this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInTag), this._emitEOFToken();
      else this._err(B0.missingWhitespaceBetweenAttributes), this._reconsumeInState("BEFORE_ATTRIBUTE_NAME_STATE")
    } ["SELF_CLOSING_START_TAG_STATE"](A) {
      if (A === r1.GREATER_THAN_SIGN) this.currentToken.selfClosing = !0, this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInTag), this._emitEOFToken();
      else this._err(B0.unexpectedSolidusInTag), this._reconsumeInState("BEFORE_ATTRIBUTE_NAME_STATE")
    } ["BOGUS_COMMENT_STATE"](A) {
      if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._emitCurrentToken(), this._emitEOFToken();
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.data += T8.REPLACEMENT_CHARACTER;
      else this.currentToken.data += o3(A)
    } ["MARKUP_DECLARATION_OPEN_STATE"](A) {
      if (this._consumeSequenceIfMatch(By.DASH_DASH_STRING, A, !0)) this._createCommentToken(), this.state = "COMMENT_START_STATE";
      else if (this._consumeSequenceIfMatch(By.DOCTYPE_STRING, A, !1)) this.state = "DOCTYPE_STATE";
      else if (this._consumeSequenceIfMatch(By.CDATA_START_STRING, A, !0))
        if (this.allowCDATA) this.state = "CDATA_SECTION_STATE";
        else this._err(B0.cdataInHtmlContent), this._createCommentToken(), this.currentToken.data = "[CDATA[", this.state = "BOGUS_COMMENT_STATE";
      else if (!this._ensureHibernation()) this._err(B0.incorrectlyOpenedComment), this._createCommentToken(), this._reconsumeInState("BOGUS_COMMENT_STATE")
    } ["COMMENT_START_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "COMMENT_START_DASH_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.abruptClosingOfEmptyComment), this.state = "DATA_STATE", this._emitCurrentToken();
      else this._reconsumeInState("COMMENT_STATE")
    } ["COMMENT_START_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "COMMENT_END_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.abruptClosingOfEmptyComment), this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.data += "-", this._reconsumeInState("COMMENT_STATE")
    } ["COMMENT_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "COMMENT_END_DASH_STATE";
      else if (A === r1.LESS_THAN_SIGN) this.currentToken.data += "<", this.state = "COMMENT_LESS_THAN_SIGN_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.data += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.EOF) this._err(B0.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.data += o3(A)
    } ["COMMENT_LESS_THAN_SIGN_STATE"](A) {
      if (A === r1.EXCLAMATION_MARK) this.currentToken.data += "!", this.state = "COMMENT_LESS_THAN_SIGN_BANG_STATE";
      else if (A === r1.LESS_THAN_SIGN) this.currentToken.data += "!";
      else this._reconsumeInState("COMMENT_STATE")
    } ["COMMENT_LESS_THAN_SIGN_BANG_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE";
      else this._reconsumeInState("COMMENT_STATE")
    } ["COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE";
      else this._reconsumeInState("COMMENT_END_DASH_STATE")
    } ["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE"](A) {
      if (A !== r1.GREATER_THAN_SIGN && A !== r1.EOF) this._err(B0.nestedComment);
      this._reconsumeInState("COMMENT_END_STATE")
    } ["COMMENT_END_DASH_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.state = "COMMENT_END_STATE";
      else if (A === r1.EOF) this._err(B0.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.data += "-", this._reconsumeInState("COMMENT_STATE")
    } ["COMMENT_END_STATE"](A) {
      if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EXCLAMATION_MARK) this.state = "COMMENT_END_BANG_STATE";
      else if (A === r1.HYPHEN_MINUS) this.currentToken.data += "-";
      else if (A === r1.EOF) this._err(B0.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.data += "--", this._reconsumeInState("COMMENT_STATE")
    } ["COMMENT_END_BANG_STATE"](A) {
      if (A === r1.HYPHEN_MINUS) this.currentToken.data += "--!", this.state = "COMMENT_END_DASH_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.incorrectlyClosedComment), this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.data += "--!", this._reconsumeInState("COMMENT_STATE")
    } ["DOCTYPE_STATE"](A) {
      if (RB(A)) this.state = "BEFORE_DOCTYPE_NAME_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._reconsumeInState("BEFORE_DOCTYPE_NAME_STATE");
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this._createDoctypeToken(null), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.missingWhitespaceBeforeDoctypeName), this._reconsumeInState("BEFORE_DOCTYPE_NAME_STATE")
    } ["BEFORE_DOCTYPE_NAME_STATE"](A) {
      if (RB(A)) return;
      if (_K(A)) this._createDoctypeToken(RO(A)), this.state = "DOCTYPE_NAME_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this._createDoctypeToken(T8.REPLACEMENT_CHARACTER), this.state = "DOCTYPE_NAME_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.missingDoctypeName), this._createDoctypeToken(null), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this._createDoctypeToken(null), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._createDoctypeToken(o3(A)), this.state = "DOCTYPE_NAME_STATE"
    } ["DOCTYPE_NAME_STATE"](A) {
      if (RB(A)) this.state = "AFTER_DOCTYPE_NAME_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
      else if (_K(A)) this.currentToken.name += RO(A);
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.name += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.name += o3(A)
    } ["AFTER_DOCTYPE_NAME_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else if (this._consumeSequenceIfMatch(By.PUBLIC_STRING, A, !1)) this.state = "AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE";
      else if (this._consumeSequenceIfMatch(By.SYSTEM_STRING, A, !1)) this.state = "AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE";
      else if (!this._ensureHibernation()) this._err(B0.invalidCharacterSequenceAfterDoctypeName), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE"](A) {
      if (RB(A)) this.state = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
      else if (A === r1.QUOTATION_MARK) this._err(B0.missingWhitespaceAfterDoctypePublicKeyword), this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE";
      else if (A === r1.APOSTROPHE) this._err(B0.missingWhitespaceAfterDoctypePublicKeyword), this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.missingDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.missingQuoteBeforeDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.QUOTATION_MARK) this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE";
      else if (A === r1.APOSTROPHE) this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.missingDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.missingQuoteBeforeDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE"](A) {
      if (A === r1.QUOTATION_MARK) this.state = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.publicId += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.abruptDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.publicId += o3(A)
    } ["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE"](A) {
      if (A === r1.APOSTROPHE) this.state = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.publicId += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.abruptDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.publicId += o3(A)
    } ["AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE"](A) {
      if (RB(A)) this.state = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.QUOTATION_MARK) this._err(B0.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
      else if (A === r1.APOSTROPHE) this._err(B0.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.GREATER_THAN_SIGN) this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.QUOTATION_MARK) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
      else if (A === r1.APOSTROPHE) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE"](A) {
      if (RB(A)) this.state = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
      else if (A === r1.QUOTATION_MARK) this._err(B0.missingWhitespaceAfterDoctypeSystemKeyword), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
      else if (A === r1.APOSTROPHE) this._err(B0.missingWhitespaceAfterDoctypeSystemKeyword), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.missingDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.QUOTATION_MARK) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
      else if (A === r1.APOSTROPHE) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.missingDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE"](A) {
      if (A === r1.QUOTATION_MARK) this.state = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.systemId += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.abruptDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.systemId += o3(A)
    } ["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE"](A) {
      if (A === r1.APOSTROPHE) this.state = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter), this.currentToken.systemId += T8.REPLACEMENT_CHARACTER;
      else if (A === r1.GREATER_THAN_SIGN) this._err(B0.abruptDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this.currentToken.systemId += o3(A)
    } ["AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE"](A) {
      if (RB(A)) return;
      if (A === r1.GREATER_THAN_SIGN) this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.EOF) this._err(B0.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
      else this._err(B0.unexpectedCharacterAfterDoctypeSystemIdentifier), this._reconsumeInState("BOGUS_DOCTYPE_STATE")
    } ["BOGUS_DOCTYPE_STATE"](A) {
      if (A === r1.GREATER_THAN_SIGN) this._emitCurrentToken(), this.state = "DATA_STATE";
      else if (A === r1.NULL) this._err(B0.unexpectedNullCharacter);
      else if (A === r1.EOF) this._emitCurrentToken(), this._emitEOFToken()
    } ["CDATA_SECTION_STATE"](A) {
      if (A === r1.RIGHT_SQUARE_BRACKET) this.state = "CDATA_SECTION_BRACKET_STATE";
      else if (A === r1.EOF) this._err(B0.eofInCdata), this._emitEOFToken();
      else this._emitCodePoint(A)
    } ["CDATA_SECTION_BRACKET_STATE"](A) {
      if (A === r1.RIGHT_SQUARE_BRACKET) this.state = "CDATA_SECTION_END_STATE";
      else this._emitChars("]"), this._reconsumeInState("CDATA_SECTION_STATE")
    } ["CDATA_SECTION_END_STATE"](A) {
      if (A === r1.GREATER_THAN_SIGN) this.state = "DATA_STATE";
      else if (A === r1.RIGHT_SQUARE_BRACKET) this._emitChars("]");
      else this._emitChars("]]"), this._reconsumeInState("CDATA_SECTION_STATE")
    } ["CHARACTER_REFERENCE_STATE"](A) {
      if (this.tempBuff = [r1.AMPERSAND], A === r1.NUMBER_SIGN) this.tempBuff.push(A), this.state = "NUMERIC_CHARACTER_REFERENCE_STATE";
      else if (qo1(A)) this._reconsumeInState("NAMED_CHARACTER_REFERENCE_STATE");
      else this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
    } ["NAMED_CHARACTER_REFERENCE_STATE"](A) {
      let B = this._matchNamedCharacterReference(A);
      if (this._ensureHibernation()) this.tempBuff = [r1.AMPERSAND];
      else if (B) {
        let Q = this.tempBuff[this.tempBuff.length - 1] === r1.SEMICOLON;
        if (!this._isCharacterReferenceAttributeQuirk(Q)) {
          if (!Q) this._errOnNextCodePoint(B0.missingSemicolonAfterCharacterReference);
          this.tempBuff = B
        }
        this._flushCodePointsConsumedAsCharacterReference(), this.state = this.returnState
      } else this._flushCodePointsConsumedAsCharacterReference(), this.state = "AMBIGUOS_AMPERSAND_STATE"
    } ["AMBIGUOS_AMPERSAND_STATE"](A) {
      if (qo1(A))
        if (this._isCharacterReferenceInAttribute()) this.currentAttr.value += o3(A);
        else this._emitCodePoint(A);
      else {
        if (A === r1.SEMICOLON) this._err(B0.unknownNamedCharacterReference);
        this._reconsumeInState(this.returnState)
      }
    } ["NUMERIC_CHARACTER_REFERENCE_STATE"](A) {
      if (this.charRefCode = 0, A === r1.LATIN_SMALL_X || A === r1.LATIN_CAPITAL_X) this.tempBuff.push(A), this.state = "HEXADEMICAL_CHARACTER_REFERENCE_START_STATE";
      else this._reconsumeInState("DECIMAL_CHARACTER_REFERENCE_START_STATE")
    } ["HEXADEMICAL_CHARACTER_REFERENCE_START_STATE"](A) {
      if (G55(A)) this._reconsumeInState("HEXADEMICAL_CHARACTER_REFERENCE_STATE");
      else this._err(B0.absenceOfDigitsInNumericCharacterReference), this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
    } ["DECIMAL_CHARACTER_REFERENCE_START_STATE"](A) {
      if (ce(A)) this._reconsumeInState("DECIMAL_CHARACTER_REFERENCE_STATE");
      else this._err(B0.absenceOfDigitsInNumericCharacterReference), this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
    } ["HEXADEMICAL_CHARACTER_REFERENCE_STATE"](A) {
      if (RC2(A)) this.charRefCode = this.charRefCode * 16 + A - 55;
      else if (OC2(A)) this.charRefCode = this.charRefCode * 16 + A - 87;
      else if (ce(A)) this.charRefCode = this.charRefCode * 16 + A - 48;
      else if (A === r1.SEMICOLON) this.state = "NUMERIC_CHARACTER_REFERENCE_END_STATE";
      else this._err(B0.missingSemicolonAfterCharacterReference), this._reconsumeInState("NUMERIC_CHARACTER_REFERENCE_END_STATE")
    } ["DECIMAL_CHARACTER_REFERENCE_STATE"](A) {
      if (ce(A)) this.charRefCode = this.charRefCode * 10 + A - 48;
      else if (A === r1.SEMICOLON) this.state = "NUMERIC_CHARACTER_REFERENCE_END_STATE";
      else this._err(B0.missingSemicolonAfterCharacterReference), this._reconsumeInState("NUMERIC_CHARACTER_REFERENCE_END_STATE")
    } ["NUMERIC_CHARACTER_REFERENCE_END_STATE"]() {
      if (this.charRefCode === r1.NULL) this._err(B0.nullCharacterReference), this.charRefCode = r1.REPLACEMENT_CHARACTER;
      else if (this.charRefCode > 1114111) this._err(B0.characterReferenceOutsideUnicodeRange), this.charRefCode = r1.REPLACEMENT_CHARACTER;
      else if (T8.isSurrogate(this.charRefCode)) this._err(B0.surrogateCharacterReference), this.charRefCode = r1.REPLACEMENT_CHARACTER;
      else if (T8.isUndefinedCodePoint(this.charRefCode)) this._err(B0.noncharacterCharacterReference);
      else if (T8.isControlCodePoint(this.charRefCode) || this.charRefCode === r1.CARRIAGE_RETURN) {
        this._err(B0.controlCharacterReference);
        let A = I55[this.charRefCode];
        if (A) this.charRefCode = A
      }
      this.tempBuff = [this.charRefCode], this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
    }
  }
  JB.CHARACTER_TOKEN = "CHARACTER_TOKEN";
  JB.NULL_CHARACTER_TOKEN = "NULL_CHARACTER_TOKEN";
  JB.WHITESPACE_CHARACTER_TOKEN = "WHITESPACE_CHARACTER_TOKEN";
  JB.START_TAG_TOKEN = "START_TAG_TOKEN";
  JB.END_TAG_TOKEN = "END_TAG_TOKEN";
  JB.COMMENT_TOKEN = "COMMENT_TOKEN";
  JB.DOCTYPE_TOKEN = "DOCTYPE_TOKEN";
  JB.EOF_TOKEN = "EOF_TOKEN";
  JB.HIBERNATION_TOKEN = "HIBERNATION_TOKEN";
  JB.MODE = {
    DATA: "DATA_STATE",
    RCDATA: "RCDATA_STATE",
    RAWTEXT: "RAWTEXT_STATE",
    SCRIPT_DATA: "SCRIPT_DATA_STATE",
    PLAINTEXT: "PLAINTEXT_STATE"
  };
  JB.getTokenAttr = function(A, B) {
    for (let Q = A.attrs.length - 1; Q >= 0; Q--)
      if (A.attrs[Q].name === B) return A.attrs[Q].value;
    return null
  };
  TC2.exports = JB
})
// @from(Start 7228074, End 7233153)
TO = z((Z55) => {
  var Mo1 = Z55.NAMESPACES = {
    HTML: "http://www.w3.org/1999/xhtml",
    MATHML: "http://www.w3.org/1998/Math/MathML",
    SVG: "http://www.w3.org/2000/svg",
    XLINK: "http://www.w3.org/1999/xlink",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/"
  };
  Z55.ATTRS = {
    TYPE: "type",
    ACTION: "action",
    ENCODING: "encoding",
    PROMPT: "prompt",
    NAME: "name",
    COLOR: "color",
    FACE: "face",
    SIZE: "size"
  };
  Z55.DOCUMENT_MODE = {
    NO_QUIRKS: "no-quirks",
    QUIRKS: "quirks",
    LIMITED_QUIRKS: "limited-quirks"
  };
  var S0 = Z55.TAG_NAMES = {
    A: "a",
    ADDRESS: "address",
    ANNOTATION_XML: "annotation-xml",
    APPLET: "applet",
    AREA: "area",
    ARTICLE: "article",
    ASIDE: "aside",
    B: "b",
    BASE: "base",
    BASEFONT: "basefont",
    BGSOUND: "bgsound",
    BIG: "big",
    BLOCKQUOTE: "blockquote",
    BODY: "body",
    BR: "br",
    BUTTON: "button",
    CAPTION: "caption",
    CENTER: "center",
    CODE: "code",
    COL: "col",
    COLGROUP: "colgroup",
    DD: "dd",
    DESC: "desc",
    DETAILS: "details",
    DIALOG: "dialog",
    DIR: "dir",
    DIV: "div",
    DL: "dl",
    DT: "dt",
    EM: "em",
    EMBED: "embed",
    FIELDSET: "fieldset",
    FIGCAPTION: "figcaption",
    FIGURE: "figure",
    FONT: "font",
    FOOTER: "footer",
    FOREIGN_OBJECT: "foreignObject",
    FORM: "form",
    FRAME: "frame",
    FRAMESET: "frameset",
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
    HEAD: "head",
    HEADER: "header",
    HGROUP: "hgroup",
    HR: "hr",
    HTML: "html",
    I: "i",
    IMG: "img",
    IMAGE: "image",
    INPUT: "input",
    IFRAME: "iframe",
    KEYGEN: "keygen",
    LABEL: "label",
    LI: "li",
    LINK: "link",
    LISTING: "listing",
    MAIN: "main",
    MALIGNMARK: "malignmark",
    MARQUEE: "marquee",
    MATH: "math",
    MENU: "menu",
    META: "meta",
    MGLYPH: "mglyph",
    MI: "mi",
    MO: "mo",
    MN: "mn",
    MS: "ms",
    MTEXT: "mtext",
    NAV: "nav",
    NOBR: "nobr",
    NOFRAMES: "noframes",
    NOEMBED: "noembed",
    NOSCRIPT: "noscript",
    OBJECT: "object",
    OL: "ol",
    OPTGROUP: "optgroup",
    OPTION: "option",
    P: "p",
    PARAM: "param",
    PLAINTEXT: "plaintext",
    PRE: "pre",
    RB: "rb",
    RP: "rp",
    RT: "rt",
    RTC: "rtc",
    RUBY: "ruby",
    S: "s",
    SCRIPT: "script",
    SECTION: "section",
    SELECT: "select",
    SOURCE: "source",
    SMALL: "small",
    SPAN: "span",
    STRIKE: "strike",
    STRONG: "strong",
    STYLE: "style",
    SUB: "sub",
    SUMMARY: "summary",
    SUP: "sup",
    TABLE: "table",
    TBODY: "tbody",
    TEMPLATE: "template",
    TEXTAREA: "textarea",
    TFOOT: "tfoot",
    TD: "td",
    TH: "th",
    THEAD: "thead",
    TITLE: "title",
    TR: "tr",
    TRACK: "track",
    TT: "tt",
    U: "u",
    UL: "ul",
    SVG: "svg",
    VAR: "var",
    WBR: "wbr",
    XMP: "xmp"
  };
  Z55.SPECIAL_ELEMENTS = {
    [Mo1.HTML]: {
      [S0.ADDRESS]: !0,
      [S0.APPLET]: !0,
      [S0.AREA]: !0,
      [S0.ARTICLE]: !0,
      [S0.ASIDE]: !0,
      [S0.BASE]: !0,
      [S0.BASEFONT]: !0,
      [S0.BGSOUND]: !0,
      [S0.BLOCKQUOTE]: !0,
      [S0.BODY]: !0,
      [S0.BR]: !0,
      [S0.BUTTON]: !0,
      [S0.CAPTION]: !0,
      [S0.CENTER]: !0,
      [S0.COL]: !0,
      [S0.COLGROUP]: !0,
      [S0.DD]: !0,
      [S0.DETAILS]: !0,
      [S0.DIR]: !0,
      [S0.DIV]: !0,
      [S0.DL]: !0,
      [S0.DT]: !0,
      [S0.EMBED]: !0,
      [S0.FIELDSET]: !0,
      [S0.FIGCAPTION]: !0,
      [S0.FIGURE]: !0,
      [S0.FOOTER]: !0,
      [S0.FORM]: !0,
      [S0.FRAME]: !0,
      [S0.FRAMESET]: !0,
      [S0.H1]: !0,
      [S0.H2]: !0,
      [S0.H3]: !0,
      [S0.H4]: !0,
      [S0.H5]: !0,
      [S0.H6]: !0,
      [S0.HEAD]: !0,
      [S0.HEADER]: !0,
      [S0.HGROUP]: !0,
      [S0.HR]: !0,
      [S0.HTML]: !0,
      [S0.IFRAME]: !0,
      [S0.IMG]: !0,
      [S0.INPUT]: !0,
      [S0.LI]: !0,
      [S0.LINK]: !0,
      [S0.LISTING]: !0,
      [S0.MAIN]: !0,
      [S0.MARQUEE]: !0,
      [S0.MENU]: !0,
      [S0.META]: !0,
      [S0.NAV]: !0,
      [S0.NOEMBED]: !0,
      [S0.NOFRAMES]: !0,
      [S0.NOSCRIPT]: !0,
      [S0.OBJECT]: !0,
      [S0.OL]: !0,
      [S0.P]: !0,
      [S0.PARAM]: !0,
      [S0.PLAINTEXT]: !0,
      [S0.PRE]: !0,
      [S0.SCRIPT]: !0,
      [S0.SECTION]: !0,
      [S0.SELECT]: !0,
      [S0.SOURCE]: !0,
      [S0.STYLE]: !0,
      [S0.SUMMARY]: !0,
      [S0.TABLE]: !0,
      [S0.TBODY]: !0,
      [S0.TD]: !0,
      [S0.TEMPLATE]: !0,
      [S0.TEXTAREA]: !0,
      [S0.TFOOT]: !0,
      [S0.TH]: !0,
      [S0.THEAD]: !0,
      [S0.TITLE]: !0,
      [S0.TR]: !0,
      [S0.TRACK]: !0,
      [S0.UL]: !0,
      [S0.WBR]: !0,
      [S0.XMP]: !0
    },
    [Mo1.MATHML]: {
      [S0.MI]: !0,
      [S0.MO]: !0,
      [S0.MN]: !0,
      [S0.MS]: !0,
      [S0.MTEXT]: !0,
      [S0.ANNOTATION_XML]: !0
    },
    [Mo1.SVG]: {
      [S0.TITLE]: !0,
      [S0.FOREIGN_OBJECT]: !0,
      [S0.DESC]: !0
    }
  }
})
// @from(Start 7233159, End 7241784)
yC2 = z((wi8, jC2) => {
  var SC2 = TO(),
    f0 = SC2.TAG_NAMES,
    P8 = SC2.NAMESPACES;

  function PC2(A) {
    switch (A.length) {
      case 1:
        return A === f0.P;
      case 2:
        return A === f0.RB || A === f0.RP || A === f0.RT || A === f0.DD || A === f0.DT || A === f0.LI;
      case 3:
        return A === f0.RTC;
      case 6:
        return A === f0.OPTION;
      case 8:
        return A === f0.OPTGROUP
    }
    return !1
  }

  function J55(A) {
    switch (A.length) {
      case 1:
        return A === f0.P;
      case 2:
        return A === f0.RB || A === f0.RP || A === f0.RT || A === f0.DD || A === f0.DT || A === f0.LI || A === f0.TD || A === f0.TH || A === f0.TR;
      case 3:
        return A === f0.RTC;
      case 5:
        return A === f0.TBODY || A === f0.TFOOT || A === f0.THEAD;
      case 6:
        return A === f0.OPTION;
      case 7:
        return A === f0.CAPTION;
      case 8:
        return A === f0.OPTGROUP || A === f0.COLGROUP
    }
    return !1
  }

  function GK1(A, B) {
    switch (A.length) {
      case 2:
        if (A === f0.TD || A === f0.TH) return B === P8.HTML;
        else if (A === f0.MI || A === f0.MO || A === f0.MN || A === f0.MS) return B === P8.MATHML;
        break;
      case 4:
        if (A === f0.HTML) return B === P8.HTML;
        else if (A === f0.DESC) return B === P8.SVG;
        break;
      case 5:
        if (A === f0.TABLE) return B === P8.HTML;
        else if (A === f0.MTEXT) return B === P8.MATHML;
        else if (A === f0.TITLE) return B === P8.SVG;
        break;
      case 6:
        return (A === f0.APPLET || A === f0.OBJECT) && B === P8.HTML;
      case 7:
        return (A === f0.CAPTION || A === f0.MARQUEE) && B === P8.HTML;
      case 8:
        return A === f0.TEMPLATE && B === P8.HTML;
      case 13:
        return A === f0.FOREIGN_OBJECT && B === P8.SVG;
      case 14:
        return A === f0.ANNOTATION_XML && B === P8.MATHML
    }
    return !1
  }
  class _C2 {
    constructor(A, B) {
      this.stackTop = -1, this.items = [], this.current = A, this.currentTagName = null, this.currentTmplContent = null, this.tmplCount = 0, this.treeAdapter = B
    }
    _indexOf(A) {
      let B = -1;
      for (let Q = this.stackTop; Q >= 0; Q--)
        if (this.items[Q] === A) {
          B = Q;
          break
        } return B
    }
    _isInTemplate() {
      return this.currentTagName === f0.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === P8.HTML
    }
    _updateCurrentElement() {
      this.current = this.items[this.stackTop], this.currentTagName = this.current && this.treeAdapter.getTagName(this.current), this.currentTmplContent = this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : null
    }
    push(A) {
      if (this.items[++this.stackTop] = A, this._updateCurrentElement(), this._isInTemplate()) this.tmplCount++
    }
    pop() {
      if (this.stackTop--, this.tmplCount > 0 && this._isInTemplate()) this.tmplCount--;
      this._updateCurrentElement()
    }
    replace(A, B) {
      let Q = this._indexOf(A);
      if (this.items[Q] = B, Q === this.stackTop) this._updateCurrentElement()
    }
    insertAfter(A, B) {
      let Q = this._indexOf(A) + 1;
      if (this.items.splice(Q, 0, B), Q === ++this.stackTop) this._updateCurrentElement()
    }
    popUntilTagNamePopped(A) {
      while (this.stackTop > -1) {
        let B = this.currentTagName,
          Q = this.treeAdapter.getNamespaceURI(this.current);
        if (this.pop(), B === A && Q === P8.HTML) break
      }
    }
    popUntilElementPopped(A) {
      while (this.stackTop > -1) {
        let B = this.current;
        if (this.pop(), B === A) break
      }
    }
    popUntilNumberedHeaderPopped() {
      while (this.stackTop > -1) {
        let A = this.currentTagName,
          B = this.treeAdapter.getNamespaceURI(this.current);
        if (this.pop(), A === f0.H1 || A === f0.H2 || A === f0.H3 || A === f0.H4 || A === f0.H5 || A === f0.H6 && B === P8.HTML) break
      }
    }
    popUntilTableCellPopped() {
      while (this.stackTop > -1) {
        let A = this.currentTagName,
          B = this.treeAdapter.getNamespaceURI(this.current);
        if (this.pop(), A === f0.TD || A === f0.TH && B === P8.HTML) break
      }
    }
    popAllUpToHtmlElement() {
      this.stackTop = 0, this._updateCurrentElement()
    }
    clearBackToTableContext() {
      while (this.currentTagName !== f0.TABLE && this.currentTagName !== f0.TEMPLATE && this.currentTagName !== f0.HTML || this.treeAdapter.getNamespaceURI(this.current) !== P8.HTML) this.pop()
    }
    clearBackToTableBodyContext() {
      while (this.currentTagName !== f0.TBODY && this.currentTagName !== f0.TFOOT && this.currentTagName !== f0.THEAD && this.currentTagName !== f0.TEMPLATE && this.currentTagName !== f0.HTML || this.treeAdapter.getNamespaceURI(this.current) !== P8.HTML) this.pop()
    }
    clearBackToTableRowContext() {
      while (this.currentTagName !== f0.TR && this.currentTagName !== f0.TEMPLATE && this.currentTagName !== f0.HTML || this.treeAdapter.getNamespaceURI(this.current) !== P8.HTML) this.pop()
    }
    remove(A) {
      for (let B = this.stackTop; B >= 0; B--)
        if (this.items[B] === A) {
          this.items.splice(B, 1), this.stackTop--, this._updateCurrentElement();
          break
        }
    }
    tryPeekProperlyNestedBodyElement() {
      let A = this.items[1];
      return A && this.treeAdapter.getTagName(A) === f0.BODY ? A : null
    }
    contains(A) {
      return this._indexOf(A) > -1
    }
    getCommonAncestor(A) {
      let B = this._indexOf(A);
      return --B >= 0 ? this.items[B] : null
    }
    isRootHtmlElementCurrent() {
      return this.stackTop === 0 && this.currentTagName === f0.HTML
    }
    hasInScope(A) {
      for (let B = this.stackTop; B >= 0; B--) {
        let Q = this.treeAdapter.getTagName(this.items[B]),
          I = this.treeAdapter.getNamespaceURI(this.items[B]);
        if (Q === A && I === P8.HTML) return !0;
        if (GK1(Q, I)) return !1
      }
      return !0
    }
    hasNumberedHeaderInScope() {
      for (let A = this.stackTop; A >= 0; A--) {
        let B = this.treeAdapter.getTagName(this.items[A]),
          Q = this.treeAdapter.getNamespaceURI(this.items[A]);
        if ((B === f0.H1 || B === f0.H2 || B === f0.H3 || B === f0.H4 || B === f0.H5 || B === f0.H6) && Q === P8.HTML) return !0;
        if (GK1(B, Q)) return !1
      }
      return !0
    }
    hasInListItemScope(A) {
      for (let B = this.stackTop; B >= 0; B--) {
        let Q = this.treeAdapter.getTagName(this.items[B]),
          I = this.treeAdapter.getNamespaceURI(this.items[B]);
        if (Q === A && I === P8.HTML) return !0;
        if ((Q === f0.UL || Q === f0.OL) && I === P8.HTML || GK1(Q, I)) return !1
      }
      return !0
    }
    hasInButtonScope(A) {
      for (let B = this.stackTop; B >= 0; B--) {
        let Q = this.treeAdapter.getTagName(this.items[B]),
          I = this.treeAdapter.getNamespaceURI(this.items[B]);
        if (Q === A && I === P8.HTML) return !0;
        if (Q === f0.BUTTON && I === P8.HTML || GK1(Q, I)) return !1
      }
      return !0
    }
    hasInTableScope(A) {
      for (let B = this.stackTop; B >= 0; B--) {
        let Q = this.treeAdapter.getTagName(this.items[B]);
        if (this.treeAdapter.getNamespaceURI(this.items[B]) !== P8.HTML) continue;
        if (Q === A) return !0;
        if (Q === f0.TABLE || Q === f0.TEMPLATE || Q === f0.HTML) return !1
      }
      return !0
    }
    hasTableBodyContextInTableScope() {
      for (let A = this.stackTop; A >= 0; A--) {
        let B = this.treeAdapter.getTagName(this.items[A]);
        if (this.treeAdapter.getNamespaceURI(this.items[A]) !== P8.HTML) continue;
        if (B === f0.TBODY || B === f0.THEAD || B === f0.TFOOT) return !0;
        if (B === f0.TABLE || B === f0.HTML) return !1
      }
      return !0
    }
    hasInSelectScope(A) {
      for (let B = this.stackTop; B >= 0; B--) {
        let Q = this.treeAdapter.getTagName(this.items[B]);
        if (this.treeAdapter.getNamespaceURI(this.items[B]) !== P8.HTML) continue;
        if (Q === A) return !0;
        if (Q !== f0.OPTION && Q !== f0.OPTGROUP) return !1
      }
      return !0
    }
    generateImpliedEndTags() {
      while (PC2(this.currentTagName)) this.pop()
    }
    generateImpliedEndTagsThoroughly() {
      while (J55(this.currentTagName)) this.pop()
    }
    generateImpliedEndTagsWithExclusion(A) {
      while (PC2(this.currentTagName) && this.currentTagName !== A) this.pop()
    }
  }
  jC2.exports = _C2
})
// @from(Start 7241790, End 7244809)
xC2 = z((Ei8, kC2) => {
  class jK {
    constructor(A) {
      this.length = 0, this.entries = [], this.treeAdapter = A, this.bookmark = null
    }
    _getNoahArkConditionCandidates(A) {
      let B = [];
      if (this.length >= 3) {
        let Q = this.treeAdapter.getAttrList(A).length,
          I = this.treeAdapter.getTagName(A),
          G = this.treeAdapter.getNamespaceURI(A);
        for (let Z = this.length - 1; Z >= 0; Z--) {
          let D = this.entries[Z];
          if (D.type === jK.MARKER_ENTRY) break;
          let Y = D.element,
            W = this.treeAdapter.getAttrList(Y);
          if (this.treeAdapter.getTagName(Y) === I && this.treeAdapter.getNamespaceURI(Y) === G && W.length === Q) B.push({
            idx: Z,
            attrs: W
          })
        }
      }
      return B.length < 3 ? [] : B
    }
    _ensureNoahArkCondition(A) {
      let B = this._getNoahArkConditionCandidates(A),
        Q = B.length;
      if (Q) {
        let I = this.treeAdapter.getAttrList(A),
          G = I.length,
          Z = Object.create(null);
        for (let D = 0; D < G; D++) {
          let Y = I[D];
          Z[Y.name] = Y.value
        }
        for (let D = 0; D < G; D++)
          for (let Y = 0; Y < Q; Y++) {
            let W = B[Y].attrs[D];
            if (Z[W.name] !== W.value) B.splice(Y, 1), Q--;
            if (B.length < 3) return
          }
        for (let D = Q - 1; D >= 2; D--) this.entries.splice(B[D].idx, 1), this.length--
      }
    }
    insertMarker() {
      this.entries.push({
        type: jK.MARKER_ENTRY
      }), this.length++
    }
    pushElement(A, B) {
      this._ensureNoahArkCondition(A), this.entries.push({
        type: jK.ELEMENT_ENTRY,
        element: A,
        token: B
      }), this.length++
    }
    insertElementAfterBookmark(A, B) {
      let Q = this.length - 1;
      for (; Q >= 0; Q--)
        if (this.entries[Q] === this.bookmark) break;
      this.entries.splice(Q + 1, 0, {
        type: jK.ELEMENT_ENTRY,
        element: A,
        token: B
      }), this.length++
    }
    removeEntry(A) {
      for (let B = this.length - 1; B >= 0; B--)
        if (this.entries[B] === A) {
          this.entries.splice(B, 1), this.length--;
          break
        }
    }
    clearToLastMarker() {
      while (this.length) {
        let A = this.entries.pop();
        if (this.length--, A.type === jK.MARKER_ENTRY) break
      }
    }
    getElementEntryInScopeWithTagName(A) {
      for (let B = this.length - 1; B >= 0; B--) {
        let Q = this.entries[B];
        if (Q.type === jK.MARKER_ENTRY) return null;
        if (this.treeAdapter.getTagName(Q.element) === A) return Q
      }
      return null
    }
    getElementEntry(A) {
      for (let B = this.length - 1; B >= 0; B--) {
        let Q = this.entries[B];
        if (Q.type === jK.ELEMENT_ENTRY && Q.element === A) return Q
      }
      return null
    }
  }
  jK.MARKER_ENTRY = "MARKER_ENTRY";
  jK.ELEMENT_ENTRY = "ELEMENT_ENTRY";
  kC2.exports = jK
})
// @from(Start 7244815, End 7245400)
QE = z((Ui8, fC2) => {
  class Lo1 {
    constructor(A) {
      let B = {},
        Q = this._getOverriddenMethods(this, B);
      for (let I of Object.keys(Q))
        if (typeof Q[I] === "function") B[I] = A[I], A[I] = Q[I]
    }
    _getOverriddenMethods() {
      throw new Error("Not implemented")
    }
  }
  Lo1.install = function(A, B, Q) {
    if (!A.__mixins) A.__mixins = [];
    for (let G = 0; G < A.__mixins.length; G++)
      if (A.__mixins[G].constructor === B) return A.__mixins[G];
    let I = new B(A, Q);
    return A.__mixins.push(I), I
  };
  fC2.exports = Lo1
})
// @from(Start 7245406, End 7246447)
Ro1 = z((Ni8, bC2) => {
  var F55 = QE();
  class vC2 extends F55 {
    constructor(A) {
      super(A);
      this.preprocessor = A, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.offset = 0, this.col = 0, this.line = 1
    }
    _getOverriddenMethods(A, B) {
      return {
        advance() {
          let Q = this.pos + 1,
            I = this.html[Q];
          if (A.isEol) A.isEol = !1, A.line++, A.lineStartPos = Q;
          if (I === `
` || I === "\r" && this.html[Q + 1] !== `
`) A.isEol = !0;
          return A.col = Q - A.lineStartPos + 1, A.offset = A.droppedBufferSize + Q, B.advance.call(this)
        },
        retreat() {
          B.retreat.call(this), A.isEol = !1, A.col = this.pos - A.lineStartPos + 1
        },
        dropParsedChunk() {
          let Q = this.pos;
          B.dropParsedChunk.call(this);
          let I = Q - this.pos;
          A.lineStartPos -= I, A.droppedBufferSize += I, A.offset = A.droppedBufferSize + this.pos
        }
      }
    }
  }
  bC2.exports = vC2
})
// @from(Start 7246453, End 7249746)
To1 = z(($i8, mC2) => {
  var gC2 = QE(),
    Oo1 = le(),
    X55 = Ro1();
  class hC2 extends gC2 {
    constructor(A) {
      super(A);
      this.tokenizer = A, this.posTracker = gC2.install(A.preprocessor, X55), this.currentAttrLocation = null, this.ctLoc = null
    }
    _getCurrentLocation() {
      return {
        startLine: this.posTracker.line,
        startCol: this.posTracker.col,
        startOffset: this.posTracker.offset,
        endLine: -1,
        endCol: -1,
        endOffset: -1
      }
    }
    _attachCurrentAttrLocationInfo() {
      this.currentAttrLocation.endLine = this.posTracker.line, this.currentAttrLocation.endCol = this.posTracker.col, this.currentAttrLocation.endOffset = this.posTracker.offset;
      let A = this.tokenizer.currentToken,
        B = this.tokenizer.currentAttr;
      if (!A.location.attrs) A.location.attrs = Object.create(null);
      A.location.attrs[B.name] = this.currentAttrLocation
    }
    _getOverriddenMethods(A, B) {
      let Q = {
        _createStartTagToken() {
          B._createStartTagToken.call(this), this.currentToken.location = A.ctLoc
        },
        _createEndTagToken() {
          B._createEndTagToken.call(this), this.currentToken.location = A.ctLoc
        },
        _createCommentToken() {
          B._createCommentToken.call(this), this.currentToken.location = A.ctLoc
        },
        _createDoctypeToken(I) {
          B._createDoctypeToken.call(this, I), this.currentToken.location = A.ctLoc
        },
        _createCharacterToken(I, G) {
          B._createCharacterToken.call(this, I, G), this.currentCharacterToken.location = A.ctLoc
        },
        _createEOFToken() {
          B._createEOFToken.call(this), this.currentToken.location = A._getCurrentLocation()
        },
        _createAttr(I) {
          B._createAttr.call(this, I), A.currentAttrLocation = A._getCurrentLocation()
        },
        _leaveAttrName(I) {
          B._leaveAttrName.call(this, I), A._attachCurrentAttrLocationInfo()
        },
        _leaveAttrValue(I) {
          B._leaveAttrValue.call(this, I), A._attachCurrentAttrLocationInfo()
        },
        _emitCurrentToken() {
          let I = this.currentToken.location;
          if (this.currentCharacterToken) this.currentCharacterToken.location.endLine = I.startLine, this.currentCharacterToken.location.endCol = I.startCol, this.currentCharacterToken.location.endOffset = I.startOffset;
          if (this.currentToken.type === Oo1.EOF_TOKEN) I.endLine = I.startLine, I.endCol = I.startCol, I.endOffset = I.startOffset;
          else I.endLine = A.posTracker.line, I.endCol = A.posTracker.col + 1, I.endOffset = A.posTracker.offset + 1;
          B._emitCurrentToken.call(this)
        },
        _emitCurrentCharacterToken() {
          let I = this.currentCharacterToken && this.currentCharacterToken.location;
          if (I && I.endOffset === -1) I.endLine = A.posTracker.line, I.endCol = A.posTracker.col, I.endOffset = A.posTracker.offset;
          B._emitCurrentCharacterToken.call(this)
        }
      };
      return Object.keys(Oo1.MODE).forEach((I) => {
        let G = Oo1.MODE[I];
        Q[G] = function(Z) {
          A.ctLoc = A._getCurrentLocation(), B[G].call(this, Z)
        }
      }), Q
    }
  }
  mC2.exports = hC2
})
// @from(Start 7249752, End 7250329)
pC2 = z((qi8, uC2) => {
  var V55 = QE();
  class dC2 extends V55 {
    constructor(A, B) {
      super(A);
      this.onItemPop = B.onItemPop
    }
    _getOverriddenMethods(A, B) {
      return {
        pop() {
          A.onItemPop(this.current), B.pop.call(this)
        },
        popAllUpToHtmlElement() {
          for (let Q = this.stackTop; Q > 0; Q--) A.onItemPop(this.items[Q]);
          B.popAllUpToHtmlElement.call(this)
        },
        remove(Q) {
          A.onItemPop(this.current), B.remove.call(this, Q)
        }
      }
    }
  }
  uC2.exports = dC2
})
// @from(Start 7250335, End 7255171)
nC2 = z((Mi8, iC2) => {
  var Po1 = QE(),
    cC2 = le(),
    C55 = To1(),
    K55 = pC2(),
    H55 = TO(),
    So1 = H55.TAG_NAMES;
  class lC2 extends Po1 {
    constructor(A) {
      super(A);
      this.parser = A, this.treeAdapter = this.parser.treeAdapter, this.posTracker = null, this.lastStartTagToken = null, this.lastFosterParentingLocation = null, this.currentToken = null
    }
    _setStartLocation(A) {
      let B = null;
      if (this.lastStartTagToken) B = Object.assign({}, this.lastStartTagToken.location), B.startTag = this.lastStartTagToken.location;
      this.treeAdapter.setNodeSourceCodeLocation(A, B)
    }
    _setEndLocation(A, B) {
      let Q = this.treeAdapter.getNodeSourceCodeLocation(A);
      if (Q) {
        if (B.location) {
          let I = B.location,
            G = this.treeAdapter.getTagName(A);
          if (B.type === cC2.END_TAG_TOKEN && G === B.tagName) Q.endTag = Object.assign({}, I), Q.endLine = I.endLine, Q.endCol = I.endCol, Q.endOffset = I.endOffset;
          else Q.endLine = I.startLine, Q.endCol = I.startCol, Q.endOffset = I.startOffset
        }
      }
    }
    _getOverriddenMethods(A, B) {
      return {
        _bootstrap(Q, I) {
          B._bootstrap.call(this, Q, I), A.lastStartTagToken = null, A.lastFosterParentingLocation = null, A.currentToken = null;
          let G = Po1.install(this.tokenizer, C55);
          A.posTracker = G.posTracker, Po1.install(this.openElements, K55, {
            onItemPop: function(Z) {
              A._setEndLocation(Z, A.currentToken)
            }
          })
        },
        _runParsingLoop(Q) {
          B._runParsingLoop.call(this, Q);
          for (let I = this.openElements.stackTop; I >= 0; I--) A._setEndLocation(this.openElements.items[I], A.currentToken)
        },
        _processTokenInForeignContent(Q) {
          A.currentToken = Q, B._processTokenInForeignContent.call(this, Q)
        },
        _processToken(Q) {
          if (A.currentToken = Q, B._processToken.call(this, Q), Q.type === cC2.END_TAG_TOKEN && (Q.tagName === So1.HTML || Q.tagName === So1.BODY && this.openElements.hasInScope(So1.BODY)))
            for (let G = this.openElements.stackTop; G >= 0; G--) {
              let Z = this.openElements.items[G];
              if (this.treeAdapter.getTagName(Z) === Q.tagName) {
                A._setEndLocation(Z, Q);
                break
              }
            }
        },
        _setDocumentType(Q) {
          B._setDocumentType.call(this, Q);
          let I = this.treeAdapter.getChildNodes(this.document),
            G = I.length;
          for (let Z = 0; Z < G; Z++) {
            let D = I[Z];
            if (this.treeAdapter.isDocumentTypeNode(D)) {
              this.treeAdapter.setNodeSourceCodeLocation(D, Q.location);
              break
            }
          }
        },
        _attachElementToTree(Q) {
          A._setStartLocation(Q), A.lastStartTagToken = null, B._attachElementToTree.call(this, Q)
        },
        _appendElement(Q, I) {
          A.lastStartTagToken = Q, B._appendElement.call(this, Q, I)
        },
        _insertElement(Q, I) {
          A.lastStartTagToken = Q, B._insertElement.call(this, Q, I)
        },
        _insertTemplate(Q) {
          A.lastStartTagToken = Q, B._insertTemplate.call(this, Q);
          let I = this.treeAdapter.getTemplateContent(this.openElements.current);
          this.treeAdapter.setNodeSourceCodeLocation(I, null)
        },
        _insertFakeRootElement() {
          B._insertFakeRootElement.call(this), this.treeAdapter.setNodeSourceCodeLocation(this.openElements.current, null)
        },
        _appendCommentNode(Q, I) {
          B._appendCommentNode.call(this, Q, I);
          let G = this.treeAdapter.getChildNodes(I),
            Z = G[G.length - 1];
          this.treeAdapter.setNodeSourceCodeLocation(Z, Q.location)
        },
        _findFosterParentingLocation() {
          return A.lastFosterParentingLocation = B._findFosterParentingLocation.call(this), A.lastFosterParentingLocation
        },
        _insertCharacters(Q) {
          B._insertCharacters.call(this, Q);
          let I = this._shouldFosterParentOnInsertion(),
            G = I && A.lastFosterParentingLocation.parent || this.openElements.currentTmplContent || this.openElements.current,
            Z = this.treeAdapter.getChildNodes(G),
            D = I && A.lastFosterParentingLocation.beforeElement ? Z.indexOf(A.lastFosterParentingLocation.beforeElement) - 1 : Z.length - 1,
            Y = Z[D],
            W = this.treeAdapter.getNodeSourceCodeLocation(Y);
          if (W) W.endLine = Q.location.endLine, W.endCol = Q.location.endCol, W.endOffset = Q.location.endOffset;
          else this.treeAdapter.setNodeSourceCodeLocation(Y, Q.location)
        }
      }
    }
  }
  iC2.exports = lC2
})
// @from(Start 7255177, End 7255940)
ZK1 = z((Li8, sC2) => {
  var z55 = QE();
  class aC2 extends z55 {
    constructor(A, B) {
      super(A);
      this.posTracker = null, this.onParseError = B.onParseError
    }
    _setErrorLocation(A) {
      A.startLine = A.endLine = this.posTracker.line, A.startCol = A.endCol = this.posTracker.col, A.startOffset = A.endOffset = this.posTracker.offset
    }
    _reportError(A) {
      let B = {
        code: A,
        startLine: -1,
        startCol: -1,
        startOffset: -1,
        endLine: -1,
        endCol: -1,
        endOffset: -1
      };
      this._setErrorLocation(B), this.onParseError(B)
    }
    _getOverriddenMethods(A) {
      return {
        _err(B) {
          A._reportError(B)
        }
      }
    }
  }
  sC2.exports = aC2
})
// @from(Start 7255946, End 7256344)
tC2 = z((Ri8, oC2) => {
  var w55 = ZK1(),
    E55 = Ro1(),
    U55 = QE();
  class rC2 extends w55 {
    constructor(A, B) {
      super(A, B);
      this.posTracker = U55.install(A, E55), this.lastErrOffset = -1
    }
    _reportError(A) {
      if (this.lastErrOffset !== this.posTracker.offset) this.lastErrOffset = this.posTracker.offset, super._reportError(A)
    }
  }
  oC2.exports = rC2
})
// @from(Start 7256350, End 7256615)
BK2 = z((Oi8, AK2) => {
  var N55 = ZK1(),
    $55 = tC2(),
    q55 = QE();
  class eC2 extends N55 {
    constructor(A, B) {
      super(A, B);
      let Q = q55.install(A.preprocessor, $55, B);
      this.posTracker = Q.posTracker
    }
  }
  AK2.exports = eC2
})
// @from(Start 7256621, End 7257703)
ZK2 = z((Ti8, GK2) => {
  var M55 = ZK1(),
    L55 = BK2(),
    R55 = To1(),
    QK2 = QE();
  class IK2 extends M55 {
    constructor(A, B) {
      super(A, B);
      this.opts = B, this.ctLoc = null, this.locBeforeToken = !1
    }
    _setErrorLocation(A) {
      if (this.ctLoc) A.startLine = this.ctLoc.startLine, A.startCol = this.ctLoc.startCol, A.startOffset = this.ctLoc.startOffset, A.endLine = this.locBeforeToken ? this.ctLoc.startLine : this.ctLoc.endLine, A.endCol = this.locBeforeToken ? this.ctLoc.startCol : this.ctLoc.endCol, A.endOffset = this.locBeforeToken ? this.ctLoc.startOffset : this.ctLoc.endOffset
    }
    _getOverriddenMethods(A, B) {
      return {
        _bootstrap(Q, I) {
          B._bootstrap.call(this, Q, I), QK2.install(this.tokenizer, L55, A.opts), QK2.install(this.tokenizer, R55)
        },
        _processInputToken(Q) {
          A.ctLoc = Q.location, B._processInputToken.call(this, Q)
        },
        _err(Q, I) {
          A.locBeforeToken = I && I.beforeToken, A._reportError(Q)
        }
      }
    }
  }
  GK2.exports = IK2
})
// @from(Start 7257709, End 7261406)
_o1 = z((P55) => {
  var {
    DOCUMENT_MODE: O55
  } = TO();
  P55.createDocument = function() {
    return {
      nodeName: "#document",
      mode: O55.NO_QUIRKS,
      childNodes: []
    }
  };
  P55.createDocumentFragment = function() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    }
  };
  P55.createElement = function(A, B, Q) {
    return {
      nodeName: A,
      tagName: A,
      attrs: Q,
      namespaceURI: B,
      childNodes: [],
      parentNode: null
    }
  };
  P55.createCommentNode = function(A) {
    return {
      nodeName: "#comment",
      data: A,
      parentNode: null
    }
  };
  var DK2 = function(A) {
      return {
        nodeName: "#text",
        value: A,
        parentNode: null
      }
    },
    YK2 = P55.appendChild = function(A, B) {
      A.childNodes.push(B), B.parentNode = A
    },
    T55 = P55.insertBefore = function(A, B, Q) {
      let I = A.childNodes.indexOf(Q);
      A.childNodes.splice(I, 0, B), B.parentNode = A
    };
  P55.setTemplateContent = function(A, B) {
    A.content = B
  };
  P55.getTemplateContent = function(A) {
    return A.content
  };
  P55.setDocumentType = function(A, B, Q, I) {
    let G = null;
    for (let Z = 0; Z < A.childNodes.length; Z++)
      if (A.childNodes[Z].nodeName === "#documentType") {
        G = A.childNodes[Z];
        break
      } if (G) G.name = B, G.publicId = Q, G.systemId = I;
    else YK2(A, {
      nodeName: "#documentType",
      name: B,
      publicId: Q,
      systemId: I
    })
  };
  P55.setDocumentMode = function(A, B) {
    A.mode = B
  };
  P55.getDocumentMode = function(A) {
    return A.mode
  };
  P55.detachNode = function(A) {
    if (A.parentNode) {
      let B = A.parentNode.childNodes.indexOf(A);
      A.parentNode.childNodes.splice(B, 1), A.parentNode = null
    }
  };
  P55.insertText = function(A, B) {
    if (A.childNodes.length) {
      let Q = A.childNodes[A.childNodes.length - 1];
      if (Q.nodeName === "#text") {
        Q.value += B;
        return
      }
    }
    YK2(A, DK2(B))
  };
  P55.insertTextBefore = function(A, B, Q) {
    let I = A.childNodes[A.childNodes.indexOf(Q) - 1];
    if (I && I.nodeName === "#text") I.value += B;
    else T55(A, DK2(B), Q)
  };
  P55.adoptAttributes = function(A, B) {
    let Q = [];
    for (let I = 0; I < A.attrs.length; I++) Q.push(A.attrs[I].name);
    for (let I = 0; I < B.length; I++)
      if (Q.indexOf(B[I].name) === -1) A.attrs.push(B[I])
  };
  P55.getFirstChild = function(A) {
    return A.childNodes[0]
  };
  P55.getChildNodes = function(A) {
    return A.childNodes
  };
  P55.getParentNode = function(A) {
    return A.parentNode
  };
  P55.getAttrList = function(A) {
    return A.attrs
  };
  P55.getTagName = function(A) {
    return A.tagName
  };
  P55.getNamespaceURI = function(A) {
    return A.namespaceURI
  };
  P55.getTextNodeContent = function(A) {
    return A.value
  };
  P55.getCommentNodeContent = function(A) {
    return A.data
  };
  P55.getDocumentTypeNodeName = function(A) {
    return A.name
  };
  P55.getDocumentTypeNodePublicId = function(A) {
    return A.publicId
  };
  P55.getDocumentTypeNodeSystemId = function(A) {
    return A.systemId
  };
  P55.isTextNode = function(A) {
    return A.nodeName === "#text"
  };
  P55.isCommentNode = function(A) {
    return A.nodeName === "#comment"
  };
  P55.isDocumentTypeNode = function(A) {
    return A.nodeName === "#documentType"
  };
  P55.isElementNode = function(A) {
    return !!A.tagName
  };
  P55.setNodeSourceCodeLocation = function(A, B) {
    A.sourceCodeLocation = B
  };
  P55.getNodeSourceCodeLocation = function(A) {
    return A.sourceCodeLocation
  }
})
// @from(Start 7261412, End 7261649)
jo1 = z((ji8, WK2) => {
  WK2.exports = function A(B, Q) {
    return Q = Q || Object.create(null), [B, Q].reduce((I, G) => {
      return Object.keys(G).forEach((Z) => {
        I[Z] = G[Z]
      }), I
    }, Object.create(null))
  }
})
// @from(Start 7261655, End 7265443)
yo1 = z((W85) => {
  var {
    DOCUMENT_MODE: id
  } = TO(), XK2 = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"], Z85 = XK2.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]), D85 = ["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"], VK2 = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Y85 = VK2.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]);

  function JK2(A) {
    let B = A.indexOf('"') !== -1 ? "'" : '"';
    return B + A + B
  }

  function FK2(A, B) {
    for (let Q = 0; Q < B.length; Q++)
      if (A.indexOf(B[Q]) === 0) return !0;
    return !1
  }
  W85.isConforming = function(A) {
    return A.name === "html" && A.publicId === null && (A.systemId === null || A.systemId === "about:legacy-compat")
  };
  W85.getDocumentMode = function(A) {
    if (A.name !== "html") return id.QUIRKS;
    let B = A.systemId;
    if (B && B.toLowerCase() === "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd") return id.QUIRKS;
    let Q = A.publicId;
    if (Q !== null) {
      if (Q = Q.toLowerCase(), D85.indexOf(Q) > -1) return id.QUIRKS;
      let I = B === null ? Z85 : XK2;
      if (FK2(Q, I)) return id.QUIRKS;
      if (I = B === null ? VK2 : Y85, FK2(Q, I)) return id.LIMITED_QUIRKS
    }
    return id.NO_QUIRKS
  };
  W85.serializeContent = function(A, B, Q) {
    let I = "!DOCTYPE ";
    if (A) I += A;
    if (B) I += " PUBLIC " + JK2(B);
    else if (Q) I += " SYSTEM";
    if (Q !== null) I += " " + JK2(Q);
    return I
  }
})
// @from(Start 7265449, End 7272883)
KK2 = z((E85) => {
  var ko1 = le(),
    xo1 = TO(),
    x9 = xo1.TAG_NAMES,
    gG = xo1.NAMESPACES,
    DK1 = xo1.ATTRS,
    CK2 = {
      TEXT_HTML: "text/html",
      APPLICATION_XML: "application/xhtml+xml"
    },
    V85 = {
      attributename: "attributeName",
      attributetype: "attributeType",
      basefrequency: "baseFrequency",
      baseprofile: "baseProfile",
      calcmode: "calcMode",
      clippathunits: "clipPathUnits",
      diffuseconstant: "diffuseConstant",
      edgemode: "edgeMode",
      filterunits: "filterUnits",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      limitingconeangle: "limitingConeAngle",
      markerheight: "markerHeight",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      numoctaves: "numOctaves",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      refx: "refX",
      refy: "refY",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stitchtiles: "stitchTiles",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textlength: "textLength",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      xchannelselector: "xChannelSelector",
      ychannelselector: "yChannelSelector",
      zoomandpan: "zoomAndPan"
    },
    C85 = {
      "xlink:actuate": {
        prefix: "xlink",
        name: "actuate",
        namespace: gG.XLINK
      },
      "xlink:arcrole": {
        prefix: "xlink",
        name: "arcrole",
        namespace: gG.XLINK
      },
      "xlink:href": {
        prefix: "xlink",
        name: "href",
        namespace: gG.XLINK
      },
      "xlink:role": {
        prefix: "xlink",
        name: "role",
        namespace: gG.XLINK
      },
      "xlink:show": {
        prefix: "xlink",
        name: "show",
        namespace: gG.XLINK
      },
      "xlink:title": {
        prefix: "xlink",
        name: "title",
        namespace: gG.XLINK
      },
      "xlink:type": {
        prefix: "xlink",
        name: "type",
        namespace: gG.XLINK
      },
      "xml:base": {
        prefix: "xml",
        name: "base",
        namespace: gG.XML
      },
      "xml:lang": {
        prefix: "xml",
        name: "lang",
        namespace: gG.XML
      },
      "xml:space": {
        prefix: "xml",
        name: "space",
        namespace: gG.XML
      },
      xmlns: {
        prefix: "",
        name: "xmlns",
        namespace: gG.XMLNS
      },
      "xmlns:xlink": {
        prefix: "xmlns",
        name: "xlink",
        namespace: gG.XMLNS
      }
    },
    K85 = E85.SVG_TAG_NAMES_ADJUSTMENT_MAP = {
      altglyph: "altGlyph",
      altglyphdef: "altGlyphDef",
      altglyphitem: "altGlyphItem",
      animatecolor: "animateColor",
      animatemotion: "animateMotion",
      animatetransform: "animateTransform",
      clippath: "clipPath",
      feblend: "feBlend",
      fecolormatrix: "feColorMatrix",
      fecomponenttransfer: "feComponentTransfer",
      fecomposite: "feComposite",
      feconvolvematrix: "feConvolveMatrix",
      fediffuselighting: "feDiffuseLighting",
      fedisplacementmap: "feDisplacementMap",
      fedistantlight: "feDistantLight",
      feflood: "feFlood",
      fefunca: "feFuncA",
      fefuncb: "feFuncB",
      fefuncg: "feFuncG",
      fefuncr: "feFuncR",
      fegaussianblur: "feGaussianBlur",
      feimage: "feImage",
      femerge: "feMerge",
      femergenode: "feMergeNode",
      femorphology: "feMorphology",
      feoffset: "feOffset",
      fepointlight: "fePointLight",
      fespecularlighting: "feSpecularLighting",
      fespotlight: "feSpotLight",
      fetile: "feTile",
      feturbulence: "feTurbulence",
      foreignobject: "foreignObject",
      glyphref: "glyphRef",
      lineargradient: "linearGradient",
      radialgradient: "radialGradient",
      textpath: "textPath"
    },
    H85 = {
      [x9.B]: !0,
      [x9.BIG]: !0,
      [x9.BLOCKQUOTE]: !0,
      [x9.BODY]: !0,
      [x9.BR]: !0,
      [x9.CENTER]: !0,
      [x9.CODE]: !0,
      [x9.DD]: !0,
      [x9.DIV]: !0,
      [x9.DL]: !0,
      [x9.DT]: !0,
      [x9.EM]: !0,
      [x9.EMBED]: !0,
      [x9.H1]: !0,
      [x9.H2]: !0,
      [x9.H3]: !0,
      [x9.H4]: !0,
      [x9.H5]: !0,
      [x9.H6]: !0,
      [x9.HEAD]: !0,
      [x9.HR]: !0,
      [x9.I]: !0,
      [x9.IMG]: !0,
      [x9.LI]: !0,
      [x9.LISTING]: !0,
      [x9.MENU]: !0,
      [x9.META]: !0,
      [x9.NOBR]: !0,
      [x9.OL]: !0,
      [x9.P]: !0,
      [x9.PRE]: !0,
      [x9.RUBY]: !0,
      [x9.S]: !0,
      [x9.SMALL]: !0,
      [x9.SPAN]: !0,
      [x9.STRONG]: !0,
      [x9.STRIKE]: !0,
      [x9.SUB]: !0,
      [x9.SUP]: !0,
      [x9.TABLE]: !0,
      [x9.TT]: !0,
      [x9.U]: !0,
      [x9.UL]: !0,
      [x9.VAR]: !0
    };
  E85.causesExit = function(A) {
    let B = A.tagName;
    return B === x9.FONT && (ko1.getTokenAttr(A, DK1.COLOR) !== null || ko1.getTokenAttr(A, DK1.SIZE) !== null || ko1.getTokenAttr(A, DK1.FACE) !== null) ? !0 : H85[B]
  };
  E85.adjustTokenMathMLAttrs = function(A) {
    for (let B = 0; B < A.attrs.length; B++)
      if (A.attrs[B].name === "definitionurl") {
        A.attrs[B].name = "definitionURL";
        break
      }
  };
  E85.adjustTokenSVGAttrs = function(A) {
    for (let B = 0; B < A.attrs.length; B++) {
      let Q = V85[A.attrs[B].name];
      if (Q) A.attrs[B].name = Q
    }
  };
  E85.adjustTokenXMLAttrs = function(A) {
    for (let B = 0; B < A.attrs.length; B++) {
      let Q = C85[A.attrs[B].name];
      if (Q) A.attrs[B].prefix = Q.prefix, A.attrs[B].name = Q.name, A.attrs[B].namespace = Q.namespace
    }
  };
  E85.adjustTokenSVGTagName = function(A) {
    let B = K85[A.tagName];
    if (B) A.tagName = B
  };

  function z85(A, B) {
    return B === gG.MATHML && (A === x9.MI || A === x9.MO || A === x9.MN || A === x9.MS || A === x9.MTEXT)
  }

  function w85(A, B, Q) {
    if (B === gG.MATHML && A === x9.ANNOTATION_XML) {
      for (let I = 0; I < Q.length; I++)
        if (Q[I].name === DK1.ENCODING) {
          let G = Q[I].value.toLowerCase();
          return G === CK2.TEXT_HTML || G === CK2.APPLICATION_XML
        }
    }
    return B === gG.SVG && (A === x9.FOREIGN_OBJECT || A === x9.DESC || A === x9.TITLE)
  }
  E85.isIntegrationPoint = function(A, B, Q, I) {
    if ((!I || I === gG.HTML) && w85(A, B, Q)) return !0;
    if ((!I || I === gG.MATHML) && z85(A, B)) return !0;
    return !1
  }
})