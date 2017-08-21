# Chapter 4. Mixing (up) "Class Objects

* Class concepts don't map well in JavaScript
* Some key concepts are instantiation, inheritance, and polymorphism

## Class Theory

* OO (or class-oriented) programming says that data intrinsically has behavior associated with it
  * Because of this, we encapsulate the data and behavior together. This is called *Data Structors* in formal computer science.
    * An example of a data structure is the String class. The characters are the data and the methods (getting length, specific characters, etc) all act on that data. This is packaged up into the String class and all strings are just an instance of it.
* Classes also imply a way of *classifying* a certain data structure. Think of this as any data structure being a specific implementation of a more general base.

* A Car is a specific implementation of a more general class of thing, called a Vehicle
* In software, we would have a Car class and a Vehicle class
* The Vehicle class would include things like:
  * Engine
  * Ability to carry people and things
* What is defined in Vehicle are things that are common to all (or most) different types of Vehicles
* It might not make sense to define things like "ability to carry people" over and over again for each type of Vehicle. Instead, it's defined once in Vehicle, and then inherited by the different types of Vehicle. The different types are said to specialize the general Vehicle definition.

* Polymorphism is the ability for the child class to override the behavior of the parent class
  * Relative polymorphism lets us reference the base behiavior even after it's overridden
    * This is apparently a pain to do in JavaScript

### "Class Design Pattern
* A Class is a design pattern
  * Other popular design patterns are:
    * Iterator, Observer, Factory, Singleton

* It's commonly taught that classes are the proper way to transform proceduarl-style "spaghetti code" into well organized code.
  * There are many proper ways to organize code, functional programming being one of them
  * Some languages like Java aren't designed to give you a choice. Everything has to be tied to a class.
  * Other languages like C/C++ or PHP give both proceduarl and class-oriented syntaxes and it's left to the developer to decide.

### JavaScript "Classes"
* JavaScript doesn't have Classes
* Since classes are just a design pattern, you can implement them, although it might be more trouble than it's worth.
* JavaScript does have a Class keyword, but it's just syntactic sugar for something very different happening under the hood.

## Class Mechanics

### Building
* A traditional metaphor for *class* and *instance* based thinking comes from building construction.
* An architech constructs blueprints
  * These blueprints describe all of the characterists of a building
    * How wide, how tall, how many windows and in what locations, the type of materials to use, etc
* The blueprints are only plans describing what should be built. They don't constitute a building where you can walk in and sit down. For that you need a builder.
* The builder takes the plans and makes an exact copy of the building with them. The builder can then move to the next lot and make another copy.
* In this metaphor the blueprint is a Class
  * To get anything to work with, we must build (or instantiate) something from the class
  * The class makes an object (an instance) which we can directrly call methods on and access any public data as necessary
* The relationship between a class and it's instance is indirect. You can't use a class to do anything with it's instance and you can't use an instance to modify the class.

### Constructor
* Constructors are special methods of the same name as it's class
* Thier job is to initialize any information (state) that the instance will need

```javascript
// Pseudocode
  class Coolguy {
    specialTrick = nothing

    Coolguy(trick) {
      specialTrick = trick
    }

    showOff() {
      output("Here's my trick", specialTrick)
    }
  }

  Joe = new CoolGuy("jumping rope")
  Joe.showOff()
  //-> Here's my trick: jumping rope
```

* When we call *new Coolguy()*, the class returns an object which is an instance of the class
* Constructors always have to be called with *new* to construct an object

## Class Inheritance
* Class oriented languages can have a class that inherits from another class
  * This relationship is said to be a parent-child relationship
* A child class contains an intial copy of the behavior from the parent, but can override any of them and even define new behavior.

```javascript
// Pseudocode
Class Vehicle {
  engines = 1

  ignition() {
    output('turning on my engine.');
  }

  drive() {
    ignition();
    output('Stearing and moving forward!');
  }
}

Class Car inherits Vehicle {
  wheels = 4

  drive() {
    inherited:drive();
    output('Rolling on all ', wheels, ' wheels!')
  }
}

Class SpeedBoat inherits Vehicle {
  engines = 2

  ignition() {
    output('Turning on my ', engines, ' engines.')
  }
}
```

* Vehicle is a general base class that covers some behaviors that are common to different types of vehicles. At this point, it's just a concept.
* Car and SpeedBoat inherit the base Vehicle class, but then specialize in their own ways such as wheels, engines, and Car defining it's own drive method.

### Polymorphism
 