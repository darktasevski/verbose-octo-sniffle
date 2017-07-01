// Write a function that takes in two strings and returns true if the strings
// represent a rotation of each other and false otherwise.

const IS_ROTATION = (string1, string2) => {
  if (string1.length !== string2.length) { return false; }
  let string2Index = 0;
  let matchCount = 0;
  for (let i = 0; i < string1.length * 2; i++) {
    if (string1[i % string1.length] === string2[string2Index]) {
      matchCount += 1;
      string2Index += 1;
    } else {
      if (matchCount >= 1) { i -= 1; }
      matchCount = 0;
      string2Index = 0;
    }
    if (matchCount === string2.length) { return true; }
  }
  return false;
};
