//用这个prototype扩展了所有Obj的方法
Object.prototype.addMethod = function(name,fn){
	// 给实例化的新对象添加新的属性；
	this[name]=fn;
	// 然后返回这个实例，since we return this(an object),of course we can operate this in a pipline;
	return this;
};

//new一个对象 
var a = new Object();
//给这个对象通过addMethod添加新的方法,传入的参数包括这个方法名和匿名函数
a.addMethod("checkEmail",function(){
	console.log("I 'm checking checkEmail");
	//返回这个对象
	return this;
}).addMethod("checkPassword",function(){
	console.log("I am checking Password");
	return this;
}).addMethod("fuckingLearning",function(){
	console.log("I am fucking learning the damn JavaScript! ")
})

a.checkEmail().checkPassword().fuckingLearning()