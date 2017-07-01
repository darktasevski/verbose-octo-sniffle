/**
 * Chapter 8: Beyond ES6
*/

// `async function` expresses same flow control logic as run(..)` utility, `yield` replaced `await`:
async function main() {
  var ret = await step1();
  try {
    ret = await step2(ret);
  }
  catch (err) {
    ret = await step2Failed(err);
  }

  ret = await Promise.all([
            step3a(ret),
            step3b(ret),
            step3c(ret)]);

  await step4(ret);
}
main()
.then(
  function fulfilled() {
    // `main()` completed successfully
  },
  function rejected(reason) {
    // Oops, something went wrong
  }
);

// `Object.observe(..)` sets up listener to observe an object's changes and fires a callback:
var obj = {a: 1, b: 2};
Object.observe(
  obj,
  function(changes) {
    for (var change of changes) {
      console.log(change);
    }
  },
  ["add", "update", "delete"]
);

obj.c = 3;
// {name: "c", object: obj, type: "add"}
obj.a = 42;
// {name: "a", object: obj, type: "update", oldValue: 1}
