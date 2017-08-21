function Animal(){
	this.isAnimal = true;
}

function Human(){
	this.isHuman = true;
}

function Bird(){
	this.isBird = true;
}

function Person(){
	this.isPerson = true;
}

animal = new Animal();
human = new Human();

bird1 = new Bird();
bird2 = new Bird();

person1 = new Person();
person2 = new Person();

Animal.prototype; // Object {}
Human.prototype; // Object {}
bird1.__proto__; // Object {}
person1.__proto__; // Object {}
bird2.__proto__; // Object {}
person2.__proto__; // Object {}



person1.isHuman; // undefined
person1.__proto__ = human; // prototype set ONLY for that instance, not other instances
person1.isHuman; // true
person2.isHuman; // undefined


Person.prototype = human; // prototype set for all future instances! not passed instances
person3 = new Person();
person3.isHuman; // true
person2.isHuman; // undefined



bird1.isAnimal; // undefined
bird1.__proto__ = animal;  // prototype set ONLY for that instance, not other instances
bird1.isAnimal; // true
bird2.isAnimal; // undefined


Bird.prototype = animal; // prototype set for all future instances! not passed instances
bird3 = new Bird();
bird3.isAnimal; // true
bird2.isAnimal; // undefined

