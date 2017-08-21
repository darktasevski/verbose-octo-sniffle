// Object Constructors

// Let's make our object constructor:
var Car = function(maxSpeed, driver) {

	this.maxSpeed = maxSpeed;
	this.driver = driver;
	this.drive = function(speed, time) {
		console.log(speed * time);
	};
	this.logDriver = function() {
		console.log("The driver's name is " + this.driver + ".");
	};
}
// Call the constructor function and create new objects:
var myCar = new Car(70, "Ninja Woman");
var myCar2 = new Car(40, "Ninja Man");
var myCar3 = new Car(50, "Ninja Teen");
var myCar4 = new Car(30, "Ninja Dog");

myCar.drive(30, 5);		// 150
myCar3.logDriver();		// The driver's name is Ninja Teen.