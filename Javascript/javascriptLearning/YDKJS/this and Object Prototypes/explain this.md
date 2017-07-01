# I need to explain what *this* is

## What is *this*
* *this* is a context based keyword that is evaluated at run time.
* To find what *this* is, you must first find the call site of the fuction (how the function is called)
  * The call site is where the function is called, not where it is declared.
* To find the call site, it is generally as easy as "looking where the function was called", but sometimes certain coding patterns can obscure that.

Example of call-site
```javascript
function foo() {
  console.log('foo');
  // This is bar's call-site
  bar();
}

function bar() {
  console.log('bar');
}

// This is foo's call-site
foo();
```

* Once we determine a functions call-site, we must figure out which rules apply to determine what *this* is. There are four of these rules:
  * Default binding
  * Implicit binding
  * Explicit binding
  * new binding

## Default binding
* Default binding is the most common binding and the catch-all rule when the other three rules don't apply.

Example of default binding
```javascript
function foo() {
  var a = 2;
  console.log(this.a);
  bar();
}

function bar() {
  console.log('bar', this.a);
}

var a = 1;
foo();
//-> 1
```

* First we look at where foo is called to determine the call-site
  * The call-site of foo is in the global scope
* The default binding rule says that if none of the other rules apply (we'll get to those), then the binding will be the global object
* If we're using *strict mode*, then default binding will return *undefined*

## Implicit binding
* Implicit binding is the second rule and has priority over Default binding
* The Implicit binding rule comes into effect if the call-site has a context object
* Implicit binding says that if the function call has a context object, then it's *this* will point at that object

```javascript
function foo() {
  console.log(this.data);
}

var obj = {
  data: 1,
  // The call site for foo is 'contained' inside an object
  foo: foo
}

obj.foo();
//-> 1
```

## Explicit Binding
* Explicit binding is the third rule and has priority over Default and Implicit
* With explicit binding, we can force the binding to be whatever we want it to.
* All functions have three utilities that enable us to use explicit binding
  * call()
  * apply()
  * bind()
* These functions take an object as their first parameter that *this* will be bound to.

Example of implicit binding with call()
```javascript
function foo() {
  console.log(this.data);
}

var obj = {
  data: 1
};

foo.call(obj)
//-> 1
```

* apply() is the same as call(), except that it can take an array as an additional parameter that specifies the arguments that the function will be called with.

```javascript
function foo() {
  for (argument of arguments) {
    console.log(this.data, argument);
  }
}

var obj = {
  data: 1
}
var params = ['nes', 'snes', 'n64'];

foo.apply(obj, params);
//-> 1 'nes'
//-> 1 'snes'
//-> 2 'n64'
```

* Before getting into the details of bind(), it's important to know why we need it.
* With Implicit binding, we saw how we can bind the *this* context to an object, but often this binding can get lost.

```javascript
  function foo() {
    console.log(this.a);
  }

  var obj2 = {
    a: 2,
    foo: foo
  };

  var obj = {
    a: 1,
    obj2Foo: obj2.foo
  };

  obj.obj2Foo();
  //-> 1
  setTimeout(obj.obj2Foo, 1000);
  //-> undefined
```

* obj.obj2Foo is just an implicit reference to the original foo() and the call-site is in obj, not obj2.
* To get around this, we can make a function that ensures that the binding sticks

```javascript
function bind(obj, fn, args) {
  return function() {
    return fn.apply(obj, args);
  }
}

var data = 'global';

function foo() {
  for (arg of arguments) {
    console.log(this.data, arg);
  }
}

var obj = {
  data: 1,
  foo: foo
}

var log = bind(obj, obj.foo, ['nes', 'snes', 'n64']);

log();
//-> 1 'nes'
//-> 1 'snes'
//-> 1 'n64'
setTimeout(log, 100);
//-> 1 'nes'
//-> 1 'snes'
//-> 1 'n64'
log.call(window);
//-> 1 'nes'
//-> 1 'snes'
//-> 1 'n64'
```

* Our bind function returns a function that calls .apply on the function we pass into it
* This ensures that however the function is called, it's binding will be intact.
* Because this pattern is so common, it's a built in utility on functions

```javascript
function foo() {
  console.log(this.data);
}

var obj = {
  data: 1
}

var bar = foo.bind(obj);

bar();
//-> 1
setTimeout(bar, 1000);
//-> 1
```

## new Binding
* new Binding is the last binding rule and has priority over Default, Implicit, and Explicit
* When using JavaScripts *new* operator to make a new object, its *this* is bound to that object.

```javascript
function foo() {
  this.data = 'foo';
}

var bar = new foo();

console.log(bar.data);
//-> foo
```

## Arrow function
* ES6 introduces a new kind of function called the arrow-function
* Arrow-functions ignore the 4 rules of *this* and instead inherit the enclosing scops *this*

```javascript
function foo() {
  setTimeout(() => {
    console.log(this.data);
  }, 100);
}

var obj1 = {
  data: 1
};

foo.call(obj1);
```