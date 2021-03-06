/*
 *  Top-level include file to be used for all (internal) source files.
 *
 *  Source files should not include individual header files, as they
 *  have not been designed to be individually included.
 */

#ifndef DUK_INTERNAL_H_INCLUDED
#define DUK_INTERNAL_H_INCLUDED

/*
 *  Platform specific handling: detection of features, system headers are
 *  included etc.  Duktape.h contains its own feature detection for those
 *  features the external API absolutely needs.  Duktape.h detection results
 *  must match duk_features.h, so duk_features_sanity.h is included to check
 *  for consistency.
 */

#include "duk_features.h"
#include "duktape.h"
#include "duk_features_sanity.h"
#include "duk_dblunion.h"

/*
 *  User declarations, e.g. prototypes for user functions used by Duktape
 *  macros.  Concretely, if DUK_OPT_PANIC_HANDLER is used and the macro
 *  value calls a user function, it needs to be declared for Duktape
 *  compilation to avoid warnings.
 */

DUK_USE_USER_DECLARE()

/*
 *  Duktape includes (other than duk_features.h)
 *
 *  The header files expect to be included in an order which satisfies header
 *  dependencies correctly (the headers themselves don't include any other
 *  includes).  Forward declarations are used to break circular struct/typedef
 *  dependencies.
 */

#include "duk_replacements.h"
#include "duk_jmpbuf.h"
#include "duk_forwdecl.h"
#include "duk_builtins.h"  /* autogenerated: strings and built-in object init data */

#include "duk_js_bytecode.h"
#include "duk_lexer.h"
#include "duk_js_compiler.h"
#include "duk_regexp.h"
#include "duk_tval.h"
#include "duk_heaphdr.h"
#include "duk_api_internal.h"
#include "duk_hstring.h"
#include "duk_hobject.h"
#include "duk_hcompiledfunction.h"
#include "duk_hnativefunction.h"
#include "duk_hthread.h"
#include "duk_hbuffer.h"
#include "duk_heap.h"
#include "duk_debug.h"
#include "duk_error.h"
#include "duk_util.h"
#include "duk_unicode.h"
#include "duk_json.h"
#include "duk_js.h"
#include "duk_numconv.h"
#include "duk_bi_protos.h"
#include "duk_selftest.h"

#endif  /* DUK_INTERNAL_H_INCLUDED */

