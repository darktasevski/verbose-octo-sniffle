//
// This is only a SKELETON file for the "Leap" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

var Year = function(input) {
  this.year = input;
};

Year.prototype.isLeap = function() {
  let leap = false;
  // Evenly divisible by 4
  if (this.year % 4 == 0) {
    leap = !leap;
  }
  // Except every year that is evenly divisible by 100
  if (this.year % 100 == 0) {
    leap = false;
    // Unless the year is also evenly divisible by 400
    if (this.year % 400 == 0) {
      leap = !leap;
    }
  }
  return leap;
};

module.exports = Year;
