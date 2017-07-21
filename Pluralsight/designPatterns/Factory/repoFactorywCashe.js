var repoFactory = function () {
    
    this.getRepo = function (repoType) { 
        if (repoType === 'task') {
            console.log('Retrieving from cashe.');
            return this.taskRepo;
        } else {
            this.taskRepo = require('./taskRepository');
            // config -- 
            // benefit of the factory pattern is that we can drop all our
            // config code in the factory before we return it, so that we dont 
            // have to deal with that in the main.js file.
            return this.taskRepo;
        }
     }
     if (repoType === 'user') {
         var userRepo = require('./userRepository');
         return userRepo;
     }
     if (repoType === 'project') {
         var projectRepo = require('./projectRepository');
         return projectRepo;
     }
}

module.exports = new repoFactory;