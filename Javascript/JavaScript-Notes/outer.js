function outer(){
	var a = 1;
	console.log("1")
	console.log(a)
	function inner(){
		var b = 2;
		console.log(a,b,c)
		if(a==1){
			var c =3
			console.log(a,b,c)
		}
	}
}

outer()
console.log("wangdejun")