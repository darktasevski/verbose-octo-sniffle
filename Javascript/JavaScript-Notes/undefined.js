var a = undefined;
console.log(typeof(a))
a = [1,2]
console.log(typeof(a))
//数组其实是个对象
a = null;
console.log(typeof(a))
//空对象
//null是未引用，也是一个对象，是一个只有一个值的特殊类型。表示一个空对象引用。
//表示什么都没有

console.log(undefined==null)
console.log(undefined===null)

a = NaN
console.log(typeof(a))

a = function(){}.constructor;
console.log(typeof(a));

a = Date().constructor;
console.log(typeof(a));

a = String(Date())
console.log(a)

a = "11.6"
console.log(parseInt(a))

a = Number(true)
console.log(a)
a = Number(false)
console.log(a)

a= 1.253434454456
console.log(a.toString())
console.log(a.toFixed(2))
//把数字格式化为指定的长度，注意是四舍五入
console.log(a.toPrecision(2))




