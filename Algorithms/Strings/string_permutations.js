// Write a function that takes in two strings and returns true if each string
// is a permutation of the other, and false otherwise.

const STRING_PERMUTATIONS = (string1, string2) => {
  if (string1.length !== string2.length) { return false; }
  const CHARS = {};
  for (let i = 0; i < string1.length; i++) {
    if (CHARS[string1[i]]) {
      CHARS[string1[i]] += 1;
    } else {
      CHARS[string1[i]] = 1;
    }
  }
  for (let i = 0; i < string2.length; i++) {
    if (CHARS[string2[i]]) {
      CHARS[string2[i]] -= 1;
    } else {
      return false;
    }
  }
  let charDifference = 0;
  for (let key in CHARS) {
    if (CHARS.hasOwnProperty(key)) {
      charDifference += CHARS[key];
    }
  }
  return charDifference === 0 ? true : false;
};
