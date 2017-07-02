// Changing CSS Styles
// https://www.youtube.com/watch?v=97agDBCyxAE&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET&index=36 

var title = document.getElementById("page-title");
// grabs the element that has an id of "page-title" and saves it in var title

title.setAttribute("style", "position: relative");
// changes title's CSS to position: relative

title.setAttribute("style", "left: 10px");
// Uh-oh, we accidentally replaced all of title's CSS with "left: 10px"!
// Do it right:
title.setAttribute("style", "position: relative; left: 10px");

// Change the position more easily:
title.style.left = "20px";
title.style.top = "10px";

// Change text color:
title.style.color = "red";

// This won't work because of the hyphen:
title.style.background-color = "blue";
// You have to use camelCase:
title.style.backgroundColor = "blue";
