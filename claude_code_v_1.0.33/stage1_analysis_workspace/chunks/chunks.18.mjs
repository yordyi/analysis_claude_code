
// @from(Start 1724844, End 1728583)
e_A = z((fe5, t_A) => {
  var Wv = "[0-9](_*[0-9])*",
    z81 = `\\.(${Wv})`,
    w81 = "[0-9a-fA-F](_*[0-9a-fA-F])*",
    xi9 = {
      className: "number",
      variants: [{
        begin: `(\\b(${Wv})((${z81})|\\.)?|(${z81}))[eE][+-]?(${Wv})[fFdD]?\\b`
      }, {
        begin: `\\b(${Wv})((${z81})[fFdD]?\\b|\\.([fFdD]\\b)?)`
      }, {
        begin: `(${z81})[fFdD]?\\b`
      }, {
        begin: `\\b(${Wv})[fFdD]\\b`
      }, {
        begin: `\\b0[xX]((${w81})\\.?|(${w81})?\\.(${w81}))[pP][+-]?(${Wv})[fFdD]?\\b`
      }, {
        begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
      }, {
        begin: `\\b0[xX](${w81})[lL]?\\b`
      }, {
        begin: "\\b0(_*[0-7])*[lL]?\\b"
      }, {
        begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
      }],
      relevance: 0
    };

  function fi9(A) {
    var B = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",
      Q = B + "(<" + B + "(\\s*,\\s*" + B + ")*>)?",
      I = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
      G = {
        className: "meta",
        begin: "@" + B,
        contains: [{
          begin: /\(/,
          end: /\)/,
          contains: ["self"]
        }]
      };
    let Z = xi9;
    return {
      name: "Java",
      aliases: ["jsp"],
      keywords: I,
      illegal: /<\/|#/,
      contains: [A.COMMENT("/\\*\\*", "\\*/", {
        relevance: 0,
        contains: [{
          begin: /\w+@/,
          relevance: 0
        }, {
          className: "doctag",
          begin: "@[A-Za-z]+"
        }]
      }), {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
        className: "class",
        beginKeywords: "class interface enum",
        end: /[{;=]/,
        excludeEnd: !0,
        relevance: 1,
        keywords: "class interface enum",
        illegal: /[:"\[\]]/,
        contains: [{
          beginKeywords: "extends implements"
        }, A.UNDERSCORE_TITLE_MODE]
      }, {
        beginKeywords: "new throw return else",
        relevance: 0
      }, {
        className: "class",
        begin: "record\\s+" + A.UNDERSCORE_IDENT_RE + "\\s*\\(",
        returnBegin: !0,
        excludeEnd: !0,
        end: /[{;=]/,
        keywords: I,
        contains: [{
          beginKeywords: "record"
        }, {
          begin: A.UNDERSCORE_IDENT_RE + "\\s*\\(",
          returnBegin: !0,
          relevance: 0,
          contains: [A.UNDERSCORE_TITLE_MODE]
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: I,
          relevance: 0,
          contains: [A.C_BLOCK_COMMENT_MODE]
        }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
      }, {
        className: "function",
        begin: "(" + Q + "\\s+)+" + A.UNDERSCORE_IDENT_RE + "\\s*\\(",
        returnBegin: !0,
        end: /[{;=]/,
        excludeEnd: !0,
        keywords: I,
        contains: [{
          begin: A.UNDERSCORE_IDENT_RE + "\\s*\\(",
          returnBegin: !0,
          relevance: 0,
          contains: [A.UNDERSCORE_TITLE_MODE]
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: I,
          relevance: 0,
          contains: [G, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, Z, A.C_BLOCK_COMMENT_MODE]
        }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
      }, Z, G]
    }
  }
  t_A.exports = fi9
})
// @from(Start 1728589, End 1737493)
QjA = z((ve5, BjA) => {
  var vi9 = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
    bi9 = ["true", "false", "null", "undefined", "NaN", "Infinity"],
    gi9 = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"],
    hi9 = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
    mi9 = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
    di9 = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
    ui9 = [].concat(mi9, di9, gi9, hi9);

  function pi9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function AjA(A) {
    return dT1("(?=", A, ")")
  }

  function dT1(...A) {
    return A.map((Q) => pi9(Q)).join("")
  }

  function ci9(A) {
    let B = (T, {
        after: L
      }) => {
        let _ = "</" + T[0].slice(1);
        return T.input.indexOf(_, L) !== -1
      },
      Q = "[A-Za-z$_][0-9A-Za-z$_]*",
      I = {
        begin: "<>",
        end: "</>"
      },
      G = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        isTrulyOpeningTag: (T, L) => {
          let _ = T[0].length + T.index,
            k = T.input[_];
          if (k === "<") {
            L.ignoreMatch();
            return
          }
          if (k === ">") {
            if (!B(T, {
                after: _
              })) L.ignoreMatch()
          }
        }
      },
      Z = {
        $pattern: "[A-Za-z$_][0-9A-Za-z$_]*",
        keyword: vi9,
        literal: bi9,
        built_in: ui9
      },
      D = "[0-9](_?[0-9])*",
      Y = "\\.([0-9](_?[0-9])*)",
      W = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",
      J = {
        className: "number",
        variants: [{
          begin: "(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((\\.([0-9](_?[0-9])*))|\\.)?|(\\.([0-9](_?[0-9])*)))[eE][+-]?([0-9](_?[0-9])*)\\b"
        }, {
          begin: "\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)\\b((\\.([0-9](_?[0-9])*))\\b|\\.)?|(\\.([0-9](_?[0-9])*))\\b"
        }, {
          begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
        }, {
          begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
        }, {
          begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
        }, {
          begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
        }, {
          begin: "\\b0[0-7]+n?\\b"
        }],
        relevance: 0
      },
      F = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: Z,
        contains: []
      },
      X = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [A.BACKSLASH_ESCAPE, F],
          subLanguage: "xml"
        }
      },
      V = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: !1,
          contains: [A.BACKSLASH_ESCAPE, F],
          subLanguage: "css"
        }
      },
      C = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [A.BACKSLASH_ESCAPE, F]
      },
      E = {
        className: "comment",
        variants: [A.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
          relevance: 0,
          contains: [{
            className: "doctag",
            begin: "@[A-Za-z]+",
            contains: [{
              className: "type",
              begin: "\\{",
              end: "\\}",
              relevance: 0
            }, {
              className: "variable",
              begin: "[A-Za-z$_][0-9A-Za-z$_]*(?=\\s*(-)|$)",
              endsParent: !0,
              relevance: 0
            }, {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }]
          }]
        }), A.C_BLOCK_COMMENT_MODE, A.C_LINE_COMMENT_MODE]
      },
      N = [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, X, V, C, J, A.REGEXP_MODE];
    F.contains = N.concat({
      begin: /\{/,
      end: /\}/,
      keywords: Z,
      contains: ["self"].concat(N)
    });
    let q = [].concat(E, F.contains),
      O = q.concat([{
        begin: /\(/,
        end: /\)/,
        keywords: Z,
        contains: ["self"].concat(q)
      }]),
      R = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: Z,
        contains: O
      };
    return {
      name: "Javascript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: Z,
      exports: {
        PARAMS_CONTAINS: O
      },
      illegal: /#(?![$_A-z])/,
      contains: [A.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }), {
        label: "use_strict",
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, X, V, C, E, J, {
        begin: dT1(/[{,\n]\s*/, AjA(dT1(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, "[A-Za-z$_][0-9A-Za-z$_]*\\s*:"))),
        relevance: 0,
        contains: [{
          className: "attr",
          begin: "[A-Za-z$_][0-9A-Za-z$_]*" + AjA("\\s*:"),
          relevance: 0
        }]
      }, {
        begin: "(" + A.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        contains: [E, A.REGEXP_MODE, {
          className: "function",
          begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + A.UNDERSCORE_IDENT_RE + ")\\s*=>",
          returnBegin: !0,
          end: "\\s*=>",
          contains: [{
            className: "params",
            variants: [{
              begin: A.UNDERSCORE_IDENT_RE,
              relevance: 0
            }, {
              className: null,
              begin: /\(\s*\)/,
              skip: !0
            }, {
              begin: /\(/,
              end: /\)/,
              excludeBegin: !0,
              excludeEnd: !0,
              keywords: Z,
              contains: O
            }]
          }]
        }, {
          begin: /,/,
          relevance: 0
        }, {
          className: "",
          begin: /\s/,
          end: /\s*/,
          skip: !0
        }, {
          variants: [{
            begin: I.begin,
            end: I.end
          }, {
            begin: G.begin,
            "on:begin": G.isTrulyOpeningTag,
            end: G.end
          }],
          subLanguage: "xml",
          contains: [{
            begin: G.begin,
            end: G.end,
            skip: !0,
            contains: ["self"]
          }]
        }],
        relevance: 0
      }, {
        className: "function",
        beginKeywords: "function",
        end: /[{;]/,
        excludeEnd: !0,
        keywords: Z,
        contains: ["self", A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z$_][0-9A-Za-z$_]*"
        }), R],
        illegal: /%/
      }, {
        beginKeywords: "while if switch catch for"
      }, {
        className: "function",
        begin: A.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        returnBegin: !0,
        contains: [R, A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z$_][0-9A-Za-z$_]*"
        })]
      }, {
        variants: [{
          begin: "\\.[A-Za-z$_][0-9A-Za-z$_]*"
        }, {
          begin: "\\$[A-Za-z$_][0-9A-Za-z$_]*"
        }],
        relevance: 0
      }, {
        className: "class",
        beginKeywords: "class",
        end: /[{;=]/,
        excludeEnd: !0,
        illegal: /[:"[\]]/,
        contains: [{
          beginKeywords: "extends"
        }, A.UNDERSCORE_TITLE_MODE]
      }, {
        begin: /\b(?=constructor)/,
        end: /[{;]/,
        excludeEnd: !0,
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z$_][0-9A-Za-z$_]*"
        }), "self", R]
      }, {
        begin: "(get|set)\\s+(?=[A-Za-z$_][0-9A-Za-z$_]*\\()",
        end: /\{/,
        keywords: "get set",
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z$_][0-9A-Za-z$_]*"
        }), {
          begin: /\(\)/
        }, R]
      }, {
        begin: /\$[(.]/
      }]
    }
  }
  BjA.exports = ci9
})
// @from(Start 1737499, End 1738753)
GjA = z((be5, IjA) => {
  function li9(A) {
    let Q = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        contains: [{
          begin: /[\w-]+ *=/,
          returnBegin: !0,
          relevance: 0,
          contains: [{
            className: "attr",
            begin: /[\w-]+/
          }]
        }],
        relevance: 0
      },
      I = {
        className: "function",
        begin: /:[\w\-.]+/,
        relevance: 0
      },
      G = {
        className: "string",
        begin: /\B([\/.])[\w\-.\/=]+/
      },
      Z = {
        className: "params",
        begin: /--[\w\-=\/]+/
      };
    return {
      name: "JBoss CLI",
      aliases: ["wildfly-cli"],
      keywords: {
        $pattern: "[a-z-]+",
        keyword: "alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",
        literal: "true false"
      },
      contains: [A.HASH_COMMENT_MODE, A.QUOTE_STRING_MODE, Z, I, G, Q]
    }
  }
  IjA.exports = li9
})
// @from(Start 1738759, End 1739721)
DjA = z((ge5, ZjA) => {
  function ii9(A) {
    let B = {
        literal: "true false null"
      },
      Q = [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE],
      I = [A.QUOTE_STRING_MODE, A.C_NUMBER_MODE],
      G = {
        end: ",",
        endsWithParent: !0,
        excludeEnd: !0,
        contains: I,
        keywords: B
      },
      Z = {
        begin: /\{/,
        end: /\}/,
        contains: [{
          className: "attr",
          begin: /"/,
          end: /"/,
          contains: [A.BACKSLASH_ESCAPE],
          illegal: "\\n"
        }, A.inherit(G, {
          begin: /:/
        })].concat(Q),
        illegal: "\\S"
      },
      D = {
        begin: "\\[",
        end: "\\]",
        contains: [A.inherit(G)],
        illegal: "\\S"
      };
    return I.push(Z, D), Q.forEach(function(Y) {
      I.push(Y)
    }), {
      name: "JSON",
      contains: I,
      keywords: B,
      illegal: "\\S"
    }
  }
  ZjA.exports = ii9
})
// @from(Start 1739727, End 1744682)
WjA = z((he5, YjA) => {
  function ni9(A) {
    var B = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",
      Q = ["baremodule", "begin", "break", "catch", "ccall", "const", "continue", "do", "else", "elseif", "end", "export", "false", "finally", "for", "function", "global", "if", "import", "in", "isa", "let", "local", "macro", "module", "quote", "return", "true", "try", "using", "where", "while"],
      I = ["ARGS", "C_NULL", "DEPOT_PATH", "ENDIAN_BOM", "ENV", "Inf", "Inf16", "Inf32", "Inf64", "InsertionSort", "LOAD_PATH", "MergeSort", "NaN", "NaN16", "NaN32", "NaN64", "PROGRAM_FILE", "QuickSort", "RoundDown", "RoundFromZero", "RoundNearest", "RoundNearestTiesAway", "RoundNearestTiesUp", "RoundToZero", "RoundUp", "VERSION|0", "devnull", "false", "im", "missing", "nothing", "pi", "stderr", "stdin", "stdout", "true", "undef", "π", "ℯ"],
      G = ["AbstractArray", "AbstractChannel", "AbstractChar", "AbstractDict", "AbstractDisplay", "AbstractFloat", "AbstractIrrational", "AbstractMatrix", "AbstractRange", "AbstractSet", "AbstractString", "AbstractUnitRange", "AbstractVecOrMat", "AbstractVector", "Any", "ArgumentError", "Array", "AssertionError", "BigFloat", "BigInt", "BitArray", "BitMatrix", "BitSet", "BitVector", "Bool", "BoundsError", "CapturedException", "CartesianIndex", "CartesianIndices", "Cchar", "Cdouble", "Cfloat", "Channel", "Char", "Cint", "Cintmax_t", "Clong", "Clonglong", "Cmd", "Colon", "Complex", "ComplexF16", "ComplexF32", "ComplexF64", "CompositeException", "Condition", "Cptrdiff_t", "Cshort", "Csize_t", "Cssize_t", "Cstring", "Cuchar", "Cuint", "Cuintmax_t", "Culong", "Culonglong", "Cushort", "Cvoid", "Cwchar_t", "Cwstring", "DataType", "DenseArray", "DenseMatrix", "DenseVecOrMat", "DenseVector", "Dict", "DimensionMismatch", "Dims", "DivideError", "DomainError", "EOFError", "Enum", "ErrorException", "Exception", "ExponentialBackOff", "Expr", "Float16", "Float32", "Float64", "Function", "GlobalRef", "HTML", "IO", "IOBuffer", "IOContext", "IOStream", "IdDict", "IndexCartesian", "IndexLinear", "IndexStyle", "InexactError", "InitError", "Int", "Int128", "Int16", "Int32", "Int64", "Int8", "Integer", "InterruptException", "InvalidStateException", "Irrational", "KeyError", "LinRange", "LineNumberNode", "LinearIndices", "LoadError", "MIME", "Matrix", "Method", "MethodError", "Missing", "MissingException", "Module", "NTuple", "NamedTuple", "Nothing", "Number", "OrdinalRange", "OutOfMemoryError", "OverflowError", "Pair", "PartialQuickSort", "PermutedDimsArray", "Pipe", "ProcessFailedException", "Ptr", "QuoteNode", "Rational", "RawFD", "ReadOnlyMemoryError", "Real", "ReentrantLock", "Ref", "Regex", "RegexMatch", "RoundingMode", "SegmentationFault", "Set", "Signed", "Some", "StackOverflowError", "StepRange", "StepRangeLen", "StridedArray", "StridedMatrix", "StridedVecOrMat", "StridedVector", "String", "StringIndexError", "SubArray", "SubString", "SubstitutionString", "Symbol", "SystemError", "Task", "TaskFailedException", "Text", "TextDisplay", "Timer", "Tuple", "Type", "TypeError", "TypeVar", "UInt", "UInt128", "UInt16", "UInt32", "UInt64", "UInt8", "UndefInitializer", "UndefKeywordError", "UndefRefError", "UndefVarError", "Union", "UnionAll", "UnitRange", "Unsigned", "Val", "Vararg", "VecElement", "VecOrMat", "Vector", "VersionNumber", "WeakKeyDict", "WeakRef"],
      Z = {
        $pattern: B,
        keyword: Q,
        literal: I,
        built_in: G
      },
      D = {
        keywords: Z,
        illegal: /<\//
      },
      Y = {
        className: "number",
        begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
        relevance: 0
      },
      W = {
        className: "string",
        begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
      },
      J = {
        className: "subst",
        begin: /\$\(/,
        end: /\)/,
        keywords: Z
      },
      F = {
        className: "variable",
        begin: "\\$" + B
      },
      X = {
        className: "string",
        contains: [A.BACKSLASH_ESCAPE, J, F],
        variants: [{
          begin: /\w*"""/,
          end: /"""\w*/,
          relevance: 10
        }, {
          begin: /\w*"/,
          end: /"\w*/
        }]
      },
      V = {
        className: "string",
        contains: [A.BACKSLASH_ESCAPE, J, F],
        begin: "`",
        end: "`"
      },
      C = {
        className: "meta",
        begin: "@" + B
      },
      K = {
        className: "comment",
        variants: [{
          begin: "#=",
          end: "=#",
          relevance: 10
        }, {
          begin: "#",
          end: "$"
        }]
      };
    return D.name = "Julia", D.contains = [Y, W, X, V, C, K, A.HASH_COMMENT_MODE, {
      className: "keyword",
      begin: "\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b"
    }, {
      begin: /<:/
    }], J.contains = D.contains, D
  }
  YjA.exports = ni9
})
// @from(Start 1744688, End 1745028)
FjA = z((me5, JjA) => {
  function ai9(A) {
    return {
      name: "Julia REPL",
      contains: [{
        className: "meta",
        begin: /^julia>/,
        relevance: 10,
        starts: {
          end: /^(?![ ]{6})/,
          subLanguage: "julia"
        },
        aliases: ["jldoctest"]
      }]
    }
  }
  JjA.exports = ai9
})
// @from(Start 1745034, End 1750161)
VjA = z((de5, XjA) => {
  var Jv = "[0-9](_*[0-9])*",
    E81 = `\\.(${Jv})`,
    U81 = "[0-9a-fA-F](_*[0-9a-fA-F])*",
    si9 = {
      className: "number",
      variants: [{
        begin: `(\\b(${Jv})((${E81})|\\.)?|(${E81}))[eE][+-]?(${Jv})[fFdD]?\\b`
      }, {
        begin: `\\b(${Jv})((${E81})[fFdD]?\\b|\\.([fFdD]\\b)?)`
      }, {
        begin: `(${E81})[fFdD]?\\b`
      }, {
        begin: `\\b(${Jv})[fFdD]\\b`
      }, {
        begin: `\\b0[xX]((${U81})\\.?|(${U81})?\\.(${U81}))[pP][+-]?(${Jv})[fFdD]?\\b`
      }, {
        begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
      }, {
        begin: `\\b0[xX](${U81})[lL]?\\b`
      }, {
        begin: "\\b0(_*[0-7])*[lL]?\\b"
      }, {
        begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
      }],
      relevance: 0
    };

  function ri9(A) {
    let B = {
        keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
        built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
        literal: "true false null"
      },
      Q = {
        className: "keyword",
        begin: /\b(break|continue|return|this)\b/,
        starts: {
          contains: [{
            className: "symbol",
            begin: /@\w+/
          }]
        }
      },
      I = {
        className: "symbol",
        begin: A.UNDERSCORE_IDENT_RE + "@"
      },
      G = {
        className: "subst",
        begin: /\$\{/,
        end: /\}/,
        contains: [A.C_NUMBER_MODE]
      },
      Z = {
        className: "variable",
        begin: "\\$" + A.UNDERSCORE_IDENT_RE
      },
      D = {
        className: "string",
        variants: [{
          begin: '"""',
          end: '"""(?=[^"])',
          contains: [Z, G]
        }, {
          begin: "'",
          end: "'",
          illegal: /\n/,
          contains: [A.BACKSLASH_ESCAPE]
        }, {
          begin: '"',
          end: '"',
          illegal: /\n/,
          contains: [A.BACKSLASH_ESCAPE, Z, G]
        }]
      };
    G.contains.push(D);
    let Y = {
        className: "meta",
        begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + A.UNDERSCORE_IDENT_RE + ")?"
      },
      W = {
        className: "meta",
        begin: "@" + A.UNDERSCORE_IDENT_RE,
        contains: [{
          begin: /\(/,
          end: /\)/,
          contains: [A.inherit(D, {
            className: "meta-string"
          })]
        }]
      },
      J = si9,
      F = A.COMMENT("/\\*", "\\*/", {
        contains: [A.C_BLOCK_COMMENT_MODE]
      }),
      X = {
        variants: [{
          className: "type",
          begin: A.UNDERSCORE_IDENT_RE
        }, {
          begin: /\(/,
          end: /\)/,
          contains: []
        }]
      },
      V = X;
    return V.variants[1].contains = [X], X.variants[1].contains = [V], {
      name: "Kotlin",
      aliases: ["kt", "kts"],
      keywords: B,
      contains: [A.COMMENT("/\\*\\*", "\\*/", {
        relevance: 0,
        contains: [{
          className: "doctag",
          begin: "@[A-Za-z]+"
        }]
      }), A.C_LINE_COMMENT_MODE, F, Q, I, Y, W, {
        className: "function",
        beginKeywords: "fun",
        end: "[(]|$",
        returnBegin: !0,
        excludeEnd: !0,
        keywords: B,
        relevance: 5,
        contains: [{
          begin: A.UNDERSCORE_IDENT_RE + "\\s*\\(",
          returnBegin: !0,
          relevance: 0,
          contains: [A.UNDERSCORE_TITLE_MODE]
        }, {
          className: "type",
          begin: /</,
          end: />/,
          keywords: "reified",
          relevance: 0
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          endsParent: !0,
          keywords: B,
          relevance: 0,
          contains: [{
            begin: /:/,
            end: /[=,\/]/,
            endsWithParent: !0,
            contains: [X, A.C_LINE_COMMENT_MODE, F],
            relevance: 0
          }, A.C_LINE_COMMENT_MODE, F, Y, W, D, A.C_NUMBER_MODE]
        }, F]
      }, {
        className: "class",
        beginKeywords: "class interface trait",
        end: /[:\{(]|$/,
        excludeEnd: !0,
        illegal: "extends implements",
        contains: [{
          beginKeywords: "public protected internal private constructor"
        }, A.UNDERSCORE_TITLE_MODE, {
          className: "type",
          begin: /</,
          end: />/,
          excludeBegin: !0,
          excludeEnd: !0,
          relevance: 0
        }, {
          className: "type",
          begin: /[,:]\s*/,
          end: /[<\(,]|$/,
          excludeBegin: !0,
          returnEnd: !0
        }, Y, W]
      }, D, {
        className: "meta",
        begin: "^#!/usr/bin/env",
        end: "$",
        illegal: `
`
      }, J]
    }
  }
  XjA.exports = ri9
})
// @from(Start 1750167, End 1754358)
KjA = z((ue5, CjA) => {
  function oi9(A) {
    let G = {
        $pattern: "[a-zA-Z_][\\w.]*|&[lg]t;",
        literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
        built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
        keyword: "cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else fail_if fail_ifnot fail if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
      },
      Z = A.COMMENT("<!--", "-->", {
        relevance: 0
      }),
      D = {
        className: "meta",
        begin: "\\[noprocess\\]",
        starts: {
          end: "\\[/noprocess\\]",
          returnEnd: !0,
          contains: [Z]
        }
      },
      Y = {
        className: "meta",
        begin: "\\[/noprocess|<\\?(lasso(script)?|=)"
      },
      W = {
        className: "symbol",
        begin: "'[a-zA-Z_][\\w.]*'"
      },
      J = [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.inherit(A.C_NUMBER_MODE, {
        begin: A.C_NUMBER_RE + "|(-?infinity|NaN)\\b"
      }), A.inherit(A.APOS_STRING_MODE, {
        illegal: null
      }), A.inherit(A.QUOTE_STRING_MODE, {
        illegal: null
      }), {
        className: "string",
        begin: "`",
        end: "`"
      }, {
        variants: [{
          begin: "[#$][a-zA-Z_][\\w.]*"
        }, {
          begin: "#",
          end: "\\d+",
          illegal: "\\W"
        }]
      }, {
        className: "type",
        begin: "::\\s*",
        end: "[a-zA-Z_][\\w.]*",
        illegal: "\\W"
      }, {
        className: "params",
        variants: [{
          begin: "-(?!infinity)[a-zA-Z_][\\w.]*",
          relevance: 0
        }, {
          begin: "(\\.\\.\\.)"
        }]
      }, {
        begin: /(->|\.)\s*/,
        relevance: 0,
        contains: [W]
      }, {
        className: "class",
        beginKeywords: "define",
        returnEnd: !0,
        end: "\\(|=>",
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "[a-zA-Z_][\\w.]*(=(?!>))?|[-+*/%](?!>)"
        })]
      }];
    return {
      name: "Lasso",
      aliases: ["ls", "lassoscript"],
      case_insensitive: !0,
      keywords: G,
      contains: [{
        className: "meta",
        begin: "\\]|\\?>",
        relevance: 0,
        starts: {
          end: "\\[|<\\?(lasso(script)?|=)",
          returnEnd: !0,
          relevance: 0,
          contains: [Z]
        }
      }, D, Y, {
        className: "meta",
        begin: "\\[no_square_brackets",
        starts: {
          end: "\\[/no_square_brackets\\]",
          keywords: G,
          contains: [{
            className: "meta",
            begin: "\\]|\\?>",
            relevance: 0,
            starts: {
              end: "\\[noprocess\\]|<\\?(lasso(script)?|=)",
              returnEnd: !0,
              contains: [Z]
            }
          }, D, Y].concat(J)
        }
      }, {
        className: "meta",
        begin: "\\[",
        relevance: 0
      }, {
        className: "meta",
        begin: "^#!",
        end: "lasso9$",
        relevance: 10
      }].concat(J)
    }
  }
  CjA.exports = oi9
})
// @from(Start 1754364, End 1759906)
zjA = z((pe5, HjA) => {
  function ti9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function ei9(...A) {
    return "(" + A.map((Q) => ti9(Q)).join("|") + ")"
  }

  function An9(A) {
    let B = ei9(...["(?:NeedsTeXFormat|RequirePackage|GetIdInfo)", "Provides(?:Expl)?(?:Package|Class|File)", "(?:DeclareOption|ProcessOptions)", "(?:documentclass|usepackage|input|include)", "makeat(?:letter|other)", "ExplSyntax(?:On|Off)", "(?:new|renew|provide)?command", "(?:re)newenvironment", "(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand", "(?:New|Renew|Provide|Declare)DocumentEnvironment", "(?:(?:e|g|x)?def|let)", "(?:begin|end)", "(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)", "caption", "(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)", "(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)", "(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)", "(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)", "(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)", "(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)"].map((x) => x + "(?![a-zA-Z@:_])")),
      Q = new RegExp(["(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*", "[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}", "[qs]__?[a-zA-Z](?:_?[a-zA-Z])+", "use(?:_i)?:[a-zA-Z]*", "(?:else|fi|or):", "(?:if|cs|exp):w", "(?:hbox|vbox):n", "::[a-zA-Z]_unbraced", "::[a-zA-Z:]"].map((x) => x + "(?![a-zA-Z:_])").join("|")),
      I = [{
        begin: /[a-zA-Z@]+/
      }, {
        begin: /[^a-zA-Z@]?/
      }],
      G = [{
        begin: /\^{6}[0-9a-f]{6}/
      }, {
        begin: /\^{5}[0-9a-f]{5}/
      }, {
        begin: /\^{4}[0-9a-f]{4}/
      }, {
        begin: /\^{3}[0-9a-f]{3}/
      }, {
        begin: /\^{2}[0-9a-f]{2}/
      }, {
        begin: /\^{2}[\u0000-\u007f]/
      }],
      Z = {
        className: "keyword",
        begin: /\\/,
        relevance: 0,
        contains: [{
          endsParent: !0,
          begin: B
        }, {
          endsParent: !0,
          begin: Q
        }, {
          endsParent: !0,
          variants: G
        }, {
          endsParent: !0,
          relevance: 0,
          variants: I
        }]
      },
      D = {
        className: "params",
        relevance: 0,
        begin: /#+\d?/
      },
      Y = {
        variants: G
      },
      W = {
        className: "built_in",
        relevance: 0,
        begin: /[$&^_]/
      },
      J = {
        className: "meta",
        begin: "% !TeX",
        end: "$",
        relevance: 10
      },
      F = A.COMMENT("%", "$", {
        relevance: 0
      }),
      X = [Z, D, Y, W, J, F],
      V = {
        begin: /\{/,
        end: /\}/,
        relevance: 0,
        contains: ["self", ...X]
      },
      C = A.inherit(V, {
        relevance: 0,
        endsParent: !0,
        contains: [V, ...X]
      }),
      K = {
        begin: /\[/,
        end: /\]/,
        endsParent: !0,
        relevance: 0,
        contains: [V, ...X]
      },
      E = {
        begin: /\s+/,
        relevance: 0
      },
      N = [C],
      q = [K],
      O = function(x, s) {
        return {
          contains: [E],
          starts: {
            relevance: 0,
            contains: x,
            starts: s
          }
        }
      },
      R = function(x, s) {
        return {
          begin: "\\\\" + x + "(?![a-zA-Z@:_])",
          keywords: {
            $pattern: /\\[a-zA-Z]+/,
            keyword: "\\" + x
          },
          relevance: 0,
          contains: [E],
          starts: s
        }
      },
      T = function(x, s) {
        return A.inherit({
          begin: "\\\\begin(?=[ 	]*(\\r?\\n[ 	]*)?\\{" + x + "\\})",
          keywords: {
            $pattern: /\\[a-zA-Z]+/,
            keyword: "\\begin"
          },
          relevance: 0
        }, O(N, s))
      },
      L = (x = "string") => {
        return A.END_SAME_AS_BEGIN({
          className: x,
          begin: /(.|\r?\n)/,
          end: /(.|\r?\n)/,
          excludeBegin: !0,
          excludeEnd: !0,
          endsParent: !0
        })
      },
      _ = function(x) {
        return {
          className: "string",
          end: "(?=\\\\end\\{" + x + "\\})"
        }
      },
      k = (x = "string") => {
        return {
          relevance: 0,
          begin: /\{/,
          starts: {
            endsParent: !0,
            contains: [{
              className: x,
              end: /(?=\})/,
              endsParent: !0,
              contains: [{
                begin: /\{/,
                end: /\}/,
                relevance: 0,
                contains: ["self"]
              }]
            }]
          }
        }
      },
      i = [...["verb", "lstinline"].map((x) => R(x, {
        contains: [L()]
      })), R("mint", O(N, {
        contains: [L()]
      })), R("mintinline", O(N, {
        contains: [k(), L()]
      })), R("url", {
        contains: [k("link"), k("link")]
      }), R("hyperref", {
        contains: [k("link")]
      }), R("href", O(q, {
        contains: [k("link")]
      })), ...[].concat(...["", "\\*"].map((x) => [T("verbatim" + x, _("verbatim" + x)), T("filecontents" + x, O(N, _("filecontents" + x))), ...["", "B", "L"].map((s) => T(s + "Verbatim" + x, O(q, _(s + "Verbatim" + x))))])), T("minted", O(q, O(N, _("minted"))))];
    return {
      name: "LaTeX",
      aliases: ["tex"],
      contains: [...i, ...X]
    }
  }
  HjA.exports = An9
})
// @from(Start 1759912, End 1760520)
EjA = z((ce5, wjA) => {
  function Bn9(A) {
    return {
      name: "LDIF",
      contains: [{
        className: "attribute",
        begin: "^dn",
        end: ": ",
        excludeEnd: !0,
        starts: {
          end: "$",
          relevance: 0
        },
        relevance: 10
      }, {
        className: "attribute",
        begin: "^\\w",
        end: ": ",
        excludeEnd: !0,
        starts: {
          end: "$",
          relevance: 0
        }
      }, {
        className: "literal",
        begin: "^-",
        end: "$"
      }, A.HASH_COMMENT_MODE]
    }
  }
  wjA.exports = Bn9
})
// @from(Start 1760526, End 1761295)
NjA = z((le5, UjA) => {
  function Qn9(A) {
    return {
      name: "Leaf",
      contains: [{
        className: "function",
        begin: "#+[A-Za-z_0-9]*\\(",
        end: / \{/,
        returnBegin: !0,
        excludeEnd: !0,
        contains: [{
          className: "keyword",
          begin: "#+"
        }, {
          className: "title",
          begin: "[A-Za-z_][A-Za-z_0-9]*"
        }, {
          className: "params",
          begin: "\\(",
          end: "\\)",
          endsParent: !0,
          contains: [{
            className: "string",
            begin: '"',
            end: '"'
          }, {
            className: "variable",
            begin: "[A-Za-z_][A-Za-z_0-9]*"
          }]
        }]
      }]
    }
  }
  UjA.exports = Qn9
})
// @from(Start 1761301, End 1771051)
LjA = z((ie5, MjA) => {
  var In9 = (A) => {
      return {
        IMPORTANT: {
          className: "meta",
          begin: "!important"
        },
        HEXCOLOR: {
          className: "number",
          begin: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
        },
        ATTRIBUTE_SELECTOR_MODE: {
          className: "selector-attr",
          begin: /\[/,
          end: /\]/,
          illegal: "$",
          contains: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
        }
      }
    },
    Gn9 = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"],
    Zn9 = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"],
    $jA = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"],
    qjA = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"],
    Dn9 = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-variation-settings", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "src", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"].reverse(),
    Yn9 = $jA.concat(qjA);

  function Wn9(A) {
    let B = In9(A),
      Q = Yn9,
      I = "and or not only",
      G = "[\\w-]+",
      Z = "([\\w-]+|@\\{[\\w-]+\\})",
      D = [],
      Y = [],
      W = function(R) {
        return {
          className: "string",
          begin: "~?" + R + ".*?" + R
        }
      },
      J = function(R, T, L) {
        return {
          className: R,
          begin: T,
          relevance: L
        }
      },
      F = {
        $pattern: /[a-z-]+/,
        keyword: "and or not only",
        attribute: Zn9.join(" ")
      },
      X = {
        begin: "\\(",
        end: "\\)",
        contains: Y,
        keywords: F,
        relevance: 0
      };
    Y.push(A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, W("'"), W('"'), A.CSS_NUMBER_MODE, {
      begin: "(url|data-uri)\\(",
      starts: {
        className: "string",
        end: "[\\)\\n]",
        excludeEnd: !0
      }
    }, B.HEXCOLOR, X, J("variable", "@@?[\\w-]+", 10), J("variable", "@\\{[\\w-]+\\}"), J("built_in", "~?`[^`]*?`"), {
      className: "attribute",
      begin: "[\\w-]+\\s*:",
      end: ":",
      returnBegin: !0,
      excludeEnd: !0
    }, B.IMPORTANT);
    let V = Y.concat({
        begin: /\{/,
        end: /\}/,
        contains: D
      }),
      C = {
        beginKeywords: "when",
        endsWithParent: !0,
        contains: [{
          beginKeywords: "and not"
        }].concat(Y)
      },
      K = {
        begin: Z + "\\s*:",
        returnBegin: !0,
        end: /[;}]/,
        relevance: 0,
        contains: [{
          begin: /-(webkit|moz|ms|o)-/
        }, {
          className: "attribute",
          begin: "\\b(" + Dn9.join("|") + ")\\b",
          end: /(?=:)/,
          starts: {
            endsWithParent: !0,
            illegal: "[<=$]",
            relevance: 0,
            contains: Y
          }
        }]
      },
      E = {
        className: "keyword",
        begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
        starts: {
          end: "[;{}]",
          keywords: F,
          returnEnd: !0,
          contains: Y,
          relevance: 0
        }
      },
      N = {
        className: "variable",
        variants: [{
          begin: "@[\\w-]+\\s*:",
          relevance: 15
        }, {
          begin: "@[\\w-]+"
        }],
        starts: {
          end: "[;}]",
          returnEnd: !0,
          contains: V
        }
      },
      q = {
        variants: [{
          begin: "[\\.#:&\\[>]",
          end: "[;{}]"
        }, {
          begin: Z,
          end: /\{/
        }],
        returnBegin: !0,
        returnEnd: !0,
        illegal: `[<='$"]`,
        relevance: 0,
        contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, C, J("keyword", "all\\b"), J("variable", "@\\{[\\w-]+\\}"), {
          begin: "\\b(" + Gn9.join("|") + ")\\b",
          className: "selector-tag"
        }, J("selector-tag", Z + "%?", 0), J("selector-id", "#" + Z), J("selector-class", "\\." + Z, 0), J("selector-tag", "&", 0), B.ATTRIBUTE_SELECTOR_MODE, {
          className: "selector-pseudo",
          begin: ":(" + $jA.join("|") + ")"
        }, {
          className: "selector-pseudo",
          begin: "::(" + qjA.join("|") + ")"
        }, {
          begin: "\\(",
          end: "\\)",
          contains: V
        }, {
          begin: "!important"
        }]
      },
      O = {
        begin: `[\\w-]+:(:)?(${Q.join("|")})`,
        returnBegin: !0,
        contains: [q]
      };
    return D.push(A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, E, N, O, K, q), {
      name: "Less",
      case_insensitive: !0,
      illegal: `[=>'/<($"]`,
      contains: D
    }
  }
  MjA.exports = Wn9
})
// @from(Start 1771057, End 1773125)
OjA = z((ne5, RjA) => {
  function Jn9(A) {
    var B = "[a-zA-Z_\\-+\\*\\/<=>&#][a-zA-Z0-9_\\-+*\\/<=>&#!]*",
      Q = "\\|[^]*?\\|",
      I = "(-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|-)?\\d+)?",
      G = {
        className: "literal",
        begin: "\\b(t{1}|nil)\\b"
      },
      Z = {
        className: "number",
        variants: [{
          begin: I,
          relevance: 0
        }, {
          begin: "#(b|B)[0-1]+(/[0-1]+)?"
        }, {
          begin: "#(o|O)[0-7]+(/[0-7]+)?"
        }, {
          begin: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
        }, {
          begin: "#(c|C)\\(" + I + " +" + I,
          end: "\\)"
        }]
      },
      D = A.inherit(A.QUOTE_STRING_MODE, {
        illegal: null
      }),
      Y = A.COMMENT(";", "$", {
        relevance: 0
      }),
      W = {
        begin: "\\*",
        end: "\\*"
      },
      J = {
        className: "symbol",
        begin: "[:&]" + B
      },
      F = {
        begin: B,
        relevance: 0
      },
      X = {
        begin: Q
      },
      V = {
        begin: "\\(",
        end: "\\)",
        contains: ["self", G, D, Z, F]
      },
      C = {
        contains: [Z, D, W, J, V, F],
        variants: [{
          begin: "['`]\\(",
          end: "\\)"
        }, {
          begin: "\\(quote ",
          end: "\\)",
          keywords: {
            name: "quote"
          }
        }, {
          begin: "'" + Q
        }]
      },
      K = {
        variants: [{
          begin: "'" + B
        }, {
          begin: "#'" + B + "(::" + B + ")*"
        }]
      },
      E = {
        begin: "\\(\\s*",
        end: "\\)"
      },
      N = {
        endsWithParent: !0,
        relevance: 0
      };
    return E.contains = [{
      className: "name",
      variants: [{
        begin: B,
        relevance: 0
      }, {
        begin: Q
      }]
    }, N], N.contains = [C, K, E, G, Z, D, Y, W, J, X, F], {
      name: "Lisp",
      illegal: /\S/,
      contains: [Z, A.SHEBANG(), G, D, Y, C, K, E, F]
    }
  }
  RjA.exports = Jn9
})
// @from(Start 1773131, End 1781936)
PjA = z((ae5, TjA) => {
  function Fn9(A) {
    let B = {
        className: "variable",
        variants: [{
          begin: "\\b([gtps][A-Z]{1}[a-zA-Z0-9]*)(\\[.+\\])?(?:\\s*?)"
        }, {
          begin: "\\$_[A-Z]+"
        }],
        relevance: 0
      },
      Q = [A.C_BLOCK_COMMENT_MODE, A.HASH_COMMENT_MODE, A.COMMENT("--", "$"), A.COMMENT("[^:]//", "$")],
      I = A.inherit(A.TITLE_MODE, {
        variants: [{
          begin: "\\b_*rig[A-Z][A-Za-z0-9_\\-]*"
        }, {
          begin: "\\b_[a-z0-9\\-]+"
        }]
      }),
      G = A.inherit(A.TITLE_MODE, {
        begin: "\\b([A-Za-z0-9_\\-]+)\\b"
      });
    return {
      name: "LiveCode",
      case_insensitive: !1,
      keywords: {
        keyword: "$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word words fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys",
        literal: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK",
        built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress constantNames cos date dateFormat decompress difference directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge messageAuthenticationCode messageDigest millisec millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetDriver libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load extension loadedExtensions multiply socket prepare process post seek rel relative read from process rename replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop subtract symmetric union unload vectorDotProduct wait write"
      },
      contains: [B, {
        className: "keyword",
        begin: "\\bend\\sif\\b"
      }, {
        className: "function",
        beginKeywords: "function",
        end: "$",
        contains: [B, G, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE, I]
      }, {
        className: "function",
        begin: "\\bend\\s+",
        end: "$",
        keywords: "end",
        contains: [G, I],
        relevance: 0
      }, {
        beginKeywords: "command on",
        end: "$",
        contains: [B, G, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE, I]
      }, {
        className: "meta",
        variants: [{
          begin: "<\\?(rev|lc|livecode)",
          relevance: 10
        }, {
          begin: "<\\?"
        }, {
          begin: "\\?>"
        }]
      }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE, I].concat(Q),
      illegal: ";$|^\\[|^=|&|\\{"
    }
  }
  TjA.exports = Fn9
})
// @from(Start 1781942, End 1787073)
_jA = z((se5, SjA) => {
  var Xn9 = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
    Vn9 = ["true", "false", "null", "undefined", "NaN", "Infinity"],
    Cn9 = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"],
    Kn9 = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
    Hn9 = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
    zn9 = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
    wn9 = [].concat(Hn9, zn9, Cn9, Kn9);

  function En9(A) {
    let B = ["npm", "print"],
      Q = ["yes", "no", "on", "off", "it", "that", "void"],
      I = ["then", "unless", "until", "loop", "of", "by", "when", "and", "or", "is", "isnt", "not", "it", "that", "otherwise", "from", "to", "til", "fallthrough", "case", "enum", "native", "list", "map", "__hasProp", "__extends", "__slice", "__bind", "__indexOf"],
      G = {
        keyword: Xn9.concat(I),
        literal: Vn9.concat(Q),
        built_in: wn9.concat(B)
      },
      Z = "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*",
      D = A.inherit(A.TITLE_MODE, {
        begin: "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*"
      }),
      Y = {
        className: "subst",
        begin: /#\{/,
        end: /\}/,
        keywords: G
      },
      W = {
        className: "subst",
        begin: /#[A-Za-z$_]/,
        end: /(?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
        keywords: G
      },
      J = [A.BINARY_NUMBER_MODE, {
        className: "number",
        begin: "(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",
        relevance: 0,
        starts: {
          end: "(\\s*/)?",
          relevance: 0
        }
      }, {
        className: "string",
        variants: [{
          begin: /'''/,
          end: /'''/,
          contains: [A.BACKSLASH_ESCAPE]
        }, {
          begin: /'/,
          end: /'/,
          contains: [A.BACKSLASH_ESCAPE]
        }, {
          begin: /"""/,
          end: /"""/,
          contains: [A.BACKSLASH_ESCAPE, Y, W]
        }, {
          begin: /"/,
          end: /"/,
          contains: [A.BACKSLASH_ESCAPE, Y, W]
        }, {
          begin: /\\/,
          end: /(\s|$)/,
          excludeEnd: !0
        }]
      }, {
        className: "regexp",
        variants: [{
          begin: "//",
          end: "//[gim]*",
          contains: [Y, A.HASH_COMMENT_MODE]
        }, {
          begin: /\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/
        }]
      }, {
        begin: "@[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*"
      }, {
        begin: "``",
        end: "``",
        excludeBegin: !0,
        excludeEnd: !0,
        subLanguage: "javascript"
      }];
    Y.contains = J;
    let F = {
        className: "params",
        begin: "\\(",
        returnBegin: !0,
        contains: [{
          begin: /\(/,
          end: /\)/,
          keywords: G,
          contains: ["self"].concat(J)
        }]
      },
      X = {
        begin: "(#=>|=>|\\|>>|-?->|!->)"
      };
    return {
      name: "LiveScript",
      aliases: ["ls"],
      keywords: G,
      illegal: /\/\*/,
      contains: J.concat([A.COMMENT("\\/\\*", "\\*\\/"), A.HASH_COMMENT_MODE, X, {
        className: "function",
        contains: [D, F],
        returnBegin: !0,
        variants: [{
          begin: "([A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B->\\*?",
          end: "->\\*?"
        }, {
          begin: "([A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*\\s*(?:=|:=)\\s*)?!?(\\(.*\\)\\s*)?\\B[-~]{1,2}>\\*?",
          end: "[-~]{1,2}>\\*?"
        }, {
          begin: "([A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B!?[-~]{1,2}>\\*?",
          end: "!?[-~]{1,2}>\\*?"
        }]
      }, {
        className: "class",
        beginKeywords: "class",
        end: "$",
        illegal: /[:="\[\]]/,
        contains: [{
          beginKeywords: "extends",
          endsWithParent: !0,
          illegal: /[:="\[\]]/,
          contains: [D]
        }, D]
      }, {
        begin: "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*:",
        end: ":",
        returnBegin: !0,
        returnEnd: !0,
        relevance: 0
      }])
    }
  }
  SjA.exports = En9
})
// @from(Start 1787079, End 1790500)
yjA = z((re5, jjA) => {
  function Un9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function N81(...A) {
    return A.map((Q) => Un9(Q)).join("")
  }

  function Nn9(A) {
    let B = /([-a-zA-Z$._][\w$.-]*)/,
      Q = {
        className: "type",
        begin: /\bi\d+(?=\s|\b)/
      },
      I = {
        className: "operator",
        relevance: 0,
        begin: /=/
      },
      G = {
        className: "punctuation",
        relevance: 0,
        begin: /,/
      },
      Z = {
        className: "number",
        variants: [{
          begin: /0[xX][a-fA-F0-9]+/
        }, {
          begin: /-?\d+(?:[.]\d+)?(?:[eE][-+]?\d+(?:[.]\d+)?)?/
        }],
        relevance: 0
      },
      D = {
        className: "symbol",
        variants: [{
          begin: /^\s*[a-z]+:/
        }],
        relevance: 0
      },
      Y = {
        className: "variable",
        variants: [{
          begin: N81(/%/, B)
        }, {
          begin: /%\d+/
        }, {
          begin: /#\d+/
        }]
      },
      W = {
        className: "title",
        variants: [{
          begin: N81(/@/, B)
        }, {
          begin: /@\d+/
        }, {
          begin: N81(/!/, B)
        }, {
          begin: N81(/!\d+/, B)
        }, {
          begin: /!\d+/
        }]
      };
    return {
      name: "LLVM IR",
      keywords: "begin end true false declare define global constant private linker_private internal available_externally linkonce linkonce_odr weak weak_odr appending dllimport dllexport common default hidden protected extern_weak external thread_local zeroinitializer undef null to tail target triple datalayout volatile nuw nsw nnan ninf nsz arcp fast exact inbounds align addrspace section alias module asm sideeffect gc dbg linker_private_weak attributes blockaddress initialexec localdynamic localexec prefix unnamed_addr ccc fastcc coldcc x86_stdcallcc x86_fastcallcc arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ptx_kernel intel_ocl_bicc msp430_intrcc spir_func spir_kernel x86_64_sysvcc x86_64_win64cc x86_thiscallcc cc c signext zeroext inreg sret nounwind noreturn noalias nocapture byval nest readnone readonly inlinehint noinline alwaysinline optsize ssp sspreq noredzone noimplicitfloat naked builtin cold nobuiltin noduplicate nonlazybind optnone returns_twice sanitize_address sanitize_memory sanitize_thread sspstrong uwtable returned type opaque eq ne slt sgt sle sge ult ugt ule uge oeq one olt ogt ole oge ord uno ueq une x acq_rel acquire alignstack atomic catch cleanup filter inteldialect max min monotonic nand personality release seq_cst singlethread umax umin unordered xchg add fadd sub fsub mul fmul udiv sdiv fdiv urem srem frem shl lshr ashr and or xor icmp fcmp phi call trunc zext sext fptrunc fpext uitofp sitofp fptoui fptosi inttoptr ptrtoint bitcast addrspacecast select va_arg ret br switch invoke unwind unreachable indirectbr landingpad resume malloc alloca free load store getelementptr extractelement insertelement shufflevector getresult extractvalue insertvalue atomicrmw cmpxchg fence argmemonly double",
      contains: [Q, A.COMMENT(/;\s*$/, null, {
        relevance: 0
      }), A.COMMENT(/;/, /$/), A.QUOTE_STRING_MODE, {
        className: "string",
        variants: [{
          begin: /"/,
          end: /[^\\]"/
        }]
      }, W, G, I, Y, D, Z]
    }
  }
  jjA.exports = Nn9
})
// @from(Start 1790506, End 1802924)
xjA = z((oe5, kjA) => {
  function $n9(A) {
    var B = {
        className: "subst",
        begin: /\\[tn"\\]/
      },
      Q = {
        className: "string",
        begin: '"',
        end: '"',
        contains: [B]
      },
      I = {
        className: "number",
        relevance: 0,
        begin: A.C_NUMBER_RE
      },
      G = {
        className: "literal",
        variants: [{
          begin: "\\b(PI|TWO_PI|PI_BY_TWO|DEG_TO_RAD|RAD_TO_DEG|SQRT2)\\b"
        }, {
          begin: "\\b(XP_ERROR_(EXPERIENCES_DISABLED|EXPERIENCE_(DISABLED|SUSPENDED)|INVALID_(EXPERIENCE|PARAMETERS)|KEY_NOT_FOUND|MATURITY_EXCEEDED|NONE|NOT_(FOUND|PERMITTED(_LAND)?)|NO_EXPERIENCE|QUOTA_EXCEEDED|RETRY_UPDATE|STORAGE_EXCEPTION|STORE_DISABLED|THROTTLED|UNKNOWN_ERROR)|JSON_APPEND|STATUS_(PHYSICS|ROTATE_[XYZ]|PHANTOM|SANDBOX|BLOCK_GRAB(_OBJECT)?|(DIE|RETURN)_AT_EDGE|CAST_SHADOWS|OK|MALFORMED_PARAMS|TYPE_MISMATCH|BOUNDS_ERROR|NOT_(FOUND|SUPPORTED)|INTERNAL_ERROR|WHITELIST_FAILED)|AGENT(_(BY_(LEGACY_|USER)NAME|FLYING|ATTACHMENTS|SCRIPTED|MOUSELOOK|SITTING|ON_OBJECT|AWAY|WALKING|IN_AIR|TYPING|CROUCHING|BUSY|ALWAYS_RUN|AUTOPILOT|LIST_(PARCEL(_OWNER)?|REGION)))?|CAMERA_(PITCH|DISTANCE|BEHINDNESS_(ANGLE|LAG)|(FOCUS|POSITION)(_(THRESHOLD|LOCKED|LAG))?|FOCUS_OFFSET|ACTIVE)|ANIM_ON|LOOP|REVERSE|PING_PONG|SMOOTH|ROTATE|SCALE|ALL_SIDES|LINK_(ROOT|SET|ALL_(OTHERS|CHILDREN)|THIS)|ACTIVE|PASS(IVE|_(ALWAYS|IF_NOT_HANDLED|NEVER))|SCRIPTED|CONTROL_(FWD|BACK|(ROT_)?(LEFT|RIGHT)|UP|DOWN|(ML_)?LBUTTON)|PERMISSION_(RETURN_OBJECTS|DEBIT|OVERRIDE_ANIMATIONS|SILENT_ESTATE_MANAGEMENT|TAKE_CONTROLS|TRIGGER_ANIMATION|ATTACH|CHANGE_LINKS|(CONTROL|TRACK)_CAMERA|TELEPORT)|INVENTORY_(TEXTURE|SOUND|OBJECT|SCRIPT|LANDMARK|CLOTHING|NOTECARD|BODYPART|ANIMATION|GESTURE|ALL|NONE)|CHANGED_(INVENTORY|COLOR|SHAPE|SCALE|TEXTURE|LINK|ALLOWED_DROP|OWNER|REGION(_START)?|TELEPORT|MEDIA)|OBJECT_(CLICK_ACTION|HOVER_HEIGHT|LAST_OWNER_ID|(PHYSICS|SERVER|STREAMING)_COST|UNKNOWN_DETAIL|CHARACTER_TIME|PHANTOM|PHYSICS|TEMP_(ATTACHED|ON_REZ)|NAME|DESC|POS|PRIM_(COUNT|EQUIVALENCE)|RETURN_(PARCEL(_OWNER)?|REGION)|REZZER_KEY|ROO?T|VELOCITY|OMEGA|OWNER|GROUP(_TAG)?|CREATOR|ATTACHED_(POINT|SLOTS_AVAILABLE)|RENDER_WEIGHT|(BODY_SHAPE|PATHFINDING)_TYPE|(RUNNING|TOTAL)_SCRIPT_COUNT|TOTAL_INVENTORY_COUNT|SCRIPT_(MEMORY|TIME))|TYPE_(INTEGER|FLOAT|STRING|KEY|VECTOR|ROTATION|INVALID)|(DEBUG|PUBLIC)_CHANNEL|ATTACH_(AVATAR_CENTER|CHEST|HEAD|BACK|PELVIS|MOUTH|CHIN|NECK|NOSE|BELLY|[LR](SHOULDER|HAND|FOOT|EAR|EYE|[UL](ARM|LEG)|HIP)|(LEFT|RIGHT)_PEC|HUD_(CENTER_[12]|TOP_(RIGHT|CENTER|LEFT)|BOTTOM(_(RIGHT|LEFT))?)|[LR]HAND_RING1|TAIL_(BASE|TIP)|[LR]WING|FACE_(JAW|[LR]EAR|[LR]EYE|TOUNGE)|GROIN|HIND_[LR]FOOT)|LAND_(LEVEL|RAISE|LOWER|SMOOTH|NOISE|REVERT)|DATA_(ONLINE|NAME|BORN|SIM_(POS|STATUS|RATING)|PAYINFO)|PAYMENT_INFO_(ON_FILE|USED)|REMOTE_DATA_(CHANNEL|REQUEST|REPLY)|PSYS_(PART_(BF_(ZERO|ONE(_MINUS_(DEST_COLOR|SOURCE_(ALPHA|COLOR)))?|DEST_COLOR|SOURCE_(ALPHA|COLOR))|BLEND_FUNC_(DEST|SOURCE)|FLAGS|(START|END)_(COLOR|ALPHA|SCALE|GLOW)|MAX_AGE|(RIBBON|WIND|INTERP_(COLOR|SCALE)|BOUNCE|FOLLOW_(SRC|VELOCITY)|TARGET_(POS|LINEAR)|EMISSIVE)_MASK)|SRC_(MAX_AGE|PATTERN|ANGLE_(BEGIN|END)|BURST_(RATE|PART_COUNT|RADIUS|SPEED_(MIN|MAX))|ACCEL|TEXTURE|TARGET_KEY|OMEGA|PATTERN_(DROP|EXPLODE|ANGLE(_CONE(_EMPTY)?)?)))|VEHICLE_(REFERENCE_FRAME|TYPE_(NONE|SLED|CAR|BOAT|AIRPLANE|BALLOON)|(LINEAR|ANGULAR)_(FRICTION_TIMESCALE|MOTOR_DIRECTION)|LINEAR_MOTOR_OFFSET|HOVER_(HEIGHT|EFFICIENCY|TIMESCALE)|BUOYANCY|(LINEAR|ANGULAR)_(DEFLECTION_(EFFICIENCY|TIMESCALE)|MOTOR_(DECAY_)?TIMESCALE)|VERTICAL_ATTRACTION_(EFFICIENCY|TIMESCALE)|BANKING_(EFFICIENCY|MIX|TIMESCALE)|FLAG_(NO_DEFLECTION_UP|LIMIT_(ROLL_ONLY|MOTOR_UP)|HOVER_((WATER|TERRAIN|UP)_ONLY|GLOBAL_HEIGHT)|MOUSELOOK_(STEER|BANK)|CAMERA_DECOUPLED))|PRIM_(ALLOW_UNSIT|ALPHA_MODE(_(BLEND|EMISSIVE|MASK|NONE))?|NORMAL|SPECULAR|TYPE(_(BOX|CYLINDER|PRISM|SPHERE|TORUS|TUBE|RING|SCULPT))?|HOLE_(DEFAULT|CIRCLE|SQUARE|TRIANGLE)|MATERIAL(_(STONE|METAL|GLASS|WOOD|FLESH|PLASTIC|RUBBER))?|SHINY_(NONE|LOW|MEDIUM|HIGH)|BUMP_(NONE|BRIGHT|DARK|WOOD|BARK|BRICKS|CHECKER|CONCRETE|TILE|STONE|DISKS|GRAVEL|BLOBS|SIDING|LARGETILE|STUCCO|SUCTION|WEAVE)|TEXGEN_(DEFAULT|PLANAR)|SCRIPTED_SIT_ONLY|SCULPT_(TYPE_(SPHERE|TORUS|PLANE|CYLINDER|MASK)|FLAG_(MIRROR|INVERT))|PHYSICS(_(SHAPE_(CONVEX|NONE|PRIM|TYPE)))?|(POS|ROT)_LOCAL|SLICE|TEXT|FLEXIBLE|POINT_LIGHT|TEMP_ON_REZ|PHANTOM|POSITION|SIT_TARGET|SIZE|ROTATION|TEXTURE|NAME|OMEGA|DESC|LINK_TARGET|COLOR|BUMP_SHINY|FULLBRIGHT|TEXGEN|GLOW|MEDIA_(ALT_IMAGE_ENABLE|CONTROLS|(CURRENT|HOME)_URL|AUTO_(LOOP|PLAY|SCALE|ZOOM)|FIRST_CLICK_INTERACT|(WIDTH|HEIGHT)_PIXELS|WHITELIST(_ENABLE)?|PERMS_(INTERACT|CONTROL)|PARAM_MAX|CONTROLS_(STANDARD|MINI)|PERM_(NONE|OWNER|GROUP|ANYONE)|MAX_(URL_LENGTH|WHITELIST_(SIZE|COUNT)|(WIDTH|HEIGHT)_PIXELS)))|MASK_(BASE|OWNER|GROUP|EVERYONE|NEXT)|PERM_(TRANSFER|MODIFY|COPY|MOVE|ALL)|PARCEL_(MEDIA_COMMAND_(STOP|PAUSE|PLAY|LOOP|TEXTURE|URL|TIME|AGENT|UNLOAD|AUTO_ALIGN|TYPE|SIZE|DESC|LOOP_SET)|FLAG_(ALLOW_(FLY|(GROUP_)?SCRIPTS|LANDMARK|TERRAFORM|DAMAGE|CREATE_(GROUP_)?OBJECTS)|USE_(ACCESS_(GROUP|LIST)|BAN_LIST|LAND_PASS_LIST)|LOCAL_SOUND_ONLY|RESTRICT_PUSHOBJECT|ALLOW_(GROUP|ALL)_OBJECT_ENTRY)|COUNT_(TOTAL|OWNER|GROUP|OTHER|SELECTED|TEMP)|DETAILS_(NAME|DESC|OWNER|GROUP|AREA|ID|SEE_AVATARS))|LIST_STAT_(MAX|MIN|MEAN|MEDIAN|STD_DEV|SUM(_SQUARES)?|NUM_COUNT|GEOMETRIC_MEAN|RANGE)|PAY_(HIDE|DEFAULT)|REGION_FLAG_(ALLOW_DAMAGE|FIXED_SUN|BLOCK_TERRAFORM|SANDBOX|DISABLE_(COLLISIONS|PHYSICS)|BLOCK_FLY|ALLOW_DIRECT_TELEPORT|RESTRICT_PUSHOBJECT)|HTTP_(METHOD|MIMETYPE|BODY_(MAXLENGTH|TRUNCATED)|CUSTOM_HEADER|PRAGMA_NO_CACHE|VERBOSE_THROTTLE|VERIFY_CERT)|SIT_(INVALID_(AGENT|LINK_OBJECT)|NO(T_EXPERIENCE|_(ACCESS|EXPERIENCE_PERMISSION|SIT_TARGET)))|STRING_(TRIM(_(HEAD|TAIL))?)|CLICK_ACTION_(NONE|TOUCH|SIT|BUY|PAY|OPEN(_MEDIA)?|PLAY|ZOOM)|TOUCH_INVALID_FACE|PROFILE_(NONE|SCRIPT_MEMORY)|RC_(DATA_FLAGS|DETECT_PHANTOM|GET_(LINK_NUM|NORMAL|ROOT_KEY)|MAX_HITS|REJECT_(TYPES|AGENTS|(NON)?PHYSICAL|LAND))|RCERR_(CAST_TIME_EXCEEDED|SIM_PERF_LOW|UNKNOWN)|ESTATE_ACCESS_(ALLOWED_(AGENT|GROUP)_(ADD|REMOVE)|BANNED_AGENT_(ADD|REMOVE))|DENSITY|FRICTION|RESTITUTION|GRAVITY_MULTIPLIER|KFM_(COMMAND|CMD_(PLAY|STOP|PAUSE)|MODE|FORWARD|LOOP|PING_PONG|REVERSE|DATA|ROTATION|TRANSLATION)|ERR_(GENERIC|PARCEL_PERMISSIONS|MALFORMED_PARAMS|RUNTIME_PERMISSIONS|THROTTLED)|CHARACTER_(CMD_((SMOOTH_)?STOP|JUMP)|DESIRED_(TURN_)?SPEED|RADIUS|STAY_WITHIN_PARCEL|LENGTH|ORIENTATION|ACCOUNT_FOR_SKIPPED_FRAMES|AVOIDANCE_MODE|TYPE(_([ABCD]|NONE))?|MAX_(DECEL|TURN_RADIUS|(ACCEL|SPEED)))|PURSUIT_(OFFSET|FUZZ_FACTOR|GOAL_TOLERANCE|INTERCEPT)|REQUIRE_LINE_OF_SIGHT|FORCE_DIRECT_PATH|VERTICAL|HORIZONTAL|AVOID_(CHARACTERS|DYNAMIC_OBSTACLES|NONE)|PU_(EVADE_(HIDDEN|SPOTTED)|FAILURE_(DYNAMIC_PATHFINDING_DISABLED|INVALID_(GOAL|START)|NO_(NAVMESH|VALID_DESTINATION)|OTHER|TARGET_GONE|(PARCEL_)?UNREACHABLE)|(GOAL|SLOWDOWN_DISTANCE)_REACHED)|TRAVERSAL_TYPE(_(FAST|NONE|SLOW))?|CONTENT_TYPE_(ATOM|FORM|HTML|JSON|LLSD|RSS|TEXT|XHTML|XML)|GCNP_(RADIUS|STATIC)|(PATROL|WANDER)_PAUSE_AT_WAYPOINTS|OPT_(AVATAR|CHARACTER|EXCLUSION_VOLUME|LEGACY_LINKSET|MATERIAL_VOLUME|OTHER|STATIC_OBSTACLE|WALKABLE)|SIM_STAT_PCT_CHARS_STEPPED)\\b"
        }, {
          begin: "\\b(FALSE|TRUE)\\b"
        }, {
          begin: "\\b(ZERO_ROTATION)\\b"
        }, {
          begin: "\\b(EOF|JSON_(ARRAY|DELETE|FALSE|INVALID|NULL|NUMBER|OBJECT|STRING|TRUE)|NULL_KEY|TEXTURE_(BLANK|DEFAULT|MEDIA|PLYWOOD|TRANSPARENT)|URL_REQUEST_(GRANTED|DENIED))\\b"
        }, {
          begin: "\\b(ZERO_VECTOR|TOUCH_INVALID_(TEXCOORD|VECTOR))\\b"
        }]
      },
      Z = {
        className: "built_in",
        begin: "\\b(ll(AgentInExperience|(Create|DataSize|Delete|KeyCount|Keys|Read|Update)KeyValue|GetExperience(Details|ErrorMessage)|ReturnObjectsBy(ID|Owner)|Json(2List|[GS]etValue|ValueType)|Sin|Cos|Tan|Atan2|Sqrt|Pow|Abs|Fabs|Frand|Floor|Ceil|Round|Vec(Mag|Norm|Dist)|Rot(Between|2(Euler|Fwd|Left|Up))|(Euler|Axes)2Rot|Whisper|(Region|Owner)?Say|Shout|Listen(Control|Remove)?|Sensor(Repeat|Remove)?|Detected(Name|Key|Owner|Type|Pos|Vel|Grab|Rot|Group|LinkNumber)|Die|Ground|Wind|([GS]et)(AnimationOverride|MemoryLimit|PrimMediaParams|ParcelMusicURL|Object(Desc|Name)|PhysicsMaterial|Status|Scale|Color|Alpha|Texture|Pos|Rot|Force|Torque)|ResetAnimationOverride|(Scale|Offset|Rotate)Texture|(Rot)?Target(Remove)?|(Stop)?MoveToTarget|Apply(Rotational)?Impulse|Set(KeyframedMotion|ContentType|RegionPos|(Angular)?Velocity|Buoyancy|HoverHeight|ForceAndTorque|TimerEvent|ScriptState|Damage|TextureAnim|Sound(Queueing|Radius)|Vehicle(Type|(Float|Vector|Rotation)Param)|(Touch|Sit)?Text|Camera(Eye|At)Offset|PrimitiveParams|ClickAction|Link(Alpha|Color|PrimitiveParams(Fast)?|Texture(Anim)?|Camera|Media)|RemoteScriptAccessPin|PayPrice|LocalRot)|ScaleByFactor|Get((Max|Min)ScaleFactor|ClosestNavPoint|StaticPath|SimStats|Env|PrimitiveParams|Link(PrimitiveParams|Number(OfSides)?|Key|Name|Media)|HTTPHeader|FreeURLs|Object(Details|PermMask|PrimCount)|Parcel(MaxPrims|Details|Prim(Count|Owners))|Attached(List)?|(SPMax|Free|Used)Memory|Region(Name|TimeDilation|FPS|Corner|AgentCount)|Root(Position|Rotation)|UnixTime|(Parcel|Region)Flags|(Wall|GMT)clock|SimulatorHostname|BoundingBox|GeometricCenter|Creator|NumberOf(Prims|NotecardLines|Sides)|Animation(List)?|(Camera|Local)(Pos|Rot)|Vel|Accel|Omega|Time(stamp|OfDay)|(Object|CenterOf)?Mass|MassMKS|Energy|Owner|(Owner)?Key|SunDirection|Texture(Offset|Scale|Rot)|Inventory(Number|Name|Key|Type|Creator|PermMask)|Permissions(Key)?|StartParameter|List(Length|EntryType)|Date|Agent(Size|Info|Language|List)|LandOwnerAt|NotecardLine|Script(Name|State))|(Get|Reset|GetAndReset)Time|PlaySound(Slave)?|LoopSound(Master|Slave)?|(Trigger|Stop|Preload)Sound|((Get|Delete)Sub|Insert)String|To(Upper|Lower)|Give(InventoryList|Money)|RezObject|(Stop)?LookAt|Sleep|CollisionFilter|(Take|Release)Controls|DetachFromAvatar|AttachToAvatar(Temp)?|InstantMessage|(GetNext)?Email|StopHover|MinEventDelay|RotLookAt|String(Length|Trim)|(Start|Stop)Animation|TargetOmega|Request(Experience)?Permissions|(Create|Break)Link|BreakAllLinks|(Give|Remove)Inventory|Water|PassTouches|Request(Agent|Inventory)Data|TeleportAgent(Home|GlobalCoords)?|ModifyLand|CollisionSound|ResetScript|MessageLinked|PushObject|PassCollisions|AxisAngle2Rot|Rot2(Axis|Angle)|A(cos|sin)|AngleBetween|AllowInventoryDrop|SubStringIndex|List2(CSV|Integer|Json|Float|String|Key|Vector|Rot|List(Strided)?)|DeleteSubList|List(Statistics|Sort|Randomize|(Insert|Find|Replace)List)|EdgeOfWorld|AdjustSoundVolume|Key2Name|TriggerSoundLimited|EjectFromLand|(CSV|ParseString)2List|OverMyLand|SameGroup|UnSit|Ground(Slope|Normal|Contour)|GroundRepel|(Set|Remove)VehicleFlags|SitOnLink|(AvatarOn)?(Link)?SitTarget|Script(Danger|Profiler)|Dialog|VolumeDetect|ResetOtherScript|RemoteLoadScriptPin|(Open|Close)RemoteDataChannel|SendRemoteData|RemoteDataReply|(Integer|String)ToBase64|XorBase64|Log(10)?|Base64To(String|Integer)|ParseStringKeepNulls|RezAtRoot|RequestSimulatorData|ForceMouselook|(Load|Release|(E|Une)scape)URL|ParcelMedia(CommandList|Query)|ModPow|MapDestination|(RemoveFrom|AddTo|Reset)Land(Pass|Ban)List|(Set|Clear)CameraParams|HTTP(Request|Response)|TextBox|DetectedTouch(UV|Face|Pos|(N|Bin)ormal|ST)|(MD5|SHA1|DumpList2)String|Request(Secure)?URL|Clear(Prim|Link)Media|(Link)?ParticleSystem|(Get|Request)(Username|DisplayName)|RegionSayTo|CastRay|GenerateKey|TransferLindenDollars|ManageEstateAccess|(Create|Delete)Character|ExecCharacterCmd|Evade|FleeFrom|NavigateTo|PatrolPoints|Pursue|UpdateCharacter|WanderWithin))\\b"
      };
    return {
      name: "LSL (Linden Scripting Language)",
      illegal: ":",
      contains: [Q, {
        className: "comment",
        variants: [A.COMMENT("//", "$"), A.COMMENT("/\\*", "\\*/")],
        relevance: 0
      }, I, {
        className: "section",
        variants: [{
          begin: "\\b(state|default)\\b"
        }, {
          begin: "\\b(state_(entry|exit)|touch(_(start|end))?|(land_)?collision(_(start|end))?|timer|listen|(no_)?sensor|control|(not_)?at_(rot_)?target|money|email|experience_permissions(_denied)?|run_time_permissions|changed|attach|dataserver|moving_(start|end)|link_message|(on|object)_rez|remote_data|http_re(sponse|quest)|path_update|transaction_result)\\b"
        }]
      }, Z, G, {
        className: "type",
        begin: "\\b(integer|float|string|key|vector|quaternion|rotation|list)\\b"
      }]
    }
  }
  kjA.exports = $n9
})
// @from(Start 1802930, End 1805193)
vjA = z((te5, fjA) => {
  function qn9(A) {
    let I = {
        begin: "\\[=*\\[",
        end: "\\]=*\\]",
        contains: ["self"]
      },
      G = [A.COMMENT("--(?!\\[=*\\[)", "$"), A.COMMENT("--\\[=*\\[", "\\]=*\\]", {
        contains: [I],
        relevance: 10
      })];
    return {
      name: "Lua",
      keywords: {
        $pattern: A.UNDERSCORE_IDENT_RE,
        literal: "true false nil",
        keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
        built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
      },
      contains: G.concat([{
        className: "function",
        beginKeywords: "function",
        end: "\\)",
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
        }), {
          className: "params",
          begin: "\\(",
          endsWithParent: !0,
          contains: G
        }].concat(G)
      }, A.C_NUMBER_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
        className: "string",
        begin: "\\[=*\\[",
        end: "\\]=*\\]",
        contains: [I],
        relevance: 5
      }])
    }
  }
  fjA.exports = qn9
})
// @from(Start 1805199, End 1806773)
gjA = z((ee5, bjA) => {
  function Mn9(A) {
    let B = {
        className: "variable",
        variants: [{
          begin: "\\$\\(" + A.UNDERSCORE_IDENT_RE + "\\)",
          contains: [A.BACKSLASH_ESCAPE]
        }, {
          begin: /\$[@%<?\^\+\*]/
        }]
      },
      Q = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [A.BACKSLASH_ESCAPE, B]
      },
      I = {
        className: "variable",
        begin: /\$\([\w-]+\s/,
        end: /\)/,
        keywords: {
          built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
        },
        contains: [B]
      },
      G = {
        begin: "^" + A.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
      },
      Z = {
        className: "meta",
        begin: /^\.PHONY:/,
        end: /$/,
        keywords: {
          $pattern: /[\.\w]+/,
          "meta-keyword": ".PHONY"
        }
      },
      D = {
        className: "section",
        begin: /^[^\s]+:/,
        end: /$/,
        contains: [B]
      };
    return {
      name: "Makefile",
      aliases: ["mk", "mak", "make"],
      keywords: {
        $pattern: /[\w-]+/,
        keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
      },
      contains: [A.HASH_COMMENT_MODE, B, Q, I, G, Z, D]
    }
  }
  bjA.exports = Mn9
})