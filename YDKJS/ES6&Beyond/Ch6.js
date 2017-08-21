/**
 * Chapter 6: API Additions
*/

/**
 * Array
*/

// Array.of(..) static function
// Creates an array with specified parameters
var c = Array.of(1, 2, 3);
c.length; // 3
c; // [1, 2, 3]

// Can be used when subclassing `Array`
class MyCoolArray extends Array {
  sum() {
    return this.reduce(function reducer(acc, curr) {
      return acc + curr;
    }, 0);
  }
}
var x = new MyCoolArray(3);
x.length; // 3 <== Oops!

var z = MyCoolArray.of(3);
z.length; // 1
z.sum(); 3

// Array.from(..) static function
// Create arrays from array-like objects, so as to utilize Array.prototype methods
var arrLike = {
  length: 3,
  0: "foo",
  1: "bar"
};
var arr = Array.from(arrLike);
arr; // ["foo", "bar", undefined]

// Mapping
// The second (optional) argument to Array.from(..) is a mapping callback:
var arrLike = {
  length: 4,
  2: "foo"
}
Array.from(arrLike, function mapper(val, idx) {
  if (typeof val === "string") {
    return val.toUpperCase();
  }
  else {
    return idx;
  }
});
// [0, 1, "FOO", 3]

// Both `of(..)` and `from(..)` use the constructor that they're accessed from to construct the array
MyCoolArray.from([1, 2]) instanceof MyCoolArray; // true

// `copyWithin(..)` prototype method
// Copies a portion of an array to another location in the same array
// Arguments: (target, start, [end])
[1, 2, 3, 4, 5].copyWithin(3, 0); // [1, 2, 3, 1, 2]
[1, 2, 3, 4, 5].copyWithin(3, 0, 1); // [1, 2, 3, 1, 5]

// `fill(..)` prototype method
var a = Array(4).fill(undefined);
a; // [undefined, undefined, undefined, undefined]

// Also takes an optional start and end parameters

// `find(..)` prototype method
// Looks through an array with a callback method, if it finds it, it returns it
var a = [1, 2, 3, 4, 5];
a.find(function matcher(v) {
  return v == "2";
});
// 2

a.find(function matcher(v) {
  return v == 7;
});
// undefined

// Custom matcher
var points = [
  {x: 10, y: 20},
  {x: 20, y: 30},
  {x: 30, y: 40},
  {x: 40, y: 50},
  {x: 50, y: 60}
];
points.find(function matcher(point) {
  return (
    point.x % 3 == 0 &&
    point.y % 4 == 0
  )
}); // {x: 30, y: 40}

// `findIndex(..)` prototype method
// Finds index and returns it, if not found, returns -1
points.findIndex(function matcher(point) {
  return (
    point.x % 3 == 0 &&
    point.y % 4 == 0
  )
}); // 2

// `entries(..)`, `values(..)`, `keys(..)` prototype methods also work on tranditional arrays

/**
 * Object
*/

// `Object.is(..)` static function
// Strict equality comparison and useful for strictly identifying `NaN` and `-0` value
Object.is(3, 3); // true

// `Object.getOwnPropertySymbols(..)` static function
// Useful for looking for Symbols

// `Object.setPrototypeOf(..)`
// Sets prototype of an object (first agument) for the purpose of behavior delegation to a prototype (second argument)
var o1 = {
  foo() {console.log("foo");}
}
var o2 = {
  // ... o2's definition
}
Object.setPrototypeOf(o2, o1);
o2.foo(); // "foo"

// `Object.assign(..)`
// First argument => target, and any other arguments are sources
// Copies by plain `=` assignment and returns the target object, only enumerable and own keys
var target = {},
        o1 = {a:1}, o2 = {b: 2},
        o3 = {c: 3}, o4 = {d: 4};

// Set-up read-only property
Object.defineProperty(o3, "e", {
  value: 5,
  enumerable: true,
  writable: false,
  configurable: false
});
// Set-up non-enumerable property
Object.defineProperty(o3, "f", {
  value: 6,
  enumerable: false
});
o3[Symbol("g")] = 7;
// Set-up non-enumerable symbol
Object.defineProperty(o3, Symbol("h"), {
  value: 8,
  enumerable: false
});
Object.setPrototypeOf(o3, o4);

// Only the properties of `a`, `b`, `c`, `e`, and `Symbol("g")` will be copied to `target`:
Object.assign(target, o1, o2, o3);
target.a; // 1
target.b; // 2
target.c; // 3
Object.getOwnPropertyDescriptor(target, "e");
// {value: 5, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertySymbols(target);
// [Symbol("g")]

/**
 * Strings
*/

// `repeat(..)` repeats a string
"foo".repeat(3); // "foofoofoo"

// String inspection functions:
var palindrome = "step on no pets";

// `startsWith(..)`
palindrome.startsWith("step on"); // true
palindrome.startsWith("on", 5); // true

// `endsWith(..)`
palindrome.endsWith("no pets"); // true
palindrome.endsWith("no", 10); // true

// `includes(..)`
palindrome.includes("on"); // true
palindrome.includes("on", 6); // false