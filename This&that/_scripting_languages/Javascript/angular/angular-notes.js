
// 2 way data binding:
//    - expressions are re-evaluated when the property changes!
//    - so its binds to the variable, and it binds to where the variable is used!

//- directives tell angular to call a function

// ng-controller="FooBar"
function FooBar(){}


//-------------------------------------------------- modules
- our app is a module
    - use modules to modularize your code
    - controllers, directives and services (factories...) belong inside a module


//--------------------------------------------------



// - modules - pieces of the application
//       - some modules can depend on other modules



//(you Dont need the app variable!, just daisy chain!)
var app = angular.module('myApp', []); // the app IS A MODULE!
// inside the array, you put the module names
// dont forget to add the js file to the html

// add the javascript to the html with script tags of course


// Expresions:  <p>{{1+1}}</p>

// Controllers are for behaviour, use functions and variables
// use them for regions of the html
// controller functions can have parameters! then you can pass in the arguments in the html!
app.controller('FooController', ['$http', '$scope', function($http, $scope){...}]);
// use the alias

// create a main controller that wrapps all controllers in the html!



// wrap js in a closure, so there is private variables!
//       - so you dont conflict with other variables,
//       - so you dont polute the global scope


// Directives
//  - use them in the html within a controller
//  - expressions dont need curly braces here!

// ng-repeat
// ng-show, ng-hide
// ng-src   <-----------------
// ng-click
// ng-init
// ng-class="{ className: x === 1 }"
// ng-model
// ng-submit  <---------------------------
// ng-include="'foo.html'" // actualy an ajax request  // - use directives instead of ng-include!!!!
// ng-href='#/foo/{{bar.id}}'
//------------------------------------------------ FILTERS

// <p>{{foo | currency }}</p>
{{data* | filter:options*}}

//------------------------------------------------ forms

- use ng-model with a form input!  (set the model variable in the controller)
- you can create them on the fly!
- ng-model: binds the input value to the variable!

- radio buttons can use the same model!



<form name="reviewForm" ng-controller="ReviewController as reviewCtrl"
      ng-submit="reviewForm.$valid && reviewCtrl.addReview(product)">

// clear the form by setting the model to an empty value in the controller's method function


// css classes: ng-pristine ng-invalid
//              ng-dirty ng-valid


/*
.ng-invalid.ng-dirty{
    border-color: #FA787E;
}

.ng-invalid.ng-dirty{
    border-color: #78FA89;
}


*/


// angular can validate inputs of type:
//  type="email",   type="url",   type="number"


//  in the number type you can specify  min=0 max=10


//------------------------------------------------ form validations
/*

<form name="myForm" ...   novalidate>...
    <textarea ...  required>

{{ myForm.$valid }}  // form's name attribute
</form>

*/

//------------------------------------------------ directives
//- its like a HTML function LOL

// - use directives instead of ng-include!!!!


//  <product-title></product-title>

app.directive('productTitle', function(){
    // dashed case in HTML will be translated to camelCase
    return {
        // configuration object...
        restrict: 'E', // 'A'
        templateUrl: 'foo.html'

    };
});

//------------------------------------------------ dependencies
they are just modules


//------------------------------------------------ services
$http, $log,  $filter


$http returns a promise - inside the $http call, the scope of `this` is different
//------------------------------------------------


//==========================================================


//------------------------------------------------ routes
/*   - organize your code, in folders
       - 1 controller for each CRUD

  - in the view, extract the unique chunk of code
     - put it in a templates directory
          - add folders under the templates directory
              - you dont need the name of the folder in the name of the file!
*/

when you go to: http://example.com/#/notes

- angular will look to the route file, to see what template to use


# 4 steps to using routes:
- ng-view     //<div ng-view></div>
- load ngRoute library  //<script src="foo/angular-route.js"></script>
- import ngRoute module  // as a dependency in the app module   ['ngRoute']
- define routes  // angular.module('myApp').config(function($routeProvider){})  (you Dont need the app variable!, just daisy chain!)

$routeProvider.when('/notes', {
    templateUrl: '/templates/pages/notes/index.html',
    controller: 'MyController',
    controllerAs: 'myCtrl'
})
.when('/notes2', {
    templateUrl: '/templates/pages/notes/index2.html'
})
.otherwise({redirectTo: '/' });

//------------------------------------------------ logic in routes
//....

//------------------------------------------------ $scope

- scope in a directive in the link function/

//------------------------------------------------ scope config obj
- you can give your directive an isolate scope

- normaly the directive inherits the parent scope, and uses that

scope: {
    foo: "@", // receiving a string, and in the HTML you will need the brackets, because it needs to be evaluated and return a string
    bar: "=", // two way binding, and will not be interpreted as a string!
    baz: "&", // one way binding ?
    // and in your templates use {{foo}} {{bar}}  {{baz}}
}
//------------------------------------------------ LINK

link: function(scope, element, attrs){}
// you can use jquery here!
// DOM manipulation and logic functionality



//------------------------------------------------



//------------------------------------------------
