(function(){  // wrap in a closure is good pactice
    var app = angular.module("usersControllerModule", []);

    app.controller('usersController', function($scope){
        $scope.foo = "bar1";
    });
})();
