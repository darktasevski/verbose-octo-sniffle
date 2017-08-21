// jshint esversion: 6

var p1 = new Promise(function (resolve, reject) {
    resolve('test1');
});

var p2 = new Promise(function (resolve, reject) {
    resolve('test2 passed');
    reject('test2 failed');
});

p1.catch(function (err) {
    console.log(err); // test1
});

p2.then(function(val) {
  // setTimeout(1000);
  console.log('test2');
});


var p3 = Promise.resolve(3);
var p4 = 1337;
var p5 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "foo");
});

Promise.all([p1, p3, p4, p5]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
