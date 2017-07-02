//O(N^2) time
// const moveZeroes = (arr) => {
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] === 0) {
//       let temp = arr.splice(i, 1);
//       arr.push(temp[0]);
//     }
//   }
//   return arr;
// }

//O(N) time
const moveZeroes = (arr) => {
  let count = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[count] = arr[i];
      count++;
    }
  }

  for (; count < arr.length; count++) {
    arr[count] = 0;
  }
  return arr;
}

console.log(moveZeroes([1,0, 5, 0, 10]));   //[1,5,10,0,0]