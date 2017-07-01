var heapdump = require('heapdump')
var http = require('http')

 var leakArray = [];
 var leak = function(){
     leakArray.push("leak"+Math.random());
 };

 http.createServer(function(req,res){
     leak();
     res.writeHead(200,{'Content-Type':'text/plain'});
     res.end('Hello World\n');
 }).listen(8080);

 console.log("Server is running at http://127.0.0.1:8080");