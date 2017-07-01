(function() {
  "use strict";

  function isPalindrome(str) { // any number or string
    str = String(str);
    // str = str.replace(/\W/g, '').toLowerCase();
    return str === str.split('').reverse().join('');
  }

  isPalindrome("aba") // true
  isPalindrome("abba") // true
  isPalindrome("racecar") // true
  isPalindrome("bit") // false

  function isPalindromeWithForLoop(phrase) {
    var newPhrase = "";
    var length = phrase.length;

    for(var i = 0; i < length; i++) {
      newPhrase += phrase[length - 1 - i];
    }

    return phrase === newPhrase;
  }

  isPalindromeWithForLoop("aba") // true
  isPalindromeWithForLoop("abba") // true
  isPalindromeWithForLoop("racecar") // true
  isPalindromeWithForLoop("bit") // false

  function isPalindromeWithTailRecursionAndClosure(phrase) {
    var LENGTH = phrase.length;
    var newPhrase = "";
    var i = 0;

    function append(letter) {
      newPhrase += letter;
      i++;

      if (LENGTH - i === 0) {
        return phrase === newPhrase;
      }

      return append(phrase[LENGTH - 1 - i])
    }

    return append(phrase[i]);
  }

  isPalindromeWithTailRecursionAndClosure("aba"); // true
  isPalindromeWithTailRecursionAndClosure("abba") // true
  isPalindromeWithTailRecursionAndClosure("racecar") // true
  isPalindromeWithTailRecursionAndClosure("bit") // false
}());
