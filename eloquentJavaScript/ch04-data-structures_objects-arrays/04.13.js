// http://eloquentjavascript.net/04_data.html#h_GstIcsgxyb

function noArguments() {}
noArguments(1, 2, 3); // This is okay
function threeArguments(a, b, c) {}
threeArguments(); // And so is this


// arguments keyword
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
function argumentCounter() {
  console.log("You gave me", arguments.length, "arguments.");
}
argumentCounter("Straw man", "Tautology", "Ad hominem"); // ---> You gave me 3 arguments.

var journal = new Array();

function addEntry(squirrel) {
  var entry = {events: [], squirrel: squirrel};
  for (var i = 1; i < arguments.length; i++)
    entry.events.push(arguments[i]);
  journal.push(entry);
}
addEntry(true, "work", "touched tree", "pizza",
         "running", "television");
addEntry(false, "work", "touched tree", "pizza", "running",
         "television");
addEntry(false, "work", "ice cream", "cauliflower", "lasagna",
         "touched tree", "brushed teeth");
addEntry(true, "weekend", "cycling", "break", "peanuts",
         "beer");

console.log(journal);

/* The old method in 04.07.js */
// function addEntry(events, didITurnIntoASquirrel) {
//   journal.push({
//     events: events,
//     squirrel: didITurnIntoASquirrel
//   });
// }
//
// addEntry(["work", "touched tree", "pizza", "running",
//           "television"], false);
