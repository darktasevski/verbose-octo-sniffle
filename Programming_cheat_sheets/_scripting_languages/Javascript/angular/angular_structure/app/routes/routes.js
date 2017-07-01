// Gotcha:  you need to add this file to your html!
//          <script src="routes/routes.js"></script>

angular.module('myApp')
    .config(function($routeProvider){
        $routeProvider
            .when('/test', {  // http://localhost:3000/#/test
                templateUrl: 'templates/users/test.html',  // path is relative to the folder declared in NODE.js  -> app.use(express.static('app'));
                // controller: 'xxx',
                // controllerAs: 'x'
            });
            // .when('/notes2', {
            //     templateUrl: 'templates/pages/notes/index2.html'
            // })
            // .otherwise({
            //     redirectTo: '/'
            // });
    });



/*

steps for routes:

1. add routes to your app.js as a dependency :
    angular.module('myApp', ['ngRoute'])
2. add ng-view to the main index.html :
    <div ng-view></div>
3. add the js src file to the main index.html :    (DONT FORGET THIS!!!)
    <script src="foo/angular-route.js"></script>
4. add routes to the .config :
    angular.module('myApp').config(function($routeProvider){})

*/