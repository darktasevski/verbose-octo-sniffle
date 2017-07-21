(function() {
  var app = angular.module('taskManager');

  var taskRepo = function($http) {
    var called = 0;
    var db = {};

    var get = function(id) {
      called++;
      console.log('Getting task ' + id + ' called ' + called + ' times.');
      return {
        name: 'task ' + id
      }
    }

    var save = function(task) {
      called++;
      console.log('Saving ' + task.name + ' to the db'+ ' called ' + called + ' times.');
    }


    return {
      get: get,
      save: save
    }

  }
  app.service('TaskRepository', taskRepo);

}())