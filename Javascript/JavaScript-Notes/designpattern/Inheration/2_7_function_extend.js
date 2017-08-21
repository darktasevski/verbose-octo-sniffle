/**
 * function extend(target,source) 扩展target对象的属性，source对象的属性
 * @param  {[type]} target [object]
 * @param  {[type]} source [object]
 * @return {[type]}        [return the object]
 */

var extend = function(target,source){
	//traverse the source object attribute
	for(var property in source){
		target[property] = source[property];
	}
	return target;
}

var book = {
	name:"JavaScript设计模式",
	alike:["css","html","JavaScript"]
}

var anotherBook = {
	color:"blue",
	getName:function(){
		console.log("anotherBook");
	}
}

extend(anotherBook,book);
anotherBook.getName()