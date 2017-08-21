function SuperClass(id){
	this.book = ['wangdejun',"html","css"];
	this.id = id;
}

SuperClass.prototype.showBooks = function(){
	console.log(this.books);
}

function SubClass(id){
	SuperClass.call(this, id);
}

//创建第一个 子类实例
var instance_1 = new SubClass(10);

var instance_2 = new SubClass(11);


console.log(instance_1.books)