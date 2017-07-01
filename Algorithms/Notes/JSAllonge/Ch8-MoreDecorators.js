/**
 * Chapter 8, section 2: Method Decorators
**/

// `requireAll()` decorator:
// Raises an exception if a function is invoked without at least as many arguments as declared parameters
var requireAll = (fn) => 
  function(...args) {
    if (args.length < fn.length) {
      throw new Error('Missing required arguments');
    }
    else return fn(...args);
  }

// Using it with methods, to preserve `this` 
var requireAll = (fn) =>
  function(...args) {
    if (args.length < fn.length) {
      throw new Error('missing required arguments');
    }
    else return fn.apply(this, args);
  }

// Stateful decorators:
// `once` -> guarantees a function only runs once
var once = (fn) => {
  let hasRun = false;
  return function(...args) {
    if (hasRun) return;
    hasRun = true;
    return fn.apply(this, args);
  }
}

// Allow a person's name to only be set once:
Object.defineProperty(Person.prototype, 'setName', {value: once(Person.prototype.setName)});
var logician = new Person()
                .setName('Raymond', 'Smullyan')
                .setName('Haskell', 'Curry');

logician.fullName(); // Raymond Smullyan

var musician = new Person().setName('Miles', 'Davis');
musician.fullName(); // Raymond Smullyan <---- ????
// This occurs because both all instances of Person share that function

// Using `WeakSet()` to track whether a method has been invoked for an instance
var once = (fn) => {
  let invocations = new WeakSet();
  return function(...args) {
    if (invocations.has(this)) return;
    invocations.add(this);
    return fn.apply(this, args);
  }
}
var logician = new Person()
              .setName('Raymond', 'Smullyan');
logician.setName('Haskell', 'Curry');

var musician = new Person()
              .setName('Miles', 'Davis');

logician.fullName(); // Raymond Smullyan
musician.fullName(); // Miles Davis

// However this will not work with 'use strict' mode
// To correct:
var once = (fn) => {
  let invocations = new WeakSet(),
      undefinedContext = Symbol('undefined-context');

  return function(...args) {
    var context = this === undefined
                  ? undefinedContext
                  : this;
    if (invocations.has(context)) return;
    invocations.add(context);
    return fn.apply(this, args);
  }
}