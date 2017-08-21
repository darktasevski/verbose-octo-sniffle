// Write a function that sums the digits of a positive integer and, if the
// result is greater than or equal to 10, sum the digits of the the resulting
// number as well. Continue this process until there is only one digit in the
// result (i.e. the "digital root").

const DIGITAL_ROOT = integer => {
  if (integer < 10) { return integer; }
  return DIGITAL_ROOT((integer % 10) + (Math.floor(integer / 10)));
};
