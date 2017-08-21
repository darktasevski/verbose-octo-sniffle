// Conditionals

/*
Boolean Operators:
	== equal to
	=== equal value and equal type (strictly equal)
	! not
	!= not equal
	!== not equal value OR not equal type (not strictly equal)
	> greater than
	< less than
	>= greater than or equal to
	<= less than or equal to
*/

console.log(1 > 3);	// false
console.log(10 != 10);	// false because 10 is equal to 10
var name = "Caitlyn";

console.log(name == "caitlyn");		// false because C is not equal to c

console.log(6 == "6");	// true because JS automatically converts "6" to 6 when == is used
console.log(6 === "6");	// false because 6 and "6" are not the same type

// if statements
/*
if (boolean expression) {
	// some code goes here
}
*/

if (4563 % 2 === 0){
	console.log("This number is even.");
}
// false

var userName = "admin";
var password = "admin";

if (userName == "admin" && password == "admin"){
	console.log("You have been granted access.");
}
// You have been granted access.

userName = "DragonSlayer";
if (userName == "admin"){
	console.log("You have been granted access.");
}
// [nothing because userName does not equal DragonSlayer]

/*
Chaining Boolean Expressions:
	&& and
	|| or
*/

if (userName == "admin" && password == "admin"){
	console.log("You have been granted access.");
} else {
	console.log("Incorrect details");
}
// Incorrect details


// CHALLENGE
userName = "Caitlyn";	// this is the wrong username
password = "hello";		// this is the wrong password
if (userName == "admin" && password == "admin"){
	console.log("You have been granted access.");
} else if (userName != "admin" && password != "admin") {
	// Challenge: Check if the username or the password is the wrong value.
	console.log("Wrong username and password");
} else if (userName == "admin" && password != "admin") {
	console.log("Wrong password");
} else {
	console.log("Wrong username");
}
// Wrong username and password

userName = "admin";		// this is the right username
password = "hi";		// this is the wrong password
if (userName == "admin" && password == "admin"){
	console.log("You have been granted access.");
} else if (userName != "admin" && password != "admin") {
	// Challenge: Check if the username or the password is the wrong value.
	console.log("Wrong username and password");
} else if (userName == "admin" && password != "admin") {
	console.log("Wrong password");
} else {
	console.log("Wrong username");
}
// Wrong password

// Check the rarest case first!
var age = 39;

if ( age >= 35 ) {
	console.log("You can vote and also hold any place in government.");
} else if (age >= 25){
	console.log("You can vote and run for Senate.");
} else if ( age >= 18 ) {
	console.log("You can only vote.");
}else {
	console.log("You can't vote or hold place in government.")
}

// BRONZE
var age = 19;
if (age >= 40) {
	console.log("You are at least 40 years old.");
} else if (age >= 30) {
	console.log("You are at least 30 years old.");
} else if (age >=20) {
	console.log("You are at least 20 years old.");
} else if (age >= 18) {
	console.log("You are at least 18 years old.");
} else {
	console.log("You are a child.");
}

// SILVER
var coltsRecord = 4;
var patriotsRecord = 4;

if (coltsRecord > patriotsRecord) {
	console.log("You guys suck, we have a better record.");
} else if (coltsRecord < patriotsRecord) {
	console.log("Y'all think you're awesome, but we'll come from behind and beat you.");
} else if (coltsRecord == patriotsRecord) {
	console.log("You think you're so hot, but we're tied - we'll take you down a peg.");
} else {
	console.log("If we could've played you, we would have creamed your pathetic excuse for a team.")
}

// GOLD
for (i = 1; i < 101; i++) {
	if (i % 3 === 0 && i % 5 === 0) {
		console.log("FizzBuzz");
	} else if (i % 3 === 0) {
		console.log("Fizz");
	} else if (i % 5 === 0) {
		console.log("Buzz");
	} else {
		console.log(i);
	}
}

// Alternative
var num = 1;
while(num < 101){
	console.log(num);
	if (num % 15 === 0) {
	} else if (num % 3 === 0){
		console.log("Fizz");
	} else if (num % 5 === 0){
		console.log("Buzz");
	}
	else {
		console.log(num);
	}
	num = num + 1;	// wonky expression
}

































