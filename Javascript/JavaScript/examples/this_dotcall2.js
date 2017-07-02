var obj = {
  banana: 'ripe',
  foo: function() {
    console.log(this.banana);
  }
};
 
var clownAccessories = {
  banana: 'funny'
};
 
obj.foo.call(clownAccessories);	// ==> funny