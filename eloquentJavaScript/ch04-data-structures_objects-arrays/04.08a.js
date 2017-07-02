// http://eloquentjavascript.net/04_data.html#p_napfsNS5sk
/*
per: http://eloquentjavascript.net/04_data.html#p_82L/EowL1c
     n11n00 - n10n01
ϕ = -----------------
    √ n1• n0• n•1 n•0

The notation n01 indicates the number of measurements where the first variable
(squirrelness) is false (0) and the second variable (pizza) is true (1). In this
example, n01 is 9.

The value n1• refers to the sum of all measurements where the first variable is
true, which is 5 in the example table. Likewise, n•0 refers to the sum of the
measurements where the second variable is false.
*/

function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1])); // ---> 0.06859943405700354
