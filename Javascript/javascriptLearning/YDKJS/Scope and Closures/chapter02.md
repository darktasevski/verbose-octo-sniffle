# Chapter 2. Lexical Scope
* There are two predominate models for how scope works in programming languages.
  1. Lexical Scope
  2. Dynamic Scope
* JavaScript uses Lexical Scope

## Lex-time
* Lexical scope is defined during the lexing process
* Lexical scope is mostly set in stone at write time
* Each function creates a new bubble of scope
* No scope bubble for some function can simultaneously exist (partially) inside two other outer scope bubbles

### Look-ups
* Scope look-ups will start with the current scope, and then move up towards the global scope
* Scope look-ups stops once it finds the first match
* Lexical scope is only defined by where a function is declared
* Lexical scope only applies to first-class identifiers

## Cheating Lexical
* JavaScript has teo mechanisms to cheat lexical scope
* They're considered bad practice because they lead to poor performance

### Eval
* eval() takes a string as an argument and treats the contents as if it had been there at write time.
  * This cheats lexical scope because lexical scope is defined at write time

In this example, var b is created inside of foo
```javascript
function foo(str, a) {
  eval(str);
  console.log(a, b);
}

var b = 2;
foo('var b = 3;', 1);
//1, 3
```

* When used in strict mode, eval has its own scope and does not modify the existing scope

```javascript
function foo(str) {
   "use strict";
   eval( str );
   console.log( a ); // ReferenceError: a is not defined
}

foo( "var a = 2" );
```

### With
with is typically explained as shorthand for making multiple property references against an object without repeating the object reference

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3
};

with (obj) {
  a = 4;
  b = 5;
  c = 6;
};

console.log(obj.a, obj.b, obj.c);
//-> 4, 5, 6
```

* The with keyword takes an object and treats it as if it were a separate lexical scope.
* If a variable in a variable assignement doesn't exist inside the object, then normal LHS rules tell it to go into the parent scope until it finds the variable.
* If it doesn't find a match, then the variable is created as a global.

```javascript
var obj {one:1, two:2};

function change(obj) {
  with obj(obj) {
    a = 3;
    b = 4;
    c = 5;
  }
}

change(obj);
console.log(obj.a, obj.b, obj.c);
//-> 3, 4, undefined
console.log(c);
//-> 5
```

### Performance
* eval and with are very bad for performance, even if used just once
* JavaScript optimizes performance by statically analyzing code while it lexes so it can predetermine where all the variable and function declarations are. It does this so it takes less effort to find them during execution.
* By including eval or with, they make these optimizations pointless because their impact on scope can't be known until execution.