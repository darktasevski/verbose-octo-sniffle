// I STILL NEED TO TEST THIS OUT......


// http://www.dofactory.com/javascript/design-patterns


// have a person object, that has a accept(visitor) method
// have a visitor object that has a visit(person) method

// a visitor is just like an external helper...

// the story is:  person, have a habit of acceptiong visitors
//    and the visitors will change stuff around your life!

// main object
function Person(name, num){
    this.num = num;
    var self = this;

    this.getNum = function(){
        return this.num;
    }

    this.setNum = function(num){
        this.num = num;
    }

    this.accept = function(visitor){
         visitor.visit(self);
    }
}

// visitor
function Visitor(){
    this.visit = function(person){
        person.setNum(person.getNum() + 1000);
    }
}

// run
var brian = new Person('brian', 10);
var visitor = new Visitor();
brian.accept(visitor);
brian.getNum();


