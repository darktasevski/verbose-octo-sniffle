function range(start, end, step) {
	var result = [];
	if(step === undefined) {
		step = 1;
	}
	for (var i = start; i <= end; i += step) {
			result.push(i);
			}
			return result;
}

console.log(range(5, 10,2));

function sum(arr) {
	var result = 0;
	for (var i = 0; i < arr.length; i+=1) {
		result += arr[i];
	}
	return result;
}

console.log(sum([1,2,3,4]));
console.log(sum(range(1,4,1)));
