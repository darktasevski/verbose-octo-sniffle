/**
 * Chapter 4: Generators
 * 
 * Function that does not behave with "run-to-completion" behavior
*/

var x = 1;
// Construst generator function with *
function *foo() {
  x++;
  yield; // Pause!
  console.log("x:", x)
}
function bar() {
  x++;
}

// Construct an iterator `it` to control the generator, this does not ~execute~ the function
var it = foo();

// Start `foo()` here:
it.next();
x; // 2
bar();
x; // 3
it.next(); // x: 3

// Generators are still normal functions that can accept arguments and return an output:
function *foo(x, y) {
  return x * y;
}

// Create an iterator object and assign it to variable `it`
var it = foo(6, 7);
// `.next()` instructs the genetaor to advance from its current location, stopping either at the next yield or end of the generator
var res = it.next();
// The result of the `next()` call is an object with a value property on it holding what was returned from *foo(..)
res.value; // 42

// Iteration messaging
function *foo(x) {
  // Paused once it hits the yield and requests a value for the yield expression
  var y = x * (yield);
  return y;
}
var it = foo(6);

// Start `foo(..)`
it.next();
var result = it.next(7);
res.value; // 

// Yield can also send a message
function *foo(x) {
  var y = x * (yield "Hello!");
  return y;
}
var it = foo(6);
// First `next()` starts the generator
var res = it.next(); 
res.value; // "Hello!"
res = it.next(7); // Pass `7` to waiting `yield`
res.value; // 42

// Multiple instances of same generator
function *foo() {
  var x = yield 2;
  z++;
  var y = yield (x * z);
  console.log(x, y, z);
}
var z = 1;
// Create iterators
var it1 = foo();
var it2 = foo();
// Start generators, giving a value of 2 from yield
var val1 = it1.next().value; // 2 <-- `yield 2`
var val2 = it2.next().value; // 2 <-- `yield 2`
// Passing in value of `x`
val1 = it1.next(val2 * 10).value; // 40 <-- x: 20, z: 2
val2 = it2.next(val1 * 5).value;// 600 <-- x: 200, z: 3
// Passing in value of `y`
it1.next(val2 / 2); // y: 300 ==> 20 300 3
it2.next(val1 / 4); // y: 10 ==> 200 10 3

// Generator interleaving
var a = 1;
var b = 2;
function *foo() {
  a++;
  yield;
  b = b * a;
  a = (yield b) + 3;
}
function *bar() {
  b--;
  yield;
  a = (yield 8) + b;
  b = a * (yield 2);
}
// Helper `step(..)` function that controls an iterator
function step(gen) {
  // Initializes generator to create its `it` iterator
  var it = gen();
  var last;
  // When called, advances iterator by one step
  return function () {
    // Whatever is `yielded` out, just send it right back in next time
    last = it.next(last).value;
  }
}

/**
 * Iterators
*/
// Implementing an iterator interface:
var something = (function() {
  var nextVal;
  return {
    // Needed for `for..of` loops
    [Symbol.iterator]: function() {return this;},

    // Standard iterator interface method
    next: function() {
      if (nextVal === undefined) {
        nextVal = 1;
      }
      else {
        nextVal = (3 * nextVal) + 6;
      }
      return {done: false, value: nextVal};
    }
  };
})();
something.next().value; // 1
something.next().value; // 9
something.next().value; // 33
something.next().value; // 105

// Using the `for..of` loop:
for (var v of something) {
  console.log(v);
  // Don't let the loop run forever
  if (v > 500) {
    break;
  }
}
// 1 9 33 105 321 969

// ES6 also added default iterators for many built-in data structures in JS, such as arrays:
var a = [1, 3, 5, 7, 9];
for (var v of a) {
  console.log(v);
}
// 1 3 5 7 9

// Iterables:
// An iterable must have a function on it, with the name being `Symbol.iterator`. When this function is called, it returns an iterator:
var a = [1, 3, 5, 7, 9];
var it = a[Symbol.iterator]();
it.next().value; // 1
it.next().value; // 3
it.next().value; // 5

// Generator iterator
function *numbers() {
  var nextVal;
  while (true) {
    if (nextVal === undefined) {
      nextVal = 1;
    }
    else {
      nextVal = (3 * nextVal) + 6;
    }
    yield nextVal;
  }
}
// Looping over it:
for (var v of numbers()) { // Numbers was called here to get its its iterator for the for..of loop to work!
  console.log(v);
  // Break loop after a certain amount of times
  if (v > 500) {
    break;
  }
}

/**
 * Iterating generators asynchronously
*/
function foo(x,y) {
  ajax("http://some.url.1/?x=" + x + "&y=" + y,
    function(err, data) {
      if (err) {
        // throw an error into `*main()`
        it.throw(err);
      }
      else {
        // Resume `*main()` with received data
        it.next(data);
      }
    }
  );
}
function *main() {
  try {
    // `foo(..)` called on start up of generator, when `foo(..)` returns data, it will resume generator with the data, thereby assigning the data to `yield`
    var text = yield foo(11, 31);
    console.log(text);
  }
  catch (err) {
    console.error(err);
  }
}
var it = main();
// Start it up
it.next(); // Pauses at `yield` but runs the `foo(..)`

/**
 * Promises and Generators
*/
// Promise-aware `foo(..)`:
function foo(x, y) {
  return request("http://some.url.1/?x=" + x + "&y=" + y);
}
function *main() {
  try {
    // Here `foo(..)` returns a promise!
    var text = yield foo(11, 31);
    console.log(text);
  }
  catch (err) {
    console.error(err);
  }
}
var it = main();
var p = it.next().value;
// Wait for the `p` promise to resolve
p.then(
  function(text) {
    // Once resolved, go to next iteration of generator!
    it.next(text);
  },
  function(err) {
    it.throw(err);
  }
);

/**
 * Yield delegation of generators
 * 
 * By using `yield *function()` it is possible to transfer the iterator instance control over to the other `*function()`
*/
function *foo() {
  console.log("`*foo()` starting");
  yield 3;
  yield 4;
  console.log("`*foo()` finished");
}
function *bar() {
  yield 1;
  yield 2;
  yield *foo(); // `yield` delegation
  yield 5;
}
var it = bar();
it.next().value; // 1
it.next().value; // 2
it.next().value; // "`*foo()` starting", 3
it.next().value; // 4
it.next().value; // "`*foo()` finished", 5

// Any general iterable can be yield-delegated to:
function *bar() {
  console.log("inside `*bar()`:", yield "A");
  // Yield-delegation to a non-generator
  console.log("inside `*bar()`:", yield *["B", "C", "D"]);
  console.log("inside `*bar()`:", yield "E");
  
  return "F";
}
var it = bar();
console.log("outside:", it.next().value);
// outside: A
console.log("outside:", it.next(1).value);
// inside `*bar()`: 1
// outside: B
console.log("outside:", it.next(2).value);
// outside: C
console.log("outside:", it.next(3).value);
// outside: D
console.log("outside:", it.next(4).value);
// inside `*bar()`: undefined
// outside: E
console.log("outside:", it.next(5).value);
// inside `*bar()`: 5
// outside: F

// "Thunk" is a funcion that, without any parameters, calls another function
function foo(x, y) {
  return x + y;
}
function fooThunk() {
  return foo(3, 4);
}
console.log(fooThunk()); // 7

// Async thunk:
function foo(x, y, cb) {
  setTimeout(function() {
    cb(x + y);
  }, 1000);
}
function fooThunk(cb) {
  foo(3, 4, cb);
}
fooThunk(function(sum) {
  console.log(sum); // 7
})

// Utility that "thunkifies"
function thunkify(fn) {
  var args = [].slice.call(arguments, 1);
  return function(cb) {
    args.push(cb);
    return fn.apply(null, args);
  };
}
var fooThunkAgain = thunkify(foo, 3, 4);
fooThunkAgain(function(sum) {
  console.log(sum); // 7
})

