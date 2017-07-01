(function(){  // wrap in a closure is good pactice
    var app = angular.module("myapp", ['ngRoute', 'usersControllerModule', 'housesControllerModule', 'carsDirectiveModule', 'formControllerModule']);
})();


// using angular 1.3.9 and angular-route 1.3.9


// --- use this syntax for other files that are not declaring dependencies!
// --- you should be declaring dependencies only in 1 file!
// var app = angular.module("myapp").foo


// for ngRoute:
// - include the javascript in the HTML (angular-routes.js) (its a separate javascript)
// - add <div ng-view></div> to your HTML
// - add 'ngRoute' as a dependency to your app
// - declare the routes!
// - use links like this: <a ng-href='#/foo'>hello</a>
//





// the index page will need to include all the js files!
// - separate them by type, to be organized! (vendors, controllers, directives...)