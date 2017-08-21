// http://eloquentjavascript.net/03_functions.html#h_3rsiDgC2do

// count the times the capital lett 'B' appears in a string
// version 1
function countBs(string) {
  var counter = 0;
  for (var i = 0; i < string.length; i++) {
    if (string[i] === 'B')
      counter +=1;
  }
  return counter;
}

// version 2 - Why doesn't this work??
// function countBs(string) {
//   var counter = 0;
//   string.forEach(function (letter, index) {
//     if (letter === 'B')
//       counter +=1;
//   });
//   return counter;
// }

console.log(countBs("BBC")); // <--- 2

// write a function called countChar that behaves like countBs, except it takes
// a second argument that indicates the character that is to be counted
// version 1
function countChar(string, letter) {
  var counter = 0;
  for (var i = 0; i < string.length; i++) {
    if (string[i] === letter)
      counter +=1;
  }
  return counter;
}

console.log(countChar("kakkerlak", "k")); // <--- 4

/*
Answer per author: http://eloquentjavascript.net/code/#3.3

function countChar(string, ch) {
  var counted = 0;
  for (var i = 0; i < string.length; i++)
    if (string.charAt(i) == ch)
      counted += 1;
  return counted;
}

function countBs(string) {
  return countChar(string, "B");
}

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
*/
