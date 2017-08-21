// clojures  are for private variables!!!


//------------------------------------ clojure returning a function
var user = (function(){
    var password = '123456'; // private variable!
    return function(){
        console.log('the password is: ' + password);
    }
})();
user();

//------------------------------------ clojure returning an object
var user = (function () {
    // private fields and methods
    var password = "123456";
    var print_password = function(){
        console.log('Your password is ' + password);
    }

    // return an object:
    return {
        publicfunction: function(){
            print_password();
        },
        name: "brian"
    }
})();


user.publicfunction();
user.name;
// user.print_password();  // ERROR!