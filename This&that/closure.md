# Closure
* Functions are first class objects.

```JavaScript
function mul(factorA) {
  return function multiply(factorB) {
    if (factorB === undefined) {
      return factorA;
    } else {
      // closure: factorA is accessible after mul has been called
      factorA = factorA * factorB;
      return multiply;  
    }
  }
}

mul(2)() // 2
mul(2)(3)() // 6
mul(2)(3)(4)() // 24
```

Create closure with an IFEE
```JavaScript
for (var i = 0; i < 5; i++) {
  (function(i) {
    var btn = document.createElement('button');

    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', function(){ console.log(i); });
    document.body.appendChild(btn);  
  }(i))
}
```

Create closure by creating a function
```JavaScript
for (var i = 0; i < 5; i++) {
  buttonClick(i);
}

function buttonClick(i) {
  var btn = document.createElement('button');

  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```
