//构造函数在call的同时，创建内部私有成员变量，this.intro
var Basketball = function(){
	this.intro = "篮球盛行于美国"
}
//原型上添加方法
Basketball.prototype = {
	getMember:function(){
		console.log('篮球运动需要5个人');
	},
	getBallSize:function(){
		console.log("篮球很大");
	}
};


var Football = function(){
	this.intro = "足球盛行于世界"
}

Football.prototype = {
	getMember:function(){
		console.log('足球运动需要11个人');
	},
	getBallSize:function(){
		console.log("足球很大");
	}
};

var Tennis = function(){
	this.intro = "每年有很多系列网球公开赛";
}

Tennis.prototype = {
	getMember:function(){
		console.log('网球运动需要1个人');
	},
	getName:function(){
		console.log("tennis")
	},
	getBallSize:function(){
		console.log("网球很小");
	}
};

//创建工厂函数，按照传入参数的不同，生产出来不同的对象
var SportsFactory = function(name){
	switch (name) {
		case 'NBA':
			return new Basketball();
		case 'WorldCup':
			return new Football();
		case 'FrenchOpen':
			return new Tennis();
		default:
			return new Basketball();
	}
}

var football = SportsFactory('WorldCup')
console.log(football);
console.log(football.intro);
football.getMember();

var tennis = SportsFactory("FrenchOpen")
console.log(tennis);
console.log(tennis.intro)
tennis.getName();

function Alert(){
	this.name = "alert";
	console.log("alert")
}
function Prompt(){
	this.name = "prompt"
	console.log("prompt")
}

var LoginAndSignFactory = function(name){
	switch (name) {
		case "alert":
			return new Alert();
		case "prompt":
			return new Prompt()
	}
}

var login = new LoginAndSignFactory("alert")
console.log(login.name)

var newlogin = new LoginAndSignFactory("prompt")
console.log(newlogin.name)

