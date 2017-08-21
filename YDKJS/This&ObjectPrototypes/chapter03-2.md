# Chapter 3. Objects

* Objects come in two forms:
  * Declarative (literal)
  * Constructed

```javascript
// Literal
var obj = {
  key: 'value'
};

// Constructed
var obj = new Object();
obj.key = 'value';
```

* Both the constructed and literal forms result in the same thing, but it is much quicker to type the literal form.

## Type
> Objects are the general building block upon which much of JS is built.
* Objects are one of the six types in JS
  1. Number
  2. String
  3. Boolean
  4. Null
  5. Undefined
  6. Object
* All except Object are "simple primitives"
* typeof null returns "object" because of a bug in the language
* "Everything in JavaScript is an object" is a common misstatement
  * There are a few object subtypes which are "complex primitives"
    * I'm not 100% sure what this means, but I think it means that there are subtypes built on top of objects. Two examples would be arrays and functions in this case.
* Function is a subtype of object (callable object)
* Functions are "first class" because they are just normal objects with added functionality. They can be handled like any other plain object.
* Arrays are also a subtype of object

### Built-in Objects
* There are several object subtypes
  1. String
  2. Number
  3. Boolean
  4. Object
  5. Function
  6. Array
  7. Datae
  8. RegExp
  9. Error
* Based on some of their names, they imply that they're directly related to their simple primitive counterparts, but it's more complicated than that.
* These subtypes are actually functions that can be used as a constructor (eq: new String) that result in a newly constructed object.

```javascript
var strPrimitive = 'Primitive String';
console.log(typeof strPrimitive);
//-> string
console.log(strPrimitive instanceof String);
//-> false

var strObject = new String('Object String');
console.log(typeof strObject);
//-> object
console.log(strObject instanceof String);
// true
```

* To perform operations on a String primitive (checking it's length, accessing characters, etc), we need a String object
* JS automatically coerces a string primitive to a string object when needed, which means there is almost never a reason to use the constructed form over the literal
  * The same is true for Number and Boolean
* null and undefined have no object wrapper
* Date can *only* be created with a constructor
* Objects, Arrays, Functions, and RegExps are all objects reguardless if they're created with a constructor or their literal form.

## Contents
* To access the contents of an object, you can use either '.' or '[]' operators
* There are two main differences between the two operators
  * The '[]' operator can take non "Idendifier-compatible" property names like "property-name!"
  * Because the '[]' takes a string, the string can be programmatically built up

```javascript
var name = 'a' + 'a';
var obj = {
  aa: 'a'
}

console.log(obj.aa);
//-> 'a'
console.log(obj[name]);
//-> 'a'
```

* Object keys are always strings. If you use anything else, JS will convert it to a string.

```javascript
var obj = {
  1: 1,
  true: 2
};
obj[obj] = 3;

console.log(obj['1']);
//-> 1
console.log(obj['true']);
//-> 2
console.log(obj['[object Object]']);
//-> 3
console.log(obj[obj]);
//-> 3
```

### Computed Property Names
* ES6 added *computed property names* where you can specify an expression to use as an objects key
* This will most likely be useful with ES6 Symbols

```javascript
var prefix = 'foo';
var obj = {
  [prefix + 'bar']: 'baz'
}

console.log(obj["foobar"]);
//-> baz
```

### Property Versus Method
* In other laguages, functions that belong to classes are called *methods*.
* Because of this, many developers refer functions inside an object as a method
* This isn't technically true because the object doesn't own the function. At best, the functions *this* binding will be bound to the object at run time

### Arrays
* Arrays are a subtype of Object and have a more structured organization for how and where values are stored
* Arrays assume *numeric indexing*, which means that values are stored in locations called *indices*

```javascript
var myArray = ['str', 1, {}];

console.log(myArray.length);
//-> 3
console.log(myArray[0]);
//-> str
console.log(myArray[2]);
//-> Object {}
```

* Because arrays are objects, you can also add properties
* Adding a property to an array doesn't change it's reported length
> You could use an array as a plain key/value object, and never add any numeric indices, but this is bad idea because arrays have behavior and optimizations specific to their intended use, and likewise with plain objects. Use objects to store key/value pairs, and arrays to store values at numeric indices.

```javascript
var myArray = [1,2,3];
myArray.property = 'foo';

console.log(myArray.property);
//-> foo
console.log(myArray.length);
//-> 3
```

### Duplicating Objects
* Duplicating objects is one of the most requested features for a new JS developer
* This is more complicated than it seems:
  * Shallow copy vs Deep copy
  * Shallow copy is easy enough. Objects referenced inside would have the same reference in the copied object
  * Deep copy is hard. One of the obsticles is that it's easy to have circular references.
* One solution is that objects that are JSON-safe can easily be copied

```javascript
var obj = {
  one: 1,
  two: 'two',
  three: 3
};

var objCopy = JSON.parse(JSON.stringify(obj));
```

* For creating a shallow copy, ES6 has Object.assign()
  * Copies all the enumerable properties from multiple sources to a given object, then returns the new object

```javascript
var obj1 = {
  1: 1,
  2: 2, 
  3: 3
};

var obj2 = {
  4: 4,
  5: 5,
  6: 6
};

var obj3 = Object.assign({}, obj1, obj2);
```

### Property Descriptors
* ES5 introduced *property descriptors* (also known as "data descriptors") which describe a property in terms of being writable, enumerable, configurable, and it's value.

```javascript
  a: 2
};

console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
/*-> 
  {
    configurable: true,
    enumerable: true,
    value 2,
    wrightable: true
  }
*/
```

* We can use Object.defineProperty to create a new property or edit an existing on if it's configurable.

```javascript
var obj = {
  a: 2
};

Object.defineProperty(obj, 'a', {
  value: 3
});

Object.defineProperty(obj, 'b',  {
  value: 4,
  writable: true,
  configurable: true,
  enumerable: true
});

console.log(obj.a);
//-> 3
console.log(obj.b);
//-> 4
```

#### Writable
* The ability to change the value of a property
* If you try to change the value of a property that has writable set to false, it will return an error in strict mode and silently fail in non-strict mode


#### Configurable
* If a property has configurable set to false, we can't edit it's property descriptor with defineProperty()
* Changing this property to false is a one way action. Once it's set, it can't be changed
* Another thing that happens when set to false is that it prevents the property from being deleted

#### Enumerable
* The enumerable property controls whether the property shows up in enumerations like *for in* loops

### Immutability
* It's not very common to create deeply entrenched immutable objects.

#### Object constant
* You can essentially create a constant (can't be changed, redefined, or deleted), by setting writable and configurable to false

#### Prevent extensionss
* Object.preventExtensions() prevents an object from having new properties added to it

#### Seal
* Object.seal prevents an object from having new properties added to it and also sets configurable: false on all of it's properties.
* The end result is an object that can't have properties added, removed, or configured. The values can still be changed though.

#### Freeze
* Object.freeze is similar to seal, but it also changes all it's properties writable to false
* The end result is an object that can't have properties added, removed, or any of it's properties modified

### [[Get]]

```javascript
var obj = {
  a: 1
};

console.log(obj.a);
//-> 2
```

* obj.a doesn't just look in obj for the property a
* It performs a [[Get]] operation
  * First looks in obj for property a
  * If it's not found, then it consults the objects [[Prototype]] chain
  * If the property isn't found, then [[Get]] returns *undefined*
* This is different than a normal variable look up which would return *ReferenceError*

### [[Put]]

* [[Put]] is a little more complex than [[Get]]
* If the property exists on the object three things happen
  1. Is the property an access descriptor (Getter & Setter)?
    * If so, then call the Setter
  2. Does the property have a data descriptor with writable: false?
    * Silently fail or return TypeError in strict mode
  3. Otherwise, set the value to the property
* If the property doesn't exist, then it's even more nuanced and complex. This is covered in a future chapter.

### Getters and Setters
* ES5 introduced a way to override the default [[Put]] and [[Get]] operations on a per property level
* Getters are properties that call a hidden function that get the value
* Setters are properties that call a hidden function that set the value
* Getters and setters definition is called an "accessor descriptor"
* For access descriptors, the value and writable properties are ignored

```javascript
var obj = {
  get a() {
    return 2;
  }
}

Object.defineProperty(
  obj,  // Target object
  'b',    // Property name
  {     // Descriptor
    get: function() {
      return this.a * 2;
    },
    enumerable: true
  }
)

obj.a = 3;

console.log(obj.a);
//-> 2
console.log(obj.b);
//-> 4
```

* When properties are defined with a getter, assigning a value to the property will silently fail
* To assign a value to a property in this case, there must also be a setter defined

```javascript
var obj = {
  get a() {
    return this._a_;
  },
  set a(val) {
    this._a_ = val * 2;
  }
}

obj.a = 2;
console.log(obj.a);
//-> 4
}
```

### Existence
* A property access can result in *undefined* if the property doesn't exist or was set to *undefined*
* To distinguish between the two cases, we can use *obj.hasOwnProperty()*
  * *hasOwnProperty* is a function on objects that takes a property name as an argument and returns true or false based on if the argument exists in the object
  * By contrast, the *in* operator looks inside the object and will proceed through the prototype chain

```javascript
var obj = {
  a: undefined
};

console.log(obj.a)
//-> undefined
console.log('b' in obj);
//-> false
console.log(obj.hasOwnProperty('a'));
//-> true
console.log(obj.hasOwnProperty('b'));
//-> false
```

#### Enumeration
* Enumerable means "will be included if the object's properties are iterated"

```javascript
var obj = {
  a: 1
}

Object.defineProperty(obj, 'b',
{
  value: 2,
  enumerable: false
});

console.log('b' in obj);
//-> true
console.log(obj.hasOwnProperty('b'));
//-> true

for (prop in obj) {
  console.log(prop, obj[prop]);
  //-> a 1
};
```

Another enumerable and nonenumerable properties can be distinguished
```javascript
var obj = {
  a: 1
}

Object.defineProperty(obj, 'b',
{
  value: 2,
  enumerable: false
});

console.log(obj.propertyIsEnumerable('b'));
//-> false
console.log(Object.keys(obj));
//-> ['a']
```

* *.propertyIsEnumerable* checks directly on the object of the property exists and if it's enumerable
* *Object.keys* returns an array of the enumerable properties
  * In contrast to *Object.getOwnPropertyNames() which returns an array of all the properties, enumerable or not
* There currently isn't a built in way to return an array of all the enumerable properties in the object and through it's prototype chain

## Iteration
* A *for in* loop iterates over the enumerable properties of an array
* To iterate over the values of an array, a *for of* loop can be used

```javascript
var list = [1,2,3];
for (val of list) {
  console.log(val);
}
//-> 1
//-> 2
//-> 3
```

* The *for of* loop asks for an iterator object that is defined as a property on the object
* Arrays have a built in iterator object
* If you want to iterate over an object, you'll need to write your own iterator
