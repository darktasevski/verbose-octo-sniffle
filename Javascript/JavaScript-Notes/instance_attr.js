function Ninja(){
	this.swung = false;
	this.swingsword = function(){
		return !this.swung;
	}
}

Ninja.prototype.swingsword = function(){
	return this.swung;
}

var ninja1 = new Ninja();
console.log(ninja1.swingsword())

// 优先级：
// 	1.在构造器函数内给对象添加的属性
// 	2.通过原型给对象实例添加的属性
