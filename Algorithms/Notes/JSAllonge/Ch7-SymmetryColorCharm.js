/**
 * Chapter 7: Symmetry, Color, and Charm
**/

// The maybe decorator:
var maybe = (fn) => 
  (...args) => {
    for (let arg of args) {
      if (arg == null ) return arg;
    }
    return fn(...args);
  }

// The compose combinator
var compose = (a, b) => (x) => a(b(x));
compose(x => x + 1, y => y * y)(10); // 101

// Decorator that makes a function throw an exception if its argument is not a finite number
var requiresFinite = (fn) =>
  (n) => {
    if (Number.isFinite(n)) {
      return fn(n);
    }
    else throw 'Bad Wolf';
  }
var plusOne = (x) => x + 1;

plus1(1); // 2
plus1([]); // 1 <---- ????????

var safePlusOne = requiresFinite(plusOne);
safePlusOne(1); 2
safePlusOne([]); // throws 'Bad Wolf'

// But this will not work on methods
class Circle {
  constructor (radius) {
    this.radius = radius;
  }
  diameter() {
    return 2 * this.radius;
  }
  scaleBy(factor) {
    return new Circle(factor * this.radius)
  }
}
var two = new Circle(2);
two.scaleBy(3).diameter(); // 6
two.scaleBy(null).diameter(); // 0

// Decorate `scaleBy` method to check its argument
Circle.prototype.scaleBy = requiresFinite(Circle.prototype.scaleBy)
two.scaleBy(null).diameter(); // throws 'Bad Wolf'

// Put it into production:
two.scaleBy(3).diameter(); // undefined is not an object, evaluating `this.radius`
// This is because method invocations are 'yellow' code, and function decorators are 'blue' code and will not work on methods

// Composing functions with 'green' code
// This style will work for both pure functions and methods
// Use function keyword so that `this` is bound, and invoke our decorated function using `.call()` so that we pass `this` along

var requiresFinite = (fn) => 
  function(n) {
    if (Number.isFinite(n)) {
      return fn.call(this, n);
    }
    else throw 'Bad Wolf';
  }

Circle.prototype.scaleBy = requiresFinite(Circle.prototype.scaleBy)
two.scaleBy(3).diameter(); // 6
two.scaleBy('three').diameter(); // throws 'Bad Wolf'

var safePlusOne = requiresFinite(x => x + 1);
safePlusOne(1); // 2
safePlusOne([]); // throws 'Bad Wolf'

// Writing 'maybe' in 'green' style code
var maybe = (fn) =>
  function(...args) {
    for (let arg of args) {
      if (arg == null) {
        return arg
      }
    }
    return fn.apply(this, args);
  }

// And `compose`
var compose = (a, b) => 
  function(x) {
    return a.call(this, b.call(this, x));
  }

// Constructors are 'red' functions
// This is not possible:
var round2 = Circle(2); // Cannot call a class as a function

// 'factory function' -> makes new objects
var CirclePrototype = {
  diameter() {
    return 2 * this.radius;
  },
  scaleBy(factor) {
    return CircleFactory(factor * this.radius);
  }
};
var CircleFactory = (radius) =>
  Object.create(CirclePrototype, {
    radius: {value: radius, enumerable: true}
  });
  CircleFactory(2).scaleBy(3).diameter(); // 6

  // We could wrap `new Circle(..)` in a function:
  var CircleFactory = (radius) =>
    new Circle(radius);

// Factory factory function: => turns any 'red' class function into a 'blue' function
var FactoryFactory = (clazz) =>
  (...args) => new clazz(...args);

var CircleFactory = FactoryFactory(Circle);
CircleFactory(5).diameter(); // 10

// So we can use it like so:
[1, 2, 3, 4, 5].map(FactoryFactory(Circle));

// Dictionary (turns objects and arrays into ordinary 'blue' functions):
var Dictionary = (data) => (key) => data[key];

var personToDrink = {
  Bob: 'Ristretto',
  Carol: 'Cappucino',
  Ted: 'Allonge'
}
['Bob', 'Ted', 'Carol'].map(Dictionary(personToDrink));
// ['Ristretto', 'Allonge', 'Cappucino']