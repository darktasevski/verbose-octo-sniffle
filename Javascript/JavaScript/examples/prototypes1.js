function Animal(name) {
  this.name = name;
}

function Mammal() {
  Mammal.prototype = new Animal();
}

function Feline() {
  Feline.prototype = new Mammal();
}

Mammal.prototype.hasBlood = function () {
  console.log('I am warm blooded!');
};

Feline.prototype.pur = function () {
  console.log('purr');
};

const myCat = new Feline('Luna');
const myMammal = new Mammal('Jack');

myCat.pur();
myCat.hasBlood();
myMammal.hasBlood();
