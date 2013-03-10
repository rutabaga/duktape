/*===
basic
fOo
fOO
bar-1123 bar-1234 bar-1345
===*/

print('basic');

function basicTest() {
    print('foo'.replace('o', 'O'));

    print('foo'.replace(/o/g, 'O'));

    print('foo-123 foo-234 foo-345'.replace(/foo-(\d+)/g,
        function replacer(matchSub, cap, matchOffset, str) {
            return 'bar-' + String(Number(cap) + 1000);
        })
    );
}

try {
    basicTest();
} catch (e) {
    print(e);
}

/*===
dollar replacements
string xooxxr
string $oo$$r
string ffoobbaar
string f[f][fo]bar
string f[obar][bar]bar
string fo$0ar
string foobobar
string foobar
string foob2ar
string foob1ar
string $0abcdefghijklmnopqrstuvwxyzb7b8b9c0c1c2c3c4c5c6c7c8c9d0d1d2d3d4d5d6d7d8d9e0e1e2e3e4e5e6e7e8e9f0f1f2f3f4f5f6f7f8f9g0g1g2g3g4g5g6g7g8g9h0h1h2h3h4h5h6h7h8h9i0i1i2i3i4i5i6i7i8i9j0
string $1-$11,$1-$22
===*/

/* Test all dollar replacement syntax variants */

print('dollar replacements');

function dollarTest() {
    function test(str, searchValue, replaceValue) {
        var t;

        try {
            t = str.replace(searchValue, replaceValue);
            print(typeof t, t);
        } catch (e) {
            print(e.name);
        }
    }

    test('foobar', /([a-f])/g, 'x');

    test('foobar', /([a-f])/g, '$$');

    test('foobar', /([a-f])/g, '$&$&');

    test('foobar', /o/g, '[$`]');

    test('foobar', /o/g, '[$\']');

    test('foobar', /(ob)/g, '$0');   // $0 is not valid, so is interpreted literally as "$0"
    test('foobar', /(ob)/g, '$1$1');
    test('foobar', /(ob)/g, '$01');  // interpreted as "replacement 1"
    test('foobar', /(ob)/g, '$012'); // interpreted as "replacement 01 + '2'"

    // Behavior here is implemented dependent because 11 > NCapturingParens.
    // Rhino and V8 both seem to fall back to interpreting the expression
    // as '$1' followed by a verbatim '1', so we test for that.
    test('foobar', /(ob)/g, '$11');  // interpreted as "replacement 11" not "replacement 1 + '1'"

    // $27 -> $29 are larger than NCapturingParens but $2 is not, so V8/Rhino fall back
    // to interpreting them as $2 followed by a literal digit. Same goes for all matches
    // up to $99.  $100 will be interpreted as $10 followed by a literal '0'.
    test('abcdefghijklmnopqrstuvwxyz',
         /(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)(.)/g,
         '$0$1$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16$17$18$19$20$21$22$23$24$25$26$27$28$29' +
         '$30$31$32$33$34$35$36$37$38$39$40$41$42$43$44$45$46$47$48$49' +
         '$50$51$52$53$54$55$56$57$58$59$60$61$62$63$64$65$66$67$68$69' +
         '$70$71$72$73$74$75$76$77$78$79$80$81$82$83$84$85$86$87$88$89' +
         '$90$91$92$93$94$95$96$97$98$99$100');

    // specific test from E5.1 Section 15.5.4.11
    test("$1,$2", /(\$(\d))/g, "$$1-$1$2");
}

try {
    dollarTest();
} catch (e) {
    print(e);
}

/*===
function replacer
repl1 o 1 foobar
string f[repl-1]obar
repl1 o 1 foobar
repl1 o 2 foobar
string f[repl-1][repl-2]bar
repl2 oba o b a 2 foobar
string fo[repl-2]r
repl3 yada-1 ya d 1 0 yada-1 yadda-2 yaddda-3
repl3 yadda-2 ya dd 2 7 yada-1 yadda-2 yaddda-3
repl3 yaddda-3 ya ddd 3 15 yada-1 yadda-2 yaddda-3
string Yadda-2 Yadda-4 Yadda-6
repl_args 3 o <> 1 foobar
repl_args 3 o <> 2 foobar
string f[repl-args-1][repl-args-2]bar
repl_args 6 oba <o:b:a> 2 foobar
string fo[repl-args-2]r
repl4 o o 1 foObar
toString() repl4 retval
repl4 O O 2 foObar
toString() repl4 retval
string f[repl-1 cap=o][repl-2 cap=O]bar
repl2 foo foo foo undefined 0 foobar
repl2 bar bar undefined bar 3 foobar
string [repl-0][repl-3]
===*/

/* Function replacer, regexp captures. */

print('function replacer');

function functionReplacerTest() {
    // zero captures
    function repl1(matchSub, matchOffset, str) {
        print('repl1', matchSub, matchOffset, str);
        return '[repl-' + matchOffset + ']';
    }

    // three captures
    function repl2(matchSub, cap1, cap2, cap3, matchOffset, str) {
        print('repl2', matchSub, cap1, cap2, cap3, matchOffset, str);
        return '[repl-' + matchOffset + ']';
    }

    // three captures
    function repl3(matchSub, cap1, cap2, cap3, matchOffset, str) {
        print('repl3', matchSub, cap1, cap2, cap3, matchOffset, str);
        return 'Yadda-' + Number(cap3) * 2;
    }

    // one capture, returns an object which needs to be string coerced
    function repl4(matchSub, cap, matchOffset, str) {
        print('repl4', matchSub, cap, matchOffset, str);
        return {
            toString: function() { print('toString() repl4 retval');
                                   return '[repl-' + matchOffset + ' cap=' + cap + ']'; },
            valueOf: function() { print('valueOf() repl4 retval');
                                  return 'not called'; }
        };
    }

    // allows any captures, use arguments object to figure out args
    function repl_args() {
        var matchSub, matchOffset, str;
        var caps = [];
        var i, n;

        matchSub = arguments[0];
        matchOffset = arguments[arguments.length - 2];
        str = arguments[arguments.length - 1];
        for (i = 1; i < arguments.length - 2; i++) {
            caps.push(arguments[i]);
        }

        print('repl_args', arguments.length, matchSub, '<' + caps.join(':') + '>', matchOffset, str);

        return '[repl-args-' + matchOffset + ']';
    }

    function test(str, searchValue, replaceValue) {
        var t;

        try {
            t = str.replace(searchValue, replaceValue);
            print(typeof t, t);
        } catch (e) {
            print(e.name);
        }
    }

    test('foobar', 'o', repl1);
    test('foobar', /o/g, repl1);

    test('foobar', /(o)(b)(.)/g, repl2);

    test('yada-1 yadda-2 yaddda-3', /(ya)(d+)a-(\d+)/g, repl3);

    test('foobar', /o/g, repl_args);
    test('foobar', /(o)(b)(.)/g, repl_args);

    // replace function value coercion
    test('foObar', /(o)/gi, repl4);

    // even captures with no match are given to the replacer, as undefined
    test('foobar', /((foo)|(bar))/g, repl2);
}

try {
    functionReplacerTest();
} catch (e) {
    print(e);
}

/*===
regexp details
non-global
re: source foo global false ignoreCase false multiline false lastIndex 0
replace func
re: source foo global false ignoreCase false multiline false lastIndex 0
bar[repl]barfoo
re: source foo global false ignoreCase false multiline false lastIndex 0
global
re: source foo global true ignoreCase false multiline false lastIndex 0
replace func
re: source foo global true ignoreCase false multiline false lastIndex 0
replace func
re: source foo global true ignoreCase false multiline false lastIndex 0
replace func
re: source foo global true ignoreCase false multiline false lastIndex 0
bar[repl]bar[repl]bar[repl]bar
re: source foo global true ignoreCase false multiline false lastIndex 0
global, init lastIndex
re: source foo global true ignoreCase false multiline false lastIndex 0
re: source foo global true ignoreCase false multiline false lastIndex 6
replace func
re: source foo global true ignoreCase false multiline false lastIndex 0
replace func
re: source foo global true ignoreCase false multiline false lastIndex 0
replace func
re: source foo global true ignoreCase false multiline false lastIndex 0
bar[repl]bar[repl]bar[repl]bar
re: source foo global true ignoreCase false multiline false lastIndex 0
===*/

/* RegExp details, especially how the RegExp instance properties are
 * changed during non-global or global matching.
 */

print('regexp details');

function regexpDetailsTest() {
    var re;

    function dumpRe(r) {
        print('re:', 'source', r.source, 'global', r.global, 'ignoreCase', r.ignoreCase,
              'multiline', r.multiline, 'lastIndex', r.lastIndex);
    }

    // non-global case
    print('non-global');
    re = /foo/;
    dumpRe(re);
    print('barfoobarfoo'.replace(re, function() {
        print('replace func');
        dumpRe(re);
        return '[repl]';
    }));
    dumpRe(re);

    // global case
    print('global');
    re = /foo/g;
    dumpRe(re);
    print('barfoobarfoobarfoobar'.replace(re, function() {
        print('replace func');
        dumpRe(re);
        return '[repl]';
    }));
    dumpRe(re);

    // global case, init lastIndex to non-zero
    print('global, init lastIndex');
    re = /foo/g;
    dumpRe(re);
    re.lastIndex = 6;
    dumpRe(re);
    print('barfoobarfoobarfoobar'.replace(re, function() {
        print('replace func');
        dumpRe(re);
        return '[repl]';
    }));
    dumpRe(re);

    // FIXME: explain behavior a bit
}

try {
    regexpDetailsTest();
} catch (e) {
    print(e);
}

/*===
coercion
TypeError
TypeError
string tRUE
string faLSE
string 1xy
string qUux
string 1:3
string [object OBJECT]
===*/

/* Coercion of 'this' and arguments. */

print('coercion');

function coercionTest() {
    function test(thisValue, searchValue, replaceValue) {
        var t;

        try {
            t = String.prototype.replace.call(thisValue, searchValue, replaceValue);
            print(typeof t, t);
        } catch (e) {
            print(e.name);
        }
    }

    test(undefined, 'foo', 'bar');
    test(null, 'foo', 'bar');
    test(true, 'rue', 'RUE');
    test(false, 'lse', 'LSE');
    test(123, '23', 'xy');
    test('quux', 'u', 'U');
    test([1,2], ',2', ':3');
    test({ foo:1, bar:2 }, 'Object', 'OBJECT');
}

try {
    coercionTest();
} catch (e) {
    print(e);
}
