function isZipCode(code){
	return /^\d{5}-\d{4}w?[wangdejun]*\d{1,}$/.test(code)
}

console.log(isZipCode("23342-12340"))
console.log(isZipCode("23342-1234w1"))
console.log(isZipCode("23342-1234wwangdejunwangdejun123454567"))
console.log(isZipCode("23342-1234wwangdejunwangdejun1"))

function testRegex(string){
	return 
}