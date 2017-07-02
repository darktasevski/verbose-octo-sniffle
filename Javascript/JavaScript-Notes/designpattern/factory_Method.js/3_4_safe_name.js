var Demo = function(name){
	this.name = name;
	if (!(this instanceof Demo)){
		return new Demo();
	}
}

Demo.prototype = {
	show : function(name){
		console.log(name+"show successfully")
	}
}

var d = Demo("wangdejun")
d.show()