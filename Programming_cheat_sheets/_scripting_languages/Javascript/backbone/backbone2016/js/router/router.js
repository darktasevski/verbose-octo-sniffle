var App = App || {};

var AppRouter = Backbone.Router.extend({
    routes: {
        "todos/:id": "todos",
        "todos/": 'index',
        "zombie/:name": 'zombie_path',
        "hello/:foo/:bar": 'hello_path'
        // matches http://example.com#anything-here
    }
});
// Initiate the router
App.Router = new AppRouter;

App.Router.on('route:todos', function (id){
    // Note the variable in the route definition being passed in here
    alert( "Get post number " + id );
});

App.Router.on('route:index', function(){
    alert('index');
});

App.Router.on('route:zombie_path', function(name){
    alert('this is: ' +name);
});

App.Router.on('route:hello_path', function(foo, bar){
    alert('this is: ' +foo+ ' ' +bar);
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();


//App.Router.navigate('todos/3', {trigger: true})  // go to link
