<?


/* A closure is a function that:
 * 	- can be passed around like a variable (first class citizen)
 *	- has access to the parent scope where it as declared
 */
	
	// function using a closure as a second parameter
	function makeSandwhich($breadType, $meatHandler){
		$meat = 'beef';
		$meatHandler($meat);

		echo $breadType;
		echo $meat;
		echo $breadType;
	}

	$howToCook = 'well Done!'; // if you want to use an external variable inside your closure, you nee to pass it in the `use(...)` block
	
	// passing a closure as the second parameter to the function `makeSandwhich`
	// in this function I want to work on the $meat variable by reference!
	makeSandwhich("flat bread\n", function(&$meat) use($howToCook){
		$meat = "$meat $howToCook\n";
	});
	
    // // result:
    // flat bread
    // beef well Done!
    // flat bread
