/**
 * 对象的__proto__和prototype之间的区别
 * ---------------------------
 * prototype 每一个函数创建之后都有一个名字为prototype的属性，这个属性指向函数的原型对象。
 * 通过Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性）
 * Js中的任意对象都有一个内置属性[prototype],在ES5之前没有标准的方法访问这个内置属性，但是大
 * 多数浏览器支持通过proto来访问。ES5中有了对这个内置属性标准的Get方法Object.getPrototypeOf()
 * tips:Object.prototype这个对象是个例外，它的__proto__值为null
 * JavaScript里万物皆为对象，任意对象都有__proto__, 而prototype只有函数创建之后自己才有，通过该函数创建出来的对象是没有的。
 */
function test(){};
    var a = new test();
console.log("Object.prototype ===",Object.prototype);//{}
console.log("Object.__proto__ ===",Object.__proto__);//[Function]
console.log("a.__proto__===",a.__proto__)	 	 //test{}
console.log("test.prototype===",test.prototype)      //test{}
console.log(a.prototype)         //undefined
console.log(a.__proto__=== test.prototype) //true

/**
 * 原型对象prototype
 * -----------------
 * 原型对象prototype都有一个预定义的constructor属性，用来引用它的函数对象。这是一种循环引用
 */
console.log("2-----------------------")
console.log(test.prototype.constructor)         //[Function:test]
console.log(Function.prototype.constructor)     //[Function:Function]
console.log(Object.prototype.constructor)       //[Function:Object]

/**
 * （2）Tips：如何查找一个对象的constructor,就是在该对象的原型链上寻找碰到第一个constructor属性所指向的
 * 对象
 */
function Point(){}
var Circle = Object.create(Point);
console.log("3--------------------")
console.log("Circle: ",Circle)
console.log("Circle.__proto__",Circle.__proto__)
console.log(Circle.prototype)
console.log(Circle.__proto__===Point);