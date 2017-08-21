/**
 * Chapter 2, section 2: Recipes with Data
**/

/**
 * 1. mapWith
**/

// `.map` takes a function as an argument, and applies it to each element of the array, then returns result in another array
[1, 2, 3, 4, 5].map(x => x * x);

// Writing a function that behaves like `.map`
var map = (list, fn) =>
  list.map(fn);

// `mapWith` => a function that wraps around `map` and turns any other function into a mapper
var mapWith = (fn) => (list) => list.map(fn);

// Example:
var squares = (x) => x * x;
var mapWithSquares = mapWith(squares);
mapWithSquares([1, 2, 3, 4]); // [1, 4, 9, 16]
// Or:
var doublesOf = mapWith(x => x * 2);
doublesOf([1, 2, 3, 4]); // [2, 4, 6, 8]

/**
 * 2. Flip
**/

// Consider `map` written like this: 
var mapWith = (fn) => (list) => map(list, fn);
// Give generic names
var mapWith = (first) => (second) => map(second, first);
// Then wrap entire thing in a function and extract map:
var wrapper = (fn) => (first) => (second) => fn(second, first);
// This is a function that takes a function, and 'flips' the order of arguments around, then curries it:
var flipAndCurry = (fn) => (first) => (second) => fn(second, first);
// Flip and not curry:
var flip = (fn) => (first, second) => fn(second, first);
// Re-define `mapWith`
var mapWith = flipAndCurry(map);

// Self-currying flip: flip a function but retain the flexibility to call it in its curried form (pass one parameter) or non-curried form (pass both):
var flip = (fn) =>
  function (first, second) {
    if (arguments.length === 2) {
      return fn(second, first)
    }
    else {
      return function (second) {
        return fn(second, first);
      };
    };
  };
// Now if we do:
mapWith = flip(map);
// It is possible to do either of:
mapWith(fn, list); // OR:
mapWith(fn)(list);

// Normally `flip` throws the current context away, this can be solved by calling the last function with `.call(this)`
var flipAndCurry = (fn) =>
  (first) =>
    function (second) {
      return fn.call(this, second, first);
    }

/** 
 * 3. Object.assign
**/

// A standard function that copies an object
Object.assign({}, {
  apples: 12,
  oranges: 12
})
// Or extending another object:
var inventory = {
  apples: 12,
  oranges: 12
};
var shipment = {
  bananas: 54,
  pears: 24
}
Object.assign(inventory, shipment);
// {apples: 12, oranges: 12, bananas: 54, pears: 24}

// Working with prototypes:
var Queue = function () {
  this.array = [];
  this.head = 0;
  this.tail = -1;
};
Queue.prototype.pushTail = function (value) {
  // ...
};
Queue.prototype.pullHead = function () {
  // ...
};
// With Object.assign(..)
var Queue = function () {
  Object.assign(this, {
    array: [],
    head: 0,
    tail: -1
  })
};
Object.assign(Queue.prototype, {
  pushTail(value) {
    // ...
  },
  pullHead() {
    // ...
  }
})

/**
 * 4. Y Combinator
**/
// Enables making recursive functions without binding a function to a name in an environment

var Y = (f) =>
  ( x => f(v => x(x)(v)) )(
    x => f(v => x(x)(v))
  );

// Use:
var factorial = Y(function (fac) {
  return function(n) {
    return (n == 0 ? 1 : n * fac(n - 1));
  }
});
factorial(5); // 120

// Naming it:
var Y = (f) => {
  var something = x => f(v => x(x)(v));
  return something(something);
}