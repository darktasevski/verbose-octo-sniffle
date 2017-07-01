// remember to include this file in the main index.html

// remember to use <users-index-directive></users-index-directive>

// remember that directive names should be camelcase with the first letter being lowercase

angular.module('myApp')
    .directive('usersIndexDirective', function(){
        return {
            restrict: 'E',
            templateUrl: '../templates/users/index.html',
            link: function(scope, el, attrs, controller){

            }
        }
    });