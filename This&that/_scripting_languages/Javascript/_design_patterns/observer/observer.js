/**
 * observer pattern
 * 
 * subject - also called publisher (example: a button, a timmer, a view of MVC)
 *      the subject will maintain a list of observers
 * 
 * observer - also called subscribers, the listener, the one observing the subject
 * 
 * pub-sub is based on observer patterns
 * 
 * when to use observer pattern:
 *      when you need other objects to receive an update when another object changes
 * 
 * cons - the subject may send updates that are of no importance for the observer
 * 
 * the interface: 
 *   subject: addObserver(o), removeObserver(o), notifyObservers()
 *   observer: update()
 * 
 */
function Subject(value){
    var self = this;
    this.observers = [];

    this.foo = value;

    this.addObserver = function(o){
        if(o != null){
            this.observers.push(o);
        }
    }

    this.removeObserver = function(o){
        if(o != null){
            var index = this.observers.indexOf(o);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        }
    }

    this.notifyObservers = function(){
        this.observers.forEach(function(ob){
            ob.update(self);
        });
    }

    this.update = function(value){
        this.foo = value;
        this.notifyObservers();
    }
}

function Observer(){
    this.update = function(subject){
        console.log('foo: ' + subject.foo);
    }
}


//-------
var subject = new Subject('abc');

var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();


subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);

subject.update('xyz');


/**
 * output (of each observer)
 * foo: xyz
 * foo: xyz
 * foo: xyz
 */
