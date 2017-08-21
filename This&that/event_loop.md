# EventLoop

Anything using `setTimeout` will get set to the event loop.
Because JS is single threaded; `setTimeout` will run after the `console.log(4)`.

```JavaScript
(function() {
    console.log(1);
    setTimeout(function(){console.log(2)}, 1000);
    setTimeout(function(){console.log(3)}, 0);
    console.log(4);
})();
// 1,4,3,3
```
