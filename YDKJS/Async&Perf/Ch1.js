/**
 * Chapter 1: Asynchrony, Now and Later
*/
// Now
function now() {
  return 21;
}
function later() {
  // Later
  answer = answer * 2;
  console.log("Meaning of life:", answer);
}
var answer = now();
setTimeout(later, 1000); // Meaning of life: 42

// 2 chunks to this program: now and later

/**
 * Concurrency coordination
*/
var a = 1;
var b = 2;
function foo() {
  a++;
  b = b * a;
  a = b + 3;
}
function bar() {
  b--;
  a = 8 + b;
  b = a * 2;
}
// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);

// Function-ordering nondeterminism is known as a `race condition`. The outcome of:
a;
b;
// is determined by if either foo or bar run first

// Gating:
var a, b;
function foo(x) {
  a = x * 2;
  // Gate here making sure both a and b are defined in order for baz() to not throw an error
  if (a && b) {
    baz();
  }
}
function bar(y) {
  b = y * 2;
  // Gate here making sure both a and b are defined
  if (a && b) {
    baz();
  }
}
function baz() {
  console.log(a + b);
}
// ajax(..) arbitrary ajax function
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);


// Latch (allowing only first function to go through):
var a;
function foo(x) {
  // Latch here making sure that only the first time `a` is used (aka when it is undefined) will work
  if (a == undefined) {
    a = x * 2;
    baz();
  }
}
function bar(x) {
  // Latch
  if (a == undefined) {
    a = x / 2;
    baz();
  }
}
function baz() {
  console.log(a);
}
ajax("http://URL", foo);
ajax("http://URL", bar);

// Cooperation:
var res = [];

// `response(..)` receives array of results from Ajax call
function response(data) {
  // add onto existing `res` array
  res = res.concat(
    // make a new transformed array with all `data` values doubled
    data.map(function(va) {
      return val * 2;
    })
  )
}
ajax("http://URL", foo);
ajax("http://URL", bar);

// Chunking into asynchronous batches
var res = [];
function response(data) {
  // Do 1000 data at a time
  var chunk = data.splice(0 , 1000);

  // Add onto existing `res` array
  res = res.concat(
    // Make a new transformed array with all `chunk` values doubled
    chunk.map(function(val) {
      return val * 2;
    })
  );

  // Anything left to process?
  if (data.length > 0) {
    // Async schedule next batch
    setTimeout(function() {
      response(data);
    }, 0);
  }
}
ajax("http://URL", foo);
ajax("http://URL", bar);