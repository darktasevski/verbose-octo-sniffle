// Write a function that takes in a sting of words and returns the longest
// prefix shared among all words in the string (return an empty string if not
// all words share the same prefix).

const LONGEST_SHARED_PREFIX = string => {
  const WORDS = string.split(' ');
  let longestSharedPrefix = '';
  let count = 0;
  for (let i = 0; i < WORDS[0].length; i++) {
    let currentLetter = WORDS[0][i];
    for (let j = 1; j < WORDS.length; j++) {
      if (WORDS[j][i] === currentLetter) {
        count += 1;
      }
    }
    if (count === WORDS.length - 1) {
      longestSharedPrefix += currentLetter;
      count = 0;
    }
  }
  return longestSharedPrefix;
};
