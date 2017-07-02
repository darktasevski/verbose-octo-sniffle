// 3种匿名函数的方式
window.onload = function(){
	console.log("loaded");
}

// 对象的属性
var ninja = {
	shout:function(){
		console.log("shout out");
	}
}

ninja.shout()

// callback function
setTimeout(
	function(){
		console.log("shout out the name after 5 second!")
	},5000
)