angular.module('myapp').config(function($routeProvider){
    $routeProvider
        .when('/partial1', {
            templateUrl: '/myView1.html',
            controller: "usersController",
            // redirectTo: '/foo',
        })
        .when('/partial2', {
            templateUrl: '/myView2.html',
            controller: "usersController",
            // redirectTo: '/foo',
        })
});