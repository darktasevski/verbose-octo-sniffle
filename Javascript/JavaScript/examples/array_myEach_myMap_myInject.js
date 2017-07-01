// jshint esversion: 6

let arr = [1,2,3,4,5];


//myEach
Array.prototype.myEach = function (callback) {
	for ( let i = 0; i < this.length; i += 1) {
		 callback(this[i]);
	}
	return this;
};

//myMap using annoynmous function notation
Array.prototype.myMap = function (func) {
	let copiedArr = [];
	this.myEach(function(el) {
			copiedArr.push(func(el));
	});
	return copiedArr;
};

let a = arr.myMap(function (el) {
	return el * el;
});
console.log(a);

//myMap using arrow notation
Array.prototype.myMap = function (func) {
	let mappedArray = [];

	this.myEach(elements => {
		mappedArray.push(func(elements));
	});
	return mappedArray;
};
/*
let a = arr.myMap(function(el) {
	return el * el;
});
console.log(a);
*/

//myInject
Array.prototype.myInject = function (func) {
	let accum = 0;

	this.myEach( function(element) {
		 accum += func(element);
	});
	return accum;
};

function square(num1) {
	let result = num1 * num1;
	return result;
}

console.log(arr.myInject(square));


function sum(num) {
	let result = 0;
	result += num;
	return result;
}

console.log(arr.myInject(sum));
