// you cannot share private functions with prototypes, so use a IIFE

// http://stackoverflow.com/questions/55611/javascript-private-methods

// ISSUE: no protected members, and private members need to be declared before used

var Person = (function(){

    // CONSTRUCTOR:
    function Person(name, age){
        var self = this;

        self.name = name;
        self.age = age;
    }

    // brian.pub_inst_meth_1();
    Person.prototype.pub_inst_meth_1 = function(){
        var self = this; // pointer to instance
        console.log("pub_inst_meth_1 called!");
    }

    // brian.pub_inst_meth_2();
    Person.prototype.pub_inst_meth_2 = function(){
        var self = this; // pointer to instance
        console.log("pub_inst_meth_2 called!");
    }

    // brian.pub_inst_var_1();
    Person.prototype.pub_inst_var_1 = "pub_inst_var_1 called";

    // brian.pub_inst_var_2();
    Person.prototype.pub_inst_var_2 = "pub_inst_var_2 called";

    // brian.priv_inst_meth_1();
    function priv_inst_meth_1(){
        console.log('priv_inst_meth_1 called!');
    }

    // brian.priv_inst_meth_2();
    function priv_inst_meth_2(){
        console.log('priv_inst_meth_2 called!');
    }

    // brian.priv_inst_var_1();
    var priv_inst_var_1 = 'priv_inst_var_1 here';

    // brian.priv_inst_var_2();
    var priv_inst_var_2 = 'priv_inst_var_2 here';

    // brian.pub_class_meth_1();
    Person.pub_class_meth_1 = function(){
        var klass = this; // pointer to class
        console.log('pub_class_meth_1 called!');
    }

    // brian.pub_class_meth_2();
    Person.pub_class_meth_2 = function(){
        var klass = this; // pointer to class
        console.log('pub_class_meth_2 called!');
    }

    // brian.pub_class_var_1();
    Person.pub_class_var_1 = "pub_class_var_1 var";

    // brian.pub_class_var_2();
    Person.pub_class_var_2 = "pub_class_var_2 var";

    // brian.priv_class_meth_1();
    // brian.priv_class_meth_2();
    // brian.priv_class_var_1();
    // brian.priv_class_var_2();

    return Person;
})();

//==================


var brian = new Person("brian spinos", 28);



brian.pub_inst_meth_1();
brian.pub_inst_meth_2();
brian.pub_inst_var_1;
brian.pub_inst_var_2;
// brian.priv_inst_meth_1(); // should_not_work
// brian.priv_inst_meth_2(); // should_not_work
// brian.priv_inst_var_1; // should_not_work
// brian.priv_inst_var_2; // should_not_work

// brian.pub_class_meth_1(); // should_not_work
// brian.pub_class_meth_2(); // should_not_work
// brian.pub_class_var_1; // should_not_work
// brian.pub_class_var_2; // should_not_work
// brian.priv_class_meth_1(); 
// brian.priv_class_meth_2();
// brian.priv_class_var_1();
// brian.priv_class_var_2();


// Person.pub_inst_meth_1(); // should_not_work
// Person.pub_inst_meth_2(); // should_not_work
// Person.pub_inst_var_1; // should_not_work
// Person.pub_inst_var_2; // should_not_work
// Person.priv_inst_meth_1();
// Person.priv_inst_meth_2();
// Person.priv_inst_var_1();
// Person.priv_inst_var_2();

Person.pub_class_meth_1();
Person.pub_class_meth_2();
Person.pub_class_var_1;
Person.pub_class_var_2;
// Person.priv_class_meth_1();
// Person.priv_class_meth_2();
// Person.priv_class_var_1();
// Person.priv_class_var_2();
