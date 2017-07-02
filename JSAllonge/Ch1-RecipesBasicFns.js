/**
 * Basic Function Recipes
*/

/**
 * Unary (function decorator)
*/
// Decorator that modifies the number of arguments a function takes. Turns a function into one taking exactly one argument
// `.map` example:
[1, 2, 3].map(function (element, index, arr) {
  console.log({element: element, index: index, arr: arr})
})
// Takes three arguments, if you pass a function taking only one argument, it ignores the additional ones. But some functions have optional second and even third arguments:
['1', '2', '3'].map(parseInt) // defined as parseInt(string[, radix]), index interpreted as radix
// [1, NaN, NaN]

// Using a decorator:
const unary = (fn) => 
  fn.length === 1 // Number of arguments
    ? fn
    : function (something) {
        return fn.call(this, something);
    }

/**
 * K Combinator (Kestrel) (combinator)
*/
const K = (x) => (y) => x;

// Applications:
// `tap` function: takes a value and returns a function that always returns the value, but if a function is passed in, it executes the function for side-effects:
const tap = (value) => 
  (fn) => (
    typeof(fn) === 'function' && fn(value), value
  )

tap('espresso')((it) => {
  console.log(`Our drink is '${it}'`);
});
// Our drink is 'espresso'

// To turn off:
tap('espresso')(); // 'espresso'

// Uncurried (as in underscore):
_.tap('espresso', (it) => 
  console.log(`Our drink is '${it}'`)
  );

// Make function work both ways:
const tapTwo = (value, fn) => {
  const curried = (fn) => (
    typeof(fn) === 'function' && fn(value), value
  );
  return fn === undefined
          ? curried
          : curried(fn);
}
tapTwo('espresso', (it) => {
  console.log(`Our drink is '${it}'`)
});
// Our drink is 'espresso'

/**
 * Maybe function decorator
*/
// A function takes a value as a parameter, does nothing if no parameter
const isSomething = (value) =>
  value !== null && value !== void 0;

const checksForSomething = (value) => {
  if (isSomething(value)) {
    // function's true logic
  }
}

// Maybe monad = a function which does nothing when given nothing
const maybe = (fn) =>
  function(...args) {
    if (args.length === 0) { // If no arguments, do nothing
      return;
    }
    else {
      for (let arg of args) { // Iterate through arguments
        if (arg == null) return; // If any argument is undefined, do nothing
      }
      return fn.apply(this, args)
    }
  }
// Example:
maybe((a, b, c) => a + b + c)(1, 2, 3) // 6

maybe((a, b, c) => a + b + c)(1, null, 3) // undefined

/**
 * Once - function combinator
 */
// Ensures a function can only be called once
const once = (fn) => {
  let done = false; // Captured in closure
  return function() {
    return done ? void 0 : ((done = true), fn.apply(this, arguments))
  }
}
// Pass a function, get a function back. That function will call my function once, and thereafter will return undefined
const askedOnBlindDate = once(
  () => "Sure, why not?"
);
askedOnBlindDate(); // "Sure, why not?"
askedOnBlindDate(); // undefined
askedOnBlindDate(); // undefined

/**
 * Left-Variadic Functions
*/
// A variadic function is designed to accept a variable number of arguments
const abccc = (a, b, ...c) => {
  console.log(a);
  console.log(b);
  console.log(c); // Gather rest of parameters using rest operator
};
abccc(1, 2, 3, 4, 5)
// 1 2 [3, 4, 5]

// Function which builds a team record:
function team(coach, captain, ...players) {
  console.log(`${captain} (captain)`);
  for (let player of players) {
    console.log(player);
  }
  console.log(`squad coached by ${coach}`);
}
team('Luis Enrique', 'Xavi Hernandez', 'Marc-Andre ter Stegen', 'Martin Montoya', 'Gerard Pique')
// Xavi (captain)
// MatS
// Montoya
// Pique
// squad coached by Lucho

// Right-variadic function
const firstAndButFirst = (first, ...butFirst) =>
  [first, butFirst];

// Left-variadic function: one or more fixed arguments, and the rest are gathered into the leftmost argument
const leftVariadic = (fn) => {
  if (fn.length < 1) {
    return fn;
  }
  else {
    return function(...args) {
      // fn.length is number of parameters the function asks for 
      // args.length is number of arguments given to function
      // Taking the difference gets the rest of the parameters the function has not asked for
      // Then add 1 because of 0-based index

      // gathered = all arguments from start to number of parameters of function
      const gathered = args.slice(0, args.length - fn.length + 1),
          // Spread = What is left
            spread = args.slice(args.length - fn.length + 1)
      
      return fn.apply(
        this, [gathered].concat(spread)
      );
    }
  }
};
const butLastAndLast = leftVariadic((butLast, last) => [butLast, last]);

butLastAndLast('why', 'hello', 'there', 'little', 'droid')
// [["why", "hello", "there", "little"], "droid"]

// Supply the length of the array to use as result, and gather excess arguments into it from the left
const leftGather = (outputArrayLength) => {
  return function(inputArray) {
    return [inputArray.slice(0, inputArray.length - outputArrayLength + 1)] // Gathered
    .concat(inputArray.slice(inputArray.length - outputArrayLength + 1)) // Spread (aka, what's left)
  }
};
const [butLast, last] = leftGather(2)(['why', 'hello', 'there', 'little', 'droid']);
butLast; // ['why', 'hello', 'there', 'little']
last; // 'droid'

/**
 * B Combinator => compose
*/
const compose = (a, b) => 
  (c) => a(b(c));

// Given:
const addOne = (number) => number + 1;
const doubleOf = (number) => number * 2;
// Instead of:
const doubleOfAddOne = (number) => doubleOf(addOne(number));
// Composed:
const doubleOfAddOneComp = compose(doubleOf, addOne);

// Variadic compose and recursion
// If `compose3` was implemented:
const compose3 = (a, b, c) => (d) => a(b(c(d)));
// Or:
const compose3Again = (a, b, c) => compose(a(compose(b, c)));

// Writing a recursive variadic compose:
// Start with smallest (degenerate) case:
const compose1 = (a) => a;

// Then:
const composeOne = (a, ...rest) => "to be determined"
// Test for degenerate case:
const composeDegen = (a, ...rest) =>
  rest.length === 0
    ? a
    : "to be determined"

// Now to combine function with `...rest`

// Consider `compose(a, b)`... In this case `compose(b) is the degenerate case => just `b`
// Given `compose(a, b)` is `(c) => a(b(c))`
// Substitute `compose(b)` for `b`
compose(a, compose(b)) === ( (c) => a(compose(b)(c)) )

// Now substitute `...rest` for `b`
compose(a, ...rest) === ( (c) => a(compose(...rest)(c)) )

// Final solution:
const composeFinal = (a, ...rest) =>
  rest.length === 0
    ? a
    : (c) => a(compose(...rest)(c));

// Implementing use `.reduce`
constComposeReduce = (...fns) =>
  (value) =>
    fns.reverse().reduce((acc, fn) => fn(acc), value);

// Using with method decorators:
const setter = compose(fluent, maybe);
SomeClass.prototype.setUser = setter(function(user) {
  this.user = user;
});
SomeClass.prototype.setPrivileges = setter(function(privileges) {
  this.privileges = privileges;
});

// `setter` adds both the behavior or `fluent` and `maybe` to each method it decorates

// `pipeline` => values flows through `fn a` then `fn b`
const pipeline = (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const setterPipe = pipeline(addOne, double);