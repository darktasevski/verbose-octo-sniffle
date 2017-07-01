(function(){  // wrap in a closure is good pactice
    var app = angular.module("housesControllerModule", []);

    app.controller('housesController', [ '$http', '$scope', function($http, $scope){
        $scope.foo = "bar2";
    }]);
})();
