var App = App || {};

App.UserView = Backbone.View.extend({
    initialize: function(){
        // `this.model` references the model instance that will be declared in the view instance
        this.model.on('hide', this.remove, this) // this custom `hide` event is because of a Collection... search that in this page...
    },
    tagName: 'li', // the default is 'div'
    id: 'user-view',
    className: 'user',  // html class
    events: { "click h1": "doThing" },
    doThing: function(){
        alert(this.model.get('title'));
    },

    render: function(){
        var html = '<h3>' + this.model.get('name') + '</h3>';
        // $(this.el).html(html); // the one below is better
        this.$el.html(html); // every view instance has a .el, by default its a <div>
    },

    template: _.template('<h1>This is a template for: <%= name %>, click me!</h1>'), // `title` is an attribute

    renderWithTemplate: function(){  // my custom function
        this.$el.html(this.template(this.model.toJSON()));
    }

});