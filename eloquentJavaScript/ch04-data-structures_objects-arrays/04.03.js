// http://eloquentjavascript.net/04_data.html#h_vGyI2y8HA6

anArray = [1, 2, 3, 5, 7, 9, 11, 13, 4, 5, 6];
anArrayLength = anArray.length;
console.log("anArray.length - dot notation: " + anArrayLength); // <--- 11

anArrayLength = anArray["length"];
console.log("anArray[\"length\"] - bracket notation: " + anArrayLength); // <--- 11

var length = "length";
anArrayLength = anArray[length];
console.log("if: var length = \"length\";\nthen: anArray[length] - bracket notation: " + anArrayLength); // <--- 11
consle.log("Stick with the dot notation for properties.");
