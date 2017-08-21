# Currying

```JavaScript
add(3)(4)(5); // 12

function add(x) {
  return function(y) {
    return function(z) {
      return x + y + z;
    }
  }
}
```

Note that we are binding `arguments` as the `this` of `slice`.
```JavaScript
function sum(x) {
  var args = [].slice.call(arguments, 0);

  if (args.length > 1) {
    // return args[0] + args[1];
    return sum(args[0])(args[1]);
  }

  return function(y) {
    return x + y;
  }
}

sum(2, 3); // 6
sum(2)(3); // 6

```
