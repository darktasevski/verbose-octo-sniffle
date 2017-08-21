// private functions

function Person(name){
	this.name = name;

	this.walk = function(){
		console.log('walking');

		breathe();
	}

	// private function
	function breathe(){
		console.log('and breathing');
	}
}

var brian = new Person('brian');
brian.walk(); // walking and breathing
// brian.breathe(); // error (not a function)




var erich = {
	name: 'erich',
	walk: function(){
		console.log(this.name + ' is walking');
	}
};

erich.walk(); // 'erich is walking'
