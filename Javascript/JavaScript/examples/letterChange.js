// jshint esversion: 6

function LetterChanges(str) {

  let converted = str.replace(/[a-z]/gi, function(char) {
    return ( char === 'z' || char === 'Z') ? 'a' : String.fromCharCode(char.charCodeAt() + 1);
  });

  let capitalize = str.replace(/[a|e|i|o|u]/gi, function(char) {
    return char.toUpperCase();

  });

  return capitalize;

}

// keep this function call here
// LetterChanges(readline());


console.log(LetterChanges('abcdz123'));
