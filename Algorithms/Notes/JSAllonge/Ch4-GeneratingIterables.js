/**
 * Chapter 4, second 2: Generating Iterables
**/

// Iterate over a tree
// Given an array that might contain arrays, generate all "leaf" elements, elements that are not themselves iterable

// Generation:
var isIterable = (something) => 
  !!something[Symbol.iterator];

var generate = (iterable) => {
  for (let element of iterable) {
    if (isIterable(element)) {
      generate(element)
    }
    else {
      console.log(element)
    }
  }
}
generate([1, [2, [3, 4], 5]]); // 1 2 3 4 5

// Iteration version:
var isIterable = (something) =>
  !!something[Symbol.iterator];

var treeIterator = (iterable) => {
  const iterators = [ iterable[Symbol.iterator]() ];
  return () => {
    while (!!iterators[0]) {
      const iterationResult = iterators[0].next();
      if (iterationResult.done) {
        iterators.shift();
      }
      else if (isIterable(iterationResult.value)) {
        iterators.unshift(iterationResult.value[Symbol.iterator]())
      }
      else {
        return iterationResult.value;
      }
    }
    return;
  }
}
var i = treeIterator([1, [2, [3, 4], 5]]);
let n;
while (n = i()) {
  console.log(n);
}
// 1 2 3 4 5 

// State machines
// Fibonacci sequence using a generator
var fibonacci = () => {
  let a, b;
  console.log(a = 0);
  console.log(b = 1);

  while (true) {
    [a, b] = [b, a + b];
    console.log(b);
  }
}

// Using iteration and a state pattern:
let a, b, state = 0;
var fibonacci = () => {
  switch (state) {
    case 0: 
      state = 1;
      return a = 0;
    case 1:
      state = 2;
      return b = 1;
    case 2:
      [a, b] = [b, a + b];
      return b
  }
};
() => {
  while (true) {
    console.log(fibonacci());
  }
}


/**
 * Generators
**/
function *only(something) {
  yield something;
};
only('you').next(); // {'done': false, value: 'you'}

// returns an iterator which we can call `.next()` on, and yields `you`
// Invoking more than once gives new iterator
only('the lonely').next(); // {'done': false, value: 'the lonely'}
// Invoke the same iterator twice:
var sixteen = only('sixteen');
sixteen.next(); // {'done':false, value:'sixteen'}
sixteen.next(); // {'done': true}

// Generators and iterables
function *oneTwoThree() {
  yield 1;
  yield 2;
  yield 3;
}
// By calling the generator function, we invoke its iterator:
var iterator = oneTwoThree();
// We run its iterator by calling the `.next()` which gives up the `yield` number
iterator.next(); // {'done': false, value: 1}
iterator.next(); // {'done': false, value: 2}
iterator.next(); // {'done': false, value: 3}
// On last call, iterator finishes
iterator.next(); // {'done': true}

// Generator function with an iterator:
var ThreeNumbers = {
  [Symbol.iterator]: function * () {
    yield 1;
    yield 2;
    yield 3;
  }
}
for (const i of ThreeNumbers) {
  console.log(i);
}
// 1 2 3
[...ThreeNumbers]; // [1, 2, 3]
var iterator = ThreeNumbers[Symbol.iterator]();
iterator.next(); // {'done': false, value: 1}
iterator.next(); // {'done': false, value: 2}
iterator.next(); // {'done': false, value: 3}
iterator.next(); // {'done': true}

// Shorthand syntax
var ThreeNumbers = {
  *[Symbol.iterator]() { // Generator instead of an iterator
    yield 1;
    yield 2;
    yield 3;
  }
}

// More generators:
var Numbers = {
  *[Symbol.iterator]() {
    let i = 0;
    while (true) {
      yield i++;
    }
  }
};
for (const i of Numbers) {
  console.log(i);
};
// 0 1 2 3 4...

// Fibonacci implemented with a generator method, using yield to denote state
var Fibonacci = {
  *[Symbol.iterator]() {
    let a, b;
    yield a = 0;
    yield b = 1;
    while (true) {
      [a, b] = [b, a + b]
      yield b;
    }
  }
}
for (const i of Fibonacci) {
  console.log(i);
}
// 0 1 1 2 3 5 8...

// Writing it as a generator function:
function *fibonacci1() {
  let a, b;
  yield a = 0;
  yield b = 1;
  while (true) {
    [a, b] = [b, a + b];
    yield b;
  }
}
for (const i of fibonacci()) {
  console.log(i);
}
// 0 1 1 2 3 5 8...

// Yielding iterables and iterating over trees:
var isIterable = (something) =>
  !!something[Symbol.iterator];

var treeIterable = (iterable) => 
  ({
    [Symbol.iterator]: function *() {
      for (const e of iterable) {
        if (isIterable(e)) {
          for (const ee of treeIterable(e)) {
            yield ee;
          }
        }
        else {
          yield e;
        }
      }
    }
  })
for (const i of treeIterable([1, [2, [3, 4], 5]])) {
  console.log(i);
}
// 1 2 3 4 5

// Can be written simply as a generator, instead of a function that returns an iterable object
function *tree(iterable) {
  for (const e of iterable) {
    if (isIterable(e)) {// If it is iterable, treat it as a tree and iterate over it
      for (const ee of tree(e)) { // "Yield all elements of TreeIterable(e), in order"
        yield ee;
      }
    }
    else {
      yield e;
    }
  }
}
for (const i of tree([1, [2, [3, 4], 5]])) {
  console.log(i);
}

// Consider this:
function *append(...iterables) {
  for (const iterable of iterables) {
    for (const element of iterables) {
      yield element;
    }
  }
}
const lyrics = append(['a', 'b', 'c'], ['one', 'two', 'three'], ['do', 're', 'me']);
for (const word of lyrics) {
  console.log(word);
}
// a b c one two three do re me

// However we can use `yield *` to yield all elements of an iterable:
function *append(...iterables) {
  for (const iterable of iterables) {
    yield *iterable;
  }
}

// Using it on a tree:
function *tree(iterable) {
  for (const e of iterable) {
    if(isIterable(e)) {
      yield *tree(e);
    }
    else {
      yield e;
    }
  }
}

// Re-writing `mapWith`, `filterWith` and `untilWith` as  generators:
function *mapWith(fn, iterable) {
  for (const e of iterable) {
    yield fn(e);
  }
}
function *filterWith(fn, iterable) {
  for (const e of iterable) {
    if (!!fn(e)) yield e;
  }
}
function *untilWith(fn, iterable) {
  for (const e of iterable) {
    if (fn(e)) break;
    yield fn(e);
  }
}

// `first` works directly with iterators
// `rest` must be re-written
var first = (iterable) => 
  iterable[Symbol.iterator]().next().value;

function *rest(iterable) {
  const iterator = iterable[Symbol.iterator]();
  iterator.next();
  yield* iterator;
}
