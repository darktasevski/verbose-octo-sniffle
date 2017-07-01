// jshint esversion: 6

"use strict";

function Cat(name, owner) {
    this.name = name;
    this.owner = owner;
  }

Cat.prototype.cuteStatement = function () {
    return `${this.owner} loves ${this.name}`;
  };



const cat1 = new Cat('Markov', 'Ned');


console.log(cat1.cuteStatement());
