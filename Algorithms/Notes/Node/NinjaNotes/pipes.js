// Piping read stream onto page
var http = require('http');
var fs = require('fs');

// 2 params = request object and response object
var server = http.createServer(function(req, res) {
  console.log('request was made: ' + req.url) // URL of request
  // Make sure Content-Type is set to html for browser to render
  res.writeHead(200, {'Content-Type': 'text/html'});
  var myReadStream = fs.createReadStream(__dirname + '/index.html');
  // Pipe into response object
  myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');
console.log('Now listening to port 3000...');