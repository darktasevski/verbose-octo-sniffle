(function(){
  'use strict';

  var array = ['one', 'two', 'three'];

  console.log(array.length);

  array.push('four');

  console.log(array.length);

  array.unshift('zero');
  console.log(array.length);

  console.log(array.pop());

  console.log(array.shift());

  array.splice(0, 1, 'a', 'b', 'c');

  console.log(array);

console.log(array.reverse());

console.log(array.sort());

console.log([3,20,10000,5,2,3].sort(function (a,b) {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else {
    return 1;
  }

}));

console.log(array.join(' '));

console.log(array.indexOf('four'));

console.log(array.slice(1,3));

array.forEach(function (value, index) {
  console.log('Item at index: ' + index + ' has the value of ' + value );

console.log(array.every(function (value) {
  return typeof value === 'string';
}));


console.log(['1', 4, 'a', 2, '3'].filter(function(value) {
  return typeof value !== 'number';
}));

console.log(array.map(function (value) {
  return value.toUpperCase();
}));

console.log([1,2,3,4].reduce(function (total, value) {
  return total += value;
}, 5));




})











}());
