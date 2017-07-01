(function(){  // wrap in a closure is good pactice
    var app = angular.module("formControllerModule", []);

    app.controller('formController', function(){

        this.myData = {foo: "hello, its me"};

        this.addReview = function(x) {
            // x.push(this.myData);
            // array.push(item)
            console.log(x);
            this.myData = x;
            console.log(this.myData);
        };
    });

})();
