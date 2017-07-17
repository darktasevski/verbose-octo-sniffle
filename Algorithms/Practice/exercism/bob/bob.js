/**
 * Exercism
 * JavaScript Track
 * Problem 6: Bob
 * 
 * Solution by Aos
 * 5/27/2017
**/

const Bob = function() {}

Bob.prototype.hey = function(string) {
  
  if (/^\s*$/g.test(string)) { // Matches empty string or whitespace
    return "Fine. Be that way!";
  }
  else if (/^[\d\,\s]*$/g.test(string)) { // Match only numbers, commas, and spaces
    return "Whatever."
  }
  else if (/[^A-Z]+\?$/g.test(string)) { // Matches `?` at end of string ($), and does not match any CAPS words
    return "Sure.";
  }
  else if (/[\xfc|\xdc|\xe4|\xc4].+[^\!]$/g.test(string)) { // Matches umlauts, without exclamation at the end
    return "Whatever."
  }
  else if (/^[^a-z]+$/g.test(string)) { // RegExp matches only CAPS full lines
    return "Whoa, chill out!";
  }
  else if (/\!.+\?/g.test(string)) { // Matches exclamation and question mark
    return "Sure.";
  }
  else {
    return "Whatever.";
  }
}

module.exports = Bob;