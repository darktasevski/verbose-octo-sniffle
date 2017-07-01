// 为HTMLElement添加一个属性
HTMLElement.prototype.remove = function(){
	if(this.parentNode){
		this.parentNode.removeChild(this);
	}
}
//test
//删除一个dom节点
//常规做法
var a = document.getElementById("app");
a.parentNode.removeChild(a);
//利用上述定义的方法
document.getElementById("app").remove();