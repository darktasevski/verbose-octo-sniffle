/**
 * Chapter 5: Program Performance
*/

// Using multiple instances of the JS engine each with its own thread provided by the browser (aka host environment), known as "Web Workers"
// Instantiated like so:
var w1 = new Worker("http://some.url.1/mycoolworker.js");

// Workers do not share any scope or resources with each other or the main program
// w1 Worker object is an event listener and trigger, listening for events:
w1.addEventListener("message", function(evt) {
  // evt.data
});
// Send message event to Worker:
w1.postMessage("Something cool to say!");

// Killing a worker:
w1.terminate();

// The Worker has access to network operations (Ajax, WebSockets) and set timers. Also access to `navigator`, `location`, `JSON` and `applicationCache`
// It is also possible to load extra JS scripts into the worker using:
importScripts("foo.js", "bar.js");

// Send a transferable object using `postMessage(..)`
// First param is raw buffer, second param is a list of what to transfer
postMessage(foo.buffer, [foo.buffer]);

// Shared Workers, single centralized Worker that all page instances of site or app can share
var w2 = new SharedWorker("http://some.url.1/mycoolworker.js");

// Requires `port` object of the Worker for communication:
w2.port.addEventListener("message", handleMessages);
// ...
w2.port.postMessage("Something cool");
// Initialize port connection:
w2.port.start();

// An extra event must be handled inside the shared Worker: "connect"
// Inside the shared Worker:
addEventListener("connect", function(evt) {
  // Assigned port for this connection
  var port = evt.ports[0];
  port.addEventListener("message", function(evt) {
    // ...
    port.postMessage("...");
    // ...
  });
  // Initialize port connection:
  port.start();
});