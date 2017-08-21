// define a constructor function ,and return the object
//创建一个构造函数，并且返回对象
function createBook(name,time,type){
	var o = new Object();
	o.name = name;
	o.time = time;
	o.type = type;
	o.getName = function(){
		console.log(this.name);
	}
	//return the object instance;
	return o;
}

var book1 = createBook("js book",2012,"js");
book1.getName();
console.log(book1.type)
console.log(book1.time)