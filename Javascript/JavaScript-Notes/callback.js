function useless(callback){
	return callback();
}

function callback(){
	console.log("This is a callback")
}

useless(callback)