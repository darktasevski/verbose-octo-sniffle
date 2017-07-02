/*

Object Literals

Object literals provide a very convenient notation for creating new object values.

An object literal is a pair of curly braces surrounding zero or more name/value
pairs. An object literal can appear anywhere an expression can appear:

*/

var empty_object = {};

var stooge = {
	"first-name": "Jerome",
	"last-name": "Howard"
};

/*

A property’s name can be any string, including the empty string. 

The quotes around a property’s name in an object literal are optional 
if the name would be a legal JavaScript name and not a reserved word. 

A property’s value can be obtained from any expression, including another object literal.

Objects can nest:

*/

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};


