// Adding Elements to the DOM
// Video: https://www.youtube.com/watch?v=TrGI9Yki-24&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET&index=37

// Create a new <li> tag:
var newLi = document.createElement("li");

// Call it:
newLi;	// <li></li>


// Create a new <a> tag:
var newA = document.createElement("a");

// Call it:
newA;	// <a></a>

// Below:
// 1) Grab the nav
// 2) Grab the ul in the nav
// 3) Add the li's and a's we created

// Grab the nav ("main-nav") and the ul ("ul"):
var menu = document.getElementById("main-nav").getElementsByTagName("ul")[0];
 
// Call it:
menu;	// <ul>...</ul>

// Append a new element to ul:
menu.appendChild(newLi);	// <li></li>

// Append a new <a> tag to the li:
newLi.appendChild(newA);	// <a></a>

// Add text to the <a> tags:
newA.innerHTML = "Blog";	
/* 
<nav>
	<ul>
		<li>...</li>
		<li>...</li>
		<li>...</li>
		<li>
			<a>Blog</a>
        </li>
    </ul>
</nav>
*/

// To insert the <li><a>Blog</a></li> at the **TOP** of the <ul>, 
// use insertBefore:
menu.insertBefore(newLi, menu.getElementsByTagName("li")[0]);
// 1st parameter: the new item you want to add
// 2nd parameter: the thing BEFORE WHICH you're going to add the new item
	// Here, we're adding an <li> tag BEFORE the 0th existing <li>.









