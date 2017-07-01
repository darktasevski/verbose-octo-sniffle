function titleize(arr, callback) {
	let caps = arr.map(k => `Mx. ${k} Jingleheimer Schmidt`);
	callback(caps);
} 

titleize(["Kai", "Luna", "Kitty"], arr => {arr.forEach(k => console.log(k))});
									// => means annonymous function
