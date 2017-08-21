function isPrime(number) {
	var prime = true;
	if (number < 2) {prime = false};
	for ( var i = (number -1); i > 2; i-=1) {
		if (number % i === 0) {
			prime = false;
		}
		else
			prime = true;
	}
	return prime;

}

console.log(isPrime(17));