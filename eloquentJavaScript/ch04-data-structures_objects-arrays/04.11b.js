// http://eloquentjavascript.net/04_data.html#p_V9yB5Z4xWA
// indexOf and lastIndexOf
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
console.log([1, 2, 3, 2, 1].indexOf(2));     // ---> 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2)); // ---> 3
// optional second parameter
console.log([1, 2, 3, 2, 1].indexOf(2, 2));     // ---> 3
console.log([1, 2, 3, 2, 1, 2, 2, 2, 3, 4, 5].lastIndexOf(2, 9)); // ---> 7

// http://eloquentjavascript.net/04_data.html#p_wxgx//Le/b
// slice
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
console.log([0, 1, 2, 3, 4].slice(2, 4)); // ---> [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));    // ---> [2, 3, 4]

// http://eloquentjavascript.net/04_data.html#p_1mS9LYSSFD
// concat
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2)); // → ["a", "b", "d", "e"]
// SAME AS: return array.slice(0, index).concat(array.slice(index + 1));
