var http = require('http');

// 2 params = request object and response object
var server = http.createServer(function(req, res) {
  console.log('request was made: ' + req.url) // URL of request
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hey bros');
});

server.listen(3000, '127.0.0.1');
console.log('Now listening to port 3000');