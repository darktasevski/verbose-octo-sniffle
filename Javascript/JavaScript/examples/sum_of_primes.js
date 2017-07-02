function isPrime(number) {
	var prime = true;
	if (number < 2) {prime = false};

	for ( var i = (number -1); i >= 2; i-=1) {
		if (number % i === 0) {
			prime = false;
		}
		// else
			// prime = true;
	}
	return prime;

}


function sumOfNPrimes(n) {
	var result = 0;
	var count = 0;
	var i = 2;

	while( count < n) {
		if (isPrime(i)) {
			result += i;
			count+= 1;
		}
		i+=1;
	}
	console.log();
	return result;
}
console.log(isPrime(5));
console.log(sumOfNPrimes(5));
// console.log(isPrime(14));

