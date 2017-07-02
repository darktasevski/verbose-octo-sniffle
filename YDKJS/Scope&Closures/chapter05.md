# Chapter 5. Scope Closure

* Closures aren't a special opt-in tool that you must learn new syntax for
* Closures happen as a result of writing code that relies on lexical scope

## Nitty Gritty
> Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

```javascript
function foo() {
  var a = 'data';
  
  function bar() {
  	console.log(a);
  }
  
  return bar;
}

var closure = foo();
// closure (or bar()) has access to its parents scope even though we're executing it outside its scope
closure();
//-> data
```

* The engine won't garbage collect scope if a closure is holding onto it
* Closure lets functions access their lexical scope that was defined at author time
* All of the ways that functions are passed around as values and invoked in other locations are examples of a closure

Another exmaple of a closure
```javascript
function foo() {
  var a = 1;

  baz(function bar(){
    console.log(a);
  });
}

function baz(fn) {
  fn();
}

foo();
```
A more indirect example of closure
```javascript
var fn;

function foo() {
  var a = 'data';

  //Assigns a function to a global
  fn = function() {
    console.log(a);
  }
}

function bar() {
  // Calling a closure
	fn(); 
}

foo();
bar();
```

* Whatever the way to transport an inner function outside of its lexical scope, it will maintain scope reference to where it will originally called. 

### Now I can see
* Closure happens all the time in JavaScipt programs
  * Timers, event handlers, Ajax requests, cross-window messaging, web workers

```javascript
function wait(message) {
  setTimeout( function timer(){
    console.log(message)
  }, 1000);
}

wait('Hello');
```
* setTimout is a browser function. Somewhere in that function, it calls the function passed into it. The function is executed and it is able to access it's lexical scope

## Loops and Closure
* The intent of this program is for *i* to be logged every i * 1000 milliseconds
* What actually happens is that *6* gets logged every i * 1000 milliseconds
* This is because the function returned is referencing the same i variable. By the time the first function is executed, i will equal 6

```javascript
for (var i = 1; i <= 5; i++) {
	(function(){
    setTimeout(function() {
      console.log(i);
    }, i*1000);
  })();
}
```

### The fix
* The fix is to wrap the setTimeout in an IIFE and a copy of var *i*
* var j is closed over by the IIFE 
```javascript
for (var i = 1; i <= 5; i++) {
	(function(){
   var j = i;
    setTimeout(function() {
      console.log(j);
    }, j*1000);
  })();
}
```

Another example I think is cool
```javascript
for (var i = 1; i <= 5; i++) {
	(function(j){
    setTimeout(function() {
      console.log(j);
    }, j*1000);
  })(i);
}
```

### Block Scoping Revisited
* For the same effect, we could use the let keyword for block scoping instead

```javascript
for (var i = 1; i <= 5; i++) {
	let j = i;
  setTimeout(function() {
    console.log(j);
  }, i*1000);
}
```

* There's a special behavior for *let* declarations used in the head of a for loop
  * The variable will be declared for **each iteration** of the loop

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i*1000);
}
```

## Modules

* This is an example of a *revealing module*
* Module is invoked through the variable myModule which creates scope
* module returns an object literal with values that reference functions
* These functions have lexical scope access (or I guess it's accurate to say through closure) to all of the variables in the module function
* myModule methods have access to the variables in the module function through closure
* It's appropiate to think of the object return value as essentially a public API for the module

```javascript
function module() {
	var someData = 'data';
  var moreData = [1,2,3];
  
  function executeSomeData() {
  	console.log(someData);
  }
  
  function executeMoreData() {
  	console.log(moreData);
  }
  
  return {
  	executeSomeData: executeSomeData,
    executeMoreData: executeMoreData
  };
}

var myModule = module();

console.log(myModule.executeSomeData());
//-> data
console.log(myModule.executeMoreData());
//-> [1,2,3]
```

* There are two requirements for the module pattern to be used
  1. There must be an outer enclosing function, and it must be invoked at least once (each time creates a new module instance).
  2. The enclosing function must return back at least one inner function, so that this inner function has closure over the private scope, and can access and/or modify that private state.

* Another variation of a module
* The module is an IIFE and assigned to var module
```javascript
var data = 'User Data';
var module = (function(data) {
	var userData = data;
  var privateData = [1,2,3,4,5];
  
  function fun1() {
  	console.log(data);
  }
  
  function fun2() {
  	for (var i=0; i<privateData.length; i++) {
    	(function(j) {
        setTimeout(function() {
					console.log(j);
        }, j * 1000);
      })(i);
    }
  }
  
  return {
  	fun1: fun1,
    fun2: fun2
  };
})(data);

module.fun1();
//-> User Data
module.fun2();
//-> 0
//-> 1
//-> 2
//-> 3
//-> 4
```

* One more variation of the module pattery
* This one names the returned object so we can modify its functions from the outside

```javascript
var API = (function myAPI(){
	var APIName = 'test';
  
  function changeName(name) {
  	publicAPI.name = console.log(name);
  }
  
  var publicAPI = {
  	changeName: changeName,
  	name: console.log(APIName)
  }
	return publicAPI;
})();


API.name;
//-> test
API.changeName('a new name');
API.name;
//-> a new name
```

### Future Moduls

* ES6 modules must be defined in a separate files (one for each module)
* The browser synchronously loads a module file when it's imported
* Contents inside a module file are treated as if en`closed in a scope closure
