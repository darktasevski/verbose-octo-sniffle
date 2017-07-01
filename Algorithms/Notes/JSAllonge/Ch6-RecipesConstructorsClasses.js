/**
 * Chapter 6, section 2: Recipes with Constructors and Classes
**/

/**
 * Bound
**/
// `getWith`:
var getWith = (attr) => (object) => object[attr];

// Same function which plays nicely with methods (`get`)
var bound = (messageName, ...args) => 
  (args === [])
    ? instance => instance[messageName].bind(instance)
    // Option to handle variable number of additional arguments
    : instance => Function.prototype.bind.apply(
                    instance[messageName], [instance].concat(args)
    )

var mapWith = (fn) => (arr) => arr.map(fn);

mapWith(bound('eggs'))(inventories).map(boundmethod => boundmethod());

InventoryRecord.prototype.add = function(item, amount) {
  this.record[item] || (this.record[item] = 0);
  this.record[item] += amount;
  return this;
}

mapWith(bound('add', 'eggs', 12))(inventories).map(boundmethod => boundmethod())

/**
 * Send
*/
// Useful when invoking a function that's a member of an object (or of an instance's prototype)
var send = (methodName, ...args) => 
  (instance) => instance[methodName].apply(instance, args);

mapWith(send('apples'))(inventories)

/**
 * Invoke
**/
// Invoke a function that's designed to be executed within an object's context, allows us to use `.apply` as a combinator
var invoke = (fn, ...args) => 
  instance => fn.apply(instance, args);

// Consider an array of objects:
var data = [
  { 0: 'zero',
    1: 'one',
    2: 'two',
    length: 3},
  { 0: 'none',
    length: 1},
  // ...
];
// Use an array's .slice method here;
mapWith(invoke([].slice, 0))(data);

// Instance eval
// If you have the instance and are looking for the function:
var instanceEval = (instance) => 
  (fn, ...args) => fn.apply(instance, args);

/**
 * Fluent
**/

// Two classes of methods: those that query, and those that update
class Cake {
  setFlavour(flavour) {
    return this.flavour = flavour;
  }
  setLayers(layers) {
    return this.layers = layers
  }
  bake() {
    // ...do some baking
  }
}
var cake = new Cake();
cake.setFlavour('chocolate');
cake.setLayers(3);
cake.bake();

// Fluent style presumes that when you update, you are interested in doing other things with the receiver than the values being passed as arguments
// Rule: return receiver unless the method is a query
class Cake2 {
  setFlavour(flavour) {
    this.flavour = flavour;
    return this;
  }
  setLayers(layers) {
    this.layers = layers;
    return this;
  }
  bake() {
    // ... do some baking
    return this;
  }
}
var cake = new Cake()
              .setFlavour('chocolate')
              .setLayers(3)
              .bake();

// Fluent method decorator
var fluent = (methodBody) =>
  function (...args) {
    methodBody.apply(this, args);
    return this; // <-- Returns receiver
  }

function Cake3() {}
Cake3.prototype.setFlavour = fluent(function(flavour) {
  this.flavour = flavour;
})

// Works with class
class Cake4 {
  setFlavour(flavour) {
    this.flavour = flavour;
  }
  // ... rest of it
}
Cake4.prototype.setFlavour = fluent(Cake4.prototype.setFlavour);

// Or mass fluent:
const fluentClass = (clazz, ...methodNames) => {
  for (let methodName of MethodNames) {
    clazz.prototype[methodName] = fluent(clazz.prototype[methodName])
  }
  return clazz;
}

// Now we can just write:
fluentClass(Cake, 'setFlavour', 'setLayers', 'bake');