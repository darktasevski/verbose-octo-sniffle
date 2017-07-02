# Chapter 2. this All Makes Sense Now!

## Call-Site
* Call-site: The location in code where a function is called
* To figure out what *this* is a reference to, we must understand the call-site
* The call-site to inspect is in the invocation before the currently executing function

```javascript
function foo() {
  bar();
  // The call-site for bar -- This is the global scope
  // Current stack: foo
}

function bar() {
  baz();
  // The call-site for baz
  // Current stack: foo -> bar
}

function baz() {
  console.log(baz);
  // Current stack: foo -> bar -> baz
}

foo();
// The call-site for foo
```

## Nothing but Rules
* There are 4 rules that apply to *this* in a call-site

### Default Binding
* This rules comes from standalone function invocation
* This is the default catch-all rule when none of the other rules apply

* The default binding for *this* applies to the function call (where it is called)
* In the following example, because the function was called in the global space, *this* points to the global object
```javascript
function foo() {
  console.log(this.a);
}

var a = 2;

foo();
//-> 2
```

* In *strict mode*, the global object can't be referenced by *this*

### Implicit Binding
* Whether the call-site has a context object
  * The way I understand it, it's if the function called is "owned" by an object. It's not if the call site is inside an object.

* In the following example, the call-site uses the *obj* context to reference the function
  * Also known as containing an object
* When there is a context object, *Implicit Binding* says that the object will be used for the *this* binding
* In the following example, this.a is synonymous with obj.a
* Only the last object in the reference chain matters
```javascript
function log() {
  console.log(this.a);
}

var obj = {
  a: 2,
  log: log
}

obj.log();
//-> 2
```

#### Implicity lost
* A common frustration is when an implicit binding looses that binding
> Parameter passing is just an implicit assignment, and since we’re passing a function, it’s an implicit reference assignment

```javascript
function foo() {
  console.log(this.a);
}

obj = {
  a: 1,
  foo: foo
}

bar = obj.foo;

a = 'Global value';

bar();
//-> 'Global value'
```

* Event handlers in JavaScript libraries often change *this* to point at the dom element. This can be useful, but also frustrating.

## Explicit Binding
* All functions have a *call()* and *apply()* utility
* They take an object to use as its *this* binding
* Because we're saying what we want *this* to be, it's called *explicit binding*

```javascript
function foo() {
  console.log(this.a);
}

obj = {
  a: 2
}

foo.call(obj);
//-> 2
```

### Hard binding
* In the following example, no matter how you envoke hardBind, it will always manually envoke foo with the given object

```javascript
function foo() {
  console.log(this.a);
}

function hardBind(binding) {
  foo.call(binding);
}

obj = {
  a: 2
}

hardBind(obj);
//-> 2
setTimeout(hardBind(obj), 500);
//-> 2
```
* Usually you'll want to pass through some argumenents into a binding
```javascript
function bind(fn, obj) {
  return function() {
    fn.apply(obj, arguments);
  }
};

function foo() {
 	var result = this.a;
  for(var arg in arguments) {
  	result += arguments[arg];
  }
  console.log(result);
}

var obj = {
	a: 2
}

var a = bind(foo, obj);

a(1,2,3,4,5,6);
//-> 23
```

* The above pattern is so common, that it's built in as a method on functions
* *bind()* returns a new function that calls the original function with a *this* context that you provide

```javascript
function foo() {
  var result = this.a;
  for(var arg in arguments) {
    result += arguments[arg];
  }
  console.log(result);
}

var obj = {
  a: 2
};

var a = foo.bind(obj);

a(1,2,3,4,5,6);
//-> 23
```

### API call "contexts"
* Many functions provide an optional parameter, usually called *context* which works like *bind*

```javascript
var obj = {
  a: 'awesome'
}
[1,2,3].forEach(function(num){
  console.log(num, this.a);
}, obj);
//-> 1 awesome
//-> 2 awesome
//-> 3 awesome
```

## new Binding
* JavaScripts *new* operator looks identical to class-oriented languages, but doesn't function the same way
* Constructors in JavaScript
  * A function that is called with a *new* operator in front of them
  * They are not attached to classes or instantiating a class
  * They are not even special types of functions
  * They are just regular functions that are hijacked by the *new* operator
  * There is no such thing as constructor functions, but rather construction calls *of* functions

During a constructor call, the following happen:
  1. A brand new object is created (aka constructed)
  2. The newly constructed object is [[Prototype]]-linked
  3. The newly constructed object is set as the *this* binding for that function call
  4. Unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object

```javascript
function Foo(a) {
  this.data = a;
}

var bar = new Foo(2);
console.log(bar.data);
//-> 2
```

## Everything in Order
* Some rules have presedence over others

* Explicit binding has precidence over implicit
```javascript
function log() {
  console.log(this.a);
}

var obj = {
  a: 1
}

obj2 = {
	a: 2,
  log: log
}

obj2.log();
//-> 2
obj2.log.call(obj);
//-> 1
```

new binding vs implicit binding
* new binding has precidence over implicit
```javascript
function Foo(a) {
  this.a = a;
}

var obj = {
  foo: Foo
};

obj.foo(1);
console.log(obj.a);
//-> 1

var obj2 = new obj.foo(2);
console.log(obj2.a);
//-> 2
```

Note:
> new and call/apply cannot be used together, so new foo.call(obj1) is not allowed to test new binding directly against explicit binding. But we can still use a hard binding to test the precedence of the two rules.

new binding vs hard binding
* new binding has precidence over hard binding
```javascript
function Foo(a) {
  this.a = a;
}

var obj = {};

var bar = Foo.bind(obj);
bar(1);
console.log(obj.a);
//-> 1

var baz = new bar(2);
console.log(obj.a);
//-> 1
console.log(baz.a);
//-> 2
```

* Why is new being able to overwrite hard binding useful?
  * Bind is able to preset some or all of a function's arguments.
  * Setting some of the functions is called *partial application* and is a subset of *currying* (whatever that is)

```javascript
function foo(p1, p2) {
  this.val = p1 + p2;
  return this.val;
}

var bar = foo.bind(null, 'p1');
var baz = bar('p2');

console.log(baz)
//-> p1p2
```

## Binding Exceptions
There are some exceptions to these rules.

### Ignored this
* You can pass in null as the first parameter in *apply, *call*, and *bind* and it will apply the default binding rule.
* A reason for doing this is if you don't care about what *this* and want to use the methods other utilities

### Safer this
One downside of using null with *apply*, etc, is that if used with a function that does make a reference to *this*, it might inadvertently reference or mutate the global object (window).

#### The solution
* Create a "DMZ"
  * an empty, nondelegated object
* Using a "DMZ" will contain any unexpected *this* operations to the empty object
* Author suggests naming the empty object ø

```javascript
function foo(a, b) {
  console.log('a: ' + a + ' b: ' + b);
}

var ø = Object.create(null);

foo.call(ø, 1, 2);
```

### Indirection
```javascript
function foo() {
    console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2”
```

* The expression **p.foo = o.foo** is just a reference to the function
* As a result, the call site is *foo()* and the default binding rule applies

### Softening Binding
This prototype method replaces the default binding to whatever you specify
```javascript
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
    		// Default binding rules because the callsite is the function
        // this = foo()
        var fn = this,
            // Optional currying
        		// Grabs the arguments minus the obj
            curried = [].slice.call( arguments, 1 ),
            bound = function bound() {
                return fn.apply(
                		// this is either the obj passed in or the function
                    (!this ||
                        (typeof window !== "undefined" &&
                            this === window) ||
                        (typeof global !== "undefined" &&
                            this === global)
                    ) ? obj : this,
                    // merge partially applied function and arguments
                    curried.concat.apply( curried, arguments ),
                );
            };
        // Set new function's prototype to the original
        bound.prototype = Object.create( fn.prototype );
        return bound;
    };
}
```

## Lexical this
* ES6 introduces arrow functions that don't follow the 4 binding rules
* They adopt their *this* binding from the encolsing scope
* The lexical binding of an arrow function can't be overridden, even with *new*

```javascript
function foo() {
    // return an arrow function
    return (a) => {
        // `this` here is lexically inherited from `foo()`
        console.log( this.a );
    };
}

function baz() {
	return function() {
  	console.log(this.a);
  };
}

var obj1 = {
    a: 2
};
var obj2 = {
    a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); 
//-> 2

var test = baz.call(obj1);
test.call(obj2);
//-> 3
```
