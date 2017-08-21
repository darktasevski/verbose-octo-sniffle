//using the arguments, converting arguments into array
//can also use Array.from()   ES6 ONLY
function sum() {
  var numbers = [];

  for (var i = 0; i < arguments.length; i++) {
    numbers.push(arguments[i]);
  }

  return numbers.reduce(function(a, b) {
    return a + b;
  }, 0);
}

console.log(sum(1,2,3,4));
console.log(sum(1,2,3,4,5));


//using the rest operator
function sum2(...numbers) {
  return numbers.reduce(function(a, b) {
    return a + b;
  }, 0);
}

console.log(sum2(1,2,3,4));
console.log(sum2(1,2,3,4,5));
