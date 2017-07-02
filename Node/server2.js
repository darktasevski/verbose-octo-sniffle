// Readable and writable streams

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

// Inherits from Event Emitter => fires callback function everytime event 'data' is read with the 'chunk' of data
// myReadStream.on('data', function(chunk){
//   console.log('new chunk received');
//   myWriteStream.write(chunk);
// });

// Instead of going from readable into writable, you can 'pipe' instead
myReadStream.pipe(myWriteStream);
