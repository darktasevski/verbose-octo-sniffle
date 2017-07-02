'use strict';
var express = require('express');
var app = express();

// remember: files are not available if you dont 'app.use' them...
// express.static('js') will allow you to use files 'under' the /js folder, but its important to specify '/js' so you can reference the folder name
app.use('/js', express.static('js'));  // to use the client JS files!
app.use('/', express.static('views'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.listen(3000);

