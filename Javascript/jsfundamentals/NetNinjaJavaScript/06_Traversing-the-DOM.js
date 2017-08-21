/*

Traversing the DOM

Net Ninja video: https://www.youtube.com/watch?v=SowaJlX1uKA&index=33&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET&spfreload=5

-Can reach in at any node
-Once we have that node, we can traverse the DOM to access other nodes
*/
// Three JS Methods to Grab Nodes and Store Them in Variables:
// 1. Get elements by class name:

document.getElementsByClassName("content");
var myContentDivs = document.getElementsByClassName("content");
myContentDivs;	// an array

// 2. Get elements by tag name:

myContentDivs[1].getElementsByTagName("h2");
var myH2 = myContentDivs[1].getElementsByTagName("h2");
myH2;	// an array

// Grab the element we want and change the content:
myH2[0].innerHTML = "Yo, Ninjas!";

// 3. Get element by id:
document.getElementById("page-title");