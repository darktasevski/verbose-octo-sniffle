/**
 * Exercism
 * JavaScript Track
 * Problem 5: Pangram
 * 
 * Solution by Aos
 * 5/26/2017
**/

const Pangram = function(string) {
  this.string = string.toLowerCase();
}

Pangram.prototype.isPangram = function() {

  let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 
                    'g', 'h', 'i', 'j', 'k', 'l', 
                    'm', 'n', 'o', 'p', 'q', 'r',
                    's', 't', 'u', 'v', 'w', 'x',
                    'y', 'z'];

  // Loop through alphabet
  for (let i = 0; i < alphabet.length; i++) {
    // Loop through string
    for (let j = 0; j < this.string.length; j++) {
      // Search string for alphabet character
      if (this.string.indexOf(alphabet[i]) > -1) {
        // If found in string, remove alphabet character from array
        alphabet.splice(i, 1);
      }
    }
  }

  return !alphabet.length;
}

module.exports = Pangram;