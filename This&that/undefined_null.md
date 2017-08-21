# Undefined & Null

* `undefined` is a property of the global object; `window.undefined => undefined`
* In ES3 the variable `undefined` is mutable, while in ES5 it is immutable.
* `null` is a JavaScript keyword - thus `null` inherently unassignable `(Uncaught ReferenceError: Invalid left-hand side in assignment)`

`undefined` is not defined.
```JavaScript
var a;
a === undefined; // true
typeof b // "undefined"
```

_declaring_ and _defining_:
```JavaScript
var c = 3; // (var c; c = 3)
```

_ReferenceError_
```JavaScript
d // Uncaught ReferenceError: d is not defined
```

## Types
```JavaScript
typeof null // "object"
typeof undefined // "undefined"
typeof(typeof null) // "string"
typeof(typeof undefined) // "string"
// When not defined, the type is undefined
typeof e // "undefined"
```

Is `bar` an object or `null`?
```JavaScript
var bar = null;
typeof bar // "object"
bar === null // true
```

But is `foo` and object?
`function foo() {}`
`typeof foo // "function"`

## Environment

```JavaScript
// ES 5
undefined = 3 // will fail silently
```

```JavaScript
// ES 3
"use strict;"
undefined = 3 // will assign
```

The `void` operator is often used merely to obtain the undefined primitive value
```JavaScript
void(0) // undefined
void 0 // undefined
```

Treat a function as an expression instead of a declaration;
```JavaScript
function() {}() // Uncaught SyntaxError: Unexpected token (
void function() {}(); // undefined
void(function() {}()); // undefined
```

When a browser follows a javascript: URI, it evaluates the code in the URI
and then replaces the contents of the page with the returned value,
unless the returned value is `undefined`.
The `void` operator can be used to return `undefined`. For [example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void):

```HTML
<a href="void(0)">
  click me!
</a>

<a href="void(function() { document.querySeletor('input[name='login']').style.backgroundColor = 'red' })">
  click me!
</a>
```

## Compilation vs Runtime

```JavaScript
var y = 1;

// there is no declaring of the function `f` as statements
// within an `if` block are run at runtime.
if (function f(){}) {
  y += typeof f;
}
console.log(y); // 1undefined.
```

```JavaScript
var foo = function f(){};
var y = 1;

if (foo) {
  y += typeof foo;
}
console.log(y); // 1function
```
