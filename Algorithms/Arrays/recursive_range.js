// Write a function that takes in two integers (the first representing the
// beginning, and the second representing the ending, of a consecutive range)
// and returns an array of the non-inclusive range between said numbers. Use
// recursion.

const recursiveRange = (start, end) => {
  if (start > end) { return []; }
  if (start + 2 === end) { return [start + 1]; }
  return [start + 1].concat(recursiveRange(start + 1, end));
};

recursiveRange(1,10); // => [2,3,4,5,6,7,8,9]
