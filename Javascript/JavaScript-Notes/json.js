var friend = {
	firstName:"Good",
	'lastName':'Man',
	'lastName1':'Man1',
	'address':undefined,
	'phone':['1234567',undefined],
	'fullName':function(){
		return this.firstName + this.lastName;
	}
}

friend = {
	"name":"wandejun",
	"age":18,
}


console.log(friend)
// console.log(friend.fullName());
console.log('========')

var newFriend = JSON.stringify(friend,function(key,value){
	return "000"+value;
},null);

console.log(newFriend)

/*不是双引号-->双引号*/
/*有逗号-->去掉*/
/*非数组对象不能保证以特定顺序出现在序列化的字符串中*/
/*布尔值，数字，字符串的包装对象会在序列化的过程中自动转化为相应的原始值*/
/*undefined,任意的函数（其实这个函数会发生神奇的事，以及symbol的值）
	1.出现在非数组对象的属性值中：在序列化中会被忽略，
	2.出现在数组中，会被转化为null
*/

console.log(JSON.stringify({x:"wang",y:undefined,z:"undefined"}))

/*NaN,Infinity,和-Infinity,不论在数组还是非数组的对象中，都会被转化为null*/
/**
 * 所有以symbol为属性key的属性都会被完全忽略掉，，几遍replacer参数中强制指定包含了它们；
 */
/**
 * 不可枚举的属性会被忽略掉
 */