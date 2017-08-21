'use strict';
var express = require('express');
var app = express();

app.use(express.static('client'));  // to use the client JS files!

app.get('/', function(request, response){
  response.sendFile(__dirname + '/client/index.html');
});

app.listen(3000);