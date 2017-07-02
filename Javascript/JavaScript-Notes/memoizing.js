var store = {
	nextId : 1,
	cache:{},
	add:function(fn){
		if(!fn.id){
			fn.id = store.nextId++;
			return !!(store.cache[fn.id]=fn)
		}
	}
};

function ninja(){}

console.log(store.add(ninja))
ninja();
console.log(store.add(ninja))
console.log(store.add(ninja))
