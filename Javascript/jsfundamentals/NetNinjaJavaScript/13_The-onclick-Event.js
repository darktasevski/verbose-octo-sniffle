// The onclick Event

var content = document.getElementById("content");
var button = document.getElementById("show-more");

// When a user clicks the button...
button.onclick = function(){

// ...check to see if the box is open...

	if(content.className == "open"){

		// ...and if it's open, 1. SHRINK the box...
		content.className = "";
		
		// ... and 2. Change "Show Less" to "Show More".
		button.innerHTML = "Show More";
		
	} else {

		// If it's NOT open, 1. EXPAND the box...
		content.className = "open";

		// ...and 2. change the text of the button from "Show More" to "Show Less".
		button.innerHTML = "Show Less";
	}

};