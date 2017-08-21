// JavaScript Events

// Video: https://www.youtube.com/watch?v=bf_9IeihQ0M&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET&index=39

// Examples of events: hover, scroll, click
// We write JavaScript that makes an action occur when an event occurs.

/*

Methods Mentioned in This Video:
1. .onclick
2. .onmouseover
3. .addEventListener

*/

// 1. Grab an element out of your HTML code that you want the event to happen to.
var title = document.getElementById("page-title");
// title now has access to all of #page-title's properties.

// 2. "When someone clicks the title element..."
title.onclick = function(){
	// 3. "...an alert pops up."
	alert("You clicked me!");
};

// Example 2: When user places mouse over element...
title.onmouseover = function(){
	// ...an alert pops up.
	alert("You hovered your mouse over me!");
};





