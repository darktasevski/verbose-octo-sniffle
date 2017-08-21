//定义一个构造函数CheckObject()
var CheckObject = function(){};
//将方法赋值给在构造函数的原型
CheckObject.prototype = {
    checkName:function(){
        console.log('checkName');
        return this;
    },
    checkEmail:function(){
        console.log('checkEmail');
        return this;
    },
    checkPassword:function(){
        console.log('checkPassword');
        return this;
    }
}
//实例化一个对象
var a = new CheckObject()
a.checkName().checkEmail().checkPassword()
//判断a是checkObject的一个实例
console.log(a instanceof CheckObject);

