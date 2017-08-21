// Revealing Module pattern

var repo = function () {

var db = {};

    var get = function (id) {
        console.log('Getting task ' + id);
        return {
            name: 'New task from DB'
        };
    }
    
    var save = function (task) {
        console.log('Saving ' + task.name + 'to the DB');
    }

    return {
        get: get,
        save: save
    }
}

module.exports = repo(); 