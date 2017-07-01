/**
 * factory pattern
 * The objective is to create an object
 *
 * the Shape interface: draw() 
 */
function ShapeFactory(){
    this.getShape = function(shapeType){
        if(shapeType == null){
            return null;
        }   

        if(shapeType == "circle"){
            return new Circle();
        } 

        if(shapeType == "rectangle"){
            return new Rectangle();
        }

        if(shapeType == "square"){
            return new Square();
        }

        return null; 
    }
}

function Rectangle(){
    this.draw = function(){
        console.log('Drawing a Rectangle!');
    }
}

function Square (){
    this.draw = function(){
        console.log('Drawing a Square!');
    }
}

function Circle (){
    this.draw = function(){
        console.log('Drawing a Circle!');
    }
}

//------- usage:

var shapeFactory = new ShapeFactory();

var shape1 = shapeFactory.getShape("circle");
shape1.draw();

var shape2 = shapeFactory.getShape("rectangle");
shape2.draw();

var shape3 = shapeFactory.getShape("square");
shape3.draw(); 


/* output:

Drawing a Circle!
Drawing a Rectangle!
Drawing a Square!
 
*/
