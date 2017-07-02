let arr = [-2,0,1,2,-1];
let arr2 = [-1,0,2,-2,1];

Array.prototype.twoSum = function () {
	let result = [];

	for (let i = 0; i < this.length; i += 1) {			//this refers to the ARRAY
		for (let j = (this.length - 1); j > i; j -= 1) {
			if (this[i] + this[j] === 0) {
				result.push([i,j]);
			}
		}
	}
	return result;
}

console.log(arr.twoSum());
console.log(arr2.twoSum());