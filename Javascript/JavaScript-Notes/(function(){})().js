// (function(){})()能够封存作用域,即使全局变量都会封存
(function(){
	this.a = function(x){
		var a = 2;
		console.log(a+x)
	}
})();

(function(){
	this.b = function(x){
		var a = 4;
		console.log(a+x)
	}
})();