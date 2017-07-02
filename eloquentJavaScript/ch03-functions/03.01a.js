// http://eloquentjavascript.net/03_functions.html#h_tqLFw/oazr

// var square = function(x) {
// 	return x * x;
// };
//
// console.log(square(12)); // -->144

// MODIFICATION to accept input value from user
// per: https://docs.nodejitsu.com/articles/command-line/how-to-parse-command-line-arguments/
// Assigns an argument when the script is invoked in the command line
// e.g. $ node 03.01a.js 12
var aNumber = process.argv[2]

// console.log(aNumber);

// returns the square of the number, e.g. 12, returns 12 * 12 as 144
var square = function(x) {
	return x * x;
};

// prints the return value to the console
console.log(square(aNumber));

// variable_declaration aName = keyword:function( parameter(s) ) {
// 	code block;
// };
