'use strict'

class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    };
    complete() {
        console.log('Completing task: ' + this.name);
        this.completed = true;
    };
    save() {
        console.log('saving Task: ' + this.name );
    };
} 

var task1 = new Task('create task 1');
var task2 = new Task('create task 2');
var task3 = new Task('create task 3');
var task4 = new Task('create task 4');

task1.complete();
task2.save();
task3.save();
task4.save();
