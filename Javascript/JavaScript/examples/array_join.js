/*
5. Write a simple JavaScript program to join all
elements of the following array into a string.
Sample array : myColor = ["Red", "Green", "White", "Black"];
Expected Output :
"Red,Green,White,Black"
"Red,Green,White,Black"
"Red+Green+White+Black"
*/

let myColor = ["Red", "Green", "White", "Black"];

function myJoin(arr) {
  return arr.join(",");
}


console.log(myJoin(myColor));
