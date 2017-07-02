// Object Exercises:
var animal = {
	type: "cat",
	weight: "3 pounds",
	commonInIndiana: true,
	habitat: "homes or the street"
}

console.log(animal);
/* 
{ type: 'cat',
  weight: '3 pounds',
  commonInIndiana: true,
  habitat: 'homes or the street' }
*/

animal["weight"] = "4 pounds";
console.log(animal["weight"]);	// 4 pounds
console.log(animal);
/*
{ type: 'cat',
  weight: '4 pounds',
  commonInIndiana: true,
  habitat: 'homes or the street' }
*/

animal.moviesAboutMe = ["Garfield", "A Talking Cat?!?!", "Unknown"];
console.log(animal);
/*
{ type: 'cat',
  weight: '4 pounds',
  commonInIndiana: true,
  habitat: 'homes or the street',
  moviesAboutMe: [ 'Garfield', 'A Talking Cat?!?!', 'Unknown' ] }
*/

var theBryceIsRight = {
	name	           	  : "Bryce Greene",
	age			          : 20,
	vocation		      : "TA",
	email			      : "thebryceisright@gmail.com",
	greeting    		  : function() {
		return "Greetings, Earthlings. I am " + this.name + ". I am here to teach you.";
	},
	contactMe   		  : function() {
		return "You can contact me at " + this.email + ".";
	},
	callGreetingAndContact: function() {
		console.log(this.greeting());
		console.log(this.contactMe());
	}
}

theBryceIsRight.callGreetingAndContact();
// Greetings, Earthlings. I am Bryce Greene. I am here to teach you.
// You can contact me at thebryceisright@gmail.com.

// Kenn's Notes:
// Objects

var empObject = {};

var johnQualls = {
//  Key         :  Value 
	name 		: "John Qualls",
	age  		: 39,
	hairColor   : "Brown Hair"
}; 

console.log(johnQualls);
console.log(johnQualls.name);
console.log(johnQualls.name + " is of the age: " + johnQualls.age);
johnQualls.height = "6ft";

console.log(johnQualls.height);
console.log(johnQualls);
//Create a animal object with the properties of type, weight, commonINIndiana, and Habitat

var animal = {
	type 			: "bear",
	weight 			: 500, 
	commonINIndiana : false, 
	habitat 		: "100 acre woods"
}
// square bracket notation
console.log(animal["habitat"]);
animal["nickName"] = "Winnie";

console.log(animal["nickName"] + " lives in " + animal["habitat"]);

// reassigning values
animal.type = "moose"
console.log(animal.type)

// change the weight of the animal property using square bracket notation
animal.weight = 600;
// then add a new array property of moviesAboutMe rocky & bullwinkle, Monty Python,
// National Lampoons's Vacation
animal.moviesAboutMe = ["Rocky & Bullwinkle", "Monty Python", "National Lampoon's Vacation"];

console.log(animal)
console.log(Object.keys(animal))

// Objects with methods 

var theBryceIsRight = {
	name 		: "Bryce Greene",
	age  		: 20,
	vocation 	: "TA",
	email 		: "thebryceisright@gmail.com",
	greeting 	: function(){
					return "Greetings earthlings I am " + this.name + " I am here to learn you.";
				  },
	//create a method for contactMe and  include the email property in a return statement	
	contactMe	: function(){
					return "Connect with me at " + this.email;
				  },
	//create a method that calls both of the methods above 		
	doBoth  	: function(){
					console.log(this.greeting());
					console.log(this.contactMe());
				  } 
}

theBryceIsRight.doBoth();

//object constructors 
var paul = new Object;

paul.name = "Paul O'Connor"; 
paul.vocation = "Curriclum Master"; 
paul.hobbies = ["rocking out code", "listening to good music", "baking banana muffins"]; 
// object constructor template 

function Hotel(name, rooms, booked){
	this.name = name; 
	this.rooms = rooms; 
	this.booked = booked; 
	this.checkAvaliablity = function(){
		return "There are " + (this.rooms - this.booked) + " rooms left."
	};
}
 {}
 // the new keyword helps us instantiate a new object
var jw = new Hotel("JW Marriot", 300, 250);
var jwExp = new Hotel("Mini J'Dubs", 100, 50);

//creating an array of hotels
var hotels = [jw, jwExp];
//grabbing the name from one of the hotels 
console.log(hotels[1].name);

for (var h in hotels){
	console.log(hotels[h].name);
}
// console.log(jwExp.checkAvaliablity());

// BRONZE: Create a person object with different properties describing them.
var person = {
	name 		: "Caitlyn Tetmeyer",
	hairLength 	: "short"
} 
console.log(person);
// { name: 'Caitlyn Tetmeyer', hairLength: 'short' }

// SILVER: Add methods for each of the properties above that returns 
// the value of the property (i.e. getName() returns the name).
person.returnName = function() {
	return this.name;
}
console.log(person.returnName());	// Caitlyn Tetmeyer

person.returnHairLength = function() {
	return this.hairLength;
}
console.log(person.returnHairLength());		// short

// Print the person object
console.log(person);
/*
{ name: 'Caitlyn Tetmeyer',
  hairLength: 'short',
  returnName: [Function],
  returnHairLength: [Function] }
*/

for (var x in person) {
	console.log(person[x]);
}
/*
Caitlyn Tetmeyer
short
[Function]
[Function]
*/

console.log(person.returnHairLength());		// short

// GOLD: Create a child object that inherits all of the properties. 
// and methods from your person object.
// Add anything you want to the child object, without adding it to the person. 
var Child = person;
Child.favoriteAnimal = "bunny";
console.log(Child);
/*
{ name: 'Caitlyn Tetmeyer',
  hairLength: 'short',
  returnName: [Function],
  returnHairLength: [Function],
  favoriteAnimal: 'bunny' }
*/

console.log("\nAnd now for the crazy challenges!\n");

// Challenges

// Create 5 person objects with attributes: name, age, favoriteShows[] (Array with at least 5 elements)
// THE FOLLOWING LINES ARE TO BE FUNCTIONS IN EACH PERSON OBJECT
// Create a function called birthday that adds one to their age.

var person1 = {
	name 		 : "Bill", 
	age 		 : 50,
	favoriteShows: ["Penny Dreadful", "Blue's Clues", "Adventure", "Hot Tub", "Fox and Friends"],
	birthday	 : function() {
		return this.age + 1;
		},
}
console.log(person1.birthday());	// 51
console.log("person1's fave shows are: " + person1.favoriteShows);

var person2 = new Object;
person2.name = "Jane";
person2.age = 65;
person2.favoriteShows = ["British Show", "Monty Python", "Movie Night", "Time", "Hot Tub"];
person2.birthday = function() {
		return this.age + 1;
}
console.log("person2's fave shows are: " + person2.favoriteShows);

console.log("I know that they share the show \"Hot Tub.\"\n\n\n\n\n\n\n\n");

/*
var compareShows = function(personA, personB) {
	for (var i in personA.favoriteShows) {
		for (var j in personB.favoriteShows) {
			if (personA.favoriteShows[i] == personB.favoriteShows[j]) {
				console.log(favoriteShows[i]);
			} else {
				console.log("No shows in common");
			}
		}
	}
}
compareShows(person1, person2);
*/

var person3 = {
	name: "Michael",
	age: 20,
	favoriteShows: ["Dora", "Adventure", "British Show", "Movie Night", "Plants"],
	birthday	 : function() {
		return this.age + 1;
	}
}

var person4 = new Object;
person4.name = "Will";
person4.age = 35;
person4.favoriteShows = ["Game of Thrones", "Hot Tub", "Bath", "Shower", "Mansion"];
person4.birthday = function() {
		return this.age + 1;
	}


var person5 = {
	name: "Jackson",
	age: 26,
	favoriteShows: ["Message Show", "WeChat Show", "Chinese Show", "Beijing Show", "Happy Show"],
	birthday	 : function() {
		return this.age + 1;
	}
};





/*
Create a function that prints out "Hello, my name is *** and I am *** years old, and one of my 
favorite shows is " and then gives a random show from their list of shows
*/

/*
Create an array full of all the created persons. 
Create an array of 10 shows
Create a function that creates a person object.
	This function takes in name and age
	Populates the favoriteShows array with 5 random shows pulled from the shows array
	Includes the functions for person defined above.
	
Write a function that generates 5 people with random names (5 letters) and random ages(between 1 and 50)
	then adds them all to the existing array full of people


Create a function that takes in an array and removes anyone with a name beginning with a vowel

Create a function that takes in an array and returns the oldest person

Create a function that takes in an array and returns an array of people in order from youngest to oldest

Create a function that takes in an array and returns an array of people in order from oldest to youngest

Create a function that takes in an array and returns an array with three arrays
	The first array is people under 20 
	The second is with people 20 and over, but not 35 
	The third is with anyone who is 35

Create a function that takes in an array of people and returns an array the people in alphabetical order. 
*/























