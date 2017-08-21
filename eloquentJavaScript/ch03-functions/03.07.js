// http://eloquentjavascript.net/03_functions.html#h_1pGtRjrCUp

// Entered into the browser console, the latter two arguments are simply ignored
// alert("Hello", "Good Evening", "How do you do?");

// JS "optional" arguments

function power(base, exponent) {
  if (exponent == undefined)
    exponent = 2;
  var result = 1;
  for (var count = 0; count < exponent; count++)
    result *= base;
  return result;
}

console.log(power(4)); // <------ 16

console.log(power(4, 3)); // <--- 64
