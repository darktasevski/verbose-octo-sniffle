let arr = [1,2,3,4,5,6,7];

function logIfEven(num) {
	if( num%2 === 0) {
		console.log(num);
	}
}

arr.forEach(logIfEven);
