# Regular Expressions

## JavaScript

Regular expression literals can be used to match or replace a pattern:

```JavaScript
var DATE_FORMAT = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(\d{4})$/;
var matches = "01/11/2014".match(DATE_FORMAT);

matches[1] // month
matches[2] // day
matches[3] // year
```

Building a regular expression needed at runtime requires the `RegExp()` constructor:

```JavaScript
  var phrase = "Big Time!";
  var regEx;

  for(var i = 0; i < phrase.length; i++) {
    regEx = new RegExp(phrase[i], "g");

    phrase.match(regEx).length;
  }
```
An example: [isAnagram](./example.js)

*Note: Calling `RegEx()` as a function and not as a constructor behaves the same way* ([1](../../references.md))

Other options for a regular expression:
```JavaScript
// returns an array containing the entire match result and any parentheses-captured matched results
// null if there were no matches.
"foobarfoo".match(/foo/g);
// replaces the first found regex with second parameter (unless it is a global search)
"foobar".replace(re, "!");
// returns the index of the first match (even if it is a global search)
"foobar".search(re);

var RE = /^foo(bar)$/;
RE.test("foobar"); // true
```

Remember calling `replace` with a string option replaces only the *first* occurrence.
```JavaScript
"foobar".replace("o", "!"); // "f!obar"
```

## Ruby
