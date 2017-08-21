// http://eloquentjavascript.net/03_functions.html#c_ILJrRT16qt

// NOTE: when declared like so, functions have primacy in the "top-down" flow of the script

console.log("The future says:", future());

function future() {
  return "We STILL have no flying cars.";
}

// // NOTE: using the "var" declaration, the console.log() statement HAS to come after the function declaration
// // e.g.
// var future = function() {
//   return "We STILL have no flying cars.";
// }
//
// console.log("The future says:", future());
//
// // This will throw an error:
// console.log("The future says:", future());
// var future = function() {
//   return "We STILL have no flying cars.";
// }
