function fizzBuzz(arr) {
	var result = [];

	for (var i = 0; i < arr.length; i+=1) {
		if ( (arr[i] % 3 === 0 )&& (arr[i] % 5 === 0) ){
			
		}
		else if (arr[i] % 3 === 0) {
			result += arr[i];
		}
		else if (arr[i] % 5 === 0) {
			result += arr[i];
		}
	}
	return result;
}


var x = [3,5,15,21,22];

console.log(fizzBuzz(x));