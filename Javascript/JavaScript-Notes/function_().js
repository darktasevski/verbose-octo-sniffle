//作用域
(function(){
	this.test = function(x){
		return x
	}
	this.assert = function(value,right,wrong){
		if(value){
			return right
		}else{
			return wrong
		}
	}
})();

a(10)
b(10)

test(12)
assert(true,"测试正确","测试错误")