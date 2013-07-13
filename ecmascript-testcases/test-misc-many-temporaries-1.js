/*
 *  Many temporaries at the same time.
 *
 *  Intent is to ensure temporaries are exhausted from the easily accessible
 *  range, and spilling is required to handle the expression correctly.
 *  Parentheses are required to ensure temporaries are truly needed.
 */

/* NOTE: this currently croaks with Rhino and Smjs. */

/*===
1503
===*/

var x = 1;
var y = 2;

/* result = (1 + 50*10) * (x + y) = 501 * 3 = 1503 */
var z = x +

    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +

    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +

    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +

    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +

    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +
    (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x + (y + (x +

    y

    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))

    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))

    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))

    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))

    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))
    )) )) )) )) )) )) )) )) )) ))

;

print(z);
