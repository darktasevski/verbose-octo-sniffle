# Closures are functions with data attached to them

###### Closures remember the variables on the parent scope, when they were called

###### Use this to enforce public/private methods.

```js
a = (function () {
    var privatefunction = function () {
        alert('hello');
    }

    return {
        publicfunction : function () {
            privatefunction();
        }
    }
})();
```

- As you can see there, `a` is now an object, 
  - with a method publicfunction  `a.publicfunction()` 
  - which calls privatefunction, 
  - which only exists inside the closure. 
  - You can NOT call privatefunction directly (i.e. `a.privatefunction()` ), just publicfunction().

