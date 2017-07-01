function divideBy2(decNumber) {
  var remStack = new Stack();
  var rem;
  var binaryString = '';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

console.log(divideBy2(10));

// Notes:
// whele the division result is not 0, we get the remainder of the division and push it to the Stack
