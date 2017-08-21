//given 2 arrays, array, return a mutated array with the indices from the 2nd array

//O(N) time
// O(N) space

// const mutateArray = (array, index) => {
//   let end = array.length;
//   for (var i = 0; i < index.length; i++) {
//     array[end + index[i]] = array[i];
//   }
//   array.splice(0, end);
//   return array;
// }

// console.log(mutateArray(['a', 'b','c','d','e'], [2,0,1,4,3]));    //[b,c,a,e,d]

const mutate = (array, index) => {
  let i = 0 ;

  while (i < index.length) {
    if (index[i] === i) {
      i++
    } else {
      let swapIndex = index[i];
      swap(array, i, swapIndex);
      swap(index, i, swapIndex);
    }
  }

  return array;
}

const swap = (array, index1, index2) => {
  // let tempVal = array[index2];
  // array[index2] = array[index1];
  // array[index1] = tempVal;

  [array[index1], array[index2]] = [array[index2], array[index1]];
}

console.log(mutate(['a', 'b','c','d','e'], [2,0,1,4,3])); //[b,c,a,e,d]