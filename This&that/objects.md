# Objects

## Properties

_delete_
`delete` only effects properties on objects, not local variables.
```JavaScript
var output = (function(x){
  delete x;
  return x;
})(8);

output; // 8

var x = { foo : 1};
var output = (function(){
  delete x.foo;
  return x.foo;
})();

output; // undefined

var trees = ["redwood","bay","cedar","oak","maple"];
delete trees[3]; // ["redwood","bay","cedar", undefined, "maple"]
trees.length // 5
```

_for in_
```JavaScript
var obj1 = {
  "firstName": "mike",
  "lastName": "wehrley",
  "age": 401,
  "food": "brussel sprouts"
}

for (attr in obj1) {
  obj1[attr];  // mike; wehrley; 401; brussel sprouts;
}
```

### hasOwnProperty

### defineProperty
