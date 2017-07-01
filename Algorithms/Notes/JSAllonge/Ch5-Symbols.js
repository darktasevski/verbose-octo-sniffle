/**
 *  Chapter 5: Symbols
**/

// A function that returns a unique entity. No two symbols are alike
// It is possible to add your own text to make it intelligible:
Symbol('Allonge').toString();

// Privacy with symbols
// When a symbol is used as a property name, it is automatically unique and non-enumerable
// Private properties to objects:
var Queue = () => 
  ({
    array: [],
    head: 0,
    tail: -1,
    pushTail(value) {
      return this[array][this[tail] += 1] = value
    },
    pullHead() {
      if (this[tail] >= this[head]) {
        let value = this[array][this[head]];
        this[array][this[head]] = undefined;
        this[head] += 1;
        return value
      }
    },
    isEmpty() {
      return this[tail] < this[head]
    }
  });
let q = Queue();
q.pushTail('hello');
q.pushTail('symbols');
q.pullHead(); // 'hello'
q; // {"array":["hello","symbols"],"head":0,"tail":1}
q.tail; // 1 <== accessible

// Because we used compact method syntax, the 'pushTail', 'pushHead', and 'isEmpty' properties are not enumerable.
// But 'array', 'head,' and 'tail' properties are enumerable

// Use symbols for these properties instead
const array = Symbol(),
      head = Symbol(),
      tail = Symbol();

var Queue = () =>
  ({
    [array]: [], // <- Symbol
    [head]: 0, // <- Symbol
    [tail]: -1, // Symbol
    pushTail (value) {
      return this[array][this[tail] += 1] = value
    },
    pullHead () {
      if (this[tail] >= this[head]) {
        let value = this[array][this[head]];
        
        this[array][this[head]] = undefined;
        this[head] += 1;
        return value
      }
    },
    isEmpty () {
      return this[tail] < this[head]
    }
  });