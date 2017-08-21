var essay = (function(objr){
	//console.log(arguments)
	//console.log(objr.name);
	//console.log(objr.say);
	return objr
})({"name":"content","say":"hello"})

//立即执行函数，并且pass a object to the function as a instant funciton

console.log(essay)


//执行函数的两种方式；
//第一种：eval(script)
eval("scriprt");
//第二种:立即执行函数
(function(){})();