/* 9. Write a JavaScript program to calculate the area and perimeter of a circle.
Note : Create two methods to calculate the area and perimeter.
The radius of the circle will be supplied by the user.
*/

class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
  perimeter() {
    return Math.PI * this.radius * 2;
  }
}

let circle = new Circle(5);
console.log(circle.area());
console.log(circle.perimeter());
