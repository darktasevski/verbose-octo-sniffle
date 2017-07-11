(function(){
  var app = angular.module('taskManager', []);
  
  var taskController = function(Task,UrgentTask, TaskRepository){
    
    var ctrl = this;
    ctrl.tasks = [];
    ctrl.tasks.push(new Task(TaskRepository.get(1)));
    ctrl.tasks.push(new Task(TaskRepository.get(2)));
    ctrl.tasks.push(new UrgentTask(TaskRepository.get(3)));
    ctrl.tasks.push(new UrgentTask(TaskRepository.get(4)));
    
  };
  
  app.controller('taskCtrl', taskController)
}());