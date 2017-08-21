var App = App || {};

App.UserCollection = Backbone.Collection.extend({
    initialize: function(){
        this.on('remove', this.hideModel); // on `remove` of model instance
    },
    hideModel: function(model){
        model.trigger('hide'); // hide is a custom event on the `VIEW`
    },
    model: App.UserModel, // model class
    //url: '/todos' // so you can todoList.fetch(); in the `collection instance`
});


App.UserCollectionView = Backbone.View.extend({
  initialize: function(){
    // `this.collection` references the collection you will pass to the view instance
    // ***this function is so we can add a model instance***
    //  collection.on('<event>', <function>, <context>)
    this.collection.on('add', this.addOne, this);

    // so we can .fetch(); a collection from the server:
    this.collection.on('reset', this.addAll, this);
  },
  addOne: function(userModel){  // should be a model
    var userView = new App.UserView({model: userModel}); // create view instance
    userView.render();  // I need to render, to generate the HTML! <-----------
    this.$el.append(userView.el);
  },
  addAll: function(){
    this.collection.forEach(this.addOne, this);  // `this` is to keet the context
  },
  render: function(){
    this.addAll();
  }
});