(function(){  // wrap in a closure is good pactice
    var app = angular.module("carsDirectiveModule", []);

    app.directive('cars', function(){
        return {
            restrict: 'E',  // 'A'  // element, attribute
            templateUrl: 'cars.html',
            controllerAs: 'user'  // controller alias
        };
    });

})();
