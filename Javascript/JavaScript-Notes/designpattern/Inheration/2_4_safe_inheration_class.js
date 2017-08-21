//一个 不安全的类
var Book_1 = function(id, name, price){
	this.id = id;
	this.name = name;
	this.price = price;
}

var book_1 = Book_1(12,"The Ocean",1233.1);
console.log(book_1);


//一个安全的类，在类内部进行检查
var Book_2 = function(id, name, price){
	if(this instanceof Book_2){
		this.id = id;
		this.name = name;
		this.price = price;
	}else{
		return new Book_2(id, name, price);
	}
}

var book_2 = Book_2(112,"The Ocean",1233.1);
console.log(book_2);