//------------------------------------------------------- models are the 'data'
var erich = new App.UserModel(
	{name: "Erich Spinos", age: 20, job: 'programmer', id: 1}
);

var brian = new App.UserModel(
	{name: "Brian Spinos", age: 20, job: 'programmer', id: 2}
);
//------------------------------------------------------- views are the HTML representation
var erichView = new App.UserView({model: erich});
erichView.render()  // so I can use erichView.el
var brianView = new App.UserView({model: brian});
brianView.render()  // so I can use brianView.el

//------------------------------------------------------- collection is a container for models
var brothers = new App.UserCollection();


//------------------------------------------------------- collection-view is the HTML representation of a collection
var brothersView = new App.UserCollectionView({
    collection: brothers
});

// why can I only add after creating a collection-view instance ???
brothers.add(brian);
brothers.add(erich);


//------------------------------------------------------- append to HTML
$('#app').append(brothersView.el);


// CRUD

// - save
// - fetch
// - sync
// - destroy

// fetch
// save
// destroy
// sync
//------------------------------------------------------- CRUD:

// create:  (POST /users)
rick = new App.UserModel({name: 'rick'});
rick.save();  // POST /users
console.log(rick.toJSON());
console.log(rick.get('name'));


// read:  (GET /users/:id)   populate model
brian.fetch();
console.log(brian.toJSON());

//update: (PUT /users/:id)
brian.set({name: 'ana'});
brian.save();
console.log(brian.toJSON());

//delete: (DELETE /users/:id)
brian.destroy();
console.log(brian.toJSON());


// adding to the collection:
brothers.add(rick);


//------------------------------------------------------- testing area:




// //------------------------------------------------------------------------------------- Model class
// var TodoItem = Backbone.Model.extend({
// 	//urlRoot: '/todos',  // so you can use .fetch(); in the instance
// 	defaults: {description: 'Empty todo...', status: 'incomplete', title: 'who?'}
// });
// //------------------------------------------------------------------------------------- Collection class
// var TodoList = Backbone.Collection.extend({
// 	initialize: function(){
// 		this.on('remove', this.hideModel); // on `remove` of model instance
// 	},
// 	hideModel: function(model){
// 		model.trigger('hide'); // hide is a custom event on the `VIEW`
// 	},
// 	model: TodoItem, // model class
// 	//url: '/todos' // so you can todoList.fetch(); in the `collection instance`
// });
// //------------------------------------------------------------------------------------- View class
// var TodoView = Backbone.View.extend({
// 	initialize: function(){
// 		// `this.model` references the model instance that will be declared in the view instance
// 		this.model.on('hide', this.remove, this) // this custom `hide` event is because of a Collection... search that in this page...
// 	},
// 	tagName: 'li', // the default is 'div'
// 	id: 'todo-view',
// 	className: 'todo',  // html class
// 	events: { "click h1": "doThing" },
// 	doThing: function(){
// 		alert(this.model.get('title'));
// 	},

// 	render: function(){
// 		var html = '<h3>' + this.model.get('description') + '</h3>';
// 		// $(this.el).html(html); // the one below is better
// 		this.$el.html(html); // every view instance has a .el, by default its a <div>
// 	},

// 	template: _.template('<h1>This is a template for: <%= description %>, click me!</h1>'), // `title` is an attribute

// 	renderWithTemplate: function(){  // my custom function
// 		this.$el.html(this.template(this.model.toJSON()));
// 	}

// });
// //------------------------------------------------------------------------------------- Collection-view class
// var TodoListView = Backbone.View.extend({
// 	initialize: function(){
// 		// `this.collection` references the collection you will pass to the view instance
// 		// ***this function is so we can add a model instance***
// 		//  collection.on('<event>', <function>, <context>)
// 		this.collection.on('add', this.addOne, this);

// 		// so we can .fetch(); a collection from the server:
// 		this.collection.on('reset', this.addAll, this);
// 	},
// 	addOne: function(todoItem){  // should be a model
// 		var todoView = new TodoView({model: todoItem}); // create view instance
// 		todoView.render();  // I need to render, to generate the HTML! <-----------
// 		this.$el.append(todoView.el);
// 	},
// 	addAll: function(){
// 		this.collection.forEach(this.addOne, this);  // `this` is to keet the context
// 	},
// 	render: function(){
// 		this.addAll();
// 	}
// });
// //------------------------------------------------------------------------------------- Model instances:
// var todoItem = new TodoItem(
// 	{description: "Pick up milk", status: "incomplete", id: 1, title: 'aaa'}
// )

// var todoItem2 = new TodoItem(
// 	{description: "mow lawn", status: "incomplete", id: 2, title: 'bbb'}
// )

// var todoItem3 = new TodoItem(
// 	{description: "wash car", status: "incomplete", id: 3, title: 'ccc'}
// )

// var newTodoItem = new TodoItem(
// 	{description: "wash dishes", status: "incomplete", id: 4, title: 'ddd'}
// )
// //------------------------------------------------------------------------------------- View instances:
// var todoView = new TodoView({model: todoItem});
// var todoView2 = new TodoView({model: todoItem});
// //------------------------------------------------------------------------------------- Collection instances:
// todoList = new TodoList();
// //------------------------------------------------------------------------------------- Collection-view instances:
// // 2. Create a View instance, and pass the collection instance to it
// var todoListView = new TodoListView({
// 	collection: todoList // instance
// });
// //------------------------------------------------------------------------------------- getters and setters
// // getters
// console.log(todoItem.get('description')); // "Pick up milk"

// // setter
// todoItem.set({status: 'complete'});

// // sync to server
// // todoItem.save();

// // get json for model
// // todoItem.url = '/todo';

// // populate model from server
// // todoItem.fetch();

// // destroy
// // todoItem.destroy();

// // get json object
// console.log(todoItem.toJSON());
// //-------------------------------------------------------------------------------------
// todoView.render();  // sets HTML to the .el property (could it be in a initialize ???)
// todoView2.renderWithTemplate();

// //-------------------------------------------------------------------------------------
// console.log('------- list length');
// console.log(todoList.length);


// todoList.add(todoItem3);
// console.log('------- first model in list:');
// console.log(todoList.at(0).toJSON()); // index, not ID
// console.log('------- get model with id 3:');
// console.log(todoList.get(3).toJSON());  // get ID

// todoList.remove(todoItem3);  // remove model instance

// // populate model in bulk
// // todoList.reset(array_of_model_instances);

// // methods for the `Collections`
// // .forEach(function(todoItem)){};
// // .map(function(todoItem)){};
// // .filter(function(todoItem)){};
// //-------------------------------------------------------------------------------------


// // add a model instance to the collection instance
// todoList.add(todoItem2);
// todoList.add(todoItem3);
// todoList.add(newTodoItem);

// // render the instance
// // todoListView.render();  // I dont need to render ??? (because it duplicates)
// console.log('------------------- todoListView:');
// console.log(todoListView.el);


// //------------------------------------------------------------------------------------- add to page
// $('#app').append(todoView.el);
// $('#app').append(todoView2.el);
// $('#app').append(todoList.el);
// $('#app').append('<hr />');
// $('#app').append(todoListView.el);
// //------------------------------------------------------------------------------------- Router
// var AppRouter = Backbone.Router.extend({
// 	routes: {
// 		"todos/:id": "todos",
// 		"todos/": 'index',
// 		"zombie/:name": 'zombie_path',
// 		"hello/:foo/:bar": 'hello_path'
// 		// matches http://example.com#anything-here
// 	}
// });
// // Initiate the router
// var app_router = new AppRouter;

// app_router.on('route:todos', function (id) {
// 	// Note the variable in the route definition being passed in here
// 	alert( "Get post number " + id );
// });

// app_router.on('route:index', function() {
// 	alert('index');
// });

// app_router.on('route:zombie_path', function(name) {
// 	alert('this is: ' +name);
// });

// app_router.on('route:hello_path', function(foo, bar) {
// 	alert('this is: ' +foo+ ' ' +bar);
// });

// // Start Backbone history a necessary step for bookmarkable URL's
// Backbone.history.start();


// app_router.navigate('todos/3', {trigger: true})  // go to link