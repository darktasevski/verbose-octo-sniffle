/*
Write a JavaScript program to get the volume of a
Cylinder with four decimal places using object classes.
*/


class Cylinder {

  constructor(radius, height) {
    this.radius = radius;
    this.height = height;
  }

  volume() {
    return (Math.PI * ((this.radius) * (this.radius)) *(this.height)).toFixed(4);
  }
}

let cylinder = new Cylinder(2, 4);

console.log(cylinder.volume());
