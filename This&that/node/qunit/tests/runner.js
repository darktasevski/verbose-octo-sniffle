var runner = require('qunit');

// Run qunit test case that depends on your code
// runner.run({
//   code: '../source/myscript.js',
//   tests: './tests.js'
// });

// Run qunit test case that does not depend on your code
runner.run({
  code: './empty.js',
  tests : './tests.js'
});
