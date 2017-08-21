// Write a function that takes in an array of integers and returns the first
// repeated element, or null if no elements are repeated.

const firstRepeatedElement = array => {
  let lowestIndex;
  let seenElements = {};
  for (let i = 0; i < array.length; i++) {
    if (typeof seenElements[array[i]] !== 'undefined') {
      if (typeof lowestIndex === 'undefined' ||
          seenElements[array[i]] < lowestIndex) {
        lowestIndex = seenElements[array[i]];
      }
    } else {
      seenElements[array[i]] = i;
    }
  }
  return typeof lowestIndex === 'undefined' ? null : array[lowestIndex];
};
