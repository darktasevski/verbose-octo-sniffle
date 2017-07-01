var isAnagram = (function() {
  "use strict";

  function publicApi (phrase1, phrase2) {
    var value;

    phrase1 = String(phrase1);
    phrase2 = String(phrase2);
    if (phrase1.length !== phrase2.length) {
      return false;
    }

    for(var i = 0; i < phrase1.length; i++) {
      value = phrase1[i];

      if (matchCount(phrase1, value) !== matchCount(phrase2, value)) {
        return false;
      }
    }

    return true;
  }

  function regEx(value) {
    return new RegExp(value, "g");
  }

  function matchCount(phrase, value) {
    return phrase.match(regEx(value)).length;
  }

  return publicApi;
}());

isAnagram("abab", "abba"); // true
isAnagram("acab", "cbba"); // false
