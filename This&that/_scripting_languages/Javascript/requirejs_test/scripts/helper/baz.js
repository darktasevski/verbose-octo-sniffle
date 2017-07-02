// var app = {
// 	foo: 'bar'
// }

// define(function (require) {
//     // Load any app-specific modules
//     // with a relative require call,
//     // like:
//     var foo = require('./foo');

//     // Load library/vendor modules using
//     // full IDs, like:
//     var bar = require('bar');

//     alert(foo.getHello());
//     alert(bar.getHelloBar());

//     return "inside utils.js"
// });




// var app = {
// 	foo: 'bar'
// }

define(['helper/foo', 'helper/bar', 'mylib'], function (foo, bar, mylib) {  // path relative to main.js
   	alert(foo.getHello());
    alert(bar.getHelloBar());
    // $.foo()

    return "inside baz.js part 2" // you should be returning an object, right???
}); // it maps js file returns to variables