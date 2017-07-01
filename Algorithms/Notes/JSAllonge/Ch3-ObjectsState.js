/**
 * Chapter 3, section 2: Objects and State
**/

// Make a stack:
var stack = (() => {
  const obj = {
    array: [],
    index: -1,
    push(value) {
      return obj.array[obj.index += 1] = value
    },
    pop() {
      const value = obj.array[obj.index];
      obj.array[obj.index] = undefined;
      if (obj.index >= 0) {
        obj.index -= 1
      }
      return value
    },
    isEmpty() {
      return obj.index < 0
    }
  };
  return obj;
})();
// State is preserved due to closure
stack.isEmpty(); // true
stack.push('hello'); // 'hello'
stack.push('JavaScript'); // 'JavaScript'
stack.isEmpty(); // false
stack.pop(); // 'JavaScript'
stack.pop(); // 'hello'
stack.isEmpty(); // true

// A method is a function that belongs to an object and iteracts with it

// Hiding state:
var stack = (() => {
  // Hiding state here, and leaving them off objects
  let array = [],
  index = -1;
  const obj = {
    push(value) {return array[index += 1] = value},
    pop() {
      const value = array[index];
      array[index] = undefined;
      if (index >= 0) {
        index -= 1
      }
      return value
    },
    isEmpty() {return index < 0}
  };
  return obj;
})();
stack.isEmpty(); // true
stack.push('hello'); // 'hello'
stack.push('JavaScript'); // 'JavaScript'

// Stack maker:
var Stack = () => {
  const array = [];
  let index = -1;

  return {
    push(value) {return array[index += 1] = value},
    pop() {
      const value = array[index];
      array[index] = undefined;
      if (index >= 0) {
        index -= 1
      }
      return value
    },
    isEmpty() {return index < 0}
  }
}
var stack = Stack();
stack.push('Hello');
stack.push('Good bye');
stack.pop(); // 'Good bye'

// Extension:
var Queue = () => {
  let array = [],
      head = 0,
      tail = -1;

  return {
    pushTail: (value) => array[++tail] = value,
    pullHead: () => {
      if (tail >= head) {
        const value = array[head];
        array[head] = undefined;
        ++head;
        return value
      }
    },
    isEmpty: () => tail < head
  }
};
var queue = Queue();
queue.pushTail('Hello');
queue.pushTail('Aos');
queue.pushTail('Lou');
queue.pullHead(); // 'Hello'
queue.pullHead(); // 'Aos'

// Amnesiac queue
var AmnesiacQueue = () => 
  ({
    array: [],
    head: 0,
    tail: -1,
    pushTail(myself, value) {
      return myself.array[myself.tail += 1] = value
    },
    pullHead(myself) {
      if (myself.tail >= myself.head) {
        let value = myself.array[myself.head];
        myself.array[myself.head] = void 0;
        myself.head += 1;
        return value;
      }
    },
    isEmpty(myself) {
      return myself.tail < myself.head
    }
  });
var queueWithAmnesia = AmnesiacQueue();
queueWithAmnesia.pushTail(queueWithAmnesia, 'Hello');
queueWithAmnesia.pushTail(queueWithAmnesia, 'Aos');
queueWithAmnesia.pullHead(queueWithAmnesia); // 'Hello'

// Amnesiac queue using `this`
var AmnesiacQueue = () => 
  ({
    array: [],
    head: 0,
    tail: -1,
    pushTail(value) {
      return this.array[this.tail += 1] = value
    },
    pullHead() {
      if (this.tail >= this.head) {
        let value = this.array[this.head];
        this.array[this.head] = void 0;
        this.head += 1;
        return value;
      }
    },
    isEmpty() {
      return this.tail < this.head
    }
  });
  var betterQueue = BetterQueue();
  betterQueue.pushTail('Hello');
  betterQueue.pushTail('Aos');
  betterQueue.pullHead(); // 'Hello'
// `betterQueue` is automatically bound to the name `this` within

// This can be used to solve copying arrays of objects
var copyOfQueue = Object.assign({}, betterQueue)
copyOfQueue.array = []
for (let i = 0; i < 2; ++i) {
  copyOfQueue.array[i] = betterQueue.array[i]
}
betterQueue.pullHead(); // 'Hello'
copyOfQueue.pullHead(); // 'Hello'

// Context and function calls
// Context for a function call is set by the way the function is called, not the function itself
// Consider:
var someObject = {
  someFunction() {
    return this;
  }
};
someObject.someFunction() === someObject; // true
// However:
var someFunction = someObject.someFunction;
someFunction === someObject.someFunction; // true
someFunction() === someObject; // false
// And also:
var anotherObject = {
  someFunction: someObject.someFunction
}
anotherObject.someFunction === someObject.someFunction;
// true
anotherObject.someFunction() === anotherObject; // true
anotherObject.someFunction() === someObject; // false

// Arguments:
var third = function() {
  return arguments[2]
}
third(2, 3, 4, 5, 6); // 4

// Application and contextualization
var a = [1, 2, 3];
var contextualize = (fn, context) => 
  (...args) =>
    fn.apply(context, args);
var accrete2 = contextualize(a.concat, a);
accrete2([4, 5]); // [1, 2, 3, 4, 5]

// Consider:
var aFourthObject = {},
    returnThis = function() {return this;};
aFourthObject.uncontextualized = returnThis;
aFourthObject.contextualized = contextualize(returnThis, aFourthObject);

aFourthObject.uncontextualized() === aFourthObject; // true
aFourthObject.contextualized() === aFourthObject; // true

// Now:
var uncontextualized = aFourthObject.uncontextualized,
    contextualized = aFourthObject.contextualized;

uncontextualized() === aFourthObject; // false
// Only the bottom one works because we maintain the context
contextualized() === aFourthObject; // true

// Method Decorators
// Decorators can be used to decorate methods provided that they carefull preserve the function's context
// Consider `maybe`:
// Decorates a function: applies function if argument passed in, otherwise returns parameter
var maybe = (fn) => 
  x => x != null ? fn(x) : x;

var plus1 = x => x + 1;
plus1(1); // 2
plus1(0); // 1
plus1(null); // 1
plus1(undefined); // null <------ ???

var maybePlus1 = maybe(plus1);
maybePlus1(1); // 2
maybePlus1(0); // 1
maybePlus1(null); // null
maybePlus1(undefined); // undefined <------ much better

// Convert to a `function` expression to preserve context and use `.call(..)` to preserve `this`:
var maybe = (fn) => 
  function(x) {
    return x != null ? fn.call(this, x) : x;
  }

// Let's handle variadic functions and methods, by gathering arguments and using `apply(..)`
var maybe = (fn) =>
  function (...args) {
    for (const i in args) {
      // This method is only invoked if none of the arguments are `null` or `undefined`
      if (args[i] == null) return args[i];
    }
    return fn.apply(this, args);
  }

// Test it out:
var someObject = {
  setSize: maybe(function(size) {
    this.size = size;
  })
}
someObject.setSize(5);
someObject; // {setSize: [Function], size: 5}
someObject.setSize();
someObject; // {setSize: [Function], size: 5}