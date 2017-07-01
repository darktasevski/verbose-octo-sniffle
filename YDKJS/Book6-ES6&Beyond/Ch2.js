/**
 * Chapter 2: Syntax
*/

// Block-scoped declarations can be achieved using `let` and a pair of brackets: `{..}`
var a = 2;
{
  let a = 3;
  console.log(a); // 3
}
console.log(a); // 2

// `let`-declarations attach to the block scope but are not initialized until they appear in the block
{
  console.log(a); // undefined
  console.log(b); // ReferenceError!, also known as a Temporal Dead Zone (TDZ error)

  var a;
  let b;
}

// `typeof` behaves differently with TDZ variables:
{
  // `a` is not declared
  if (typeof a === "undefined") {
    console.log("cool");
  }

  // `b` is declared, but in its TDZ
  if (typeof b === "undefined") { // ReferenceError!
    // ...
  }
  // ..
  let b;
}

// `let` and `for` loops
// `let i` in the `for` header declares an `i` not just in the `for` loop itself, but it redeclares a new `i` for each iteration of the loop
var funcs = [];
for (let i = 0; i < 5; i++) {
  funcs.push(function() {
    console.log(i);
  });
}
// This allows for closures created inside the loop iteration to close over the per-iteration variables
funcs[3](); // 3

// If the `for` loop was done with `var i` instead, the `funcs[3]()` would get a value of 5 because there would only be one `i` in the outer scope that was closed over

// `const` declaration`
// A block-scoped declaration that is *read-only* after its initial value is set
{
  const a = 2;
  console.log(a); // 2
  a = 3; // TypeError!
}
// If declaring an object or an array, the contents of the value can still be modified:
{
  const a = [1, 2, 3];
  a.push(4);
  console.log(a); // [1, 2, 3, 4]
  a = 42; // TypeError!
}

// Block-scoped functions:
{
  foo(); // Hoisted, works!
  function foo() {
    // ...
  }
}
foo(); // ReferenceError

// Spread/Rest operator `...`
function foo(x, y, z) {
  console.log(x, y, z);
}
foo(...[1, 2, 3]); // 1 2 3

// When `...` is used in front of an array (or any iterable), it acts to "spread" it out into its individual values
// Simpler syntactic replacement for `apply(..)`
foo.apply(null, [1, 2, 3]); // 1 2 3

// Other usages:
var a = [2, 3, 4];
var b = [1, ...a, 5];
console.log(b); // [1, 2, 3, 4, 5]

// Gathering values into an array:
function foo(x, y, ...z) { // Gather rest of arguments into an array called `z`
  console.log(x, y, z);
}
foo(1, 2, 3, 4, 5); // 1 2 [3, 4, 5]

// If no named paramaters:
function foo(...args) {
  console.log(args);
}
foo(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]

// New ES6 way:
function foo(...args) {
  // `args` is already a real array
  // discard first element in `args`
  args.shift();

  // Pass along all of `args` as arguments to console.log(..)
  console.log(...args);
}

/**
 * Default Parameter Values
*/
function foo(x, y) {
  x = x || 11;
  y = y || 31;
  console.log(x + y);
}
foo(); // 42
foo(5, 6); // 11
foo(5); // 36
foo(null, 6); // 17

// `0` is falsy, and so the `x || 11` results in 11, not the directly passed in `0`
foo(0, 42); // 53 

// Using ES6:
function foo(x = 11, y = 31) { // Default values
  console.log(x + y); 
}
foo(); // 42
foo(5, 6); // 11
foo(0, 42); // 42
foo(5); // 36
foo(5, undefined); // 36, `undefined` is missing
foo(5, null); // 5, `null` coerces to `0`
foo(undefined, 6); // 17, `undefined` is missing
foo(null, 6); // 17, `null` coerces to `0`

/**
 * Default Value Expressions 
*/
function bar(val) {
  console.log("bar called!");
  return y + val;
}
function foo(x = y + 3, z = bar(x)) {
  console.log(x, z);
}
var y = 5;
foo(); // "bar called", // 8 13
foo(10); // "bar called", // 10 15

y = 6;
foo(undefined, 10); // 9 10

// Formal parameters in a function declaration are in their own scope, not in the function body's scope
var w = 1, z = 2;
function foo(x = w + 1, y = x + 1, z = z + 1) {
  // This will error because it finds `z` in the paramater, but as not yet initialized at that moment
  console.log(x, y, z);
}
foo(); // ReferenceError

// Inline function expression is also possible as a default value expression:
function foo(x = 
  (function(v) {return v + 11;})(31)
) {
    console.log(x);
}
foo(); // 42

// No-op empty function calls if not otherwise specified
function ajax(url, cb = function() {}) {
  // ...
}
ajax("http://some.url.1");

/**
 * Destructuring
*/
// Instead of:
function foo() {
  return [1, 2, 3];
}
var temp = foo(),
  a = tmp[0], b = tmp[1], c = tmp[2];
console.log(a, b, c); // 1 2 3

function bar() {
  return {
    x: 4,
    y: 5, 
    z: 6
  };
}
var tmp = bar(),
  x = tmp.x, y = tmp.y, z = tmp.z;
console.log(x, y, z); // 4 5 6

// Array and object destructuring:
var [a, b, c] = foo();
var {x: x, y: y, z: z} = bar();

console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 6

// If property name being matched (of object) is the same as the variable you want to declare, shorthand syntax (leaves off `x:`): 
var {x, y, z} = bar();
console.log(x, y, z); // 4 5 6

// Assign to different name:
// Inverts the object's {target: source} into {source: target}
var {x: bam, y: baz, z: bap } = bar();
console.log(bam, baz, bap); // 4 5 6
console.log(x, y, z); // ReferenceError

// Consider:
var aa = 10, bb = 20;
var o = {x: aa, y: bb}; // {target: source}
var     {x: AA, y: BB} = o; // {source: target}
console.log(AA, BB); // 10 20

// Not just declarations:
var a, b, c, x, y, z;
[a, b, c] = foo();
({x, y, z} = bar()); // `(..)` is required because `{..}` on the lefthand side as the first element is taken to be a block statement instead of an object
console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 6

// Any valid assignment expression is allowed:
var o = {};
[o.a, o.b, o.c] = foo();
({x: o.x, y: o.y, z: o.z}) = bar();
console.log(o.a, o.b, o.c); // 1 2 3
console.log(o.x, o.y, o.z); // 4 5 6

// Using computed property expressions:
var which = "x",
        o = {};
( { [which]: o[which] } = bar() );
console.log(o.x); // 4

// Object mapping:
var o1 = {a: 1, b: 2, c: 3},
    o2 = {};
({a: o2.x, b: o2.y, c: o2.z} = o1);
console.log(o2); // {x: 1, y: 2, z: 3}

// Map an object to an array:
var o1 = {a: 1, b: 2, c: 3},
    a2 = [];
({a: a2[0], b: a2[1], c: a2[2]} = o1);
console.log(a2); // [1, 2, 3]

// Or other way around:
var a1 = [1, 2, 3],
    o2 = {};
[o2.a, o2.b, o2.c] = a1;
console.log(o2); // {a: 1, b: 2, c: 3}

// Or reorder one array to another:
var a1 = [1, 2, 3],
    a2 = [];
[a2[2], a2[0], a2[1]] = a1;
console.log(a2); // [2, 3, 1]

// Swap two variables:
var x = 10, y = 20;
[y, x] = [x, y];
console.log(x, y); // 20 10

// Repeated Assignments:
var {a: X, a: Y} = {a: 1};
X; // 1
Y; // 1

var {a: {x: X, x: Y}, a} = {a: {x: 1}};
X; // 1
Y; // 1
a; // {x: 1}

({a: X, a: Y, a: [Z]} = {a: [1]});
X.push(2);
Y[0] = 10;
X; // [10, 2]
Y; // [10, 2] 
Z; // 1

// Spread destructuring assignments over multiple lines:
// Harder to read:
var {a: {b: [c, d], e: {f}}, g} = obj;
// Better:
var {
  a: {
    b: [c, d],
    e: {f}
  },
  g
} = obj;

// Destructuring assignment expressions:
// The assignment expression with object or array destructuring has as its completion value the full righthand object/array value
// Objects
var o = {a: 1, b: 2, c: 3},
        a, b, c, p;
p = {a, b, c} = o;

console.log(a, b, c); // 1 2 3
p === o; // true (`p` was assigned the `o` object reference)

// Arrays
var o = [1, 2, 3],
        a, b, c, p;
p = [a, b, c] = o;
console.log(a, b, c); // 1 2 3
p === o; // true (`p` was assigned the `o` array reference)

// Chaining
var o = {a: 1, b: 2, c: 3},
        p = [4, 5, 6],
        a, b, c, x, y, z;

({a} = {b, c} = o);
[x, y] = [z] = p;
console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 4

// Not all values need to be assigned:
var [,b] = foo();
var {x, z} = bar();
console.log(b, x, z); // 2 4 6

// Fallback to `undefined` if too many values are assigned
var [,,c,d] = foo();
var {w, z} = bar();
console.log(c, z); // 3 6
console.log(d, w); // undefined undefined

// Gathering behavior of spread operator:
var a = [2, 3, 4];
var [b, ...c] = a; // `...c` gathers rest of values into an array and calls it `c`
console.log(b, c); // 2 [3, 4]

// Default value assignment:
var [a = 3, b = 6, c = 9, d = 12] = foo();
var {x = 5, y = 10, z = 15, w = 20} = bar();
console.log(a, b, c, d); // 1 2 3 12
console.log(x, y, z, w); // 4 5 6 20

// Combining default value assignment with alternative assignment expression:
var {x, y, z, w: WW = 20} = bar();
console.log(x, y, z, WW); // 4 5 6 20

// Nested destructuring:
var a1 = [1, [2, 3, 4], 5];
var o1 = {x: {y: {z: 6}}};

var [a, [b, c, d], e] = a1;
var {x: {y: {z: w}}};
console.log(a, b, c, d, e); // 1 2 3 4 5 
console.log(w); // 6

// Flatten out object namespaces
var App = {
  model: {
    User: function(){console.log("Hello world!");}
  }
};
// Instead of:
// var User = App.model.User
var {model: {User}} = App;
console.log(User()); // "Hello world!"

// Destructuring parameters:
function foo([x, y]) {
  console.log(x, y);
}
foo([1, 2]); // 1 2
foo([1]); // 1 undefined
foo([]); // undefined undefined

function foo({x, y}) {
  console.log(x, y);
}
foo({y: 1, x: 2}); // 2 1
foo({y: 42}); // undefined 42
foo({}); // undefined undefined

// Rest operator parameter destructuring:
function f3([x, y, ...z], ...w) {
  console.log(x, y, z, w);
}
f3([]); // undefined undefined [] []
f3([1, 2, 3, 4], 5, 6); // 1 2 [3, 4] [5, 6]

// Destructuring defaults and parameter defaults:
function f6({x = 10} = {}, {y} = {y: 10}) {
  console.log(x, y);
}
f6(); // 10 10

// Consider:
f6({}, {}); // 10 undefined
// This occurs because for `x` it looks at the object, and it passes in a default `x = 10` assignment to `x` into the new object
// However, for `y`, the default parameter IS `{y: 10}`. But since `{}` was passed in, it does not take the default `{y: 10}` and instead `y` becomes `undefined` in the empty object

// Destructuring nested objects:
// Consider:
var defaults = {
  options: {
    remove: true,
    enable: false,
    instance: {}
  },
  log: {
    warn: true,
    error: true
  }
};
// `config` object with some properties applied, but not all, set the rest to defaults in the missing spots
var config = {
  options: {
    remove: false,
    instance: null
  }
}
// Using destructuring:
config.options = config.options || {};
config.log = config.log || {};
({
  options: {
    remove: config.options.remove = defaults.options.remove,
    enable: config.options.enable = defaults.options.enable,
    instance: config.options.instance = defaults.options.instance
  } = {},
  log: {
    warn: config.log.warn = defaults.log.warn,
    error: config.log.error = defaults.log.error
  } = {}
} = config);

// Another way to do it:
// Merge `defaults` into `config`
{
  // Destructure (with default value assignments)
  let {
    options: {
      remove = defaults.options.remove,
      enable = defaults.options.enable,
      instance = defaults.options.instance
    } = {}, // If `options` is not available, create an empty object called `options`, and assign the properties on it
    log: {
      warn = defaults.log.warn,
      error = defaults.log.error
    } = {}
  } = config; // Set those properties equal to the `config` properties

  // Restructure
  config = {
    options: {remove, enable, instance}, // Make the `config` object have those properties
    log: {warn, error}
  };
}

/**
 * Object Literal Extensions
*/
// Consider:
var x = 2, y = 3,
    o = {
      x: x,
      y: y
    };

// Can be re-written as:
var x = 2, y = 3,
    o = {
      x,
      y
    };

// Concise methods:
var o = {
  x: function() { // Old way
    // ...
  },
  y() {           // Concise ES6 way
    // ...
  },
  *foo() {        // Generators as well
    // ...
  }
};

// Issues regarding self-reference:
// Consider:
function runSomething(o) {
  var x = Math.random(), y = Math.random();
  return o.something(x, y);
}
runSomething({
  something: function something(x, y) { // The function name is needed here for self-reference
    if (x > y) {
      // Recursively call with `x` and `y` swapped
      return something(x, y); // Self-referential
    }
    return y - x;
  }
})

// It is not possible to refactor this into ES6 like so:
runSomething({
  something(x,y) {
    // ...
  }
})
// This will be interpreted as:
runSomething({
  something: function(x,y) { // Concise methods imply anonymous function expressions
    return something(y, x); // This will NOT be called (ReferenceError)
  }
}); 

// ES5 Getters and Setters:
var o = {
  __id: 10,
  get id() {return this.__id++;},
  set id(v) {this.__id = v}
}
o.id; // 10
o.id; // 11
o.id = 20;
o.id; // 20
// and:
o.__id; // 21
o.__id; // 21

/**
 * Computer Property Names
*/
var prefix = "user_";
var o = {
  baz: function() {
    // ...
  },
  [prefix + "foo"]: function() { // Computer property name
    // ...
  },
  [prefix + "bar"]: function() {
    // ...
  }
}

// Most common usage will be with `Symbol`:
var o = {
  [Symbol.toStringTag]: "really cool thing"
}

// Can also appear as the name of a concise method or generator:
var o = {
  ["f" + "oo"]() { // Computed concise method
    // ...
  },
  *["b" + "ar"]() { // Computed concise generator
    // ... 
  }
}

// Setting `[[Prototype]]`
var o1 = {
  // ...
};
// Do not do this:
var o2 = {
  __proto__: o1, // Prototype-link to `o1`
  // ...
}
// Do this instead:
var o2 = {
  // ...
}
Object.setPrototypeOf(o2, o1);

// Object `super` 
// Only allowed in concise methods!
var o1 = {
  foo() {
    console.log("o1: foo");
  }
};
var o2 = {
  foo() {
    super.foo(); // Basically saying: `Object.getPrototypeOf(o2)`
    console.log("o2: foo");
  }
};
Object.setPrototypeOf(o2, o1); // Prototype-link `o2` to `o1` so that `super` looks at prototype
o2.foo(); // o1: foo
          // o2: foo

/**
 * Template Literals
*/
var name = "Aos";
var greeting = `Hello ${name}!`;
console.log(greeting); // "Hello Aos!"
console.log(typeof greeting); // "string"

// Allow to split across multiple lines:
var text =
`Now is the time for all good men
to come to the aid of the of their
country!`;
console.log(text);
// Now is the time for all good men
// to come to the aid of their
// country!

// Function calls, inline function expression calls, or other template literals can appear inside `${..}`
function upper(s) {
  return s.toUpperCase();
}
var who = "reader";
var text = 
`A very ${upper("warm")} welcome
to all of you ${upper(`${who}s`)}!`;
console.log(text);
// "A very WARM welcome
// to all of you READERS!"

// Template literals are block scoped!
function foo(str) {
  var name = "foo";
  console.log(str);
}
function bar() {
  var name = "bar";
  foo(`Hello from ${name}!`);
}
var name = "global";
bar(); // "Hello from bar!"

////////////////////////////
// Tagged Template Literals

function foo(strings, ...values) {
  // First argument is all the plain strings (gathered in an array)
  console.log(strings);
  // All subsequent arguments of the already-evaluated interpolation expressions found in the string literal
  console.log(values);
}
var desc = "awesome";
// `foo` is the *tag*
foo`Everything is ${desc}!`; 
// ["Everything is ", "!"]
// ["awesome"]

function tag(strings, ...values) {
  return strings.reduce(function(s, v, idx) {
    return s + (idx > 0 ? values[idx - 1]: "") + v;
  }, "");
}
var desc = "awesome";
var text = tag`Everything is ${desc}!`;
console.log(text); // Everything is awesome

// Format numbers as US dollars
function dollabillsyall(strings, ...values) {
  return strings.reduce(function(s, v, idx) {
    if (idx > 0) {
      if (typeof values[idx - 1] == "number") {
        // look, also using template string literals
        s += `$${values[idx - 1].toFixed(2)}`;
      }
      else {
        s += values[idx - 1];
      }
    }
    return s + v;
  }, "");
}

// Raw strings (Can also be done using String.raw`..`
function showraw(strings, ...values) {
  console.log(strings);
  console.log(strings.raw);
}
showraw`Hello\nWorld`;
// ["Hello
// World"]
// ["Hello\nWorld"]

/**
 * Arrow Functions
*/
function foo(x, y) {
  return x + y;
}
// Using arrow function
var foo2 = (x, y) => x + y; // Implied `return` if only one expression and `{..}` is omitted

var f3Again = (x, y) => {
  var z = x * 2 + y;
  y++;
  x *= 3;
  return (x + y + z) / 2;
}

// `this` binding and arrow functions:
// Consider:
var controller = {
  makeRequest: function() {
    var self = this;
    btn.addEventListener("click", function() {
      // ...
      self.makeRequest();
    }, false);
  }
};
// Using arrow function instead (`this` is now lexically bound to `controller`, the surrounding scope)
var controller = {
  makeRequest: function() {
    btn.addEventListener("click", () => {
      // ...
      this.makeRequest();
    }, false);
  }
};

// However it would not work here:
var controller = {
  makeRequest: () => {
    // ...
    this.helper(); // Here lexical `this` inherits the surrounding scope, aka the global object
  }
}

/**
 * `for..of` Loops
*/
// Loops over the set of values produced by an iterator
// The value looped over with `for..of` must be an iterable, or can be coerced/boxed to an object that is an iterable
var a = ["a", "b", "c", "d", "e"];
for (var idx in a) { // Loop over indexes
  console.log(idx);
}
// 0 1 2 3 4

for (var val of a) { // Loop over values
  console.log(val);
}
// "a" "b" "c" "d" "e"

// `for..of` asks the iterable for an iterator (using built-in `Symbol.iterator`), then repeatedly calls iterator and assigns its produced value to the loop iteration variable

// In `for (XYZ of ABC)` the `XYZ` clause can either be an assignment expression or a declaration:
var o = {};
for (o.a of [1, 2, 3]) {
  console.log(o.a);
}
// 1 2 3

for ({x: o.a} of [{x: 1}, {x: 2}, {x: 3}]) {
  console.log(o.a);
}
// 1 2 3

/**
 * Regular Expressions
*/
// The `u` flag tells a regular expression to process a string with the interpretation of Unicode characters
// `^.` means match only a single character at the beginning
/^.-clef/ .test( "𝄞-clef" ); // false
/^.-clef/u.test( "𝄞-clef" ); // true

// Sticky flag `y`
var re1 = /foo/,
    str = "++foo++";

// Consider:
re1.lastIndex; // 0
re1.test(str); // true
re1.lastIndex; // 0 -- not updated

re1.lastIndex = 4;
re1.test(str); // true -- ignored `lastIndex`
re1.lastIndex; // 4 -- not updated

// Sticky mode
var re2 = /foo/y,
    str = "++foo++";

re2.lastIndex; // 0
re2.test(str); // false -- "foo" not found at `0`
re2.lastIndex; // 0

re2.lastIndex = 2;
re2.test(str); // true
re2.lastIndex; // 5 -- updated after previous match

re2.test(str); // false
re2.lastIndex; // 0 -- reset after previous match failure

// RegExp flags
// flags property
var re = /foo/ig;
re.flags; // "gi"

// Flags aware RegExp(..)
var re1 = /foo*/y;
re1.source; // "foo*"
re1.flags; // "y"

var re2 = new RegExp(re1);
re2.source; // "foo*"
re2.flags; "y"

var re3 = new RegExp(re1, "ig");
re3.source; // "foo*"
re3.flags; // "gi"

/**
 * Symbols
*/
var sym = Symbol("some optional description");
typeof sym; // "symbol"

// Do not use `new`
// Parameter pased to `Symbol(..)` is optional

// Description is solely used for the stringification representation of the symbol:
sym.toString(); // "Symbol(some optional description)"

sym instanceof Symbol; // false

// The main point of a symbol is to create a string-like value that can't collide with any other value
// Ex: as a constant representing an event name:
const EVT_LOGIN = Symbol("event.login");
evt.hub.listen(EVT_LOGIN, function(data) {
  // ...
})
// EVT_LOGIN cannot be deuplicated by any other value

// Singleton pattern behavior -- only allows itself to be created once:
const INSTANCE = Symbol("instance");
function HappyFace() {
  if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];

    function smile() {}

    return HappyFace[INSTANCE] = {
      smile: smile
    };
}
var me = HappyFace(),
    you = HappyFace();

me === you; // true

// Global symbol registry (aids in organizing code with access to these symbols)

const EVT_LOGIN1 = Symbol.for("event.login");
console.log(EVT_LOGIN1); // Symbol(event.login)
// Also:
function HappyFace() {
  const INSTANCE1 = Symbol.for("instance");
  if (HappyFace[INSTANCE1]) return HappyFace[INSTANCE1];
  // ...
  return HappyFace[INSTANCE1] = {};
}

// `Symbol.for(..)` looks in the global symbol registry to see if a symbol is already stored with the provided description text, and returns it if so. If not, creates one to return

// Retrieve a registered symbol's description text (key) using `Symbol.keyFor(..)`:
var s = Symbol.for("something cool");
var desc = Symbol.keyFor(s);
console.log(desc); // "something cool"

// Get the symbol from the registry again
var s2 = Symbol.for(desc);
s2 === s; // true

// Symbol as object properties
// Does not show up in a normal enumeration
var o = {
  foo: 42, 
  [Symbol("bar")]: "hello world",
  baz: true
};
Object.getOwnPropertyNames(o); // ["foo", "baz"]

// To retrieve an object's symbol properties
Object.getOwnPropertySymbols(o); // [Symbol(bar)]

// Built-in symbols
var a = [1, 2, 3];
a[Symbol.iterator]; // native function