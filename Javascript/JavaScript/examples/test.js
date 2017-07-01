function curriedSum(numArgs) {
  var numbers = [];

  function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      return numbers.reduce(function(a, b) {
        return a + b;
      }, 0);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

var sum = curriedSum(3);
console.log(sum(5)(3)(2));
