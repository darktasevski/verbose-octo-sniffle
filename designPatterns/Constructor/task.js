// Constructor pattern

var Task = function (name) {
    this.name = name;
    this.completed = false;

    // this.complete = function () {
    //     console.log('Completing task: ' + this.name);
    //     this.completed = true;
    // }
    
    // these two are changed in favor of prototypes bellow
    // because performance reasons, so that new instances of Task
    // doesn't copy complete and save function every time instance is created,
    // now they just references to the Task prototype methods
    // --------------------------------------
    
}

Task.prototype.complete = function() {
    console.log('Completing task: ' + this.name);
    this.completed = true;
}
Task.prototype.save = function() {
     console.log('saving Task: ' + this.name );
}

module.exports = Task;



