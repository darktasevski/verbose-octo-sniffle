/**
 * Book 4 -- Chapter 2: Values
 */

/**
 * Arrays
 */

/**
 * Array-likes
 * When trying to access the arguments as a list:
 * 1. Use slice.call()
 * 2. Array.from() <= Use
 */

function foo() {
  var arr = Array.prototype.slice.call(arguments);
  arr.push("bam");
  console.log(arr);
}

foo("bar", "baz"); // ["bar","baz", "bam"]

// Using ES6 built-in utility
var arr = Array.from(arguments);

/**
 * Strings
 * 
 * JS strings are immutable
 * Therefore, no string methods can modify in-place and must return new strings
 * 
 * It is possible to borrow non-mutation array methods against strings:
 */

var a = "foo";
var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
        return v.toUpperCase() + ".";
}).join("");

c; // "f-o-o"
d; // "F.O.O."

// Reversing a string
// It is not possible to "borrow" the array method .reverse() here as it mutates the element itself
// The most possible way is to convert string into array, perform reverse and change back to string
var c = a.split("").reverse().join("");

/**
 * Numbers
 */

var hex = 0x003322;
var binary = 0b0111;
var octal = 0o322;

// Comparing two small numbers
0.1 + 0.2 === 0.3; // false (due to floating point rounding error)

// To compare small numbers, use a rounding error value as tolerance
// This is called "machine epsilon" == 2^-52
// ES6 ==> Number.EPSILON

function numbersCloseEnoughtoEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughtoEqual(a, b); // true

// Safe value for whole number integers: 2^53 - 1
// ES6 => Number.MAX_SAFE_INTEGER

// Testing for integers
Number.isInteger(42); // true
Number.isInteger(42.3); // false

// Force a number value into a 32-bit signed integer value
var a = -3;
var a = a | 0; // | bitwise operator only works on 32-bit integer values

// To void out a value use `void` operator
var a = 42;
console.log(void a, a); // undefined 42

// Test for absolute equality:
var a = 2 / "foo"; // NaN
var b = -3 * 0; // -0

Object.is(a, NaN); // true
Object.is(b, -0); // true
Object.is(b, 0); // false

/**
 * Values and References
 */
// Always value:
// null, undefined, string, number, boolean, symbol

// Compound values:
// objects (including arrays), and functions always create a copy of the **reference** on assignment with which variables have a shared value
var a = [1, 2, 3];
var b = a;
b.push(4);
a; // [1, 2, 3, 4]
b; // [1, 2, 3, 4]

// Since references point to values themselves and not to variables, you cannot use one reference to change where another reference is pointed:
var a = [1, 2, 3];
var b = a;
a; // [1, 2, 3]
b; // [1, 2, 3]

b = [4, 5, 6];
a; // [1, 2, 3]
b; // [4, 5, 6]

// To pass a compound value (like an object or array) by value-copy (make a shallow copy and pass it in):
foo(a.slice());

// To do the reverse, and pass a primitive value as a reference, wrap the value in another compound value that can be passed by reference:
function foo(wrapper) {
  wrapper.a = 42;
}

var obj = {
  a: 2;
}

foo(obj);
obj.a; // 42