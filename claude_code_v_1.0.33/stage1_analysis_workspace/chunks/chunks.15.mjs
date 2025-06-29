
// @from(Start 1436653, End 1441214)
iPA = z((xt5, lPA) => {
  var lc9 = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
    ic9 = ["true", "false", "null", "undefined", "NaN", "Infinity"],
    nc9 = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"],
    ac9 = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
    sc9 = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
    rc9 = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
    oc9 = [].concat(sc9, rc9, nc9, ac9);

  function tc9(A) {
    let B = ["npm", "print"],
      Q = ["yes", "no", "on", "off"],
      I = ["then", "unless", "until", "loop", "by", "when", "and", "or", "is", "isnt", "not"],
      G = ["var", "const", "let", "function", "static"],
      Z = (C) => (K) => !C.includes(K),
      D = {
        keyword: lc9.concat(I).filter(Z(G)),
        literal: ic9.concat(Q),
        built_in: oc9.concat(B)
      },
      Y = "[A-Za-z$_][0-9A-Za-z$_]*",
      W = {
        className: "subst",
        begin: /#\{/,
        end: /\}/,
        keywords: D
      },
      J = [A.BINARY_NUMBER_MODE, A.inherit(A.C_NUMBER_MODE, {
        starts: {
          end: "(\\s*/)?",
          relevance: 0
        }
      }), {
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
          contains: [A.BACKSLASH_ESCAPE, W]
        }, {
          begin: /"/,
          end: /"/,
          contains: [A.BACKSLASH_ESCAPE, W]
        }]
      }, {
        className: "regexp",
        variants: [{
          begin: "///",
          end: "///",
          contains: [W, A.HASH_COMMENT_MODE]
        }, {
          begin: "//[gim]{0,3}(?=\\W)",
          relevance: 0
        }, {
          begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
        }]
      }, {
        begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
      }, {
        subLanguage: "javascript",
        excludeBegin: !0,
        excludeEnd: !0,
        variants: [{
          begin: "```",
          end: "```"
        }, {
          begin: "`",
          end: "`"
        }]
      }];
    W.contains = J;
    let F = A.inherit(A.TITLE_MODE, {
        begin: "[A-Za-z$_][0-9A-Za-z$_]*"
      }),
      X = "(\\(.*\\)\\s*)?\\B[-=]>",
      V = {
        className: "params",
        begin: "\\([^\\(]",
        returnBegin: !0,
        contains: [{
          begin: /\(/,
          end: /\)/,
          keywords: D,
          contains: ["self"].concat(J)
        }]
      };
    return {
      name: "CoffeeScript",
      aliases: ["coffee", "cson", "iced"],
      keywords: D,
      illegal: /\/\*/,
      contains: J.concat([A.COMMENT("###", "###"), A.HASH_COMMENT_MODE, {
        className: "function",
        begin: "^\\s*[A-Za-z$_][0-9A-Za-z$_]*\\s*=\\s*" + X,
        end: "[-=]>",
        returnBegin: !0,
        contains: [F, V]
      }, {
        begin: /[:\(,=]\s*/,
        relevance: 0,
        contains: [{
          className: "function",
          begin: X,
          end: "[-=]>",
          returnBegin: !0,
          contains: [V]
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
          contains: [F]
        }, F]
      }, {
        begin: "[A-Za-z$_][0-9A-Za-z$_]*:",
        end: ":",
        returnBegin: !0,
        returnEnd: !0,
        relevance: 0
      }])
    }
  }
  lPA.exports = tc9
})
// @from(Start 1441220, End 1444835)
aPA = z((ft5, nPA) => {
  function ec9(A) {
    return {
      name: "Coq",
      keywords: {
        keyword: "_|0 as at cofix else end exists exists2 fix for forall fun if IF in let match mod Prop return Set then Type using where with Abort About Add Admit Admitted All Arguments Assumptions Axiom Back BackTo Backtrack Bind Blacklist Canonical Cd Check Class Classes Close Coercion Coercions CoFixpoint CoInductive Collection Combined Compute Conjecture Conjectures Constant constr Constraint Constructors Context Corollary CreateHintDb Cut Declare Defined Definition Delimit Dependencies Dependent Derive Drop eauto End Equality Eval Example Existential Existentials Existing Export exporting Extern Extract Extraction Fact Field Fields File Fixpoint Focus for From Function Functional Generalizable Global Goal Grab Grammar Graph Guarded Heap Hint HintDb Hints Hypotheses Hypothesis ident Identity If Immediate Implicit Import Include Inductive Infix Info Initial Inline Inspect Instance Instances Intro Intros Inversion Inversion_clear Language Left Lemma Let Libraries Library Load LoadPath Local Locate Ltac ML Mode Module Modules Monomorphic Morphism Next NoInline Notation Obligation Obligations Opaque Open Optimize Options Parameter Parameters Parametric Path Paths pattern Polymorphic Preterm Print Printing Program Projections Proof Proposition Pwd Qed Quit Rec Record Recursive Redirect Relation Remark Remove Require Reserved Reset Resolve Restart Rewrite Right Ring Rings Save Scheme Scope Scopes Script Search SearchAbout SearchHead SearchPattern SearchRewrite Section Separate Set Setoid Show Solve Sorted Step Strategies Strategy Structure SubClass Table Tables Tactic Term Test Theorem Time Timeout Transparent Type Typeclasses Types Undelimit Undo Unfocus Unfocused Unfold Universe Universes Unset Unshelve using Variable Variables Variant Verbose Visibility where with",
        built_in: "abstract absurd admit after apply as assert assumption at auto autorewrite autounfold before bottom btauto by case case_eq cbn cbv change classical_left classical_right clear clearbody cofix compare compute congruence constr_eq constructor contradict contradiction cut cutrewrite cycle decide decompose dependent destruct destruction dintuition discriminate discrR do double dtauto eapply eassumption eauto ecase econstructor edestruct ediscriminate eelim eexact eexists einduction einjection eleft elim elimtype enough equality erewrite eright esimplify_eq esplit evar exact exactly_once exfalso exists f_equal fail field field_simplify field_simplify_eq first firstorder fix fold fourier functional generalize generalizing gfail give_up has_evar hnf idtac in induction injection instantiate intro intro_pattern intros intuition inversion inversion_clear is_evar is_var lapply lazy left lia lra move native_compute nia nsatz omega once pattern pose progress proof psatz quote record red refine reflexivity remember rename repeat replace revert revgoals rewrite rewrite_strat right ring ring_simplify rtauto set setoid_reflexivity setoid_replace setoid_rewrite setoid_symmetry setoid_transitivity shelve shelve_unifiable simpl simple simplify_eq solve specialize split split_Rabs split_Rmult stepl stepr subst sum swap symmetry tactic tauto time timeout top transitivity trivial try tryif unfold unify until using vm_compute with"
      },
      contains: [A.QUOTE_STRING_MODE, A.COMMENT("\\(\\*", "\\*\\)"), A.C_NUMBER_MODE, {
        className: "type",
        excludeBegin: !0,
        begin: "\\|\\s*",
        end: "\\w+"
      }, {
        begin: /[-=]>/
      }]
    }
  }
  nPA.exports = ec9
})
// @from(Start 1444841, End 1446718)
rPA = z((vt5, sPA) => {
  function Al9(A) {
    return {
      name: "Caché Object Script",
      case_insensitive: !0,
      aliases: ["cls"],
      keywords: "property parameter class classmethod clientmethod extends as break catch close continue do d|0 else elseif for goto halt hang h|0 if job j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 tcommit throw trollback try tstart use view while write w|0 xecute x|0 zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit zsync ascii",
      contains: [{
        className: "number",
        begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
        relevance: 0
      }, {
        className: "string",
        variants: [{
          begin: '"',
          end: '"',
          contains: [{
            begin: '""',
            relevance: 0
          }]
        }]
      }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
        className: "comment",
        begin: /;/,
        end: "$",
        relevance: 0
      }, {
        className: "built_in",
        begin: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
      }, {
        className: "built_in",
        begin: /\$\$\$[a-zA-Z]+/
      }, {
        className: "built_in",
        begin: /%[a-z]+(?:\.[a-z]+)*/
      }, {
        className: "symbol",
        begin: /\^%?[a-zA-Z][\w]*/
      }, {
        className: "keyword",
        begin: /##class|##super|#define|#dim/
      }, {
        begin: /&sql\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        subLanguage: "sql"
      }, {
        begin: /&(js|jscript|javascript)</,
        end: />/,
        excludeBegin: !0,
        excludeEnd: !0,
        subLanguage: "javascript"
      }, {
        begin: /&html<\s*</,
        end: />\s*>/,
        subLanguage: "xml"
      }]
    }
  }
  sPA.exports = Al9
})
// @from(Start 1446724, End 1453798)
tPA = z((bt5, oPA) => {
  function Bl9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function Ql9(A) {
    return vT1("(?=", A, ")")
  }

  function H81(A) {
    return vT1("(", A, ")?")
  }

  function vT1(...A) {
    return A.map((Q) => Bl9(Q)).join("")
  }

  function Il9(A) {
    let B = A.COMMENT("//", "$", {
        contains: [{
          begin: /\\\n/
        }]
      }),
      Q = "decltype\\(auto\\)",
      I = "[a-zA-Z_]\\w*::",
      G = "<[^<>]+>",
      Z = "(decltype\\(auto\\)|" + H81("[a-zA-Z_]\\w*::") + "[a-zA-Z_]\\w*" + H81("<[^<>]+>") + ")",
      D = {
        className: "keyword",
        begin: "\\b[a-z\\d_]*_t\\b"
      },
      Y = "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)",
      W = {
        className: "string",
        variants: [{
          begin: '(u8?|U|L)?"',
          end: '"',
          illegal: "\\n",
          contains: [A.BACKSLASH_ESCAPE]
        }, {
          begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
          end: "'",
          illegal: "."
        }, A.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
          end: /\)([^()\\ ]{0,16})"/
        })]
      },
      J = {
        className: "number",
        variants: [{
          begin: "\\b(0b[01']+)"
        }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }],
        relevance: 0
      },
      F = {
        className: "meta",
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: {
          "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
        },
        contains: [{
          begin: /\\\n/,
          relevance: 0
        }, A.inherit(W, {
          className: "meta-string"
        }), {
          className: "meta-string",
          begin: /<.*?>/
        }, B, A.C_BLOCK_COMMENT_MODE]
      },
      X = {
        className: "title",
        begin: H81("[a-zA-Z_]\\w*::") + A.IDENT_RE,
        relevance: 0
      },
      V = H81("[a-zA-Z_]\\w*::") + A.IDENT_RE + "\\s*\\(",
      K = {
        keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
        built_in: "_Bool _Complex _Imaginary",
        _relevance_hints: ["asin", "atan2", "atan", "calloc", "ceil", "cosh", "cos", "exit", "exp", "fabs", "floor", "fmod", "fprintf", "fputs", "free", "frexp", "auto_ptr", "deque", "list", "queue", "stack", "vector", "map", "set", "pair", "bitset", "multiset", "multimap", "unordered_set", "fscanf", "future", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "tolower", "toupper", "labs", "ldexp", "log10", "log", "malloc", "realloc", "memchr", "memcmp", "memcpy", "memset", "modf", "pow", "printf", "putchar", "puts", "scanf", "sinh", "sin", "snprintf", "sprintf", "sqrt", "sscanf", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "tanh", "tan", "unordered_map", "unordered_multiset", "unordered_multimap", "priority_queue", "make_pair", "array", "shared_ptr", "abort", "terminate", "abs", "acos", "vfprintf", "vprintf", "vsprintf", "endl", "initializer_list", "unique_ptr", "complex", "imaginary", "std", "string", "wstring", "cin", "cout", "cerr", "clog", "stdin", "stdout", "stderr", "stringstream", "istringstream", "ostringstream"],
        literal: "true false nullptr NULL"
      },
      E = {
        className: "function.dispatch",
        relevance: 0,
        keywords: K,
        begin: vT1(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!while)/, A.IDENT_RE, Ql9(/\s*\(/))
      },
      N = [E, F, D, B, A.C_BLOCK_COMMENT_MODE, J, W],
      q = {
        variants: [{
          begin: /=/,
          end: /;/
        }, {
          begin: /\(/,
          end: /\)/
        }, {
          beginKeywords: "new throw return else",
          end: /;/
        }],
        keywords: K,
        contains: N.concat([{
          begin: /\(/,
          end: /\)/,
          keywords: K,
          contains: N.concat(["self"]),
          relevance: 0
        }]),
        relevance: 0
      },
      O = {
        className: "function",
        begin: "(" + Z + "[\\*&\\s]+)+" + V,
        returnBegin: !0,
        end: /[{;=]/,
        excludeEnd: !0,
        keywords: K,
        illegal: /[^\w\s\*&:<>.]/,
        contains: [{
          begin: "decltype\\(auto\\)",
          keywords: K,
          relevance: 0
        }, {
          begin: V,
          returnBegin: !0,
          contains: [X],
          relevance: 0
        }, {
          begin: /::/,
          relevance: 0
        }, {
          begin: /:/,
          endsWithParent: !0,
          contains: [W, J]
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: K,
          relevance: 0,
          contains: [B, A.C_BLOCK_COMMENT_MODE, W, J, D, {
            begin: /\(/,
            end: /\)/,
            keywords: K,
            relevance: 0,
            contains: ["self", B, A.C_BLOCK_COMMENT_MODE, W, J, D]
          }]
        }, D, B, A.C_BLOCK_COMMENT_MODE, F]
      };
    return {
      name: "C++",
      aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
      keywords: K,
      illegal: "</",
      classNameAliases: {
        "function.dispatch": "built_in"
      },
      contains: [].concat(q, O, E, N, [F, {
        begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
        end: ">",
        keywords: K,
        contains: ["self", D]
      }, {
        begin: A.IDENT_RE + "::",
        keywords: K
      }, {
        className: "class",
        beginKeywords: "enum class struct union",
        end: /[{;:<>=]/,
        contains: [{
          beginKeywords: "final class struct"
        }, A.TITLE_MODE]
      }]),
      exports: {
        preprocessor: F,
        strings: W,
        keywords: K
      }
    }
  }
  oPA.exports = Il9
})
// @from(Start 1453804, End 1456066)
ASA = z((gt5, ePA) => {
  function Gl9(A) {
    let Q = "group clone ms master location colocation order fencing_topology rsc_ticket acl_target acl_group user role tag xml",
      I = "property rsc_defaults op_defaults",
      G = "params meta operations op rule attributes utilization",
      Z = "read write deny defined not_defined in_range date spec in ref reference attribute type xpath version and or lt gt tag lte gte eq ne \\",
      D = "number string",
      Y = "Master Started Slave Stopped start promote demote stop monitor true false";
    return {
      name: "crmsh",
      aliases: ["crm", "pcmk"],
      case_insensitive: !0,
      keywords: {
        keyword: "params meta operations op rule attributes utilization " + Z + " number string",
        literal: "Master Started Slave Stopped start promote demote stop monitor true false"
      },
      contains: [A.HASH_COMMENT_MODE, {
        beginKeywords: "node",
        starts: {
          end: "\\s*([\\w_-]+:)?",
          starts: {
            className: "title",
            end: "\\s*[\\$\\w_][\\w_-]*"
          }
        }
      }, {
        beginKeywords: "primitive rsc_template",
        starts: {
          className: "title",
          end: "\\s*[\\$\\w_][\\w_-]*",
          starts: {
            end: "\\s*@?[\\w_][\\w_\\.:-]*"
          }
        }
      }, {
        begin: "\\b(" + Q.split(" ").join("|") + ")\\s+",
        keywords: Q,
        starts: {
          className: "title",
          end: "[\\$\\w_][\\w_-]*"
        }
      }, {
        beginKeywords: "property rsc_defaults op_defaults",
        starts: {
          className: "title",
          end: "\\s*([\\w_-]+:)?"
        }
      }, A.QUOTE_STRING_MODE, {
        className: "meta",
        begin: "(ocf|systemd|service|lsb):[\\w_:-]+",
        relevance: 0
      }, {
        className: "number",
        begin: "\\b\\d+(\\.\\d+)?(ms|s|h|m)?",
        relevance: 0
      }, {
        className: "literal",
        begin: "[-]?(infinity|inf)",
        relevance: 0
      }, {
        className: "attr",
        begin: /([A-Za-z$_#][\w_-]+)=/,
        relevance: 0
      }, {
        className: "tag",
        begin: "</?",
        end: "/?>",
        relevance: 0
      }]
    }
  }
  ePA.exports = Gl9
})
// @from(Start 1456072, End 1462246)
QSA = z((ht5, BSA) => {
  function Zl9(A) {
    let D = {
        $pattern: "[a-zA-Z_]\\w*[!?=]?",
        keyword: "abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__",
        literal: "false nil true"
      },
      Y = {
        className: "subst",
        begin: /#\{/,
        end: /\}/,
        keywords: D
      },
      W = {
        className: "template-variable",
        variants: [{
          begin: "\\{\\{",
          end: "\\}\\}"
        }, {
          begin: "\\{%",
          end: "%\\}"
        }],
        keywords: D
      };

    function J(N, q) {
      let O = [{
        begin: N,
        end: q
      }];
      return O[0].contains = O, O
    }
    let F = {
        className: "string",
        contains: [A.BACKSLASH_ESCAPE, Y],
        variants: [{
          begin: /'/,
          end: /'/
        }, {
          begin: /"/,
          end: /"/
        }, {
          begin: /`/,
          end: /`/
        }, {
          begin: "%[Qwi]?\\(",
          end: "\\)",
          contains: J("\\(", "\\)")
        }, {
          begin: "%[Qwi]?\\[",
          end: "\\]",
          contains: J("\\[", "\\]")
        }, {
          begin: "%[Qwi]?\\{",
          end: /\}/,
          contains: J(/\{/, /\}/)
        }, {
          begin: "%[Qwi]?<",
          end: ">",
          contains: J("<", ">")
        }, {
          begin: "%[Qwi]?\\|",
          end: "\\|"
        }, {
          begin: /<<-\w+$/,
          end: /^\s*\w+$/
        }],
        relevance: 0
      },
      X = {
        className: "string",
        variants: [{
          begin: "%q\\(",
          end: "\\)",
          contains: J("\\(", "\\)")
        }, {
          begin: "%q\\[",
          end: "\\]",
          contains: J("\\[", "\\]")
        }, {
          begin: "%q\\{",
          end: /\}/,
          contains: J(/\{/, /\}/)
        }, {
          begin: "%q<",
          end: ">",
          contains: J("<", ">")
        }, {
          begin: "%q\\|",
          end: "\\|"
        }, {
          begin: /<<-'\w+'$/,
          end: /^\s*\w+$/
        }],
        relevance: 0
      },
      V = {
        begin: "(?!%\\})(" + A.RE_STARTERS_RE + "|\\n|\\b(case|if|select|unless|until|when|while)\\b)\\s*",
        keywords: "case if select unless until when while",
        contains: [{
          className: "regexp",
          contains: [A.BACKSLASH_ESCAPE, Y],
          variants: [{
            begin: "//[a-z]*",
            relevance: 0
          }, {
            begin: "/(?!\\/)",
            end: "/[a-z]*"
          }]
        }],
        relevance: 0
      },
      C = {
        className: "regexp",
        contains: [A.BACKSLASH_ESCAPE, Y],
        variants: [{
          begin: "%r\\(",
          end: "\\)",
          contains: J("\\(", "\\)")
        }, {
          begin: "%r\\[",
          end: "\\]",
          contains: J("\\[", "\\]")
        }, {
          begin: "%r\\{",
          end: /\}/,
          contains: J(/\{/, /\}/)
        }, {
          begin: "%r<",
          end: ">",
          contains: J("<", ">")
        }, {
          begin: "%r\\|",
          end: "\\|"
        }],
        relevance: 0
      },
      K = {
        className: "meta",
        begin: "@\\[",
        end: "\\]",
        contains: [A.inherit(A.QUOTE_STRING_MODE, {
          className: "meta-string"
        })]
      },
      E = [W, F, X, C, V, K, A.HASH_COMMENT_MODE, {
        className: "class",
        beginKeywords: "class module struct",
        end: "$|;",
        illegal: /=/,
        contains: [A.HASH_COMMENT_MODE, A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
        }), {
          begin: "<"
        }]
      }, {
        className: "class",
        beginKeywords: "lib enum union",
        end: "$|;",
        illegal: /=/,
        contains: [A.HASH_COMMENT_MODE, A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
        })]
      }, {
        beginKeywords: "annotation",
        end: "$|;",
        illegal: /=/,
        contains: [A.HASH_COMMENT_MODE, A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
        })],
        relevance: 2
      }, {
        className: "function",
        beginKeywords: "def",
        end: /\B\b/,
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",
          endsParent: !0
        })]
      }, {
        className: "function",
        beginKeywords: "fun macro",
        end: /\B\b/,
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",
          endsParent: !0
        })],
        relevance: 2
      }, {
        className: "symbol",
        begin: A.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
        relevance: 0
      }, {
        className: "symbol",
        begin: ":",
        contains: [F, {
          begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?"
        }],
        relevance: 0
      }, {
        className: "number",
        variants: [{
          begin: "\\b0b([01_]+)(_?[ui](8|16|32|64|128))?"
        }, {
          begin: "\\b0o([0-7_]+)(_?[ui](8|16|32|64|128))?"
        }, {
          begin: "\\b0x([A-Fa-f0-9_]+)(_?[ui](8|16|32|64|128))?"
        }, {
          begin: "\\b([1-9][0-9_]*[0-9]|[0-9])(\\.[0-9][0-9_]*)?([eE]_?[-+]?[0-9_]*)?(_?f(32|64))?(?!_)"
        }, {
          begin: "\\b([1-9][0-9_]*|0)(_?[ui](8|16|32|64|128))?"
        }],
        relevance: 0
      }];
    return Y.contains = E, W.contains = E.slice(1), {
      name: "Crystal",
      aliases: ["cr"],
      keywords: D,
      contains: E
    }
  }
  BSA.exports = Zl9
})
// @from(Start 1462252, End 1468145)
GSA = z((mt5, ISA) => {
  function Dl9(A) {
    let B = ["bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float", "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong", "uint", "ushort"],
      Q = ["public", "private", "protected", "static", "internal", "protected", "abstract", "async", "extern", "override", "unsafe", "virtual", "new", "sealed", "partial"],
      I = ["default", "false", "null", "true"],
      G = ["abstract", "as", "base", "break", "case", "class", "const", "continue", "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach", "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace", "new", "operator", "out", "override", "params", "private", "protected", "public", "readonly", "record", "ref", "return", "sealed", "sizeof", "stackalloc", "static", "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe", "using", "virtual", "void", "volatile", "while"],
      Z = ["add", "alias", "and", "ascending", "async", "await", "by", "descending", "equals", "from", "get", "global", "group", "init", "into", "join", "let", "nameof", "not", "notnull", "on", "or", "orderby", "partial", "remove", "select", "set", "unmanaged", "value|0", "var", "when", "where", "with", "yield"],
      D = {
        keyword: G.concat(Z),
        built_in: B,
        literal: I
      },
      Y = A.inherit(A.TITLE_MODE, {
        begin: "[a-zA-Z](\\.?\\w)*"
      }),
      W = {
        className: "number",
        variants: [{
          begin: "\\b(0b[01']+)"
        }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }],
        relevance: 0
      },
      J = {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [{
          begin: '""'
        }]
      },
      F = A.inherit(J, {
        illegal: /\n/
      }),
      X = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: D
      },
      V = A.inherit(X, {
        illegal: /\n/
      }),
      C = {
        className: "string",
        begin: /\$"/,
        end: '"',
        illegal: /\n/,
        contains: [{
          begin: /\{\{/
        }, {
          begin: /\}\}/
        }, A.BACKSLASH_ESCAPE, V]
      },
      K = {
        className: "string",
        begin: /\$@"/,
        end: '"',
        contains: [{
          begin: /\{\{/
        }, {
          begin: /\}\}/
        }, {
          begin: '""'
        }, X]
      },
      E = A.inherit(K, {
        illegal: /\n/,
        contains: [{
          begin: /\{\{/
        }, {
          begin: /\}\}/
        }, {
          begin: '""'
        }, V]
      });
    X.contains = [K, C, J, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, W, A.C_BLOCK_COMMENT_MODE], V.contains = [E, C, F, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, W, A.inherit(A.C_BLOCK_COMMENT_MODE, {
      illegal: /\n/
    })];
    let N = {
        variants: [K, C, J, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
      },
      q = {
        begin: "<",
        end: ">",
        contains: [{
          beginKeywords: "in out"
        }, Y]
      },
      O = A.IDENT_RE + "(<" + A.IDENT_RE + "(\\s*,\\s*" + A.IDENT_RE + ")*>)?(\\[\\])?",
      R = {
        begin: "@" + A.IDENT_RE,
        relevance: 0
      };
    return {
      name: "C#",
      aliases: ["cs", "c#"],
      keywords: D,
      illegal: /::/,
      contains: [A.COMMENT("///", "$", {
        returnBegin: !0,
        contains: [{
          className: "doctag",
          variants: [{
            begin: "///",
            relevance: 0
          }, {
            begin: "<!--|-->"
          }, {
            begin: "</?",
            end: ">"
          }]
        }]
      }), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: {
          "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
        }
      }, N, W, {
        beginKeywords: "class interface",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [{
          beginKeywords: "where class"
        }, Y, q, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
      }, {
        beginKeywords: "namespace",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [Y, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
      }, {
        beginKeywords: "record",
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [Y, q, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
      }, {
        className: "meta",
        begin: "^\\s*\\[",
        excludeBegin: !0,
        end: "\\]",
        excludeEnd: !0,
        contains: [{
          className: "meta-string",
          begin: /"/,
          end: /"/
        }]
      }, {
        beginKeywords: "new return throw await else",
        relevance: 0
      }, {
        className: "function",
        begin: "(" + O + "\\s+)+" + A.IDENT_RE + "\\s*(<.+>\\s*)?\\(",
        returnBegin: !0,
        end: /\s*[{;=]/,
        excludeEnd: !0,
        keywords: D,
        contains: [{
          beginKeywords: Q.join(" "),
          relevance: 0
        }, {
          begin: A.IDENT_RE + "\\s*(<.+>\\s*)?\\(",
          returnBegin: !0,
          contains: [A.TITLE_MODE, q],
          relevance: 0
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          excludeBegin: !0,
          excludeEnd: !0,
          keywords: D,
          relevance: 0,
          contains: [N, W, A.C_BLOCK_COMMENT_MODE]
        }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
      }, R]
    }
  }
  ISA.exports = Dl9
})
// @from(Start 1468151, End 1468754)
DSA = z((dt5, ZSA) => {
  function Yl9(A) {
    return {
      name: "CSP",
      case_insensitive: !1,
      keywords: {
        $pattern: "[a-zA-Z][a-zA-Z0-9_-]*",
        keyword: "base-uri child-src connect-src default-src font-src form-action frame-ancestors frame-src img-src media-src object-src plugin-types report-uri sandbox script-src style-src"
      },
      contains: [{
        className: "string",
        begin: "'",
        end: "'"
      }, {
        className: "attribute",
        begin: "^Content",
        end: ":",
        excludeEnd: !0
      }]
    }
  }
  ZSA.exports = Yl9
})
// @from(Start 1468760, End 1477256)
WSA = z((ut5, YSA) => {
  var Wl9 = (A) => {
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
    Jl9 = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"],
    Fl9 = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"],
    Xl9 = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"],
    Vl9 = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"],
    Cl9 = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-variation-settings", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "src", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"].reverse();

  function Kl9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function Hl9(A) {
    return zl9("(?=", A, ")")
  }

  function zl9(...A) {
    return A.map((Q) => Kl9(Q)).join("")
  }

  function wl9(A) {
    let B = Wl9(A),
      Q = {
        className: "built_in",
        begin: /[\w-]+(?=\()/
      },
      I = {
        begin: /-(webkit|moz|ms|o)-(?=[a-z])/
      },
      G = "and or not only",
      Z = /@-?\w[\w]*(-\w+)*/,
      D = "[a-zA-Z-][a-zA-Z0-9_-]*",
      Y = [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE];
    return {
      name: "CSS",
      case_insensitive: !0,
      illegal: /[=|'\$]/,
      keywords: {
        keyframePosition: "from to"
      },
      classNameAliases: {
        keyframePosition: "selector-tag"
      },
      contains: [A.C_BLOCK_COMMENT_MODE, I, A.CSS_NUMBER_MODE, {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      }, {
        className: "selector-class",
        begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
        relevance: 0
      }, B.ATTRIBUTE_SELECTOR_MODE, {
        className: "selector-pseudo",
        variants: [{
          begin: ":(" + Xl9.join("|") + ")"
        }, {
          begin: "::(" + Vl9.join("|") + ")"
        }]
      }, {
        className: "attribute",
        begin: "\\b(" + Cl9.join("|") + ")\\b"
      }, {
        begin: ":",
        end: "[;}]",
        contains: [B.HEXCOLOR, B.IMPORTANT, A.CSS_NUMBER_MODE, ...Y, {
          begin: /(url|data-uri)\(/,
          end: /\)/,
          relevance: 0,
          keywords: {
            built_in: "url data-uri"
          },
          contains: [{
            className: "string",
            begin: /[^)]/,
            endsWithParent: !0,
            excludeEnd: !0
          }]
        }, Q]
      }, {
        begin: Hl9(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        contains: [{
          className: "keyword",
          begin: Z
        }, {
          begin: /\s/,
          endsWithParent: !0,
          excludeEnd: !0,
          relevance: 0,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: "and or not only",
            attribute: Fl9.join(" ")
          },
          contains: [{
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          }, ...Y, A.CSS_NUMBER_MODE]
        }]
      }, {
        className: "selector-tag",
        begin: "\\b(" + Jl9.join("|") + ")\\b"
      }]
    }
  }
  YSA.exports = wl9
})
// @from(Start 1477262, End 1480716)
FSA = z((pt5, JSA) => {
  function El9(A) {
    let B = {
        $pattern: A.UNDERSCORE_IDENT_RE,
        keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
        built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
        literal: "false null true"
      },
      Q = "(0|[1-9][\\d_]*)",
      I = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)",
      G = "0[bB][01_]+",
      Z = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)",
      D = "0[xX]([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)",
      Y = "([eE][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))",
      W = "((0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)(\\.\\d*|" + Y + ")|\\d+\\.(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)|\\.(0|[1-9][\\d_]*)" + Y + "?)",
      J = "(0[xX](([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)\\.([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)|\\.?([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*))[pP][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))",
      F = "((0|[1-9][\\d_]*)|0[bB][01_]+|" + D + ")",
      X = "(" + J + "|" + W + ")",
      V = `\\\\(['"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};`,
      C = {
        className: "number",
        begin: "\\b" + F + "(L|u|U|Lu|LU|uL|UL)?",
        relevance: 0
      },
      K = {
        className: "number",
        begin: "\\b(" + X + "([fF]|L|i|[fF]i|Li)?|" + F + "(i|[fF]i|Li))",
        relevance: 0
      },
      E = {
        className: "string",
        begin: "'(" + V + "|.)",
        end: "'",
        illegal: "."
      },
      q = {
        className: "string",
        begin: '"',
        contains: [{
          begin: V,
          relevance: 0
        }],
        end: '"[cwd]?'
      },
      O = {
        className: "string",
        begin: '[rq]"',
        end: '"[cwd]?',
        relevance: 5
      },
      R = {
        className: "string",
        begin: "`",
        end: "`[cwd]?"
      },
      T = {
        className: "string",
        begin: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
        relevance: 10
      },
      L = {
        className: "string",
        begin: 'q"\\{',
        end: '\\}"'
      },
      _ = {
        className: "meta",
        begin: "^#!",
        end: "$",
        relevance: 5
      },
      k = {
        className: "meta",
        begin: "#(line)",
        end: "$",
        relevance: 5
      },
      i = {
        className: "keyword",
        begin: "@[a-zA-Z_][a-zA-Z_\\d]*"
      },
      x = A.COMMENT("\\/\\+", "\\+\\/", {
        contains: ["self"],
        relevance: 10
      });
    return {
      name: "D",
      keywords: B,
      contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, x, T, q, O, R, L, K, C, E, _, k, i]
    }
  }
  JSA.exports = El9
})
// @from(Start 1480722, End 1484402)
VSA = z((ct5, XSA) => {
  function Ul9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function Nl9(...A) {
    return A.map((Q) => Ul9(Q)).join("")
  }

  function $l9(A) {
    let B = {
        begin: /<\/?[A-Za-z_]/,
        end: ">",
        subLanguage: "xml",
        relevance: 0
      },
      Q = {
        begin: "^[-\\*]{3,}",
        end: "$"
      },
      I = {
        className: "code",
        variants: [{
          begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
        }, {
          begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
        }, {
          begin: "```",
          end: "```+[ ]*$"
        }, {
          begin: "~~~",
          end: "~~~+[ ]*$"
        }, {
          begin: "`.+?`"
        }, {
          begin: "(?=^( {4}|\\t))",
          contains: [{
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }],
          relevance: 0
        }]
      },
      G = {
        className: "bullet",
        begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
        end: "\\s+",
        excludeEnd: !0
      },
      Z = {
        begin: /^\[[^\n]+\]:/,
        returnBegin: !0,
        contains: [{
          className: "symbol",
          begin: /\[/,
          end: /\]/,
          excludeBegin: !0,
          excludeEnd: !0
        }, {
          className: "link",
          begin: /:\s*/,
          end: /$/,
          excludeBegin: !0
        }]
      },
      Y = {
        variants: [{
          begin: /\[.+?\]\[.*?\]/,
          relevance: 0
        }, {
          begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
          relevance: 2
        }, {
          begin: Nl9(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
          relevance: 2
        }, {
          begin: /\[.+?\]\([./?&#].*?\)/,
          relevance: 1
        }, {
          begin: /\[.+?\]\(.*?\)/,
          relevance: 0
        }],
        returnBegin: !0,
        contains: [{
          className: "string",
          relevance: 0,
          begin: "\\[",
          end: "\\]",
          excludeBegin: !0,
          returnEnd: !0
        }, {
          className: "link",
          relevance: 0,
          begin: "\\]\\(",
          end: "\\)",
          excludeBegin: !0,
          excludeEnd: !0
        }, {
          className: "symbol",
          relevance: 0,
          begin: "\\]\\[",
          end: "\\]",
          excludeBegin: !0,
          excludeEnd: !0
        }]
      },
      W = {
        className: "strong",
        contains: [],
        variants: [{
          begin: /_{2}/,
          end: /_{2}/
        }, {
          begin: /\*{2}/,
          end: /\*{2}/
        }]
      },
      J = {
        className: "emphasis",
        contains: [],
        variants: [{
          begin: /\*(?!\*)/,
          end: /\*/
        }, {
          begin: /_(?!_)/,
          end: /_/,
          relevance: 0
        }]
      };
    W.contains.push(J), J.contains.push(W);
    let F = [B, Y];
    return W.contains = W.contains.concat(F), J.contains = J.contains.concat(F), F = F.concat(W, J), {
      name: "Markdown",
      aliases: ["md", "mkdown", "mkd"],
      contains: [{
        className: "section",
        variants: [{
          begin: "^#{1,6}",
          end: "$",
          contains: F
        }, {
          begin: "(?=^.+?\\n[=-]{2,}$)",
          contains: [{
            begin: "^[=-]*$"
          }, {
            begin: "^",
            end: "\\n",
            contains: F
          }]
        }]
      }, B, G, W, J, {
        className: "quote",
        begin: "^>\\s+",
        contains: F,
        end: "$"
      }, I, Q, Y, Z]
    }
  }
  XSA.exports = $l9
})
// @from(Start 1484408, End 1487294)
KSA = z((lt5, CSA) => {
  function ql9(A) {
    let B = {
        className: "subst",
        variants: [{
          begin: "\\$[A-Za-z0-9_]+"
        }]
      },
      Q = {
        className: "subst",
        variants: [{
          begin: /\$\{/,
          end: /\}/
        }],
        keywords: "true false null this is new super"
      },
      I = {
        className: "string",
        variants: [{
          begin: "r'''",
          end: "'''"
        }, {
          begin: 'r"""',
          end: '"""'
        }, {
          begin: "r'",
          end: "'",
          illegal: "\\n"
        }, {
          begin: 'r"',
          end: '"',
          illegal: "\\n"
        }, {
          begin: "'''",
          end: "'''",
          contains: [A.BACKSLASH_ESCAPE, B, Q]
        }, {
          begin: '"""',
          end: '"""',
          contains: [A.BACKSLASH_ESCAPE, B, Q]
        }, {
          begin: "'",
          end: "'",
          illegal: "\\n",
          contains: [A.BACKSLASH_ESCAPE, B, Q]
        }, {
          begin: '"',
          end: '"',
          illegal: "\\n",
          contains: [A.BACKSLASH_ESCAPE, B, Q]
        }]
      };
    Q.contains = [A.C_NUMBER_MODE, I];
    let G = ["Comparable", "DateTime", "Duration", "Function", "Iterable", "Iterator", "List", "Map", "Match", "Object", "Pattern", "RegExp", "Set", "Stopwatch", "String", "StringBuffer", "StringSink", "Symbol", "Type", "Uri", "bool", "double", "int", "num", "Element", "ElementList"],
      Z = G.map((Y) => `${Y}?`);
    return {
      name: "Dart",
      keywords: {
        keyword: "abstract as assert async await break case catch class const continue covariant default deferred do dynamic else enum export extends extension external factory false final finally for Function get hide if implements import in inferface is late library mixin new null on operator part required rethrow return set show static super switch sync this throw true try typedef var void while with yield",
        built_in: G.concat(Z).concat(["Never", "Null", "dynamic", "print", "document", "querySelector", "querySelectorAll", "window"]),
        $pattern: /[A-Za-z][A-Za-z0-9_]*\??/
      },
      contains: [I, A.COMMENT(/\/\*\*(?!\/)/, /\*\//, {
        subLanguage: "markdown",
        relevance: 0
      }), A.COMMENT(/\/{3,} ?/, /$/, {
        contains: [{
          subLanguage: "markdown",
          begin: ".",
          end: "$",
          relevance: 0
        }]
      }), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/,
        excludeEnd: !0,
        contains: [{
          beginKeywords: "extends implements"
        }, A.UNDERSCORE_TITLE_MODE]
      }, A.C_NUMBER_MODE, {
        className: "meta",
        begin: "@[A-Za-z]+"
      }, {
        begin: "=>"
      }]
    }
  }
  CSA.exports = ql9
})
// @from(Start 1487300, End 1489914)
zSA = z((it5, HSA) => {
  function Ml9(A) {
    let B = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure absolute reintroduce operator as is abstract alias assembler bitpacked break continue cppdecl cvar enumerator experimental platform deprecated unimplemented dynamic export far16 forward generic helper implements interrupt iochecks local name nodefault noreturn nostackframe oldfpccall otherwise saveregisters softfloat specialize strict unaligned varargs ",
      Q = [A.C_LINE_COMMENT_MODE, A.COMMENT(/\{/, /\}/, {
        relevance: 0
      }), A.COMMENT(/\(\*/, /\*\)/, {
        relevance: 10
      })],
      I = {
        className: "meta",
        variants: [{
          begin: /\{\$/,
          end: /\}/
        }, {
          begin: /\(\*\$/,
          end: /\*\)/
        }]
      },
      G = {
        className: "string",
        begin: /'/,
        end: /'/,
        contains: [{
          begin: /''/
        }]
      },
      Z = {
        className: "number",
        relevance: 0,
        variants: [{
          begin: "\\$[0-9A-Fa-f]+"
        }, {
          begin: "&[0-7]+"
        }, {
          begin: "%[01]+"
        }]
      },
      D = {
        className: "string",
        begin: /(#\d+)+/
      },
      Y = {
        begin: A.IDENT_RE + "\\s*=\\s*class\\s*\\(",
        returnBegin: !0,
        contains: [A.TITLE_MODE]
      },
      W = {
        className: "function",
        beginKeywords: "function constructor destructor procedure",
        end: /[:;]/,
        keywords: "function constructor|10 destructor|10 procedure|10",
        contains: [A.TITLE_MODE, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: B,
          contains: [G, D, I].concat(Q)
        }, I].concat(Q)
      };
    return {
      name: "Delphi",
      aliases: ["dpr", "dfm", "pas", "pascal", "freepascal", "lazarus", "lpr", "lfm"],
      case_insensitive: !0,
      keywords: B,
      illegal: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
      contains: [G, D, A.NUMBER_MODE, Z, Y, W, I].concat(Q)
    }
  }
  HSA.exports = Ml9
})
// @from(Start 1489920, End 1491086)
ESA = z((nt5, wSA) => {
  function Ll9(A) {
    return {
      name: "Diff",
      aliases: ["patch"],
      contains: [{
        className: "meta",
        relevance: 10,
        variants: [{
          begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
        }, {
          begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
        }, {
          begin: /^--- +\d+,\d+ +----$/
        }]
      }, {
        className: "comment",
        variants: [{
          begin: /Index: /,
          end: /$/
        }, {
          begin: /^index/,
          end: /$/
        }, {
          begin: /={3,}/,
          end: /$/
        }, {
          begin: /^-{3}/,
          end: /$/
        }, {
          begin: /^\*{3} /,
          end: /$/
        }, {
          begin: /^\+{3}/,
          end: /$/
        }, {
          begin: /^\*{15}$/
        }, {
          begin: /^diff --git/,
          end: /$/
        }]
      }, {
        className: "addition",
        begin: /^\+/,
        end: /$/
      }, {
        className: "deletion",
        begin: /^-/,
        end: /$/
      }, {
        className: "addition",
        begin: /^!/,
        end: /$/
      }]
    }
  }
  wSA.exports = Ll9
})
// @from(Start 1491092, End 1493223)
NSA = z((at5, USA) => {
  function Rl9(A) {
    let B = {
      begin: /\|[A-Za-z]+:?/,
      keywords: {
        name: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone"
      },
      contains: [A.QUOTE_STRING_MODE, A.APOS_STRING_MODE]
    };
    return {
      name: "Django",
      aliases: ["jinja"],
      case_insensitive: !0,
      subLanguage: "xml",
      contains: [A.COMMENT(/\{%\s*comment\s*%\}/, /\{%\s*endcomment\s*%\}/), A.COMMENT(/\{#/, /#\}/), {
        className: "template-tag",
        begin: /\{%/,
        end: /%\}/,
        contains: [{
          className: "name",
          begin: /\w+/,
          keywords: {
            name: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim"
          },
          starts: {
            endsWithParent: !0,
            keywords: "in by as",
            contains: [B],
            relevance: 0
          }
        }]
      }, {
        className: "template-variable",
        begin: /\{\{/,
        end: /\}\}/,
        contains: [B]
      }]
    }
  }
  USA.exports = Rl9
})
// @from(Start 1493229, End 1495170)
qSA = z((st5, $SA) => {
  function Ol9(A) {
    return {
      name: "DNS Zone",
      aliases: ["bind", "zone"],
      keywords: {
        keyword: "IN A AAAA AFSDB APL CAA CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX LOC MX NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT"
      },
      contains: [A.COMMENT(";", "$", {
        relevance: 0
      }), {
        className: "meta",
        begin: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
      }, {
        className: "number",
        begin: "((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))\\b"
      }, {
        className: "number",
        begin: "((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\b"
      }, A.inherit(A.NUMBER_MODE, {
        begin: /\b\d+[dhwm]?/
      })]
    }
  }
  $SA.exports = Ol9
})
// @from(Start 1495176, End 1495722)
LSA = z((rt5, MSA) => {
  function Tl9(A) {
    return {
      name: "Dockerfile",
      aliases: ["docker"],
      case_insensitive: !0,
      keywords: "from maintainer expose env arg user onbuild stopsignal",
      contains: [A.HASH_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.NUMBER_MODE, {
        beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
        starts: {
          end: /[^\\]$/,
          subLanguage: "bash"
        }
      }],
      illegal: "</"
    }
  }
  MSA.exports = Tl9
})
// @from(Start 1495728, End 1497197)
OSA = z((ot5, RSA) => {
  function Pl9(A) {
    let B = A.COMMENT(/^\s*@?rem\b/, /$/, {
      relevance: 10
    });
    return {
      name: "Batch file (DOS)",
      aliases: ["bat", "cmd"],
      case_insensitive: !0,
      illegal: /\/\*/,
      keywords: {
        keyword: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
        built_in: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux shift cd dir echo setlocal endlocal set pause copy append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt rd recover rem rename replace restore rmdir shift sort start subst time title tree type ver verify vol ping net ipconfig taskkill xcopy ren del"
      },
      contains: [{
        className: "variable",
        begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
      }, {
        className: "function",
        begin: {
          className: "symbol",
          begin: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)",
          relevance: 0
        }.begin,
        end: "goto:eof",
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
        }), B]
      }, {
        className: "number",
        begin: "\\b\\d+",
        relevance: 0
      }, B]
    }
  }
  RSA.exports = Pl9
})
// @from(Start 1497203, End 1498172)
PSA = z((tt5, TSA) => {
  function Sl9(A) {
    return {
      keywords: "dsconfig",
      contains: [{
        className: "keyword",
        begin: "^dsconfig",
        end: /\s/,
        excludeEnd: !0,
        relevance: 10
      }, {
        className: "built_in",
        begin: /(list|create|get|set|delete)-(\w+)/,
        end: /\s/,
        excludeEnd: !0,
        illegal: "!@#$%^&*()",
        relevance: 10
      }, {
        className: "built_in",
        begin: /--(\w+)/,
        end: /\s/,
        excludeEnd: !0
      }, {
        className: "string",
        begin: /"/,
        end: /"/
      }, {
        className: "string",
        begin: /'/,
        end: /'/
      }, {
        className: "string",
        begin: /[\w\-?]+:\w+/,
        end: /\W/,
        relevance: 0
      }, {
        className: "string",
        begin: /\w+(\-\w+)*/,
        end: /(?=\W)/,
        relevance: 0
      }, A.HASH_COMMENT_MODE]
    }
  }
  TSA.exports = Sl9
})
// @from(Start 1498178, End 1500437)
_SA = z((et5, SSA) => {
  function _l9(A) {
    let B = {
        className: "string",
        variants: [A.inherit(A.QUOTE_STRING_MODE, {
          begin: '((u8?|U)|L)?"'
        }), {
          begin: '(u8?|U)?R"',
          end: '"',
          contains: [A.BACKSLASH_ESCAPE]
        }, {
          begin: "'\\\\?.",
          end: "'",
          illegal: "."
        }]
      },
      Q = {
        className: "number",
        variants: [{
          begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, {
          begin: A.C_NUMBER_RE
        }],
        relevance: 0
      },
      I = {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: {
          "meta-keyword": "if else elif endif define undef ifdef ifndef"
        },
        contains: [{
          begin: /\\\n/,
          relevance: 0
        }, {
          beginKeywords: "include",
          end: "$",
          keywords: {
            "meta-keyword": "include"
          },
          contains: [A.inherit(B, {
            className: "meta-string"
          }), {
            className: "meta-string",
            begin: "<",
            end: ">",
            illegal: "\\n"
          }]
        }, B, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
      },
      G = {
        className: "variable",
        begin: /&[a-z\d_]*\b/
      },
      Z = {
        className: "meta-keyword",
        begin: "/[a-z][a-z\\d-]*/"
      },
      D = {
        className: "symbol",
        begin: "^\\s*[a-zA-Z_][a-zA-Z\\d_]*:"
      },
      Y = {
        className: "params",
        begin: "<",
        end: ">",
        contains: [Q, G]
      },
      W = {
        className: "class",
        begin: /[a-zA-Z_][a-zA-Z\d_@]*\s\{/,
        end: /[{;=]/,
        returnBegin: !0,
        excludeEnd: !0
      };
    return {
      name: "Device Tree",
      keywords: "",
      contains: [{
        className: "class",
        begin: "/\\s*\\{",
        end: /\};/,
        relevance: 10,
        contains: [G, Z, D, W, Y, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Q, B]
      }, G, Z, D, W, Y, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Q, B, I, {
        begin: A.IDENT_RE + "::",
        keywords: ""
      }]
    }
  }
  SSA.exports = _l9
})
// @from(Start 1500443, End 1501168)
ySA = z((Ae5, jSA) => {
  function jl9(A) {
    return {
      name: "Dust",
      aliases: ["dst"],
      case_insensitive: !0,
      subLanguage: "xml",
      contains: [{
        className: "template-tag",
        begin: /\{[#\/]/,
        end: /\}/,
        illegal: /;/,
        contains: [{
          className: "name",
          begin: /[a-zA-Z\.-]+/,
          starts: {
            endsWithParent: !0,
            relevance: 0,
            contains: [A.QUOTE_STRING_MODE]
          }
        }]
      }, {
        className: "template-variable",
        begin: /\{/,
        end: /\}/,
        illegal: /;/,
        keywords: "if eq ne lt lte gt gte select default math sep"
      }]
    }
  }
  jSA.exports = jl9
})
// @from(Start 1501174, End 1501812)
xSA = z((Be5, kSA) => {
  function yl9(A) {
    let B = A.COMMENT(/\(\*/, /\*\)/),
      Q = {
        className: "attribute",
        begin: /^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/
      },
      G = {
        begin: /=/,
        end: /[.;]/,
        contains: [B, {
          className: "meta",
          begin: /\?.*\?/
        }, {
          className: "string",
          variants: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
            begin: "`",
            end: "`"
          }]
        }]
      };
    return {
      name: "Extended Backus-Naur Form",
      illegal: /\S/,
      contains: [B, Q, G]
    }
  }
  kSA.exports = yl9
})
// @from(Start 1501818, End 1506048)
vSA = z((Qe5, fSA) => {
  function kl9(A) {
    let I = {
        $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
        keyword: "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote require import with|0"
      },
      G = {
        className: "subst",
        begin: /#\{/,
        end: /\}/,
        keywords: I
      },
      Z = {
        className: "number",
        begin: "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
        relevance: 0
      },
      D = `[/|([{<"']`,
      Y = {
        className: "string",
        begin: `~[a-z](?=[/|([{<"'])`,
        contains: [{
          endsParent: !0,
          contains: [{
            contains: [A.BACKSLASH_ESCAPE, G],
            variants: [{
              begin: /"/,
              end: /"/
            }, {
              begin: /'/,
              end: /'/
            }, {
              begin: /\//,
              end: /\//
            }, {
              begin: /\|/,
              end: /\|/
            }, {
              begin: /\(/,
              end: /\)/
            }, {
              begin: /\[/,
              end: /\]/
            }, {
              begin: /\{/,
              end: /\}/
            }, {
              begin: /</,
              end: />/
            }]
          }]
        }]
      },
      W = {
        className: "string",
        begin: `~[A-Z](?=[/|([{<"'])`,
        contains: [{
          begin: /"/,
          end: /"/
        }, {
          begin: /'/,
          end: /'/
        }, {
          begin: /\//,
          end: /\//
        }, {
          begin: /\|/,
          end: /\|/
        }, {
          begin: /\(/,
          end: /\)/
        }, {
          begin: /\[/,
          end: /\]/
        }, {
          begin: /\{/,
          end: /\}/
        }, {
          begin: /</,
          end: />/
        }]
      },
      J = {
        className: "string",
        contains: [A.BACKSLASH_ESCAPE, G],
        variants: [{
          begin: /"""/,
          end: /"""/
        }, {
          begin: /'''/,
          end: /'''/
        }, {
          begin: /~S"""/,
          end: /"""/,
          contains: []
        }, {
          begin: /~S"/,
          end: /"/,
          contains: []
        }, {
          begin: /~S'''/,
          end: /'''/,
          contains: []
        }, {
          begin: /~S'/,
          end: /'/,
          contains: []
        }, {
          begin: /'/,
          end: /'/
        }, {
          begin: /"/,
          end: /"/
        }]
      },
      F = {
        className: "function",
        beginKeywords: "def defp defmacro",
        end: /\B\b/,
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
          endsParent: !0
        })]
      },
      X = A.inherit(F, {
        className: "class",
        beginKeywords: "defimpl defmodule defprotocol defrecord",
        end: /\bdo\b|$|;/
      }),
      V = [J, W, Y, A.HASH_COMMENT_MODE, X, F, {
        begin: "::"
      }, {
        className: "symbol",
        begin: ":(?![\\s:])",
        contains: [J, {
          begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
        }],
        relevance: 0
      }, {
        className: "symbol",
        begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?:(?!:)",
        relevance: 0
      }, Z, {
        className: "variable",
        begin: "(\\$\\W)|((\\$|@@?)(\\w+))"
      }, {
        begin: "->"
      }, {
        begin: "(" + A.RE_STARTERS_RE + ")\\s*",
        contains: [A.HASH_COMMENT_MODE, {
          begin: /\/: (?=\d+\s*[,\]])/,
          relevance: 0,
          contains: [Z]
        }, {
          className: "regexp",
          illegal: "\\n",
          contains: [A.BACKSLASH_ESCAPE, G],
          variants: [{
            begin: "/",
            end: "/[a-z]*"
          }, {
            begin: "%r\\[",
            end: "\\][a-z]*"
          }]
        }],
        relevance: 0
      }];
    return G.contains = V, {
      name: "Elixir",
      keywords: I,
      contains: V
    }
  }
  fSA.exports = kl9
})
// @from(Start 1506054, End 1507825)
gSA = z((Ie5, bSA) => {
  function xl9(A) {
    let B = {
        variants: [A.COMMENT("--", "$"), A.COMMENT(/\{-/, /-\}/, {
          contains: ["self"]
        })]
      },
      Q = {
        className: "type",
        begin: "\\b[A-Z][\\w']*",
        relevance: 0
      },
      I = {
        begin: "\\(",
        end: "\\)",
        illegal: '"',
        contains: [{
          className: "type",
          begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
        }, B]
      },
      G = {
        begin: /\{/,
        end: /\}/,
        contains: I.contains
      },
      Z = {
        className: "string",
        begin: "'\\\\?.",
        end: "'",
        illegal: "."
      };
    return {
      name: "Elm",
      keywords: "let in if then else case of where module import exposing type alias as infix infixl infixr port effect command subscription",
      contains: [{
        beginKeywords: "port effect module",
        end: "exposing",
        keywords: "port effect module where command subscription exposing",
        contains: [I, B],
        illegal: "\\W\\.|;"
      }, {
        begin: "import",
        end: "$",
        keywords: "import as exposing",
        contains: [I, B],
        illegal: "\\W\\.|;"
      }, {
        begin: "type",
        end: "$",
        keywords: "type alias",
        contains: [Q, I, G, B]
      }, {
        beginKeywords: "infix infixl infixr",
        end: "$",
        contains: [A.C_NUMBER_MODE, B]
      }, {
        begin: "port",
        end: "$",
        keywords: "port",
        contains: [B]
      }, Z, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, Q, A.inherit(A.TITLE_MODE, {
        begin: "^[_a-z][\\w']*"
      }), B, {
        begin: "->|<-"
      }],
      illegal: /;/
    }
  }
  bSA.exports = xl9
})
// @from(Start 1507831, End 1513873)
dSA = z((Ge5, mSA) => {
  function fl9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function vl9(A) {
    return hSA("(?=", A, ")")
  }

  function hSA(...A) {
    return A.map((Q) => fl9(Q)).join("")
  }

  function bl9(A) {
    let Q = {
        keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
        built_in: "proc lambda",
        literal: "true false nil"
      },
      I = {
        className: "doctag",
        begin: "@[A-Za-z]+"
      },
      G = {
        begin: "#<",
        end: ">"
      },
      Z = [A.COMMENT("#", "$", {
        contains: [I]
      }), A.COMMENT("^=begin", "^=end", {
        contains: [I],
        relevance: 10
      }), A.COMMENT("^__END__", "\\n$")],
      D = {
        className: "subst",
        begin: /#\{/,
        end: /\}/,
        keywords: Q
      },
      Y = {
        className: "string",
        contains: [A.BACKSLASH_ESCAPE, D],
        variants: [{
          begin: /'/,
          end: /'/
        }, {
          begin: /"/,
          end: /"/
        }, {
          begin: /`/,
          end: /`/
        }, {
          begin: /%[qQwWx]?\(/,
          end: /\)/
        }, {
          begin: /%[qQwWx]?\[/,
          end: /\]/
        }, {
          begin: /%[qQwWx]?\{/,
          end: /\}/
        }, {
          begin: /%[qQwWx]?</,
          end: />/
        }, {
          begin: /%[qQwWx]?\//,
          end: /\//
        }, {
          begin: /%[qQwWx]?%/,
          end: /%/
        }, {
          begin: /%[qQwWx]?-/,
          end: /-/
        }, {
          begin: /%[qQwWx]?\|/,
          end: /\|/
        }, {
          begin: /\B\?(\\\d{1,3})/
        }, {
          begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
        }, {
          begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
        }, {
          begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
        }, {
          begin: /\B\?\\(c|C-)[\x20-\x7e]/
        }, {
          begin: /\B\?\\?\S/
        }, {
          begin: /<<[-~]?'?(\w+)\n(?:[^\n]*\n)*?\s*\1\b/,
          returnBegin: !0,
          contains: [{
            begin: /<<[-~]?'?/
          }, A.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/,
            contains: [A.BACKSLASH_ESCAPE, D]
          })]
        }]
      },
      W = "[1-9](_?[0-9])*|0",
      J = "[0-9](_?[0-9])*",
      F = {
        className: "number",
        relevance: 0,
        variants: [{
          begin: "\\b([1-9](_?[0-9])*|0)(\\.([0-9](_?[0-9])*))?([eE][+-]?([0-9](_?[0-9])*)|r)?i?\\b"
        }, {
          begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
        }, {
          begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
        }, {
          begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
        }, {
          begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
        }, {
          begin: "\\b0(_?[0-7])+r?i?\\b"
        }]
      },
      X = {
        className: "params",
        begin: "\\(",
        end: "\\)",
        endsParent: !0,
        keywords: Q
      },
      V = [Y, {
        className: "class",
        beginKeywords: "class module",
        end: "$|;",
        illegal: /=/,
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
        }), {
          begin: "<\\s*",
          contains: [{
            begin: "(" + A.IDENT_RE + "::)?" + A.IDENT_RE,
            relevance: 0
          }]
        }].concat(Z)
      }, {
        className: "function",
        begin: hSA(/def\s+/, vl9("([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)\\s*(\\(|;|$)")),
        relevance: 0,
        keywords: "def",
        end: "$|;",
        contains: [A.inherit(A.TITLE_MODE, {
          begin: "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
        }), X].concat(Z)
      }, {
        begin: A.IDENT_RE + "::"
      }, {
        className: "symbol",
        begin: A.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
        relevance: 0
      }, {
        className: "symbol",
        begin: ":(?!\\s)",
        contains: [Y, {
          begin: "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
        }],
        relevance: 0
      }, F, {
        className: "variable",
        begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
      }, {
        className: "params",
        begin: /\|/,
        end: /\|/,
        relevance: 0,
        keywords: Q
      }, {
        begin: "(" + A.RE_STARTERS_RE + "|unless)\\s*",
        keywords: "unless",
        contains: [{
          className: "regexp",
          contains: [A.BACKSLASH_ESCAPE, D],
          illegal: /\n/,
          variants: [{
            begin: "/",
            end: "/[a-z]*"
          }, {
            begin: /%r\{/,
            end: /\}[a-z]*/
          }, {
            begin: "%r\\(",
            end: "\\)[a-z]*"
          }, {
            begin: "%r!",
            end: "![a-z]*"
          }, {
            begin: "%r\\[",
            end: "\\][a-z]*"
          }]
        }].concat(G, Z),
        relevance: 0
      }].concat(G, Z);
    D.contains = V, X.contains = V;
    let C = "[>?]>",
      K = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
      E = "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>",
      N = [{
        begin: /^\s*=>/,
        starts: {
          end: "$",
          contains: V
        }
      }, {
        className: "meta",
        begin: "^(" + C + "|" + K + "|" + E + ")(?=[ ])",
        starts: {
          end: "$",
          contains: V
        }
      }];
    return Z.unshift(G), {
      name: "Ruby",
      aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
      keywords: Q,
      illegal: /\/\*/,
      contains: [A.SHEBANG({
        binary: "ruby"
      })].concat(N).concat(Z).concat(V)
    }
  }
  mSA.exports = bl9
})
// @from(Start 1513879, End 1514194)
pSA = z((Ze5, uSA) => {
  function gl9(A) {
    return {
      name: "ERB",
      subLanguage: "xml",
      contains: [A.COMMENT("<%#", "%>"), {
        begin: "<%[%=-]?",
        end: "[%-]?%>",
        subLanguage: "ruby",
        excludeBegin: !0,
        excludeEnd: !0
      }]
    }
  }
  uSA.exports = gl9
})
// @from(Start 1514200, End 1515424)
lSA = z((De5, cSA) => {
  function hl9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function ml9(...A) {
    return A.map((Q) => hl9(Q)).join("")
  }

  function dl9(A) {
    return {
      name: "Erlang REPL",
      keywords: {
        built_in: "spawn spawn_link self",
        keyword: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
      },
      contains: [{
        className: "meta",
        begin: "^[0-9]+> ",
        relevance: 10
      }, A.COMMENT("%", "$"), {
        className: "number",
        begin: "\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
        relevance: 0
      }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
        begin: ml9(/\?(::)?/, /([A-Z]\w*)/, /((::)[A-Z]\w*)*/)
      }, {
        begin: "->"
      }, {
        begin: "ok"
      }, {
        begin: "!"
      }, {
        begin: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
        relevance: 0
      }, {
        begin: "[A-Z][a-zA-Z0-9_']*",
        relevance: 0
      }]
    }
  }
  cSA.exports = dl9
})
// @from(Start 1515430, End 1518546)
nSA = z((Ye5, iSA) => {
  function ul9(A) {
    let Q = "([a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*|[a-z'][a-zA-Z0-9_']*)",
      I = {
        keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
        literal: "false true"
      },
      G = A.COMMENT("%", "$"),
      Z = {
        className: "number",
        begin: "\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
        relevance: 0
      },
      D = {
        begin: "fun\\s+[a-z'][a-zA-Z0-9_']*/\\d+"
      },
      Y = {
        begin: Q + "\\(",
        end: "\\)",
        returnBegin: !0,
        relevance: 0,
        contains: [{
          begin: Q,
          relevance: 0
        }, {
          begin: "\\(",
          end: "\\)",
          endsWithParent: !0,
          returnEnd: !0,
          relevance: 0
        }]
      },
      W = {
        begin: /\{/,
        end: /\}/,
        relevance: 0
      },
      J = {
        begin: "\\b_([A-Z][A-Za-z0-9_]*)?",
        relevance: 0
      },
      F = {
        begin: "[A-Z][a-zA-Z0-9_]*",
        relevance: 0
      },
      X = {
        begin: "#" + A.UNDERSCORE_IDENT_RE,
        relevance: 0,
        returnBegin: !0,
        contains: [{
          begin: "#" + A.UNDERSCORE_IDENT_RE,
          relevance: 0
        }, {
          begin: /\{/,
          end: /\}/,
          relevance: 0
        }]
      },
      V = {
        beginKeywords: "fun receive if try case",
        end: "end",
        keywords: I
      };
    V.contains = [G, D, A.inherit(A.APOS_STRING_MODE, {
      className: ""
    }), V, Y, A.QUOTE_STRING_MODE, Z, W, J, F, X];
    let C = [G, D, V, Y, A.QUOTE_STRING_MODE, Z, W, J, F, X];
    Y.contains[1].contains = C, W.contains = C, X.contains[1].contains = C;
    let K = ["-module", "-record", "-undef", "-export", "-ifdef", "-ifndef", "-author", "-copyright", "-doc", "-vsn", "-import", "-include", "-include_lib", "-compile", "-define", "-else", "-endif", "-file", "-behaviour", "-behavior", "-spec"],
      E = {
        className: "params",
        begin: "\\(",
        end: "\\)",
        contains: C
      };
    return {
      name: "Erlang",
      aliases: ["erl"],
      keywords: I,
      illegal: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
      contains: [{
        className: "function",
        begin: "^[a-z'][a-zA-Z0-9_']*\\s*\\(",
        end: "->",
        returnBegin: !0,
        illegal: "\\(|#|//|/\\*|\\\\|:|;",
        contains: [E, A.inherit(A.TITLE_MODE, {
          begin: "[a-z'][a-zA-Z0-9_']*"
        })],
        starts: {
          end: ";|\\.",
          keywords: I,
          contains: C
        }
      }, G, {
        begin: "^-",
        end: "\\.",
        relevance: 0,
        excludeEnd: !0,
        returnBegin: !0,
        keywords: {
          $pattern: "-" + A.IDENT_RE,
          keyword: K.map((N) => `${N}|1.5`).join(" ")
        },
        contains: [E]
      }, Z, A.QUOTE_STRING_MODE, X, J, F, W, {
        begin: /\.$/
      }]
    }
  }
  iSA.exports = ul9
})
// @from(Start 1518552, End 1523193)
sSA = z((We5, aSA) => {
  function pl9(A) {
    return {
      name: "Excel formulae",
      aliases: ["xlsx", "xls"],
      case_insensitive: !0,
      keywords: {
        $pattern: /[a-zA-Z][\w\.]*/,
        built_in: "ABS ACCRINT ACCRINTM ACOS ACOSH ACOT ACOTH AGGREGATE ADDRESS AMORDEGRC AMORLINC AND ARABIC AREAS ASC ASIN ASINH ATAN ATAN2 ATANH AVEDEV AVERAGE AVERAGEA AVERAGEIF AVERAGEIFS BAHTTEXT BASE BESSELI BESSELJ BESSELK BESSELY BETADIST BETA.DIST BETAINV BETA.INV BIN2DEC BIN2HEX BIN2OCT BINOMDIST BINOM.DIST BINOM.DIST.RANGE BINOM.INV BITAND BITLSHIFT BITOR BITRSHIFT BITXOR CALL CEILING CEILING.MATH CEILING.PRECISE CELL CHAR CHIDIST CHIINV CHITEST CHISQ.DIST CHISQ.DIST.RT CHISQ.INV CHISQ.INV.RT CHISQ.TEST CHOOSE CLEAN CODE COLUMN COLUMNS COMBIN COMBINA COMPLEX CONCAT CONCATENATE CONFIDENCE CONFIDENCE.NORM CONFIDENCE.T CONVERT CORREL COS COSH COT COTH COUNT COUNTA COUNTBLANK COUNTIF COUNTIFS COUPDAYBS COUPDAYS COUPDAYSNC COUPNCD COUPNUM COUPPCD COVAR COVARIANCE.P COVARIANCE.S CRITBINOM CSC CSCH CUBEKPIMEMBER CUBEMEMBER CUBEMEMBERPROPERTY CUBERANKEDMEMBER CUBESET CUBESETCOUNT CUBEVALUE CUMIPMT CUMPRINC DATE DATEDIF DATEVALUE DAVERAGE DAY DAYS DAYS360 DB DBCS DCOUNT DCOUNTA DDB DEC2BIN DEC2HEX DEC2OCT DECIMAL DEGREES DELTA DEVSQ DGET DISC DMAX DMIN DOLLAR DOLLARDE DOLLARFR DPRODUCT DSTDEV DSTDEVP DSUM DURATION DVAR DVARP EDATE EFFECT ENCODEURL EOMONTH ERF ERF.PRECISE ERFC ERFC.PRECISE ERROR.TYPE EUROCONVERT EVEN EXACT EXP EXPON.DIST EXPONDIST FACT FACTDOUBLE FALSE|0 F.DIST FDIST F.DIST.RT FILTERXML FIND FINDB F.INV F.INV.RT FINV FISHER FISHERINV FIXED FLOOR FLOOR.MATH FLOOR.PRECISE FORECAST FORECAST.ETS FORECAST.ETS.CONFINT FORECAST.ETS.SEASONALITY FORECAST.ETS.STAT FORECAST.LINEAR FORMULATEXT FREQUENCY F.TEST FTEST FV FVSCHEDULE GAMMA GAMMA.DIST GAMMADIST GAMMA.INV GAMMAINV GAMMALN GAMMALN.PRECISE GAUSS GCD GEOMEAN GESTEP GETPIVOTDATA GROWTH HARMEAN HEX2BIN HEX2DEC HEX2OCT HLOOKUP HOUR HYPERLINK HYPGEOM.DIST HYPGEOMDIST IF IFERROR IFNA IFS IMABS IMAGINARY IMARGUMENT IMCONJUGATE IMCOS IMCOSH IMCOT IMCSC IMCSCH IMDIV IMEXP IMLN IMLOG10 IMLOG2 IMPOWER IMPRODUCT IMREAL IMSEC IMSECH IMSIN IMSINH IMSQRT IMSUB IMSUM IMTAN INDEX INDIRECT INFO INT INTERCEPT INTRATE IPMT IRR ISBLANK ISERR ISERROR ISEVEN ISFORMULA ISLOGICAL ISNA ISNONTEXT ISNUMBER ISODD ISREF ISTEXT ISO.CEILING ISOWEEKNUM ISPMT JIS KURT LARGE LCM LEFT LEFTB LEN LENB LINEST LN LOG LOG10 LOGEST LOGINV LOGNORM.DIST LOGNORMDIST LOGNORM.INV LOOKUP LOWER MATCH MAX MAXA MAXIFS MDETERM MDURATION MEDIAN MID MIDBs MIN MINIFS MINA MINUTE MINVERSE MIRR MMULT MOD MODE MODE.MULT MODE.SNGL MONTH MROUND MULTINOMIAL MUNIT N NA NEGBINOM.DIST NEGBINOMDIST NETWORKDAYS NETWORKDAYS.INTL NOMINAL NORM.DIST NORMDIST NORMINV NORM.INV NORM.S.DIST NORMSDIST NORM.S.INV NORMSINV NOT NOW NPER NPV NUMBERVALUE OCT2BIN OCT2DEC OCT2HEX ODD ODDFPRICE ODDFYIELD ODDLPRICE ODDLYIELD OFFSET OR PDURATION PEARSON PERCENTILE.EXC PERCENTILE.INC PERCENTILE PERCENTRANK.EXC PERCENTRANK.INC PERCENTRANK PERMUT PERMUTATIONA PHI PHONETIC PI PMT POISSON.DIST POISSON POWER PPMT PRICE PRICEDISC PRICEMAT PROB PRODUCT PROPER PV QUARTILE QUARTILE.EXC QUARTILE.INC QUOTIENT RADIANS RAND RANDBETWEEN RANK.AVG RANK.EQ RANK RATE RECEIVED REGISTER.ID REPLACE REPLACEB REPT RIGHT RIGHTB ROMAN ROUND ROUNDDOWN ROUNDUP ROW ROWS RRI RSQ RTD SEARCH SEARCHB SEC SECH SECOND SERIESSUM SHEET SHEETS SIGN SIN SINH SKEW SKEW.P SLN SLOPE SMALL SQL.REQUEST SQRT SQRTPI STANDARDIZE STDEV STDEV.P STDEV.S STDEVA STDEVP STDEVPA STEYX SUBSTITUTE SUBTOTAL SUM SUMIF SUMIFS SUMPRODUCT SUMSQ SUMX2MY2 SUMX2PY2 SUMXMY2 SWITCH SYD T TAN TANH TBILLEQ TBILLPRICE TBILLYIELD T.DIST T.DIST.2T T.DIST.RT TDIST TEXT TEXTJOIN TIME TIMEVALUE T.INV T.INV.2T TINV TODAY TRANSPOSE TREND TRIM TRIMMEAN TRUE|0 TRUNC T.TEST TTEST TYPE UNICHAR UNICODE UPPER VALUE VAR VAR.P VAR.S VARA VARP VARPA VDB VLOOKUP WEBSERVICE WEEKDAY WEEKNUM WEIBULL WEIBULL.DIST WORKDAY WORKDAY.INTL XIRR XNPV XOR YEAR YEARFRAC YIELD YIELDDISC YIELDMAT Z.TEST ZTEST"
      },
      contains: [{
        begin: /^=/,
        end: /[^=]/,
        returnEnd: !0,
        illegal: /=/,
        relevance: 10
      }, {
        className: "symbol",
        begin: /\b[A-Z]{1,2}\d+\b/,
        end: /[^\d]/,
        excludeEnd: !0,
        relevance: 0
      }, {
        className: "symbol",
        begin: /[A-Z]{0,2}\d*:[A-Z]{0,2}\d*/,
        relevance: 0
      }, A.BACKSLASH_ESCAPE, A.QUOTE_STRING_MODE, {
        className: "number",
        begin: A.NUMBER_RE + "(%)?",
        relevance: 0
      }, A.COMMENT(/\bN\(/, /\)/, {
        excludeBegin: !0,
        excludeEnd: !0,
        illegal: /\n/
      })]
    }
  }
  aSA.exports = pl9
})
// @from(Start 1523199, End 1523846)
oSA = z((Je5, rSA) => {
  function cl9(A) {
    return {
      name: "FIX",
      contains: [{
        begin: /[^\u2401\u0001]+/,
        end: /[\u2401\u0001]/,
        excludeEnd: !0,
        returnBegin: !0,
        returnEnd: !1,
        contains: [{
          begin: /([^\u2401\u0001=]+)/,
          end: /=([^\u2401\u0001=]+)/,
          returnEnd: !0,
          returnBegin: !1,
          className: "attr"
        }, {
          begin: /=/,
          end: /([\u2401\u0001])/,
          excludeEnd: !0,
          excludeBegin: !0,
          className: "string"
        }]
      }],
      case_insensitive: !0
    }
  }
  rSA.exports = cl9
})
// @from(Start 1523852, End 1524765)
eSA = z((Fe5, tSA) => {
  function ll9(A) {
    let B = {
        className: "string",
        begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
      },
      Q = {
        className: "string",
        variants: [{
          begin: '"',
          end: '"'
        }]
      },
      G = {
        className: "function",
        beginKeywords: "def",
        end: /[:={\[(\n;]/,
        excludeEnd: !0,
        contains: [{
          className: "title",
          relevance: 0,
          begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/
        }]
      };
    return {
      name: "Flix",
      keywords: {
        literal: "true false",
        keyword: "case class def else enum if impl import in lat rel index let match namespace switch type yield with"
      },
      contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, B, Q, G, A.C_NUMBER_MODE]
    }
  }
  tSA.exports = ll9
})
// @from(Start 1524771, End 1530163)
B_A = z((Xe5, A_A) => {
  function il9(A) {
    if (!A) return null;
    if (typeof A === "string") return A;
    return A.source
  }

  function bT1(...A) {
    return A.map((Q) => il9(Q)).join("")
  }

  function nl9(A) {
    let B = {
        className: "params",
        begin: "\\(",
        end: "\\)"
      },
      Q = {
        variants: [A.COMMENT("!", "$", {
          relevance: 0
        }), A.COMMENT("^C[ ]", "$", {
          relevance: 0
        }), A.COMMENT("^C$", "$", {
          relevance: 0
        })]
      },
      I = /(_[a-z_\d]+)?/,
      G = /([de][+-]?\d+)?/,
      Z = {
        className: "number",
        variants: [{
          begin: bT1(/\b\d+/, /\.(\d*)/, G, I)
        }, {
          begin: bT1(/\b\d+/, G, I)
        }, {
          begin: bT1(/\.\d+/, G, I)
        }],
        relevance: 0
      },
      D = {
        className: "function",
        beginKeywords: "subroutine function program",
        illegal: "[${=\\n]",
        contains: [A.UNDERSCORE_TITLE_MODE, B]
      },
      Y = {
        className: "string",
        relevance: 0,
        variants: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
      };
    return {
      name: "Fortran",
      case_insensitive: !0,
      aliases: ["f90", "f95"],
      keywords: {
        literal: ".False. .True.",
        keyword: "kind do concurrent local shared while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then block endblock endassociate public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure impure integer real character complex logical codimension dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
        built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_of acosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image sync change team co_broadcast co_max co_min co_sum co_reduce"
      },
      illegal: /\/\*/,
      contains: [Y, D, {
        begin: /^C\s*=(?!=)/,
        relevance: 0
      }, Q, Z]
    }
  }
  A_A.exports = nl9
})
// @from(Start 1530169, End 1531732)
I_A = z((Ve5, Q_A) => {
  function al9(A) {
    let B = {
      begin: "<",
      end: ">",
      contains: [A.inherit(A.TITLE_MODE, {
        begin: /'[a-zA-Z0-9_]+/
      })]
    };
    return {
      name: "F#",
      aliases: ["fs"],
      keywords: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
      illegal: /\/\*/,
      contains: [{
        className: "keyword",
        begin: /\b(yield|return|let|do)!/
      }, {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [{
          begin: '""'
        }]
      }, {
        className: "string",
        begin: '"""',
        end: '"""'
      }, A.COMMENT("\\(\\*(\\s)", "\\*\\)", {
        contains: ["self"]
      }), {
        className: "class",
        beginKeywords: "type",
        end: "\\(|=|$",
        excludeEnd: !0,
        contains: [A.UNDERSCORE_TITLE_MODE, B]
      }, {
        className: "meta",
        begin: "\\[<",
        end: ">\\]",
        relevance: 10
      }, {
        className: "symbol",
        begin: "\\B('[A-Za-z])\\b",
        contains: [A.BACKSLASH_ESCAPE]
      }, A.C_LINE_COMMENT_MODE, A.inherit(A.QUOTE_STRING_MODE, {
        illegal: null
      }), A.C_NUMBER_MODE]
    }
  }
  Q_A.exports = al9
})