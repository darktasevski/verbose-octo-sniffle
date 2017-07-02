/*

Retrieval

Values can be retrieved from an object by wrapping a string expression in a 
[ ] suffix.

If the string expression is a constant, and if it is a legal JavaScript name 
and not a reserved word, then the . notation can be used instead. 

The . notation is preferred because it is more compact and it reads better:

*/

stooge["first-name"] 	// "Jerome"
flight.departure.IATA 	// "SYD"

/*

The undefined value is produced if an attempt is made to retrieve a 
nonexistent member:

*/

stooge["middle-name"] 	// undefined
flight.status 			// undefined
stooge["FIRST-NAME"] 	// undefined

// The || operator can be used to fill in default values:

var middle = stooge["middle-name"] || "(none)";

var status = flight.status || "unknown";

/*

Attempting to retrieve values from undefined will throw a TypeError exception. This
can be guarded against with the && operator:

*/

flight.equipment // undefined
flight.equipment.model // throw "TypeError"
flight.equipment && flight.equipment.model // undefined





















