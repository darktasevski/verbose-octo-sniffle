function isPalindrome(String) {
  function reverse() {
    return String.split('').reverse().join('');
  }

  return String === reverse();
}

console.log(isPalindrome("kayak"));