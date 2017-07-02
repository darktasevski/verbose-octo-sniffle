//子类化原生对象

function myArray(){};
myArray.prototype = new Array();
//MyArray是一个构造函数
var mine = new MyArray()
mine.push(1,2,3)
console.log(mine.length)



