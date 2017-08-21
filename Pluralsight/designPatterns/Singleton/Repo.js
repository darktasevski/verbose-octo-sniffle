var repo = function () { 

    var called = 0;

    var save = function (task) { 
        called++;
        console.log('Saving ' + task + ' Called ' + called + ' times!');
     }
     console.log('updating task repo');
     return {
         save: save
     }
 }

 module.exports = repo();