/**
 * Chapter 4, section 1: OOP - Collections
**/

// Example stack with a functional iterator:
var Stack1 = () => 
  ({
    array: [],
    index: -1,
    push(value) {
      return this.array[this.index += 1] = value;
    },
    pop() {
      const value = this.array[this.index];
      this.array[this.index = undefined];
      if (this.index >= 0) {
        this.index -= 1;
      }
      return value;
    },
    isEmpty() {
      return this.index < 0;
    },
    iterator() {
      let iterationIndex = this.index;
      // Lexical binding of `this` with fat arrow allows us to return the `stack` object
      return () => {
        if (iterationIndex > this.index) {
          iterationIndex = this.index;
        }
        if (iterationIndex < 0) {
          return {done: true};
        }
        else {
          return {done: false, value: this.array[iterationIndex--]}
        }
      }
    }
  });
var stack = Stack1();
stack.push('Greetings');
stack.push('to');
stack.push('you!');

var iter = stack.iterator(); // Calling it here returns the iteration function
iter().value; // 'you!'
iter().value; // 'to'
iter().value; // 'Greetings'

// `sum` function implemented as a fold over a functional iterator:
var iteratorSum = (iterator) => {
  let eachIteration,
      sum = 0;
  while ((eachIteration = iterator(), !eachIteration.done)) {
    sum += eachIteration.value;
  }
  return sum;
}
// Using with stack:
var stack = Stack1();
stack.push(1);
stack.push(2);
stack.push(3);
iteratorSum(stack.iterator()); // 6

// Iterator objects:
var Stack2 = () =>
  ({
    array: [],
    index: -1,
    // ... Stack methods such as push(..), pop(..) go here...

    // Iterator object here:
    iterator() {
      let iterationIndex = this.index;
      return {
        // Return an object with a `next(..)` method on it
        next() {
          if (iterationIndex > this.index) {
            iterationIndex = this.index;
          }
          if (iterationIndex < 0) {
            return {done: true};
          }
          else {
            return {done: false, value: this.array[iterationIndex--]}
          }
        }
      }
    }
  });

var collectionSum = (collection) => {
  // Returns the iterator object (which has a .next(..) method)
  const iterator = collection.iterator();
  let eachIteration,
      sum = 0;
  while ((eachIteration = iterator.next(), !eachIteration.done)) {
    sum += eachIteration.value;
  }
  return sum;
}
collectionSum(stack);

// Iterables --> Using `Symbol.iterator`, to stop conflicts
// Instead of naming the iterator as `iterator()`:
var Stack3 = () =>
  ({
    array: [],
    index: -1,
    // ... Stack methods such as push(..), pop(..) go here...

    // Symbol.iterator:
    [Symbol.iterator]() {
      let iterationIndex = this.index;
      return {
        // Return an object with a `next(..)` method on it
        next() {
          if (iterationIndex > this.index) {
            iterationIndex = this.index;
          }
          if (iterationIndex < 0) {
            return {done: true};
          }
          else {
            return {done: false, value: this.array[iterationIndex--]}
          }
        }
      }
    }
  });

// Invoked in this way:
var collectionSum = (collection) => {
  const iterator = collection[Symbol.iterator]();
  let eachIteration,
      sum = 0;
  while ((eachIteration = iterator.next(), !eachIteration.done)) {
    sum += eachIteration.value;
  }
  return sum
}
// Works the same way:
collectionSum(stack);

// We can also now use the `for..of` loop!
var iterableSum = (iterable) => {
  let sum = 0;
  for (const num of iterable) {
    sum += num;
  }
  return sum
}
iterableSum(stack);

// `for..of` loop works on any object that is iterable, aka any object that has a `Symbol.iterator` on it

// Iterable linked list
const EMPTY = {
  isEmpty: () => true
};
var isEmpty = (node) => node === EMPTY;
var Pair1 = (first, rest = EMPTY) => 
  ({
    first,
    rest,
    isEmpty() {return false},
    [Symbol.iterator]() {
      let currentPair = this;
      return {
        next() {
          if (currentPair.isEmpty()) {
            return {done: true}
          }
          else {
            const value = currentPair.first;
            currentPair = currentPair.rest;
            return {done: false, value}
          }
        }
      }
    }
  });

// List generating function:
var list = (...elements) => {
  const [first, ...rest] = elements;
  return elements.length === 0
    ? EMPTY
    : Pair1(first, list(...rest))
}
var someSquares = list(1, 4, 9, 16, 25);
iterableSum(someSquares); // 55

// `...` spread operator can also be used to spread an iterable:
['some squares' , ...someSquares];
// ['some squares', 1, 4, 9, 16, 25]

// Spread the elements of an array literal into parameters:
var firstAndSecondElement = (first, second) => 
  ({first, second});

firstAndSecondElement(...stack); // {'first': 5, 'second': 10}

// Iterables can represent infinite values:
var Numbers = {
  [Symbol.iterator]() {
    let n = 0;
    return {
      next: () => ({done: false, value: n++})
    }
  }
}
// Do not use the `...` spread operator with these!

// Operations on ordered collections:
var mapWith = (fn, collection) => 
  ({
    [Symbol.iterator]() {
      // Invoke iterator of collection
      const iterator = collection[Symbol.iterator]();
      return {
        next() {
          const {done, value} = iterator.next();
          return ({done, value: done ? undefined : fn(value)});
        }
      }
    }
  })

// Pattern of working with ordered collections:
// => Make them iterable (they have `[Symbol.iterator]` method, that returns an iterator. Iterator is also an object but with a `.next()` method that is invoked repeatedly)

var Evens = mapWith((x) => 2 * x, Numbers);
for (const i of Evens) {
  console.log(i);
}
// 0 2 4 6 ...

// Everytime we write `for (const i of Evens)`, JS calls `Evens[Symbol.iterator]()`, which executes `const iterator = Numbers[Symbol.iterator]()`

// `filterWith(..)`
var filterWith = (fn, iterable) =>
  ({
    [Symbol.iterator]() {
      const iterator = iterable[Symbol.iterator]();
      return {
        next() {
          do {
            const {done, value} = iterator.next();
          } while (!done && !fn(value));
          return {done, value};
        }
      }
    }
  });

// `untilWith(..)`
var untilWith = (fn, iterable) => 
  ({
    [Symbol.iterator]() {
      const iterator = iterable[Symbol.iterator]();
      return {
        next() {
          let {done, value} = iterator.next();
          done = done || fn(value);
          return ({done, value: done ? undefined: value})
        }
      }
    }
  });

var Squares = mapWith((x) => x * x, Numbers);
var EndWithOne = filterWith((x) => x % 10 === 1, Squares);
var UpTo1000 = untilWith((x) => (x > 1000), EndWithOne);
[...UpTo1000]; // [1, 81, 121, 361, 441]

// Two more handy iterable functions `first` and `rest`
var first = (iterable) =>
  iterable[Symbol.iterator]().next().value;

var rest = (iterable) =>
  ({
    [Symbol.iterator]() {
      const iterator = iterable[Symbol.iterator]();
      iterator.next();
      return iterator;
    }
  })

// `from`
// A function that gathers an iterable into a particular collection type
// For example: 
Array.from(UpTo1000); // Turns it into an array

// Since functions are mutable objects, we can assign properties to them with a `.` or `[]`. 
Stack3.from = function (iterable) {
  const stack = this();
  for (let element of iterable) {
    stack.push(element);
  }
  return stack;
}
Pair1.from = (iterable) =>
  (function iterationToList(iteration) {
    const {done, value} = iteration.next();
    return done ? EMPTY : Pair1(value, iterationToList(iteration));
  })(iterable[Symbol.iterator]())

// Going end to end:
var numberList = Pair1.from(untilWith((X) => x > 10, Numbers));

Pair1.from(Squares);
// {"first": 0, 
//  "rest": {"first": 1,
//           "rest": {"first": 4, "rest": {...}}}}