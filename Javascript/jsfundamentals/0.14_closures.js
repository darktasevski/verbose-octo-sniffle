// Closures - essentially functions; variables inside of functions cannot be used outside
// Ex 1:
var init = function(){

	var name = "Summer";

	function displayName(){
		console.log(name);
	}

	displayName();
}
init();
// console.log(name) --> Summer

// Ex. 2:
var friend = {};

var setAge = function(myAge){
	// Here is our closure:
	var birthday = '5/16/2017';

	return {
		getAge: function(){
			console.log(myAge);
			return myAge;
		}
	}
}
// { getAge: [Function: getAge] }

friend.age = setAge(55);	
console.log(friend.age);	// 55
console.log(friend.age.getAge());	// 55
console.log(friend.birthday);	// undefined
