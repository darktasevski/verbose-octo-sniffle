/**
 * Chapter 2 - Composing and Decomposing Data
**/

/**
 * Arrays and Destructuring Arguments
**/

// Arrays store references to things you put in them
const x = [],
      a = [x];
a[0] === x; // true

// Wrap an array literal:
const wrap = (something) => {
  const wrapped = [something];
  return wrapped;
}
wrap("package"); // ["package"]

// Reverse the statement using destructuring:
const unwrap = (wrapped) => {
  const [something] = wrapped; // destructures array
  return something;
}
unwrap(["present"]); // "present"

// More than one element:
var surname = (name) => {
  const [first, last] = name;
  return last;
}
surname(["Aos", "Dabbagh"]); // "Dabbagh"

// Nesting destructuring
const description = (nameAndOccupation) => {
  const [[first, last], occupation] = nameAndOccupation;
  return `${first} is a ${occupation}`;
}
description([["Aos", "Dabbagh"], "programmer"]);
// Aos is a programmer

// Gathering
var [car, ...cdr] = [1, 2, 3, 4, 5];
car; // 1
cdr; // [2, 3, 4, 5]

// `...` does not provide universal pattern-matching capability (unable to do it in the beginning or the middle)

// `...` as spread operator:
const oneTwoThree = ["one", "two", "three"];
["zero", ...oneTwoThree]; // ["zero", "one", "two", "three"]

// JavaScript does not pattern match:
const [what] = [];
what; // undefined
const [which, why, who] = ["duck feet", "tiger tail"];
console.log(which, why, who); // "duck feet", "tiger tail", undefined

// If no items to assign with `...`, JS assigns empty array:
const [...they] = [];
they; // undefined
const [where, when, ...how] = ["duck feet", "tiger"];
how; // undefined

// Destructuring and return values (return multiple things with destructuring)
const descriptionTwo = (nameAndOccupation) => {
  if (nameAndOccupation.length < 2) {
    return ["", "occupation missing"]
  }
  else {
    const [[first, last], occupation] = nameAndOccupation;
    return [`${first} is a ${occupation}`, "ok"];
  }
}
const [reg, status] = descriptionTwo([["Aos", "Dabbagh"], "programmer"])
reg; // "Aos is a programmer"
status; // "ok"

// Destructuring parameters
const numbers = (...nums) => nums; // Gathering parameters
numbers(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]

/**
 * Self-Similarity
**/

// List (two rules):
// 1. Empty, or;
// 2. Consists of an element concatenated with a list
[]; // empty
["baz", ...[]]; // ["baz"]
["bar", ...["baz"]]; // ["bar", "baz"]
["foo", ...["bar", "baz"]]; // ["foo", "bar", "baz"]

// Decomposing lists works the same way:
var [first, ...rest] = ["foo", "bar"];
first; // "foo"
rest; // ["bar"]

// Empty list:
const isEmpty = ([first, ...rest]) => first === undefined;

isEmpty([]); // true
isEmpty([0]); // false
isEmpty([[]]); // false

// Writing an array length function
const length = ([first, ...rest]) =>
  first === undefined
    ? 0 // Terminal case (array.length = 0)
    : 1 + length(rest); // recursively call `length(..)`

length([]); // 0
length(["foo"]); // 1
length(["foo", "bar", "baz"]); // 3

// Recursively flatten an array:
const flatten = ([first, ...rest]) => {
  if (first === undefined) {
    return [];
  }
  else if (!Array.isArray(first)) {
    return [first, ...flatten(rest)];
  }
  else {
    return [...flatten(first), ...flatten(rest)];
  }
}

// `...flatten(rest)` is equal to the return value of flatten spread into an array
// Example: function returnArray() {
//   return [1, 2, 3];
// }
// var test = [0, ...returnArray()];
// => [0, 1, 2, 3]

// Mapping
const squareAll = ([first, ...rest]) => 
  first === undefined
    ? []
    : [first * first, ...squareAll(rest)]

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]

// If we wanted to truthify:
const truthyAll = ([first, ...last]) =>
  first === undefined
    ? []
    : [!!first, ...truthyAll(rest)]

// Extract the thing to do with each element
// Start with signature:
var mapWith = (fn, array) => {/* */}

// Using ternary operator
var mapWith = (fn, [first, ...last]) =>
  first === undefined
    ? []
    : [fn(first), ...mapWith(fn, rest)];

mapWith((x) => x * x, [1, 2, 3]); // [1, 4, 9]
mapWith((x) => !!x, [null, true, 25, "foo"]); // [false, true, true, true]

// Using folding, to sum squares
const sumSquares = ([first, ...rest]) =>
  first === undefined
    ? 0
    : first * first + sumSquares(rest)

sumSquares([1, 2, 3, 4, 5]); // 55

// Re-writing mapWith to sum squares:
const foldWith = (fn, terminalValue, [first, ...rest]) =>
  first === undefined
    ? terminalValue
    : fn(first, foldWith(fn, terminalValue, rest));

// squareAll => folded
foldWith((first, rest) => first * first + rest, 0, [1, 2, 3, 4, 5])

// Abstract one more level, extracting array:
const squareAllFold = (array) => foldWith((first, rest) => [first * first, ...rest], [], array);

// Re-write `mapWith` using `foldWith`:
var mapWith = (fn, array) => foldWith((first, rest) => 
  [fn(first), ...rest], [], array)
var squareAllMap = (array) => mapWith((x) => x * x, array);

// Re-write length
var lengthFold = (array) => foldWith((first, rest) => 1 + rest, 0, array);
lengthFold([1, 2, 3, 4, 5]); // 5

/**
 * Tail Calls (and Default Arguments) (Tail Call Optimization [TCO])
**/
// Occurs when a function's last act is to invoke another function
// Consider:
var lengthAgain = ([first, ...rest]) =>
  first === undefined
    ? 0
    : 1 + lengthAgain(rest);
// This is not TC optimized as it has to add one before returning
// Converting length to TCO
const lengthDelaysWork = ([first, ...rest], numberToBeAdded) => 
    first === undefined
      ? numberToBeAdded
      : lengthDelaysWork(rest, 1 + numberToBeAdded)

var lengthAgain = (n) => lengthDelaysWork(n ,0);

// Using partial application
var callLast = (fn, ...args) => 
  (...remainingArgs) =>
    fn(...remainingArgs, ...args);

var lengthPartial = callLast(lengthDelaysWork, 0);
lengthPartial(["foo", "bar", "baz"]); // 3

// Using the technique with `mapWith`
const mapWithDelaysWork = (fn, [first, ...rest], prepend) =>
  first === undefined
    ? prepend
    : mapWithDelaysWork(fn, rest, [...prepend, fn(first)]);

mapWith = callLast(mapWithDelaysWork, []);
mapWith((x) => x * x, [1, 2, 3, 4, 5]); 

// Factorials with TCO
const factorialWithDelayedWork = (n, work) => 
  n === 1
  ? work
  : factorialWithDelayedWork(n - 1, n * work);

var factorial = (n) => factorialWithDelayedWork(n, 1);

// Default argument
var factorial = (n, work = 1) =>
  n === 1
  ? work
  : factorial(n - 1, n * work);

factorial(1); // 1
factorial(6); // 720

// Default destructuring assignment
var [firstAgain, second = "two"] = ["one"]
`${first} . ${second}`; // "one . two"
var [firstAgain, second = "two"] = ["one", "three"]
`${first} . ${second}`; // "one . three"

/**
 * Garbage, Garbage Everywhere
**/

// JS scheme of two-element arrays to represent cons cells:
var cons = (a, d) => [a, d],
    car = ([a, d]) => a,
    cdr = ([a, d]) => d;

// Make a list by calling cons repeatedly, and terminating with null:
const oneToFive = cons(1, cons(2, cons(3, cons(4, cons(5, null)))))
oneToFive; // [1, [2, [3, [4, [5, null]]]]]

// Arrays refer to each other with references
// Creating a linked list
const node5 = [5, null],
      node4 = [4, node5], 
      node3 = [3, node4],
      node2 = [2, node3],
      node1 = [1, node2];

const oneToFiveAgain = node1; // Node 1 links to every other list

// If we want the head of a list, we call `car(..)` on it:
car(oneToFiveAgain); // 1

// Calling the rest:
cdr(oneToFiveAgain); // [2, [3, [4, [5, null]]]]

// Secret decoder ring:
const SecretDecoderRing = {
  encode: function(plaintext) {
    return plaintext
      .split('')
      .map(char => char.charCodeAt())
      .map(code => code + 1)
      .map(code => String.fromCharCode(code))
      .join('');
  },
  decode: function(cypertext) {
    return cypertext
      .split('')
      .map(char => char.charCodeAt())
      .map(code => String.fromCharCode(code))
      .join('');
  }
}

// Destructuring objects:
// Consider:
const user = {
  name: {
    first: "Aos",
    last: "Dabbagh"
  },
  occupation: {
    title: "Programmer",
    responsibilities: ["Code", "code more"]
  }
};
user.name.first; // "Aos"

// Destructured:
var {name: {first: given, last: surname}, occupation: {title: title,}} = user;

last; // "Dabbagh"
title; // "Programmer"

// Destructure function parameters
const descriptor = ({name: {first: given}, occupation: {title: title}}) => `${given} is a ${title}`;
descriptor(user); // "Aos is a Programmer"

// Shorthand labeling:
const abbrev = ({name: {first, last}, occupation: {title}})
=> { return {first, last, title} }

abbrev(user); // {"first": "Aos", "last": "Dabbagh", "title": "Programmer"}

// Linked lists from objects
const EMPTY = {};
const OneTwoFour = {first: 1, rest: {first: 2, rest: {first: 3, rest: EMPTY}}};

OneTwoFour.first; // 1
OneTwoFour.rest; // {"first": 2, "rest": {"first": 3, "rest": {}}}

// Taking length of linked list:
const lengthObj = (node, delayed = 0) => 
  node === EMPTY
    ? delayed
    : length(node.rest, delayed + 1)

lengthObj(OneTwoFour); // 3

// Recursively with TCO:
const copy2 = (node, delayed = EMPTY) =>
  node === EMPTY
    ? delayed
    : copy2(node.rest, {first: node.first, rest: delayed})

// copy2(..) reverses the list as it is constructed back to front
copy2(OneTwoFour);
  // {"first": 3, "rest": {"first": 2, "rest": {"first": 1, "rest": {}}}}

const reverse = (node, delayed = EMPTY) =>
  node === EMPTY
    ? delayed
    : reverse(node.rest, {first: node.first, rest: delayed})

// Create a reversing map:
const reverseMapWith = (fn, node, delayed = EMPTY) =>
  node === EMPTY
    ? delayed
    // Run the function on the first node in the parameter as it is passed in
    : reverseMapWith(fn, node.rest, {first: fn(node.first), rest: delayed})

reverseMapWith((x) => x * x, OneTwoFour);
  // {"first": 9, "rest": {"first": 4, "rest": {"first": 1, "rest": {}}}}

// Regular `mapWith` can be done by doing a reverse (on the structure of reverseMapWith)
var mapWith = (fn, node, delayed = EMPTY) =>
  node === EMPTY
    ? reverse(delayed) // Reverse here
    : mapWith(fn, node.rest, {first: fn(node.first), rest: delayed});

// Takes twice as long as a straight iteration because it must iterate over the entire list twice: once to map, and once to reverse
mapWith((x) => x * x, OneTwoFour);
  // {"first": 1, "rest": {"first": 4, "rest": {"first": 9, "rest": {}}}}

/**
 * Mutation
**/
// Objects are passed by reference. If we assign a new variable to an object and mutate it, the object itself will be mutated and not a copy.
// Destructuring on the other hand makes a copy

// Making a copy of a linked list without iterating over it twice, using mutation:
var copy = (node, head = null, tail = null) => {
  if (node === EMPTY) {
    return head
  }
  else if (tail === null) {
    const {first, rest} = node;
    const newNode = {first, rest};
    return copy(rest, newNode, newNode);
  }
  else {
    const {first, rest} = node;
    const newNode = {first, rest};
    tail.rest = newNode;
    return copy(node.rest, head, newNode);
  }
}

// Re-write mapWith
const mapWithMut = (fn, node, head = null, tail = null) => {
  if (node === EMPTY) {
    return head;
  }
  else if (tail === null) {
    const {first, rest} = node;
    const newNode = {first: fn(first), rest};
    return mapWith(fn, rest, newNode, newNode);
  }
  else {
    const {first, rest} = node;
    const newNode = {first: fn(first), rest};
    tail.rest = newNode;
    return mapWith(fn, node.rest, head, newNode);
  }
};
mapWithMut((x) => 1.0 / x, oneToFive);
//{"first":1,"rest":{"first":0.5,"rest":{"first":0.3333333333333333,"rest": {"first":0.25,"rest":{"first":0.2,"rest":{}}}}}}

// Reassignment
// `var` is only function-scoped, just like function declarations. All `var` declarations behave as if tehy were hoisted to the top of the function
// `let` is block- and function-scoped
// `const` is read-only, block- and function-scoped

// `var`
(() => {
  var age = 49;
  if (true) {
    var age = 50;
  }
  return age;
})(); // 50

// `let`
(() => {
  let age = 49;
  if (true) {
    let age = 50;
  }
  return age;
})(); // 49

// Block-scoping errors with `var` and `for` loops
var introductions = [],
    names = ['Karl', 'Friedrich', 'Gauss']

for (var i = 0; i < 3; i++) {
  introductions[i] = (soAndso) => 
    `Hello ${soAndSo}, my name is ${names[i]}`
}

// If we try:
introductions[1]('Aos'); // 'Hello Aos, my name is undefined'
// This occurs because the `i` is not block-scoped, and i becomes 3 at the end of the loop

// This is fixed by using `let` as it is block-scoped

/**
 * Copy on Write = make a copy on setting a new value (calling `set(..)`)
**/
// Some utilities:
var first = ({first, rest}) => first;
var rest = ({first, rest}) => rest;
const at = (index, list) =>
  index === 0
    ? first(list)
    : at(index - 1, rest(list))

var set = (index, value, list, originalList = list) =>
  index === 0
    ? (list.first = value, originalList)
    : set(index - 1, value, rest(list), originalList)

const parentList = {first: 1, rest: {first: 2, rest: {first: 3, rest: EMPTY}}}

set(2, "three", parentList); // {first: 1, rest: {first: 2, rest: {first: "three", rest: EMPTY}}}

// Copy-on-read
// When the parent attemps to "read" the value of a child of the list, we make a copy and read the copy of the child
var rest = ({first, rest}) => copy(rest);

// Back to copy-on-write:
var rest = ({first, rest}) => rest;
var set = (index, value, list) =>
  index === 0
    ? {first: value, rest: list.rest}
    : {first: list.first, rest: set(index - 1, value, list.rest)}

// Functional Iterators
// Create an array iterator using an object:
const arrayIterator = (array) => {
  // Using closure, we can keep track of i
  let i = 0;
  // Returns a function
  return () => {
    // `i === array.length` is evaluated first, then the value is set to done
    const done = i === array.length;
    // Function returns an object with the `done` property, and `value` property
    return {
      done,
      value: done ? undefined : array[i++]
    }
  }
}

const iteratorSum = (iterator) => {
  let eachIteration,
      sum = 0;
  // Running `iterator(..)` scoped 
  while ((eachIteration = iterator(), !eachIteration.done)){
    sum += eachIteration.value;
  }
  return sum;
}
iteratorSum(arrayIterator([1, 3, 9, 16, 25]));

// Simple number iterator
const NumberIterator = (number = 0) =>
  () => ({done: false, value: number++});

fromOne = NumberIterator(1);
fromOne().value; // 1
fromOne().value; // 2

// Fibonacci iterator
const FibonacciIterator = () => {
  let previous = 0,
      current = 1;
  
  return () => {
      const value = current; 
      [previous, current] = [current, current + previous];
      return {done: false, value};
  }
}
const fib = FibonacciIterator();
fib().value; // 1
fib().value; // 1
fib().value; // 2
fib().value; // 3
fib().value; // 5

// Mapping an iterator
const mapIteratorWith = (fn, iterator) => 
  () => {
    const {done, value} = iterator();
    return ({done, value: done ? undefined: fn(value)});
  }

const squares = mapIteratorWith((x) => x * x, NumberIterator(1));
squares().value; // 1
squares().value; // 4
squares().value; // 9

// Define `take` => a function which returns an iterator that only returns a fixed number of elements:
const take = (iterator, numberToTake) => {
  let count = 0;
  return () => {
    if (++count <= numberToTake) {
      return iterator();
    } else {
      return {done: true};
    }
  };
};

// `toArray` function which takes an iterator and pushes its values into an array
const toArray = (iterator) => {
  let eachIteration,
      array = [];
  while ((eachIteration = iterator(), !eachIteration.done)) {
    array.push(eachIteration.value);
  }
  return array;
}
toArray(take(FibonacciIterator(), 5)); // [1, 1, 2, 3, 5]
to
toArray(take(squares, 5));
// [1, 4, 9, 16, 25]

// Writing a filter for iterators that accompanies mapping
const filterIteratorWith = (fn, iterator) => 
  () => {
    do {
      const {done, value} = iterator();
    } while (!done && !fn(value));
    return {done, value};
  }

const oddsOf = callLeft(filterIteratorWith, (n) => n % 2 === 1);
toArray(take(squareOf(oddsOf(NumberIterator(1))), 5));
// [1, 9, 25, 49, 81]

/**
 * Making Data Out of Functions
**/

// Building blocks of combinatory logic 
// (K, I, V combinators)
// Kestrel, Idiot Bird, Vireo

// const K = (x) => (y) => x;
// const I = (x) => (x);
// const V = (x) => (y) => (z) => z(x)(y);

// Kestrel (K)
// A constant function that always returns the same thing no matter what you give it. You give it a value, and it returns a constant function that gives that value
// Example:
const K = (x) => (y) => x;
const fortyTwo = K(42);
fortyTwo(6); // 42
fortyTwo("Hello"); // 42

// Identity (I)
// Function which evaluates to whatever parameter you pass it
const I = (x) => (x);
I(42); // 42

// Consider:
K(x)(y); // x

// Substituting in `I`
K(I)(x); // I
// Then:
K(I)(x)(y) === I(y); // which is effectively `y`
// Therefore:
K(I)(x)(y); // `y`
K(I)(6)(7); // 7
K(I)(12)(24); // 24

// Given two values, K(I) always returns the second value
K('primus')('secundus'); // 'primus'
K(I)('primus')('secundus'); // 'secundus'

var first = K,
    second = K(I);
// Given two values, `K` always returns the first value, and `K(I)` always returns the second value

// If we wanted to use `first` and `second` on a two-element array we'd need some piece of code that calls some code:
var latin = (selector) => selector('primus')('secundus')
latin(first); // 'primus'
latin(second); // 'secundus'

// Function that makes data:
// arrays:
cons = (first, second) => [first, second]
// objects:
cons = (first, second) => {first, second}

// For 'data' we access using `K` and `K(I)`:
(first, second) => (selector) => selector(first)(second);
// Curried:
(first) => (second) => (selector) => selector(first)(second)

// Building the function:
var first = K,
    second = K(I),
    pair = (first) => (second) => (selector) => selector(first)(second);

var latin = pair('primus')('secundus');
latin(first); // 'primus'
latin(second); // 'secundus'

// Vireo (V Combinator)
// Changing names of `pair` function to `x`, `y`, and `z`
// This works similarly to JS's `.apply` function:
// Take these two values, and apply them to this function
(x) => (y) => (z) => z(x)(y);

// Another notable example is "thrush", the T combinator. Takes one value and applies it to function

// Lists with functions as data:
var first = ({first, rest}) => first,
    rest = ({first, rest}) => rest,
    pair = (first, rest) => ({first, rest}),
    EMPTY1 = ({});

const oneOneTwoThree = pair(1, pair(2, pair(3, EMPTY1)));
first(oneOneTwoThree); // 1
first(rest(oneOneTwoThree)); // 2
first(rest(rest(oneOneTwoThree))); // 3

// Writing length and mapWith over it:
var lengthTwo = (aPair) =>
  aPair === EMPTY1
    ? 0
    : 1 + lengthTwo(rest(aPair));

var reverseTwo = (aPair, delayed = EMPTY) =>
  aPair === EMPTY
    ? delayed
    : reverseTwo(rest(aPair), pair(first(aPair), delayed));

var mapWithTwo = (fn, aPair, delayed = EMPTY) =>
  aPair === EMPTY
    ? reverse(delayed)
    : mapWithTwo(fn, rest(aPair), pair(fn(first(aPair)), delayed));

var doubled = mapWithTwo((x) => x * 2, oneOneTwoThree);
first(doubled); // 2
first(rest(doubled)); // 4
first(rest(rest(doubled))); // 6

