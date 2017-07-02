/**
 * my first stab at monads, this could be wrong...
 * This is an example of the 'Maybe' Monad.
 */
function MaybeMonad(value){
    var self = this;
    var _value = value;

    self.bind = bind;
    self.extract = extract;

    /**
     * a callback that is applied to the value passed in the monad
     */
    function bind(callback){
        if(_value){
            var result = callback(value);
            return new MaybeMonad(result);
        }
        
        return new MaybeMonad(null);
    }

    /**
     * gets the value inside the monad
     */
    function extract(){
        return _value;
    }
}

/**
 * a helper function for syntatic sugar
 */
function Maybe(value){
    return new MaybeMonad(value);
}
//----------------------------------------
function double(val){
    return val * 2;
}

function plusOneHundred(val){
    return val + 100;
}

Maybe(2)
.bind(double)
.bind(plusOneHundred)
.extract(); // 104


Maybe(null)
.bind(double)
.bind(plusOneHundred)
.extract(); // null
