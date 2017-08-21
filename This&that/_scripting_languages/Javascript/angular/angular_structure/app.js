'use strict';
var express = require('express');
var app = express();

app.use(express.static('app'));  // app is the root folder now! so you can do: http://localhost:3000/a_file_inside_the_app_folder.html

app.get('/', function(request, response){
  response.sendFile(__dirname + '/app/index.html'); // on '/', serve this file!   ('/app/index.html' is relative to this file (app.js))
});

app.listen(3000);
