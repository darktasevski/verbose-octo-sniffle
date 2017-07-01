# Chapter 3. Function Versus Block Scope

## Scope From Functions
* JavaScript has function-based scope
* Each function declared will create a bubble for itself
* Each function or variable declaration belogs to the function scope it was called in.
* Nested scope have access to the parents variables, but the parents don't have access to the childrens variables

## Hiding in Plain Scope
* Is is a good idea to keep all variables and functions private by *hiding* what they need to do their jobs inside of their scope.
* If you don't keep functions private, then you risk that it's details be used in unexpected ways, intentionally or not.

Principle of Least Privilege
> ...you should expose only what is minimally necessary, and “hide” everything else.

### Collision Avoidance
> Another benefit of “hiding” variables and functions inside a scope is to avoid unintended collision between two different identifiers with the same name but different intended usages. 

```javascript
function foo() {
  function bar(a) {
    //RHS lookup will change the var i in the parent to equal 3
    i = 3;
    console.log(a + i);
  }

  for(var i = 0; i < 10; i++) {
    bar(i * 2);
  }
}

foo();
//-> Infinite loop
```

### Global namespaces
* Variable collision in the global is likely to occur
* Libraries loaded into the environment can easily collide with eachother
* Many libraries *namespace* their variables and functions under a unique named object.

```javascript
var Dbjs = {
  author: 'Dan',
  logAuthor: function() {
    console.log(this.author);
  }
}

Dbjs.logAuthor();
//-> Dan
```

## Functions as Scopes

```javascript
(function foo(){

})();
```

* The example above is treated as a function-expression that is immediately invoked
* The function name in a function-expression is not bound to the enclosing scope, but instead only to the inside of its own function.


### Anonymous Versus Named
* Anonoymous functions are function expressions with no name identifier
* They are commonly used as callbacks

Drawbacks of anonymous functions
1. They have no name in stack traces which makes them hard to debug
2. They can't self reference (no recursion or even unbinding)
3. Doesn't contribute to self documenting code

* To get around these drawbacks, you can just name your function expressions

## Invoking Function Expressions Immediately
* *()* at the end of a function expression executes it
* It's a common pattern called IIFE
  * Immediately Invoked Function Expression
* IIFEs don't need to be named, but it's still good practice to do so

* Another variation of an IIFE is to pass in arguments
```javascript
var a = 2;

(function IIFE(global) {
  var a = 3;
  console.log(global.a);
})(window);
//-> 2
```

* Another variation of IIFE is to pass function as an argument to the IIFE and call that function inside the body of the function expression

```javascript
var a = 1;
(function IIFE(def) {
  def(window);
})(function doStuff(global){
  var a = 3;
  console.log(global.a);
});
//-> 1
```

## Blocks as Scopes
* Block scoping helps *Principle of Least Privilege* by ensuring variables can be kept as close to the code that will use them as possible and not leak outside.
* JavaScript doesn't have block scoping... sort of.

### with
* with actually creates a block scope

### try/catch
* try/catch creates block scoping as well

```javascript
try {
  undefined();
}
catch(err) {
  console.log(err); // works
}
console.log(err) // ReferenceError
```

### let
* The let keyword sits alongside var as a way to declare variables
* The let keyword attaches the variable declaration to whatever block it's contained in

```javascript
var foo = true;

if (foo) {
  let bar = 3;
  console.log('inside', bar);
  //-> 3
}

console.log(bar);
//-> ReferenceEror
```

* As your code evolves, it can sometimes be hard to keep track of which blocks variables are scoped to
  * You can make this more clear by including explicit blocks around code that you want block scoped
  * This might make moving around code easier while refactoring

```javascript
var foo = true;

if (foo) {
  {
    let bar = 1;
    console.log(bar);
    //-> 1
  }
  console.log(bar);
  // ReferenceError
}
```

### Garbage collection
* Block-scoping can make it more clear to the engine when it doesn't need data anymore

```javascript
function processData(data) {
 // process data
}

{
  let bigData = {
  //Big data
  };

  processData(bigData);
}

//Once data is processed, we don't need the variable anymore
btn.addEventListener('click', function click(event){
  //do stuff
});

```

### let loops
* let is very useful for *for* loops
* When refactoring code, pay extra care to block statements since they don't behave like regular scope would

### const
* ES6 also introduces const, which is similar to let except it's value can't be changed

```javascript
{
  let a = 1;
  const b = 2;

  a = 2;
  b = 4 // TypeError: Assignment to constant variable
}
```
