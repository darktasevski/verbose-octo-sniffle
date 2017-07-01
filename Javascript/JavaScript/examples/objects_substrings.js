/*
7. Write a JavaScript program which returns a subset of a string.
Sample Data : dog
Expected Output : ["d", "do", "dog", "o", "og", "g"]
*/

function subsetStrings(s) {
  let result = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = i+1; j < s.length + 1; j++) {
      result.push(s.slice(i,j));
    }
  }
  return result;
}


console.log(subsetStrings('dogs'));
