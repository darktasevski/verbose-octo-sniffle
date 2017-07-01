/**
 * Chapter 3: Organization
*/

/**
 * Iterators
*/
// Iterator methods:
// `next()` iteration (on all built-in iterators)
var arr = [1, 2, 3];
var it = arr[Symbol.iterator]();

it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}

it.next(); // {value: undefined, done: true}

// Optional: `return()` and `throw()` (not implemented on most built-in iterators), no more results produced after being called

// `return()` => consuming code is complete and will not be pulling any more values from it
// `throw()` => used to signal an exception/error to an iterator

// Make an iterator an iterable by giving it a `Symbol.iterator` method that returns itself:
var it = {
  // make `it` iterator an iterable
  [Symbol.iterator]() {return this;},
  next() {/* ... */}
};
it[Symbol.iterator]() === it; // true

// Consume the `it` iterator with a `for..of` loop:
for (var v of it) {
  console.log(v);
}
// Under the hood:
// `it.next()` is called before each iteration, then checked again `res.done`
for (var v, res; (res = it.next()) && !res.done;) {
  v = res.value;
  console.log(v);
}

// Custom iterators (create a Fibonacci sequence):
var Fib = {
  [Symbol.iterator]() {
    var n1 = 1, n2 = 1;
    return {
      // Make the iterator an iterable
      [Symbol.iterator]() {return this;},
      next() {
        var current = n2;
        n2 = n1;
        n1 = n1 + current;
        return {value: current, done: false};
      },
      return(v) {
        console.log(
          "Fibonacci sequence abandoned."
        );
        return {value: v, done: true};
      }
    };
  }
};

for (var v of Fib) {
  console.log(v);
  if (v > 50) break;
}

// Iterator which runs through a series of actions one at a time
var tasks = {
  [Symbol.iterator]() {
    var steps = this.actions.slice();

    return {
      // Make the iterator an iterable
      [Symbol.iterator]() { return this;},

      next(...args) {
        if (steps.length > 0) {
          let res = steps.shift()(...args);
          return {value: res, done: false}
        }
        else {
          return {done: true}
        }
      },
      return(v) {
        steps.length = 0;
        return {value: v, done: true};
      }
    };
  },
  actions: []
};

// In action:
tasks.actions.push(
  function step1(x) {
    console.log("step 1:", x);
    return x * 2;
  },
  function step2(x, y) {
    console.log("step 2:", x, y);
    return x + (y * 2);
  },
  function step3(x, y, z) {
    console.log("step 3:", x, y, z);
    return (x * y) + z;
  }
);
var it = tasks[Symbol.iterator]();
it.next(10); // step 1: 10
              // {value: 20, done: false}
it.next(20, 50); // step 2: 20 50
                  // {value: 120, done: false}
it.next(20, 50, 120); // step 3: 20 50 120
                        // {value: 1120, done: false} 
it.next(); // {done: true}  

// Define an iterator for numbers that by default ranges from 0 up to the number in question
if (!Number.prototype[Symbol.iterator]) {
  Object.defineProperty(
    Number.prototype,
    Symbol.iterator,
    {
      writable: true,
      configurable: true,
      enumerable: false,
      value: function iterator() {
        var i, inc, done = false, top = +this;

        // Iterate positively or negatively?
        inc = 1 * (top < 0 ? -1 : 1);

        return {
          // Make the iterator itself an iterable
          [Symbol.iterator]() {return this;},
          next() {
            if (!done) {
              // Initial iteration always 0
              if (i == null) {
                i = 0;
              }
              // Iterate positively
              else if (top >= 0) {
                i = Math.min(top, i + inc);
              }
              // Iterate negatively
              else {
                i = Math.max(top, i + inc);
              }
              // Done after this iteration?
              if (i == top) done = true;
              return {value: i, done: false}
            }
            else {
              return {done: true};
            }
          }
        };
      }
    }
  );
}
// Test it out:
for (var i of 3) {
  console.log(i);
}                        
// 0 1 2 3
[...-3]; // [0, -1, -2, -3]

// Iterator Consumption
var a = [1, 2, 3, 4, 5];

// Using `...` spread operator
function foo(x, y, z, w, p) {
  console.log(x + y + z + w + p);
}
foo(...a); // 15

var b = [0, ...a, 6];
b; // [0, 1, 2, 3, 4, 5, 6]

// Using array destructuring
var it = a[Symbol.iterator]();
var [x, y] = it; // take just the first two elements from `it`
var [z, ...w] = it; // take the third, then the rest all at once

// Is `it` fully exhausted? Yep
it.next(); // {value: undefined, done: true}
x; // 1
y; // 2
z; // 3
w; // [4, 5]

/**
 * Generators!
*/

// Executing a generator doesn't actually run the code in the generator. Instead, it produces an iterator that will control the generator to execute its code
function *foo() {
  // ...
}
var it = foo();
// To start/advance `*foo()`, call `it.next(..)`

// `yield` (a pause point as well as an expression that sends out a value when pausing the generator)
function *foo() {
  while (true) {
    yield Math.random();
  }
}

// `yield` without a value is the same as `yield undefined`, but also receives (replaced by) the eventual resumption value:
function *foo() {
  var x = yield 10;
  console.log(x);
}
// This will first yield out the value 10 when paused, when resumed with `it.next()`, whatever value if any you resume with will replace/complete the whole `yield 10` expression, assigning the value to `x`

var a, b;
a = 3; // valid
// b = 2 + a = 3; <== invalid
b = 2 + (a = 3); // valid

yield 3; // valid
// a = 2 + yield 3; <== invalid
a = 2 + (yield 3);

// `yield` has low precedence, almost any expression after a `yield ..` will be computed first (only `...` spread operator and `,` comma operator have lower precedence):
yield 2 + 3; // same as `yield (2 + 3)`
(yield 2) + 3; // `yield 2` first, then `+ 3`

// It is also `right-associative`, multiple `yield` expressions in succession are treated as having `(..)` grouped from right to left

// `yield *` aka yield delegation
// Requires an iterable nad invokes that iterable's iterator, and delegates its own host generator's control to that iterator until it's exhausted
function *foo() {
  yield *[1, 2, 3];
}

// If defining a custom iterator, it is possible to design it a return value, which `yield *..` will capture:
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
function *bar() {
  var x = yield *foo(); // 4 is the completion value of this expression
  console.log("x:", x);
}
for (var v of bar()) {
  console.log(v);
}
// 1 2 3
// x: 4

// Generator recursion (because `yield *` can call another generator by way of delegating to its iterator):
function *foo(x) {
  if (x < 3) {
    x = yield *foo(x + 1);
  }
  return x * 2;
}
foo(1);

// A generator function reference by itself is not an iterable; it must be executed to get the iterator

// Value passed into `next(..)` completes whatever `yield ..` expression is currently paused waiting for a completion:
function *foo() {
  var x = yield 1;
  var y = yield 2;
  var z = yield 3;
  console.log(x, y, z);
}
var it = foo();
it.next(); // First call, up until first yield which sends message `1`, it is waiting for a value to be put in! 
// {value: 1, done: false}
it.next("foo"); // {value: 2, done: false}
// Now `x` has value "foo". But new question: what should I assign to value `y`?
it.next("bar"); // {value: 3, done: false}
it.next("baz"); // "foo" "bar" "baz"
                // {value: undefined, done: true}

// Early Completion (using `return(..)` or `throw(..)`)
function *foo() {
  yield 1;
  yield 2;
  yield 3;
}
var it = foo();
it.next(); // {value: 1, done: false}
it.return(42); // {value: 42, done: true}
it.next(); // {value: undefined, done: true}

/**
 * Modules
*/
// Old way:
function Hello(name) {
  function greeting() {
    console.log("Hello" + name + "!");
  }
  // public API
  return {
    greeting: greeting
  };
}
var me = Hello("Aos");
me.greeting(); // "Hello Aos!"

// If singleton:
var me = (function Hello(name) {
  function greeting() {
    console.log("Hello" + name + "!");
  }
  // Public API
  return {
    greeting: greeting
  };
})("Aos");
me.greeting(); // "Hello Aos!"

// ES6 modules
// 1. file-based modules (one module per file)
// 2. static - defined statically top-level exports, cannot be amended later
// 3. singletons - only one instance of the module, which maintains its state
// 4. exposed properties are actually bound (like pointers)

// The New Way (`import` and `export`)
export function foo() {
  // ...
}
export var awesome = 42;
var bar2 = [1, 2, 3];
export {bar};
export {foo, awesome, bar2} // Named exports, curly braces required

// Renaming (aka alias)
export {foo as bar3};

// If changing the value of a variable already imported, the imported binding will resolve to the current (updated) value
var awesome2 = 42;
export {awesome2};
// later
awesome2 = 100; // `awesome2` will now always resolve to `100`

// `default` , only a single default export per module, considered to be the "main" exported value since it will be the simplest to import
// Default exports are not named when they are imported, `default` is actually the exported name
function foo() {
  // ...
}
// export default foo; // exports as binding, if `foo` is later re-assigned to a different vaue inside the module, the module import still reveals the function originally exported, not the new value

// However:
function foo() {
  // ...
}
export {foo as default}; // Binding to the `foo` identifier, rather than its value

// `import`ing API members

// If importing certain specific named members of module's API into top-level scope:
import {foo, bar, baz} from "foo"; // "foo" is a module specifier

// Renaming the bound identifiers imported:
import {foo as theFooFunc} from "foo";
theFooFunc();

// If module has a default export that you want to import and bind
import foo2 from "foo"; 
// or:
import {default as foo3} from "foo";

// To import a module's default export and its two named exports:
import FOOFN, {bar2, baz as BAZ} from "foo";

// Namespace import:
// Consider a `"foo4"` module exported as:
export function bar() {}
export var x = 42;
export function baz() {}

// Import entire API to a single module namespace binding
import * as foo4 from "foo";
foo4.bar();
foo4.x; // 42
foo4.baz();

// With a `default` module export (named `default` in the import):
export default function foo() {}
export function baz() 
export function bar()

// `import`:
import foofn, * as hello from "world";
foofn(); // same as `hello.default()`
hello.default(); // same as `foofn()`
hello.bar();
hello.baz();

// All imported bindings are immutable and/or read-only. It is not possible to re-assign!
foofn = 42; // (runtime) TypeError!
hello.default = 42; // (runtime) TypeError!

// Module loading
// Loading modules outside of modules

// normal script loaded in browser via `<script>`
// `import` is illegal here
Reflect.Loader.import("foo") // returns a promise for `"foo"`
.then(function(foo) {
  foo.bar();
});
// This utility imports the entire module onto the named parameter (as a namespace) just like `import * as foo ..`

/**
 * Classes
*/
// `class` keyword identifies a block where the contents define the members of a function's prototype
class Foo {
  constructor(a, b) {
    this.x = a;
    this.y = b;
  }
  gimmeXY() {
    return this.x * this.y;
  }
}
var f = new Foo(5, 15); // must be made with `new`
f.x; // 5
f.y; // 15
f.gimmeXY(); // 75

class Bar extends Foo {
  constructor(a, b, c) {
    super(a, b); // `super` refers to the parent constructor
    this.z = c;
  }

  gimmeXYZ() {
    return super.gimmeXY() * this.z;
  }
}
var b = new Bar(5, 15, 25);
b.x; // 5
b.y; // 15
b.z; // 25
b.gimmeXYZ(); // 1875

// `extend`ing natives
class MyCoolArray extends Array {
  first() {return this[0];}
  last() {return this[this.length - 1];}
}
var a = new MyCoolArray(1, 2, 3);
a.length; // 3
a; // [1, 2, 3]
a.first(); // 1
a.last(); // 3

// Error
class Oops extends Error {
  constructor(reason) {
    super(reason);
    this.oops = reason; // be aware that `this` must happen AFTER `super(..)` call
  }
}
var ouch = new Oops("I messed up");
// throw ouch;

// `new.target`
// In normal functions: always `undefined`
// In constructors: points at the constructor that `new` actually directly invoked
class Foo2 {
  constructor() {
    console.log("Foo: ", new.target.name);
  }
}
class Bar2 extends Foo2 {
  constructor() {
    super();
    console.log("Bar: ", new.target.name);
  }
  baz() {
    console.log("baz: ", new.target);
  }
}
var a = new Foo2();
// Foo: Foo
var b = new Bar2();
// Foo: Bar <--- respects the `new` call-site
// Bar: Bar
b.baz();
// baz: undefined

// `static`
// `static` methods for a class are added directly to that class's function object, not to the function object's prototype object:
class Foo3 {
  static cool() {console.log("cool");}
  wow() {console.log("wow");}
}
class Bar3 extends Foo3 {
  static awesome() {
    super.cool();
    console.log("awesome");
  }
  neat() {
    super.wow();
    console.log("neat");
  }
}
Foo3.cool(); // "cool"
Bar3.cool(); // "cool"
Bar3.awesome(); // "cool"
                // "awesome"
var b = new Bar3();
b.neat(); // "wow"
          // "neat"
b.awesome; // undefined
b.cool; // undefined

// `static` useful in setting the `Symbol.species` getter for a derived (child) class, aka what constructor should be used
// Many methods on `Array` create and return a new `Array` instance. If I defined a derived class from `Array` but want those methods to continue to vend actual `Array` instances from the derived class:
class MyCoolArray2 extends Array {
  // force `species` to be parent constructor
  static get [Symbol.species]() {return Array;}
}
var a = new MyCoolArray2(1, 2, 3),
    b = a.map(function(v) {return v * 2;});

b instanceof MyCoolArray2; // false
b instanceof Array; // true