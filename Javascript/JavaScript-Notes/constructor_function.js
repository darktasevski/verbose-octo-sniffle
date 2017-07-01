//构造函数constructor,JS通过构造函数来构造对象，实现继承（原型链）

function person(firstname,lastname,age,eyecolor){
	this.firstname = firstname;
	this.lastname = lastname;
	this.age = age;
	this.eyecolor = eyecolor;

	this.changeName = changeName;
	//构造函数内部定义一个changeName()的成员函数；
	function changeName(name){
		this.lastname = name
	}
}
//使用构造函数构造一个实例
var herFather = new person("John","Doe",50,"blue")
var herMather = new person("Sally","Rally",48,"green")

console.log(person)
console.log(herMather)
console.log(herFather)
console.log(herFather.eyecolor)

herMather.changeName("TOM")
console.log("after her mother change name ")
console.log(herMather)
