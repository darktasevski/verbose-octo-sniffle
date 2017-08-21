/**
 * Chapter 6: Constructors and Classes
 * 
 * Section 1: Constructors and `new`
**/

// Given:
var i = new Ur();

// `i` is an instance of `Ur`
// `Ur` is a constructor of `i`, and thus `Ur` is a constructor function

// Every instance created with `new` acquires a constructor element that is initialized to their constructor function
var continent = new Ur();
continent.constructor; // [Function];
continent.constructor === Ur; // true

// Re-writing Queue using `new` and `.prototype`, using `this` and `Object.assign`:
var Queue = function() {
  Object.assign(this, {
    array: [],
    head: 0,
    tail: -1
  })
};
Object.assign(Queue.prototype, {
  pushTail(value) {
    return this.array[this.tail += 1] = value
  },
  pullHead() {
    let value;
    if (!this.isEmpty()) {
      value = this.array[this.head]
      this.array[this.head] = void 0;
      this.head += 1;
      return value
    }
  },
  isEmpty() {
    return this.tail < this.head;
  }
});

// When a function is invoked by the `new` operator, `this` is set to the new object being created

// Emulating `new` keyword using `Object.create`
function worksLikeNew(constructor, ...args) {
  const instance = Object.create(constructor.prototype);

  instance.constructor = constructor;

  const result = constructor.apply(instance, args);
  return result === undefined ? instance : result;
}
function NamedContinent(name) {
  this.name = name;
}
NamedContinent.prototype.description = function() {
  `A continent named "${this.name}"`
};
var na = worksLikeNew(NamedContinent, 'North America');
na.description; // A continent named 'North America'

// Side function for multiplication!
var times = (a, b) => 
  a === 0
    ? 0
    : b + times(a-1, b);

// Classes, abstractioning
var clazz = (...args) => {
  let superclazz, properties, constructor;

  if (args.length === 1) {
    [superclazz, properties] = [Object, args[0]]
  }
  else [superclazz, properties] = args;

  if (properties.constructor) {
    constructor = function(...args) {
      return properties.constructor.apply(this, args);
    }
  }
  else constructor = function () {};

  constructor.prototype = Object.create(superclazz.prototype);
  Object.assign(constructor.prototype, properties);
  Object.defineProperty(
    constructor.prototype,
    'constructor',
    {value: constructor}
  );
  return constructor;
}

// Write a Queue using `clazz` function: 
var Queue = clazz({
  constructor: function() {
    Object.assign(this, {
      array: [],
      head: 0,
      tail: -1
    });
  },
  pushTail: function(value){
    return this.array[this.tail += 1] = value
  },
  pullHead: function() {
    if (!this.isEmpty()) {
      let value = this.array[this.head]
      this.array[this.head] = void 0;
      this.head += 1;
      return value
    }
  },
  isEmpty: function() {
    return this.tail < this.head
  }
});

// Using `Object.assign()` to mix functionality into classes:
var HasManager = {
  setManager(manager) {
    this.removeManager();
    this.manager = manager;
    manager.addReport(this);
    return this;
  },
  removeManager() {
    if (this.manager) {
      this.manager.removeReport(this);
      this.manager = undefined;
    }
    return this;
  }
};
var Manager = clazz(Person, {
  constructor: function(first, last) {
    Person.call(this, first, last);
  },
  addReport(report) {
    this.reports().add(report);
    return this;
  },
  removeReport(report) {
    this.reports().delete(report);
    return this;
  },
  reports() {
    return this._reports || (this._reports = new Set());
  }
});
var MiddleManager = clazz(Manager, {
  constructor: function(first, last) {
    Manager.call(this, first, last);
  }
});
Object.assign(MiddleManager.prototype, HasManager);

var Worker = clazz(Person, {
  constructor: function(first, last) {
    Person.call(this, first, last);
  }
});
Object.assign(Worker.prototype, HasManager);

// Decorating methods:
var fluent = (methodBody) => 
  function(...args) {
    methodBody.apply(this, args);
    return this;
  }

var Manager = clazz(Person, {
  constructor: function(first, last) {
    Person.call(this, first, last);
  },
  addReport: fluent(function(report) {
    this.reports().add(report);
  }),
  // ... rest
});

/**
 * `class` keyword
 * Syntactic sugar for writing constructor functions with prototypes
**/
class Person {
  constructor(first, last) {
    this.rename(first, last);
  }
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
  rename(first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
}

// Privacy with symbols
var PrivatePerson = (() => {
  const firstName = Symbol('firstName'),
        lastName = Symbol('lastName');
  
  return class Person { // Notice it returns a `class`, which makes it returnable 
    constructor(first, last) {
      this.rename(first, last);
    }
    fullName() {
      return this[firstName] + ' ' + this[lastName]
    }
    rename(first, last) {
      this[firstName] = first;
      this[lastName] = last;
      return this;
    }
  }
})();

// Object methods within instances
var WidgetModel = function(id, attrs) {
  Object.assign(this, attrs || {});
  this.id = function() {return id}; // Object method
}
// Set and get are instance methods
Object.assign(WidgetModel.prototype, {
  set: function(attr, value) {
    this[attr] = value;
    return this;
  },
  get: function(attr) {
    return this[attr];
  }
})