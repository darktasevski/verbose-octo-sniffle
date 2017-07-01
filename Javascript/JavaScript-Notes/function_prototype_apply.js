function Point(x,y){
	console.log("-------")
	console.log(this)
	console.log(this)
	console.log("-------")
	this.x=x;
	this.y=y;
	console.log("-------")
	console.log(this)
	console.log("-------")
}

function Tag(width,height){
	console.log("-------")
	console.log(this)
	console.log("-------")
	this.width = width;
	this.height = height;
	console.log("-------")
	console.log(this)
	console.log("-------")
}


Point.prototype.move=function(x,y){
	console.log(this)
	this.x+=x;
	this.y+=y;
}

Tag.prototype.scale = function(){
	this.width = this.width/2;
	this.height = this.height/2;
};

var p = new Point(0,0);
var T = new Tag(123,1223)


p.move(2,2);
console.log(p)
T.scale()
console.log(T)

var circle = {x:1,y:1,r:1}
p.move.apply(circle,[2,1])
console.log("1,after applay the circle method")
console.log("p:",p)
console.log("2,------------------------------")

p.move.call(circle,{x:3,y:2,r:1})
console.log(circle)







