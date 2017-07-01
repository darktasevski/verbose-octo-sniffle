// Write a function that takes in a string and outputs a compressesed string by
// way of replacing all consecutively repeated characters with an integer
// representing the count of repeated characters. If the length of the
// compressed string is greater than or equal to input string, return the input
// string, and if the input string is empty, return null.

const COMPRESS_STRING = string => {
  if (string === '') { return null; }
  let compressedString = '';
  let charCount = 1;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i + 1]) {
      charCount += 1;
    } else {
      compressedString += string[i] + charCount;
      charCount = 1;
    }
  }
  if (compressedString.length >= string.length) { return string; }
  return compressedString;
};
