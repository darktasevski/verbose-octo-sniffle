var x;
for( var i = 0;i<10;i++){
	if(i==3)
		continue;
	x = x + "The number is "+ i; 
}

try{
}catch(err){
	console.log("AAAAAA");
	console.log(err);
	console.log("AAAAAA");
}

console.log(x);