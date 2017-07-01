function add(i,j){
	var args = Array.prototype.slice.apply(arguments);
	args.forEach(function(item){
		console.log(item);
	})
}

add(1,2,3,4,5,6)