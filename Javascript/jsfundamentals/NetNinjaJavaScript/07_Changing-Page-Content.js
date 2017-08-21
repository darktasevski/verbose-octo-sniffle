/*

Changing Page Content via the DOM

https://www.youtube.com/watch?v=FQuwArzGPYo&list=PL4cUxeGkcC9i9Ae2D9Ee
1RvylH38dKuET&index=34/*

Two Steps to Change Page Content: 
1) Grab the content we want to
change 
2) Use properties to change that content/*
 
Two Properties in This Video for Changing Page Content: 
1) .innerHTML() 
2) .textContent()

1) .innerHTML() 
Store body tag in a variable to later call methods on
it:
*/
var myBody = document.getElementByTagName("body");

myBody[0].innerHTML = "<p>I am a paragraph tag.</p>";   
// replaces the body's HTML with the above HTML

/*
2) .textContent() 
Change the text of an element - in this case,
an element with an id of "page-title": 
*/
var myTitle =
document.getElementById("page-title"); 

myTitle.textContent = "Kung Fu Your Net Skills";

