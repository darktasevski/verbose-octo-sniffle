function isSubstring(searchstring, substring) {
	return searchstring.includes(substring);


}

console.log(isSubstring("time to program", "time"));
console.log(isSubstring("time to program", "bat"));