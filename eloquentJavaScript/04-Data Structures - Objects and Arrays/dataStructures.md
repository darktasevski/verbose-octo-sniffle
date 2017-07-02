# Chapter 4 Data Structures: Objects and Arrays

## Data Sets

### Arrays

> ...an array and is written as a list of values between square brackets, separated by commas.

```javascript
//Array example
var listOfGames = ['Zelda', 'Castlevania', 'Mario'];
```

* Data inside an array can be accesses by the name of the array, followed by an expression square brackets that evaluates to an index inside the array.
* Arrays follow *zero based counting*. The first index will be *0*.

```javascript
var listOfGames = ['Zelda', 'Castlevania', 'Mario'];

console.log(listOfGames[1]);
//-> Castlevania
```

---

## Properties

> Almost all JavaScript values have properties. The exceptions are null and undefined. If you try to access a property on one of these nonvalues, you get an error.

There are two common ways to access properties in JavaScript:
* Dot notation *value.x*
* Bracket notation *value[x]*

The difference between these is:
* Dot notation must be a valid variable name and directly names a property
* Bracket notation has an experssion between the brackets that gets evaluated and then points to a property
* Since dot notation has to be a valid variable name, if a property has a space or a number, you have to use bracket notation to access it

---

## Methods

* Strings and arrays have properties that are functions that do things to the value
* The toUpperCase() property returns a copy of the string with all of the letters transformed to uppercase
* Somehow properties have access to the object value without passing the value as an argument into the property

> Properties that contain functions are generally called methods of the value they belong to. As in, “toUpperCase is a method of a string”.

```javascript
// Properties example
console.log("hello".toUpperCase());
//-> HELLO
```

### Some additional array methods

* *.push()* adds a value to the end of an array
* *.pop()* removes a value from the end of an array and returns it
* *.join()* flattens the array into a single string

---

## Objects

* Objects are an arbitrary collection of properties
* One way to create an object is with *{}*
* Inside the curly brases, each property is written, followed by a colon, followed by an expression that is tied to the property
* Property naems that are not valid variables or numbers have to be typed in quotes

```javascript
//Object example
var obj = {
    one: 1,
    two: 2,
    four: 2 + 2
};
```
* Reading an object property that doesn't exist will return *undefined*
* You can add or replace properties of an object with the *=* operator
* Object property bindings are similar to variable bindings. Other variables or properties might be holiding onto the same values.
* Removing a property name from an object is done with the *delete* operator
* The binary in operator, when applied to a string and an object, returns a Boolean value that indicates whether that object has that property.


* Arrays are a kind of specialized object for storing sequences of things

---

## Mutability

* Immutable means that it's impossible to change
* Strings, Numbers, and Booleans are Immutable
* You can combine them with other values and derive new values from them, but the original cannot be changed
* With objects, the content can be modified by changing its properties
* The == operator will return false when comparing different objects with identical content. There is no deep comparison.

---

## The Lycanthorope's Log

* *.indexOf()* searches an array and returns the index for the given value. 
* It retuns -1 if it is not found.

---

## Objects as Maps

> A map is a way to go from values in one domain to corresponding values in another domain.
* This is a little confusing because there are multiple definitions of map in JavaScript. There's a map object in es2015, the Array.map() function, and general associative array/map/dictionary.
* I think in this case, the author is talking about associating two values from different domains as a key value pair.

* JavaScript profides a specific *for* loop for objects

```javascript
//Example of for in loop
var obj = {
    one: 1,
    two: 2
};

for (var num in obj) {
    console.log(obj[num]);
}
//-> 1
//-> 2
```

---

## Further Arrayology

* *Array.unshift* adds an item to the start of an array
* *Array.shift* removes the first item of an array and returns it


* *Array.indexOf* searches for a given element starting from the beginning of the array
* *Array.lastIndexOf* searches for a given element started from the end of the array
* Both of these take an optional second argument that indicates where to start searching from

```javascript
//indexOf example

var games = ['Zelda', 'Castlevania', 'Metroid', 'Castlevania'];

console.log(games.indexOf('Castlevania'));
//-> 1

console.log(games.lastIndexOf('Castlevania'));
//-> 3

```

* *Array.slice* takes a start and end argument. It returns a copy of the array with only the elements between those indices
* If an end index isn't given, it will take all of the elements after the start index
* Strings also have a slice method which does a similar thing

```javascript
//slice example

var games = ['Zelda', 'Castlevania', 'Metroid'];

console.log(games.slice(1));
```

* *Array.concat* glues arrays together and returns a new array
* This is similar to the *+* operator when used with strings

```javascript
var games = ['Zelda', 'Castlevania', 'Metroid'];

console.log(games.concat(['Mario']));
//-> ['Zelda', 'Castlevania', 'Metroid', 'Mario']
```

---

## Strings and their Properties

* Since Strings, Numbers, and Booleans are immutable, you can't add properties and methods to them
* The *trim* method removes whitesapce (spaces, newlines, tabs)
* Individual characters can be grabbed with *String.charAt* or by reading the numeric properties just like an array

```javascript
var system = 'Nintendo';

console.log(system.charAt(0));
//-> N
console.log(system[0]);
//-> N
```

---

## The Arguments Object

* Whenever a function is run, a variable called *arguments* is added to it's environmnent
* The *arguments* variable is an object that holds all of the arguments pass into the function
* The arguments has a *length* property that returns the number of arguments that were passed in
* For each argument passed in, the arguments object has a number property with the value equal to the argument.

```javascript
function printGames() {
    console.log('You gave me ' + arguments.length + ' games.')
    for (game in arguments) {
        console.log(arguments[game]);
    }
}

printGames('Zelda', 'Castlevania', 'Metroid');
//-> You gave me 3 games.
//-> Zelda
//-> Castlevania
//-> Metroid
```

## The Math Object

* The Math object is a *namespace* that contains a bunch of math related functions
* Namespaces keep things organized and prevent a developer from addicentally overwriting a variable
* *Math.random* returns a pseudorandom number between 0 and 1
* *Math.floor* rounds a number down
* *Math.ceil* rounds a number up

---

## The Global Object

* Each global variable in a browser lives under the *window* object

---

## Exercise Answers

### Problem 1

```javascript
function range(start, end, step) {
  if (!step) step = 1;
  
  var result = [];
  if (step > 0) {
    for (var i = start; i <= end; i += step) {
      result.push(i); 
    }
  } else {
    for (var i = start; i >= end; i += step) {
      result.push(i); 
    }
  }
  return result;
}

function sum(numbers) {
  var result = 0;
  for (var i = 0; i <= numbers.length - 1; i++) {
    result += numbers[i];
  }
  return result;
}
```

---

### Problem 2

* ~~Modifying the array in place confused me (and still maybe does). When passing an argument into a function, I thought that the argument was a copy of the of the variable. Instead, the argument seems to be pointing to the same bits as the original variable.~~

* So what I think the original problem was is that I didn't understand by value vs by reference. When setting a variable equal to another variable that holds a primitive, that primitive is copied. When doing the same thing, but using an object instead of a primitive, the object isn't copied, but referenced instead. In the reverseArrayInPlace example, this is why chainging the argument also changes the original variable.

```javascript
function reverseArray(theArray) {
  var newArray = [];
  for (var i = 0; i <= theArray.length - 1; i++) {
    newArray.unshift(theArray[i]); 
  }
  return newArray;
}

// Kind of cheating by coping the entire array
function reverseArrayInPlace(theArray) {
  var old = theArray.slice();
  for (var i = 0; i <= old.length -1; i++) {
     theArray[theArray.length - 1 - i] = old[i];
  }
}

// This is what the author expected
function reverseArrayInPlace(theArray) {
  for (var i = 0; i < Math.floor((theArray.length - 1) / 2); i++) {
    var hold = theArray[i];
    
    theArray[i] = theArray[theArray.length - 1 - i];
    theArray[theArray.length - 1 - i] = hold;
  }
}
```

---
### Problem 3

```javascript
function arrayToList(arr) {
  var list;
  for (var i = arr.length -1; i >= 0; i--) {
    var rest = {
      value: arr[i]
    }
    if (list) rest.rest = list;
    list = rest;
  }
  return list;
}

function listToArray(list) {
  var result = [];
  while (list) {
    result.push(list.value);
    list = list.rest;
  }
  return result;
}

function prepend(element, list) {
  var result = {
    value: element,
    rest: list
  }
  
  return result;
}

function nth(list, index) {
  if(index) {
    return nth(list.rest, index - 1);
  } else {
    return list.value; 
  }
}
```

---
### Problem 4

```javascript
function deepEqual(x, y) {
  if (typeof x != typeof y) return false;
  if (typeof x != null && typeof y != null);
  if (x === y) return true;
  if (typeof x == 'object') {
    var xNum = 0, yNum = 0;
    for (var prop in x) {
      xNum++;
      if (! deepEqual(x[prop], y[prop])) return false
    }
    for (var prop in y) {
      yNum++;
    }
    return xNum == yNum;
  }
}
```