// Functions

/*
	function nameOfFunction() {
		// do something
	}
*/

// Declare the function
function greeting() {
	var name = "Patrick"
	console.log(name + " says, \"Good morning, Vietnam!\"");
}
// Call the function
greeting();		
// Because var name is inside a function, it only has local scope (inside the function).
// It does not have global scope.

// Now, try the function without the var keyword before name (NOT best practice)
function greeting() {
	name = "Patrick"
	console.log(name + " says, \"Good morning, Vietnam!\"");
}

console.log(name);	
// Patrick because without the var keyword, JS make name a global variable!
// This is kind of dangerous/careless.

// CHALLENGE
function printWeather() {
	console.log("sunny");
}

printWeather();		// sunny

// Functions with Parameters
function shoes(brand) {
	console.log("Man, those " + brand + " are on fleek!");
}

shoes("Doc Martens");	// Man, those Doc Martens are on fleek!

// Functions with Multiple Parameters
function add(num1, num2) {
	console.log(num1 + num2);
}
add(4, 5);	// 9

// Functions that return data
function sum(num1, num2) {
	// num1 and num2 are parameters.
	return num1 + num2;
}

sum(23, 17);	
// 40 is returned, but you can't see it because we didn't print it to the console.
// We didn't store the value.

console.log(sum(23, 17));	// 40 is printed but not stored.

var answerToQuestion = sum(23, 17);
// NOW we've stored it to a variable!

// JavaScript walks the tightrope of being a functional programming language 
// and an object-oriented language.

// CHALLENGE: Write functions for multiplication, division, modulus, and subtraction.
function multiplication(num1, num2) {
	return num1 * num2;
}
var multiply = console.log(multiplication(3, 4));	// 12

function division(num1, num2) {
	return num1 / num2;
}
var divide = console.log(division(20, 10));		// 2

function modulus(num1, num2) {
	return num1 % num2;
}
var modulateIt = console.log(modulus(87, 4));	// 3

function subtraction(num1, num2) {
	return num1 - num2;
}
var subtract = console.log(subtraction(99, 94.3));	// 4.700000000000003

// BRONZE
function twoStrings(string1, string2) {
	console.log(string1 + " " + string2);
}
twoStrings("I'm pretty great.", "How about you?");

// SILVER
function calcBills(water, power, rent) {
	console.log("I spend a total of $" + (water + power + rent) + " each month.");
}
calcBills(10, 15, 750);

// GOLD
function sodaCost(numSodas, pricePerSoda) {
	// 100 sodas times price of $.99 = numSodas * .99
	// Then add tax, so multiply by 1.07.
	var preTaxPrice = numSodas * pricePerSoda;
	console.log(numSodas + " Cokes will cost you $" + (preTaxPrice * 1.07) + ".");
}
sodaCost(100, .99);

// Creat a calculator function that accpts 3 arguments: 2 numbers and 1 operator.
// Ex: calculator( 2, *, 2) >> this should return 4.
// Hints: You will need to use conditionals!!
function calculator(num1, operator, num2) {
	if (operator == "*") {
		return num1 * num2;
	} else if (operator == "/") {
		return num1 / num2;
	} else if (operator == "+") {
		return num1 + num2;
	} else if (operator == "-") {
		return num1 - num2;
	} else if (operator == "%") {
		return num1 % num2;
	} else {
		return "Please enter a valid operator.";
	}
}

console.log(calculator(2, "*", 3));
console.log(calculator(2, "/", 3));
console.log(calculator(2, "+", 3));
console.log(calculator(2, "-", 3));
console.log(calculator(2, "%", 3));
console.log(calculator(2, 5, 3));















