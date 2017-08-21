(function(){
  var app = angular.module('taskManager');
  
  app.decorator('TaskRepository',function($delegate){
    var oldSave = $delegate.save;
    $delegate.save = function(task){
      console.log('Special logging for task ' + task.name);
      oldSave(task);
    }
    return $delegate;
  })
}())