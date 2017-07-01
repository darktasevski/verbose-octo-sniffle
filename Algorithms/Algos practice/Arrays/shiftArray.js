	//param A : array of integers
	//param B : integer
	//return a array of integers
function rotateArray(A, B){
  for (var i = 0; i < B; i++) {
    let temp = A.shift();
    A.push(temp);
  }
  return A;
}

console.log(rotateArray([1,2,3,4,], 1));