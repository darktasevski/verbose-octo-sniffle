/* 
Check to make sure this document is connected to the HTML document:
alert("Happy Friday!");
*/

function Hotel(name, rooms, booked) {
	this.name = name;
	this.rooms = rooms;
	this.booked = booked;
	this.checkAvailability = function() {
		return this.rooms - this.booked;
	}
}
// Object Constructors:
var rri = new Hotel("Red Roof Inn", 250, 230);
var alex = new Hotel("The Alexander", 500, 150);

// Create an array to hold the hotels:
var hotels = [rri, alex];

// repl.it is a good place to go try code out.

// Show the info of all hotels on the webpage (the document):
function showAllHotelsInfo() {
	for (var h in hotels) {
		/* 
		Track the hotel name:
		1) Reference the array called hotels, 
		2) Grab the index position (which we're calling h)
		3) Grab the name using .name: 
		*/
		var hotelName = hotels[h].name;

		/*
		1) Grab the document (the website)
		2) Create a text node (a place where we can put our text) using .createTextNode()
		3) Put the hotel names (hotelName) in the text node
		*/
		var hotelHtmlText = document.createTextNode(hotelName);

		// We will put the text in <li> tags, so let's create the li tags first:
		var listItem = document.createElement("li");

		// In the HTML, add our text (hotelHtmlText) inside the li tags:
		listItem.appendChild(hotelHtmlText);
		// The above adds "Red Roof Inn" inside the li tags: <li>"Red Roof Inn"</li>

		/* So we made this:
			<ul id="hotels">
				<li>"Red Roof Inn"</li>
				<li>"Alexander"</li>
			</ul>
		*/

		/*
		1) Grab the document (website)
		2) Grab the element with the id of hotels (the element happens to be a ul)
		3) Add li's to it as children
		*/
		document.getElementById("hotels").appendChild(listItem);
	}
}
showAllHotelsInfo();










