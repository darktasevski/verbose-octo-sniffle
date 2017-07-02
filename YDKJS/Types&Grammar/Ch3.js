/**
 * Natives
 */

// Most commonly used natives: String(), Number(), Boolean(), Array(), Object(), Function(), RegExp(), Date(), Error(), Symbol() ==> ES6

// Manually box a primitive value
var a = 3;
var c = Object(a);

// Unboxing
c.valueOf(); // 3

// Creating an array of specified length with undefined values
var a = Array.apply(null, {length: 3});
a; // [undefined, undefined, undefined]

// Native prototypes
// String.prototype.XYZ => String#XYZ (shortened form in documentation)

// Prototypes as defaults
// Function.prototype => empty function
// RegExp.prototype => empty regex
// Array.prototype => empty array
// As default value assignment:
function isThisCool(vals, fn, rx) {
  vals = vals || Array.prototype;
  fn = fn || Function.prototype;
  rx = rx || RegExp.prototype;

  return rx.test(vals.map(fn).join(""));
}