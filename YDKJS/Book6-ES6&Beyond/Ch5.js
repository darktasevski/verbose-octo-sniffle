/**
 * Chapter 5: Collections
*/

/**
 * TypedArrays
*/

// Construct a bit-bucket - called a "buffer"
var buf = new ArrayBuffer(32);
buf.byteLength; // 32

// `buf` is a binary buffer that is 32-bytes long (256-bits), pre-initialized to all 0s

// Layer a "view" which comes in the form of a typed array:
var arr = new Uint16Array(buf);
arr.length; // 16
// `arr` is a typed array of 16-bit unsigned integers mapped over the 256-bit `buf` buffer, meaning you get 16 elements (16 x 16 = 256)

// Endianness
// If the low-order byte (collection of 8-bits) of a multi-byte number is on the right or the left
// Big endian => low-order byte on the right
// Little endian => low-order byte on the left

// Test the endianness of my JS:
var littleEndian = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();

// Multiple Views (a single buffer can have multiple views attached):
var buf = new ArrayBuffer(2); // set # of bytes of array buffer

var view8 = new Uint8Array(buf); // 8-bit unsigned integers array mapped over 2 bytes (16 bits)
var view16 = new Uint16Array(buf);

view16[0] = 3085;
view8[0]; // 13
view8[1]; // 12
view8[0].toString(16); // "d"
view8[1].toString(16); // "c"

// Typed array sort (defaults to numeric sort comparisons instead of coercing values to strings like a normal array)
var a = [10, 1, 2];
a.sort(); // [1, 10, 2]

var b = new Uint8Array([10, 1, 2]);
b.sort(); // [1, 2, 10]

/**
 * Maps
*/

// Limitations of objects
var m = {};
var x = {id: 1}, y = {id: 2};
m[x] = "foo";
m[y] = "bar";
m[x]; // "bar"
m[y]; // "bar"
// This occurs because the two objects `x` and `y` both stringify to "[object Object]" so only that one key is being set in `m`

// Using `Map(..)`
var m = new Map();
var x = {id: 1}, y = {id: 2};

m.set(x, "foo");
m.set(y, "bar");

m.get(x); // "foo"
m.get(y); // "bar"

m.delete(y); // Deletes a property

m.set(x, "foo");
m.set(y, "bar");
m.size; // 2 (Gets the length of the map)

m.clear(); // Clears entire map's contents

// Map(..) instance is iterable
var m2 = new Map(m.entries());
// Same as:
var m2 = new Map(m);

// Manually specifiy an entries list:
var m = new Map([
  [x, "foo"],
  [y, "bar"]
]);

// Map Values
// Use `values(..)` which returns an iterator
var vals = [...m.values()];
vals; // ["foo", "bar"]
Array.from(m.values()); // ["foo", "bar"]

// Map Keys
// Use `keys()`
var keys = [...m.keys()];
keys[0] === x; // true
keys[1] === y; // true

// To determine if a map has a given key:
m.has(x); // true
m.has(y); // true
m.has(z); // false

// WeakMaps
// Take only objects as keys
// They are weakly held, which means if the object itself is garbage-collected, the entry in the WeakMap is also removed

/**
 * Sets
*/
// A collection of unique values (duplicates are ignored)
var s = new Set();
var x = {id: 1}, y = {id: 2};

s.add(x);
s.add(y);
s.add(x); // Not added as it's a duplicate

s.size; // 2

s.delete(y);
s.size; // 1
s.clear();
s.size; // 0

// Expects a values list
var s = new Set([x, y]);

// Test if a value is present using `has(..)`
var s = new Set();
var x = {id: 1}, y = {id: 2};
s.add(x);
s.has(x); // true
s.has(y); // false

// Set iterators
var keys = [...s.keys()],
    vals = [...s.values()],
    entries = [...s.entries()]; // yields a list of entry arrays

keys[0] === x; // true
vals[0] === x; // true
entries[0][0] === x; // true