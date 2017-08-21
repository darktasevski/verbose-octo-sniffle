// 通过Function 的 prototype 扩展 Funcition作为构造函数的方法addMethod的方法
Function.prototype.addMethod = function(name,fn){
	// 将fn赋值给this
	this[name]=fn;
	// 返回 this就是返回这个方法
	return this;
}

// new一个function对象
var a = new Function();
console.log(a)

//因为返回this,就可以通过级联的方式添加方法

a.addMethod("checkName",function(){
	console.log("I am checking name");
	return this;
}).addMethod("checkEmail",function(){
	console.log("I am checking Email");
	return this;
}).addMethod("checkPassword",function(){
	console.log("I am checking Password");
	return this;
})

//通过级联的方式调用方法
a.checkName().checkEmail().checkPassword()