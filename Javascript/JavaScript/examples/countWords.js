// Write a function called "countWords".
//
// Given a string, "countWords" returns an object where each key is a word in the given string, with its value being how many times that word appeared in th given  string.
//
// Notes:
// * If given an empty string, it should return an empty object.



function countWords(str) {
  // your code here
  var freq = {};
  str.split(' ').forEach(function(i) {
    freq[i] ? freq[i]++ : freq[i] = 1;
  });
  return freq;
}


var output = countWords('ask a bunch get a bunch');
console.log(output); // --> {ask: 1, a: 2, bunch: 2, get: 1}
