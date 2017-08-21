/*

Accessing and Changing Attributes

https://www.youtube.com/watch?v=V0S0LXvnW-o&index=35&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET

Two Methods for Accessing and Changing Attributes: 
1) .getAttribute() - access an attribute
2) .setAttribute() - change existing attribute or set a new one

---

1) .getAttribute() method
Lets you access an attribute.
*/
var link = document.getElementById("test");

link.getAttribute("href");	// accesses "href" attribute
link.getAttribute("class");	// accesses "class" attribute

/*
2) .setAttribute()
Lets you update an existing attribute or set a new attribute.
To update an attribute:
	1st parameter: the attribute you wanna update
	2nd parameter: what you wanna update it to
*/
link.setAttribute("class", "pie");
// sets the "class" to be "pie"

// To set a new attribute that doesn't exist yet:
link.setAttribute("alt", "hello");	
// creates "alt" attribute and sets it to "hello"

// More Examples:
link.className;	// pie (see line 28)
link.className = "ninja";	// updates class name to "ninja"
link.href;	// returns the URL referenced
link.style;	// returns an object w/lots of CSS properties in it








