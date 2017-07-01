function isEven(number){
	if (number === 0){
		return true;
	}
	else if (number === 1){
		return false;
	}
	else if (number < 0){
		return isEven(Math.abs(number));
	}
	else{
		return isEven(number -2);
	}
}

console.log(isEven(3));
console.log(isEven(50));
console.log(isEven(75));
