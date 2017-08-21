(function() {
  var app = angular.module('taskManager');

  app.factory('UrgentTask', function(Task, TaskRepository) {
    var UrgentTask = function(data) {
      Task.call(this, data);
      this.priority = data.priority;
    };
    UrgentTask.prototype = Object.create(Task.prototype);

    UrgentTask.prototype.notify = function() {
      console.log('notifying important people');
    };
    UrgentTask.prototype.save = function() {
      this.notify();
      console.log('do special stuff before saving');
      Task.prototype.save.call(this)
    };
    return UrgentTask;
  });

}())