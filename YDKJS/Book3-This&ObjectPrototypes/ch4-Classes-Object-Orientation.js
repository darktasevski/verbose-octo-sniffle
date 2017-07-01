/* Classes (aka Object Orientation)

* Javascript does not have inherent classes

A class is a blueprint. Objects must be built ("instantiated", instance of) from classes. 
*/

// Class instances are constructed by special method of the class, called a "constructor"

// Pseudo-code:
class CoolGuy {
  specialTrick = nothing;

  CoolGuy(trick) {
    specialTrick = trick;
  } // The constructor, called by "new"

  showOff() {
    output("Here's my trick: ", specialTrick);
  }
}

// To make a "CoolGuy" instance, call the class constructor:
Joe = new CoolGuy("jumping rope");
Joe.showOff() // Here's my trick: jumping rope

// Class Inheritance
// Parent class => child class
// Pseudo-code:
class Vehicle {
  engines = 1;

  ignition() {
    output("Turning on my engine.");
  }

  drive() {
    ignition();
    output("Steering and moving forward!");
  }
}
class Car inherits Vehicle {
  wheels = 4;

  drive() {
    // Referencing inherited copy, then creating own method ("relative polymorphism")
    inherited: drive();
    output("Rolling on all ", wheels, " wheels!");
  }
}

class SpeedBoat inherits Vehicle {
  engine = 2;

  ignition() {
    output("Turning on my ", engines, " engines.");
  }

  pilot() {
    inherited: drive();
    output("Speeding through the water with ease!");
  }
}

// Child classes only receive copies of their parent class. Class inheritance implies copies.

/* 
  Mixins
*/

// JS objects do not automatically perform copy behavior. Objects don't get copied to others, they get *linked* together.

// Explicit Mixins
// Create utility to manually copy behavior from Vehicle to Car

function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    // Only copy if not already present
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }
  return targetObj;
}

var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log("Turning on my engine.");
  },
  drive: function() {
    this.ignition();
    console.log("Steering and moving forward!");
  }
};

var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function() {
    Vehicle.drive.call(this);
    console.log("Rolling on all " + this.wheels + " wheels!");
  }
});

// Parasitic inheritance
function Vehicle () {
  this.engines = 1;
}
Vehicle.prototype.ignition = function () {
  console.log("Turning on my engine.");
};
Vehicle.prototype.drive = function() {
  this.ignition();
  console.log("Steering and moving forward!");
};

// Parasitic Class `Car`
function Car() {
  // first, `car` is a `Vehicle`
  var car = new Vehicle();

  // now, modify `car` to specialize it
  car.wheels = 4;

  // Save a privileged reference to `Vehicle::drive()`
  var vehDrive = car.drive;

  // override `Vehicle::drive()`
  car.drive = function() {
    vehDrive.call(this);
    console.log("Rolling on all " + this.wheels + " wheels!");
  };
  return car;
}
var myCar = new Car();
myCar.drive();

// Implicit mixins
var Something = {
  cool: function() {
    this.greeting = "Hello!";
    this.count = this.count ? this.count + 1 : 1;
  }
};
Something.cool();
Something.greeting; // "Hello!"
Something.count; // 1

var Another = {
  cool: function() {
    // implicit mixin of `Something` to `Another`
    Something.cool.call(this);
  }
};
Another.cool();
Another.greeting; // "Hello!"
Another.count; // 1 (Does not share state with `Something`, if it did, count would be 2)