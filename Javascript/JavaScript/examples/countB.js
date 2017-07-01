
function countChar(str, ch){
	var count = 0;
	str = str.toUpperCase();
	for(var i=0; i < str.length; i+=1) {
		if (str.charAt(i) == ch) {
			count += 1;
		}
	}
	return count;
}

function countBs(str) {
	return countChar(str, "B");
}

console.log(countBs("BBC"));
console.log(countChar("kai's cool", "I"));


//toUpperCase does NOT mutate original string