/**
 * Chapter 8: Composing Class Behavior
**/

// Using a mixin to allow `Worker` and `MiddleManager` to share the functionality for having a manager
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
class Manager extends Person {
  constructor(first, last) {
    super(first, last)
  }
  addReport(report) {
    this.reports().add(report);
    return this;
  }
  removeReport(report) {
    this.reports().delete(report);
    return this;
  }
  reports() {
    return this._reports || (this._reports = new Set());
  }
}
class MiddleManager extends Manager {
  constructor(first, last) {
    super(first, last);
  }
}
Object.assign(MiddleManager.prototype, HasManager);

class Worker extends Person {
  constructor(first, last) {
    super(first, last);
  }
}
Object.assign(Worker.prototype, HasManager)

// The object mixin pattern:
// Class of todo items:
class Todo {
  constructor(name) {
    this.name = name || 'Untitled';
    this.done = false;
  }
  do() {
    this.done = true;
    return this;
  }
  undo() {
    this.done = false;
    return this;
  }
}
// Mixin responsible for color coding
var Colored = {
  setColorRGB({r, g, b}) {
    this.colorCode = {r, g, b};
    return this;
  },
  getColorRGB() {
    return this.colorCode;
  }
}
Object.assign(Todo.prototype, Colored);
new Todo('test').setColorRGB({r: 1, g: 2, b: 3});
// {'name':'test', 'done':false, 'colorCode':{'r': 1, 'g': 2, 'b': 3}}

// Functional mixins:
var Colored = (target) =>
  Object.assign(target, {
    setColorRGB({r, g, b}) {
      this.colorCode = {r, g, b};
      return this;
    },
    getColorRGB() {
      return this.colorCode
    }
  });
  Colored(Todo.prototype);

// A factory function that names this pattern:
var FunctionalMixin = (behavior) =>
  (target) => Object.assign(target, behavior);

// Define functional mixins neatly:
var Colored = FunctionalMixin({
  setColorRGB ({r, g, b}) {
    this.colorCode = {r, g, b};
    return this;
  },
  getColorRGB () {
    return this.colorCode;
  }
});

// Emulating multiple inheritance
class Todo2 {
  constructor(name) {
    this.name = name || 'Untitled';
    this.done = false;
  }
  do() {
    this.done = true;
    return this;
  }
  undo() {
    this.done = false;
    return this;
  }
  toHTML() {
    return this.name; // Highly insecure
  }
}
class Colored2 {
  setColorRGB({r, g, b}) {
    this.colorCode = {r, g, b};
    return this;
  }
  getColorRGB() {
    return this.colorCode;
  }
}
let yellow = {r: 'FF', g: 'FF', b: '00'},
    red = {r: 'FF', g: '00', b: '00'},
    green = {r: '00', g: 'FF', b: '00'},
    grey = {r: '80', g: '80', b: '80'}

let oneDayInMilliseconds = 1000 * 60 * 60 * 24;

// This does not work: 

// class TimeSensitiveTodo extends Todo2, Colored2 {
//   constructor(name, deadline) {
//     super(name);
//     this.deadline = deadline
//   }
//   getColorRGB() {
//     let slack = this.deadline - Date.now();
//     if (this.done) {
//       return grey;
//     }
//     else if (slack <= 0) {
//       return red;
//     }
//     else if (slack <= oneDayInMilliseconds) {
//       return yellow;
//     }
//     else return green;
//   }
//   toHTML() {
//     let rgb = this.getColorRGB();
//     return `<span style="color: #${rgb.r}${rgb.g}${rgb.b};">${super.toHTML()}</span>`;
//   }
// }

// Conventionally, this is done like this:
class Todo3 {
  // ...
}
class ColoredTodo3 extends Todo3 {
  // ... 
}
class TimeSensitiveTodo3 extends Colored2 {
  // ...
}

// Alternatively, using classes as expressions:
let Colored4 = FunctionalMixin({
  setColorRGB({r, g, b}) {
    this.colorCode = {r, g, b};
    return this;
  },
  getColorRGB() {
    return this.colorCode;
  }
});
let ColoredTodo4 = Colored4(class extends Todo {});

// Using symbols to reduce coupled properties:
// Using `Set()` to refactor bibliophile
class Bibliophile2 extends Person {
  constructor(first, last) {
    super(first, last);
    this._books = new Set();
  }
  addToCollection(name) {
    this._books.add(name);
    return this;
  }
  hasInCollection(name) {
    return this._books.has(name);
  }
}

// Now using symbols to prevent accidental property conflicts:
var Bibliophile3 = (function() {
  const books = Symbol('books');
  return class Bibliophile extends Person {
    constructor(first, last) {
      super(first, last);
      this[books] = [];
    }
    addToCollection(name) {
      this[books].push(name);
      return this;
    }
    hasInCollection(name) {
      return this[books].indexOf(name) >= 0;
    }
  }
})();