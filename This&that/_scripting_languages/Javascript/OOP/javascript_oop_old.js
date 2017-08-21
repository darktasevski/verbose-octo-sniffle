//----------------------------------------------------------------------------------------- class variables and methods

function Person(name){
    this.name = name;
}

Person.specie = "Human"; // class variable

Person.breathe = function(){ // class method
	// `this` in here referes to the class, not the instance!
	return "I am breathing..."
};

Person.specie; // "Human"
Person.breathe(); // "I am breathing..."

brian = new Person('brian');
brian.specie; // undefined  (since 'specie' is not an 'instance variable')
brian.breathe(); // Uncaught TypeError: brian.breathe is not a function(…)  (since 'breathe()' is not an 'instance method')

brian.constructor.specie; // "Human"
brian.constructor.breathe(); // "I am breathing..."

//----------------------------------------------------------------------------------------- JavaScript OOP
// PROTOTYPE: is the master object from where all instances are cloned!

function Human(name){ // base class (and a constructor function)
    var lifespan = 100; // internal variable (it will not be available outside the class definition)
    this.name = name; // instance variable

    this.walk = function(speed){ // instance method
        console.log("walking " + speed + "!")
    }
    this.eat = function(food){  // instance method
        console.log("Yummy " + food + "!")
    }
}

Human.planetOfOrigin = "Earth"; // class variable
Human.planetOfOrigin; //  "Earth"

Human.goToSpace = function(){ // class method
    // `this` in here referes to the class, not the instance!
    return "I am going to space..."
};

Human.goToSpace(); // "I am going to space..."


function Person(name, age){ // derived class  (and a constructor function)
    var country = "USA";  // class variable
    this.name = name; // instance variable
    this.age = age; // instance variable

    this.socialize = function(who){  // instance method
        console.log("hello " + who + "! how are ya?");
    }

    this.getName = function(){  // instance method
        console.log(this.name);
    }

    this.getAge = function(){  // instance method
        console.log(this.age);
    }

    this.getCountry = function(){  // instance method
        console.log(country);
    }
}

//---------------------------------------------------

Person.prototype; // Object {}

Person.prototype = new Human;  // inheritance (Person instance will inherit from Human)

Person.prototype.foo = "bar";  // add aditional stuff ouside of a definition!  (Adding to the Base class ???)
Person.prototype.foo; // "bar"   (now all future instances will have the foo property!)



var brian = new Person("Brian Spinos", 27);
brian.getName(); // "Brian Spinos"
brian.getAge(); // 27
brian.getCountry(); // "USA"
brian.socialize("Erich"); // "hello Erich! how are ya?"
brian.walk("fast"); // "walking fast!"  (inherited from the Human BASE class)
brian.eat("burger"); // "Yummy burger!" (inherited from the Human BASE class)

brian.foo; // "bar"
brian.__proto__; // access the PROTOTYPE (the master object that instances get cloned)
// brian.prototype; // undefined (this is NOT how we access the PROTOTYPE)
brian.__proto__.bar = 123;  // adding properties to the BASE class through the instance
brian.__proto__.bar; // 123
brian.bar  // 123

brian.constructor == Human; // true

brian instanceof Person;     // true
brian instanceof Human; // true

//-----------------------------------------------

// constructor function
function Person(name){
    this.name = name

    this.talk = function(){
        console.log('Hi, my name is ' + this.name + '!');
    }
}

var brian = new Person('brian');

// adding instance methods to ALL existing and future instances 
// through the BASE class (but weirdly it will not add the function definition to the base class)
// (actually adding a function to the PROTOTYPE)
Person.prototype.swim = function(){ 
    console.log('I am swimming!');
}

// adding instance methods to ALL existing and future instances 
// through the instance (but weirdly it will not add the function definition to the base class)
// (actually adding a function to the PROTOTYPE)
brian.__proto__.run = function(){ 
    console.log('I am running!');
}


brian.talk(); // Hi, my name is brian!
brian.swim();  // 'I am swimming!'
brian.run();  // 'I am running!'


brian.__proto__  //  the 'parent object'
brian.__proto__  === Person.prototype // true
brian.__proto__.constructor === brian.constructor // true
brian.constructor // the constructor function: function Person(...){ ...}  // same as brian.__proto__.constructor
brian.constructor === Person


typeof brian.__proto__  // "object"
typeof Person.prototype  // "object"
typeof Person  // "function"
