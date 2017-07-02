# Semicolon Insertion

```JavaScript
function foo1() {
  return {
    "foo": "bar"
  }
}

foo1(); // { "foo": "bar" }

function foo2() {
  return
  {
    "foo": "bar"
  }
}

foo2(); // undefined
```
