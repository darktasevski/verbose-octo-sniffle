/**
 * Chapter 2.1: Choice and Truthiness
*/
// Ternay operator, `&&` and `||`


// Control flow operators => do not always return `true` or `false`

// Ternay operator:
true ? 'Hello' : 'Good bye' // Hello
0 ? 'Hello' : 'Good bye' // Good bye

// `&&` evaluates its left-hand expression
  // If left-hand expression is falsy, `&&` returns the value of its left-hand expression without evaluating right-hand
  // If left-hand is truthy, `&&` evalutes right-hand and returns the value of that

// `||` evaluates its left-hand expression
  // If left-hand is truthy, `||` returns the value of its left-hand expression, without evaluating right-hand
  // If left-hand is falsy, `||` evaluates right-hand expression and returns the value of that

1 || 2 // 1
1 && 2 // 2
null && undefined // null
undefined && null // undefined

// Tail recursive function that determines whether a positive integer is even:
const even = (n) =>
  n === 0 || (n !== 1 && even(n - 2))

even(42); // true
// If `n === 0`, JS does NOT evaluate `(n !== 1 && even(n-2))`. If it does, it would lead to a range error
// Also, if `n === 1`, `(even(n - 2))` is not evaluated

// Function parameters are eager
// In contrast to the ternary operator, `||` and `&&` (which do not always evaluate), function paramaters are always eagerly evaluated
const or = (a, b) => a || b
const and = (a, b) => a && b

const evenTwo = (n) =>
  or(n === 0, and(n !== 0, even(n - 2)))

evenTwo(42); // Maximum call stack size exceeded
