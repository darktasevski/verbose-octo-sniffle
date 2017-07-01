/**
 * Exercism
 * JavaScript Track
 * Problem 7: Gigasecond
 * 
 * Solution by Aos
 * 5/28/2017
*/

// Note: For the purposes of this problem, Date.parse() was used.
// However, in a real world setting, it is unreliable due to
// browser differences and inconsistencies. But since this problem 
// uses Date.UTC(...) for conversion, there should be no 
// inconsistencies in parsing.

const Gigasecond = function(date) {
  // Parse to milliseconds
  this.parsedSeconds = Date.parse(date);
  // Get one giga-milliseconds
  this.gs = Math.pow(10, 12);
}

Gigasecond.prototype.date = function() {
  // Tells a gigasecond anniversary
  let anni = new Date(this.parsedSeconds + this.gs);

  return anni;
}

module.exports = Gigasecond;