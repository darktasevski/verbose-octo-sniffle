# Coercion

```JavaScript
+"4" // 4
"" + 5 // "5"
"foo" * 3 // NaN
3 * "foo"// NaN

// ES6
"foo".repeat(2); // 'foofoo' only for ES6

String(9) // returns the primitive "9"
new String(3) // returns a string object

String(3) === new String(3) // false
```
