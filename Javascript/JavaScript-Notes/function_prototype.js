//构造函数的prototype
function Ninja(){}
Ninja.prototype.swingSword = function(){
	return true;
}

var ninja1 = Ninja()
console.log(ninja1)

var ninja2 = new Ninja()
console.log(ninja2,ninja2.swingSword())