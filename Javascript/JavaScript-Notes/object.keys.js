// var a = {
// 	"name":"wangdejun",
// 	"age":"27"
// }

// console.log(Object.keys(a))
// console.log(a.hasOwnProperty("name"))




function whatIsInAName(collection, source) {
	// What's in a name?
	var arr = [];
	// Only change code below this line
	var index_key_arr = Object.keys(source)
	var flag = true
	for(var i =0;i<collection.length;i++){
		flag = true
		console.log(collection[i])
		for(var j=0;j<index_key_arr.length;j++){
			console.log(collection[i].hasOwnProperty(index_key_arr[j])&&collection[i][index_key_arr[j]]===source[index_key_arr[j]])
			if(collection[i].hasOwnProperty(index_key_arr[j])&&collection[i][index_key_arr[j]]===source[index_key_arr[j]]){
				flag = true;
			}else{
				flag = false;
			}
			console.log("flag------>",flag)
			if(!flag) break;
		}

		if(flag){
			arr.push(collection[i])
		}
	}
	// Only change code above this line
	return arr;
}

// console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));
console.log(whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 }))