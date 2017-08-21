var object = {
  kai: 'person',
  luna: 'cat',
  joey: 'person'
};

console.log(object.kai);		// dot notation vs bracket notation
console.log(object['luna']);


for(var key in object){		//use for in loop to access all keys
  console.log(object.key); 
}

