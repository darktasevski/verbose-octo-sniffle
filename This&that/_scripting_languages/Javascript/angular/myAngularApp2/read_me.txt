- files added for angular routing:
    - app.js
    - package.json
    - views folder
    - node_modules
    - .gitignore

- for routes:
    - use a http server (here I use express)
    - use 'ngRoute' as a dependency of the app
    - use angular.module('myapp').config(function($routeProvider){...}
    - make the partials available using 'app.use', 'serving static files'
    - in index.html use script angular-route.js and the ng-view directive


$ npm install  # creates the /node_modules folder
$ node app.js  # the express app.js
