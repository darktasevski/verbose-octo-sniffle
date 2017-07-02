/**
 * 调用函数的方式有4种
 * 第一种：声明函数调用函数
 * 	作用域是全局
 * 第二种：在对象内声明方法，然后调用方法
 *	作用域是函数内部
 * 第三种：new关键字调用构造函数
 *	作用域是返回的这个新的构建的对象
 * 第四种：call()和 apply()
 *	作用域可以由自己来指定，同时选用更好地传入参数列表的方法。
 */

function juggle(){
	var result = 0;
	for(var n=0;n<arguments.length;n++){
		result += arguments[n];
	}
	this.result = result;
}
var ninja1 = {};
var ninja2 = {};

juggle.apply(ninja1,[1,2,3,4]);
juggle.call(ninja2,5,6,7,8);

console.log(ninja1.result)
console.log(ninja2.result)