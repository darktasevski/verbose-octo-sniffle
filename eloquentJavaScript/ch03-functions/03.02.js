// http://eloquentjavascript.net/03_functions.html#h_u4j2OhpYkg

var x = "outside"; // <---- global variable

var f1 = function() {
  var x = "inside f1"; // <----- new local variable with same name as global variable
};
f1();
console.log(x); // --> outside

var f2 = function() {
  x = "inside f2"; // <--------- no "var" so assignment to global variable
};
f2();
console.log(x); // --> inside f2
