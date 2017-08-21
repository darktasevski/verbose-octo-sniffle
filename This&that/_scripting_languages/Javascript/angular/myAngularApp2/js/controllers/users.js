(function(){  // wrap in a closure is good pactice
    var app = angular.module("usersControllerModule", []);

    app.controller('usersController', function($scope){
        $scope.greetings = 'hello there!'
        this.foo = "bar";
        this.myObject = {name: 'brian', age: 27};
        this.the_boolean = true;
        this.collection = [
            {field: "brian"},
            {field: "erich"}
        ];
        this.money = 1234.56;
        this.dog_image = "http://images2.fanpop.com/images/photos/7100000/Brian-brian-griffin-7101086-565-464.gif";

        this.showMessage = function(){
            alert('hello ' + this.foo + '!');
        }

        // tab stuff
        this.tab = 1;
        this.tab1Content = "hello1";
        this.tab2Content = "hello2";
        this.tab3Content = "hello3";

    });

})();
