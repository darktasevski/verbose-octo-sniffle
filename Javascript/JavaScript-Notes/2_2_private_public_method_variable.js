/*
 * 私有属性，私有方法，特权方法，对象公有属性，和对象公共方法，构造器
 */
 
var Book = function(id,name,price){
	//私有属性
	var num = 1;
	//私有方法
	function checkId(){
		console.log("I am checking the id")
	}
	//特权方法
	this.getName = function(){
		return this.name;
	};
	this.getPrice = function(){
		return this.price;
	};
	this.setName = function(newname){
		this.name = newname;
	};
	this.setPrice = function(newprice){
		this.price = newprice;
	};
	//对象公有属性;
	this.id = id;
	//构造器
	this.setName(name);
	this.setPrice(price);
}

var abook = new Book(23,"The Ocean",26.1);
console.log(abook);
abook.setName("The China Ocean")
console.log(abook);

