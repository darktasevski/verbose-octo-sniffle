/**
 * Async Flow Control
*/

/**
 * Promises
*/
// Constructing
var p = new Promise(function pr(resolve, reject) {
  // ...
});

// Refactoring a callback-reliant function
function ajax(url, cb) {
  // Make request, eventually call `cb(..)`
}
// ..
ajax("http://some.url.1", function handler(err, contents) {
  if (err) {
    // Handle ajax error
  }
  else {
    // handle `contents` success
  }
});

// Converted to a promise
function ajax(url) {
  return new Promise(function pr(resolve, reject) {
    // Make request, eventually call either `resolve(..)` or `reject(..)`
  });
};

ajax("http://some.url.1")
.then(
  function fulfilled(contents) {
    // handle `contents` success
  },
  function rejected(reason) {
    // Handle ajax error reason
  }
)

// Promise API
var p1 = Promise.resolve(42); // Promise resolved to the value passed in
var p2 = new Promise(function pr(resolve) {
  resolve(42);
});

// `Promise.resolve(..)` normalizes values. If it's already a Promise, its state or resolution will simply be adopted. If it's instead an immediate value, it's wrapped in a genuine promise

// `Promise.all([...])` returns a promise back that will be fulfilled if all the values fulfill, or reject immediately once the first of any of them rejects
Promise.all([p1, p2])
.then(function fulfilled(vals) {
  console.log(vals); // [42, 42]
});

// `Promise.race([..])` waits only for either the first fulfillment or rejection

// Promises + Generators:
function *main() {
  try {
    var ret = yield step1();
  }
  catch (err) {
    ret = yield step1Failed(err);
  }
  retr = yield step2(ret);
  // Step 3
  ret = yield Promise.all([
    step3a(ret),
    step3b(ret),
    step3c(ret)
  ]);
  yield step4(ret);
}