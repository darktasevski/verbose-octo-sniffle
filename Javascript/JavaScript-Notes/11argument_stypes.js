function add(a,b){
	return a+b;
}

var myObject.double = function(){
	var that = this;
	var helper = function(){
		that.value = add(that.value,that.value);
	};
	helper();
}

myObject.double()