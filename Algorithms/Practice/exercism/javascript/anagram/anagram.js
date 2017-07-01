/**
 * Exercism
 * JavaScript Track
 * Problem 11: Anagram
 * 
 * Solution by Aos
 * 6/04/2017
**/

// Helper function -- tallies letters and returns an object
function tallyLetters(word) {
  let letterTally = {};
  word = word.split('');
  word.forEach((letter) => {
    letterTally.hasOwnProperty(letter) ? letterTally[letter]++ : letterTally[letter] = 1
  })
  return letterTally;
}

const Anagram = function(test) {
  this.test = test.toLowerCase();
  this.testTallied = tallyLetters(this.test);
}

Anagram.prototype.matches = function(array) {

  let result = [];
  let newArray = [];

  // Convert to array using spread operator
  if (!Array.isArray(array)) {
    newArray = [...arguments];
  }
  else {
    newArray = array;
  }

  // Need to use arrow fns to allow lexical `this` binding
  newArray.forEach((word) => {
    let lowercaseWord = word.toLowerCase();

    // Tallies letter count in each word
    let tallied = tallyLetters(lowercaseWord);

    // Check for identical words
    if (lowercaseWord === this.test) {
      return;
    }

    // First pass, remove words not of the same length
    if (lowercaseWord.length !== this.test.length) {
      return;
    }
    
    // Second pass, check for correct amount of letters in each word
    for (const letter in tallied) {
      if (this.testTallied[letter] !== tallied[letter]) {
        return;
      }
    }
    result.push(word);
  })
  return result;
}

module.exports = Anagram;