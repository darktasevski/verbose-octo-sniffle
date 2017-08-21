function foo() {
  console.log(this.banana);
}
 
var fruit = {
  banana: 'ripe'
};
 
var clownAccessories = {
  banana: 'funny'
} ;
 
foo.call(fruit); // => ripe
foo.call(clownAccessories); // => funny
