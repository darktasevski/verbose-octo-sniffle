
var Task = function (name) {
    this.name = name;
    this.completed = false; 
}

Task.prototype.complete = function() {
    console.log('Completing task: ' + this.name);
    this.completed = true;
}
Task.prototype.save = function() {
     console.log('saving Task: ' + this.name );
}

var myTask = new Task('Legacy task');
myTask.complete();
myTask.save();

var urgentTask = new Task('Urgent Task');
// decorated Task function with new functions, priority and notify
urgentTask.priority = 2;
urgentTask.notify = function () { 
    console.log('Notifying all day long');
 };
// also modifying build in save function
urgentTask.save = function () { 
    this.notify();
        Task.prototype.save.call(this);
 };
urgentTask.complete();
urgentTask.save();