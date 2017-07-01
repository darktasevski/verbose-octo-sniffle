/**
 * callee()
 */
//返回匿名函数本身，常用于实现阶乘递归
console.log(
	(function(i){
		if(i==0){
			return 1;
		}
		return i * arguments.callee(i-1);
	})(5)
);

//同时考察(function(){})()这种用法
console.log(
	(function(w){
		return w;
	})(5)
);

var m = (function(i){
	return 3*i;
})(5)

console.log("m",m)