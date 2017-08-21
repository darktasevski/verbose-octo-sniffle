/* global Set */

// Write a function that takes in a string and returns true if all characters
// therein are unique and false otherwise.

const ALL_UNIQUE_CHARACTERS = string => {
  const SEEN_CHARS = new Set();
  for (let i = 0; i < string.length; i++) {
    if (SEEN_CHARS.has(string[i])) { return false; }
    SEEN_CHARS.add(string[i]);
  }
  return true;
};

ALL_UNIQUE_CHARACTERS("abcdefghijklmnopqrstuvwxyzABC123!%$#"); // => true
ALL_UNIQUE_CHARACTERS("abcdefghijklmnopqrstuvwxyzABC123!%$#a"); // => false
ALL_UNIQUE_CHARACTERS("Test string!"); // => false
ALL_UNIQUE_CHARACTERS("Test word!"); // => true
