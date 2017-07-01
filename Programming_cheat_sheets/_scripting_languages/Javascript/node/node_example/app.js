var http = require('http'); // how we require modules
var url = require('url');
//---------------------------------------------------- fs
var fs = require('fs');
var file = fs.createReadStream("read_me.txt"); // existing file
var newFile = fs.createWriteStream("test.txt");
file.pipe(newFile);  // creates the file with content

//---------------------------------------------------- events
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter(); // we want it to emit events like: 'error', 'warn', 'info'

logger.on('error', function(message){
    console.log('ERR: ' + message);
});


logger.emit('error', 'foo1'); // any aditional parameters here will be passed to the listeners
logger.emit('error', 'bar1');  // 'Err: Eggs Cracked'

//--------------------------------------------------- server
http.createServer(function(request, response){
    response.writeHead(200);  // status code in head
    response.write("<h1>hello world</h1>"); // response body


    logger.emit('error', 'foo2'); // any aditional parameters here will be passed to the listeners
    logger.emit('error', 'bar2');  // 'Err: Eggs Cracked'




    response.end(); // close connection
}).listen(8080); // listen for connections on this port

console.log('listening on port 8080...');


// routes? do a switch inside .createServer