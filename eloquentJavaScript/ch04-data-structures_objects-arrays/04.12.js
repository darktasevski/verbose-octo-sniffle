// http://eloquentjavascript.net/04_data.html#h_mT4YQfwHp6

var myString = "Fido";
myString.myProperty = "value";
console.log(myString.myProperty); // ---> undefined, adding a property doesn't stick

// slice, indexOf & lastIndexOf
console.log("coconuts".slice(4, 7));     // ---> nut
console.log("coconut".indexOf("u"));     // ---> 5
console.log("coconut".lastIndexOf("o")); // ---> 3

// String indexOF cn take more than one character
console.log("one two three".indexOf("ee")); // ---> 11

// trim
console.log("  okay \n ".trim()); // ---> okay

// length, charAt and index values
var string = "abc";
console.log(string.length);    // ---> 3
console.log(string.charAt(0)); // ---> a
console.log(string[1]);        // ---> b
