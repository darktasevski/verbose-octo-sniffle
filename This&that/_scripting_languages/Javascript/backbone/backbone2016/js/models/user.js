var App = App || {};

App.UserModel = Backbone.Model.extend({
    // urlRoot: 'http://localhost:3000',  // so you can use .fetch(); in the instance
    // url: '/users',
    urlRoot: '/users',
    defaults: {name: 'john doe', age: 27, job: 'programmer'}
});