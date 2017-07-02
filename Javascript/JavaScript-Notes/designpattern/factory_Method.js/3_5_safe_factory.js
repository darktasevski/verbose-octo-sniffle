
/**
 * [Factory function safely]
 * @param {[type]} type    [传入的类型]
 * @param {[type]} content [传入的内容]
 */
var Factory = function(type,content){
	// 检查：如果是正确地通过new关键字构造出来的，那么直接新建一个这样的实例，并返回
	if(this instanceof Factory){
		var s = new this[type](content);
		return s;
	}else{
		//否则，通过Factory构造函数重新构造一遍
		return new Factory(type,content);
	}
}

/**
 * 非安全的方式创建类，没有对是否正确使用进行检查
 */
// var Factory = function(type,content){
// 	var s = new this[type](content);
// 	return s;
// }

Factory.prototype = {
	JavaScript:function(content){
		this.content = content;
		(function(content){
			var div = document.createElement("div");
			div.innerHTML = content;
			div.style.border = "1px solid red";
			document.getElementById('container').appendChild(div)
		})(content);
	},
	Java:function(content){
		this.content = content;
		(function(content){
			console.log('======>');
			console.log(content);
			console.log("======>");
		})(content);
	},
	"C++":function(content){
		this.content = content;
		(function(content){
			var div = document.createElement("div");
			div.innerHTML = content;
			div.style.border = "1px solid red";
			document.getElementById('container').appendChild(div)
		})(content);
	},
	php:function(content){
		this.content = content;
		(function(content){
			var div = document.createElement("div");
			div.innerHTML = content;
			div.style.border = "1px solid red";
			document.getElementById('container').appendChild(div)
		})(content);
	}
}

var javaInstance = new Factory("Java","Hello,Java Language")