//Create a function that, using map, iterates over an array of objects.
//If that person is a female, prefix 'Ms' to the name.
//If that person is male, prefix 'Mr' to the name.
//Your function should return an array that contains only the names with the added prefix.

let ladiesAndGents = [
{name: 'John', sex: 'male'},
{name: 'Kelly', sex: 'female'},
{name: 'Adam', sex: 'male'},
{name: 'Cathy', sex: 'female'},
{name: 'John', sex: 'male'},
{name: 'Kelly', sex: 'female'},
{name: 'Adam', sex: 'male'},
{name: 'Cathy', sex: 'female'},
{name: 'John', sex: 'male'},
{name: 'Kelly', sex: 'female'},
{name: 'Adam', sex: 'male'},
{name: 'Cathy', sex: 'female'}
];
/*
function addPrefix (name, sex) {
	if (sex === 'male') {
		return `Mr. #{name}`;
	}
	else {
		return `Ms. #{name}`;
	}
}
*/

function addPrefix(arr) {
	let prefix_name = ladiesAndGents.map( function logic(person) {
		if (person.sex === 'male') {
			return `Mr. ${person.name}`;
		}
		else {
			return `Ms. ${person.name}`;
		}
	})
	return prefix_name;
}

console.log(addPrefix(ladiesAndGents));
