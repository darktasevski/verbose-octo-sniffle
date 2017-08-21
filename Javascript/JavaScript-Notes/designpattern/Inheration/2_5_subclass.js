function SuperClass(){
	this.superValue = true;
}

SuperClass.prototype.getSuperValue = function(){
	return this.superValue;
}

function SubClass(){
	this.subValue = false;
}

//子类继承父类
SubClass.prototype = new SuperClass();

SubClass.prototype.getSubValue = function(){
	return this.subValue;
};


//test
var instance = new SubClass();
console.log(instance.getSuperValue())
console.log(instance.getSubValue())

console.log(instance instanceof SuperClass)
console.log(instance instanceof SubClass)
console.log(SubClass instanceof SuperClass)

console.log(SubClass.prototype instanceof SuperClass)