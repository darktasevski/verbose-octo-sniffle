/**
 * Chapter 3, second 3: Recipes with Objects, Mutations, and State
**/

/**
 * 1. Memoize
 */
// Consider:
var fibonacci = (n) =>
  n < 2
    ? n
    : fibonacci(n-2) + fibonacci(n-1);

[0, 1, 2, 3, 4, 5].map(fibonacci); // [0, 1, 1, 2, 3, 5]
// However this is slow!

// Build a look-up table:
// Whenever we want a result, we look it up. If we don't have it, we calculate it and write the result in the table to use in the future
var memoized = (fn) => {
  const lookupTable = {};
  return function (...args) {
    const key = JSON.stringify(this, args);
    return lookupTable[key] || (lookupTable[key] = fn.apply(this, args));
  }
}

// Now applying `memoized` to a function, we'll get back a new function that `memoizes` its results so that it never has to recalculate the same value twice
var fastFibonacci = memoized(
  (n) => 
    n < 2
      ? n
      : fastFibonacci(n-2) + fastFibonacci(n-1)
);

/**
 * 2. `getWith`
 */
// Takes the name of an attribute, and returns a function that extracts the value of that attribute from an object
var getWith = (attr) => (object) => object[attr];

// Used like this:
var inventory = {
  apples: 0,
  oranges: 144,
  eggs: 36
};
getWith('oranges')(inventory); // 144

// Combine it with `mapWith`
var inventories = [
  {apples: 0, oranges: 144, eggs: 36},
  {apples: 240, oranges: 54, eggs: 12},
  {apples: 24, oranges: 12, eggs: 42}
];
mapWith(getWith('oranges'))(inventories); // [144, 54, 12]
// Nicer way than writing out:
mapWith((inventory) => inventory.oranges)(inventories)

// Now with `maybe`
var maybe = (fn) =>
  function (...args) {
    if (args.length === 0) {
      return
    } else {
      for (let arg of args) {
        if (arg == null) return arg
      }
      return fn.apply(this, args);
    }
  }

// Consider a sparse array:
mapWith(maybe(getWith('oranges'))); // Gets orange count from all the non-null inventories in a list

/**
 * 3. `pluckWith`
 */
// Combines `mapWith` and `getWith`
var pluckWith = (attr) => mapWith(getWith(attr))
// Or even better using compose:
var compose = (first, second) => (c) => first(second(c));

// Now let's use those together:
var inventories = [
  {apples: 0, oranges: 144, eggs: 36},
  {apples: 240, oranges: 54, eggs: 12},
  {apples: 24, oranges: 12, eggs: 42}
];
pluckWith('eggs')(inventories); // [36, 12, 42]

/**
 * 4. Deep Mapping
 */

// Consider a different type of tree list:
const report = 
  [ [ { price: 1.99, id: 1 },
    { price: 4.99, id: 2 },
    { price: 7.99, id: 3 },
    { price: 1.99, id: 4 },
    { price: 2.99, id: 5 },
    { price: 6.99, id: 6 } ],
  [ { price: 5.99, id: 21 },
    { price: 1.99, id: 22 },
    { price: 1.99, id: 23 },
    { price: 1.99, id: 24 },
    { price: 5.99, id: 25 } ]]

// Consider using a `deepMapWith` tool:
// Recursively navigates deeper into a tree, peeling array layers
const deepMapWith = (fn) =>
  function innerdeepMapWith(tree) {
    return Array.prototype.map.call(tree, (element) => 
      Array.isArray(element)
      ? innerdeepMapWith(element)
      : fn(element)
      );
  };
// Now to use:
deepMapWith(getWith('price'))(report);
// [ [ 1.99, 4.99, 7.99, 1.99, 2.99, 6.99 ],
//   [ 5.99, 1.99, 1.99, 1.99, 5.99 ] ]
