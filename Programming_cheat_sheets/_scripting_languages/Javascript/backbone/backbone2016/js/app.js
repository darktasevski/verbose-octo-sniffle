window.MyApp = new (Backbone.Router.extend({
  routes: {
    "": "index",
    "todos/:id": "show"
  },

  initialize: function(){
    // this.todoItems = new TodoItems();
    // this.todosView = new TodosView({collection: this.todoItems});
    // this.todosView.render();
    console.log('initializing...');
  },

  index: function(){
    // $('#app').html(this.todosView.el);
    //this.todoItems.fetch();
    console.log('index...');
  },

  start: function(){
    //Backbone.history.start();
    console.log('starting...');
  },

  show: function(id){
    this.todoItems.focusOnTodoItem(id);
  }
}));