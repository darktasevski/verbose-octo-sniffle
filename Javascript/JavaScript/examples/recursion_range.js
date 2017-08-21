
//recursively getting range of 2 numbers
function range(start, end) {
  if (end < start) {
    return [];
  }

  if (end === start) {
    return [];
  }

  let r = range(start, end - 1);
  r.push(end - 1);
  return r;
}

// console.log(range(3,8));


//iteratively getting range of 2 numbers
function range2(start, end) {
  let r = [];
  for (let i = start; i < end; i ++) {
    r.push(i);
  }
  return r;
}
// console.log(range2(3,8));

//recursively summing array
function recSum(arr) {
  if (arr.length === 0){
    return 0;
  }

  let lastNum = arr[arr.length - 1];
  return recSum(arr.slice(0, arr.length - 1)) +lastNum;
}

// console.log(recSum([1,2,3,4,5]));


//iteratively summing array
