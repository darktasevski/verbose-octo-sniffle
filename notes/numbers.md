# Numbers

## Floating Point Precision

```JavaScript
console.log(0.1 + 0.2); // 0.3
console.log(0.1 + 0.2 == 0.3); // false
```

Writing your own `isInteger` method:
```JavaScript

function isInteger(x) {
  // NaN^0 => 0
  return (x^0) === x;
}

isInteger(3) // true
isInteger(NaN) // false
isInteger(0.1) // false
```
