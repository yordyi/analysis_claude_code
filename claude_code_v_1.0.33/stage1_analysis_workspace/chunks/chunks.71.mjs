
// @from(Start 7272889, End 7331746)
yK2 = z((fi8, jK2) => {
  var AA = le(),
    R85 = yC2(),
    HK2 = xC2(),
    O85 = nC2(),
    T85 = ZK2(),
    zK2 = QE(),
    P85 = _o1(),
    S85 = jo1(),
    wK2 = yo1(),
    IE = KK2(),
    hG = QK1(),
    _85 = BK1(),
    Zy = TO(),
    a = Zy.TAG_NAMES,
    g2 = Zy.NAMESPACES,
    OK2 = Zy.ATTRS,
    j85 = {
      scriptingEnabled: !0,
      sourceCodeLocationInfo: !1,
      onParseError: null,
      treeAdapter: P85
    },
    y85 = {
      [a.TR]: "IN_ROW_MODE",
      [a.TBODY]: "IN_TABLE_BODY_MODE",
      [a.THEAD]: "IN_TABLE_BODY_MODE",
      [a.TFOOT]: "IN_TABLE_BODY_MODE",
      [a.CAPTION]: "IN_CAPTION_MODE",
      [a.COLGROUP]: "IN_COLUMN_GROUP_MODE",
      [a.TABLE]: "IN_TABLE_MODE",
      [a.BODY]: "IN_BODY_MODE",
      [a.FRAMESET]: "IN_FRAMESET_MODE"
    },
    k85 = {
      [a.CAPTION]: "IN_TABLE_MODE",
      [a.COLGROUP]: "IN_TABLE_MODE",
      [a.TBODY]: "IN_TABLE_MODE",
      [a.TFOOT]: "IN_TABLE_MODE",
      [a.THEAD]: "IN_TABLE_MODE",
      [a.COL]: "IN_COLUMN_GROUP_MODE",
      [a.TR]: "IN_TABLE_BODY_MODE",
      [a.TD]: "IN_ROW_MODE",
      [a.TH]: "IN_ROW_MODE"
    },
    fo1 = {
      ["INITIAL_MODE"]: {
        [AA.CHARACTER_TOKEN]: ne,
        [AA.NULL_CHARACTER_TOKEN]: ne,
        [AA.WHITESPACE_CHARACTER_TOKEN]: f6,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: d85,
        [AA.START_TAG_TOKEN]: ne,
        [AA.END_TAG_TOKEN]: ne,
        [AA.EOF_TOKEN]: ne
      },
      ["BEFORE_HTML_MODE"]: {
        [AA.CHARACTER_TOKEN]: se,
        [AA.NULL_CHARACTER_TOKEN]: se,
        [AA.WHITESPACE_CHARACTER_TOKEN]: f6,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: u85,
        [AA.END_TAG_TOKEN]: p85,
        [AA.EOF_TOKEN]: se
      },
      ["BEFORE_HEAD_MODE"]: {
        [AA.CHARACTER_TOKEN]: re,
        [AA.NULL_CHARACTER_TOKEN]: re,
        [AA.WHITESPACE_CHARACTER_TOKEN]: f6,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: YK1,
        [AA.START_TAG_TOKEN]: c85,
        [AA.END_TAG_TOKEN]: l85,
        [AA.EOF_TOKEN]: re
      },
      ["IN_HEAD_MODE"]: {
        [AA.CHARACTER_TOKEN]: oe,
        [AA.NULL_CHARACTER_TOKEN]: oe,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: YK1,
        [AA.START_TAG_TOKEN]: fI,
        [AA.END_TAG_TOKEN]: Dy,
        [AA.EOF_TOKEN]: oe
      },
      ["IN_HEAD_NO_SCRIPT_MODE"]: {
        [AA.CHARACTER_TOKEN]: te,
        [AA.NULL_CHARACTER_TOKEN]: te,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: YK1,
        [AA.START_TAG_TOKEN]: i85,
        [AA.END_TAG_TOKEN]: n85,
        [AA.EOF_TOKEN]: te
      },
      ["AFTER_HEAD_MODE"]: {
        [AA.CHARACTER_TOKEN]: ee,
        [AA.NULL_CHARACTER_TOKEN]: ee,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: YK1,
        [AA.START_TAG_TOKEN]: a85,
        [AA.END_TAG_TOKEN]: s85,
        [AA.EOF_TOKEN]: ee
      },
      ["IN_BODY_MODE"]: {
        [AA.CHARACTER_TOKEN]: WK1,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: Gy,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: DW,
        [AA.END_TAG_TOKEN]: vo1,
        [AA.EOF_TOKEN]: L$
      },
      ["TEXT_MODE"]: {
        [AA.CHARACTER_TOKEN]: ZW,
        [AA.NULL_CHARACTER_TOKEN]: ZW,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: f6,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: f6,
        [AA.END_TAG_TOKEN]: OB5,
        [AA.EOF_TOKEN]: TB5
      },
      ["IN_TABLE_MODE"]: {
        [AA.CHARACTER_TOKEN]: R$,
        [AA.NULL_CHARACTER_TOKEN]: R$,
        [AA.WHITESPACE_CHARACTER_TOKEN]: R$,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: bo1,
        [AA.END_TAG_TOKEN]: go1,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_TABLE_TEXT_MODE"]: {
        [AA.CHARACTER_TOKEN]: bB5,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: vB5,
        [AA.COMMENT_TOKEN]: ae,
        [AA.DOCTYPE_TOKEN]: ae,
        [AA.START_TAG_TOKEN]: ae,
        [AA.END_TAG_TOKEN]: ae,
        [AA.EOF_TOKEN]: ae
      },
      ["IN_CAPTION_MODE"]: {
        [AA.CHARACTER_TOKEN]: WK1,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: Gy,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: gB5,
        [AA.END_TAG_TOKEN]: hB5,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_COLUMN_GROUP_MODE"]: {
        [AA.CHARACTER_TOKEN]: FK1,
        [AA.NULL_CHARACTER_TOKEN]: FK1,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: mB5,
        [AA.END_TAG_TOKEN]: dB5,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_TABLE_BODY_MODE"]: {
        [AA.CHARACTER_TOKEN]: R$,
        [AA.NULL_CHARACTER_TOKEN]: R$,
        [AA.WHITESPACE_CHARACTER_TOKEN]: R$,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: uB5,
        [AA.END_TAG_TOKEN]: pB5,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_ROW_MODE"]: {
        [AA.CHARACTER_TOKEN]: R$,
        [AA.NULL_CHARACTER_TOKEN]: R$,
        [AA.WHITESPACE_CHARACTER_TOKEN]: R$,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: cB5,
        [AA.END_TAG_TOKEN]: lB5,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_CELL_MODE"]: {
        [AA.CHARACTER_TOKEN]: WK1,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: Gy,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: iB5,
        [AA.END_TAG_TOKEN]: nB5,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_SELECT_MODE"]: {
        [AA.CHARACTER_TOKEN]: ZW,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: PK2,
        [AA.END_TAG_TOKEN]: SK2,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_SELECT_IN_TABLE_MODE"]: {
        [AA.CHARACTER_TOKEN]: ZW,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: aB5,
        [AA.END_TAG_TOKEN]: sB5,
        [AA.EOF_TOKEN]: L$
      },
      ["IN_TEMPLATE_MODE"]: {
        [AA.CHARACTER_TOKEN]: WK1,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: Gy,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: rB5,
        [AA.END_TAG_TOKEN]: oB5,
        [AA.EOF_TOKEN]: _K2
      },
      ["AFTER_BODY_MODE"]: {
        [AA.CHARACTER_TOKEN]: XK1,
        [AA.NULL_CHARACTER_TOKEN]: XK1,
        [AA.WHITESPACE_CHARACTER_TOKEN]: Gy,
        [AA.COMMENT_TOKEN]: m85,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: tB5,
        [AA.END_TAG_TOKEN]: eB5,
        [AA.EOF_TOKEN]: ie
      },
      ["IN_FRAMESET_MODE"]: {
        [AA.CHARACTER_TOKEN]: f6,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: A35,
        [AA.END_TAG_TOKEN]: B35,
        [AA.EOF_TOKEN]: ie
      },
      ["AFTER_FRAMESET_MODE"]: {
        [AA.CHARACTER_TOKEN]: f6,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: ZW,
        [AA.COMMENT_TOKEN]: l7,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: Q35,
        [AA.END_TAG_TOKEN]: I35,
        [AA.EOF_TOKEN]: ie
      },
      ["AFTER_AFTER_BODY_MODE"]: {
        [AA.CHARACTER_TOKEN]: JK1,
        [AA.NULL_CHARACTER_TOKEN]: JK1,
        [AA.WHITESPACE_CHARACTER_TOKEN]: Gy,
        [AA.COMMENT_TOKEN]: EK2,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: G35,
        [AA.END_TAG_TOKEN]: JK1,
        [AA.EOF_TOKEN]: ie
      },
      ["AFTER_AFTER_FRAMESET_MODE"]: {
        [AA.CHARACTER_TOKEN]: f6,
        [AA.NULL_CHARACTER_TOKEN]: f6,
        [AA.WHITESPACE_CHARACTER_TOKEN]: Gy,
        [AA.COMMENT_TOKEN]: EK2,
        [AA.DOCTYPE_TOKEN]: f6,
        [AA.START_TAG_TOKEN]: Z35,
        [AA.END_TAG_TOKEN]: f6,
        [AA.EOF_TOKEN]: ie
      }
    };
  class TK2 {
    constructor(A) {
      if (this.options = S85(j85, A), this.treeAdapter = this.options.treeAdapter, this.pendingScript = null, this.options.sourceCodeLocationInfo) zK2.install(this, O85);
      if (this.options.onParseError) zK2.install(this, T85, {
        onParseError: this.options.onParseError
      })
    }
    parse(A) {
      let B = this.treeAdapter.createDocument();
      return this._bootstrap(B, null), this.tokenizer.write(A, !0), this._runParsingLoop(null), B
    }
    parseFragment(A, B) {
      if (!B) B = this.treeAdapter.createElement(a.TEMPLATE, g2.HTML, []);
      let Q = this.treeAdapter.createElement("documentmock", g2.HTML, []);
      if (this._bootstrap(Q, B), this.treeAdapter.getTagName(B) === a.TEMPLATE) this._pushTmplInsertionMode("IN_TEMPLATE_MODE");
      this._initTokenizerForFragmentParsing(), this._insertFakeRootElement(), this._resetInsertionMode(), this._findFormInFragmentContext(), this.tokenizer.write(A, !0), this._runParsingLoop(null);
      let I = this.treeAdapter.getFirstChild(Q),
        G = this.treeAdapter.createDocumentFragment();
      return this._adoptNodes(I, G), G
    }
    _bootstrap(A, B) {
      this.tokenizer = new AA(this.options), this.stopped = !1, this.insertionMode = "INITIAL_MODE", this.originalInsertionMode = "", this.document = A, this.fragmentContext = B, this.headElement = null, this.formElement = null, this.openElements = new R85(this.document, this.treeAdapter), this.activeFormattingElements = new HK2(this.treeAdapter), this.tmplInsertionModeStack = [], this.tmplInsertionModeStackTop = -1, this.currentTmplInsertionMode = null, this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1
    }
    _err() {}
    _runParsingLoop(A) {
      while (!this.stopped) {
        this._setupTokenizerCDATAMode();
        let B = this.tokenizer.getNextToken();
        if (B.type === AA.HIBERNATION_TOKEN) break;
        if (this.skipNextNewLine) {
          if (this.skipNextNewLine = !1, B.type === AA.WHITESPACE_CHARACTER_TOKEN && B.chars[0] === `
`) {
            if (B.chars.length === 1) continue;
            B.chars = B.chars.substr(1)
          }
        }
        if (this._processInputToken(B), A && this.pendingScript) break
      }
    }
    runParsingLoopForCurrentChunk(A, B) {
      if (this._runParsingLoop(B), B && this.pendingScript) {
        let Q = this.pendingScript;
        this.pendingScript = null, B(Q);
        return
      }
      if (A) A()
    }
    _setupTokenizerCDATAMode() {
      let A = this._getAdjustedCurrentElement();
      this.tokenizer.allowCDATA = A && A !== this.document && this.treeAdapter.getNamespaceURI(A) !== g2.HTML && !this._isIntegrationPoint(A)
    }
    _switchToTextParsing(A, B) {
      this._insertElement(A, g2.HTML), this.tokenizer.state = B, this.originalInsertionMode = this.insertionMode, this.insertionMode = "TEXT_MODE"
    }
    switchToPlaintextParsing() {
      this.insertionMode = "TEXT_MODE", this.originalInsertionMode = "IN_BODY_MODE", this.tokenizer.state = AA.MODE.PLAINTEXT
    }
    _getAdjustedCurrentElement() {
      return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current
    }
    _findFormInFragmentContext() {
      let A = this.fragmentContext;
      do {
        if (this.treeAdapter.getTagName(A) === a.FORM) {
          this.formElement = A;
          break
        }
        A = this.treeAdapter.getParentNode(A)
      } while (A)
    }
    _initTokenizerForFragmentParsing() {
      if (this.treeAdapter.getNamespaceURI(this.fragmentContext) === g2.HTML) {
        let A = this.treeAdapter.getTagName(this.fragmentContext);
        if (A === a.TITLE || A === a.TEXTAREA) this.tokenizer.state = AA.MODE.RCDATA;
        else if (A === a.STYLE || A === a.XMP || A === a.IFRAME || A === a.NOEMBED || A === a.NOFRAMES || A === a.NOSCRIPT) this.tokenizer.state = AA.MODE.RAWTEXT;
        else if (A === a.SCRIPT) this.tokenizer.state = AA.MODE.SCRIPT_DATA;
        else if (A === a.PLAINTEXT) this.tokenizer.state = AA.MODE.PLAINTEXT
      }
    }
    _setDocumentType(A) {
      let B = A.name || "",
        Q = A.publicId || "",
        I = A.systemId || "";
      this.treeAdapter.setDocumentType(this.document, B, Q, I)
    }
    _attachElementToTree(A) {
      if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(A);
      else {
        let B = this.openElements.currentTmplContent || this.openElements.current;
        this.treeAdapter.appendChild(B, A)
      }
    }
    _appendElement(A, B) {
      let Q = this.treeAdapter.createElement(A.tagName, B, A.attrs);
      this._attachElementToTree(Q)
    }
    _insertElement(A, B) {
      let Q = this.treeAdapter.createElement(A.tagName, B, A.attrs);
      this._attachElementToTree(Q), this.openElements.push(Q)
    }
    _insertFakeElement(A) {
      let B = this.treeAdapter.createElement(A, g2.HTML, []);
      this._attachElementToTree(B), this.openElements.push(B)
    }
    _insertTemplate(A) {
      let B = this.treeAdapter.createElement(A.tagName, g2.HTML, A.attrs),
        Q = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(B, Q), this._attachElementToTree(B), this.openElements.push(B)
    }
    _insertFakeRootElement() {
      let A = this.treeAdapter.createElement(a.HTML, g2.HTML, []);
      this.treeAdapter.appendChild(this.openElements.current, A), this.openElements.push(A)
    }
    _appendCommentNode(A, B) {
      let Q = this.treeAdapter.createCommentNode(A.data);
      this.treeAdapter.appendChild(B, Q)
    }
    _insertCharacters(A) {
      if (this._shouldFosterParentOnInsertion()) this._fosterParentText(A.chars);
      else {
        let B = this.openElements.currentTmplContent || this.openElements.current;
        this.treeAdapter.insertText(B, A.chars)
      }
    }
    _adoptNodes(A, B) {
      for (let Q = this.treeAdapter.getFirstChild(A); Q; Q = this.treeAdapter.getFirstChild(A)) this.treeAdapter.detachNode(Q), this.treeAdapter.appendChild(B, Q)
    }
    _shouldProcessTokenInForeignContent(A) {
      let B = this._getAdjustedCurrentElement();
      if (!B || B === this.document) return !1;
      let Q = this.treeAdapter.getNamespaceURI(B);
      if (Q === g2.HTML) return !1;
      if (this.treeAdapter.getTagName(B) === a.ANNOTATION_XML && Q === g2.MATHML && A.type === AA.START_TAG_TOKEN && A.tagName === a.SVG) return !1;
      let I = A.type === AA.CHARACTER_TOKEN || A.type === AA.NULL_CHARACTER_TOKEN || A.type === AA.WHITESPACE_CHARACTER_TOKEN;
      if ((A.type === AA.START_TAG_TOKEN && A.tagName !== a.MGLYPH && A.tagName !== a.MALIGNMARK || I) && this._isIntegrationPoint(B, g2.MATHML)) return !1;
      if ((A.type === AA.START_TAG_TOKEN || I) && this._isIntegrationPoint(B, g2.HTML)) return !1;
      return A.type !== AA.EOF_TOKEN
    }
    _processToken(A) {
      fo1[this.insertionMode][A.type](this, A)
    }
    _processTokenInBodyMode(A) {
      fo1.IN_BODY_MODE[A.type](this, A)
    }
    _processTokenInForeignContent(A) {
      if (A.type === AA.CHARACTER_TOKEN) Y35(this, A);
      else if (A.type === AA.NULL_CHARACTER_TOKEN) D35(this, A);
      else if (A.type === AA.WHITESPACE_CHARACTER_TOKEN) ZW(this, A);
      else if (A.type === AA.COMMENT_TOKEN) l7(this, A);
      else if (A.type === AA.START_TAG_TOKEN) W35(this, A);
      else if (A.type === AA.END_TAG_TOKEN) J35(this, A)
    }
    _processInputToken(A) {
      if (this._shouldProcessTokenInForeignContent(A)) this._processTokenInForeignContent(A);
      else this._processToken(A);
      if (A.type === AA.START_TAG_TOKEN && A.selfClosing && !A.ackSelfClosing) this._err(hG.nonVoidHtmlElementStartTagWithTrailingSolidus)
    }
    _isIntegrationPoint(A, B) {
      let Q = this.treeAdapter.getTagName(A),
        I = this.treeAdapter.getNamespaceURI(A),
        G = this.treeAdapter.getAttrList(A);
      return IE.isIntegrationPoint(Q, I, G, B)
    }
    _reconstructActiveFormattingElements() {
      let A = this.activeFormattingElements.length;
      if (A) {
        let B = A,
          Q = null;
        do
          if (B--, Q = this.activeFormattingElements.entries[B], Q.type === HK2.MARKER_ENTRY || this.openElements.contains(Q.element)) {
            B++;
            break
          } while (B > 0);
        for (let I = B; I < A; I++) Q = this.activeFormattingElements.entries[I], this._insertElement(Q.token, this.treeAdapter.getNamespaceURI(Q.element)), Q.element = this.openElements.current
      }
    }
    _closeTableCell() {
      this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = "IN_ROW_MODE"
    }
    _closePElement() {
      this.openElements.generateImpliedEndTagsWithExclusion(a.P), this.openElements.popUntilTagNamePopped(a.P)
    }
    _resetInsertionMode() {
      for (let A = this.openElements.stackTop, B = !1; A >= 0; A--) {
        let Q = this.openElements.items[A];
        if (A === 0) {
          if (B = !0, this.fragmentContext) Q = this.fragmentContext
        }
        let I = this.treeAdapter.getTagName(Q),
          G = y85[I];
        if (G) {
          this.insertionMode = G;
          break
        } else if (!B && (I === a.TD || I === a.TH)) {
          this.insertionMode = "IN_CELL_MODE";
          break
        } else if (!B && I === a.HEAD) {
          this.insertionMode = "IN_HEAD_MODE";
          break
        } else if (I === a.SELECT) {
          this._resetInsertionModeForSelect(A);
          break
        } else if (I === a.TEMPLATE) {
          this.insertionMode = this.currentTmplInsertionMode;
          break
        } else if (I === a.HTML) {
          this.insertionMode = this.headElement ? "AFTER_HEAD_MODE" : "BEFORE_HEAD_MODE";
          break
        } else if (B) {
          this.insertionMode = "IN_BODY_MODE";
          break
        }
      }
    }
    _resetInsertionModeForSelect(A) {
      if (A > 0)
        for (let B = A - 1; B > 0; B--) {
          let Q = this.openElements.items[B],
            I = this.treeAdapter.getTagName(Q);
          if (I === a.TEMPLATE) break;
          else if (I === a.TABLE) {
            this.insertionMode = "IN_SELECT_IN_TABLE_MODE";
            return
          }
        }
      this.insertionMode = "IN_SELECT_MODE"
    }
    _pushTmplInsertionMode(A) {
      this.tmplInsertionModeStack.push(A), this.tmplInsertionModeStackTop++, this.currentTmplInsertionMode = A
    }
    _popTmplInsertionMode() {
      this.tmplInsertionModeStack.pop(), this.tmplInsertionModeStackTop--, this.currentTmplInsertionMode = this.tmplInsertionModeStack[this.tmplInsertionModeStackTop]
    }
    _isElementCausesFosterParenting(A) {
      let B = this.treeAdapter.getTagName(A);
      return B === a.TABLE || B === a.TBODY || B === a.TFOOT || B === a.THEAD || B === a.TR
    }
    _shouldFosterParentOnInsertion() {
      return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.current)
    }
    _findFosterParentingLocation() {
      let A = {
        parent: null,
        beforeElement: null
      };
      for (let B = this.openElements.stackTop; B >= 0; B--) {
        let Q = this.openElements.items[B],
          I = this.treeAdapter.getTagName(Q),
          G = this.treeAdapter.getNamespaceURI(Q);
        if (I === a.TEMPLATE && G === g2.HTML) {
          A.parent = this.treeAdapter.getTemplateContent(Q);
          break
        } else if (I === a.TABLE) {
          if (A.parent = this.treeAdapter.getParentNode(Q), A.parent) A.beforeElement = Q;
          else A.parent = this.openElements.items[B - 1];
          break
        }
      }
      if (!A.parent) A.parent = this.openElements.items[0];
      return A
    }
    _fosterParentElement(A) {
      let B = this._findFosterParentingLocation();
      if (B.beforeElement) this.treeAdapter.insertBefore(B.parent, A, B.beforeElement);
      else this.treeAdapter.appendChild(B.parent, A)
    }
    _fosterParentText(A) {
      let B = this._findFosterParentingLocation();
      if (B.beforeElement) this.treeAdapter.insertTextBefore(B.parent, A, B.beforeElement);
      else this.treeAdapter.insertText(B.parent, A)
    }
    _isSpecialElement(A) {
      let B = this.treeAdapter.getTagName(A),
        Q = this.treeAdapter.getNamespaceURI(A);
      return Zy.SPECIAL_ELEMENTS[Q][B]
    }
  }
  jK2.exports = TK2;

  function x85(A, B) {
    let Q = A.activeFormattingElements.getElementEntryInScopeWithTagName(B.tagName);
    if (Q) {
      if (!A.openElements.contains(Q.element)) A.activeFormattingElements.removeEntry(Q), Q = null;
      else if (!A.openElements.hasInScope(B.tagName)) Q = null
    } else yK(A, B);
    return Q
  }

  function f85(A, B) {
    let Q = null;
    for (let I = A.openElements.stackTop; I >= 0; I--) {
      let G = A.openElements.items[I];
      if (G === B.element) break;
      if (A._isSpecialElement(G)) Q = G
    }
    if (!Q) A.openElements.popUntilElementPopped(B.element), A.activeFormattingElements.removeEntry(B);
    return Q
  }

  function v85(A, B, Q) {
    let I = B,
      G = A.openElements.getCommonAncestor(B);
    for (let Z = 0, D = G; D !== Q; Z++, D = G) {
      G = A.openElements.getCommonAncestor(D);
      let Y = A.activeFormattingElements.getElementEntry(D),
        W = Y && Z >= 3;
      if (!Y || W) {
        if (W) A.activeFormattingElements.removeEntry(Y);
        A.openElements.remove(D)
      } else {
        if (D = b85(A, Y), I === B) A.activeFormattingElements.bookmark = Y;
        A.treeAdapter.detachNode(I), A.treeAdapter.appendChild(D, I), I = D
      }
    }
    return I
  }

  function b85(A, B) {
    let Q = A.treeAdapter.getNamespaceURI(B.element),
      I = A.treeAdapter.createElement(B.token.tagName, Q, B.token.attrs);
    return A.openElements.replace(B.element, I), B.element = I, I
  }

  function g85(A, B, Q) {
    if (A._isElementCausesFosterParenting(B)) A._fosterParentElement(Q);
    else {
      let I = A.treeAdapter.getTagName(B),
        G = A.treeAdapter.getNamespaceURI(B);
      if (I === a.TEMPLATE && G === g2.HTML) B = A.treeAdapter.getTemplateContent(B);
      A.treeAdapter.appendChild(B, Q)
    }
  }

  function h85(A, B, Q) {
    let I = A.treeAdapter.getNamespaceURI(Q.element),
      G = Q.token,
      Z = A.treeAdapter.createElement(G.tagName, I, G.attrs);
    A._adoptNodes(B, Z), A.treeAdapter.appendChild(B, Z), A.activeFormattingElements.insertElementAfterBookmark(Z, Q.token), A.activeFormattingElements.removeEntry(Q), A.openElements.remove(Q.element), A.openElements.insertAfter(B, Z)
  }

  function SO(A, B) {
    let Q;
    for (let I = 0; I < 8; I++) {
      if (Q = x85(A, B, Q), !Q) break;
      let G = f85(A, Q);
      if (!G) break;
      A.activeFormattingElements.bookmark = Q;
      let Z = v85(A, G, Q.element),
        D = A.openElements.getCommonAncestor(Q.element);
      A.treeAdapter.detachNode(Z), g85(A, D, Z), h85(A, G, Q)
    }
  }

  function f6() {}

  function YK1(A) {
    A._err(hG.misplacedDoctype)
  }

  function l7(A, B) {
    A._appendCommentNode(B, A.openElements.currentTmplContent || A.openElements.current)
  }

  function m85(A, B) {
    A._appendCommentNode(B, A.openElements.items[0])
  }

  function EK2(A, B) {
    A._appendCommentNode(B, A.document)
  }

  function ZW(A, B) {
    A._insertCharacters(B)
  }

  function ie(A) {
    A.stopped = !0
  }

  function d85(A, B) {
    A._setDocumentType(B);
    let Q = B.forceQuirks ? Zy.DOCUMENT_MODE.QUIRKS : wK2.getDocumentMode(B);
    if (!wK2.isConforming(B)) A._err(hG.nonConformingDoctype);
    A.treeAdapter.setDocumentMode(A.document, Q), A.insertionMode = "BEFORE_HTML_MODE"
  }

  function ne(A, B) {
    A._err(hG.missingDoctype, {
      beforeToken: !0
    }), A.treeAdapter.setDocumentMode(A.document, Zy.DOCUMENT_MODE.QUIRKS), A.insertionMode = "BEFORE_HTML_MODE", A._processToken(B)
  }

  function u85(A, B) {
    if (B.tagName === a.HTML) A._insertElement(B, g2.HTML), A.insertionMode = "BEFORE_HEAD_MODE";
    else se(A, B)
  }

  function p85(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML || Q === a.HEAD || Q === a.BODY || Q === a.BR) se(A, B)
  }

  function se(A, B) {
    A._insertFakeRootElement(), A.insertionMode = "BEFORE_HEAD_MODE", A._processToken(B)
  }

  function c85(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.HEAD) A._insertElement(B, g2.HTML), A.headElement = A.openElements.current, A.insertionMode = "IN_HEAD_MODE";
    else re(A, B)
  }

  function l85(A, B) {
    let Q = B.tagName;
    if (Q === a.HEAD || Q === a.BODY || Q === a.HTML || Q === a.BR) re(A, B);
    else A._err(hG.endTagWithoutMatchingOpenElement)
  }

  function re(A, B) {
    A._insertFakeElement(a.HEAD), A.headElement = A.openElements.current, A.insertionMode = "IN_HEAD_MODE", A._processToken(B)
  }

  function fI(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.BASE || Q === a.BASEFONT || Q === a.BGSOUND || Q === a.LINK || Q === a.META) A._appendElement(B, g2.HTML), B.ackSelfClosing = !0;
    else if (Q === a.TITLE) A._switchToTextParsing(B, AA.MODE.RCDATA);
    else if (Q === a.NOSCRIPT)
      if (A.options.scriptingEnabled) A._switchToTextParsing(B, AA.MODE.RAWTEXT);
      else A._insertElement(B, g2.HTML), A.insertionMode = "IN_HEAD_NO_SCRIPT_MODE";
    else if (Q === a.NOFRAMES || Q === a.STYLE) A._switchToTextParsing(B, AA.MODE.RAWTEXT);
    else if (Q === a.SCRIPT) A._switchToTextParsing(B, AA.MODE.SCRIPT_DATA);
    else if (Q === a.TEMPLATE) A._insertTemplate(B, g2.HTML), A.activeFormattingElements.insertMarker(), A.framesetOk = !1, A.insertionMode = "IN_TEMPLATE_MODE", A._pushTmplInsertionMode("IN_TEMPLATE_MODE");
    else if (Q === a.HEAD) A._err(hG.misplacedStartTagForHeadElement);
    else oe(A, B)
  }

  function Dy(A, B) {
    let Q = B.tagName;
    if (Q === a.HEAD) A.openElements.pop(), A.insertionMode = "AFTER_HEAD_MODE";
    else if (Q === a.BODY || Q === a.BR || Q === a.HTML) oe(A, B);
    else if (Q === a.TEMPLATE)
      if (A.openElements.tmplCount > 0) {
        if (A.openElements.generateImpliedEndTagsThoroughly(), A.openElements.currentTagName !== a.TEMPLATE) A._err(hG.closingOfElementWithOpenChildElements);
        A.openElements.popUntilTagNamePopped(a.TEMPLATE), A.activeFormattingElements.clearToLastMarker(), A._popTmplInsertionMode(), A._resetInsertionMode()
      } else A._err(hG.endTagWithoutMatchingOpenElement);
    else A._err(hG.endTagWithoutMatchingOpenElement)
  }

  function oe(A, B) {
    A.openElements.pop(), A.insertionMode = "AFTER_HEAD_MODE", A._processToken(B)
  }

  function i85(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.BASEFONT || Q === a.BGSOUND || Q === a.HEAD || Q === a.LINK || Q === a.META || Q === a.NOFRAMES || Q === a.STYLE) fI(A, B);
    else if (Q === a.NOSCRIPT) A._err(hG.nestedNoscriptInHead);
    else te(A, B)
  }

  function n85(A, B) {
    let Q = B.tagName;
    if (Q === a.NOSCRIPT) A.openElements.pop(), A.insertionMode = "IN_HEAD_MODE";
    else if (Q === a.BR) te(A, B);
    else A._err(hG.endTagWithoutMatchingOpenElement)
  }

  function te(A, B) {
    let Q = B.type === AA.EOF_TOKEN ? hG.openElementsLeftAfterEof : hG.disallowedContentInNoscriptInHead;
    A._err(Q), A.openElements.pop(), A.insertionMode = "IN_HEAD_MODE", A._processToken(B)
  }

  function a85(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.BODY) A._insertElement(B, g2.HTML), A.framesetOk = !1, A.insertionMode = "IN_BODY_MODE";
    else if (Q === a.FRAMESET) A._insertElement(B, g2.HTML), A.insertionMode = "IN_FRAMESET_MODE";
    else if (Q === a.BASE || Q === a.BASEFONT || Q === a.BGSOUND || Q === a.LINK || Q === a.META || Q === a.NOFRAMES || Q === a.SCRIPT || Q === a.STYLE || Q === a.TEMPLATE || Q === a.TITLE) A._err(hG.abandonedHeadElementChild), A.openElements.push(A.headElement), fI(A, B), A.openElements.remove(A.headElement);
    else if (Q === a.HEAD) A._err(hG.misplacedStartTagForHeadElement);
    else ee(A, B)
  }

  function s85(A, B) {
    let Q = B.tagName;
    if (Q === a.BODY || Q === a.HTML || Q === a.BR) ee(A, B);
    else if (Q === a.TEMPLATE) Dy(A, B);
    else A._err(hG.endTagWithoutMatchingOpenElement)
  }

  function ee(A, B) {
    A._insertFakeElement(a.BODY), A.insertionMode = "IN_BODY_MODE", A._processToken(B)
  }

  function Gy(A, B) {
    A._reconstructActiveFormattingElements(), A._insertCharacters(B)
  }

  function WK1(A, B) {
    A._reconstructActiveFormattingElements(), A._insertCharacters(B), A.framesetOk = !1
  }

  function r85(A, B) {
    if (A.openElements.tmplCount === 0) A.treeAdapter.adoptAttributes(A.openElements.items[0], B.attrs)
  }

  function o85(A, B) {
    let Q = A.openElements.tryPeekProperlyNestedBodyElement();
    if (Q && A.openElements.tmplCount === 0) A.framesetOk = !1, A.treeAdapter.adoptAttributes(Q, B.attrs)
  }

  function t85(A, B) {
    let Q = A.openElements.tryPeekProperlyNestedBodyElement();
    if (A.framesetOk && Q) A.treeAdapter.detachNode(Q), A.openElements.popAllUpToHtmlElement(), A._insertElement(B, g2.HTML), A.insertionMode = "IN_FRAMESET_MODE"
  }

  function M$(A, B) {
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._insertElement(B, g2.HTML)
  }

  function e85(A, B) {
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    let Q = A.openElements.currentTagName;
    if (Q === a.H1 || Q === a.H2 || Q === a.H3 || Q === a.H4 || Q === a.H5 || Q === a.H6) A.openElements.pop();
    A._insertElement(B, g2.HTML)
  }

  function UK2(A, B) {
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._insertElement(B, g2.HTML), A.skipNextNewLine = !0, A.framesetOk = !1
  }

  function AB5(A, B) {
    let Q = A.openElements.tmplCount > 0;
    if (!A.formElement || Q) {
      if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
      if (A._insertElement(B, g2.HTML), !Q) A.formElement = A.openElements.current
    }
  }

  function BB5(A, B) {
    A.framesetOk = !1;
    let Q = B.tagName;
    for (let I = A.openElements.stackTop; I >= 0; I--) {
      let G = A.openElements.items[I],
        Z = A.treeAdapter.getTagName(G),
        D = null;
      if (Q === a.LI && Z === a.LI) D = a.LI;
      else if ((Q === a.DD || Q === a.DT) && (Z === a.DD || Z === a.DT)) D = Z;
      if (D) {
        A.openElements.generateImpliedEndTagsWithExclusion(D), A.openElements.popUntilTagNamePopped(D);
        break
      }
      if (Z !== a.ADDRESS && Z !== a.DIV && Z !== a.P && A._isSpecialElement(G)) break
    }
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._insertElement(B, g2.HTML)
  }

  function QB5(A, B) {
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._insertElement(B, g2.HTML), A.tokenizer.state = AA.MODE.PLAINTEXT
  }

  function IB5(A, B) {
    if (A.openElements.hasInScope(a.BUTTON)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(a.BUTTON);
    A._reconstructActiveFormattingElements(), A._insertElement(B, g2.HTML), A.framesetOk = !1
  }

  function GB5(A, B) {
    let Q = A.activeFormattingElements.getElementEntryInScopeWithTagName(a.A);
    if (Q) SO(A, B), A.openElements.remove(Q.element), A.activeFormattingElements.removeEntry(Q);
    A._reconstructActiveFormattingElements(), A._insertElement(B, g2.HTML), A.activeFormattingElements.pushElement(A.openElements.current, B)
  }

  function nd(A, B) {
    A._reconstructActiveFormattingElements(), A._insertElement(B, g2.HTML), A.activeFormattingElements.pushElement(A.openElements.current, B)
  }

  function ZB5(A, B) {
    if (A._reconstructActiveFormattingElements(), A.openElements.hasInScope(a.NOBR)) SO(A, B), A._reconstructActiveFormattingElements();
    A._insertElement(B, g2.HTML), A.activeFormattingElements.pushElement(A.openElements.current, B)
  }

  function NK2(A, B) {
    A._reconstructActiveFormattingElements(), A._insertElement(B, g2.HTML), A.activeFormattingElements.insertMarker(), A.framesetOk = !1
  }

  function DB5(A, B) {
    if (A.treeAdapter.getDocumentMode(A.document) !== Zy.DOCUMENT_MODE.QUIRKS && A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._insertElement(B, g2.HTML), A.framesetOk = !1, A.insertionMode = "IN_TABLE_MODE"
  }

  function ad(A, B) {
    A._reconstructActiveFormattingElements(), A._appendElement(B, g2.HTML), A.framesetOk = !1, B.ackSelfClosing = !0
  }

  function YB5(A, B) {
    A._reconstructActiveFormattingElements(), A._appendElement(B, g2.HTML);
    let Q = AA.getTokenAttr(B, OK2.TYPE);
    if (!Q || Q.toLowerCase() !== "hidden") A.framesetOk = !1;
    B.ackSelfClosing = !0
  }

  function $K2(A, B) {
    A._appendElement(B, g2.HTML), B.ackSelfClosing = !0
  }

  function WB5(A, B) {
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._appendElement(B, g2.HTML), A.framesetOk = !1, A.ackSelfClosing = !0
  }

  function JB5(A, B) {
    B.tagName = a.IMG, ad(A, B)
  }

  function FB5(A, B) {
    A._insertElement(B, g2.HTML), A.skipNextNewLine = !0, A.tokenizer.state = AA.MODE.RCDATA, A.originalInsertionMode = A.insertionMode, A.framesetOk = !1, A.insertionMode = "TEXT_MODE"
  }

  function XB5(A, B) {
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._reconstructActiveFormattingElements(), A.framesetOk = !1, A._switchToTextParsing(B, AA.MODE.RAWTEXT)
  }

  function VB5(A, B) {
    A.framesetOk = !1, A._switchToTextParsing(B, AA.MODE.RAWTEXT)
  }

  function qK2(A, B) {
    A._switchToTextParsing(B, AA.MODE.RAWTEXT)
  }

  function CB5(A, B) {
    if (A._reconstructActiveFormattingElements(), A._insertElement(B, g2.HTML), A.framesetOk = !1, A.insertionMode === "IN_TABLE_MODE" || A.insertionMode === "IN_CAPTION_MODE" || A.insertionMode === "IN_TABLE_BODY_MODE" || A.insertionMode === "IN_ROW_MODE" || A.insertionMode === "IN_CELL_MODE") A.insertionMode = "IN_SELECT_IN_TABLE_MODE";
    else A.insertionMode = "IN_SELECT_MODE"
  }

  function MK2(A, B) {
    if (A.openElements.currentTagName === a.OPTION) A.openElements.pop();
    A._reconstructActiveFormattingElements(), A._insertElement(B, g2.HTML)
  }

  function LK2(A, B) {
    if (A.openElements.hasInScope(a.RUBY)) A.openElements.generateImpliedEndTags();
    A._insertElement(B, g2.HTML)
  }

  function KB5(A, B) {
    if (A.openElements.hasInScope(a.RUBY)) A.openElements.generateImpliedEndTagsWithExclusion(a.RTC);
    A._insertElement(B, g2.HTML)
  }

  function HB5(A, B) {
    if (A.openElements.hasInButtonScope(a.P)) A._closePElement();
    A._insertElement(B, g2.HTML)
  }

  function zB5(A, B) {
    if (A._reconstructActiveFormattingElements(), IE.adjustTokenMathMLAttrs(B), IE.adjustTokenXMLAttrs(B), B.selfClosing) A._appendElement(B, g2.MATHML);
    else A._insertElement(B, g2.MATHML);
    B.ackSelfClosing = !0
  }

  function wB5(A, B) {
    if (A._reconstructActiveFormattingElements(), IE.adjustTokenSVGAttrs(B), IE.adjustTokenXMLAttrs(B), B.selfClosing) A._appendElement(B, g2.SVG);
    else A._insertElement(B, g2.SVG);
    B.ackSelfClosing = !0
  }

  function YV(A, B) {
    A._reconstructActiveFormattingElements(), A._insertElement(B, g2.HTML)
  }

  function DW(A, B) {
    let Q = B.tagName;
    switch (Q.length) {
      case 1:
        if (Q === a.I || Q === a.S || Q === a.B || Q === a.U) nd(A, B);
        else if (Q === a.P) M$(A, B);
        else if (Q === a.A) GB5(A, B);
        else YV(A, B);
        break;
      case 2:
        if (Q === a.DL || Q === a.OL || Q === a.UL) M$(A, B);
        else if (Q === a.H1 || Q === a.H2 || Q === a.H3 || Q === a.H4 || Q === a.H5 || Q === a.H6) e85(A, B);
        else if (Q === a.LI || Q === a.DD || Q === a.DT) BB5(A, B);
        else if (Q === a.EM || Q === a.TT) nd(A, B);
        else if (Q === a.BR) ad(A, B);
        else if (Q === a.HR) WB5(A, B);
        else if (Q === a.RB) LK2(A, B);
        else if (Q === a.RT || Q === a.RP) KB5(A, B);
        else if (Q !== a.TH && Q !== a.TD && Q !== a.TR) YV(A, B);
        break;
      case 3:
        if (Q === a.DIV || Q === a.DIR || Q === a.NAV) M$(A, B);
        else if (Q === a.PRE) UK2(A, B);
        else if (Q === a.BIG) nd(A, B);
        else if (Q === a.IMG || Q === a.WBR) ad(A, B);
        else if (Q === a.XMP) XB5(A, B);
        else if (Q === a.SVG) wB5(A, B);
        else if (Q === a.RTC) LK2(A, B);
        else if (Q !== a.COL) YV(A, B);
        break;
      case 4:
        if (Q === a.HTML) r85(A, B);
        else if (Q === a.BASE || Q === a.LINK || Q === a.META) fI(A, B);
        else if (Q === a.BODY) o85(A, B);
        else if (Q === a.MAIN || Q === a.MENU) M$(A, B);
        else if (Q === a.FORM) AB5(A, B);
        else if (Q === a.CODE || Q === a.FONT) nd(A, B);
        else if (Q === a.NOBR) ZB5(A, B);
        else if (Q === a.AREA) ad(A, B);
        else if (Q === a.MATH) zB5(A, B);
        else if (Q === a.MENU) HB5(A, B);
        else if (Q !== a.HEAD) YV(A, B);
        break;
      case 5:
        if (Q === a.STYLE || Q === a.TITLE) fI(A, B);
        else if (Q === a.ASIDE) M$(A, B);
        else if (Q === a.SMALL) nd(A, B);
        else if (Q === a.TABLE) DB5(A, B);
        else if (Q === a.EMBED) ad(A, B);
        else if (Q === a.INPUT) YB5(A, B);
        else if (Q === a.PARAM || Q === a.TRACK) $K2(A, B);
        else if (Q === a.IMAGE) JB5(A, B);
        else if (Q !== a.FRAME && Q !== a.TBODY && Q !== a.TFOOT && Q !== a.THEAD) YV(A, B);
        break;
      case 6:
        if (Q === a.SCRIPT) fI(A, B);
        else if (Q === a.CENTER || Q === a.FIGURE || Q === a.FOOTER || Q === a.HEADER || Q === a.HGROUP || Q === a.DIALOG) M$(A, B);
        else if (Q === a.BUTTON) IB5(A, B);
        else if (Q === a.STRIKE || Q === a.STRONG) nd(A, B);
        else if (Q === a.APPLET || Q === a.OBJECT) NK2(A, B);
        else if (Q === a.KEYGEN) ad(A, B);
        else if (Q === a.SOURCE) $K2(A, B);
        else if (Q === a.IFRAME) VB5(A, B);
        else if (Q === a.SELECT) CB5(A, B);
        else if (Q === a.OPTION) MK2(A, B);
        else YV(A, B);
        break;
      case 7:
        if (Q === a.BGSOUND) fI(A, B);
        else if (Q === a.DETAILS || Q === a.ADDRESS || Q === a.ARTICLE || Q === a.SECTION || Q === a.SUMMARY) M$(A, B);
        else if (Q === a.LISTING) UK2(A, B);
        else if (Q === a.MARQUEE) NK2(A, B);
        else if (Q === a.NOEMBED) qK2(A, B);
        else if (Q !== a.CAPTION) YV(A, B);
        break;
      case 8:
        if (Q === a.BASEFONT) fI(A, B);
        else if (Q === a.FRAMESET) t85(A, B);
        else if (Q === a.FIELDSET) M$(A, B);
        else if (Q === a.TEXTAREA) FB5(A, B);
        else if (Q === a.TEMPLATE) fI(A, B);
        else if (Q === a.NOSCRIPT)
          if (A.options.scriptingEnabled) qK2(A, B);
          else YV(A, B);
        else if (Q === a.OPTGROUP) MK2(A, B);
        else if (Q !== a.COLGROUP) YV(A, B);
        break;
      case 9:
        if (Q === a.PLAINTEXT) QB5(A, B);
        else YV(A, B);
        break;
      case 10:
        if (Q === a.BLOCKQUOTE || Q === a.FIGCAPTION) M$(A, B);
        else YV(A, B);
        break;
      default:
        YV(A, B)
    }
  }

  function EB5(A) {
    if (A.openElements.hasInScope(a.BODY)) A.insertionMode = "AFTER_BODY_MODE"
  }

  function UB5(A, B) {
    if (A.openElements.hasInScope(a.BODY)) A.insertionMode = "AFTER_BODY_MODE", A._processToken(B)
  }

  function PO(A, B) {
    let Q = B.tagName;
    if (A.openElements.hasInScope(Q)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(Q)
  }

  function NB5(A) {
    let B = A.openElements.tmplCount > 0,
      Q = A.formElement;
    if (!B) A.formElement = null;
    if ((Q || B) && A.openElements.hasInScope(a.FORM))
      if (A.openElements.generateImpliedEndTags(), B) A.openElements.popUntilTagNamePopped(a.FORM);
      else A.openElements.remove(Q)
  }

  function $B5(A) {
    if (!A.openElements.hasInButtonScope(a.P)) A._insertFakeElement(a.P);
    A._closePElement()
  }

  function qB5(A) {
    if (A.openElements.hasInListItemScope(a.LI)) A.openElements.generateImpliedEndTagsWithExclusion(a.LI), A.openElements.popUntilTagNamePopped(a.LI)
  }

  function MB5(A, B) {
    let Q = B.tagName;
    if (A.openElements.hasInScope(Q)) A.openElements.generateImpliedEndTagsWithExclusion(Q), A.openElements.popUntilTagNamePopped(Q)
  }

  function LB5(A) {
    if (A.openElements.hasNumberedHeaderInScope()) A.openElements.generateImpliedEndTags(), A.openElements.popUntilNumberedHeaderPopped()
  }

  function RK2(A, B) {
    let Q = B.tagName;
    if (A.openElements.hasInScope(Q)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(Q), A.activeFormattingElements.clearToLastMarker()
  }

  function RB5(A) {
    A._reconstructActiveFormattingElements(), A._insertFakeElement(a.BR), A.openElements.pop(), A.framesetOk = !1
  }

  function yK(A, B) {
    let Q = B.tagName;
    for (let I = A.openElements.stackTop; I > 0; I--) {
      let G = A.openElements.items[I];
      if (A.treeAdapter.getTagName(G) === Q) {
        A.openElements.generateImpliedEndTagsWithExclusion(Q), A.openElements.popUntilElementPopped(G);
        break
      }
      if (A._isSpecialElement(G)) break
    }
  }

  function vo1(A, B) {
    let Q = B.tagName;
    switch (Q.length) {
      case 1:
        if (Q === a.A || Q === a.B || Q === a.I || Q === a.S || Q === a.U) SO(A, B);
        else if (Q === a.P) $B5(A, B);
        else yK(A, B);
        break;
      case 2:
        if (Q === a.DL || Q === a.UL || Q === a.OL) PO(A, B);
        else if (Q === a.LI) qB5(A, B);
        else if (Q === a.DD || Q === a.DT) MB5(A, B);
        else if (Q === a.H1 || Q === a.H2 || Q === a.H3 || Q === a.H4 || Q === a.H5 || Q === a.H6) LB5(A, B);
        else if (Q === a.BR) RB5(A, B);
        else if (Q === a.EM || Q === a.TT) SO(A, B);
        else yK(A, B);
        break;
      case 3:
        if (Q === a.BIG) SO(A, B);
        else if (Q === a.DIR || Q === a.DIV || Q === a.NAV || Q === a.PRE) PO(A, B);
        else yK(A, B);
        break;
      case 4:
        if (Q === a.BODY) EB5(A, B);
        else if (Q === a.HTML) UB5(A, B);
        else if (Q === a.FORM) NB5(A, B);
        else if (Q === a.CODE || Q === a.FONT || Q === a.NOBR) SO(A, B);
        else if (Q === a.MAIN || Q === a.MENU) PO(A, B);
        else yK(A, B);
        break;
      case 5:
        if (Q === a.ASIDE) PO(A, B);
        else if (Q === a.SMALL) SO(A, B);
        else yK(A, B);
        break;
      case 6:
        if (Q === a.CENTER || Q === a.FIGURE || Q === a.FOOTER || Q === a.HEADER || Q === a.HGROUP || Q === a.DIALOG) PO(A, B);
        else if (Q === a.APPLET || Q === a.OBJECT) RK2(A, B);
        else if (Q === a.STRIKE || Q === a.STRONG) SO(A, B);
        else yK(A, B);
        break;
      case 7:
        if (Q === a.ADDRESS || Q === a.ARTICLE || Q === a.DETAILS || Q === a.SECTION || Q === a.SUMMARY || Q === a.LISTING) PO(A, B);
        else if (Q === a.MARQUEE) RK2(A, B);
        else yK(A, B);
        break;
      case 8:
        if (Q === a.FIELDSET) PO(A, B);
        else if (Q === a.TEMPLATE) Dy(A, B);
        else yK(A, B);
        break;
      case 10:
        if (Q === a.BLOCKQUOTE || Q === a.FIGCAPTION) PO(A, B);
        else yK(A, B);
        break;
      default:
        yK(A, B)
    }
  }

  function L$(A, B) {
    if (A.tmplInsertionModeStackTop > -1) _K2(A, B);
    else A.stopped = !0
  }

  function OB5(A, B) {
    if (B.tagName === a.SCRIPT) A.pendingScript = A.openElements.current;
    A.openElements.pop(), A.insertionMode = A.originalInsertionMode
  }

  function TB5(A, B) {
    A._err(hG.eofInElementThatCanContainOnlyText), A.openElements.pop(), A.insertionMode = A.originalInsertionMode, A._processToken(B)
  }

  function R$(A, B) {
    let Q = A.openElements.currentTagName;
    if (Q === a.TABLE || Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD || Q === a.TR) A.pendingCharacterTokens = [], A.hasNonWhitespacePendingCharacterToken = !1, A.originalInsertionMode = A.insertionMode, A.insertionMode = "IN_TABLE_TEXT_MODE", A._processToken(B);
    else WV(A, B)
  }

  function PB5(A, B) {
    A.openElements.clearBackToTableContext(), A.activeFormattingElements.insertMarker(), A._insertElement(B, g2.HTML), A.insertionMode = "IN_CAPTION_MODE"
  }

  function SB5(A, B) {
    A.openElements.clearBackToTableContext(), A._insertElement(B, g2.HTML), A.insertionMode = "IN_COLUMN_GROUP_MODE"
  }

  function _B5(A, B) {
    A.openElements.clearBackToTableContext(), A._insertFakeElement(a.COLGROUP), A.insertionMode = "IN_COLUMN_GROUP_MODE", A._processToken(B)
  }

  function jB5(A, B) {
    A.openElements.clearBackToTableContext(), A._insertElement(B, g2.HTML), A.insertionMode = "IN_TABLE_BODY_MODE"
  }

  function yB5(A, B) {
    A.openElements.clearBackToTableContext(), A._insertFakeElement(a.TBODY), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
  }

  function kB5(A, B) {
    if (A.openElements.hasInTableScope(a.TABLE)) A.openElements.popUntilTagNamePopped(a.TABLE), A._resetInsertionMode(), A._processToken(B)
  }

  function xB5(A, B) {
    let Q = AA.getTokenAttr(B, OK2.TYPE);
    if (Q && Q.toLowerCase() === "hidden") A._appendElement(B, g2.HTML);
    else WV(A, B);
    B.ackSelfClosing = !0
  }

  function fB5(A, B) {
    if (!A.formElement && A.openElements.tmplCount === 0) A._insertElement(B, g2.HTML), A.formElement = A.openElements.current, A.openElements.pop()
  }

  function bo1(A, B) {
    let Q = B.tagName;
    switch (Q.length) {
      case 2:
        if (Q === a.TD || Q === a.TH || Q === a.TR) yB5(A, B);
        else WV(A, B);
        break;
      case 3:
        if (Q === a.COL) _B5(A, B);
        else WV(A, B);
        break;
      case 4:
        if (Q === a.FORM) fB5(A, B);
        else WV(A, B);
        break;
      case 5:
        if (Q === a.TABLE) kB5(A, B);
        else if (Q === a.STYLE) fI(A, B);
        else if (Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD) jB5(A, B);
        else if (Q === a.INPUT) xB5(A, B);
        else WV(A, B);
        break;
      case 6:
        if (Q === a.SCRIPT) fI(A, B);
        else WV(A, B);
        break;
      case 7:
        if (Q === a.CAPTION) PB5(A, B);
        else WV(A, B);
        break;
      case 8:
        if (Q === a.COLGROUP) SB5(A, B);
        else if (Q === a.TEMPLATE) fI(A, B);
        else WV(A, B);
        break;
      default:
        WV(A, B)
    }
  }

  function go1(A, B) {
    let Q = B.tagName;
    if (Q === a.TABLE) {
      if (A.openElements.hasInTableScope(a.TABLE)) A.openElements.popUntilTagNamePopped(a.TABLE), A._resetInsertionMode()
    } else if (Q === a.TEMPLATE) Dy(A, B);
    else if (Q !== a.BODY && Q !== a.CAPTION && Q !== a.COL && Q !== a.COLGROUP && Q !== a.HTML && Q !== a.TBODY && Q !== a.TD && Q !== a.TFOOT && Q !== a.TH && Q !== a.THEAD && Q !== a.TR) WV(A, B)
  }

  function WV(A, B) {
    let Q = A.fosterParentingEnabled;
    A.fosterParentingEnabled = !0, A._processTokenInBodyMode(B), A.fosterParentingEnabled = Q
  }

  function vB5(A, B) {
    A.pendingCharacterTokens.push(B)
  }

  function bB5(A, B) {
    A.pendingCharacterTokens.push(B), A.hasNonWhitespacePendingCharacterToken = !0
  }

  function ae(A, B) {
    let Q = 0;
    if (A.hasNonWhitespacePendingCharacterToken)
      for (; Q < A.pendingCharacterTokens.length; Q++) WV(A, A.pendingCharacterTokens[Q]);
    else
      for (; Q < A.pendingCharacterTokens.length; Q++) A._insertCharacters(A.pendingCharacterTokens[Q]);
    A.insertionMode = A.originalInsertionMode, A._processToken(B)
  }

  function gB5(A, B) {
    let Q = B.tagName;
    if (Q === a.CAPTION || Q === a.COL || Q === a.COLGROUP || Q === a.TBODY || Q === a.TD || Q === a.TFOOT || Q === a.TH || Q === a.THEAD || Q === a.TR) {
      if (A.openElements.hasInTableScope(a.CAPTION)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(a.CAPTION), A.activeFormattingElements.clearToLastMarker(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
    } else DW(A, B)
  }

  function hB5(A, B) {
    let Q = B.tagName;
    if (Q === a.CAPTION || Q === a.TABLE) {
      if (A.openElements.hasInTableScope(a.CAPTION)) {
        if (A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(a.CAPTION), A.activeFormattingElements.clearToLastMarker(), A.insertionMode = "IN_TABLE_MODE", Q === a.TABLE) A._processToken(B)
      }
    } else if (Q !== a.BODY && Q !== a.COL && Q !== a.COLGROUP && Q !== a.HTML && Q !== a.TBODY && Q !== a.TD && Q !== a.TFOOT && Q !== a.TH && Q !== a.THEAD && Q !== a.TR) vo1(A, B)
  }

  function mB5(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.COL) A._appendElement(B, g2.HTML), B.ackSelfClosing = !0;
    else if (Q === a.TEMPLATE) fI(A, B);
    else FK1(A, B)
  }

  function dB5(A, B) {
    let Q = B.tagName;
    if (Q === a.COLGROUP) {
      if (A.openElements.currentTagName === a.COLGROUP) A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE"
    } else if (Q === a.TEMPLATE) Dy(A, B);
    else if (Q !== a.COL) FK1(A, B)
  }

  function FK1(A, B) {
    if (A.openElements.currentTagName === a.COLGROUP) A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
  }

  function uB5(A, B) {
    let Q = B.tagName;
    if (Q === a.TR) A.openElements.clearBackToTableBodyContext(), A._insertElement(B, g2.HTML), A.insertionMode = "IN_ROW_MODE";
    else if (Q === a.TH || Q === a.TD) A.openElements.clearBackToTableBodyContext(), A._insertFakeElement(a.TR), A.insertionMode = "IN_ROW_MODE", A._processToken(B);
    else if (Q === a.CAPTION || Q === a.COL || Q === a.COLGROUP || Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD) {
      if (A.openElements.hasTableBodyContextInTableScope()) A.openElements.clearBackToTableBodyContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
    } else bo1(A, B)
  }

  function pB5(A, B) {
    let Q = B.tagName;
    if (Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD) {
      if (A.openElements.hasInTableScope(Q)) A.openElements.clearBackToTableBodyContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE"
    } else if (Q === a.TABLE) {
      if (A.openElements.hasTableBodyContextInTableScope()) A.openElements.clearBackToTableBodyContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
    } else if (Q !== a.BODY && Q !== a.CAPTION && Q !== a.COL && Q !== a.COLGROUP || Q !== a.HTML && Q !== a.TD && Q !== a.TH && Q !== a.TR) go1(A, B)
  }

  function cB5(A, B) {
    let Q = B.tagName;
    if (Q === a.TH || Q === a.TD) A.openElements.clearBackToTableRowContext(), A._insertElement(B, g2.HTML), A.insertionMode = "IN_CELL_MODE", A.activeFormattingElements.insertMarker();
    else if (Q === a.CAPTION || Q === a.COL || Q === a.COLGROUP || Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD || Q === a.TR) {
      if (A.openElements.hasInTableScope(a.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
    } else bo1(A, B)
  }

  function lB5(A, B) {
    let Q = B.tagName;
    if (Q === a.TR) {
      if (A.openElements.hasInTableScope(a.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE"
    } else if (Q === a.TABLE) {
      if (A.openElements.hasInTableScope(a.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
    } else if (Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD) {
      if (A.openElements.hasInTableScope(Q) || A.openElements.hasInTableScope(a.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
    } else if (Q !== a.BODY && Q !== a.CAPTION && Q !== a.COL && Q !== a.COLGROUP || Q !== a.HTML && Q !== a.TD && Q !== a.TH) go1(A, B)
  }

  function iB5(A, B) {
    let Q = B.tagName;
    if (Q === a.CAPTION || Q === a.COL || Q === a.COLGROUP || Q === a.TBODY || Q === a.TD || Q === a.TFOOT || Q === a.TH || Q === a.THEAD || Q === a.TR) {
      if (A.openElements.hasInTableScope(a.TD) || A.openElements.hasInTableScope(a.TH)) A._closeTableCell(), A._processToken(B)
    } else DW(A, B)
  }

  function nB5(A, B) {
    let Q = B.tagName;
    if (Q === a.TD || Q === a.TH) {
      if (A.openElements.hasInTableScope(Q)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(Q), A.activeFormattingElements.clearToLastMarker(), A.insertionMode = "IN_ROW_MODE"
    } else if (Q === a.TABLE || Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD || Q === a.TR) {
      if (A.openElements.hasInTableScope(Q)) A._closeTableCell(), A._processToken(B)
    } else if (Q !== a.BODY && Q !== a.CAPTION && Q !== a.COL && Q !== a.COLGROUP && Q !== a.HTML) vo1(A, B)
  }

  function PK2(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.OPTION) {
      if (A.openElements.currentTagName === a.OPTION) A.openElements.pop();
      A._insertElement(B, g2.HTML)
    } else if (Q === a.OPTGROUP) {
      if (A.openElements.currentTagName === a.OPTION) A.openElements.pop();
      if (A.openElements.currentTagName === a.OPTGROUP) A.openElements.pop();
      A._insertElement(B, g2.HTML)
    } else if (Q === a.INPUT || Q === a.KEYGEN || Q === a.TEXTAREA || Q === a.SELECT) {
      if (A.openElements.hasInSelectScope(a.SELECT)) {
        if (A.openElements.popUntilTagNamePopped(a.SELECT), A._resetInsertionMode(), Q !== a.SELECT) A._processToken(B)
      }
    } else if (Q === a.SCRIPT || Q === a.TEMPLATE) fI(A, B)
  }

  function SK2(A, B) {
    let Q = B.tagName;
    if (Q === a.OPTGROUP) {
      let I = A.openElements.items[A.openElements.stackTop - 1],
        G = I && A.treeAdapter.getTagName(I);
      if (A.openElements.currentTagName === a.OPTION && G === a.OPTGROUP) A.openElements.pop();
      if (A.openElements.currentTagName === a.OPTGROUP) A.openElements.pop()
    } else if (Q === a.OPTION) {
      if (A.openElements.currentTagName === a.OPTION) A.openElements.pop()
    } else if (Q === a.SELECT && A.openElements.hasInSelectScope(a.SELECT)) A.openElements.popUntilTagNamePopped(a.SELECT), A._resetInsertionMode();
    else if (Q === a.TEMPLATE) Dy(A, B)
  }

  function aB5(A, B) {
    let Q = B.tagName;
    if (Q === a.CAPTION || Q === a.TABLE || Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD || Q === a.TR || Q === a.TD || Q === a.TH) A.openElements.popUntilTagNamePopped(a.SELECT), A._resetInsertionMode(), A._processToken(B);
    else PK2(A, B)
  }

  function sB5(A, B) {
    let Q = B.tagName;
    if (Q === a.CAPTION || Q === a.TABLE || Q === a.TBODY || Q === a.TFOOT || Q === a.THEAD || Q === a.TR || Q === a.TD || Q === a.TH) {
      if (A.openElements.hasInTableScope(Q)) A.openElements.popUntilTagNamePopped(a.SELECT), A._resetInsertionMode(), A._processToken(B)
    } else SK2(A, B)
  }

  function rB5(A, B) {
    let Q = B.tagName;
    if (Q === a.BASE || Q === a.BASEFONT || Q === a.BGSOUND || Q === a.LINK || Q === a.META || Q === a.NOFRAMES || Q === a.SCRIPT || Q === a.STYLE || Q === a.TEMPLATE || Q === a.TITLE) fI(A, B);
    else {
      let I = k85[Q] || "IN_BODY_MODE";
      A._popTmplInsertionMode(), A._pushTmplInsertionMode(I), A.insertionMode = I, A._processToken(B)
    }
  }

  function oB5(A, B) {
    if (B.tagName === a.TEMPLATE) Dy(A, B)
  }

  function _K2(A, B) {
    if (A.openElements.tmplCount > 0) A.openElements.popUntilTagNamePopped(a.TEMPLATE), A.activeFormattingElements.clearToLastMarker(), A._popTmplInsertionMode(), A._resetInsertionMode(), A._processToken(B);
    else A.stopped = !0
  }

  function tB5(A, B) {
    if (B.tagName === a.HTML) DW(A, B);
    else XK1(A, B)
  }

  function eB5(A, B) {
    if (B.tagName === a.HTML) {
      if (!A.fragmentContext) A.insertionMode = "AFTER_AFTER_BODY_MODE"
    } else XK1(A, B)
  }

  function XK1(A, B) {
    A.insertionMode = "IN_BODY_MODE", A._processToken(B)
  }

  function A35(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.FRAMESET) A._insertElement(B, g2.HTML);
    else if (Q === a.FRAME) A._appendElement(B, g2.HTML), B.ackSelfClosing = !0;
    else if (Q === a.NOFRAMES) fI(A, B)
  }

  function B35(A, B) {
    if (B.tagName === a.FRAMESET && !A.openElements.isRootHtmlElementCurrent()) {
      if (A.openElements.pop(), !A.fragmentContext && A.openElements.currentTagName !== a.FRAMESET) A.insertionMode = "AFTER_FRAMESET_MODE"
    }
  }

  function Q35(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.NOFRAMES) fI(A, B)
  }

  function I35(A, B) {
    if (B.tagName === a.HTML) A.insertionMode = "AFTER_AFTER_FRAMESET_MODE"
  }

  function G35(A, B) {
    if (B.tagName === a.HTML) DW(A, B);
    else JK1(A, B)
  }

  function JK1(A, B) {
    A.insertionMode = "IN_BODY_MODE", A._processToken(B)
  }

  function Z35(A, B) {
    let Q = B.tagName;
    if (Q === a.HTML) DW(A, B);
    else if (Q === a.NOFRAMES) fI(A, B)
  }

  function D35(A, B) {
    B.chars = _85.REPLACEMENT_CHARACTER, A._insertCharacters(B)
  }

  function Y35(A, B) {
    A._insertCharacters(B), A.framesetOk = !1
  }

  function W35(A, B) {
    if (IE.causesExit(B) && !A.fragmentContext) {
      while (A.treeAdapter.getNamespaceURI(A.openElements.current) !== g2.HTML && !A._isIntegrationPoint(A.openElements.current)) A.openElements.pop();
      A._processToken(B)
    } else {
      let Q = A._getAdjustedCurrentElement(),
        I = A.treeAdapter.getNamespaceURI(Q);
      if (I === g2.MATHML) IE.adjustTokenMathMLAttrs(B);
      else if (I === g2.SVG) IE.adjustTokenSVGTagName(B), IE.adjustTokenSVGAttrs(B);
      if (IE.adjustTokenXMLAttrs(B), B.selfClosing) A._appendElement(B, I);
      else A._insertElement(B, I);
      B.ackSelfClosing = !0
    }
  }

  function J35(A, B) {
    for (let Q = A.openElements.stackTop; Q > 0; Q--) {
      let I = A.openElements.items[Q];
      if (A.treeAdapter.getNamespaceURI(I) === g2.HTML) {
        A._processToken(B);
        break
      }
      if (A.treeAdapter.getTagName(I).toLowerCase() === B.tagName) {
        A.openElements.popUntilElementPopped(I);
        break
      }
    }
  }
})
// @from(Start 7331752, End 7335111)
fK2 = z((vi8, xK2) => {
  var F35 = _o1(),
    X35 = jo1(),
    V35 = yo1(),
    kK2 = TO(),
    n8 = kK2.TAG_NAMES,
    VK1 = kK2.NAMESPACES,
    C35 = {
      treeAdapter: F35
    },
    K35 = /&/g,
    H35 = /\u00a0/g,
    z35 = /"/g,
    w35 = /</g,
    E35 = />/g;
  class A11 {
    constructor(A, B) {
      this.options = X35(C35, B), this.treeAdapter = this.options.treeAdapter, this.html = "", this.startNode = A
    }
    serialize() {
      return this._serializeChildNodes(this.startNode), this.html
    }
    _serializeChildNodes(A) {
      let B = this.treeAdapter.getChildNodes(A);
      if (B)
        for (let Q = 0, I = B.length; Q < I; Q++) {
          let G = B[Q];
          if (this.treeAdapter.isElementNode(G)) this._serializeElement(G);
          else if (this.treeAdapter.isTextNode(G)) this._serializeTextNode(G);
          else if (this.treeAdapter.isCommentNode(G)) this._serializeCommentNode(G);
          else if (this.treeAdapter.isDocumentTypeNode(G)) this._serializeDocumentTypeNode(G)
        }
    }
    _serializeElement(A) {
      let B = this.treeAdapter.getTagName(A),
        Q = this.treeAdapter.getNamespaceURI(A);
      if (this.html += "<" + B, this._serializeAttributes(A), this.html += ">", B !== n8.AREA && B !== n8.BASE && B !== n8.BASEFONT && B !== n8.BGSOUND && B !== n8.BR && B !== n8.COL && B !== n8.EMBED && B !== n8.FRAME && B !== n8.HR && B !== n8.IMG && B !== n8.INPUT && B !== n8.KEYGEN && B !== n8.LINK && B !== n8.META && B !== n8.PARAM && B !== n8.SOURCE && B !== n8.TRACK && B !== n8.WBR) {
        let I = B === n8.TEMPLATE && Q === VK1.HTML ? this.treeAdapter.getTemplateContent(A) : A;
        this._serializeChildNodes(I), this.html += "</" + B + ">"
      }
    }
    _serializeAttributes(A) {
      let B = this.treeAdapter.getAttrList(A);
      for (let Q = 0, I = B.length; Q < I; Q++) {
        let G = B[Q],
          Z = A11.escapeString(G.value, !0);
        if (this.html += " ", !G.namespace) this.html += G.name;
        else if (G.namespace === VK1.XML) this.html += "xml:" + G.name;
        else if (G.namespace === VK1.XMLNS) {
          if (G.name !== "xmlns") this.html += "xmlns:";
          this.html += G.name
        } else if (G.namespace === VK1.XLINK) this.html += "xlink:" + G.name;
        else this.html += G.prefix + ":" + G.name;
        this.html += '="' + Z + '"'
      }
    }
    _serializeTextNode(A) {
      let B = this.treeAdapter.getTextNodeContent(A),
        Q = this.treeAdapter.getParentNode(A),
        I = void 0;
      if (Q && this.treeAdapter.isElementNode(Q)) I = this.treeAdapter.getTagName(Q);
      if (I === n8.STYLE || I === n8.SCRIPT || I === n8.XMP || I === n8.IFRAME || I === n8.NOEMBED || I === n8.NOFRAMES || I === n8.PLAINTEXT || I === n8.NOSCRIPT) this.html += B;
      else this.html += A11.escapeString(B, !1)
    }
    _serializeCommentNode(A) {
      this.html += "<!--" + this.treeAdapter.getCommentNodeContent(A) + "-->"
    }
    _serializeDocumentTypeNode(A) {
      let B = this.treeAdapter.getDocumentTypeNodeName(A);
      this.html += "<" + V35.serializeContent(B, null, null) + ">"
    }
  }
  A11.escapeString = function(A, B) {
    if (A = A.replace(K35, "&amp;").replace(H35, "&nbsp;"), B) A = A.replace(z35, "&quot;");
    else A = A.replace(w35, "&lt;").replace(E35, "&gt;");
    return A
  };
  xK2.exports = A11
})
// @from(Start 7335117, End 7335465)
bK2 = z((N35) => {
  var vK2 = yK2(),
    U35 = fK2();
  N35.parse = function A(B, Q) {
    return new vK2(Q).parse(B)
  };
  N35.parseFragment = function A(B, Q, I) {
    if (typeof B === "string") I = Q, Q = B, B = null;
    return new vK2(I).parseFragment(Q, B)
  };
  N35.serialize = function(A, B) {
    return new U35(A, B).serialize()
  }
})
// @from(Start 7335471, End 7340551)
mo1 = z((L35) => {
  var ho1 = L35.NAMESPACES = {
    HTML: "http://www.w3.org/1999/xhtml",
    MATHML: "http://www.w3.org/1998/Math/MathML",
    SVG: "http://www.w3.org/2000/svg",
    XLINK: "http://www.w3.org/1999/xlink",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/"
  };
  L35.ATTRS = {
    TYPE: "type",
    ACTION: "action",
    ENCODING: "encoding",
    PROMPT: "prompt",
    NAME: "name",
    COLOR: "color",
    FACE: "face",
    SIZE: "size"
  };
  L35.DOCUMENT_MODE = {
    NO_QUIRKS: "no-quirks",
    QUIRKS: "quirks",
    LIMITED_QUIRKS: "limited-quirks"
  };
  var _0 = L35.TAG_NAMES = {
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
  L35.SPECIAL_ELEMENTS = {
    [ho1.HTML]: {
      [_0.ADDRESS]: !0,
      [_0.APPLET]: !0,
      [_0.AREA]: !0,
      [_0.ARTICLE]: !0,
      [_0.ASIDE]: !0,
      [_0.BASE]: !0,
      [_0.BASEFONT]: !0,
      [_0.BGSOUND]: !0,
      [_0.BLOCKQUOTE]: !0,
      [_0.BODY]: !0,
      [_0.BR]: !0,
      [_0.BUTTON]: !0,
      [_0.CAPTION]: !0,
      [_0.CENTER]: !0,
      [_0.COL]: !0,
      [_0.COLGROUP]: !0,
      [_0.DD]: !0,
      [_0.DETAILS]: !0,
      [_0.DIR]: !0,
      [_0.DIV]: !0,
      [_0.DL]: !0,
      [_0.DT]: !0,
      [_0.EMBED]: !0,
      [_0.FIELDSET]: !0,
      [_0.FIGCAPTION]: !0,
      [_0.FIGURE]: !0,
      [_0.FOOTER]: !0,
      [_0.FORM]: !0,
      [_0.FRAME]: !0,
      [_0.FRAMESET]: !0,
      [_0.H1]: !0,
      [_0.H2]: !0,
      [_0.H3]: !0,
      [_0.H4]: !0,
      [_0.H5]: !0,
      [_0.H6]: !0,
      [_0.HEAD]: !0,
      [_0.HEADER]: !0,
      [_0.HGROUP]: !0,
      [_0.HR]: !0,
      [_0.HTML]: !0,
      [_0.IFRAME]: !0,
      [_0.IMG]: !0,
      [_0.INPUT]: !0,
      [_0.LI]: !0,
      [_0.LINK]: !0,
      [_0.LISTING]: !0,
      [_0.MAIN]: !0,
      [_0.MARQUEE]: !0,
      [_0.MENU]: !0,
      [_0.META]: !0,
      [_0.NAV]: !0,
      [_0.NOEMBED]: !0,
      [_0.NOFRAMES]: !0,
      [_0.NOSCRIPT]: !0,
      [_0.OBJECT]: !0,
      [_0.OL]: !0,
      [_0.P]: !0,
      [_0.PARAM]: !0,
      [_0.PLAINTEXT]: !0,
      [_0.PRE]: !0,
      [_0.SCRIPT]: !0,
      [_0.SECTION]: !0,
      [_0.SELECT]: !0,
      [_0.SOURCE]: !0,
      [_0.STYLE]: !0,
      [_0.SUMMARY]: !0,
      [_0.TABLE]: !0,
      [_0.TBODY]: !0,
      [_0.TD]: !0,
      [_0.TEMPLATE]: !0,
      [_0.TEXTAREA]: !0,
      [_0.TFOOT]: !0,
      [_0.TH]: !0,
      [_0.THEAD]: !0,
      [_0.TITLE]: !0,
      [_0.TR]: !0,
      [_0.TRACK]: !0,
      [_0.UL]: !0,
      [_0.WBR]: !0,
      [_0.XMP]: !0
    },
    [ho1.MATHML]: {
      [_0.MI]: !0,
      [_0.MO]: !0,
      [_0.MN]: !0,
      [_0.MS]: !0,
      [_0.MTEXT]: !0,
      [_0.ANNOTATION_XML]: !0
    },
    [ho1.SVG]: {
      [_0.TITLE]: !0,
      [_0.FOREIGN_OBJECT]: !0,
      [_0.DESC]: !0
    }
  }
})
// @from(Start 7340557, End 7344346)
uK2 = z((j35) => {
  var {
    DOCUMENT_MODE: sd
  } = mo1(), mK2 = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"], P35 = mK2.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]), S35 = ["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"], dK2 = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], _35 = dK2.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]);

  function gK2(A) {
    let B = A.indexOf('"') !== -1 ? "'" : '"';
    return B + A + B
  }

  function hK2(A, B) {
    for (let Q = 0; Q < B.length; Q++)
      if (A.indexOf(B[Q]) === 0) return !0;
    return !1
  }
  j35.isConforming = function(A) {
    return A.name === "html" && A.publicId === null && (A.systemId === null || A.systemId === "about:legacy-compat")
  };
  j35.getDocumentMode = function(A) {
    if (A.name !== "html") return sd.QUIRKS;
    let B = A.systemId;
    if (B && B.toLowerCase() === "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd") return sd.QUIRKS;
    let Q = A.publicId;
    if (Q !== null) {
      if (Q = Q.toLowerCase(), S35.indexOf(Q) > -1) return sd.QUIRKS;
      let I = B === null ? P35 : mK2;
      if (hK2(Q, I)) return sd.QUIRKS;
      if (I = B === null ? dK2 : _35, hK2(Q, I)) return sd.LIMITED_QUIRKS
    }
    return sd.NO_QUIRKS
  };
  j35.serializeContent = function(A, B, Q) {
    let I = "!DOCTYPE ";
    if (A) I += A;
    if (B) I += " PUBLIC " + gK2(B);
    else if (Q) I += " SYSTEM";
    if (Q !== null) I += " " + gK2(Q);
    return I
  }
})
// @from(Start 7344352, End 7350191)
iK2 = z((g35) => {
  var f35 = uK2(),
    {
      DOCUMENT_MODE: v35
    } = mo1(),
    pK2 = {
      element: 1,
      text: 3,
      cdata: 4,
      comment: 8
    },
    cK2 = {
      tagName: "name",
      childNodes: "children",
      parentNode: "parent",
      previousSibling: "prev",
      nextSibling: "next",
      nodeValue: "data"
    };
  class _O {
    constructor(A) {
      for (let B of Object.keys(A)) this[B] = A[B]
    }
    get firstChild() {
      let A = this.children;
      return A && A[0] || null
    }
    get lastChild() {
      let A = this.children;
      return A && A[A.length - 1] || null
    }
    get nodeType() {
      return pK2[this.type] || pK2.element
    }
  }
  Object.keys(cK2).forEach((A) => {
    let B = cK2[A];
    Object.defineProperty(_O.prototype, A, {
      get: function() {
        return this[B] || null
      },
      set: function(Q) {
        return this[B] = Q, Q
      }
    })
  });
  g35.createDocument = function() {
    return new _O({
      type: "root",
      name: "root",
      parent: null,
      prev: null,
      next: null,
      children: [],
      "x-mode": v35.NO_QUIRKS
    })
  };
  g35.createDocumentFragment = function() {
    return new _O({
      type: "root",
      name: "root",
      parent: null,
      prev: null,
      next: null,
      children: []
    })
  };
  g35.createElement = function(A, B, Q) {
    let I = Object.create(null),
      G = Object.create(null),
      Z = Object.create(null);
    for (let D = 0; D < Q.length; D++) {
      let Y = Q[D].name;
      I[Y] = Q[D].value, G[Y] = Q[D].namespace, Z[Y] = Q[D].prefix
    }
    return new _O({
      type: A === "script" || A === "style" ? A : "tag",
      name: A,
      namespace: B,
      attribs: I,
      "x-attribsNamespace": G,
      "x-attribsPrefix": Z,
      children: [],
      parent: null,
      prev: null,
      next: null
    })
  };
  g35.createCommentNode = function(A) {
    return new _O({
      type: "comment",
      data: A,
      parent: null,
      prev: null,
      next: null
    })
  };
  var lK2 = function(A) {
      return new _O({
        type: "text",
        data: A,
        parent: null,
        prev: null,
        next: null
      })
    },
    do1 = g35.appendChild = function(A, B) {
      let Q = A.children[A.children.length - 1];
      if (Q) Q.next = B, B.prev = Q;
      A.children.push(B), B.parent = A
    },
    b35 = g35.insertBefore = function(A, B, Q) {
      let I = A.children.indexOf(Q),
        G = Q.prev;
      if (G) G.next = B, B.prev = G;
      Q.prev = B, B.next = Q, A.children.splice(I, 0, B), B.parent = A
    };
  g35.setTemplateContent = function(A, B) {
    do1(A, B)
  };
  g35.getTemplateContent = function(A) {
    return A.children[0]
  };
  g35.setDocumentType = function(A, B, Q, I) {
    let G = f35.serializeContent(B, Q, I),
      Z = null;
    for (let D = 0; D < A.children.length; D++)
      if (A.children[D].type === "directive" && A.children[D].name === "!doctype") {
        Z = A.children[D];
        break
      } if (Z) Z.data = G, Z["x-name"] = B, Z["x-publicId"] = Q, Z["x-systemId"] = I;
    else do1(A, new _O({
      type: "directive",
      name: "!doctype",
      data: G,
      "x-name": B,
      "x-publicId": Q,
      "x-systemId": I
    }))
  };
  g35.setDocumentMode = function(A, B) {
    A["x-mode"] = B
  };
  g35.getDocumentMode = function(A) {
    return A["x-mode"]
  };
  g35.detachNode = function(A) {
    if (A.parent) {
      let B = A.parent.children.indexOf(A),
        Q = A.prev,
        I = A.next;
      if (A.prev = null, A.next = null, Q) Q.next = I;
      if (I) I.prev = Q;
      A.parent.children.splice(B, 1), A.parent = null
    }
  };
  g35.insertText = function(A, B) {
    let Q = A.children[A.children.length - 1];
    if (Q && Q.type === "text") Q.data += B;
    else do1(A, lK2(B))
  };
  g35.insertTextBefore = function(A, B, Q) {
    let I = A.children[A.children.indexOf(Q) - 1];
    if (I && I.type === "text") I.data += B;
    else b35(A, lK2(B), Q)
  };
  g35.adoptAttributes = function(A, B) {
    for (let Q = 0; Q < B.length; Q++) {
      let I = B[Q].name;
      if (typeof A.attribs[I] === "undefined") A.attribs[I] = B[Q].value, A["x-attribsNamespace"][I] = B[Q].namespace, A["x-attribsPrefix"][I] = B[Q].prefix
    }
  };
  g35.getFirstChild = function(A) {
    return A.children[0]
  };
  g35.getChildNodes = function(A) {
    return A.children
  };
  g35.getParentNode = function(A) {
    return A.parent
  };
  g35.getAttrList = function(A) {
    let B = [];
    for (let Q in A.attribs) B.push({
      name: Q,
      value: A.attribs[Q],
      namespace: A["x-attribsNamespace"][Q],
      prefix: A["x-attribsPrefix"][Q]
    });
    return B
  };
  g35.getTagName = function(A) {
    return A.name
  };
  g35.getNamespaceURI = function(A) {
    return A.namespace
  };
  g35.getTextNodeContent = function(A) {
    return A.data
  };
  g35.getCommentNodeContent = function(A) {
    return A.data
  };
  g35.getDocumentTypeNodeName = function(A) {
    return A["x-name"]
  };
  g35.getDocumentTypeNodePublicId = function(A) {
    return A["x-publicId"]
  };
  g35.getDocumentTypeNodeSystemId = function(A) {
    return A["x-systemId"]
  };
  g35.isTextNode = function(A) {
    return A.type === "text"
  };
  g35.isCommentNode = function(A) {
    return A.type === "comment"
  };
  g35.isDocumentTypeNode = function(A) {
    return A.type === "directive" && A.name === "!doctype"
  };
  g35.isElementNode = function(A) {
    return !!A.attribs
  };
  g35.setNodeSourceCodeLocation = function(A, B) {
    A.sourceCodeLocation = B
  };
  g35.getNodeSourceCodeLocation = function(A) {
    return A.sourceCodeLocation
  };
  g35.updateNodeSourceCodeLocation = function(A, B) {
    A.sourceCodeLocation = Object.assign(A.sourceCodeLocation, B)
  }
})
// @from(Start 7350197, End 7354822)
uo1 = z((li8, nK2) => {
  nK2.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  }
})
// @from(Start 7354828, End 7369264)
po1 = z((ii8, sK2) => {
  var B11 = uo1(),
    aK2 = {};
  for (let A of Object.keys(B11)) aK2[B11[A]] = A;
  var e2 = {
    rgb: {
      channels: 3,
      labels: "rgb"
    },
    hsl: {
      channels: 3,
      labels: "hsl"
    },
    hsv: {
      channels: 3,
      labels: "hsv"
    },
    hwb: {
      channels: 3,
      labels: "hwb"
    },
    cmyk: {
      channels: 4,
      labels: "cmyk"
    },
    xyz: {
      channels: 3,
      labels: "xyz"
    },
    lab: {
      channels: 3,
      labels: "lab"
    },
    lch: {
      channels: 3,
      labels: "lch"
    },
    hex: {
      channels: 1,
      labels: ["hex"]
    },
    keyword: {
      channels: 1,
      labels: ["keyword"]
    },
    ansi16: {
      channels: 1,
      labels: ["ansi16"]
    },
    ansi256: {
      channels: 1,
      labels: ["ansi256"]
    },
    hcg: {
      channels: 3,
      labels: ["h", "c", "g"]
    },
    apple: {
      channels: 3,
      labels: ["r16", "g16", "b16"]
    },
    gray: {
      channels: 1,
      labels: ["gray"]
    }
  };
  sK2.exports = e2;
  for (let A of Object.keys(e2)) {
    if (!("channels" in e2[A])) throw new Error("missing channels property: " + A);
    if (!("labels" in e2[A])) throw new Error("missing channel labels property: " + A);
    if (e2[A].labels.length !== e2[A].channels) throw new Error("channel and label counts mismatch: " + A);
    let {
      channels: B,
      labels: Q
    } = e2[A];
    delete e2[A].channels, delete e2[A].labels, Object.defineProperty(e2[A], "channels", {
      value: B
    }), Object.defineProperty(e2[A], "labels", {
      value: Q
    })
  }
  e2.rgb.hsl = function(A) {
    let B = A[0] / 255,
      Q = A[1] / 255,
      I = A[2] / 255,
      G = Math.min(B, Q, I),
      Z = Math.max(B, Q, I),
      D = Z - G,
      Y, W;
    if (Z === G) Y = 0;
    else if (B === Z) Y = (Q - I) / D;
    else if (Q === Z) Y = 2 + (I - B) / D;
    else if (I === Z) Y = 4 + (B - Q) / D;
    if (Y = Math.min(Y * 60, 360), Y < 0) Y += 360;
    let J = (G + Z) / 2;
    if (Z === G) W = 0;
    else if (J <= 0.5) W = D / (Z + G);
    else W = D / (2 - Z - G);
    return [Y, W * 100, J * 100]
  };
  e2.rgb.hsv = function(A) {
    let B, Q, I, G, Z, D = A[0] / 255,
      Y = A[1] / 255,
      W = A[2] / 255,
      J = Math.max(D, Y, W),
      F = J - Math.min(D, Y, W),
      X = function(V) {
        return (J - V) / 6 / F + 0.5
      };
    if (F === 0) G = 0, Z = 0;
    else {
      if (Z = F / J, B = X(D), Q = X(Y), I = X(W), D === J) G = I - Q;
      else if (Y === J) G = 0.3333333333333333 + B - I;
      else if (W === J) G = 0.6666666666666666 + Q - B;
      if (G < 0) G += 1;
      else if (G > 1) G -= 1
    }
    return [G * 360, Z * 100, J * 100]
  };
  e2.rgb.hwb = function(A) {
    let B = A[0],
      Q = A[1],
      I = A[2],
      G = e2.rgb.hsl(A)[0],
      Z = 0.00392156862745098 * Math.min(B, Math.min(Q, I));
    return I = 1 - 0.00392156862745098 * Math.max(B, Math.max(Q, I)), [G, Z * 100, I * 100]
  };
  e2.rgb.cmyk = function(A) {
    let B = A[0] / 255,
      Q = A[1] / 255,
      I = A[2] / 255,
      G = Math.min(1 - B, 1 - Q, 1 - I),
      Z = (1 - B - G) / (1 - G) || 0,
      D = (1 - Q - G) / (1 - G) || 0,
      Y = (1 - I - G) / (1 - G) || 0;
    return [Z * 100, D * 100, Y * 100, G * 100]
  };

  function zQ5(A, B) {
    return (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2
  }
  e2.rgb.keyword = function(A) {
    let B = aK2[A];
    if (B) return B;
    let Q = 1 / 0,
      I;
    for (let G of Object.keys(B11)) {
      let Z = B11[G],
        D = zQ5(A, Z);
      if (D < Q) Q = D, I = G
    }
    return I
  };
  e2.keyword.rgb = function(A) {
    return B11[A]
  };
  e2.rgb.xyz = function(A) {
    let B = A[0] / 255,
      Q = A[1] / 255,
      I = A[2] / 255;
    B = B > 0.04045 ? ((B + 0.055) / 1.055) ** 2.4 : B / 12.92, Q = Q > 0.04045 ? ((Q + 0.055) / 1.055) ** 2.4 : Q / 12.92, I = I > 0.04045 ? ((I + 0.055) / 1.055) ** 2.4 : I / 12.92;
    let G = B * 0.4124 + Q * 0.3576 + I * 0.1805,
      Z = B * 0.2126 + Q * 0.7152 + I * 0.0722,
      D = B * 0.0193 + Q * 0.1192 + I * 0.9505;
    return [G * 100, Z * 100, D * 100]
  };
  e2.rgb.lab = function(A) {
    let B = e2.rgb.xyz(A),
      Q = B[0],
      I = B[1],
      G = B[2];
    Q /= 95.047, I /= 100, G /= 108.883, Q = Q > 0.008856 ? Q ** 0.3333333333333333 : 7.787 * Q + 0.13793103448275862, I = I > 0.008856 ? I ** 0.3333333333333333 : 7.787 * I + 0.13793103448275862, G = G > 0.008856 ? G ** 0.3333333333333333 : 7.787 * G + 0.13793103448275862;
    let Z = 116 * I - 16,
      D = 500 * (Q - I),
      Y = 200 * (I - G);
    return [Z, D, Y]
  };
  e2.hsl.rgb = function(A) {
    let B = A[0] / 360,
      Q = A[1] / 100,
      I = A[2] / 100,
      G, Z, D;
    if (Q === 0) return D = I * 255, [D, D, D];
    if (I < 0.5) G = I * (1 + Q);
    else G = I + Q - I * Q;
    let Y = 2 * I - G,
      W = [0, 0, 0];
    for (let J = 0; J < 3; J++) {
      if (Z = B + 0.3333333333333333 * -(J - 1), Z < 0) Z++;
      if (Z > 1) Z--;
      if (6 * Z < 1) D = Y + (G - Y) * 6 * Z;
      else if (2 * Z < 1) D = G;
      else if (3 * Z < 2) D = Y + (G - Y) * (0.6666666666666666 - Z) * 6;
      else D = Y;
      W[J] = D * 255
    }
    return W
  };
  e2.hsl.hsv = function(A) {
    let B = A[0],
      Q = A[1] / 100,
      I = A[2] / 100,
      G = Q,
      Z = Math.max(I, 0.01);
    I *= 2, Q *= I <= 1 ? I : 2 - I, G *= Z <= 1 ? Z : 2 - Z;
    let D = (I + Q) / 2,
      Y = I === 0 ? 2 * G / (Z + G) : 2 * Q / (I + Q);
    return [B, Y * 100, D * 100]
  };
  e2.hsv.rgb = function(A) {
    let B = A[0] / 60,
      Q = A[1] / 100,
      I = A[2] / 100,
      G = Math.floor(B) % 6,
      Z = B - Math.floor(B),
      D = 255 * I * (1 - Q),
      Y = 255 * I * (1 - Q * Z),
      W = 255 * I * (1 - Q * (1 - Z));
    switch (I *= 255, G) {
      case 0:
        return [I, W, D];
      case 1:
        return [Y, I, D];
      case 2:
        return [D, I, W];
      case 3:
        return [D, Y, I];
      case 4:
        return [W, D, I];
      case 5:
        return [I, D, Y]
    }
  };
  e2.hsv.hsl = function(A) {
    let B = A[0],
      Q = A[1] / 100,
      I = A[2] / 100,
      G = Math.max(I, 0.01),
      Z, D;
    D = (2 - Q) * I;
    let Y = (2 - Q) * G;
    return Z = Q * G, Z /= Y <= 1 ? Y : 2 - Y, Z = Z || 0, D /= 2, [B, Z * 100, D * 100]
  };
  e2.hwb.rgb = function(A) {
    let B = A[0] / 360,
      Q = A[1] / 100,
      I = A[2] / 100,
      G = Q + I,
      Z;
    if (G > 1) Q /= G, I /= G;
    let D = Math.floor(6 * B),
      Y = 1 - I;
    if (Z = 6 * B - D, (D & 1) !== 0) Z = 1 - Z;
    let W = Q + Z * (Y - Q),
      J, F, X;
    switch (D) {
      default:
      case 6:
      case 0:
        J = Y, F = W, X = Q;
        break;
      case 1:
        J = W, F = Y, X = Q;
        break;
      case 2:
        J = Q, F = Y, X = W;
        break;
      case 3:
        J = Q, F = W, X = Y;
        break;
      case 4:
        J = W, F = Q, X = Y;
        break;
      case 5:
        J = Y, F = Q, X = W;
        break
    }
    return [J * 255, F * 255, X * 255]
  };
  e2.cmyk.rgb = function(A) {
    let B = A[0] / 100,
      Q = A[1] / 100,
      I = A[2] / 100,
      G = A[3] / 100,
      Z = 1 - Math.min(1, B * (1 - G) + G),
      D = 1 - Math.min(1, Q * (1 - G) + G),
      Y = 1 - Math.min(1, I * (1 - G) + G);
    return [Z * 255, D * 255, Y * 255]
  };
  e2.xyz.rgb = function(A) {
    let B = A[0] / 100,
      Q = A[1] / 100,
      I = A[2] / 100,
      G, Z, D;
    return G = B * 3.2406 + Q * -1.5372 + I * -0.4986, Z = B * -0.9689 + Q * 1.8758 + I * 0.0415, D = B * 0.0557 + Q * -0.204 + I * 1.057, G = G > 0.0031308 ? 1.055 * G ** 0.4166666666666667 - 0.055 : G * 12.92, Z = Z > 0.0031308 ? 1.055 * Z ** 0.4166666666666667 - 0.055 : Z * 12.92, D = D > 0.0031308 ? 1.055 * D ** 0.4166666666666667 - 0.055 : D * 12.92, G = Math.min(Math.max(0, G), 1), Z = Math.min(Math.max(0, Z), 1), D = Math.min(Math.max(0, D), 1), [G * 255, Z * 255, D * 255]
  };
  e2.xyz.lab = function(A) {
    let B = A[0],
      Q = A[1],
      I = A[2];
    B /= 95.047, Q /= 100, I /= 108.883, B = B > 0.008856 ? B ** 0.3333333333333333 : 7.787 * B + 0.13793103448275862, Q = Q > 0.008856 ? Q ** 0.3333333333333333 : 7.787 * Q + 0.13793103448275862, I = I > 0.008856 ? I ** 0.3333333333333333 : 7.787 * I + 0.13793103448275862;
    let G = 116 * Q - 16,
      Z = 500 * (B - Q),
      D = 200 * (Q - I);
    return [G, Z, D]
  };
  e2.lab.xyz = function(A) {
    let B = A[0],
      Q = A[1],
      I = A[2],
      G, Z, D;
    Z = (B + 16) / 116, G = Q / 500 + Z, D = Z - I / 200;
    let Y = Z ** 3,
      W = G ** 3,
      J = D ** 3;
    return Z = Y > 0.008856 ? Y : (Z - 0.13793103448275862) / 7.787, G = W > 0.008856 ? W : (G - 0.13793103448275862) / 7.787, D = J > 0.008856 ? J : (D - 0.13793103448275862) / 7.787, G *= 95.047, Z *= 100, D *= 108.883, [G, Z, D]
  };
  e2.lab.lch = function(A) {
    let B = A[0],
      Q = A[1],
      I = A[2],
      G;
    if (G = Math.atan2(I, Q) * 360 / 2 / Math.PI, G < 0) G += 360;
    let D = Math.sqrt(Q * Q + I * I);
    return [B, D, G]
  };
  e2.lch.lab = function(A) {
    let B = A[0],
      Q = A[1],
      G = A[2] / 360 * 2 * Math.PI,
      Z = Q * Math.cos(G),
      D = Q * Math.sin(G);
    return [B, Z, D]
  };
  e2.rgb.ansi16 = function(A, B = null) {
    let [Q, I, G] = A, Z = B === null ? e2.rgb.hsv(A)[2] : B;
    if (Z = Math.round(Z / 50), Z === 0) return 30;
    let D = 30 + (Math.round(G / 255) << 2 | Math.round(I / 255) << 1 | Math.round(Q / 255));
    if (Z === 2) D += 60;
    return D
  };
  e2.hsv.ansi16 = function(A) {
    return e2.rgb.ansi16(e2.hsv.rgb(A), A[2])
  };
  e2.rgb.ansi256 = function(A) {
    let B = A[0],
      Q = A[1],
      I = A[2];
    if (B === Q && Q === I) {
      if (B < 8) return 16;
      if (B > 248) return 231;
      return Math.round((B - 8) / 247 * 24) + 232
    }
    return 16 + 36 * Math.round(B / 255 * 5) + 6 * Math.round(Q / 255 * 5) + Math.round(I / 255 * 5)
  };
  e2.ansi16.rgb = function(A) {
    let B = A % 10;
    if (B === 0 || B === 7) {
      if (A > 50) B += 3.5;
      return B = B / 10.5 * 255, [B, B, B]
    }
    let Q = (~~(A > 50) + 1) * 0.5,
      I = (B & 1) * Q * 255,
      G = (B >> 1 & 1) * Q * 255,
      Z = (B >> 2 & 1) * Q * 255;
    return [I, G, Z]
  };
  e2.ansi256.rgb = function(A) {
    if (A >= 232) {
      let Z = (A - 232) * 10 + 8;
      return [Z, Z, Z]
    }
    A -= 16;
    let B, Q = Math.floor(A / 36) / 5 * 255,
      I = Math.floor((B = A % 36) / 6) / 5 * 255,
      G = B % 6 / 5 * 255;
    return [Q, I, G]
  };
  e2.rgb.hex = function(A) {
    let Q = (((Math.round(A[0]) & 255) << 16) + ((Math.round(A[1]) & 255) << 8) + (Math.round(A[2]) & 255)).toString(16).toUpperCase();
    return "000000".substring(Q.length) + Q
  };
  e2.hex.rgb = function(A) {
    let B = A.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!B) return [0, 0, 0];
    let Q = B[0];
    if (B[0].length === 3) Q = Q.split("").map((Y) => {
      return Y + Y
    }).join("");
    let I = parseInt(Q, 16),
      G = I >> 16 & 255,
      Z = I >> 8 & 255,
      D = I & 255;
    return [G, Z, D]
  };
  e2.rgb.hcg = function(A) {
    let B = A[0] / 255,
      Q = A[1] / 255,
      I = A[2] / 255,
      G = Math.max(Math.max(B, Q), I),
      Z = Math.min(Math.min(B, Q), I),
      D = G - Z,
      Y, W;
    if (D < 1) Y = Z / (1 - D);
    else Y = 0;
    if (D <= 0) W = 0;
    else if (G === B) W = (Q - I) / D % 6;
    else if (G === Q) W = 2 + (I - B) / D;
    else W = 4 + (B - Q) / D;
    return W /= 6, W %= 1, [W * 360, D * 100, Y * 100]
  };
  e2.hsl.hcg = function(A) {
    let B = A[1] / 100,
      Q = A[2] / 100,
      I = Q < 0.5 ? 2 * B * Q : 2 * B * (1 - Q),
      G = 0;
    if (I < 1) G = (Q - 0.5 * I) / (1 - I);
    return [A[0], I * 100, G * 100]
  };
  e2.hsv.hcg = function(A) {
    let B = A[1] / 100,
      Q = A[2] / 100,
      I = B * Q,
      G = 0;
    if (I < 1) G = (Q - I) / (1 - I);
    return [A[0], I * 100, G * 100]
  };
  e2.hcg.rgb = function(A) {
    let B = A[0] / 360,
      Q = A[1] / 100,
      I = A[2] / 100;
    if (Q === 0) return [I * 255, I * 255, I * 255];
    let G = [0, 0, 0],
      Z = B % 1 * 6,
      D = Z % 1,
      Y = 1 - D,
      W = 0;
    switch (Math.floor(Z)) {
      case 0:
        G[0] = 1, G[1] = D, G[2] = 0;
        break;
      case 1:
        G[0] = Y, G[1] = 1, G[2] = 0;
        break;
      case 2:
        G[0] = 0, G[1] = 1, G[2] = D;
        break;
      case 3:
        G[0] = 0, G[1] = Y, G[2] = 1;
        break;
      case 4:
        G[0] = D, G[1] = 0, G[2] = 1;
        break;
      default:
        G[0] = 1, G[1] = 0, G[2] = Y
    }
    return W = (1 - Q) * I, [(Q * G[0] + W) * 255, (Q * G[1] + W) * 255, (Q * G[2] + W) * 255]
  };
  e2.hcg.hsv = function(A) {
    let B = A[1] / 100,
      Q = A[2] / 100,
      I = B + Q * (1 - B),
      G = 0;
    if (I > 0) G = B / I;
    return [A[0], G * 100, I * 100]
  };
  e2.hcg.hsl = function(A) {
    let B = A[1] / 100,
      I = A[2] / 100 * (1 - B) + 0.5 * B,
      G = 0;
    if (I > 0 && I < 0.5) G = B / (2 * I);
    else if (I >= 0.5 && I < 1) G = B / (2 * (1 - I));
    return [A[0], G * 100, I * 100]
  };
  e2.hcg.hwb = function(A) {
    let B = A[1] / 100,
      Q = A[2] / 100,
      I = B + Q * (1 - B);
    return [A[0], (I - B) * 100, (1 - I) * 100]
  };
  e2.hwb.hcg = function(A) {
    let B = A[1] / 100,
      I = 1 - A[2] / 100,
      G = I - B,
      Z = 0;
    if (G < 1) Z = (I - G) / (1 - G);
    return [A[0], G * 100, Z * 100]
  };
  e2.apple.rgb = function(A) {
    return [A[0] / 65535 * 255, A[1] / 65535 * 255, A[2] / 65535 * 255]
  };
  e2.rgb.apple = function(A) {
    return [A[0] / 255 * 65535, A[1] / 255 * 65535, A[2] / 255 * 65535]
  };
  e2.gray.rgb = function(A) {
    return [A[0] / 100 * 255, A[0] / 100 * 255, A[0] / 100 * 255]
  };
  e2.gray.hsl = function(A) {
    return [0, 0, A[0]]
  };
  e2.gray.hsv = e2.gray.hsl;
  e2.gray.hwb = function(A) {
    return [0, 100, A[0]]
  };
  e2.gray.cmyk = function(A) {
    return [0, 0, 0, A[0]]
  };
  e2.gray.lab = function(A) {
    return [A[0], 0, 0]
  };
  e2.gray.hex = function(A) {
    let B = Math.round(A[0] / 100 * 255) & 255,
      I = ((B << 16) + (B << 8) + B).toString(16).toUpperCase();
    return "000000".substring(I.length) + I
  };
  e2.rgb.gray = function(A) {
    return [(A[0] + A[1] + A[2]) / 3 / 255 * 100]
  }
})
// @from(Start 7369270, End 7370437)
oK2 = z((ni8, rK2) => {
  var CK1 = po1();

  function wQ5() {
    let A = {},
      B = Object.keys(CK1);
    for (let Q = B.length, I = 0; I < Q; I++) A[B[I]] = {
      distance: -1,
      parent: null
    };
    return A
  }

  function EQ5(A) {
    let B = wQ5(),
      Q = [A];
    B[A].distance = 0;
    while (Q.length) {
      let I = Q.pop(),
        G = Object.keys(CK1[I]);
      for (let Z = G.length, D = 0; D < Z; D++) {
        let Y = G[D],
          W = B[Y];
        if (W.distance === -1) W.distance = B[I].distance + 1, W.parent = I, Q.unshift(Y)
      }
    }
    return B
  }

  function UQ5(A, B) {
    return function(Q) {
      return B(A(Q))
    }
  }

  function NQ5(A, B) {
    let Q = [B[A].parent, A],
      I = CK1[B[A].parent][A],
      G = B[A].parent;
    while (B[G].parent) Q.unshift(B[G].parent), I = UQ5(CK1[B[G].parent][G], I), G = B[G].parent;
    return I.conversion = Q, I
  }
  rK2.exports = function(A) {
    let B = EQ5(A),
      Q = {},
      I = Object.keys(B);
    for (let G = I.length, Z = 0; Z < G; Z++) {
      let D = I[Z];
      if (B[D].parent === null) continue;
      Q[D] = NQ5(D, B)
    }
    return Q
  }
})
// @from(Start 7370443, End 7371515)
lo1 = z((ai8, tK2) => {
  var co1 = po1(),
    $Q5 = oK2(),
    rd = {},
    qQ5 = Object.keys(co1);

  function MQ5(A) {
    let B = function(...Q) {
      let I = Q[0];
      if (I === void 0 || I === null) return I;
      if (I.length > 1) Q = I;
      return A(Q)
    };
    if ("conversion" in A) B.conversion = A.conversion;
    return B
  }

  function LQ5(A) {
    let B = function(...Q) {
      let I = Q[0];
      if (I === void 0 || I === null) return I;
      if (I.length > 1) Q = I;
      let G = A(Q);
      if (typeof G === "object")
        for (let Z = G.length, D = 0; D < Z; D++) G[D] = Math.round(G[D]);
      return G
    };
    if ("conversion" in A) B.conversion = A.conversion;
    return B
  }
  qQ5.forEach((A) => {
    rd[A] = {}, Object.defineProperty(rd[A], "channels", {
      value: co1[A].channels
    }), Object.defineProperty(rd[A], "labels", {
      value: co1[A].labels
    });
    let B = $Q5(A);
    Object.keys(B).forEach((I) => {
      let G = B[I];
      rd[A][I] = LQ5(G), rd[A][I].raw = MQ5(G)
    })
  });
  tK2.exports = rd
})