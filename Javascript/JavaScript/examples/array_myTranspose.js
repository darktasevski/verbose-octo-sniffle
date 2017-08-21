let arr = ([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  			])

Array.prototype.myTranspose = function () {
	let result = [];

	for (let i = 0; i < this.length; i += 1) {			//THIS refers to the ARRAY
		result.push([]);

		for (let j = 0; j < this.length; j += 1) {
			result[i][j] = this[j][i];
		}
	}
	return result;
}

console.log(arr.myTranspose());