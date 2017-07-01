var outervalue = "myname1"

function wrap(){
	var outervalue1 = "myname2"
	function outerFunction(){
		console.log(outervalue);
		console.log(outervalue1)
		return outervalue1
	}
	return outerFunction()
}

name = wrap()
console.log(name)

// 使用闭包时，闭包的环境信息会一直保存在内存里，所以是有开销的。
// 使用闭包的时候，闭包里 context信息会一直保存在内存里，所以是有开销的。

var outer = "wang"
function wrapper(){
	outer1 = "myname"
	function outerFunction1(){
		console.log(outer)
		console.log(outer1)
		return outer1
	}
	return outerFunction1()
}

name1= wrapper()
console.log(name1)