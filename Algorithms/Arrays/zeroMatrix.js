const zeroMatrix = (matrix) => {
  const zero = [];
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        let tuple = [];
        tuple[0] = i;
        tuple[1] = j;
        zero.push(tuple);
      }
    }
  }

  const mutateZero = (matrix, position) => {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[0].length; j++) {
        if (position[0] === i || position[1] === j) {
          matrix[i][j] = 0;
        }
      }
    }
  }

  zero.forEach(tuple => {
    mutateZero(matrix, tuple)
  })

  return matrix;
}

console.log(zeroMatrix([[1,2,3],[4,5,0],[0,6,7]]));