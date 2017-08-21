// Write a function that takes in an array containing a range of consecutive
// integers beginning with 1 and an integer representing the maximum range, and
// returns the missing number from that range.

const MISSING_NUMBER = (rangeArray, maxRange) => {
  const RANGE_SUM = Math.floor((maxRange * (maxRange + 1)) / 2);
  let rangeArraySum = 0;
  for (let i = 0; i < rangeArray.length; i++) {
    rangeArraySum += rangeArray[i];
  }
  return RANGE_SUM - rangeArraySum;
};
