
//----------------------------------------------------- hoisting
// JavaScript only hoists declarations, not initializations.

// 'equals' does NOT go up!


function Person(){
	foo();

	function foo(){
		console.log('called foo');
	}

	//------------------------ this wouldnt work... 
	// because it would not be hoiseted to the top, before foo() is called
	
	// foo = function(){
	// 	console.log('called foo');
	// };
}

var brian = new Person();
