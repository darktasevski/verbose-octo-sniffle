function myReduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++) {
    current = combine(current, array[i]);
  }
    return current;
}


var arr = [1,2,3,4,5,6];
console.log(myReduce(arr, function(a, b) {
  return a - b;
}, 0));
