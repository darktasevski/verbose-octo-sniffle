//我们有时候经常将类的静态变量通过闭包来实现；
var Book = (function(){
	var bookNum = 0;
	function checkBookNum(){
		console.log("I am checking the number of  the book !");
	};

	function _book(newId,newName,newPrice){
		var name ,price;
		function checkId(id){
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
		//公有属性
		this.id = newId;
		//
		this.copy = function(){};
		bookNum++;
		if(bookNum>100)
			throw new Error("我们仅仅出版了100本书");
		//the consotructor
		this.setName(name);
		this.setPrice(price);
	};

	_book.prototype = {
		isJsBook:false,
		display:function(){}
	};
	//返回类
	return _book;
})();

var a = new Book(12,"wangdejun",133.2)
console.log(a.id)
a.setName("wangdejun new bookName")
console.log(a);






