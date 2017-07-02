// http://eloquentjavascript.net/04_data.html#h_6xTmjj4Rf5

// version 1
// function reverseArray(anArray) {
//   output = new Array;
//   for (var i = anArray.length - 1; i >= 0; i--) {
//     output.push(anArray[i])
//   }
//   return output;
// }

// version 2
function reverseArray(anArray) {
  output = new Array;
  for (var i = 0; i < anArray.length; i++) {
    output.unshift(anArray[i]);
  }
  return output;
}

console.log(reverseArray(["A", "B", "C"])); // ---> ["C", "B", "A"];

function reverseArrayInPlace(anArray) {
  for (var i = 0; i < Math.floor(anArray.length / 2); i++) {
    var old = anArray[i];
    anArray[i] = anArray[anArray.length - 1 - i];
    anArray[anArray.length - 1 - i] = old;
  }
  return anArray;
}

var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue); // ---> [5, 4, 3, 2, 1]
