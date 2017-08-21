/**
 * Exercism
 * JavaScript Track
 * Problem 9: Beer Song
 * 
 * Solution by Aos
 * 5/30/2017
 * Iteration 2: Using switch-case and attempting to remove as much duplication as possible
**/

const BeerSong = function() {
  this.two = "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n";

  this.one = "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n";

  this.zero = "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n";
}

BeerSong.prototype.verse = function(n) {
  // Use switch-case
  switch (n) {
    case 0: 
      return this.zero;
    case 1:
      return this.one;
    case 2:
      return this.two;
    default:
      return `${n} bottles of beer on the wall, ${n} bottles of beer.\nTake one down and pass it around, ${--n} bottles of beer on the wall.\n`
  }
}

BeerSong.prototype.sing = function(start, end = 0) {
  let n = start;
  let string = "";

  // Build song verses
  while (n > end) {
    if (n === 2) {
      string += this.two;
      n--;
    } else if (n === 1) {
      string += this.one;
      n--;
    } else {
      string += `${n} bottles of beer on the wall, ${n} bottles of beer.\nTake one down and pass it around, ${--n} bottles of beer on the wall.\n`;
    }
    string += "\n"
  }

  // Add last verse
  if (n === 0) {
    string += this.zero;
    return string;
  } else {
    string += `${n} bottles of beer on the wall, ${n} bottles of beer.\nTake one down and pass it around, ${--n} bottles of beer on the wall.\n`;
    return string;
  }
}

module.exports = BeerSong;