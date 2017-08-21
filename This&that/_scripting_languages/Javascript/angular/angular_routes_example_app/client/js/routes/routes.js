angular.module('myapp').config(function($routeProvider){
    $routeProvider
        .when('/users', {
            templateUrl: 'users.html',
            controller: "usersController"
        })
        .when('/houses', {
            templateUrl: 'houses.html',
            controller: "housesController"
        })
});