
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

// create a sub-object thats going to wrap Task in its own thing , so that we can create more of them
// we are going to do that by creating a new constructor

var UrgentTask = function (name, priority) {
    Task.call(this, name);
    this.priority = priority;
}
// because UrgentTask doesn't have prototype, we cant call completed() from Task, so we are going to add
// Task prototype via Object.create() method to make new object for UrgentTask.prototype out of Task.prototype .
// If we just assign UrgentTask.prototype = Task.prototype they will
// just assign themselves to each other, so when we change UrgentTask. Task will be changed to and vice versa.
UrgentTask.prototype = Object.create(Task.prototype);
UrgentTask.prototype.notify = function () { 
    console.log('Notifying you and Thea!');
 }
UrgentTask.prototype.save = function () { 
     this.notify();
     console.log('doing something before saving');
     Task.prototype.save.call(this);
 }

// created sub-object of Task
var ut = new UrgentTask('This is urgent!', 1);

ut.complete();
ut.save();
console.log(ut);