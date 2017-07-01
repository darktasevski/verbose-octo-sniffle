Security
==

## Glossary

- **CSRF** -
- **XSS** - Cross-site scripting (XSS).

## XSS

```js
const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name;
```

## Framebusting

https://seclab.stanford.edu/websec/framebusting/framebust.pdf
