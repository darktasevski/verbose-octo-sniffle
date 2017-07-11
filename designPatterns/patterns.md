

## Constructor Patterns

#### These are used to create new objects with their own scope.

Constructor pattern usually uses the __new__ keyword, and the __new__ keyword does a few thing when you drop it out in front of the function, while it also creates a *constructor* function. Things that __new__ keyword do:
    * Creates a brand new object 
    * Links that object to an object prototype
        * an encapsulation of properties that an object links to
    * Binds this to the new object's scope
    * Implicitly returns this


### Module pattern 

 This one is used as a simple way to encapsulate a group of methods.
 This one is most used for a database calls, as a service for HTTP calls or for API calls. At its core its just a basically an object literal.

    ```
    var Module = {
        var privateVar = "I'm private";
        return {
            method: function(){...},
            nextMethod: function(){...}
        }
    }
    ```

 Think of it like a toolbox:

 * Simple way to encapsulate a bunch of similar methods,
 it basically creates a toolbox of functions to use.
 * Big difference between Constructor pattern and Module pattern is that when we are working with Module pattern we re only going to have one of something(service/database).

 ### Factory pattern

 A pattern used to simplify object creation.
 
 * Simplifies object creation
 * Creating different objects based on need
 * Repository creation

 ### Singleton pattern

 Used to restrict an object to one instance of that object across the application.
The way a Singleton works is:

 * Remembers the last time you used it
 * Hands back the same instance you used before

 Node.js while using Common.js are doing Singleton all the time. Its cashing module every time we require it, and when we request it, Node is giving us same cashed version of module. Angular.js also uses this.

 ## Structural Design patterns

 These patterns are concerned with how object are made up and simplify relationships between objects.
 I this kind of pattern is all about relationships between objects. 

 * Deal with the relationship of the object in two ways:
    * Extending functionality of the object 
    * Simplifying functionality of the object
* Decorator pattern ( extends the functionality of the object)
* Flyweight pattern ( simplifying functionality of the object)
* Facade pattern ( simplifying functionality of the object)

### Decorator pattern 

Used to add new functionality to an existing object, without being obtrusive.

* More complete inheritance 
* Wraps an object 
* Protect the existing object
* Allows extended functionality 

### Facade pattern

Used to provide a simplified interface to a complicated system. Its like a front of the building( like name is suggesting ), hiding the backend chaos from us and providing us with clean and simple interface to interact with that chaos. jQuery is probably the most well-known implementation of a Facade pattern, because at its core all that jQuery does is to sit on top of the DOM and give you a simple, clean interface to interact with it, instead of having to do all the nasty Js you might have to do change the name of the button or the class of something.

Difference between Facade pattern and Decorator pattern is that we re not adding functionality with Facade, while Decorating pattern was actually adding and manipulating the functionality of the original task, Facade is not adding anything, just covering and creating a better interface for almost the same functionality.

### Flyweight pattern

Conserves memory by sharing portions of an object between objects.

Our tasks have a lot of non-unique data, and what Flyweight is doing to help with that is sharing data across objects, so that we only do that once. Kind of like working with object prototypes, where instead of creating a whole bunch of similar functions for every task, we just add them to prototype. In the end Flyweight results in a smaller memory footprint, which is always god for browsers and especially for mobile devices.

But its only useful if we are working with a large number of objects, in example if we are working with 500-1000 objects, unless the objects are really large, its not going to do you a lot of good.

## Behavioral design patterns

These patterns are concerned with the assignment of responsibilities between objects and how the communicate.

* Dealing with the responsibilities of objects 
* Help objects cooperate
* Assigns clear hierarchy
* Can encapsulate requests between objects

### Observer pattern 

Allows the collection of objects to watch an object and be notified of changes

* Allows for loosely coupled systems 
* One object is the focal point
* Group of objects watch for changes 

``` 
//  subject         LOGGING   // observers
TASK                NOTIFICATION
                    AUDITING
```
We are going to Decorate task with the list of the observers and a Notify() method. And when something happens on task, Notify() will send the message to each of these three services( observers).