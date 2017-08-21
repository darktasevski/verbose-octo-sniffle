// Write a function that takes in a string and returns true if all parantheses
// therein are well-formed (i.e. each opening parenthesis is accompanied by a
// closed parenthesis) and false otherwise. Return null if the string contains
// no parantheses.

const IS_WELL_FORMED = string => {
  let closeCount = 0;
  let openCount = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      openCount += 1;
    } else if (string[i] === ')') {
      closeCount += 1;
    }
    if (closeCount > openCount) { return false; }
  }
  if (openCount + closeCount === 0) { return null; }
  return openCount === closeCount ? true : false;
};

IS_WELL_FORMED(''); // => null
IS_WELL_FORMED('()'); // => true
IS_WELL_FORMED(')('); // => false
IS_WELL_FORMED('()('); // => false
IS_WELL_FORMED('(((((((())))))))'); // => true
IS_WELL_FORMED('()()()()()()()())'); // => false
IS_WELL_FORMED('This is a test string!'); // => null
IS_WELL_FORMED('(This (input) is a test string!)'); // => true
IS_WELL_FORMED('(This is a test string!))'); // => false
IS_WELL_FORMED('(This ))is a test string!)'); // => false
