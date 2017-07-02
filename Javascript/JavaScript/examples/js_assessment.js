// write String.prototype.mySlice. It should take a start index and an
// (optional) end index.

String.prototype.mySlice = function(start, end) {

	let slice = "";

	if (typeof end === 'undefined'){
		end = this.length;
	}
	
	for( let i = start; (i< end ) && (i < this.length); i+=1) {
		slice += this[i];
	}
	return slice;
};

// write Array.prototype.myReduce (analogous to Ruby's Array#inject).



// write Array.prototype.quickSort(comparator). Here's a quick refresher if
// you've forgotten how quickSort works:
//   - choose a pivot element from the array (usually the first)
//   - for each remaining element of the array:
//     - if the element is less than the pivot, put it in the left half of the
//     array.
//     - otherwise, put it in the right half of the array.
//   - recursively call quickSort on the left and right halves, and return the
//   full sorted array.

// write myFind(array, callback). It should return the first element for which
// callback returns true, or undefined if none is found.

// write sumNPrimes(n)

// write Function.prototype.myBind.

// write Function.prototype.inherits.
