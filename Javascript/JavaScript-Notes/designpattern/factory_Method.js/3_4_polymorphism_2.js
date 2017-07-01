function Add(){
	function zero(){
		return 10;
	}

	function one(num){
		return 10+num;
	}

	function two(num1,num2){
		return num1+num2;
	}
	
	this.add = function(){
		var arg = arguments,
			len = arguments.length;
		switch(len){
			case 0:
				return zero();
			case 1:
				return one(arg[0]);
			case 2:
				return two(arg[0],arg[1]);
		}
	}
}

var a = new Add();
console.log(a.add())
console.log(a.add(1))
console.log(a.add(1,2))
