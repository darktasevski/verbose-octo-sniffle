// Removing Elements from the DOM
// Video: https://www.youtube.com/watch?v=rBGgguNnutE&index=38&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET

// 1. Grab the parent item it's in (nav w/id of "main-nav")
// 2. Grab the element we wanna remove (ul in 0th position)
// 3. Use .removeChild method

// Grab the parent item it's in (nav w/id of "main-nav")
// Grab the element we wanna remove (ul in 0th position)
var parent = document.getElementById("main-nav").getElementByTagName("ul")[0];

// Call it to check we grabbed the right stuff:
parent;	/* Returns our <ul> w/the <li>'s inside it 
- correct! */

/* Store what we're going to remove - the 0th 
<li> from our <ul> - in "var child": */
var child = parent.getElementByTagName("li")[0];

// Call it to check we grabbed the right stuff:
child;	
/* <li>
	 <a href="/Subjects">Subjects</a>
   </li> */

// Use .removeChild method
// "Grab the parent, grab one of its children (the 0th one), and remove it."
var removed = parent.removeChild(child);

// If you wanna add it back at the bottom of the list:
parent.appendChild(removed);
// ...or use .insertBefore to put it back at the top of the list!
