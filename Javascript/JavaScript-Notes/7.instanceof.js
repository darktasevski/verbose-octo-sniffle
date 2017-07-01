
var a = Date.now()
console.log(a)

function Point(x,y){
	this.x=x;
	this.y=y;
}
function Circle(x,y,r){
	Point.call(this,x,y);
	this.radius = r;
}

Circle.prototype = new Point();
Circle.prototype.constructor = Circle;

var c = new Circle(1,1,2);
console.log(c instanceof Circle)
console.log(c instanceof Point)

/**
 * Object.prototype.toString.call
 * -------------------------------
 * 可以识别标准类型以及内置对象（built-in）对象类型
 * 不能识别自定义对象类型
 */
console.log(Object.prototype.toString.call(123))
console.log(Object.prototype.toString.call("string"))
console.log(Object.prototype.toString.call(function(){}))

//封装一个识别类型的函数
function type(obj){
	return Object.prototype.toString.call(obj).slice(8,-1)
}
//test
console.log(type(123))
console.log(type("123"))
console.log(type(function(){}))
console.log(type(null))
console.log(type(/\d/))
console.log(type([]))
console.log(type({}))
console.log(type(undefined))
console.log(type(true))
//

/**
 * constructor||构造函数本身
 */
console.log("jerry".constructor)
console.log([].constructor==Array)


function getConstructorName(obj){
	return obj&&obj.constructor&&obj.constructor.toString().match(/function\s*([^(]*)/)[1];
}

console.log(getConstructorName({}))
console.log(getConstructorName([]))
console.log(getConstructorName(null))
console.log(getConstructorName(undefined))

var b = Date.now()
console.log(b)
//花费时间数
console.log(b-a)
















