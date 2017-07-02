// http://eloquentjavascript.net/04_data.html#h_8ZspxiCEC/

function range(start, end) {
  rangeArray = new Array;
  for (var i = start; i <= end; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
}

console.log(range(1, 10)); // ---> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

function arraySum(anArray) {
  arraySum = 0;
  for (var i = 0; i <= anArray.length; i++) {
    arraySum +=i;
  }
  return arraySum;
}

// console.log(arraySum(range(1, 10))); // ---> 55
// console.log(arraySum(range(1, 10))); // ---> 55

function stepRange(start, end, step) {
  // handling the case when a third argument is not given
  // if (step === undefined) // equivalent to arguments.length
  //   step = 1;
  if (arguments.length < 3)
    step = 1;
  // handling the case when a third argument is not given
  // and the start of the range is greater than the end
  // of the range, e.g. stepRange(10, 2)
  if ((arguments.length < 3) && (start > end))
    step = -1;

  stepRangeArray = new Array;

  // handling the negative steps, e.g. stepRange(10, 0, -2)
  // results in [ 10, 8, 6, 4, 2, 0 ]
  if (step < 0) {
    for (var i = start; i >= end; i += step) {
      stepRangeArray.push(i);
    } return stepRangeArray;
  // handles the case of positive steps
  } else if (step > 0) {
    for (var i = start; i <= end; i += step) {
      stepRangeArray.push(i);
    } return stepRangeArray;
  // handles the case where step is zero
  // to prevent an infinite loop
  } else return start;
}

console.log(stepRange(1, 10));      // ---> [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(stepRange(5, 2, -1));   // ---> [ 5, 4, 3, 2 ]
console.log(stepRange(5, 2));       // ---> [ 5, 4, 3, 2 ]
console.log(stepRange(1, 10, 2));   // ---> [ 1, 3, 5, 7, 9 ]
console.log(stepRange(10, 0, -2));  // ---> [ 10, 8, 6, 4, 2, 0 ]
console.log(stepRange(99, 3, 0));   // ---> 99
// console.log(arraySum(stepRange(1, 10))); // ---> 55
