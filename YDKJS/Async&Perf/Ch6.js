/**
 * Benchmarking and Tuning
*/

// Use Benchmark.js library

// Use jsPerf.com

// Don't sweat the microperformance

// Tail calls
function foo(x) {
  return x;
}
function bar(y) {
  return foo(y + 1); // This is a tail call
}
function baz() {
  return 1 + bar(49); // This is not a tail call
}

// ES6 brings tail call optimization, which allows a function call in the tail position of another function to execute without needing any extra resources