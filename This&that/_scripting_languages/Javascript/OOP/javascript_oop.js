// OOP JS
function Person(name){
	var self = this,
	    klass = this.constructor;

	// constructor
	init(name);

	//
	// public
	//

	// public instance variables
	self.foo = 'bar';

	// public instance functions
	self.getName = getName,
	self.getAge = getAge,
	self.getAddress = getAddress,
	self.setName = setName,
	self.setAge = setAge,
	self.setAddress = setAddress;

	//
	// private (will all be hoisted)
	//

	// private instance variables
	var _name,
		_age, 
	    _address,
	    _password;

	// constructor
	function init(name){
		_name = name;
		klass.count++; // public class variable
	}

	// private instance functions
	function getName(){
		return _name;
	}

	function getAge(){
		return _age;
	}

	function getAddress(){
		return _address;
	}

	function getPassword(){
		return _password;
	}

	function setName(name){
		_name = name;
	}

	function setAge(age){
		_age = age;
	}

	function setAddress(address){
		_address = address;
	}

	function setPassword(password){
		_password = password;
	}
}

Person.count = 0; // public class variable

// public class function
Person.destroyAll = function(){
	console.log('Just kidding');
}

// Person.prototype = new Human;  // inheritance (Person instance will inherit from Human)

//---------------- instantiation

var brian = new Person('brian spinos');
brian.getName();


var erich = new Person('erich spinos');
erich.getName();

