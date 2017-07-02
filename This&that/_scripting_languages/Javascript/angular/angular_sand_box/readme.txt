about the Angular route:

$ npm install
$ node app.js  # the express app.js

- make /index.html available, where Angular is

- use ngRoute as a dependecy of the app

- use $routeProvider in the router.js

- make the client side js available:
    app.use(express.static('client'));

- require the js in the index.html




