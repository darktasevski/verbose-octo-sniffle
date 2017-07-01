// Function Expressions

function callFunction(fun){
	fun();
}


// Normal function statement in JS:
function sayHi(){
	console.log('Hi!');
};
sayHi();

// Function Expression in Node.js:
var sayBye = function(){
// anonymous function
	console.log('Bye!');
};

// Use function callFunction from line 7-9:
callFunction(sayBye);
