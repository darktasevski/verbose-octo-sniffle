// http://eloquentjavascript.net/03_functions.html#c_YeYw47ylC5

// var makeNoise = function() {
//   console.log("Pling!");
// };
//
// makeNoise(); //<-- Pling!

// // In JavaScript, the "BELL" is u0007
// var makeNoise = function() {
//   console.log("Pling!\u0007");
// };
//
// makeNoise(); //<-- Pling!


// takes a user input string (within quotes if spaces are required)
// a prints the input value with a bell.
var userInput = process.argv[2]

var makeNoise = function() {
  console.log(userInput.toString() + '\u0007');
};

makeNoise(); //<-- user input with bell!
