//1.多个全局变量
//2.建一个函数来修改和维护多个全局变量的值

var number1 = 0;
var number2 = 0
function add(num){
	num++;
	console.log(num)
}

//对全局变量应用函数
add(number1);
add(number2);
//打印全局变量,全局变量未发生变化
console.log(number1) //0
console.log(number2) //0

/**
 * 解决办法
 */

var Obj={number1:0,number2:0}

function object_add(obj){
	for(var key in obj){
		obj[key]++;
	}
}

object_add(Obj);
console.log(Obj);//均没有发生变化

