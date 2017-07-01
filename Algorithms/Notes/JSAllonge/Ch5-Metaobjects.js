/**
 *  Chapter 5, section 1: Meta-objects
**/

// A metaobject is an object that manipulates, creates, describes, or implements other objects (including itself)

// Consider a naive object:
// It has state and behavior, but lacks division of responsibility between its state and its behavior
var sam = {
  firstName: 'Sam',
  lastName: 'Lowry',
  fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  rename(first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
}

// Two drawbacks to lack of separation:
// 1. Intermingles properties part of model domain (such as firstName) with methods which are part of the implementation domain

// Basic principle:
// Separate the mechanics of behavior from the domain properties of the base object

/**
 * Mixins, Forwarding and Delegation
**/
// Mixin
// Separate domain properties from behavior
var sam = {
  firstName: 'Sam',
  lastName: 'Lowry'
};
var Person = { // <- Mixin
  fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  rename(first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
}
// Then use Object.assign() to mix behavior:
Object.assign(sam, Person);

// `Object.assign(..)` copies references to each function from the mixin into the target object:
sam.fullName === Person.fullname; // true

// One object can mix many objects in:
var HasCareer = {
  career() {
    return this.chosenCareer;
  },
  setCareer(career) {
    this.chosenCareer = career;
    return this;
  }
};
Object.assign(peck, Person, HasCareer);
peck.setCareer('Director');

// Method forwarding:
// Forwards methods to another object
// Handles each method in its own context
function forward(receiver, metaobject, ...methods) {
  methods.forEach(function(methodName) {
    receiver[methodName] = (...args) => metaobject[methodName](...args)
  });
  return receiver;
}

// Example (investment portfolio metaobject with a `netWorth` method):
var portfolio = (function() {
  const investments = Symbol();
  return {
    [investments]: [],
    addInvestment(investment) {
      this[investments].push(investment)
    },
    netWorth() {
      return this[investments].reduce(
        function(acc, investment) {
          return acc + investment.value;
        },
        0
      );
    }
  };
})();
// Create an investor:
var investor = forward({}, portfolio, 'addInvestment', 'netWorth');
investor.addInvestment({type: 'art', value: 1000});
investor.addInvestment({type: 'art', value: 2000});
investor.netWorth(); // 3000

// When doing this:
portfolio.netWorth = function() {
  return 'I\'m actually bankrupt!';
}
// We are overwriting the method on the portfolio object and thus any time `investor` invokes `netWorth` it will be bound to the new overwrite

// Mixins are early bound, forwarding is late bound
// Mixins: Execute in context of receiver

// Delegate -> version of `forward` function modified to evaluate method invokation in the receiver's context
function delegate(receiver, metaobject, ...methods) {
  methods.forEach(function(methodName) {
    receiver[methodName] = (...args) => metaobject[methodName].apply(receiver, args); // <- Uses receiver context instead of provider
  });
  return receiver;
}

// Late binding (mixins - early, delegation - late)
var Incrementor = {
  increment() {
    ++this._value;
    return this;
  },
  value(optionalValue) {
    if (optionalValue != null) {
      this._value = optionalValue;
    }
    return this._value;
  }
}
// Mixin:
var counter = Object.assign({}, Incrementor);
// Consider:
counter.value(42);
// This is the same function as `Increment.counter`, but this is not looked up when that function is evaluated

// If given:
var counter = {};
delegate(counter, Incrementor, 'value', 'increment');
//...
counter.value(42); // We are determining invocation of Incrementor.value at the time `counter.value(42)` is evaluated... hence late binding

// Variation on delegate: an object delegating to one of its own properties instead of an arbitrary object. Forward method to one of its own properties
function delegateToOwn(receiver, propertyName, ...methods) {
  methods.forEach(function(methodName) {
    receiver[methodName] = function() {
      const metaobject = receiver[propertyName];
      return metaobject[methodName].apply(receiver, arguments);
    };
  });
  return receiver;
}

// Portfolio modified to use receiver's context like a mixin:
var portfolio = (function() {
  const investmentsProperty = Symbol();
  return {
    addInvestment(investment) {
      this[investmentsProperty] || (this[investmentsProperty] = [])
      return this[investmentsProperty].push(investments);
    },
    netWorth() {
      this[investmentsProperty] || (this[investmentsProperty] = [])
      return this[investmentsProperty].reduce(
        function(acc, investment) {
          return acc + investment.value;
        },
        0
      );
    }
  };
})();

var investor = {
  nestEgg: portfolio
}
delegateToOwn(investor, 'nestEgg', 'addInvestment', 'netWorth');
investor.addInvestment({type: 'art', value: 1000});
investor.addInvestment({type: 'art', value: 2000});
investor.netWorth(); // 3000

// Game of Life using state
var Universe = {
  // ..
  numberOfNeighbors(location) {
    // ...
  }
};

var thisGame = Object.assign({}, Universe);
var Alive = {
  alive() {
    return true;
  },
  aliveInNextGeneration() {
    return (this.numberOfNeighbors() === 3)
  }
}
var Dead = {
  alive() {
    return false;
  },
  aliveInNextGeneration() {
    return (this.numberOfNeighbors() === 2 || this.numberOfNeighbors() === 3);
  }
};
var FsmCell = {
  numberOfNeighbors() {
    return thisGame.numberOfNeighbors(this._location);
  }
}
delegateToOwn(Cell, '_state', ['alive', 'aliveInNextGeneration']);
var someFsmCell = Object.assign({
  _state: Alive,
  _location: {x: -15, y: 12}
}, FsmCell);
// `someFsmCell` delegates `alive` and `aliveInNextGeneration` to its `_state` property
// And you can change its state with assignment:
someFsmCell._state = Dead;

/**
 * Delegation via Prototypes
**/

var Person = {
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  rename: function(first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
}
// Creates an object while simultaneously associating it with a prototype
var sam = Object.create(Person);
sam; // {}

// Prototypes have delegation mechanics
Person.fullName = function() {
  return this.lastName + ', ' + this.firstName;
};
sam.fullName(); // Ballard, Samuel

// Prototypes are open for extension
var methodNames = (object) => 
  Object.keys(object).filter(key => typeof(object[key]) == 'function')

var lowry = {};
delegate(lowry, Person);
lowry.rename('Sam', 'Lowry');
Person.fullName = function() {
  return this.firstName[0] + '. ' + this.lastName;
};
lowry.fullName(); // 'S. Lowry'

Person.surname = function() {
  return this.lastName;
}
sam.surname(); // 'Ballard'

// Objects used as prototype can have prototypes of their own
var PersonWithCareer = Object.create(Person);
Object.assign(PersonWithCareer, HasCareer);

var goldie = Object.create(PersonWithCareer);
goldie.rename('Samuel', 'Goldwyn');
goldie.setCareer('Producer');

// Prototypes, mixins and trees:
// Consider a laborer, manager, and on probation. It is impossible to prototype link all 3 together, classically known as a 'W' pattern
// However, we can try using mixins:
var Laborer = {
  // ...
}
var Manager = {
  // ...
}
var Probationary = {
  // ...
}
var LaborerOnProbation = Object.assign({}, Laborer);
var ManagerOnProbation = Object.assign({}, Manager);