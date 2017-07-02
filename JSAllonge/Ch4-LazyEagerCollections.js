/**
 * Chapter 4, section 3: Lazy and Eager Collections
**/

// Implementing a `LazyCollection`
var extend = function(consumer, ...providers) {
  for (let i = 0; i < providers.length; ++i) {
    const provider = providers[i];
    for (let key in provider) {
      if (provider.hasOwnProperty(key)) {
        consumer[key] = provider[key];
      }
    }
  }
  return consumer;
}

// Lazy collection:
var LazyCollection = {
  map(fn) {
    return Object.assign({
      [Symbol.iterator]: () => {
        const iterator = this[Symbol.iterator]();
        return {
          next: () => {
            const {done, value} = iterator.next();
            return ({
              done, value: done ? undefined : fn(value)
            });
            }
          }
        }
      }, LazyCollection);
    },

    reduce(fn, seed) {
      const iterator = this[Symbol.iterator]();
      let iterationResult,
          accumulator = seed;

      while ((iterationResult = iterator.next(), !iterationResult.done)) {
        accumulator = fn(accumulator, iterationResult.value);
      }
      return accumulator;
    },

    filter(fn) {
      return Object.assign({
        [Symbol.iterator]: () => {
          const iterationResult = this[Symbol.iterator]();
          return {
            next: () => {
              do {
                const {done, value} = iterator.next();
              } while(!done && !fn(value));
              return {done, value};
            }
          }
        }
      }, LazyCollection);
    },
    
    find(fn) {
      return Object.assign({
        [Symbol.iterator]: () => {
          const iterator = this[Symbol.iterator]();
          return {
            next: () => {
              let {done, value} = iterator.next();
              done = done || fn(value);
              return ({done, value: done ? undefined : value});
            }
          }
        }
      }, LazyCollection);
    },
    
    until(fn) {
      return Object.assign({
        [Symbol.iterator]: () => {
          const iterator = this[Symbol.iterator]();
          return {
            next: () => {
              let {done, value} = iterator.next();
              done = done || fn(value);
              return ({done, value: done ? undefined : value});
            }
          }
        }
      }, LazyCollection);
    },

    first() {
      return this[Symbol.iterator]().next().value;
    },

    rest() {
      return Object.assign({
        [Symbol.iterator]: () => {
          const iterator = this[Symbol.iterator]();
          iterator.next();
          return iterator;
        }
      }, LazyCollection);
    },

    take(numberToTake) {
      return Object.assign({
        [Symbol.iterator]: () => {
          const iterator = this[Symbol.iterator]();
          let remainingElements = numberToTake;
          return {
            next: () => {
              let {done, value} = iterator.next();
              done = done || remainingElements-- <= 0;
              return ({done, value: done ? undefined : value});
            }
          }
        }
      }, LazyCollection);
    }
  }

// Mixing `LazyCollection` with any iterable object:
var Numbers = Object.assign({
  [Symbol.iterator]: () => {
    let n = 0;
    return {
      next: () => ({done: false, value: n++})
    }
  }
});

// Or a pair (aka, linked lists)
const EMPTY = {
  isEmpty: () => true
};
const isEmpty = (node) => node === EMPTY;

var Pair = (car, cdr = EMPTY) => 
  Object.assign({
    car,
    cdr,
    isEmpty: () => false,
    [Symbol.iterator]: function() {
      let currentPair = this;
      return {
        next: () => {
          if (currentPair.isEmpty()) {
            return {done: true}
          }
          else {
            const value = currentPair.car;
            currentPair = currentPair.cdr;
            return {done: false, value}
          }
        }
      }
    }
  }, LazyCollection);

Pair.from = (iterable) =>
  (function iterationToList(iteration) {
    const {done, value} = iteration.next();
    return done ? EMPTY : Pair(value, iterationToList(iteration))(iterable[Symbol.iterator]());
  });

// Stack
var Stack = () =>
  Object.assign({
    array: [],
    index: -1,
    push: function(value) {
      return this.array[this.index += 1] = value;
    },
    pop: function() {
      const value = this.array[this.index];
      this.array[this.index] = undefined;
      if (this.index >= 0) {
        this.index = -1
      }
      return value;
    },
    isEmpty: function() {
      return this.index < 0;
    },
    [Symbol.iterator]: function() {
      let iterationIndex = this.index;
      return {
        next: () => {
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
  }, LazyCollection);

Stack.from = function(iterable) {
  const stack = this();
  for (let element of iterable) {
    stack.push(element);
  }
  return stack;
}
// In action:
Stack.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
.map((x) => x * x)
.filter((x) => x % 2 == 0)
.first()
// 100

Pair.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
.map((x) => x * x)
.filter((x) => x % 2 == 0)
.reduce((seed, element) => seed + element, 0)
// 220

// An eager collection:
// Returns a collection of its own type from each of the methods
// We make an eager collection out of any collection that is gatherable, meaning it has a .from method
var EagerCollection = (gatherable) =>
  ({
    map(fn) {
      const original = this;
      return gatherable.from(
        (function *() {
          for (let element of original) {
            yield fn(element);
          }
        })()
      );
    },
    reduce(fn, seed) {
      let accumulator = seed;
      for (let element of this) {
        accumulator = fn(accumulator, element);
      }
      return accumulator;
    },
    filter(fn) {
      const original = this;
      return gatherable.from(
        (function *() {
          for (let element of original) {
            if (fn(element)) yield element;
          }
        })()
      );
    },
    until(fn) {
      const original = this;
      return gatherable.from(
        (function *() {
          for (let element of original) {
            if (fn(element)) break;
            yield element;
          }
        })()
      );
    },
    first() {
      return this[Symbol.iterator]().next().value;
    },
    rest() {
      const iteration = this[Symbol.iterator]();
      iteration.next();
      return gatherable.from(
        (function *() {
          yield* iteration;
        })()
      );
    },
    take(numberToTake) {
      const original = this;
      let numberRemaining = numberToTake;
      return gatherable.from(
        (function *() {
          for (let element of original) {
            if (numberRemaining-- <= 0) break;
            yield element;
          }
        })()
      );
    }
  });

// `Pair` implementation
var Pair = (car, cdr = EMPTY) =>
  Object.assign({
    car,
    cdr,
    isEmpty: () => false,
    [Symbol.iterator]: function() {
      let currentPair = this;
      return {
        next: () => {
          if (currentPair.isEmpty()) {
            return {done: true}
          }
          else {
            const value = currentPair.car;
            currentPair = currentPair.cdr;
            return {done: false, value}
          }
        }
      }
    }
  }, EagerCollection(Pair));

Pair.from = (iterable) =>
  (function iterationToList(iteration) {
    const {done, value} = iteration.next();
    return done ? EMPTY : Pair(value, iterationToList(iteration));
  })(iterable[Symbol.iterator]());

Pair.from([1, 2, 3, 4, 5]).map(x => x * 2);

// Checkerboard game:
var Game = (size = 8) => {
  // initialize the board:
  const board = [];
  for (let i = 0; i < size; ++i) {
    board[i] = [];
    for (let j = 0; j < size; ++j) {
      // Randomly assign an arrow
      board[i][j] = '←→↓↑'[Math.floor(Math.random() * 4)]
    }
  }
  // Initialize the position
  let initialPosition = [
    2 + Math.floor(Math.random() * (size - 4)),
    2 + Math.floor(Math.random() * (size - 4))
  ];

  // ??
  let [x, y] = initialPosition;

  const MOVE = {
    '←': ([x, y]) => [x - 1, y],
    '→': ([x, y]) => [x + 1, y],
    '↓': ([x, y]) => [x, y - 1],
    '↑': ([x, y]) => [x, y + 1]
  };

  while (x >= 0 && y >= 0 && x < size && y < size) {
    const arrow = board[x][y];
    // ???
    [x, y] = MOVE[arrow]([x, y]);
  }
  // ???
};
// What do you write in place of the three '???' placeholders to determine whether the game halts?

// Solution:
// 1. Extract the board to make it easier to test:
const MOVE = {
    '←': ([x, y]) => [x - 1, y],
    '→': ([x, y]) => [x + 1, y],
    '↓': ([x, y]) => [x, y - 1],
    '↑': ([x, y]) => [x, y + 1]
  };
var Board = (size = 8) => {
  // initialize the board:
  const board = [];
  for (let i = 0; i < size; ++i) {
    board[i] = [];
    for (let j = 0; j < size; ++j) {
      // Randomly assign an arrow
      board[i][j] = '←→↓↑'[Math.floor(Math.random() * 4)]
    }
  }
  // Initialize the position
  const position = [
    Math.floor(Math.random() * size),
    Math.floor(Math.random() * size)
  ];
  return {board, position};
}
var Game = ({board, position}) => {
  const size = board[0].length;
  return ({
    *[Symbol.iterator]() {
      let [x, y] = position;
      while (x >= 0 && y >= 0 && x < size && y < size) {
        const direction = board[y][x];
        yield direction;
        [x, y] = MOVE[direction]([x, y]);
      }
    }
  });
};
// Stateful Map is a lazy map that preserves state from iteration to iteration. We need to know the current position to map each move to the next position
var statefulMapWith = (fn, seed, iterable) => 
  ({
    *[Symbol.iterator]() {
      let value,
          state = seed;
      for (let element of iterable) {
        [state, value] = fn(state, element);
        yield value;
      }
    }
  })

// Map an iterable of directions to an iterable of strings representing positons:
const positionOf = (game) =>
  statefulMapWith(
    (position, direction) => {
      cost [x, y] = MOVE[direction](position);
      position = [x, y];
      return [position, `x: ${x}, y: ${y}`];
    },
    [0, 0],
    game);