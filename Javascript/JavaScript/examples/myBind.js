//using arguments
Function.prototype.myBind1 = function(ctx) {
  var func = this;
  var bindArgs = Array.from(arguments).slice(1);
  return function () {
    var callArgs = Array.from(arguments);
    return func.apply(ctx, bindArgs.concat(callArgs));
  };
};

//using rest operator
Function.prototype.myBind2 = function(ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
breakfast.says("purr", "Kai");

markov.says.myBind1(breakfast, "meow", "Kush")();
markov.says.myBind2(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!

markov.says.myBind1(breakfast)("meow", "a tree");
markov.says.myBind2(breakfast)("meow", "a tree");
//Breakfast says meow to a tree!

markov.says.myBind1(breakfast, "meow")("Markov");
markov.says.myBind2(breakfast, "meow")("Markov");

const notMarkovSays = markov.says.myBind1(breakfast);
notMarkovSays("meow", "me");
