var Task = function (data) {
    // changed Task object to be just properties
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;

}

var TaskService = function () {
    // module pattern
    // we have here series of functions that allows us to interact with tasks
    return {
        complete: function (task) {
            task.completed = true;
            console.log('Completing task: ' + task.name);
        },
        setCompleteDate: function (task) {
            task.completedDate = new Date();
            console.log(task.name + ' completed on ' + task.completedDate);
        },
        notifyCompletion: function (task, user) {
            console.log('Notifying ' + user + ' of the completion of the ' + task.name);
        },
        save: function (task) {
            console.log('Saving Task: ' + task.name);
        }
    }
}(); // TaskService

var TaskServiceWrapper = function () {
    // revealing module pattern

    var completeAndNotify = function (task) {
        TaskService.complete(myTask);
        if (myTask.completed == true) {
            TaskService.setCompleteDate(myTask);
            TaskService.notifyCompletion(myTask, myTask.user);
            TaskService.save(myTask);
        }
    }
    return {
        completeAndNotify: completeAndNotify
    }
}(); // TaskServiceWrapper

var myTask = new Task({
    name: 'MyTask',
    priority: 1,
    project: 'Courses',
    user: 'Jon',
    completed: false
});

TaskServiceWrapper.completeAndNotify(myTask);
console.log(myTask);