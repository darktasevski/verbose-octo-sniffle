QUnit.module('tests');

// A test case depend on your own projects
// test("that a is true", function () {
//   ok(myObj.a);
// });

// A test case that does not depend on your own projects
test("that a is true", function () {
  ok(1 == '1', 'something wrong');
});
