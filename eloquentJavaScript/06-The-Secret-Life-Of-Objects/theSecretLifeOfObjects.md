# The Secret Life of Objects

## History
> One philosophy is that complexity can be made manageable by separating it into small compartments that are isolated from each other. These compartments have ended up with the name objects.

* An object hides the details of what it's doing and provides methods as an interface in which it is to be used.
* These ideas of programming started in the 70s/80s and was popularized in the 90s

---

## Methods

* Methods are properties of an object that hold a function value

```javascript
//Example of method
var hello = {};
hello.world = function() {
  console.log('Hello World');
}

hello.world();
//-> Hello World
```

* When a function is called as a method, the *this* variable is added to its environment that points to the object it was called on

```javascript
//Example of 'this' when a method is called
function addItem(item) {
  console.log(item + ' has been added to your ' + this.type + ' size backpack.'); 
}

var inventory = {
  type: 'medium',
  addItem: addItem
}

inventory.addItem('AK47');
//-> AK47 has been added to your medium size backpack.
```

### Apply & call

* This first argument in apply and call is to give a value to *this*
* 

```javascript
function addItem(item) {
  console.log(this);
  console.log(item + ' has been added to your ' + this.type + ' size backpack.'); 
}

var inventory = {
  type: 'medium'
}

addItem.call(inventory, 'AK47');
//-> {type: "medium"}
//-> AK47 has been added to your medium size backpack.
addItem.apply(inventory, ['M16']);
//-> {type: "medium"}
//-> M16 has been added to your medium size backpack.
```

---

## Prototypes

> In addition to their set of properties, almost all objects also have a prototype.

> A prototype is another object that is used as a fallback source of properties. When an object gets a request for a property that it does not have, its prototype will be searched for the property, then the prototype’s prototype, and so on.

* Object.getPrototypeOf returns the prototype of an object
* Prototype relationships form a tree-shaped structure
* Object.prototype is the root of objects
* Functions derive from Function.protype and arrays from Array.prototype
> Such a prototype object will itself have a prototype, often Object.prototype, so that it still indirectly provides methods like toString.

* Object.create creates an object with a specific prototype

```javascript
// Prototype example
var inventory = {
  type: 'medium',
  addItem: function(item) {
   console.log(item + ' has been added to your ' + this.type + ' backpack') 
  }
}

inventory.addItem('AK47');
//-> AK47 has been added to your medium backpack

var largeInventory = Object.create(inventory);
largeInventory.type = 'large';
largeInventory.addItem('M16');
//-> M16 has been added to your large backpack
```

* In the example above, inventory is the prototype of largeInventory
* Inventory acts as a container of shared properties between objects that inherit it
* These shared properties can be overwritten and applied only to itself

---

## Constructors

* A more convienent way to create an object that's derived from a prototype is to use a *constructor*
* In JavaScript, calling a function with *new* in front of it causes it to be treated as a *constructor*
* The constructor will have its *this* cariable bound to a fresh object, and unless it explicitly returns another object value, this new object will be returned from the call.
* An object created with *new* is an instance of its constructor
* It's a common convention to capitalize the names of constructors so you can tell them apart from other functions

```javascript
function Inventory(type) {
  this.type = type;
}

var smallInventory = new Inventory('small');
var mediumInventory = new Inventory('medium');

console.log(smallInventory.type);
//-> small.
console.log(mediumInventory.type);
//-> medium.
```

* Constructors (and all functions) automaticall get a property named *prototype*
* The *prototype* property, by default, has an empty object which is derived from Object.prototype
* Every instance created with this constructor will have this object as its prototype

To add a method or property to objects created with a constructor you can just do:
```javascript
function Inventory(type) {
  this.type = type;
}

Inventory.prototype.description = function() {
  console.log('The backpack is ' + this.type + ' sized.');
};

var smallInventory = new Inventory('small');

smallInventory.description();
//-> The backpack is small sized.
```
* ~~I don't understand what the difference is between setting the method on Inventory instead of Inventory.prototype.~~
  * The reason for this is because *this* changes context when the constructor is called with *new*. When *new* is called, the constructor will have its *this* variable bound to the object instead of the function.
    * <http://stackoverflow.com/questions/43500021/how-do-objects-inherit-constructor-properties>

---

## Overriding Derived Properties
* When a property is added to an Object, it doesn't change that objects prototype if that property exists there.
  * When a property is requested from an Object, it checks the Objects properties first, and then its prototype if that property is not found.
  * Because of this behavior, you can effectively override the prototype without affecting the prototype itself or the objects that are an instance of it.
* Overriding properties is useful because you can create derivatives of an object that share the same base properties
* One situation where this is done in the language is with objects and arrays

```javascript
// Example of toString being overridden

console.log(Array.prototype.toString == Object.prototype.toString);
//-> false

var array = [1,2,3,4,5];
console.log(Object.prototype.toString(array));
//-> [Object, Object]
console.log(array.toString);
//-> 1,2,3,4,5
```

---

## Prototype Interference

* Adding a property to an objects prototype can interfere when doing a for-in loop

```javascript
var games = {
  castlevania: [1,2,3],
  zelda: [1,2]
}

Object.prototype.garbage = 'not a game';

for (var game in games) {
  console.log(game); 
}
//-> castlevania
//-> zelda
//-> garbage
```

* This happens because of *enumerable* vs *nonenumerable* properties
* Standard properties in a prototype are *nonenumerable*
* All properties that were created by assigning them are *enumerable*

To define a *nonenumerable* property, use Object.defineProperty

```javascript
// Example of Object.defineProperty
var games = {
  castlevania: [1,2,3],
  zelda: [1,2]
}

Object.defineProperty(Object.prototype, 'garbage', {enumerable: false, value: 'not a game'});

for (var game in games) {
  console.log(game); 
}
//-> castlevania
//-> zelda
```

* Even if you set a property as nonenumerable, it will still show up in a regular *in* operator.
* To get around this, use .hasOwnProperty()
  * This method doesn't look in the objects prototype for properties

```javascript
//Example of 'hasOwnProperty'

var games = {
  castlevania: [1,2,3],
  zelda: [1,2]
}

Object.defineProperty(Object.prototype, 'garbage', {enumerable: false, value: 'not a game'});

console.log('garbage' in games);
//-> true
console.log(games.hasOwnProperty('garbage'));
//-> false
```

---

## Prototype-less Objects

* You can create an object without a prototype by passing null in *Object.create*

```javascript
var prototype = {};
var prototypeless = Object.create(null);

console.log('toString' in prototype);
//-> true
console.log('toString' in prototypeless);
//-> false
```

## Polymorphism

* Polymorphism is different code working with the same interface.
* One example is how the *String* function (interface) calls the *toString* method on the value passed in. The *toString* method differs depending on value type passed into *String*.
* Polymorphism is one of the staples of Object Oriented Programming

---

## Laying Out a Table

### Builder Function
* Ask each cell how wide and high it wants to be
* Using this info, it will determine the width of the columns and the hight of the rows
* Ask the cells to draw themselves at the correct size
* Different style cells could be developed later and plugged into the program as long as it supports the interface

### The Interface
* **minHeight()** 
  * returns a number indicating the minimum height this cell requires (in lines).
* **minWidth()** 
  * returns a number indicating this cell’s minimum width (in characters).
* **draw(width, height)** 
  * returns an array of length height, which contains a series of strings that are each width characters wide. This represents the content of the cell.

### rowHeights(rows)
* rows is an array of arrays
* *maps* the outer array to a number derived from *reducing* the inner array
* The returned array is the min height for each of rows
* *map*, *forEach*, and *filter* passes a second argument into the function its given which is the index of the current element.
* A varable starting with or consisting entirely of a *_* is a common convention that means that it's not going to be used in the function.

### colWidths(rows)
* Does the same thing as rowHeights, except for the columns using the index variable of the map method
* The returned array is the max width for each column

### drawTables(rows)
  * Returns an array that's been mapped with the content for each row
  * **Helper function:** drawRow(row, rowNum)
    * Calls *cell.draw* for each cell and stores them in var blocks
  * **Helper function:** drawLine(blocks, lineNo)
    *  Joins each cell into one line with a space

### dataTable(data)

```javascript
// data is an array of objects
function dataTable(data) {
  // Grabs the first row and holds the headers ['name', 'height', country']
  var keys = Object.keys(data[0]);
  // Map each item in keys with an Underlined Cell
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  
  // Map each array in data with a new array of textCells representing each property
  // [[TextCell, TextCell, TextCell]]
  var body = data.map(function(row) {
    return keys.map(function(name) {
      return new TextCell(String(row[name]));
    });
  });
  // Adds the headers array to the body and returns it
  // [[UnderlinedCell, UnderlinedCell, UnderlinedCell], [TextCell], [TextCell]
  return [headers].concat(body);
}
```

### drawTable(rows)

```javascript
function drawTable(rows) {
  //widths and heights are an array
  var heights = rowHeights(rows);
  var widths = colWidths(rows);
  
  // Breaks each array into a string with .join
  // Joins the final array into a string
  //line name        
  //line height
  //line country      
  //line ------------
  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }
  
  //
  function drawRow(row, rowNum) {
    // Maps each array with a string with padding
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
	
    // Map the first item in each array
    // lineNo is for the headers
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }
  
  //Maps each row, joins them into one string, returns the string
  return rows.map(drawRow).join("\n");
}
```

## Getters And Setters
A getter will run a function every time a property is requested

```javascript
//Example of getter
var obj = {
  items: [1, 2, 3],
  get value() {
    console.log('Getting the value:');
    return this.items.length;
  }
}

console.log(obj.value);
//-> Getting the value:
//-> 3
```

A setter will run every time a property is set

```javascript
var obj = {
  set value(num) {
    console.log('Value requested to be set to ' + num);
  }
}

obj.value = 3;
//-> Value requested to be set to 3
```

* Adding a setter or a getter to an existing object (or protoype) can be done with *Object.defineProperty*
* When a getter but no setter is defined, writing to the property is ignored

```javascript
var obj = {
  items: [1, 2, 3, 4, 5]
}

Object.defineProperty(obj, 'value', {
  get: function() {
    return this.items.length
  }
});

console.log(obj.value);
//-> 5
```

---

## Inheritance

* You can reuse a constructor and its prototype methods
* After the new constructor is created, you can override its methods

```javascript
function OG(text) {
  this.words = text;
}
OG.prototype.log = function() {
  return 'Called from ' + this.words; 
}

function CopyOG(text) {
  // Uses the original constructor
  OG.call(this, text);
}
// Sets CopyOG's prototype to an empty object with the same prototype as OG
CopyOG.prototype = Object.create(OG.prototype);

var stuff = new OG(1);
var copyStuff = new CopyOG(2);

console.log(stuff.log());
//-> Called from 1

console.log(copyStuff.log());
//-> Called from 2
```

* Encapsulation, Polymorphism, and Inheritance are three important parts of OOP
* Encapsulation and Polymprthism are used to seperate code from eachother
* Inheritance is controversial because it ties code together

---

## The Instanceof Operator

It's sometimes useful to know if an object is derived from a specific constructor

```javascript
// Example of instanceof

function FirstConstructor(data) {
  this.data = data;
}

function SecondConstructor(data) {
  FirstConstructor.call(this, data);
}
SecondConstructor.prototype = Object.create(FirstConstructor.prototype);

var firstObj = new FirstConstructor('first');
var secondObj = new SecondConstructor('second');

console.log(secondObj instanceof SecondConstructor);
//-> true
console.log(secondObj instanceof FirstConstructor);
//-> true
```

---

## Exercise Answers

### Problem 1

```javascript
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(vector) {
  return new Vector(this.x + vector.x, this.y + vector.y); 
}
Vector.prototype.minus = function(vector) {
  return new Vector(this.x - vector.x, this.y - vector.y); 
}
Object.defineProperty(Vector.prototype, 'length', {
  get: function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));  
  }
});
```

---

### Problem 2

```javascript
function StretchCell(inner, width, height) {
  this.width = width;
  this.height = height;
  this.inner = inner;
}
StretchCell.prototype.minWidth = function() {
  return Math.max(this.width, this.inner.minWidth());
}
StretchCell.prototype.minHeight = function() {
  return Math.max(this.height, this.inner.minHeight());
}
StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height);
}
```

---

### Problem 3

```javascript
function ArraySeq(array) {
  this.data = array;
  this.current = -1;
}
ArraySeq.prototype.iterate = function() {
  var done = this.current >= this.data.length - 1;
  this.current++;
  
  return {
    value: this.data[this.current],
    done: done
  }
}

function RangeSeq(from, to) {
  this.from = from;
  this.to = to;
  this.pos = -1;
}
RangeSeq.prototype.iterate = function() {
  var done = (this.from + this.pos) >= this.to;
  this.pos++;
  
  return {
    value: this.from + this.pos,
    done: done
  }
}

function logFive(sequence) {
  for (var i = 0; i < 5; i++) {
    var current = sequence.iterate();
    
    if(current.done) {
      break; 
    }
    console.log(current.value);
  }
}
```