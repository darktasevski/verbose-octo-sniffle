# Lexical Scope

```JavaScript
(function() {
  var a = b = 3;
}());

a // ReferenceError: d is not defined
typeof a // "undefined"
b // 3 (attached to the window b/c not declared)

(function() {
  "use strict";

  var c = d = 5;
}()); // ReferenceError: d is not defined
```
