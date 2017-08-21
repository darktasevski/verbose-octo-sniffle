function isPalindrome(str) {
	var a = 5;
	function reverse(){
		return str.split('').reverse().join('')
	}
	return str === reverse();
}
console.log(isPalindrome("kayak"));
