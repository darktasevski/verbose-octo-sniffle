/**
 * Exercism
 * JavaScript Track
 * Problem 8: Isogram
 * 
 * Solution by Aos
 * Iteration 2: Directly adding iterable to Set constructor
 * and using the `size` property (equivalent to length)
 * 5/30/2017
*/

const Isogram = function(word) {
  // Sanitize input and create array
  this.word = word.toLowerCase().replace(/[^a-zA-Z\u00C0-\u00ff]/g, "").split("");
}

Isogram.prototype.isIsogram = function() {
  // Make a set (which houses unique values only)
  let stringSet = new Set(this.word);
  return this.word.length === stringSet.size
}

module.exports = Isogram;