myObject.double = function(){
	var that = this;
	var helper = function(){
		that.value = add(that.value,that.value);
	};
	helper();
}