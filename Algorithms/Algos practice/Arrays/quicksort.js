//O(n logN ) time
//O(N) space

const quicksort = (arr) => {
  let left = [];
  let right = [];
  let pivot = arr[0];

  //base case
  if (arr.length === 0) {
    return arr;
  }

  //iterate thru array, compare value to pivot, push to either left or right array
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  } 
  //recurse thru left and right, then combine left, pivot, and right into 1 array
  return quicksort(left).concat(pivot, quicksort(right));
}


console.log(quicksort([10,1,4,2,6,8,1,3,7,5])); //1,1,2,3,4,5,6,7,10