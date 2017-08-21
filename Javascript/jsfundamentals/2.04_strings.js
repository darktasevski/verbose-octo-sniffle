/*
Strings

A string literal can be wrapped in single quotes or double quotes. 
It can contain zero or more characters. 
The \ (backslash) is the escape character. 

Use the escape character before the following 
if you want to include them in a string:
"
'
\
/
b (backspace)
f (formfeed)
n (new line)
r (carriage return)
t (tab)
*/

// Strings have a LENGTH PROPERTY:
console.log("seven".length);		// 5 because "seven" has 5 characters

/*
Once a string is made, it CANNOT be changed.
But it is easy to make a new string by concatenating other strings together
with the + operator.
*/

console.log('c' + 'a' + 't' === 'cat');		
// true because two strings containining exactly the same characters 
// in the same order are considered to be the same string.

// Strings have METHODS:
console.log('cat'.toUpperCase() === 'CAT');		// true


