/*
  ==========
  Book 2. Ch 5. Prototypes
  ==========
*/

// Consider: 
var myObject = {};
myObject.a = 2; // A prototype link of the object is created

var anotherObject = {
  a: 2
};
// Creates an object linked to `anotherObject`
var myObject = Object.create(anotherObject);

for (var k in myObject) {
  console.log("found: " + k);
}
// found: a

// The top-end of every normal [[Prototype]] chain is the built-in Object.prototype

/*
  =========
  Prototypes & Constructors
  =========
  From Watch and Code
*/

/////// Prototypes
// Models on which something is formed

Object.create(dog);
// Creates a prototype

Object.getPrototypeOf(myDog);
// Gets the prototype of object

/* Automatically set the prototype of 
// of the object to the default object prototype
*/

var dog = {
  fetch: function() {
    console.log('fetch');
  }
};

var myDog = Object.create(dog);
myDog.name = 'Alexis';
myDog.fetch(); // 'fetch'

var randomDog = Object.create(dog);
randomDog.name = 'Hey';
randomDog.fetch(); // 'fetch'

/////// Constructor functions

function Dog() {
  // this is set to any empty object, {}
  // this is returned
}

// Created by adding the *new* keyword
var testDog = new Dog();

function Dog(name) {
  this.name = name;
  this.fetch = function() {};
}

var testDog = new Dog('test dog');
//=> Dog {name: 'test dog'};

// To attach method to prototype of constructor, remove it from construct and attach it to prototype
Dog.prototype.fetch = function() {};

/// Linking prototypes
// Removes the initial prototype from Bar, sets it to Foo
Bar.prototype = Object.create(Foo.prototype)

// ES6 implementation
Object.setPrototypeOf(Bar.prototype, Foo.prototype);

// Inspecting "class" delegation
function Foo() {
  // ...
}
Foo.prototype.blah = etc; 
var a = new Foo();

// Introspect `a` to find its ancestry (aka delegation linkage)
a instanceof Foo; // true

// Internal delegation
var anotherObject = {
  cool: function() {
    console.log("cool!");
  }
};
var myObject = Object.create(anotherObject);
myObject.doCool = function() {
  this.cool(); // <== Right here!
};
myObject.doCool(); // "cool!"