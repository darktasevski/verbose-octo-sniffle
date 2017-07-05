# Backbone.js

* [Backbone Tutorial](http://liquidmedia.org/blog/2011/01/backbone-js-part-1/)

* [Official Tutorial](http://documentcloud.github.io/backbone/)

# Models
  * __MODEL INSTANCES__ are like __records__ in rails

```js
//1.CLASS
// create a model class
var TodoItem = Backbone.Model.extend({
  //urlRoot: '/todos',  // so you can use .fetch(); in the instance
  // defaults: {description: 'Empty todo...', status: 'incomplete'}
});





//2. INSTANCE
// create model instance
var todoItem = new TodoItem(
  {description: "Pick up milk", status: "incomplete", id: 1}
)

// getters
todoItem.get('description'); // "Pick up milk"

// setter
todoItem.set({status: 'complete'});

// sync to server
todoItem.save();

// get json for model
todoItem.url = '/todo';

// populate model from server
todoItem.fetch();

// destroy
todoItem.destroy();

// get json object
todoItem.toJSON();
```


# View

```js
// 1. CLASS
// create a view class
var TodoView = Backbone.View.extend({
  initialize: function(){
    // `this.model` references the model instance that will be declared in the view instance
    this.model.on('hide', this.remove, this) // this custom `hide` event is because of a Collection... search that in this page...
  },
  tagName: 'li', // the default is 'div'
  id: 'todo-view',
  className: 'todo',
  events: { "click span": "doThing" },
  doThing: function(){
    alert(this.model.get('title'));
  }
});




// 2. INSTANCE
// create a view instance
var todoView = new TodoView({
  model: todoItem  // model should be a instance
});
//----------------------------------
```


```js
// 1. CLASS
// rendering the view
var TodoView = Backbone.View.extend({
  render: function(){
    var html = '<h3>' + this.model.get('description') + '</h3>';
    // $(this.el).html(html); // the one below is better
    this.$el.html(html); // every view instance has a .el, by default its a <div>
  }
});



// 2. INSTANCE
var todoView = new TodoView({model: todoItem}); // model should be an instance
todoView.render();
// to test the above line out:
console.log(todoView.el);

```
```js
// use jQuery to acces a backbone view's HTML
todoView.$el.html();
```

# template in the view
```js
// using the underscore template
var TodoView = Backbone.View.extend({
  template: _.template('<span><%= title %></span>'), // `title` is an attribute

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});
```

# Colletions

* I guess the Idea is to encapsulate 'model instances' and manage them... ???

```js
//collections are simply an ordered set of model instances
// collection has 1 model ?
// model has many collections ?


// 1.CLASS
var TodoList = Backbone.Collection.extend({
  initialize: function(){
    this.on('remove', this.hideModel); // on `remove` of model instance
  },
  hideModel: function(model){
    model.trigger('hide'); // hide is a custom event on the `VIEW`
  },
  model: TodoItem, // model class
  url: '/todos' // so you can todoList.fetch(); in the `collection instance`
});


// 2. INSTANCES
todoList.length;
todoList.add(todoItem1);
todoList.at(0); // index, not ID
todoList.get(1);  // get ID
todoList.remove(todoItem1);  // remove model instance

// populate model in bulk
todoList.reset(array_of_model_instances);

// methods for the `Collections`
.forEach(function(todoItem)){};
.map(function(todoItem)){};
.filter(function(todoItem)){};
// and many more ITERATION FUNCTIONS provided by the UNDERSCORE library...


```

# Collection Views

* Its just a __VIEW instance__ that we pass a __Collection instance__, instead of a __model instance__

* A collection's View has many models, and each model has 1 view.

```js
// 1. Class
var TodoListView = Backbone.View.extend({
  initialize: function(){
    // `this.collection` references the collection you will pass to the view instance
    // ***this function is so we can add a model instance***
    //  collection.on('<event>', <function>, <context>)
    this.collection.on('add', this.addOne, this);

    // so we can .fetch(); a collection from the server:
    this.collection.on('reset', this.addAll, this);
  },
  addOne: function(todoItem){
    var todoView = new TodoView({model: todoItem}); // create view instance
    this.$el.append(todoView.render().el);
  },
  addAll: function(){
    this.collection.forEach(this.addOne, this);  // `this` is to keet the context
  },
  render: function(){
    this.addAll();
  }
});



// 2. Create a View instance, and pass the collection instance to it
var todoListView = new TodoListView({
  collection: todoList // instance
});

// render the instance
todoListView.render();
console.log(todoListView.el);

// add a model instance to the collection instance
todoList.add(newTodoItem);
```

# Events

* Events can be defined in the Model and in the instances
* You can also define Events in the `Collections`

```js
// INSTANCE
// model instance
todoItem.on('event-name', function(){
  alert('event-name happened!');
});

// to trigger the event
todoItem.trigger('event-name');

// some other events
todoItem.on('change', doThing);
  // the above gets triggered by todoItem.set();


// without triggering an event
todoItem.set({description: 'foo'}, {silent: true});

// remove event listener
todoItem.off('change', doThing);

//built-in events in the MODEL
'change'
'change:<attr>'
'destroy' // when model is destroyed
'sync'    //whenever successfully synced to server
'error'   // model save or validation fails
'all'     //  any triggered event

'dblclick'

//built-in events in the COLLECTION
'add'     //  on the function, it passes in the model instance to the function as a parameter
'remove'  //  on the function, it passes in the model instance to the function as a parameter
'reset'   // reset or fetched
'and any model events'
```

# Routers

```js
// it maps URL to actions

var router = new Backbone.Router(
  //=> /todos or #todos
  routes: {
    "todos/": 'index',
    "todos/:id": 'show'
  },
  index: function(){

  },
  show: function(id){

  }
);

//-------------- using navigate
router.navigate("todos/1", {trigger: true});

// or links
<a href='#todos/1'>show</a>

```

# How to add links

  * Add an event-listener to an __&lt;a&gt;__ tag on the __Model class__

```js

// Model class
var Appointment = Backbone.Model.extend({
  cancel: function(){
    this.set({cancelled: true});
    this.save();
  }
});


// VIEW class
var AppointmentView = Backbone.View.extend({
  template: _.template('<span><%= title %></span> <a href="#">x</a>'),
  events:  { "click a": "cancel" },
  cancel: function(){
    this.model.cancel();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});

```



# I need to study more...

- routes are like rails controllers?
- you will have only 1 router class?
- collections have many models and each model has a view?
