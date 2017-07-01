//# Title Case

//Write a function that title-cases a string of words. 
//Make a distinction between prepositions (that shouldn't be capitalized) and other words 
//(which should be capitalized).

//Factor out your solution cleanly into a set of well-named helper functions. 
//The goal is for your code to be very readable to a fellow programmer, 
//without requiring comments.
 

/*
1. split the string
	split()
	for()
	
2. function to capitalize any word
	split() the word in the Array
		//array of letters
	take index 0, toUpperCase()
	join()
		//array of capitalized words
		
3. list of prepositions to NOT capitalize
	//of, the, a, and, or, but, is, 
	
4. case1: capitalize first word in the array of words
5. case2: nested for loop to run thru array of words, and array of prepositions
	need result array
	if preposition !== array of words, capitalize
		push word to result array
	
	return result array
*/

let str = "the sky is clear today";


function splitString (sentence) {
	let arrayOfWords = [];
	for (let i = 0; i < sentence.length; i+=1) {
		arrayOfWords = sentence.split(" ");
	}
	return arrayOfWords;
}

// console.log(splitString(str));

function capitalize (word) {
	let capitalized = [];
	for (let j = 0; j < word.length; j+=1) {
		capitalized = word.split("");
		capitalized[0] = capitalized[0].toUpperCase();
	}
	capitalized = capitalized.join("");	
	return capitalized;
}

// console.log(capitalize("clear"));

/*
function titleCase (arr) {
	let cased = '';
	for (let x = 0; x < arr.length; x+=1) {
		cased.push(capitalize(arr[x]));
	}
	return cased;
}
*/

let capitalized_string = splitString(str).map(el => capitalize(el)).join(" ");

console.log(capitalized_string);
