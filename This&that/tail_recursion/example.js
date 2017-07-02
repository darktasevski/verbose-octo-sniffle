(function() {
  "use strict";
  // Tail Calling
  // Retursion
  // Tail Call optimization

  var phrase = "foobar";

  function loopThroughMe(phrase) {
    for(var i = 0; i < phrase.length; i++) {
      console.log("for loop", phrase[i]);
    }
  }

  // With Closure
  function loopThroughMeWithClosure(phrase) {
    var i = 0;

    function continueMe(phrase) {
      console.log("withClosure", phrase[i]);
      i++;
      if (i >= phrase.length) {
        return;
      }

      return continueMe(phrase);
    }

    continueMe(phrase);
  }

  // Without Closure
  function loopThroughMeWithoutClosure(phrase, i) {
    console.log("withoutClosure", phrase[i]);
    i++;
    if (i >= phrase.length) {
      return;
    }

    return loopThroughMeWithoutClosure(phrase, i);
  }

  loopThroughMeWithoutClosure(phrase, 0);
  loopThroughMeWithClosure(phrase);
  loopThroughMe(phrase);

}());
