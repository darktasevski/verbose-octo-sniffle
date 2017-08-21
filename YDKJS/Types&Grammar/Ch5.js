/**
 * Chapter 5:  Grammar
 */

// Increment and decrement operators:
var a = 42;
var b = a++;
a; // 43
b; // 42 <== this occurs because the a value is returned first, and then the increment side-effect occurs. Now prefixing the increment operator:
var b = ++a;
b; // 43

// Another option is to use the statement series (..) with a comma operator:
var a = 42, b;
b = (a++, a);
a; // 43
b; // 43

// Chained assignments occur right-to-left:
var a, b, c;
a = b = c = 42;

function vowels(str) {
  var matches;
  if (str) {
    // pull out all the vowels
    matches = str.matches(/[aeiou]/g);
    if (matches) {
      return matches;
    }
  }
}
vowels("Hello world!"); // ["e", "o", "o"]

// Combining two if statements into one using idoms:
function vowels(str) {
  var matches;
  //pull out all the vowels
  if (str && (matches = str.match(/[aeiou]/g))) {
    return matches;
  }
}
vowels("Hello world!"); // ["e", "o", "o"]

// Special 'goto's in continue and break statements:
{
  foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      // Whenever loops meet, continue outer loop
      if (j == i) {
        // Jump to next iteration of the 'foo' labeled loop
        continue foo;
      }
      // Skip odd multiples
      if ((j * i) % 2 == 1) {
        // Normal (non-labeled) continue of inner loop
        continue;
      }
      console.log(i, j);
    }
  }
}
// 1 0
// 2 0
// 2 1
// 3 0
// 3 2

// Using break:
{
  foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if ((i * j) >= 3) {
        console.log("stopping!", i, j);
        // break out of the labeled 'foo' loop
        break foo;
      }
      console.log(i, j);
    }
  }
}
// 0 0
// 0 1
// 0 2
// 0 3
// 1 0
// 1 1
// 1 2
// stopping! 1 3

// JSON-P makes JSON into valid JS grammar by wrapping the JSON data in a function call
foo({"a":42});

// Object destructuring (in ES6)
function getData() {
  return {
    a: 42,
    b: "foo"
  };
}
var {a, b} = getData();
console.log(a, b); // 42 "foo"

// Roughly equivalent to:
var res = getData();
var a = res.a;
var b = res.b;

// {a, b} is shorthand for: {a: a, b: b}, example:
function foo({a, b, c}) {
  // No need for:
  // var a = obj.a, b = obj.b, c = obj.c
  console.log(a, b,c );
}
foo({
  c: [1, 2, 3],
  a: 42,
  b: "foo"
}); // 42 "foo" [1, 2, 3]

// Operator precedence
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
// Associativity = grouping

// Automatic semicolon insertion
// This occurs only if there's noething but whitespace and/or comments between the end of some statement and that line's newline/line break

// Default parameter values (ES6)
function foo(a = 42, b = a + 5) {
  console.log(a, b);
};
foo() // 42 47

// The default is applied to the parameter if you either omit an argument or pass an undefined value in its place

// It is not possible to reference the same paramater in its default assignment value
function foo(a = 42, b = a + b + 5) {
  // ...
}
// Error: b is not defined

// Using try... finally:
// `finally` always runs regardless of a return statement:
function foo() {
  try {
    return 42;
  }
  finally {
    console.log("Hello");
  }
  console.log("Never runs");
}
console.log(foo()); // Hello 42

// If an exception is thrown in the finally clause, it will override as the primary completion of that function. This will also work if the finally clause has a return statement
function foo() {
  try {
    return 42;
  }
  finally {
    throw "Ooops!";
  }
  console.log("Never runs");
}
console.log(foo()); // Uncaught Exception: Ooops!