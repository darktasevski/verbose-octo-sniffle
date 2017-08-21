// Write a function that takes in an array of integers and moves all of the
// zeros to the end of the array, with no concern regarding the order of
// non-zero elements. E.g.:
// [1, 2, 0, 3, 4, 0, 5, 6, 0]) => [1, 2, 6, 3, 4, 5, 0, 0, 0]
// The function should run in linear time/O(n) and use constant/O(1) space.

const MOVE_ZEROS = array => {
  let beginning = 0;
  let end = array.length - 1;
  while (true) {
    while (array[beginning] !== 0 && beginning !== end) {
      beginning += 1;
    }
    while (array[end] === 0 && beginning !== end) {
      end -= 1;
    }
    if (beginning === end) { break; }
    let tempSwapValue = array[end];
    array[end] = array[beginning];
    array[beginning] = tempSwapValue;
  }
  return array;
};
