(function(){
    angular.module('myApp')
        .config(function($routeProvider){
            $routeProvider.when('/notes', {
                templateUrl: '/templates/pages/notes/index.html',
                // controller: 'xxx',
                // controllerAs: 'x'
            })
            .when('/notes2', {
                templateUrl: '/templates/pages/notes/index2.html'
            })
            .otherwise({
                redirectTo: '/'
            });
        });
})();
