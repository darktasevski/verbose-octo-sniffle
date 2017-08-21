// http://eloquentjavascript.net/03_functions.html#h_XTmO7z7MPq

// of two parameters, returns the minimum value
// version 1
// function min(x, y) {
//   if (x < y) {
//     return x;
//   } else { return y; }
// }

// version 2
// function min(x, y) {
//   if (x < y) {
//     return x;
//   } else return y;
// }

// version 3
function min(x, y) {
  if (x < y)
    return x;
  else
    return y;
}

console.log(min(0, 10));  // --> 0
console.log(min(0, -10)); // --> -10
console.log(min(true, false)); // --> ?
console.log(min(false, true)); // --> ?
