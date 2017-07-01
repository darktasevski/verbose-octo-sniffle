# Closures are functions with data attached to them

## Closures remember the variables on the parent scope, when they were called

# first, this is a function that is called right away
```js
var name = (
	function(){
		console.log("Hi, you called me during the declaration of the variable 'name'")
	}
)();

```

# Now, Clojures!
```js
// closures 
// 1. use a variable
// 2. put inside it a function that executes right away -> (function(){...})();
// 3. inside this function, declare your variables -> they will become 'private' variables!
// 4. return another function from inside of the first function
// 5. in that second nested function, log the value of the variable declared inside the first outer function
// 6. now use the first variable, now it has become a function, and a pair of parenthesis to call it as a function!
// 
var x = (
  function(){ 
  	var id = 0; 
  	return function(){
  		id++; 
  		console.log(id);
  	}
  }
)();


x();
```


# example 2 (not using a function that triggers right away)
```js
var foo = function(){ 
  var id = 0; 
  return function(){
    id++; 
    console.log(id);
  }
};
bar = foo();  // initialize id = 0, and return the function, to insert it in bar

bar(); //=> 1
bar(); //=> 2
bar(); //=> 3
bar(); //=> 4
```


# example 3, with parameters
```js
var foo = function(x){ 
  var id = x; 
  return function(y){
    id++; 
    console.log("id=" + id + "   " + "x=" + x + "   " + "y=" + y + "   " );
  }
};

// initializes id= 10, return the inner function, to insert it in bar // id = 10
var bar = foo(10); 

// y = 20,     and id in incremented every time this function is called!
bar(20); //=> id=11   x=10   y=20   
bar(20); //=> id=12   x=10   y=20  
bar(20); //=> id=13   x=10   y=20  
bar(20); //=> id=14   x=10   y=20   




//  initializes id= 1000, return the inner function, to insert it in bar // id = 1000
var bar2 = foo(1000);  

// y = 5,     and id in incremented every time this function is called!
bar2(5); //=> id=1001   x=1000   y=5   
bar2(5); //=> id=1002   x=1000   y=5   
bar2(5); //=> id=1003   x=1000   y=5   
bar2(5); //=> id=1004   x=1000   y=5   
```



