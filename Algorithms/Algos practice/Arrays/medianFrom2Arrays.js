// Find the median of 2 sorted arrays in O(n + m) time 


function medianOf2SortedArrays (arr1, arr2) {
  let result = [];
  
  //zip up the 2 arrays
  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      result.push(arr1.shift());
    } else {
      result.push(arr2.shift());
    }
  }
  
  while (arr1.length) {
    result.push(arr1.shift());  
  }
  
  while (arr2.length) {
    result.push(arr2.shift());
  }
  
  //find median from the new array
  let length = result.length;
  let middleIndex = Math.floor(length / 2);
  //even
  if (length % 2 === 0) {
    //median index is new array length, divided by 2
    return (result[middleIndex] + result[middleIndex - 1] ) / 2
  } else {
  //odd
    return result[middleIndex];
  }
}

let arr1 = [2, 5, 10, 13, 15];
let arr2 = [1, 3, 7, 11];

let arr3 = [2, 5, 10, 13];
let arr4 = [1, 3, 7, 11];

console.log(medianOf2SortedArrays(arr1, arr2)) //7
console.log(medianOf2SortedArrays(arr3, arr4)) //6


// ** BONUS ** HARD ** (hard version: O(log(n + m)) time)

