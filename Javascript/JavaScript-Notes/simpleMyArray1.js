function MyArray(){};
MyArray.prototype.length = 0;

(function(){
        (function(name){
            MyArray.prototype[name]=function(){
                return Array.prototype[name].apply(this,arguments);
            };
        })('push');
})();

var mine = new MyArray();
mine.push(1,2,3,4)
console.log(mine);