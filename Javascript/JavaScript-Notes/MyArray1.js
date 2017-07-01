function MyArray(){};
MyArray.prototype.length = 0;

(function(){
    var methods = ['push','pop','shift','unshift','slice','splice','join'];
    for(var i= 0;i<methods.length;i++)
        (function(name){
            MyArray.prototype[name]=function(){
                return Array.prototype[name].apply(this,arguments);
            };
        })(methods[i]);
})();

var mine = new MyArray();
mine.push(1,2,3,4)
console.log(mine);
// 测试通过


function MyArray(){};
MyArray.prototype.length = 0;
// 采用即时函数方式
(function(){
    // 列举子类别的数组operation methods
    var methods = ['push','pop','shift','unshift','slice','splice','join'];
    // 遍历这些方法，为新MyArray的原型添加这些属性。
    for(var i=0;i<methods.length;i++){
        (MyArray.prototype[name]=function(){
            return Array.prototype[name].apply(this,arguments);
        })(methods[i])
    }
})();