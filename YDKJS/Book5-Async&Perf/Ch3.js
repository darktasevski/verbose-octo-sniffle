/**
 * Chapter 3: Promises
 * 
 * The Promise constructor:
 * var p = new Promise(function(X, Y) {
 *      X() for fulfillment
 *      Y() for rejection
 * })
*/

function add(getX, getY, cb) {
  var x, y;
  getX(function(xVal) {
    x = xVal;
    // both are ready?
    if (y != undefined) {
      cb(x + y); // Send along sum
    }
  });
  getY(function(xVal) {
    y = yVal;
    // both are ready?
    if (x != undefined) {
      cb(x + y); // Send along sum
    }
  });
}

// `fetchX()` and `fetchY()` are sync or async functions
add(fetchX, fetchY, function(sum) {
  console.log(sum);
})

// Promise value
function add(xPromise, yPromise) {
  // `Promise.all([..])` takes an array of promises, and returns a new promise that waits on them all to finish
  return Promise.all([xPromise, yPromise])
  
  // when that promise is resolved, let's take the received `X` and `Y` values and add them together
  .then(function(values) {
    // `values` is an array of the messages from the previously resolved promises
    return values[0] + values[1];
  }); 
}

// `fetchX()` and `fetchY()` return promises for their respective values, which may be ready *now* or *later*
add(fetchX(), fetchY())

// We get a promise back for the sum of those two numbers.
// Now we chain-call `then(..)` to wait for the resolution of that returned promise.
.then(function(sum) {
  console.log(sum);
})

// Promise rejection
add(fetchX(), fetchY())
.then (
  // fulfillment handler
  function(sum) {
    console.log(sum);
  },
  // rejection handler
  function(err) {
    console.error(err); // Error!
  }
)

function foo(x) {
  // Start doing something that could take a while

  return new Promise(function(resolve, reject) {
    // Eventually, call `resolve(..)` or `reject(..)`, which are the resolution callbacks for the promise
  });
}
var p = foo(42);
bar(p);
baz(p);
function bar(fooPromise) {
  // Listen for `foo(..)` to complete
  fooPromise.then(
    function() {
      // `foo(..)` has now finished so do `bar(..)`'s task
    },
    function() {
      // Oops, something went wrong in `foo(..)`
    }
  );
}

// Different type of Promise handling:
function bar() {
  // `foo(..)` has definitely finished, so do `bar(..)`'s task
}
function oopsBar() {
  // Oops, something went wrong in `foo(..)`, so `bar(..)` didn't run
}
var p = foo(42);
// Ditto for `baz()` and `oopsBaz()`

// bar(..) only gets called if `foo(..)` succeeds, otherwise `oopsBar(..)` gets called
p.then(bar, oopsBar);
p.then(baz, oopsBaz);

// Promises, once resolved, retain their same resolution forever (fulfillment or rejection) as they are immutable and can subsequently be observed as many times as necessary

// Handling non-resolution of a Promise (using .race):

// Utility for timing out a Promise:
function timeoutPromise(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject("Timeout!");
    }, delay);
  });
}
// Setup a timeout for `foo()`
Promise.race([
  foo(), // Attempt `foo()`
  timeoutPromise(3000) // Give it 3 seconds
])
.then(
  function() {
  // `foo(..)` fulfilled in time! (on fulfillment)
  },
  function(err) {
    // Either `foo()` rejected, or it just didn't finish in time, so inspect `err` to know which
  }
);

// Error catching:
var p = new Promise(function(resolve, reject) {
  foo.bar(); // `foo` is not defined, so error!
  resolve(42); // Never gets here
});
// .then(..) also returns a Promise that can be caught with another .then(..)
p.then(
  function fulfilled() {
    // Never gets here!
  },
  function rejected(err) {
    // `err` will be a `TypeError` exception object from the `foo.bar()` line
  }
)

// Promise.resolve(), these two promises `p1` and `p2` will behave basically identically:
var p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
var p2 = Promise.resolve(42);

// If you pass a genuine Promise to Promise.resolve(..), you get the same Promise back:
var p1 = Promise.resolve(42);
var p2 = Promise.resolve(p1);
p1 === p2; // true

// If calling an untrustable utility, `foo(..)` but we know it's atleast a thenable. Promise.resolve(..) will give us a trustable Promise wrapper to chain off of:
foo(42)
.then(function(v) {
  console.log(v);
});
// Do this instead:
Promise.resolve(foo(42))
.then(function(v) {
  console.log(v);
});

// Two intrinsic behaviors of Promises:
// 1. Every time `.then(..)` is called on a Promise, it creates and returns a new Promise, which can be chained
// 2. Whatever value returned from the `.then(..)` call's fulfillment callback (the first param) is automatically set as the fulfillment of the chained Promise (from the first point)
var p = Promise.resolve(21);
var p2 = p.then(function(v) {
  console.log(v); // 21

  // Fulfill `p2` with value `42`
  return v * 2;
});

// Chain off `p2`
p2.then(function(v) {
  console.log(v); // 42
});

// They can also be chained together:
var p = Promise.resolve(21);
p.then(function(v) {
  console.log(v); // 21

  // Fulfill the chained promise with value `42`
  return v * 2;
})
// Chained promise
.then(function(v) {
  console.log(v); // 42
})

// Introducing asynchrony:
var p = Promise.resolve(21);
p.then(function(v) {
  console.log(v); // 21

  // Create a promise and return it
  return new Promise(function(resolve, reject) {
    // Introduce asynchrony
    setTimeout(function() {
      // Fulfill with value `42`
      resolve(v * 2);
    }, 100);
  });
})
.then(function(v) {
  // Runs after the 100ms delay in the previous step
  console.log(v); // 42
});

// Promises with ajax(..)
// Defining request:
function request(url) {
  return new Promise(function(resolve, reject) {
    // The `ajax(..)` callback should be the promise's `resolve(..)` function
    ajax(url, resolve);
  });
}
request("http://someurl.1")
.then(function(response1) {
  return request("http://someurl.2/?v=" + response1);
})
.then(function(response2) {
  console.log(response2);
});

// Error handling:
// Step 1
request("http://someurl.1/")
// Step 2
.then(function(response1) {
  foo.bar(); // undefined error!

  // Never gets here
  return request("http://someurl.2/?v=" + response1);
})
// Step 3
.then(
  function fulfilled(response2) {
    // Never gets here due to error in previous then(..)
  },
  function rejected(err) {
    console.log(err); // `TypeError` from `foo.bar()` error
    return 42;
  }
)
// Step 4
.then(function(msg) {
  console.log(msg); // 42
});

// Assumed rejection handler:
var p = new Promise(function(resolve, reject) {
  reject("Oops");
});
var p2 = p.then(
  function fulfilled() {
    // Never gets here, due to rejection
  }
  // Assumed rejection handler, if omitted or any other non-function value passed:
  // function(err) {
  //  throw err;
  // }
);
// There is also default handler substitution for fulfillment if not passed

// Resolve, reject, fulfill
var rejectedPr = new Promise(function(resolve, reject) {
  // Resolve this promise with a rejected promise
  resolve(Promise.reject("Oops"));
});
rejectedPr.then(
  function fulfilled() {
    // Never gets here
  },
  function rejected(err) {
    console.log(err); // "Oops"
  }
);

/**
 * Promise Patterns
*/

// Promise.all([..]) 
// Gate which waits on two or more parallel/concurrent promises to complete before continuing
var p1 = request("http://some.url.1/");
var p2 = request("http://some.url.2/");

// Expects a single array of Promise instances
// All promises must be fulfilled, if any are rejected, the Promise.all([..]) promise is immediately rejected
Promise.all([p1, p2])
// Returns an array of all the fulfillment messages from the passed in promises
.then(function(msgs) {
  // Both `p1` and `p2` pass in their messages here
  return request("http://some.url.3/?v=" + msgs.join(","));
})
.then(function(msg) {
  console.log(msg);
});

// Promise.race([..])
// Responds to the first Promise that to cross the finish line, classically called a latch
// Expects a single array argument
var p1 = request("http://some.url.1/");
var p2 = request("http://some.url.2/");

Promise.race([p1, p2])
.then(function(msg) {
  // Either `p1` or `p2` will win the race
  return request("http://some.url.3/?v=" + msg);
})
.then(function(msg) {
  console.log(msg);
})

// Each Promise instance has `then(..)` and `catch(..)` methods which allow registering of fulfillment and rejection handlers
// `then(..)` takes one or two params, first: fulfillment, second: rejection. If either is omitted or passed non-function value, a default callback is substituted. Default fulfill: passes the message along, default reject: rethrows the error
// `catch(..)` takes only rejection callback as paramater, automatically substitutes the default fulfillment callback. Equivalent to `then(null, ..)`
// Each one also create and return a new promise

// Promise.all([..]) and Promise.race([..])
var p1 = Promise.resolve(42);
var p2 = Promise.resolve("Hello World");
var p3 = Promise.reject("Oops");

Promise.race([p1, p2, p3])
.then(function(msg) {
  console.log(msg); // 42
});

Promise.all([p1, p2, p3])
.catch(function(err) {
  console.log(err); // "Oops"
});

Promise.all([p1, p2])
.then(function(msgs) {
  console.log(msgs); // [42, "Hello World"]
});

/**
 * Promise Limitations
*/

// Assume `foo(..)`, `STEP2(..)`, `STEP3(..)` are all promise-aware utilities
var p = foo(42) // `p` points to the last promise coming the `then(STEP3)` call
.then(STEP2)
.then(STEP3);
// It is possible to register a rejection error handler on p and it would be notified if any errors occur anywhere in the chain:
p.catch(handleErrors);

// Splitting values:
function getY(x) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve((3 * x) - 1);
    }, 100);
  });
}
function foo(bar, baz) {
  var x = bar * baz;
  return getY(x)
  .then(function(y) {
    // Wrap both values into container
    return [x, y];
  });
}
foo(10, 20)
.then(function(msgs) {
  var x = msgs[0];
  var y = msgs[1];
  console.log(x, y); // 200 599
});

// Rearranging foo()
function foo(bar, baz) {
  var x = bar * baz;
  // Return both promises
  return [
    Promise.resolve(x),
    getY(x)
  ];
}
Promise.all(foo(10,20))
.then(function(msgs) {
  var x = msgs[0];
  var y = msgs[1];
  console.log(x, y);
});

// Using array destructuring
Promise.all(foo(10, 20))
.then(function(msgs) {
  var [x, y] = msgs;
  console.log(x, y); // 200 599
});
// ES6 array paramater
Promise.all(foo(10, 20))
.then(function([x, y]) {
  console.log(x, y); // 200 599
})