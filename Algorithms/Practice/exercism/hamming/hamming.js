/**
 * Exercism
 * JavaScript Track
 * Problem 3: Calculate the Hamming distance between 2 DNA strands
 * 
 * Solution by Aos
 * 5/26/2017
*/

const Hamming = function() {}

Hamming.prototype.compute = function(strandOne, strandTwo) {
  let one = strandOne;
  let two = strandTwo;
  let counter = 0;

  // Error if strands are not equal length
  if (one.length !== two.length) {
    throw new Error('DNA strands must be of equal length.');
  }

  // Iterate through both strings simultaneously
  for (let i = 0; i < one.length; i++) {
    // Compare character of each string
    if (one[i] !== two[i]) {
      // If not equal, add to counter
      counter++;
    }
  }

  return counter;
}

module.exports = Hamming;