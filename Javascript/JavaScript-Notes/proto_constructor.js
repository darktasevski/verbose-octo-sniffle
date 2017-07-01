/**
 * ---------------
 * 使用原型来构造对象
 * 通过原型构造的新的对象通过原型链来共享原型上的方法和变量
 */
//创建了一个原型，使用其他的来继承这个原型，从而快速创建具有几乎一样功能对象，newobject

var landRover = {
	name:'landRover',
	//member function start()
	start:function(){
		console.log('%s start',this.logo);
	},
	//member function run()
	run:function(){
		console.log("%s running",this.logo);
	},
	//member function stop()
	stop:function(){
		console.log('%s stop', this.logo);
	},
	//private function:JS中没有私有成员函数，只能通过约定俗成的方法
	_gas:function(){
		console.log('%s is getting some oil')
	}
}
//通过Object.create(landRover)来实例化一个对象并且赋值给landWind
var landWind = Object.create(landRover);
//override landWind.logo
landWind.logo = "landWind";
//通过Object.create(landRover)实例化一个对象
var landCruiser = Object.create(landRover);
//override 这个对象的logo;
landCruiser.logo = "landCruiser";

//对象调用成员函数
//JS中没有私有成员函数，只能通过约定俗成的方法
landWind.run()
landCruiser.stop()

/**
 * 创建对象的第二种方法使用构造函数来构造对象
 * --------------------
 * 显式地声明一个构造函数
 */
//Car 构造函数
function Car(logo){
	//这句赋值语句的意思是如果能赋值logo就完成赋值，否则赋值为"unknown name"
	this.logo = logo || "unknown name" 
}
//设置构造函数Car的prototype属性
Car.prototype = {
	start:function(){
		console.log('%s start',this.logo);
	},
	run:function(){
		console.log("%s running",this.logo);
	},
	stop:function(){
		console.log('%s stop', this.logo);
	}
}
//创建对象
var landRover_1 = new Car("landRover_1");
var landCruiser_1 = new Car("landCruiser_1");
//调用方法
landRover_1.start()
landRover_1.run()
landRover_1.stop()
landCruiser_1.start()





