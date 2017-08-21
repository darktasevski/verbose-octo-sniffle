setTimeout(function() {
	console.log('3 seconds have passed.');
}, 3000);
// After 3 seconds, it'll print, "3 seconds have passed".

var time = 0;
var timer = setInterval(function(){
	time += 2;
	console.log(time + ' seconds have passed.');
	if (time > 5){
		clearInterval(timer);
	}
}, 2000);
// 2 seconds have passed.
// 3 seconds have passed.
// 4 seconds have passed.
// 6 seconds have passed.

console.log(__dirname);
/*
/Users/Caitly/Desktop/JavaScriptSummerElevenFifty/jsfundamentals
*/

console.log(__filename);
/* 
/Users/Caitly/Desktop/JavaScriptSummerElevenFifty/jsfundamentals/0.11.4_the-global-object_node.js
*/

// We'll cover require and exports later.








