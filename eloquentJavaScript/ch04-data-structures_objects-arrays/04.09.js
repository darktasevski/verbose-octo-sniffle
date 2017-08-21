// http://eloquentjavascript.net/04_data.html#h_mrW9RQxlGk

var map = {};
function storePhi(event, phi) {
  map[event] = phi;
}

storePhi("pizza", 0.069);
storePhi("touched tree", -0.081);
console.log("pizza" in map);      // ---> true
console.log(map["touched tree"]); // ---> -0.081

for (var event in map)
  console.log("The correlation for '" + event +
              "' is " + map[event]);
// ---> The correlation for 'pizza' is 0.069
// ---> The correlation for 'touched tree' is -0.081
