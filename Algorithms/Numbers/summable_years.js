// Write a function that takes a year (a four digit integer) and returns an
// array with the 10 closest subsequent years that meet the following
// condition: the first two digits summed with the last two digits are equal to
// the middle two digits. E.g. 1978 => 19 + 78 = 97; 2307 => 23 + 07 = 30

const SUMMABLE_YEARS = year => {
  const RESULT = [];
  let subsequentYear = year + 1;
  while (RESULT.length !== 10) {
    if (YEAR_IS_SUMMABLE(subsequentYear)) {
      RESULT.push(subsequentYear);
    }
    subsequentYear += 1;
  }
  return RESULT;
};

const YEAR_IS_SUMMABLE = year => {
  return Math.floor(year / 100) + (year % 100) === Math.floor(year / 10) % 100;
};
