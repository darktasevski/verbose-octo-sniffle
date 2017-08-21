// jshint esversion: 6

class Cat{
  constructor(name, owner) {
    this.name = name;
    this.owner = owner;
  }

  cuteStatement() {
    return `${this.owner} loves ${this.name} !`;
  }
/*
  cuteStatement() {
    return `Everyone loves ${this.name} !`;
  }
*/

  meow() {
    return `${this.name} said MEOW!`;
  }

}

const luna = new Cat("Luna", "Kai");
const sunny = new Cat("Sunny", "Kai");


console.log(luna.cuteStatement());
console.log(sunny.cuteStatement());

console.log(luna.meow());

luna.meow = function () {
  return 'purr';
};

console.log(luna.meow());
