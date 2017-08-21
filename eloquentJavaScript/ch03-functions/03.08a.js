// http://eloquentjavascript.net/03_functions.html#p_GDGcocAd5v

/* The following code ... defines a function, wrapValue, which creates a local variable.
It then returns a function that accesses and returns this local variable. */

function wrapValue(n) {
  var localVariable = n;
  return function() { return localVariable; };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
console.log(wrap1()); // <--- 1
console.log(wrap2()); // <--- 2
