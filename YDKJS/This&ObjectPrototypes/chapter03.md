# Chapter 3. Objects

## Syntax
* Objects come in two forms:
  * Literal
  * Constructed
* It's extremely uncommon to use the "constructed form"

```javascript
// Object literal
var obj = {
  key: value
}

// Constructed
var obj = new Object();
obj.key = value;
```

## Type
* Objects are the general building blocks in which much of JS is built
* Language types:
  * string
  * number
  * boolean
  * null
  * object
  * undefined
* A common misstatement is that "everything in JavaScript is an object"
* functions are "first class"
  * Basically normal objects with callable behavior semantics bolted on
  * Can be handled like any other object
* Arrays are a form of objects with extra behavior

### Built-in Objects
* There are several object subtypes
  * String
  * Number
  * Boolean
  * Object
  * Function
  * Array
  * Date
  * RegExp
  * Error
* These subtypes are actually built-in functions that can be used as a constructor

```javascript
var myString = 'this is a string'
console.log(typeof myString);
//-> String
console.log(myString instanceof String);
//-> False

var myOtherString = new String('this isn\'t a string');
console.log(typeof myOtherString);
//-> Object
console.log(myOtherString instanceof String);
//-> True
```

* To perform operations on a string (checking it's length, etc), a String object is required.
* JavaScript automatically coerces a string primitive to a String object when necessary

```javascript
// example of engine converting string primite to an object to perform length method
var str = 'I am a string';
console.log(str.length);
//-> 13
```

* null and undefined have no object wrapper form
* Date values have no literal form and can only be constructed though their object form
* Objects, Arrays, Functions, and Regexps are all objects reguardless of whether it's literal or its constructed for is used.
* In some cases, the constructed form offers more options in the creation.
* Error objects are rarely created explicitly, but can be through a constructor

## Contents
* Object values can be accessed with either the *.* operator or the *[]* operator.
* The main difference between these operators is that *[]* can be a variable or a non "Identifier-compatible" property name

* Object property names are *always* strings. If any other value is used, it will be converted to a string.

```javascript
var obj = {
  1: 'one'
};

console.log(obj['1']);
```

### Computed Property Names
* ES6 adds *computed property names* where you can specify an object property name through an expression with *[]* in an object-literal delaration.
* The most common usage of this will probably be with ES6 Symbols.

```javascript
var prefix = 'pre-';

var obj = {
  [prefix + 'one']: 1,
  [prefix + 'two']: 2
}

console.log(obj['pre-one']);
//-> 1
```

### Property VS Method
* Functions referenced as a property value in an object are commonly reffered to as *methods*
* The object doesn't own the function so this isn't technically a method

### Arrays
* Arrays also use the *[]* access form, but expect numbers (indices).

```javascript
var myArray = ['one', 'two', 'three'];
console.log(myArray[0]);
//-> one
```

* Because Arrays **are** objects, you can add properties to them
* Adding a named property doesn't change the reported length of the array
* You should use objects for key value pairs and arrays for storing values at numeric indices because the engine has optimizations specific to their intended use.
* Also, Objects don't have the Array prototype for array specific functions

```javascript
var myArray = ['one', 'two', 'three'];
myArray.arrayProperty = 'arrayProperty';

console.log(myArray.length);
//-> 3
console.log(myArray.arrayProperty);
//-> arrayProperty
```

* Adding a property to an array that *looks* like a number will end up as part of its numeric index.
```javascript
var arr = [1,2,3,4,5];
arr['6'] = 6;

console.log(arr.length);
console.log(arr[6]);
```

### Duplicating Objects
* Duplicating objects is one of the most requested features with new JavaScript developers
* Shallow vs Deep copy
  * A shallow copy would create a new object and copy values, but only reference the same references as the first object
  * A deep copy would have to copy assigned values and referenced
* Duplicating an object isn't an easy thing and there isn't a clear way to do it.
  * You'd have to duplicated each value that a property references
  * Circular depencencies can be an issue
  * Many JS frameworks have their own implementation

* One way to do it is if you have a JSON-safe object
```javascript
var obj = {
	1: 1,
  2: 2,
  3: 3
};

var copyObj = JSON.parse(JSON.stringify(obj))
```

* Shallow copying is a lot easier so ES6 has OBject.assign()
  * Takes a target object as its first parameter, and one more more *source* objects as subsequent parameters
  * It iterates over all *owned* keys for each source object and copies them to the target.
  * Returns the target object

```javascript
var obj = {
	1: 1,
  2: 2,
  3: 3
};

var obj2 = {
	'one': 'one',
  'two': 'two',
  'three': obj
};

var copyObjs = Object.assign({}, obj, obj2);

console.log(copyObjs);
```

### Property Descriptors
* Prior to ES5, JavaScript gave no way to inspect the characteristics of properties
* As of ES5, all properties are described in terms of a *property descriptor*

```javascript
var obj = {
	a: 1
}

console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
/*-> configurable: true
     enumerable: true
     value: 1
     writable: true
  */
```

* A property is much more than just it's value of 2. It includes three other characteristics:
  * writable
    * Controls the ability to change the value of a property
  * enumerable
    * Controls the ability for a property to show up in enumeration methods such as a *for-in* loop
  * configurable
    * Controls the ability to change the descriptor definition with *defineProperty*
    * Changing this to false is a one way action and can't be undone
    * Also prevents deleting the property with the *delete* operator

* Using *Object.defineProperty*, we can manaually add a new property with whatever characterists we want or modify an existing one if its *configurable* is true

```javascript
var obj = {
	a: 1
}

Object.defineProperty(obj, 'b', {
	value: 2,
  writable: true,
  configurable: true,
  enumerable: true
});

console.log(obj.b);
```

### Immutability
* ES5 has ways to make objects or properties unchangable
* All of these ways are shallow immutability
  * Only affects the object and it's direct property characteristics
  * If a property references another object (array, object, function, etc), those contents remain mutable
* It's uncommon to create deeply entrenched immutable objects

#### Object Constant
* By combining *writable: false* and *configurable: false*, you can create a constant (can't be chagned, redefined, or delelted)
```javascript
var obj = {};

Object.defineProperty(obj, 'CONSTANT', {
  value: 1,
  writable: false,
  configurable: false
});
```

### Prevent extensions
* *preventExtensions()* is used to prevent additional properties from being added to an object
```javascript
var obj = {
  a: 1
}

Object.preventExtensions(obj);

obj.b = 2;
console.log(obj.b)
//-> undefined
```

### Seal
* Essentially calls *Object.preventExtensions*
* Marks all it's existing properties as *configurable: false*

### Freeze
* Essentially calls *Object.Seal*
* Marks all it's existing properties as *writable: false*
* This highest level of immutability for an object
* Prevents properties from being deleted, added, or changed

### [[Get]]
* *obj.a* doesn't just look in obj for the property *a* and return it's value
  * This is a [[Get]] operation
  * It first inspects the object for the property, and returns it if it's found
  * If it isn't found, then the [[Get]] algorithm consults its [[Prototype]] chain
  * If it's still not found, then it returns *undefined*
    * This is different than looking up variables, because the lexical scope is consulted and returns a *ReferenceError* if it's not found
  
### [[Put]]
* *[[Put]]* behaves differently based on a number of factors, but most impactfully, whether a property exists on the object or not
* Is a property is present:
  1. Is the property an accessor descriptor (Getters and Setters)? If so, call the setter, if any.
  2. Is the data descriptor *writable* false? If so, fail.
  3. Otherwise, set the value to the existing property
* If the property is not present, [[Put]] is even more complex

### Getters and Setters
* ES5 introduced a way to partialy override the default *[[Put]]* and *[[Get]]* operations with *get* and *set* properties
* *Getters* and *Setters* are properties that call a hidden function to either retrieve or set a value

* *Get* and *Set* properties have an *accessor descriptor* (as opposed to a *data descriptor* for regular properties)
```javascript
var obj = {
	get a() {
  	return 1;
  }
};

console.log(Object.getOwnPropertyDescriptor(obj,'a'));
/*->
	configurable: true
  enumerable: true
  get: function a()...
  set: undefined
*/
```

* Assignments to a property with a getter will be silently ignored
* You almost always wait to set both a getter and setter. Otherwise unexpected things could happen.

```javascript
var obj = {
	set multiplyBy2(value) {
  	this._multiplyBy2_ = value * 2
  },
  get multiplyBy2() {
  	return this._multiplyBy2_;
  }
};

obj.multiplyBy2 = 10;
console.log(obj.multiplyBy2);
//-> 20
```

### Existence
* If a property returns *undefined*, there is a way to find out if it was explicitly set.
  * *for in* loop
    * This will iterate through all of the enumerable properties in an object. If a property isn't found, it will consult the objects [[prototype]] chain
  * *hasOwnProperty*
    * This checks the enumerable properties in the object and doesn't consult the [[prototype]] chain

```javascript
function MakeObj(){};
MakeObj.prototype.a = 2;

var b = new MakeObj;

console.log('a' in b);
//-> true
console.log(b.hasOwnProperty('a'));
//-> false
```

* *hasOwnProperty* only works if an object has a prototype
* It's possible to create an object that isn't prototypically linked with *Object.create(null)*

A more robust way to check for a property:
```javascript
var obj = Object.create(null);
console.log(Object.prototype.hasOwnProperty.call(obj, 'a'));
//-> false
```
* In the above example, we're borrowing the hasOwnProperty method from Object, and explicitly binds the call to obj

#### Enumeration
* Enumeration is whether a property shows up in an iteration of the objects properties
* *Object.keys* and *getOwnPropertyNames* don't consult the [[prototype]] chain, and currently, there is no way to get a list of all the properties that's equivalent to what the *in* operator does.
  * To do this, you would have to recursively traverse the [[Prototype]] chain

```javascript
var obj = {};

Object.defineProperty(
	obj,
  'a',
  { enumerable: true, value: 1 }
);

Object.defineProperty(
	obj,
  'b',
  { enumerable: false, value: 1 }
);

for(property in obj) {
	console.log(property);
}
//-> a

console.log('b' in obj);
//-> true

console.log(Object.keys(obj));
//-> ["a"]

console.log(Object.getOwnPropertyNames(obj));
//-> ["a", "b"]
```

Gets a list of all the properties including those in its [[Prototype]] chain
```javascript
var array = [1,2];

function getAllProperties(obj) {
	if(obj != null) {
  	return Object.getOwnPropertyNames(obj).concat(getAllProperties(Object.getPrototypeOf(obj)));
   } else {
   	return [];
   }
}

console.log(getAllProperties(array));
```

## Iteration
* ES5 offers several ways to iterate over values
  * forEach
  * every
  * some
* Each function iterates over each value in an array, but differ when the callback returns false
  * *every* and *some* can stop before the end of the iteration

* Using a *for in* loop indirectly loops through an objects values. It's actually iterating over the enumerable properties and you then have manually access the value.
* ES6 has a *for of* loop for iteracting over arrays and objects (if the object has a custom iterator)

```javascript
var myArray = [1,2,3];

for(value of myArray) {
	console.log(value);
}
//-> 1
//-> 2
//-> 3
```

* A *for of* loop asks for an iterator object of the thing to be iterated
* Arrays have a built-in iterator function
* Objects do not have a build-in iterator function
* The *for of* loop expects an object with a *next* function that returns an object with *value* and *done*
* The loop will keep iterating as long as done is false

```javascript
var obj = {
	'one': 1,
  'two': 2,
  'three': 3
};

Object.defineProperty(obj, Symbol.iterator,{
	enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
  	var o = this;
    var idx = 0;
    var ks = Object.keys(o)	
  	return {
			next: function() {
      	return {
        	value: o[ks[idx++]],
          done: idx > ks.length
        }
      }
    }
  }
});

for(var value of obj) {
	console.log(value);
}
//-> 1
//-> 2
//-> 3
```

