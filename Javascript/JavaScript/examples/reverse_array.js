var letters = ["a", "b", "c", "d"];

function reverseArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i+= 1) {
      result.unshift(arr[i]);
    }   
    return result;
}


function reverseArrayInPlace(arr) {
  for (var i = 0; i < Math.floor(arr.length/2); i+=1) {
      var temp = arr[i];
      arr[i] = arr[arr.length - 1 - i];
      arr[arr.length -1-i] = temp;

  }
  return arr;
}



console.log(reverseArray(letters));
console.log(letters);
console.log(reverseArrayInPlace(letters));