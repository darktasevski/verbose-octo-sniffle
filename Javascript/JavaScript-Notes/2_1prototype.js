//Book作为构造函数存在
var Book = function(id, bookname, price){
	this.id = id;
	this.bookname = bookname;
	this.price = price;
}
//函数原型链上添加方法
Book.prototype= {
	showBooKName : function(){return this.bookname;},
	showId : function(){return this.id;},
	showPrice: function(){return this.price;}
}


var abook = new Book(1,"JavaScript Design Pattern",28.3);
console.log(abook.showBooKName());
console.log(abook.showId());
console.log(abook.showPrice())


console.log(Book.prototype.constructor);