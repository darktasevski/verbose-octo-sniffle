# Higher-Order Functions

## Abstraction

* Abstractions hide the details and allow you to think about concepts at a higher level
* This makes programming easier, less error prone, and easier to debug

---

## Abstracting Array Traversal

* Arrays have a method for looping through it's values called *forEach*
* Since it's a method of the array, it has access to the array values
* The method takes a function as an argument and calls it for each item in the array
* The item in the array can be accessed as an argument on the function passed in

```javascript
// This is what the native forEach function might look like
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}
```

```javascript
// Example of Array.forEach()

var games = ['Castlevania', 'Zelda', 'Contra'];
games.forEach(function(game) {
  console.log(game);
});
//-> Castlevania
//-> Zelda
//-> Contra
```

## Higher-order Functions

> Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.

* Higher-order functions allow us to abscract over actions, not just values.
* Lexical scoping works to our advantage by allowing functions passed as values to access the environment of the outer function

---

## Passing Along Arguments

* Functions have an *apply* method that takes an array as an argument
* The function will then be called with each item in the array as an argument
* *I'm sure that there is a lot more to the apply method that I'll have to learn about*. I don't really understand why this is used over the arguments object.

```javascript
// Example of the apply method

function logLength() {
    console.log(arguments.length);
}

function wrap(f) {
    return function() {
        //Apply requires an array or an array like object
        //The functions arguments variable is an array like object
        f.apply(null, arguments);
    }
}

var log = wrap(logLength);

log(1,2,3);
//-> 3

//Another example
console.log.apply(null, [1,2,3,4,5]);
//-> 1 2 3 4 5
```

---

## JSON

* JSON stands for JavaScript Object Notation
* Widley used for data storage and as a communication format on the Web
* Written similarly to to JavaScript objects with some exceptions
  * All property names have to be in double quotes
  * No function calls, variables, or anything involving computation
  * No comments
z
* *JSON.stringify* converts a JavaScript object to a JSON object
* *JSON.parse* converts a JSON object to JavaScript

```javascript
var jsonString = JSON.stringify({
    one: 1,
    two: 2,
    three: 3
});

console.log(jsonString)
//-> {"one":1,"two":2,"three":3}
console.log(JSON.parse(jsonString));
//-> {one: 1, two: 2, three: 3}
```

---

## Filtering an Array

* JavaScript has a standard method on arrays called *filter*
* *Array.filter()* takes a function as an argument
* Filter loops through each item in an array and passes the item into the function that was passed into filter
* The function passed into filter will have a test. If it passes, then the function returns true and the item is added into a new array.
* Once all items are processed, then filter returns a new array with all of the items that passed the test
* The filter method is considered *pure* because it doesn't modify the original array

```javascript
// Example of what the filter methohd might look like

function filter(array, test) {
    var passed = [];
    for (var i = 0; i < array.length; i++) {
        if (test(array[i])) 
            passed.push(array[i]);
    }
    return passed;
}

var games = ['Castlevania', 'Zelda', 'Contra'];
console.log(filter(games, function(game) {
    return game == 'Castlevania';
}));
//-> ["Castlevania"]
```

```javascript
// Example of the filter method

var games = ['Castlevania', 'Zelda', 'Contra'];
console.log(games.filter(function(game) {
    return game == 'Castlevania';
}));
//-> ["Castlevania"]
```

---

## Transforming with Map

* Arrays have a method called *map*
* Similar to *Array.filter*, map takes a function, loops through all items in an array, and passes each one to the function.
* *Map* is different from *filter* in that map's function transforms each element, and then returns a new modified array of the same length.

```javascript
//Example of how the map method might look

function map(array, transform) {
    var transformedArray = [];
    
    for (var i = 0; i < array.length; i++) {
        transformedArray.push(transform(array[i]));
    }
    return transformedArray;
}
```

```javascript
// Example of the map method

var games = ['Castlevania', 'Zelda', 'Mario'];
console.log(games.map(function(game){
    return game + ' 2';
}));
//-> [Castlevania 2, Zelda 2, Mario 2]
```

---

## Summarizing with Reduce

* *Reduce* is a method of array that folds each item in the array into a single value
* *Reduce* takes 2 arguments
  * A combining function which has two arguments. 
    * The first argument is the current value at the time of the loop.
    * The second is the current item in the array
  * A number to start from which is optional
* For each item in the array, a variable is set equal to the value returned by the combine function
* Once each item in the array is processed, reduce will return the variable outside of the loop


```javascript
// Example of how the reduce method might look 

function reduce(array, combine, start) {
    var result = start || 0;
    for (var i = 0; i < array.length; i++) {
        result = combine(result, array[i]);
    }
    return result;
}

var numbers = [1,2,3,4,5];
console.log(reduce(numbers, function(a, b) {
    return a + b;
}));
//-> 15
```

```javascript
// Example of reduce method

var numbers = [1,2,3,4,5];
console.log(numbers.reduce(function(a, b) {
    return a + b;
}));
//-> 15
```

---

## Composability

* **Function composition:** the act of combining simple functions to build more complicated ones
* Higher-order functions really shine when you compose functions
* Composing functions makes it easier to read because you're using concepts you can understand at first glance instead of trying to understand the whole programming flow.

```javascript
// Example of composability
var games = [
    {   
        game: 'Castlevania',
        platform: 'nes',
        rating: 9
    },
    {
        game: 'Castlevania 2',
        platform: 'nes',
        rating: 7
    },
    {   
        name: 'Castlevania 3',
        platform: 'nes',
        rating: 10
    },
    {
        game: 'Super Castlevania',
        platform: 'snes',
        rating: 7
    },
    {
        game: 'Castlevania Bloodlines',
        platform: 'sega',
        rating: 8
    },
    {
        game: 'Castlevania Rondo of Blood',
        platform: 'pc engine',
        rating: 10
    }
];

function findNes(game) {
    return game.platform == 'nes';
}
function noNes(game) {
    return game.platform != 'nes'; 
}

function average(array) {
   function plus(a, b) { return a + b};
   return 'Average score: ' + array.reduce(plus) / array.length;
}

function findScore(game) {
  return game.rating;
}

console.log(average(games.filter(findNes).map(findScore)));
//-> 8.666666666666666
console.log(average(games.filter(noNes).map(findScore)));
//-> 8.333333333333334
```

---

## The Cost

* The cost is inefficiency
* Building new arrays is costly
* Function recursion and *forEach* is costly compared to loops
* Most computers are quick enough where this isn't as big of an issue as it use to be
* Most things that can take a long time are loops, especially nested loops

---

## Binding

> The bind method, which all functions have, creates a new function that will call the original function but with some of the arguments already fixed.

* The bind method is a standard method on all functions.
* In the folling example, the bound function has myList as a pre-specified initial argument, followed by any arguments given to the bound function by *filter*
* Just like *.apply*, there is more to *.bind* that I don't understand

```javascript
// Example of bind
var games = ['Castlevania', 'Zelda', 'Mario', 'Contra'];
var myList = ['Castlevania', 'Zelda', 'Mario'];

function isInSet(set, game) {
 return set.indexOf(game) > -1; 
}

console.log(games.filter(function(game) {
  return isInSet(myList, game);
}));
//-> ["Castlevania", "Zelda", "Mario"]

console.log(games.filter(isInSet.bind(null, myList)));
//-> ["Castlevania", "Zelda", "Mario"]
```
---

## Exercise Answers

### Problem 1

```javascript
console.log(arrays.reduce(function(a, b) {
  return a.concat(b);
}));
```

### Problem 2

```javascript
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

console.log(average(ancestry.filter(function(person) {
  return byName[person.mother];
}).map(function(person) {
  return person.born - byName[person.mother].born;
})));
```

### Problem 3

```javascript
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function groupBy(array, group) {
  var mapped = {};
  array.forEach(function(person) {
    if (group(person) in mapped) {
      mapped[group(person)].push(person.died - person.born);
    } else {
      mapped[group(person)] = [person.died - person.born]  
    }
  });
  return mapped;
}

function group(person) {
  return Math.ceil(person.died / 100);
}

centuries = groupBy(ancestry, group);
for(century in centuries) {
  console.log(century + ': ' + average(centuries[century]));
}
```

### Problem 4

```javascript
function every(array, f) {
  for (var i = 0; i < array.length; i++) {
    if (! f(array[i]) )
      return false; 
  }
  return true;
}

function some(array, f) {
  for (var i = 0; i < array.length; i++) {
    if (f(array[i]))
      return true;
  }
  return false;
}
```