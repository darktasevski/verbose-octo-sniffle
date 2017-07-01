/**
 * Chapter 4: Coercion
 */

// JSON stringification:
// If an object has a value that has a toJSON() method defined, this will be called first to get a value to use for serialization:
// This is used if you intend to JSON stringifiy an object that may contain illegal JSON values, such as: undefined, function, and symbol values

var a = {
  val: [1, 2, 3],
  b: [4, 5, 6],
  toJSON: function() {
    return this.val.slice(1);
  }
};

JSON.stringify(a); // "[2, 3]"

// JSON.stringify(..) second argument is a 'replacer'
// If it is an array (must be an array of strings), each element must specify a property name to be included in the serialization of the object
// If it is a function, it will be called once on the object itself, and then for each property in the object, each time passed two arguments: key and value

var a = {
  b: 42,
  c: "42",
  d: [1, 2, 3]
};

JSON.stringify(a, ["b", "c"]); // "{"b":42, "c":"42"}"

JSON.stringify(a, function(k, v) {
  if (k !== "c") {
    return v;
  }
}); // "{"b":42, "d":[1, 2 ,3]}"

// ToNumber coercion:
// 'true' becomes 1
// 'false' becomes 0
// 'undefined' becomes NaN
// 'null' becomes 0

// Falsy values when coerced to a boolean value (everything else is considered truthy)
undefined
null
false
+0
-0
NaN
""

// Explicit coercion:
var a = 42;
var b = String(a);
var c = "3.14";
var d = Number(c);
b; // "42"
d; // 3.14

// Other ways to do explicit conversion:
var b = a.toString();
var d = +c; // unary operator
b; // "42"
d; // 3.14

// Three ways to get timestamp:
var timestamp = +new Date();
var timestamp = new Date().getTime();
var timestamp = Date.now();

// Using bitwise | (OR) operator to coerce into signed 32-bit operator:
0 | -0; // 0
0 | NaN; // 0
0 | Infinity; // 0

// Using bitwise ~ operator first "coerces" to a 32-bit number value, then performs a bitwise negation (flipping each bit's parity), equivalent to -(x+1):
~42; // (-42+1) ==> -43

// This can be handy to produce a falsy value 0 for the -1 input value (a sentinel value):
~-1; // 0

// Can be used with .indexOf() which returns -1 if it does not find something:
var a = "Hello World";
~a.indexOf("lo"); // -4 <-- truthy!
~a.indexOf("ol"); // 0 <-- falsy

// parseInt(), stops parsing left-to-right when encountering non-numeric characters
var a = "42px";
parseInt(a); // 42 

/**
 * Implicit coercion
 */

// If either operand to + is a string, the operation will be string concatenation
var a = 42;
var b = a + "";
b; // "42"

// Coercion to number can occur by using the - operator, as it is only defined for numeric subtraction, so:
a - 0;
// forces a's value to be coerced to a number. This can also be done using:
a * 1;
a / 1;

// Function that returns true only if exactly one argument is true. Implicit coercion where coercing the boolean values to numbers (0 => false, 1 => true):
function onlyOne() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    // skip falsy values, such as NaN
    if (arguments[i]) {
      // Implicit coercion whereby 'true' is coerced into `1`
      sum += arguments[i];
    }
  }
  return sum === 1;
}
var a = true;
var b = false;
onlyOne(b, a); // true
onlyOne(b, a, b, b); // true
onlyOne(b, b); // false
onlyOne(b, a, b, b, a); // false

// Logical operators || and &&
var a = 42;
var b = "abc";
var c = null;
a || b; // 42 <== || selects left operand if both are true
a && b; // "abc" <== && selects right operand if both are true
c || b;  // "abc"
c && b; // null

// Common uses:
function foo(a, b) {
  a = a || "hello";
  b = b || "world";

  console.log(a + " " + b);
}
foo(); // "hello world"
foo("yeah", "yeah"); // "yeah, yeah"

// Guard operator
function foo() {
  console.log(a);
}
var a = 42;
// The && operator selects the second operand if and only if the first operand tests as truthy
a && foo(); // 42

// null and undefined
// When used with loose equality (==), null and undefined will implicity coerce to each other:
var a = null;
var b;
a == b; // true
a == null; // true
b == null; // true

// Relational comparison
var a = [42];
var b = "043";
a < b; // false -- string comparison
Number(a) < Number(b) // true -- number comparison