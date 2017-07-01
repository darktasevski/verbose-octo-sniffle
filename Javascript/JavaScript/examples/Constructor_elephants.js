function Elephant(name, height, tricks) {
	this.name = name;
	this.height = height
	this.tricks = tricks;
}

//creates prototype to trumpet
Elephant.prototype.trumpet = function() {
	console.log( `${this.name} the elephant goes 'phrRRRRRRRRRRR!!!!!!!' `);
}

//prototype for elephant to grow 12 inches
Elephant.prototype.grow = function() {
	this.height += 12;
	console.log( `${this.name} just grew by 12 inches!`);
}

//prototype to add a trick
Elephant.prototype.addTrick = function(trick) {
	this.tricks.push(trick);
	console.log( `${this.name} just learned to ${trick}!`)
}

//random elephant trick
Elephant.prototype.play = function() {
	let index = Math.floor(Math.random() * this.tricks.length);
	console.log(`${this.name} is ${this.tricks[index]}`)
}


//logs out the parade
Elephant.paradeHelper = function(elephant) {
	console.log(`${elephant.name} is trotting along!`);
};


//create our herd
let Dumbo = new Elephant("Dumbo", 50, ["paint a picture"]);
let Ellie = new Elephant("Ellie", 185, ["giving human friends a ride", "playing hide and seek"]);
let Charlie = new Elephant("Charlie", 200, ["painting pictures", "spraying water for a slip and slide"]);
let Kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let Micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [Dumbo, Ellie, Charlie, Kate, Micah];

// Dumbo.trumpet();
// console.log(Dumbo.height);
// Dumbo.grow();
// console.log(Dumbo.height);
// Dumbo.addTrick("juggle");
// console.log(Dumbo.tricks);
// Dumbo.play();

//use forEach for herd parade
herd.forEach(Elephant.paradeHelper);
