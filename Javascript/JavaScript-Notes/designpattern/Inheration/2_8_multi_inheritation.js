/**
 * 多继承
 */

var mix = function(){
	var i = 1,
		len = arguments.length,
		target = arguments[0],
		arg;
	//遍历被继承的对象
	for(;i<len;i++){
		//缓存当前对象
		arg = arguments[i];
		//遍历被继承对象中的属性
		for(var property in arg){
			//将被继承对象中的属性复制到目标对象中；
			target[property]=arg[property];
		}
	}
	return target;
}
//mix方法的作用就是讲传入的多个对象的属性复制到源对象中，这样可以实现对多个对象属性的继承
Object.prototype.mix = function(){
	var i = 1,
		len = arguments.length,
		arg;
	for(;i<len;i++){
		//缓存当前对象
		arg = arguments[i];
		for(var property in arg){
			this[property] = arg[property];
		}
	}
};

var book = {
	name:"JavaScript设计模式",
	alike:["css","html","JavaScript"]
}

var anotherBook = {
	color:"blue"
}


var otherBook={};
otherBook.mix(book,anotherBook);
console.log(otherBook);