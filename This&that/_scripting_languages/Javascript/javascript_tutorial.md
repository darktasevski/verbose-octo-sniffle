#javascript tutorial:

# important notes:

- In JavaScript, all objects have the `valueOf()` and `toString()` methods.
- scope: is about what variables can I access
- context: the value of `this`

```js
x.valueOf();
x.toString();
```

# variables
```js
// variables can start with: $, _, CapitalLetter, lower_case_letter
var $name
var _name
var Name
var this_is_my_name
```


# Objects
```js
obj = {
  name: "brian",
  sayMyName: function(name){alert("hello " + name)},
  "my last name": "spinos"
}

obj.name // "brian"
obj["name"] // "brian"

obj.sayMyName("brian") // "hello brian"

obj["my last name"] // "spinos" // keys can be strings, and with spaces too!!!!
```

# arrays
```js
// you can have different objects in one array

array = ["a", "b"]
foo = function(){alert("hello")}

typeof array // "object" <---- JS DOES NOT RETURN "array"
typeof foo // "function" <----

array.length // number of elements
array.sort() // alphabetical
array.toString() //  "a,b"
array.valueOf() // ["a", "b"]
array.join(" * ") // "a * b"

// use this function to identify Arrays in JS:
function isArray(myArray) {
  return myArray.constructor.toString().indexOf("Array") > -1; // boolean
}
```

# var

- var is just to declare a variable, you just need it once

# semicolon ";"

- its used to separate commands

# getters

```js
// get element class
$("#element").style
$("#element").style.zoom
```

```js
// get element html attributes
$("#element").src
$("#element").alt
```

```js
// get html
$("#element").innerHTML
$("#element").html

$("#element").style
```

# special variables

```js
document // all the page
// methods on it:
document.write("hello");
```

# prototype
```js
obj.prototype //Allows you to add properties and methods to an object
              // the obj is not the --> person = {name: "brian", age: 25}
              // the object is this --> function person(name, age){this.name = name, this.age = age}

function person(name, age){this.name = name, this.age = age}

var brian = new person("brian", 25)

// salary will become a virtual attribute, because its only registered in memory, it will not add itself in the function body
person.prototype.salary = "an initial default value"
person.prototype.foo = function(){alert("hello " + this.name );}

brian.salary // "an initial default value"
brian.salary = 160000 // 160000
brian.foo // "hello brian"
//------------------- this will not work:
var worker = {name: "fred", age: 33}
worker.prototype.salary = "an initial default value"
worker.salary // TypeError...
```

## Methods
```js
Date() // "Fri Aug 29 2014 11:34:31 GMT-0400 (EDT)"
console.log("hello"); // "hello"

typeof "hello" // "string"

"hello".length // 5
"hello, there".split(", ") // ["hello", "there"]
(123).toString() // "123"
parseInt("10");         // returns 10, not "10"

delete obj // true , then: obj is not defined // you can also delete the object properties!!!

"brian spinos".search(/brian/i) // returns 0 // returns the index where the search pattern beggins
"hello".search("lo") // returns 3
"hey brian".replace(/hey/i, "hello") // "hello brian"
for(m in document){ console.log(m)} // list methods
document.forms // get all form elements in the dom in an array
document.title // "Facebook"
document.cookie //  when you are in facebook use this to show your facebook cookie
document.cookie="username=John Doe"; // create a cookie
query_string // returns the page query string!
location.href  // url with query string
location.pathname // "/patients/4"
history.back() // same as clicking back in the browser
history.forward() // same as clicking forward in the browser
navigator // the browser ???
navigator.appVersion // version of browser
navigator.userAgent
 ```

# Objects
```js
Math
Math.PI

Object.getOwnPropertyNames(Array.prototype) // get stuff from Array class


//
function methods(obj){
  return Object.getOwnPropertyNames(obj.prototype)
}

```

# functions
```js
// functions can be treated like variables!!! <---

// declare the function
function myFunction(a, b) { return a * b;}

// call the function
myFunction(3,6) // 18

// inside a function:
//  local variable:              var name = "brian"
//  set a global variable:       name = "brian"
//  the function has acces to variables outside of the function
/*
The lifetime of a JavaScript variable starts when it is declared.

Local variables are deleted when the function is completed.

Global variables are deleted when you close the page.

*/
```

```js
// execute a function right away!
// syntax:    var x = (<function>)()
var foo = (
  function(){alert("hello")}
)()
```

# events
```html
<!-- are things that happen to HTML elements

 examples:
  An HTML web page has finished loading
  An HTML input field was changed
  An HTML button was clicked

-->
<button onclick='getElementById("demo").innerHTML=Date()'>The time is?</button>
<button onclick="displayDate()">The time is?</button>
```

# loops
```js
object = {name: "brian", speak: function(word){ console.log("I said" + word)}}
for ( x in object ) { // it will loop through the attributes/methods of an object
  console.log(x);
} // returns: name, speak


//--------------------- for loops
// for(initial_code; boolean; code_after_each_loop){console.log(n)};

for(var n = 1; n <= 10; n++){console.log(n)}; // 1 2 3 4 5 6 7 8 9 10

//--------------------- while loops
//  while(boolean){do_this};
var n = 1;
while(n <= 10){  // at some point it needs to become false
  console.log(n);
  n++ // this will eventualy set it to false
};

```

# string methods
```js

charAt()              // Returns the character at the specified index (position)
charCodeAt()          // Returns the Unicode of the character at the specified index
concat()              // Joins two or more strings, and returns a copy of the joined strings
fromCharCode()        // Converts Unicode values to characters
indexOf()             // Returns the position of the first found occurrence of a specified value in a string
lastIndexOf()         // Returns the position of the last found occurrence of a specified value in a string
localeCompare()       // Compares two strings in the current locale
match()               // Searches a string for a match against a regular expression, and returns the matches
replace()             // Searches a string for a value and returns a new string with the value replaced
search()              // Searches a string for a value and returns the position of the match
slice()               // Extracts a part of a string and returns a new string
split()               // Splits a string into an array of substrings
substr()              // Extracts a part of a string from a start position through a number of characters
substring()           // Extracts a part of a string between two specified positions
toLocaleLowerCase()   // Converts a string to lowercase letters, according to the host's locale
toLocaleUpperCase()   // Converts a string to uppercase letters, according to the host's locale
toLowerCase()         // Converts a string to lowercase letters
toString()            // Returns the value of a String object
toUpperCase()         // Converts a string to uppercase letters
trim()                // Removes whitespace from both ends of a string
valueOf()             // Returns the primitive value of a String object

```

## Object constructor `(classes?)`
```js
// the constructor can be capitalized or not! e.g: Person or person

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
    this.fullName = function(){console.log(this.firstName + " " + this.lastName)};
};
var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");


```


## Inheritance prototype `(like a super class)`
```js
// So I add stuff to the objects 'prototype' ??? I guess so
function Monster(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
    this.fullName = function(){console.log(this.firstName + " " + this.lastName)};
};

Monster.prototype = {
  speak: function(){console.log(this.firstName + " is speaking")},
  walk: function(){console.log("I have been walking for " + this.age + " years")},
  specie: "human",
  maxAge: 100
};

# create the objects after the prototype declaration
var myFather = new Monster("John", "Doe", 50, "blue");
var myMother = new Monster("Sally", "Rally", 48, "green");

myFather.speak(); //John is speaking
myFather.walk(); // I have been walking for 50years
myFather.specie; // "human"
myFather.maxAge; // 100
```

# The `localStorage` object
```js
// its a HTML5 thing
localStorage.setItem("name", "brian");
localStorage.setItem("last", "spinos");
localStorage // => Storage { name: "brian", last: "spinos"}

localStorage.getItem("name"); //=> "brian"
```
