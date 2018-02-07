// The following is the/a correct regex to strip non-alphanumeric chars from an input string:
// input.replace(/\W/g, '')
// 
// Note that \W is the equivalent of [^0-9a-zA-Z_] - it includes the underscore character. To also remove underscores use e.g.:
// input.replace(/[^0-9a-z]/gi, '')
// 
// 

const isPalindrome = word => {
  const reverseString = word
    .toLowerCase()
    .replace(/\W/g, '')
    .split('')
    .reverse()
    .join('');
  console.log(reverseString);
  return word.toLowerCase().replace(/\W/g, '') === reverseString;
};

isPalindrome("Madam I'm Adam"); // true