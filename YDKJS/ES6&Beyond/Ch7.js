/**
 * Meta Programming
*/

/**
 * Functions
*/
// Lexical binding name is used in recursion
function foo(i) {
  if (i < 10) return foo(i * 2);
  return i;
}

// `new.target`
// Used inside a constructor call
// Refers to the target constructor that `new` invoked
class Parent {
  constructor() {
    if (new.target === Parent) {
      console.log("Parent instantiated");
    }
    else {
      console.log("A child instantianted");
    }
  }
}
class Child extends Parent {}

var a = new Parent(); // Parent instantiated
var b = new Child(); // A child instantiated

/**
 * Well Known Symbols (WKS)
*/
// Symbol.iterator the special location on an object where the language mechanisms automatically look to find a method that will construct an iterator instance
var arr = [4, 5, 6, 7, 8, 9]
for (var v of arr) {
  console.log(v);
}
// 4 5 6 7 8 9

// Define iterator that only produces values from odd indexes
arr[Symbol.iterator] = function*() {
  var idx = 1;
  do {
    yield this[idx];
  } while ((idx += 2) < this.length);
}
// 5 7 9

// `Symbol.toStringTag` and `Symbol.hasInstance`
// Consider:
function Foo() {}
var a = new Foo();
a.toString(); // [object Object]
a instanceof Foo; // true

// Controlling the behavior:
function Foo(greeting) {
  this.greeting = greeting;
}

Foo.prototype[Symbol.toStringTag] = "Foo";
Object.defineProperty(Foo, Symbol.hasInstance, {
  value: function(inst) {
    return inst.greeting == "hello";
  }
})
var a = new Foo("hello"), b = new Foo("world");
b[Symbol.toString] = "cool";

a.toString(); // [object Foo]
String(b); // [object cool]

a instanceof Foo; // true
b instanceof Foo; // false

// `Symbol.species`
// Controls which constructor is used by built-in methods of a class that needs to spawn new instances
class Cool {
  // defer @@species to derived constructor
  static get [Symbol.species]() {return this;}

  again() {
    return new this.constructor[Symbol.species]();
  }
}
class Fun extends Cool {}
class Awesome extends Cool {
  // Force `@@species` to be parent constructor
  static get [Symbol.species]() {return Cool;}
}
var a = new Fun(), b = new Awesome, c = a.again(), d = b.again();
c instanceof Fun; // true
d instanceof Awesome // false
d instanceof Cool

// `Symbol.toPrimitive`
// Abstract coercion operation
var arr = [1, 2, 3, 4, 5];
arr + 10; // 1, 2, 3, 4, 510

// Provided with a hint of "string", "number", or "default" (which should be interpreted to "number")
arr[Symbol.toPrimitive] = function(hint) {
  if (hint == "default" || hint == "number") {
    // Sum all numbers
    return this.reduce(function(acc, curr) {
      return acc + curr;
    }, 0);
  }
};
arr + 10; 25 // Additive `+` operation has no hint ("default" is passed)

/**
 * Proxies
*/
// A special object that "wraps" another normal object. Register special handlers (aka traps) on the proxy object which are called when various operations are performed against the proxy. Handlers perform extra logic in addition to forwarding the operations
var obj = {a: 1},
    handlers = {
      get(target, key, context) {
        // Note: target === obj,
        // Context === pobj
        console.log("accessing: ", key);
        return Reflect.get(target, key, context);
      }
    },
    pobj = new Proxy(obj, handlers);

obj.a; // 1
pobj.a; // Accessing: a, 1

// Revocable proxies
var obj = {a: 1},
    handlers = {
      get(target, key, context) {
        console.log("accessing: ", key);
        return target[key];
      }
    },
    // Object destructuring : Proxy.revocable returns object with two properties => `proxy` and `revoke` which are assigned to `pobj` and `prevoke`
    {proxy: pobj, revoke: prevoke} = Proxy.revocable(obj, handlers);

pobj.a; // accessing: a // 1
prevoke();
pobj.a; // TypeError

// Using Proxies
var messages = [],
    handlers = {
      get(target, key) {
        // String value?
        if (typeof target[key] == "string") {
          // filter out punctuation
          return target[key].replace(/[^\w]/g, "");
        }
        // Pass everything else through
        return target[key];
      },
      set(target,key,val) {
        // Only set unique strings, lowercased
        if (typeof val == "string") {
          val = val.toLowerCase();
          if (target.indexOf(val) == -1) {
            target.push(val);
          }
        }
        return true;
      }
    },
    messages_proxy = new Proxy(messages, handlers);

messages_proxy.push("heLLo...", 42, "wOrlD!!", "woRld!!");
messages_proxy.forEach(function(val) {
  console.log(val);
});
// hello world
messages.forEach(function(val) {
  console.log(val);
});
// heLLo... 42 wOrlD!! woRlD!!

/**
 * Reflect API
*/
// Holds static functions which correspond to various meta programming tasks 
// Correspond one-to-one with the handler methods (traps) that Proxies can define
// Behave the same as their `Object.*` counterparts but Object.* counterparts attempt to coerce to an object. Reflect throws an error

/**
 * Property Ordering
*/
// 1. Enumerate any owned properties that are integer indexes, in ascending numeric order
// 2. Enumerate the rest of the owned string property names in creation order
// 3. Enumerate owned symbol properties in creation order

/**
 * Feature Testing
*/
// Checking for syntax-related features:
try {
  new Function( "( () => {} )");
  ARROW_FUNCS_ENABLED = true;
}
catch (err) {
  ARROW_FUNCS_ENABLED = false;
}

/**
 * Tail Call Optimization
*/
// Only available in `strict` mode
// A tail call is a return statement with a function call ONLY
"use strict";
function foo(x) {
  return x * 2;
}
function bar(x) {
  // NOT a tail call
  return 1 + foo(x);
}
bar(10); // 21

function bar(x) {
  x = x + 1;
  if (x > 10) {
    return foo(x);
  }
  else {
    return bar(x + 1);
  }
}