
var Task = function (data) {

    this.flyweight = FlyweightFactory.get(data.project, data.priority, data.user, data.completed);
    this.name = data.name;
    // this.priority = data.priority;
    // this.project = data.project;
    // this.user = data.user;
    // this.completed = data.completed;

}

function Flyweight(project, priority, user, completed) {
    this.priority = priority;
    this.project = project;
    this.user = user;
    this.completed = completed;
};

var FlyweightFactory = function () { 
    var flyweights = {};

    var get = function(project, priority, user, completed){
        // check if collection of project, priority, user and completed does not exist already
        // in our flyweight collection
        if(!flyweights[project + priority + user + completed ]) {
            flyweights[project + priority + user + completed] = 
                // then we re going to create a new flyweight using this four things
                new Flyweight(project, priority, user, completed);
        }
        // if it exists we re going to return the flyweight existing
        return flyweights[project + priority + user + completed];
    };
    var getCount = function () { 
        var count = 0;
        for(var f in flyweights) count++;
            return count;
     }
     return {
         get: get,
         getCount: getCount
     }
 }()

function TaskCollection() {
    var tasks = 0;
    var count = 0;
    var add   = function (data) { 
        tasks[data.name] = 
            new Task(data);
        count++;
     };
    var get = function(name) {
         return tasks[name];
     };
    var getCount = function () { 
         return count;
      };
    return {
        add: add,
        get: get,
        getCount: getCount
    };
}

var tasks = new TaskCollection();

var projects = ['none', 'Cs50', 'YDKJS', 'HackerRank', 'MongoDB'];
var priorities = [1, 2, 3 , 4, 5];
var users = ['Darko', 'Thea', 'Irene', 'Stanimir'];
var completed = [true, false];

// with proces.memoryUsage we are able to see how much memory we re actually using in our application
var initialMemory = process.memoryUsage().heapUsed;

for (var i = 0; i < 100000; i++) {
    tasks.add({
        name: 'task' + i,
        priority: priorities[Math.floor((Math.random() * priorities.length))],
        project: projects[Math.floor((Math.random() * projects.lenght))],
        user: users[Math.floor((Math.random() * users.length))],
        completed: completed[Math.floor((Math.random() * completed.length))]
    });  
};

var afterMemory = process.memoryUsage().heapUsed;
console.log('Used memory: ' + (afterMemory - initialMemory) / 1000000);
console.log('tasks: ' + tasks.getCount());
console.log('flyweights: ' + FlyweightFactory.getCount());
