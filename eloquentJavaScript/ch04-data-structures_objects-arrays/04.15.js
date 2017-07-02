// http://eloquentjavascript.net/04_data.html#h_lRBZxXmo93

/*
The global scope, the space in which global variables live, can also be
approached as an object in JavaScript. Each global variable is present
as a property of this object. In browsers, the global scope object is
stored in the window variable.
*/

// runs in console, errors out in node
var myVar = 10;
console.log("myVar" in window); // ---> true
console.log(window.myVar);      // ---> 10
