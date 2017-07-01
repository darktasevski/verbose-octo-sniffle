// Write a function that takes in a string and an integer representing the
// string's length, replaces all spaces with '%20', and returns the updated
// string and the new length inside an array (or null if the input string has
// no spaces).

const REPLACE_SPACES_WITH_PERCENT_20 = (string, stringLength) => {
  let updatedString = '';
  let updatedLength = stringLength;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') {
      updatedString += '%20';
      updatedLength += 2;
    } else {
      updatedString += string[i];
    }
  }
  if (updatedLength === stringLength) { return null; }
  return [updatedString, updatedLength];
};
