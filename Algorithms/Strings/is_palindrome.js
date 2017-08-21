// Write a function that takes a string and returns true if it's a palindrome,
// and false otherwise.

const IS_PALINDROME = string => {
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
};
