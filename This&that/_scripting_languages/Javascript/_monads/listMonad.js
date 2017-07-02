/**
 * my first stab at monads, this could be wrong...
 * This is an example of the 'List' Monad.
 */
function ListMonad(list){
    var self = this,
        _list = list;

    self.bind = bind;
    self.extract = extract;

    /**
     * a callback that is applied for each element in the list
     */
    function bind(callback){
        var newList = []

        _list.forEach(function(val){
            // eliminate falsy values
            if(val){
                newList.push(callback(val));
            }
        });
        
        return new ListMonad(newList);
    }

    /**
     * gets the value inside the monad
     */
    function extract(){
        return _list;
    }
}

/**
 * a helper function for syntatic sugar
 */
function List(list){
    return new ListMonad(list);
}

//----------------------------------
function double(val){
    return val * 2;
}

function plusOneHundred(val){
    return val + 100;
}

List([2, 4, 'foo', 'bar', null, undefined, NaN])
.bind(double)
.bind(plusOneHundred)
.extract(); // [104, 108]

