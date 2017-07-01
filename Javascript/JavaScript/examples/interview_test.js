function testArrayEquals(array1, array2) {
  for (var i = 0; i < array1.length(); i++) {
    if (array1[i] !== array2[i]) {
      return false;
    } else {
      return true;
    }
  }
}


var first = [1,2,3,4,5];
var second = [1,2,3,4,5];
