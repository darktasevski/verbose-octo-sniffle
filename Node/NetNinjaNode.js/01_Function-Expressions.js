/*

Node.js - open-source, cross-platform JavaScript runtime environment for 
executing JavaScript code server-side

Function Expressions in Node.js

https://www.youtube.com/watch?v=lK42xIMcA0Y

---

First, an example of a vanilla JS function:

Declare it:
*/
function sayHi(){
	console.log("Hi");
}

// Call it:
sayHi();		// Hi
/*

---

A function expression is a variable equal to an anonymous function:
*/
var sayBye = function(){
	console.log("Bye");
};
sayBye();		// Bye

/*
Pattern often used in Node.js: Passing a function into another function

Below, the function callFunction() takes the parameter fun. 
We can pass another function, sayBye(), in as the argument:
*/
function callFunction(fun){
	fun();
};
// Call it:
callFunction(sayBye);	// Bye
// We just passed a function into a function!
