// Serving JSON data
var http = require('http');
var fs = require('fs');

// 2 params = request object and response object
var server = http.createServer(function(req, res) {
  console.log('request was made: ' + req.url) // URL of request
  // Make sure Content-Type is set to APPLICATION/JSON
  res.writeHead(200, {'Content-Type': 'application/json'});
  var myObj = {
    name: 'Ryu',
    job: 'Ninja',
    age: 29
  }
  // res.end() either expects a string or a buffer
  res.end(JSON.stringify(myObj));
});

server.listen(3000, '127.0.0.1');
console.log('Now listening to port 3000...');