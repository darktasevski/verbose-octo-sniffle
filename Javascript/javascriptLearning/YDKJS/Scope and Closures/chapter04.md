# Chapter 4. Hoisting

## The Compiler Strikes Again
* The compilation phase processes all declarations (variables and functions) before the code is executed
* Javascript actually thinks of ``a = 2`` as two statements:

```javascript
  var a
  a = 2
```

* One way of thinking about what's happening here is that variable and function declarations are being moved from where they are typed in code to the top of the code. This is called *hoisting*.
* Only declarations are hoisted while assignements are left in place
* Hoisting happens per scope
* Function declarations are hoisted, but function expressions aren't

## Functions First

Functions are hoisted before variables
```javascript
foo();
var foo = function() {
  console.log(2);
};
function foo() {
  console.log(1)
}//-> 1
```

Functions that appear inside normal blocks will get hoisted
```javascript
foo();
//-> false
var a = true;

if (a) {
  function foo() {
    console.log(true);
  }
} else {
    function foo() {
      console.log(false);
    }
}
// This actually didn't work as described in the book
// foo() returns typeError: foo is not a function
```