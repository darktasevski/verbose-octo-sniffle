// Cmd + B to see result

// Declaration:
var name;
console.log(name);	// undefined because we haven't defined name yet!

// Initialization:
// (Below data type is a string)
name = "kenn";
console.log(name);	// kenn because we HAVE defined name

// JavaScript recognizes several data types:
console.log(true);	// Booleans
console.log(1.7);	// Floats
console.log(2);		// Integers

// JavaScript can do lots of stuff:
console.log(1+1);	// Math - 2
var firstName = "Caitlyn";
var lastName = "Tetmeyer";
console.log(firstName + lastName);	// String Concatenation - CaitlynTetmeyer
console.log(firstName + " " + lastName);	// Caitlyn Tetmeyer

// Challenge
var street = "11543 Indian Hill Way";
var state = "Zionsville, IN";
var zip = "46077";
console.log( street + "\n" + state + " " + zip);
/* 11543 Indian Hill Way 
Zionsville, IN 46077*/

console.log("Ben says, \"Good morrow to you, sir.\"");	// Good morrow to you, sir.

// Don't start a variable name with a number.

var isAwake = true;
// Can't use a reserved word for a variable name: var true = "Hey you guys!!";
// Reserved Words in JS: http://www.javascripter.net/faq/
console.log(isAwake);	// true

var rainy = false;
console.log(rainy);	// false

console.log("Are you awake? " + isAwake);	// Are you awake? true

/*
+ addition
- subtraction
* multiplication
/ division
% modulus
= assignment operator
*/

// Modulus
console.log( "The answer to 10 % 3 is: " , 10 % 3 );	// 1 because 10/3 = 3 r1

// typeof
console.log(typeof("kenn"));	// string
console.log( typeof("The answer to 10 % 3 is: " + 10 % 3 ));	// string





















