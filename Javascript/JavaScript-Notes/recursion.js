// function isPalindrome(text){
// 	if(text.length<=1){
// 		return true
// 	}
// 	if(text.charAt(0)!=text.charAt(text.length-1)){
// 		return false
// 	}
// 	return isPalindrome(text.substr(1,text.length-2))
// }

// console.log(isPalindrome("ava"))


// function isHuiwen(text){
// 	if(text.length<=1){
// 		return true
// 	}

// 	if(text.charAt(0)!=text.charAt(text.length-1)){
// 		return false
// 	}
// 	return isHuiwen(text.substr(1,text.length-2))
// }

// console.log(isHuiwen("wwwwwwawwwwww"))

// console.log("wangdejun".charAt("wangdejun".length-1))


i = 0
function isPalindrome(text){
	i++
	if(text.length <=1){
		return true
	}
	if(text.charAt(0)!=text.charAt(text.length-1)){
		return false
	}
	return isPalindrome(text.substr(1,text.length-2))
}

console.log(isPalindrome("qvpwfqaqfwpmq"))
console.log("qmpwfqaqfwpmv".length)


console.log(i);







// function isPalindrome(text){
// 	// 首先当只有一个的时候，判断为真
// 	if(text.length<=1){
// 		return true
// 	}
// 	//设定跳出条件，当首位两个元素一旦为不相同的字符时候，即可判断为false
// 	if(text.charAt(0)!=text.charAt(text.length-1)){
// 		return false
// 	}
// 	//再一次调用函数
// 	return isPalindrome(text.substr(1,text.length-2))
// }


function isPalindrome(text){
	for(var i=0;i<text.length/2;i++){
		if(text[i]!==text[text.length-i-1]){
			return false;
		}
	}
	return true;
}

console.log(isPalindrome("avwva"))












