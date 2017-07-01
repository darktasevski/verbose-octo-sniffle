
var Human = function(param){
	this.skill = param && param.skill || "保密";
	this.hobby = param && param.hobby || "保密";
};
/*
 *人类原型方法
 *------------------
 * getSkill()获取技能
 * getHobby()获取gg爱好
 */
Human.protype = {
	getSkill:function(){
		return this.skill;
	},
	getHobby:function(){
		return this.hobby;
	}
};
//实例化姓名类
var Named = function(name){
	var that = this;
	//构造函数解析姓与名
	(function(){
		that.wholeName = name;
		if(name.indexOf(" ") > -1){
			that.FirstName = name.slice(0,name.indexOf(" "));
			that.secondName = name.slice(name.indexOf(" "));
		}
	})(name,that)
}

//实例化职位类
var Work = function(work){
	var that = this;
	(function(work,that){
		switch (work) {
			case 'code':
				that.work = "工程师";
				that.workDesc = "每天沉醉于编程";
				break;
			case 'UI':
			case 'UE':
				that.work = "设计师";
				that.workDesc = "设计更似一种艺术";
				break;
			case 'teach':
				that.work = "教师";
				that.workDesc = "分享也是一种快乐";
				break;
			default:
				that.work = work;
				that.workDesc = "对不起，我们还不清楚您所选择的职位的相关描述";
				break;
		}
	})(work,that)
}
//更换期望的职位
Work.prototype.changeWork = function(work){
	this.work = work;
};

Work.prototype.changeDesc = function(setence){
	this.workDesc = setence;
};

//创建实例化一个person
var Person = function(name, work){
	var _person = new Human();
	_person.name = new Named(name);
	_person.work = new Work(work);
	return _person;
}

var person = new Person("xiao ming","code")
console.log('1----------')
console.log(person.skill);
console.log(person.name.FirstName);
console.log(person.work.workDesc);
person.work.changeDesc("不仅正在编程，而且正字唱歌")
person.work.changeWork("UI")
console.log(person.work.work);
console.log(person.work.workDesc);


var person1 = new Person("xiao Li","UI")
console.log("\n")
console.log('2-----------')
console.log(person1.skill);
console.log(person1.name.FirstName);
console.log(person1.work.workDesc);
