// http://eloquentjavascript.net/04_data.html#h_C51DnYk8WZ
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

function randomPointOnCircle(radius) {
  var angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2)); // ---> something like {x: 0.3667, y: 1.966}

function randomPointOnCircle(radius) {
  var angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2)); // ---> something like {x: 0.3667, y: 1.966}

// between zero (inclusive) and 1 (exclusive)
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

console.log(Math.floor(Math.random() * 10)); // ---> a whole integer between 0 and 9
console.log(Math.ceil(Math.random() * 10)); // ---> a whole integer between 1 and 10
console.log(Math.round(Math.random() * 10)); // ---> a whole integer between 0 and 10

// testing Math.round()
function rounding() {
  x = Math.round(Math.random() * 10);
  // if (x === 10) {
  if (x === 0) {
    return x
  } else return rounding();
}

console.log(rounding());
