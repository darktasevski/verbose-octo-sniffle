/**
 * 组合式继承
 * @param {[type]} name [description]
 */

function SuperClass(name){
	// 值类型公有属性
	this.name = name;
	// 引用类型公有属性
	this.books = ["html","css","Javascript"];
}

SuperClass.prototype.getName = function(){
	  console.log(this.name);
    return this.name;
}

//声明子类
function SubClass(name,time){
	// 构造函数式继承父类name属性
	SuperClass.call(this,name);
	//子类中新增公有属性
	this.time = time;
}

SubClass.prototype.getTime = function(){
	console.log(this.time);
};

var instance1 = new SubClass("js book",2014);
instance1.books.push("设计模式")
console.log(instance1.books);
instance1.getTime();
