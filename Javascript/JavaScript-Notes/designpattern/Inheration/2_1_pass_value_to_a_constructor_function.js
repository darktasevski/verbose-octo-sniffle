var Book = function(id, bookname, price){
	this.id = id;
	this.bookname = bookname;
	this.price = price;
}
//extends the prototype of function Book
Book.prototype= {
	showBooKName : function(){return this.bookname;},
	showId : function(){return this.id;},
	showPrice: function(){return this.price;}
}

//Funciton Book as a constructor

var abook = new Book(1,"JavaScript Design Pattern",28.3);
console.log(abook.showBooKName());
console.log(abook.showId());
console.log(abook.showPrice())
console.log(Book.prototype.constructor);
