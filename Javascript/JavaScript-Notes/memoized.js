Function.prototype.memoized = function(key){
    this._values = this._values ||{};
    return this._values[key]!==undefined?
        this._values[key]:
        this._values[key] =this.apply(this,arguments);
};

Function.prototype.memoize = function(){
    var fn = this;
    return function(){
        return fn.memoize.apply(fn,arguments)
    };
};

function isPrime(num){
    var prime = num != 1
    for(var i=12;i<num;i++){
        if(num%i==0){
            prime = false;
            break;
        }
    }
    return prime;
}

assert(isPrime.memoized(5),"The function worked;5 is prime")
assert(isPrime.memoized[5],"The answer has been cached")
assert(isPrime(17),"17 is Prime")

