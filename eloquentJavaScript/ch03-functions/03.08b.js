// http://eloquentjavascript.net/03_functions.html#p_YtnB1+ZhQb

/* The explicit localVariable from the wrapValue example isn’t needed
since a parameter is itself a local variable. */

function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

var twice = multiplier(2);
console.log(twice(5)); // <--- 10


// COMPARE previous example:

function wrapValue(n) {
  var localVariable = n;
  return function() { return localVariable; };
}

function multiplier(factor) {
  return function(number) {return number * factor; };
}
