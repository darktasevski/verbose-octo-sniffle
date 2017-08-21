// Arrays
// Use [ ]

var students = ["Harrison", "Rose", "Ben", "Caitlyn", "Kay"];
console.log(students);	// [ 'Harrison', 'Rose', 'Ben', 'Caitlyn', 'Kay' ]

console.log(students.length);	// 5 because there are 5 items in the array
console.log(students[0]);	// Harrison (the 1st item)
console.log(students[2]);	// Ben (the 3rd item)

console.log(students[-1]);	// undefined because there's nothing at the -1 position

console.log("JavaScript methods are the actions that can be performed on objects.")
// Methods:

console.log(" The .push() Method:");
// .push()
students.push("Aaron");
console.log(students);	// Aaron's been added to the end of the array.

console.log("The .pop() Method:");
// .pop()
students.pop();
console.log(students);	// Aaron's been removed from the end of the array.

console.log("The for each Loop:");
// The for each Loop:
for (var s in students) {
	console.log(students[s] + " is in the position of: " + s);
}
/*
Harrison is in the position of: 0
Rose is in the position of: 1
Ben is in the position of: 2
Caitlyn is in the position of: 3
Kay is in the position of: 4
*/

// Above, s is the INDEX.
// students is our ARRAY.

console.log("The above is a quicker way to do this:");
console.log(students[0]);
console.log(students[1]);
console.log(students[2]);
console.log(students[3]);
console.log(students[4]);
/*
Harrison
Rose
Ben
Caitlyn
Kay
*/

console.log("Challenge:");
// Create an array of numbers 1 through 10, then use a for in loop
// to print it to the console.
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (var x in numbers) {
	console.log(numbers[x]);
}

console.log("for loop that pushes numbers into an empty array:")
// Create a for loop that pushes numbers into an empty array.

// Declare your variables:
var numArray = [];
var name = "";

for (var num = 1; num < 11; num++) {
	console.log(num);
	// Push each num into the array numArray:
	numArray.push(num);
	// Print after each time a number's added to the array:
	console.log(numArray);
}
/*
1
[ 1 ]
2
[ 1, 2 ]
3
[ 1, 2, 3 ]
4
[ 1, 2, 3, 4 ]
5
[ 1, 2, 3, 4, 5 ]
6
[ 1, 2, 3, 4, 5, 6 ]
7
[ 1, 2, 3, 4, 5, 6, 7 ]
8
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
9
[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
10
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
*/

console.log("Mixed Arrays:");
// Mixed Arrays

var ranThings = ["Bryce", 45, "Summer", true, []];
console.log(ranThings);
// [ 'Bryce', 45, 'Summer', true, [] ]

// BRONZE
// Create an array of your favorite hobbies.
var faveHobbies = ["singing", "coding", "walking", "doing yoga", "meditating", "writing in my journal"];

// SILVER
// Create an array of awesome cars.
var awesomeCars = ["my Hyundai Accent", "Ferrari", "Honda Accord"];

// Create a for loop to print out each of the cars to the console.
for (var x in awesomeCars) {
	console.log(awesomeCars[x]);
}
/*
my Hyundai Accent
Ferrari
Honda Accord
*/

console.log("Create an array where each element is an array of different lists (i.e. 0 is your cars, 1 is your pets, 2 is your children).");
// GOLD
var crack = [["Accent", "Accord", "Mercedes"], ["Magnolia", "Little Guy", "Weaver"], ["Bobby", "Jessica"]];
// crack[0][2] would be the 1st array, 3rd item ("Mercedes").

console.log("Create a loop to print out every element.");

for (var i in crack) {
	for (var n in crack[i]) {
		console.log(crack[i][n]);
	}
}
/*
Accent
Accord
Mercedes
Magnolia
Little Guy
Weaver
Bobby
Jessica
*/

// Other Challenges:

// Random number should be between 0 - 50
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1));
}
console.log(getRandomIntInclusive(0, 50));

// Create an array and fill it with 15 random numbers (Learn the random function)
var ranNumList = [];
for (i = 0; i < 15; i++) {
	ranNumList.push(getRandomIntInclusive(0, 50));
}
console.log("Here's the list of 15 random numbers: " + ranNumList);

// Write code to determine how many prime numbers there are in the array
function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
        	return false;
	    }
	}
    return true;
}

console.log("\nUsing isPrime\(\):");
var i = 0
while (i < 10) {
	console.log("The number " + i + " is prime? " + isPrime(i))
	i++;
}
/*
The number 0 is prime? true
The number 1 is prime? true
The number 2 is prime? true
The number 3 is prime? true
The number 4 is prime? false
The number 5 is prime? true
The number 6 is prime? false
The number 7 is prime? true
The number 8 is prime? false
The number 9 is prime? false
*/

var listOfPrimes = [];

for (var cat in ranNumList) {
	if (isPrime(ranNumList[cat]) == true) {
		listOfPrimes.push(ranNumList[cat]);
	}
}

console.log("\nHere are the prime numbers that were in the list of randomly-generated numbers between 0 and 50: " + listOfPrimes);
console.log("\n" + listOfPrimes.length + " of the numbers are prime.");

// Ben Cook's Answer:
var fifteenRandoms = [];
for(var i = 0; i < 15; i++){
    fifteenRandoms.push(Math.floor(Math.random() * 50));
}
console.log("Ben Cook's 15 random numbers: " + fifteenRandoms);
function isPrime(value){
    
    for(var i = 2; i < value; i++){
        if(value % i === 0){
            return false;
        }
        else{
            return true;
        }
    }
}
var primes = [];
for(var y = 0; y < fifteenRandoms.length; y++){
    if (isPrime(y) === true) {
        primes.push(y);
    }
}
console.log("Ben Cook's prime numbers are: " + primes);

/* 
Anthony Snelling's Answer to the following:

Create an array with every letter in the alphabet.
Write code to make an array of 5 words, each with 5 random letters.
Ex: (["jeodp", "bactg", "aqpvy", "bqwzs", "poebt", "xtser"])
*/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var alph = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var rand = [];
var word = "";

for(bet = 0; bet <5; bet++){

    for(lett = 0; lett <5; lett++){

        word = word.concat(alph[(getRandomInt(1,27) - 1)]);

    }//end inside for

    rand.push(word);
    word = "";

}//end outside for

console.log("Anthony Snelling's random-letters answer: " + rand);

// Return a random number between 1 and 10:
Math.floor((Math.random() * 10) + 1);

// Some code to generate the alphabet for you:
alphabet=[];
for(let ctr=0; ctr<26; ctr++)alphabet.push(String.fromCharCode(ctr+97));



















